export const env = {
  PUBLISH_SECRET_URI: <string> process.env.PUBLISH_SECRET_URI,
  KEY_NAME_RANDOM_BYTES: +<string> process.env.KEY_NAME_RANDOM_BYTES,
  HTTP_PORT: +<string> process.env.PORT, // Heroku only provides PORT
  HTTP_TIMEOUT_MS: +<string> process.env.HTTP_TIMEOUT_MS // I reccomend 5000 ms, node default is 2 minutes
};
