import Selecto from "react-selecto";
import Moveable from "react-moveable";

import React, { useState, useEffect, Fragment, useRef } from "react";

const DragDropComponent = (props) => {
  const [frameMap] = useState(() => new Map());
  const moveableRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <Fragment>
      <Moveable
        ref={moveableRef}
        target={props.target}
        origin={false}
        renderDirections={["n", "w", "e", "s"]}
        elementGuidelines={props.selectableInputs}
        bounds={props.docImageDimensions}
        edge
        draggable
        throttleDrag={0}
        onDragStart={(e) => {
          const target = e.target;
          if (!frameMap.has(target)) {
            frameMap.set(target, {
              translate: [0, 0],
            });
          }
          const frame = frameMap.get(target);
          e.set(frame.translate);
        }}
        onDrag={(e) => {
          const target = e.target;
          const frame = frameMap.get(target);
          frame.translate = e.beforeTranslate;
          target.style.transform = `translate(${frame.translate[0]}px, ${frame.translate[1]}px)`;
        }}
        onDragEnd={(e) => {
          const target = e.target;
          props.setPositionAttributes(target);
        }}
        keepRatio={false}
        resizable
        throttleResize={0}
        onResizeStart={({ target, set, setOrigin, dragStart }) => {
          if (!frameMap.has(target)) {
            frameMap.set(target, {
              translate: [0, 0],
            });
          }
          const frame = frameMap.get(target);
          if (frame) {
            setOrigin(["%", "%"]);
            dragStart && dragStart.set(frame.translate);
          }
        }}
        onResize={({ target, width, height, drag }) => {
          const frame = frameMap.get(target);
          const beforeTranslate = drag.beforeTranslate;
          frame.translate = beforeTranslate;
          target.style.width = `${width}px`;
          target.style.height = `${height}px`;
          target.style.transform = `translate(${beforeTranslate[0]}px, ${beforeTranslate[1]}px)`;
        }}
        onResizeEnd={({ target }) => {
          props.setPositionAttributes(target);
          //props.setTarget(target);
        }}
        snappable
        snapThreshold={5}
        isDisplaySnapDigit
        snapGap
        snapElement
        snapVertical
        snapHorizontal
        snapCenter={false}
        snapDigit={0}
      />
      <Selecto
        dragContainer={props.dragContainer}
        selectableTargets={props.selectableInputs}
        selectByClick
        selectFromInside={false}
        onSelect={(e) => {}}
        onSelectEnd={(e) => {
          if (e.selected.length > 0) {
            props.setTarget(e.selected);

            props.setPositionAttributes(e.selected[0]);
          } else {
            if (!Array.isArray(props.target)) {
              props.setPositionAttributes(props.target);
            }
          }
        }}
      ></Selecto>
    </Fragment>
  );
};

export default DragDropComponent;
