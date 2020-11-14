import React, { useState, useEffect, Fragment, useRef } from "react";

const CanvasComponent = (props) => {
  const canvas = useRef(null);

  useEffect(() => {
    if (props.addedInputs) {
      props.addedInputs.forEach((input) => {
        canvas.current.append(input);
        props.setTarget(input);
      });
    }
  }, [props.addedInputs]);

  return (
    <Fragment>
      <div
        ref={canvas}
        style={{ position: "relative", top: 0, left: 0 }}
        id="formCanvas"
      >
        <img
          onLoad={props.imageLoaded}
          onClick={() => {
            props.setTarget(null);
          }}
          id="docImage"
          alt=""
          style={{
            width: "100%",
            border: "1px solid red",
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: -1,
          }}
          src="Notice.png"
        />
      </div>
    </Fragment>
  );
};

export default CanvasComponent;
