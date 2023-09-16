import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Log } from "../services/Log";

function LogPanel({ logs, activeHosts, onActive, onAddLog }) {
  function handleClickActive() {
    // This is just to show you how this should work. But where should the log data actually get stored?
    // And where should we be creating logs in the first place?
    // Use the Log Service class (located in: 'src/services/Log') we've created anywhere you like.
    // Just remember to import it

    //let logs = [];

    //logs.unshift(Log.warn("This is an example of a warn log"));
    //logs.unshift(Log.notify("This is an example of a notify log"));
    //logs.unshift(Log.error("This is an example of an error log"));

    //return logs;
    const activate = !activeHosts;
    if(activate){
      onAddLog(Log.warn("Activating all hosts!"));
    }else{
      onAddLog(Log.notify("Decommissiong all hosts."));
    }
    onActive(activate);
  }

  return (
    <Segment className="HQComps" id="logPanel">
      <pre>
        {logs.map((log, i) => (
          <p key={i} className={log.type}>
            {log.msg}
          </p>
        ))}
      </pre>

      {/* Button below is the Activate All/Decommisssion All button */}
      {/* This isn't always going to be the same color...*/}
      {/* Should the button always read "ACTIVATE ALL"? When should it read "DECOMMISSION ALL"? */}
      <Button 
        fluid 
        color={activeHosts ? "green" : "red"} 
        content={activeHosts ? "DECOMMISSION ALL" : "ACTIVATE ALL"}
        onClick={handleClickActive} 
      />
    </Segment>
  );
}

export default LogPanel;
