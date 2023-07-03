import React from "react";
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

const App = () => {
  return (
    <Container>
      <LivepeerConfig client={livepeerClient}>
        <Player playbackId="d649rj83prk16y67" autoPlay={true}></Player>
      </LivepeerConfig>
    </Container>
  );
};

ReactDOM.render(<App />, document.querySelector("#iameli-streams"));
