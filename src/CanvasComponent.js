import React, { Fragment, useRef } from "react";
import DragDropComponent from "./DragDropComponent";
import TextFieldHelper from "./TextFieldHelper";

const CanvasComponent = (props) => {
  const canvas = useRef(null);

  const [docImageDimensions, setDocImageDimensions] = React.useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  //convert template to controls use mode

  const inputValueChanged = (e) => {
    props.inputValueChanged(e);
  };

  const renderInputs = (input) => {
    let control = TextFieldHelper.createTextInput(
      input,
      props.mode,
      inputValueChanged
    );

    return control;
  };

  const imageLoaded = () => {
    let docImage = document.getElementById("docImage");
    let dimensions = docImage.getBoundingClientRect();
    setDocImageDimensions({
      left: dimensions.left,
      right: dimensions.right,
      top: dimensions.top,
      bottom: dimensions.bottom,
    });
  };

  return (
    <Fragment>
      <DragDropComponent
        template={props.template}
        bounds={docImageDimensions}
        setPositionAttributes={props.setPositionAttributes}
        dragContainer={document.getElementById(".formCanvas")}
      />
      <div
        ref={canvas}
        style={{ position: "relative", top: 0, left: 0 }}
        id="formCanvas"
      >
        <img
          onLoad={imageLoaded}
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
        {props.template.map((input) => renderInputs(input))}
      </div>
    </Fragment>
  );
};

export default CanvasComponent;
