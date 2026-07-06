const http = require('http');
const data = JSON.stringify({ name: 'test', email: 'test@example.com', password: 'test123' });
const options = {
  hostname: '127.0.0.1',
  port: 3005,
  path: '/api/auth/register',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(data)
  }
};
const req = http.request(options, (res) => {
  console.log('STATUS', res.statusCode);
  console.log('HEADERS', res.headers);
  let body = '';
  res.setEncoding('utf8');
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => { console.log('BODY', body); });
});
req.on('error', (err) => { console.error('ERR', err.message); });
req.write(data);
req.end();
