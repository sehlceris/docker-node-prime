const PORT = process.env.PORT || 3000;
const PRIME_LIMIT = process.env.PRIME_LIMIT || 1000000;

const http = require('http');
const url = require('url');

const generatePrimeNumbers = (limit) => {
  const start = Date.now();
  const primes = [];
  for (let current = 0; current <= limit; current++) {
    let notPrime = false;
    for (let i = 2; i <= primes.length && !notPrime; i++) {
      if (current % primes[i] === 0) {
        notPrime = true;
      }
    }
    if (notPrime === false) primes.push(current);
  }
  const end = Date.now();
  const duration = end - start;
  return {
    duration,
    largestPrime: primes.length ? primes[primes.length-1] : null,
    primes,
  };
}

const requestListener = function (req, res) {
  const route = url.parse(req.url).pathname;
  switch (route) {
    case '/':
      res.writeHead(200);
      return res.end('hello, world');
    case '/crash':
      res.writeHead(200);
      res.end('ahhh crashing!');
      console.log(`crash requested`);
      setTimeout(() => {
        process.exit(1);
      }, 1);
      break;
    case '/prime':
      const queryObject = url.parse(req.url, true).query;
      const limit = parseInt(queryObject.limit, 10);
      const all = queryObject.all === 'true' || queryObject.all === 'yes';
      if (Number.isInteger(limit)) {
        console.log(`generating primes up to limit: ${limit}`);
        const primeResult = generatePrimeNumbers(limit);
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        if (all) {
          res.end(JSON.stringify(primeResult));
        }
        else {
          res.end(JSON.stringify({
            duration: primeResult.duration,
            largestPrime: primeResult.largestPrime
          }));
        }
      } else {
        res.writeHead(400);
        return res.end(`please specify an integer as a query string 'limit' between 0 and ${PRIME_LIMIT}`);
      }
    default:
      res.writeHead(404);
      return res.end(`404 route not found: '${route}'`);
  }
}

const server = http.createServer(requestListener);
server.listen(PORT, () => {
  console.log(`server listening on port ${PORT}, maximum prime number generator at ${PRIME_LIMIT}`);
});
