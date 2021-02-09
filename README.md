# docker-node-prime

a small application for testing docker or kubernetes deployments.

## usage (local)

```bash
npm start
```

## usage (docker)

```bash
docker pull sehlceris/node-prime:latest

docker run \
  --rm \
  -e PORT=3000 \
  -e PRIME_LIMIT=2000000 \
  -p "3000:3000" \
  sehlceris/node-prime:latest
```

## usage (kubernetes)

Ensure you have `minikube` or `microk8s` installed.

```bash
kubectl apply -f kubernetes-deployment.yaml
```

## building

```bash
docker build -t sehlceris/node-prime:latest .
# docker build -t sehlceris/node-prime:0.1.0 .
docker login --username $USERNAME --password-stdin
docker push sehlceris/node-prime:latest
```

## environment variables

- `PORT`: port the server should listen on, default `3000`
- `PRIME_LIMIT`: maximum number the prime number generator will accept, default `1000000`

## endpoints

- `/`: returns a hello world message
- `/crash`: crashes the application
- `prime?limit=9999`: generates prime numbers up to the specified limit and then returns the largest prime found, as well as the duration it took to generate all the primes up to that point: `{'duration': 42965, 'largestPrime': 999983}`