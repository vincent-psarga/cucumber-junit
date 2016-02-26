var createProperty = require('./common').createProperty;

function computeScenarioData(scenarioJson) {
    var steps = scenarioJson.steps || [],
      data =  {
        name: scenarioJson.name,
        time: 0,
        error: false,
        failure: false,
        skipped: false
    }

    steps.forEach(function (step) {
        data.time += step.result.duration || 0;

        if (step.result.status === 'failed') {
            data.failure = true;
            data.error_message = step.result.error_message;
        }
    });

    return data;
}

function convertScenario(scenarioData) {
    var scenarioOutput = [
            {
                _attr: {
                    name: scenarioData.name,
                    time: scenarioData.time
                }
            }
        ];

    if (scenarioData.failure) {
        scenarioOutput.push({
            failure: {
                _cdata: scenarioData.error_message
            }
        })
    }

    return {
        testcase: scenarioOutput
    }
}

/**
 * [convertFeature description]
 * @method convertFeature
 * @param  {[type]}       featureJson [description]
 * @return {[type]}                   [description]
 */
function convertFeature(featureJson) {
    var elements = featureJson.elements || [],
      feature = {
        testsuite: [
            { _attr: {
                name: featureJson.name,
                tests: 0,
                failures: 0,
                errors: 0,
                skipped: 0,
                time: 0
                },
            },
            { properties: [
                createProperty('URI', featureJson.uri)
            ]}
        ]
    }

    elements
        .filter(function(scenarioJson) {
            return (scenarioJson.type !== 'background');
        })
        .forEach(function (scenarioJson) {
            var scenarioData = computeScenarioData(scenarioJson),
                scenarioOutput = convertScenario(scenarioData);

            feature.testsuite[0]._attr.tests += 1;
            feature.testsuite[0]._attr.time += scenarioData.time;

            if (scenarioData.error) {
                feature.testsuite[0]._attr.error += 1;
            }

            if (scenarioData.failure) {
                feature.testsuite[0]._attr.failure += 1;
            }

            feature.testsuite.push(scenarioOutput);
        });

    return feature;
}

module.exports = convertFeature;