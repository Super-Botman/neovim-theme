function exec_config() {
  const config = JSON.parse(localStorage.getItem("config"));

  Object.keys(config).map((key) => {
    const value = config[key];
    switch (key) {
      case "mouse":
        const html = document.getRootNode().documentElement;
        html.style = value ? "" : "cursor:none;pointer-events:none;";
        break;

      default:
    }
  });
}

const keys = {
  normal: {
    escape: () => {
      document.getElementById("setter").focus();
      document.getElementById("setter").value = "";
    },

    enter: (event, element, { is_prompt }) => {
      if (is_prompt) {
        command();
      } else {
        new_tab(element, true);
      }
    },

    j: (event, element, { is_viewer, is_page, is_prompt }) => {
      if (is_viewer && is_page) {
        element.scrollBy(0, 30);
      } else if (!is_prompt) {
        next_file(-1, element);
      }
    },

    k: (event, element, { is_viewer, is_page, is_prompt }) => {
      if (is_viewer && is_page) {
        element.scrollBy(0, -30);
      } else if (!is_prompt) {
        next_file(1, element);
      }
    },

    l: (event, element, { is_prompt }) => {
      if (!is_prompt) element.scrollBy(30, 0);
    },

    h: (event, element, { is_prompt }) => {
      if (!is_prompt) element.scrollBy(-30, 0);
    },
  },

  shortcut: {
    l: () => {
      document.getElementById("viewer").focus();
      localStorage.setItem("focused", "viewer");
    },

    h: () => {
      document.getElementById("files").focus();
      localStorage.setItem("focused", "files");
    },

    t: (event, element) => {
      new_tab(element);
    },

    q: () => {
      del_tab();
    },
    
    tab: () => {
      next_tab();
    },
  },
};

const commands = {
  help: () => {
    window.location.href = "/readme";
  },

  set: (args, setter) => {
    const success = set(args);
    setter.value = JSON.stringify(success);
  },

  q: () => {
    window.location.href = "https://search.ononoki.org";
  },
};
