export const env = {
  PUBLISH_SECRET_URI: <string> process.env.PUBLISH_SECRET_URI,
  KEY_NAME_RANDOM_BYTES: +<string> process.env.KEY_NAME_RANDOM_BYTES,
  DOMAIN: <string> process.env.DOMAIN,
  HTTP_PORT: +<string> process.env.PORT, // Heroku only provides PORT
  HTTP_TIMEOUT_MS: +<string> process.env.HTTP_TIMEOUT_MS, // I reccomend 5000 ms, node default is 2 minutes
  MAX_UPLOAD_KB: +<string> process.env.MAX_UPLOAD_KB // 128 is probably reasonable but feel free to configure. Remember this data stays in.memory.
};
