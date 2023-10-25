const { Given, When, Then, AfterAll, After } = require('cucumber');
const assert = require('assert').strict;
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const deepEqualSkipProperty = require('../../utils/utils');

let store_Id, branch_Id, table_Id, transaction_Id, request, response;

Given(
  'the storeId is {string}, branchId is {string}, and tableId is {string}',
  async function (sid, bid, tid) {
    store_Id = sid;
    (branch_Id = bid), (table_Id = tid);
  },
);

When(
  'I send GET request to {string} with param {string}={string}',
  async function (route, paramKey, paramDynamicValue) {
    const url = `${process.env.API_URL}${route}?${paramKey}=${paramDynamicValue}`;
    request = await fetch(url);
    response = await request.json();
  },
);

When('I send GET request to {string}', async function (route) {
  const url = `${process.env.API_URL}${route}`;
  request = await fetch(url);
  response = await request.json();
});

Then('the response status code should be {string}', async function (status) {
  assert.equal(request.status.toString(), status);
});

Then('I receive {string}', async function (fileName) {
  try {
    const filePath = path.join(__dirname, '..', 'data', fileName);
    const fileData = fs.readFileSync(filePath, 'utf8');
    const expectedData = JSON.parse(fileData);
    deepEqualSkipProperty(response, expectedData, 'photo');
  } catch (err) {}
});

When('I send POST request to {string}', async function (route) {
  const url = `${process.env.API_URL}${route}`;

  const urlencoded = new URLSearchParams();
  urlencoded.append('status', 'new');
  urlencoded.append('branch_Id', branch_Id || '');
  urlencoded.append('notes', 'test');
  urlencoded.append('table', table_Id || '');
  urlencoded.append(
    'item',
    JSON.stringify({ _id: '651785f8d6250244c1d62068', qty: 1 }),
  );

  request = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: urlencoded,
  });

  response = await request.json();
});
// When('I send POST request to {string} to pay', async function (route) {
//   const url = `${process.env.API_URL}${route}`;

//   const urlencoded = new URLSearchParams();
//   urlencoded.append('_id', '651e25e2d9890204f32842f7');
//   urlencoded.append('status', 'to_pay_cash');
//   console.log;

//   request = await fetch(url, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/x-www-form-urlencoded',
//     },
//     body: urlencoded,
//   });

//   response = await request.json();
// });

// When('I send GET request to {string}', async function (route) {
//   const url = `${process.env.API_URL}${route}`;
//   request = await fetch(url);
//   response = await request.json();
// });
