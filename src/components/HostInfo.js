import React, { useState } from "react";
import {
  Radio,
  Icon,
  Card,
  Grid,
  Image,
  Dropdown,
  Divider,
} from "semantic-ui-react";
import "../stylesheets/HostInfo.css";

function HostInfo({ host, areas, onUpdateHost, onAddLog}) {
  // This state is just to show how the dropdown component works.
  // Options have to be formatted in this way (array of objects with keys of: key, text, value)
  // Value has to match the value in the object to render the right text.

  // IMPORTANT: But whether it should be stateful or not is entirely up to you. Change this component however you like.

  const { imageUrl, firstName, gender, active, area} = host;

  const [options] = useState([
    { key: "some_area", text: "Some Area", value: "some_area" },
    { key: "another_area", text: "Another Area", value: "another_area" },
  ]);

  const [value] = useState("some_area");

  function createLog(type, msg) {
    const date = new Date();
    const time = date.toLocaleTimeString();
  
    return { type: type, msg: `[${time}] ${type.toUpperCase()}: ${msg}` };
  }
  
  function logError(msg) {
    return createLog('error', msg);
  }
  
  function logWarn(msg) {
    return createLog('warn', msg);
  }
  
  function logNotify(msg) {
    return createLog('notify', msg);
  }

  function handleOptionChange(e, { value }) {
    // the 'value' attribute is given via Semantic's Dropdown component.
    // Put a debugger or console.log in here and see what the "value" variable is when you pass in different options.
    // See the Semantic docs for more info: https://react.semantic-ui.com/modules/dropdown/#usage-controlled

    const newArea = areas.find((area)=>area.name === value);
    if (newArea.hosts.length < newArea.limit){
      fetch(`http://localhost:3001/hosts/${host.id}`,{
        method:"PATCH",
        headers:{
          'Content-Type':'application/json'
        },
        body: JSON.stringify({area: newArea.name})
      })
        .then(r=>r.json())
        .then((updatedHost)=>{
          onUpdateHost(updatedHost);
          onAddLog(
            logError(
              logNotify(`${host.firstName} set in area ${newArea.formattedName}`)
            )
          )
        })
    }else{
      onAddLog(
        logError(
          `Too many hosts. Cannot add ${host.firstName} to ${newArea.formattedName}`
        )
      )
    }
  }

  function handleRadioChange(e, { checked }) {
    console.log("The radio button fired");
    fetch(`http://localhost:3001/hosts/${host.id}`,{
      method:"PATCH",
      headers:{
        'Content-Type':'application/json'
      },
      body:JSON.stringify({active: checked})
    })
      .then(r=>r.json())
      .then((updatedHost)=>{
        onUpdateHost(updatedHost);
        if(checked){
          onAddLog(logWarn(`Activated ${host.firstName}`));
        } else {
          onAddLog(logNotify(`Decommissioned ${host.firstName}`));
        }
      })
  }

  return (
    <Grid>
      <Grid.Column width={6}>
        <Image
          src={imageUrl}
          floated="left"
          size="small"
          className="hostImg"
        />
      </Grid.Column>
      <Grid.Column width={10}>
        <Card>
          <Card.Content>
            <Card.Header>
              {firstName} | {gender === 'Male' ? <Icon name="man" /> : <Icon name="woman" />}
              {/* Think about how the above should work to conditionally render the right First Name and the right gender Icon */}
            </Card.Header>
            <Card.Meta>
              {/* Sometimes the label should take "Decommissioned". How are we going to conditionally render that? */}
              {/* Checked takes a boolean and determines what position the switch is in. Should it always be true? */}
              <Radio
                onChange={handleRadioChange}
                label={active ? "Active" : "Decommissioned"}
                checked={active}
                slider
              />
            </Card.Meta>
            <Divider />
            Current Area:
            <Dropdown
              onChange={handleOptionChange}
              value={area}
              options={options}
              selection
            />
          </Card.Content>
        </Card>
      </Grid.Column>
    </Grid>
  );
}

export default HostInfo;
