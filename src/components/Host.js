import React from "react";
import { Card } from "semantic-ui-react";
import "../stylesheets/Host.css";

function Host({ host, onHostClick }) {
  /* NOTE: The className "host selected" renders a different style than simply "host". */
  const {imageUrl} = host
  return (
    <Card
      className="host selected"
      onClick={()=>onHostClick(host)}
      image={imageUrl}
      raised
      link
    />
  );
}

export default Host;
