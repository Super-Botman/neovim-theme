function exec(event) {
  let element = document.activeElement;

  const key = event.key.toLocaleLowerCase();
  const is_page = element.classList.contains("page");
  const is_viewer = element.id == "viewer";
  const is_files = element.id == "files";
  const is_prompt = element.id == "setter";

  if (key != "r" && (is_viewer || is_files)) event.preventDefault();

  element = is_viewer ? document.getElementById("content") : element;

  const context = { is_page, is_viewer, is_files, is_prompt };
  const map = event.shiftKey ? keys.shortcut : keys.normal;

  if (typeof map[key] === "function") {
    map[key](event, element, context);
  }
}

function next_file(incrementer, element) {
  const a = element.getElementsByClassName("selected")[0];
  const index = parseInt(a.attributes.tabindex.value);
  const next_element = element.querySelector(
    `[tabindex='${index + incrementer}']`,
  );

  if (next_element) {
    next_element.classList.add("selected");
    a.classList.remove("selected");
  }
}
