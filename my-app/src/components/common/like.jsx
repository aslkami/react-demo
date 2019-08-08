import React from "react";

const Like = props => {
  let heartClass = "fa fa-heart";
  if (!props.liked) {
    heartClass += "-o";
  }
  return (
    <i
      className={heartClass}
      style={{ cursor: "pointer" }}
      aria-hidden="true"
      onClick={props.onClick}
    />
  );
};

export default Like;
