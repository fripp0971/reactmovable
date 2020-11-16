import React, { useState, useEffect } from "react";
import CanvasComponent from "./CanvasComponent";
import DragDropComponent from "./DragDropComponent";
//import TextFieldComponent from "./TextFieldComponent";

export default function App() {
  const [template, setTemplate] = useState([]);

  const [target, setTarget] = useState();
  const [selectableInputs, setSelectableInputs] = React.useState([]);
  const [mode, setMode] = React.useState("design");
  const [docImageDimensions, setDocImageDimensions] = React.useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const setPositionAttributes = (target) => {
    if (target) {
      let targetDimensions = target.getBoundingClientRect();

      let left = targetDimensions.left;
      let top = targetDimensions.top;
      let width = targetDimensions.width;
      let height = targetDimensions.height;

      let element = template[target.dataset.index];

      if (element) {
        console.log("found it");
        element.left = left;
        element.top = top;
        element.width = width;
        element.height = height;
        setTemplate(template);
        displayTemplate();
      }
    }
  };

  const displayTemplate = () => {
    let output = "";
    template.map((x) => {
      output += JSON.stringify(x) + ",";
      return output;
    });
    console.log(output);
  };

  const removeAllInputs = () => {
    let inputs = document.getElementsByClassName("input-field");
    while (inputs.length > 0) inputs[0].remove();

    inputs = document.getElementsByClassName("populate");
    while (inputs.length > 0) inputs[0].remove();
  };

  const generateGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const addElement = (type) => {
    setMode("design");

    setSelectableInputs([]);
    removeAllInputs();

    //build template here
    let element = {
      top: `${+window.scrollY}px`,
      left: "50px",
      type: "text",
      add: true,
      id: generateGuid(),
      index: template.length,
      width: 250,
      height: 27,
      value: "",
    };
    setTemplate((prev) => [...prev, element]);
  };

  const populateForm = () => {
    setSelectableInputs([]);
    removeAllInputs();
    setMode("populate");
  };

  const showText = () => {
    setSelectableInputs([]);
    removeAllInputs();
    setMode("view");
  };

  const inputValueChanged = (e) => {
    let element = template.find((x) => x.id === e.target.dataset.id);
    if (element != null) {
      element.value = e.target.value;
      setTemplate(template);
    }
  };

  useEffect(() => {
    //simulate a load of template

    setTemplate([
      {
        id: "d9768ae1-df12-4e4f-9335-ea8ea4f1345a",
        index: 0,
        type: "text",
        value: "Fred",
        height: 27,
        left: 222,
        top: 181,
        width: 250,
      },
      {
        id: "ff768ae1-df12-4e4f-9335-ea8ea4f1345a",
        index: 1,
        type: "text",
        value: "Flintstone",
        height: 27,
        left: 222,
        top: 220,
        width: 252,
      },
    ]);
  }, []);

  return (
    <div style={{ padding: "0px" }}>
      {mode === "design" && (
        <DragDropComponent
          target={target}
          selectableInputs={selectableInputs}
          bounds={docImageDimensions}
          setPositionAttributes={setPositionAttributes}
          setTarget={setTarget}
          dragContainer={document.getElementById(".formCanvas")}
        />
      )}
      <div style={{ border: "1px solid blue" }}>
        <button onClick={addElement}>Add</button>&nbsp;
        <button onClick={populateForm}>Populate</button>
        <button onClick={showText}>Show Text</button>
      </div>
      <CanvasComponent
        mode={mode}
        template={template}
        setTemplate={setTemplate}
        setTarget={setTarget}
        inputValueChanged={inputValueChanged}
        setSelectableInputs={setSelectableInputs}
        setDocImageDimensions={setDocImageDimensions}
      ></CanvasComponent>
    </div>
  );
}
