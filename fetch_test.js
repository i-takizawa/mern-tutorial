const fetch = require('node-fetch');

fetch('http://localhost:2376/images/json')
  .then((res) => {
    return res.json();
  })
  .then((json) => {
    console.log(JSON.stringify(json));
  })