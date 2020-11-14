import React, { useState, useEffect } from "react";
import CanvasComponent from "./CanvasComponent";
import DragDropComponent from "./DragDropComponent";

export default function App() {
  const [target, setTarget] = useState();
  const [addedInputs, setAddedInputs] = React.useState([]);
  const [mode, setMode] = React.useState("design");
  const [templateElements, setTemplateElements] = React.useState([]);
  const [docImageDimensions, setDocImageDimensions] = React.useState({
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  });

  const generateGuid = () => {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (
      c
    ) {
      let r = (Math.random() * 16) | 0,
        v = c === "x" ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  };

  const setPositionAttributes = (target) => {
    if (target) {
      let targetDimensions = target.getBoundingClientRect();

      let left = targetDimensions.left - docImageDimensions.left;
      let top = targetDimensions.top - docImageDimensions.top;
      let width = targetDimensions.width;
      let height = targetDimensions.height;

      let element = templateElements[target.dataset.index];

      if (element) {
        element.left = left;
        element.top = top;
        element.width = width;
        element.height = height;
      }
    }
  };

  const displayElements = () => {
    let output = "";
    templateElements.map((x) => {
      output += JSON.stringify(x) + ",";
      return output;
    });
    console.log(output);
  };

  const createTextBox = (element) => {
    element.isPopulated = true;
    let left = element.left;
    let top = element.top;
    element.height = element.height - 5;

    let input = document.createElement("input");
    input.id = element.id;
    input.style.top = `${top}px`;
    input.style.left = `${left}px`;
    input.style.position = "absolute";
    input.className = "populate";
    input.style.zIndex = 1000;
    input.style.width = `${element.width}px`;
    input.style.height = `${element.height}px`;

    input.onkeyup = (e) => {
      let element = templateElements.find((x) => x.id === e.target.id);
      element.value = e.target.value;
      displayElements();
      setTemplateElements(templateElements);
    };

    return input;
  };

  const createTextDiv = (element) => {
    let left = element.left + 4;
    let top = element.top + 4;

    let input = document.createElement("div");
    input.innerHTML = element.value;
    input.className = "populate";

    input.id = element.id;
    input.style.top = `${top}px`;
    input.style.left = `${left}px`;
    input.style.fontFamily = "Arial";
    input.style.position = "absolute";
    input.style.zIndex = 1000;
    input.style.width = `${element.width}px`;
    input.style.height = `${element.height}px`;
    return input;
  };

  const createTextWidget = () => {
    let input = document.createElement("div");
    input.dataset.type = "text";
    input.className = "input-field";
    input.style.top = `${+window.scrollY}px`;
    input.style.left = "50px";
    return input;
  };

  const removeAllInputs = () => {
    let inputs = document.getElementsByClassName("input-field");
    while (inputs.length > 0) inputs[0].remove();

    inputs = document.getElementsByClassName("populate");
    while (inputs.length > 0) inputs[0].remove();
  };

  const populateForm = () => {
    setAddedInputs([]);
    removeAllInputs();
    setMode("populate");

    for (let i = 0; i < templateElements.length; i++) {
      let element = templateElements[i];

      if (!element.isPopulated) {
        let input = createTextBox(element);
        setAddedInputs((prev) => [...prev, input]);
      }
      setTemplateElements(templateElements);
    }
  };

  const showText = () => {
    setAddedInputs([]);
    removeAllInputs();
    setMode("text");
    for (let i = 0; i < templateElements.length; i++) {
      let element = templateElements[i];
      if (element.isPopulated) {
        let input = createTextDiv(element);
        setAddedInputs((prev) => [...prev, input]);
      }
    }
    setTemplateElements(templateElements);
  };

  const addElement = () => {
    setMode("design");
    let input = createTextWidget();
    setAddedInputs((prev) => [...prev, input]);
    addToCreatedElementCollection(input);
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

  const addToCreatedElementCollection = (target) => {
    let id = target.dataset.id;
    if (id == null || id.length === 0) {
      id = generateGuid();
      let index = templateElements.length;
      target.dataset.id = id;
      target.dataset.index = index;

      let elementType = target.dataset.type;
      let dimensions = target.getBoundingClientRect();

      let element = {
        id: id,
        left: 0,
        top: 0,
        type: elementType,
        isPopulated: false,
        width: dimensions.width,
        height: dimensions.height,
        value: "",
      };
      setTemplateElements((prev) => [...prev, element]);
    }
  };

  useEffect(() => {}, []);

  return (
    <div style={{ padding: "5px" }}>
      <DragDropComponent
        mode={mode}
        target={target}
        addedInputs={addedInputs}
        bounds={docImageDimensions}
        setPositionAttributes={setPositionAttributes}
        setTarget={setTarget}
        dragContainer={document.getElementById(".formCanvas")}
      />

      <div style={{ border: "1px solid blue" }}>
        <button onClick={addElement}>Add</button>&nbsp;
        <button onClick={populateForm}>Populate</button>
        <button onClick={showText}>Show Text</button>
      </div>

      <CanvasComponent
        addedInputs={addedInputs}
        setTarget={setTarget}
        imageLoaded={imageLoaded}
        mode={mode}
      />
    </div>
  );
}
