const request = require("request");
const util = require("util");
const qs = require("querystring");
const post = util.promisify(request.post);

const TWITTER_OAUTH_CALLBACK_URL = process.env.TWITTER_CALLBACK_URL;
const TWITTER_OAUTH_CONSUMER_KEY = process.env.TWITTER_CONSUMER_API_KEY;
const TWITTER_OAUTH_CONSUMER_SECRET =
  process.env.TWITTER_CONSUMER_API_SECRET_KEY;
const TWITTER_API_URL = "https://api.twitter.com";
const TWITTER_API_REQUEST_TOKEN_URL = new URL(
  `${TWITTER_API_URL}/oauth/request_token`
);

const twitter = (function() {
  async function request_token() {
    const oAuthConfig = {
      callback: TWITTER_OAUTH_CALLBACK_URL,
      consumer_key: TWITTER_OAUTH_CONSUMER_KEY,
      consumer_secret: TWITTER_OAUTH_CONSUMER_SECRET
    };
    const request = await post({
      url: TWITTER_API_REQUEST_TOKEN_URL,
      oauth: oAuthConfig
    });
    if (request.statusCode === 200) {
      return qs.parse(request.body);
    } else {
      throw new Error("Unable to get oAuth Request Token");
    }
  }
  return {
    request_token
  };
})();

module.exports = twitter;