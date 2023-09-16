import React, { useState } from "react";
import { Segment } from "semantic-ui-react";
import "../stylesheets/App.css";
import WestworldMap from "./WestworldMap";
import Headquarters from "./Headquarters";

function App() {
  const [hosts, setHosts] = useState([]);
  const [areas, setAreas] = useState([]);
  const [selectedHostId, setSelectedHostId] = useState(null);

  useState(()=>{
    const hostUrl = 'http://localhost:3001/hosts';
    const areasUrl = 'http://localhost:3001/areas';

    Promise.all([fetch(hostUrl),fetch(areasUrl)])
      .then(resps => Promise.all((resps.map((resp)=>resp.json()))))
      .then(([hosts,areas])=>{
        setHosts(hosts)
        setAreas(areas)
      })
  },[])

  const handleSelectHost = (host) => setSelectedHostId(host.id);

  const hostselected = hosts.filter((host)=>host.id === selectedHostId);

  const handleUpdateHost = (updatedHost) => {
    const updateHostArray = hosts.map((host)=> host.id === updatedHost.id ? updatedHost : host);
    setHosts(updateHostArray);
  };

  const formatNames = (areaName) => {
    return areaName
      .split("_")
      .map((name)=> name[0].toUpperCase() + name.slice(1))
      .join(" ")
  };

  const composeHostsName = hosts.map((host) => ({
    ...host,
    selected: host.id === selectedHostId
  }))

  const inactiveHosts = composeHostsName.filter((host)=> !host.active);

  const activeHosts = hosts.length === hosts.filter((host)=> host.active).length;

  const composeAreasName = areas.map((area)=>({
    ...area,
    formattedName: formatNames(area.name),
    hosts: hosts.filter((host) => host.area === area.name),
  }));

  const handleClickActivate = (activate) => {
    const updateHosts = hosts.map((host)=>({
      ...host,
      active: activate,
    }));
    setHosts(updateHosts);
  };

  return (
    <Segment id="app">
      {/* What components should go here? Check out Checkpoint 1 of the Readme if you're confused */}
      <WestworldMap 
        areas={composeAreasName}
        onHostClick={handleSelectHost}
      />
      <Headquarters 
        hosts={inactiveHosts}
        onHostClick={handleSelectHost}
        selectedHost={hostselected}
        onUpdateHost={handleUpdateHost}
        activeHosts={activeHosts}
        onActivate={handleClickActivate}
        areas={composeAreasName}
      />
    </Segment>
  );
}

export default App;
