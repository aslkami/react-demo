import React from "react"; // 不使用这个对象， 但是编译时会自动执行  React.createElement()
import ReactDom from "react-dom";
import "./index.css";
import App from "./App";
// import * as serviceWorker from "./bak/serviceWorker"
import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
// import Counters from "./components/counters";

const element = <h1>hello world</h1>;
console.log(element);

// ReactDom.render(element, document.getElementById("root"))
ReactDom.render(<App />, document.getElementById("root"));

// serviceWorker.unregister()
