const TextFieldHelper = {
  createTextInput: (element, mode, inputValueChanged) => {
    let { left, top, width, height, value, id, index } = element;
    height = height - 5;

    let input;

    if (mode === "design") {
      input = document.createElement("div");
      input.className = "input-field";
    } else if (mode === "populate") {
      input = document.createElement("input");
      input.className = "populate";
      input.value = value;
      input.onkeyup = inputValueChanged; //
    } else if (mode === "view") {
      input = document.createElement("div");
      input.innerHTML = value;
    }

    input.dataset.id = id;

    input.dataset.index = index;

    input.style.top = `${top}px`;
    input.style.left = `${left}px`;
    input.style.position = "absolute";
    input.style.zIndex = 1000;
    input.style.width = `${width}px`;
    input.style.height = `${height}px`;

    return input;
  },
};

export default TextFieldHelper;
