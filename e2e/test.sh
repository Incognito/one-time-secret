#!/bin/bash

# Order of tests is important to test the server state


if ! curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/new | grep '^200$'; then
  echo "Expected response 200 OK when viewing authorship page"
  exit 1
fi

if ! curl --write-out %{http_code} --silent --output /dev/null http://localhost:8080/garbage-url | grep '^404$'; then
  echo "Expected response 404 when visiting bad page"
  exit 1
fi

if ! curl -s 'http://localhost:8080/new' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'secret=supersecretvalue&ttl=900000' \
  | grep '>https://example.com/fetch[?]key=<'; then

  echo "Expected response with secret link"
  exit 1
fi

if ! curl -s 'http://localhost:8080/fetch?key=' | grep 'supersecretvalue'; then
  echo "Expected to see supersecretvalue"
  exit 1
fi

sleep 1
if $(curl -s 'http://localhost:8080/fetch?key=' | grep 'supersecretvalue'); then
  echo "Expected value to be missing now that it has been read"
  exit 1
fi

if ! curl -s 'http://localhost:8080/new' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'secret=anothersecret&ttl=500' \
  | grep '>https://example.com/fetch[?]key=<'; then
  echo "Expected to be able to save something with a different, sort expiry"
  exit 1
fi

sleep 1 # because the previous test has a 500 ms ttl.
if curl -s 'http://localhost:8080/fetch?key=' | grep 'anothersecret'; then
  echo "Expected value to be missing now that it has been read"
  exit 1
fi

echo "E2E tests successful"
exit 0
