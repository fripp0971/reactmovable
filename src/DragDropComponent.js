import Selecto from "react-selecto";
import Moveable from "react-moveable";
import React, { useState, useEffect, Fragment, useRef } from "react";

const DragDropComponent = (props) => {
  const [frameMap] = useState(() => new Map());
  const moveableRef = useRef(null);
  const [target, setTarget] = useState([]);
  const [selectables, setSelectables] = useState();

  useEffect(() => {
    setSelectables(document.querySelectorAll(".input-field"));
  }, [props.template]);

  return (
    <Fragment>
      <Moveable
        ref={moveableRef}
        target={target}
        origin={false}
        renderDirections={["n", "w", "e", "s"]}
        elementGuidelines={selectables}
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
        selectableTargets={selectables}
        selectByClick
        selectFromInside={false}
        onDragStart={(e) => {
          const moveable = moveableRef.current;
          const temp = e.inputEvent.target;
          if (
            moveable.isMoveableElement(temp) ||
            target.some((t) => t === temp || t.contains(temp))
          ) {
            e.stop();
          }
        }}
        onSelect={(e) => {
          setTarget(e.selected);
        }}
        onSelectEnd={(e) => {
          const moveable = moveableRef.current;
          if (e.isDragStart) {
            e.inputEvent.preventDefault();

            setTimeout(() => {
              moveable.dragStart(e.inputEvent);
            });
          }
        }}
      ></Selecto>
    </Fragment>
  );
};

export default DragDropComponent;
