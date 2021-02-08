# docker-node-prime

a small application for testing docker or kubernetes deployments.

## usage

```bash
npm start
```

## environment variables

- `PORT`: port the server should listen on, default `3000`
- `PRIME_LIMIT`: maximum number the prime number generator will accept

## endpoints

- `/`: returns a hello world message
- `/crash`: crashes the application
- `prime?limit=9999`: generates prime numbers up to the specified limit and then returns the largest prime found, as well as the duration it took to generate all the primes up to that point: `{'duration': 42965, 'largestPrime': 999983}`