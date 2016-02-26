var rawInput = '',
  commandLineArgs = require('command-line-args'),
  opts = [
    {
      name: 'encoding',
      alias: 'e',
      type: String,
      defaultValue: 'UTF-8',
      description: 'Set exported document encoding'
    },
    {
      name: 'indent',
      alias: 'i',
      type: String,
      defaultValue: '    ',
      description: 'Set exported document indentation'
    },
    {
      name: 'features-as-suites',
      type: Boolean,
      defaultValue: false,
      description: 'Output each feature as a test suite, each scenario as a test'
    },
    {
      name: 'help',
      alias: 'h',
      type: Boolean,
      defaultValue: false,
      description: 'Shows this message'
    }
  ]
  cli = commandLineArgs(opts),
  cli_options = cli.parse();

module.exports = {
  options: cli_options,
  usage: cli.getUsage(opts)
}