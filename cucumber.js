let common = [
    'test/journey/features/*.feature', // Specify our feature files
    '--require-module ts-node/register', // Load TypeScript module
    '--require test/journey/step-definitions/*.js', // Load step definitions
    '--format progress-bar', // Load custom formatter
    '--format node_modules/cucumber-pretty' // Load custom formatter
  ].join(' ');
  
  module.exports = {
    default: common
  };