import React, {useState} from "react";
import ReactDOM from "react-dom";
import {
  Player,
  createReactClient,
  studioProvider,
  LivepeerConfig,
} from "@livepeer/react";
import styled from "styled-components";

const div = document.createElement("div");
div.innerHTML = "hello";
div.id = "iameli-streams";
document.body.prepend(div);

const livepeerClient = createReactClient({
  provider: studioProvider({ apiKey: "" }),
});

const Container = styled.div`
  max-width: 1170px;
  margin: auto;
`;

const LOCAL_STORAGE_LOW_LATENCY_KEY = "LOW_LATENCY"

let lowLatencyDefault = true;
try {
  const val = localStorage.getItem(LOCAL_STORAGE_LOW_LATENCY_KEY);
  if (val === "true") {
    lowLatencyDefault = true;
  } else if (val === "false") {
    lowLatencyDefault = false;
  }
}
catch (e) {
  // oh well
}

const LLButton = styled.button`
  margin: 5px auto;
  font-size: 1.4em;
  display: block;
`;

const App = () => {
  const [lowLatency, setLowLatency] = useState(lowLatencyDefault);
  return (
    <Container>
      <LivepeerConfig client={livepeerClient}>
        <Player playbackId="d649rj83prk16y67" autoPlay={true} lowLatency={lowLatency}></Player>
      </LivepeerConfig>
      <LLButton className="button logo-button" onClick={() => {
        const newState = !lowLatency
        setLowLatency(newState)
        try {
          localStorage.setItem(LOCAL_STORAGE_LOW_LATENCY_KEY, newState ? "true" : "false")
        } catch (e) {
          // oh well oh well oh well
        }
      }}>
        {lowLatency ? "Disable" : "Enable"} Low-Latency (WebRTC)
      </LLButton>
    </Container>
  );
};

if (!document.location.hash.includes("novid")) {
  ReactDOM.render(<App />, document.querySelector("#iameli-streams"));
}
