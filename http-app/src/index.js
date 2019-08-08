import "bootstrap/dist/css/bootstrap.css";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";
import logger from "./services/log";

logger.init();

ReactDOM.render(<App />, document.getElementById("root"));
registerServiceWorker();
