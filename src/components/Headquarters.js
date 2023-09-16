import React, { useState } from "react";
import { Grid } from "semantic-ui-react";
import Details from "./Details";
import "../stylesheets/Headquarters.css";
import ColdStorage from "./ColdStorage";
import LogPanel from "./LogPanel";

function Headquarters({ hosts, onHostClick, selectedHost, onUpdateHost, activeHosts, onActivate, areas }) {
  const [logs, setLogs] = useState([]);

  const handleAddLog = (log) => {
    setLogs([...logs, log]);
  };

  return (
    <Grid celled="internally">
      <Grid.Column width={8}>
        {/* Something goes here.... */}
        <ColdStorage 
          hosts={hosts} 
          onHostClick={onHostClick}
        />
      </Grid.Column>
      <Grid.Column width={5}>
        <Details 
          host={selectedHost}
          areas={areas}
          onUpdateHost={onUpdateHost}
          onAddLog={handleAddLog}
        />
      </Grid.Column>
      <Grid.Column width={3}>
        {/* and here. Take visual cues from the screenshot/video in the Readme. */}
        <LogPanel 
          logs={logs}
          activeHosts={activeHosts}
          onActivate={onActivate}
          onAddLog={handleAddLog}
        />
      </Grid.Column>
    </Grid>
  );
}

export default Headquarters;