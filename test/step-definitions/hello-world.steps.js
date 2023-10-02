const {Given, When, Then, AfterAll, After} = require('cucumber');
const assert = require('assert').strict

When('Call to {string}', async function (string) {
  console.log({string})
})

Then('the response status code should be {string}', async function (a) {
  console.log({a})
  assert.deepEqual(a, a)
});

Then('the response should be {string}', async function (string) {
  assert.deepEqual(string, string)
});
