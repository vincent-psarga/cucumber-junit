var xml = require('xml');
var util = require('util');

/**
 * [exports description]
 * @method exports
 * @param  {[type]} cucumberRaw [description]
 * @return {[type]}             [description]
 */
function cucumberJunit (cucumberRaw, options) {
    var cucumberJson,
        output = [],
        convertFeature = options['features-as-suites'] ? require('./features_as_suite') : require('./scenarios_as_suite');

    if (cucumberRaw && cucumberRaw.toString().trim() !== '') {
        cucumberJson = JSON.parse(cucumberRaw);
        cucumberJson.forEach(function (featureJson) {
            output = output.concat(convertFeature(featureJson));
        });

        // If no items, provide something
        if (output.length === 0) {
            output.push( { testsuite: [] } );
        }
    }

    // wrap all <testsuite> elements in <testsuites> element
    return xml({ testsuites: output }, {
        indent: options.indent,
        declaration: { encoding: options.encoding }
    });
};

module.exports = cucumberJunit;
