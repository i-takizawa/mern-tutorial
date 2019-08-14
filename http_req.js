const http = require('http');

http.get(ImagesURL, (res) => {
  let body ='';
  res.setEncoding('utf8');
  res.on('data', (chunk) => {
    body += chunk;
  });
  res.on('end', (res) => {
    res = JSON.parse(body);
    console.log(res);
  });
}).on('error', (e) => {
  console.log(e.message);
})