import React, {
  useState,
  useEffect,
  Fragment,
  useRef,
  useLayoutEffect,
} from "react";
import DragDropComponent from "./DragDropComponent";
import TextFieldHelper from "./TextFieldHelper";

const CanvasComponent = (props) => {
  const canvas = useRef(null);
  const [inputs, setInputs] = React.useState([]);

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

  useEffect(() => {
    //console.log("mode", props.mode);
    //console.log("template", props.template);
    let template = props.template;
    for (let i = 0; i < template.length; i++) {
      let element = template[i];

      let input = TextFieldHelper.createTextInput(
        element,
        props.mode,
        inputValueChanged
      );

      if (element.add) {
        props.setTarget(input);
      }

      //console.log("input", input);
      canvas.current.append(input);

      props.setSelectableInputs((prev) => [...prev, input]);
    }
  }, [props.mode, props.template]);

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
      <div
        ref={canvas}
        style={{ position: "abo", top: 0, left: 0 }}
        id="formCanvas"
      >
        <img
          onLoad={imageLoaded}
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
