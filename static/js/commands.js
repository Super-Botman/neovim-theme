function command() {
  const setter = document.getElementById("setter");
  const writer = document.getElementById("writer");
  const input = setter.value.substring(1).split(" ");
  const command = input[0];
  input.shift();
  const args = input.join("").replace(" ", "").split("=");

  if (typeof commands[command] === "function") {
    commands[command](args, setter, writer);
  } else {
    setter.value = JSON.stringify({
      type: "error",
      message: "command not found",
    });
  }
}

function set(args) {
  const error = {
    type: "error",
    message: "invalid param",
  };

  const success = {
    type: "success",
    message: "command executed",
  };

  let param = args[0];
  let value = args[1];

  if (value == "true" || value == "false") {
    value = value == "true" ? true : false;
  } else {
    return error;
  }

  let config = JSON.parse(localStorage.getItem("config"));
  config[param] = value;
  localStorage.setItem("config", JSON.stringify(config));

  exec_config();
  return success;
}
