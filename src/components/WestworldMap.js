import React from "react";
import { Segment } from "semantic-ui-react";
import Area from "./Area";

function WestworldMap({ areas, onHostClick }) {
  return (
    <Segment id="map">
      {/* What should we render on the map? */}
      {areas.map((area)=>(
        <Area key={area.id} area={area} onHostClick={onHostClick}/>
      ))}
    </Segment>
  )
}

export default WestworldMap;
