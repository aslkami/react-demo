import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://10fbd593338a45b7a6f61fde105b14fe@sentry.io/1523604",
    debug: true
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
