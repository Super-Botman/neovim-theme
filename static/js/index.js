let cursor;
window.onload = init;

async function init() {
  cursor = document.getElementById("cursor");
  cursor.style.left = "0px";
  document.getElementById("setter").value = "";

  const default_config = {
    mouse: true,
  };
  if (!localStorage.getItem("config"))
    localStorage.setItem("config", JSON.stringify(default_config));
  if (!localStorage.getItem("focused")) localStorage.setItem("focused", "viewer");
  if (!localStorage.getItem("tabs")) localStorage.setItem("tabs", JSON.stringify([]));

  await render_tabs();
  await exec_config();

  document.getElementById(localStorage.getItem("focused")).focus();

  if (typeof custom_init != "undefined" && typeof custom_init === "function") {
    await custom_init();
  }
}
