const TextFieldHelper = {
  createTextInput: (element, mode, inputValueChanged) => {
    let { left, top, width, height, value, id, index } = element;
    height = height - 5;

    if (mode === "design") {
      return (
        <div
          key={id}
          data-id={id}
          data-index={index}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            type: "text",
            width: `${width}px`,
            height: `${height}px`,
            zIndex: 1000,
            position: "absolute",
          }}
          className="input-field"
        />
      );
    } else if (mode === "populate") {
      return (
        <input
          key={id}
          data-id={id}
          data-index={index}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            type: "text",
            width: `${width}px`,
            height: `${height}px`,
            zIndex: 1000,
            position: "absolute",
          }}
          onKeyUp={inputValueChanged}
          defaultValue={value}
        />
      );
    } else if (mode === "view") {
      return (
        <div
          key={id}
          data-id={id}
          data-index={index}
          style={{
            top: `${top}px`,
            left: `${left}px`,
            type: "text",
            width: `${width}px`,
            height: `${height}px`,
            zIndex: 1000,
            position: "absolute",
          }}
        >
          {value}
        </div>
      );
    }
  },
};

export default TextFieldHelper;
