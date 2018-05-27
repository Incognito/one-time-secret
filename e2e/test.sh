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

PUBLISH_RESPONSE="$(curl -s 'http://localhost:8080/new' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'secret=supersecretvalue&ttl=900000')"
if ! echo "$PUBLISH_RESPONSE" | grep 'https://localhost:8080/fetch[?]key='; then
  echo "Expected response with secret link"
  exit 1
fi


RESPONSE_SECRET_URL="$(echo "$PUBLISH_RESPONSE" | grep 'https://localhost:8080/fetch[?]key=')"
if ! curl -s ${RESPONSE_SECRET_URL/https:/http:} | grep 'supersecretvalue'; then
  echo "Expected to see supersecretvalue"
  exit 1
fi

sleep 1
if curl -s ${RESPONSE_SECRET_URL/https:/http:} | grep 'supersecretvalue'; then
  echo "Expected value to be missing now that it has been read"
  exit 1
fi

SHORT_DELAY_RESPONSE="$(curl -s 'http://localhost:8080/new' \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  --data 'secret=anothersecret&ttl=500')"
if ! echo "$SHORT_DELAY_RESPONSE" | grep 'https://localhost:8080/fetch'; then
  echo "Expected to be able to save something with a different expiry"
  exit 1
fi

SHORT_DELAY_RESPONSE_SECRET_URL="$(echo "$SHORT_DELAY_RESPONSE" | grep 'https://localhost:8080/fetch[?]key=')"
sleep 1 # because the previous test has a 500 ms ttl.
if curl -s ${SHORT_DELAY_RESPONSE_SECRET_URL/https:/http:} | grep 'anothersecret'; then
  echo "Expected value to be missing now that it has been read"
  exit 1
fi

echo "E2E tests successful"
exit 0
