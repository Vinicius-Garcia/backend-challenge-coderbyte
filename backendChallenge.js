const https = require('https');

const valuesToRemove = ['N/A', '-', ''];
const filterArray = (arr) => arr.filter((v) => !valuesToRemove.includes(v));
const filterObject = (obj) => {
  for (const key in obj) {
    if (valuesToRemove.includes(obj[key])) {
      delete obj[key];
    }
  }
  return obj;
};

https.get('https://coderbyte.com/api/challenges/json/json-cleaning', (resp) => {
  let data = '';

  resp.on('data', (chunk) => {
    data += chunk;
  });

  resp.on('end', () => {
    data = JSON.parse(data);
    data = filterObject(data);
    Object.keys(data).forEach((key) => {
      if (Array.isArray(data[key])) {
        data[key] = filterArray(data[key]);
      } else if (data[key] instanceof Object) {
        data[key] = filterObject(data[key]);
      }
    });
    console.log(JSON.stringify(data));
  });
});