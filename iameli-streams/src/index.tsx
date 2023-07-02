import React from "react";
import ReactDOM from "react-dom";

const div = document.createElement("div");
div.innerHTML = "hello";
div.id = "iameli-streams";
document.body.prepend(div);

const App = () => <h1>Eli's Livestream App!!!</h1>;

ReactDOM.render(<App />, document.querySelector("#iameli-streams"));
