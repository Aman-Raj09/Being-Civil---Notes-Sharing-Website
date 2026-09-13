/* Renders the main nav from NAV_DATA (see nav-data.js).
   Works from any depth because each page sets data-prefix / data-slug on <body>. */
(function () {
  function el(tag, cls, text) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  function pageHref(prefix, slug) {
    return slug === "index" ? prefix + "index.html" : prefix + "pages/" + slug + ".html";
  }

  function buildSubmenu(nodes, prefix) {
    var ul = el("ul", "submenu");
    nodes.forEach(function (node) {
      var li = el("li");
      var a = el("a", null, node.title);
      a.href = pageHref(prefix, node.slug);
      li.appendChild(a);
      ul.appendChild(li);
    });
    return ul;
  }

  function buildList(nodes, prefix, currentSlug) {
    var ul = el("ul");
    nodes.forEach(function (node) {
      var li = el("li");
      if (node.slug === currentSlug) li.classList.add("current");

      if (node.children && node.children.length) {
        li.classList.add("has-children");
        var label = el("span", "parent-label", node.title);
        label.setAttribute("tabindex", "0");
        label.setAttribute("role", "button");
        label.setAttribute("aria-expanded", "false");
        label.addEventListener("click", function (e) {
          e.stopPropagation();
          var willOpen = !li.classList.contains("open");
          document.querySelectorAll(".has-children.open").forEach(function (o) {
            if (o !== li) { o.classList.remove("open"); }
          });
          li.classList.toggle("open", willOpen);
          label.setAttribute("aria-expanded", String(willOpen));
        });
        label.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); label.click(); }
        });
        li.appendChild(label);
        li.appendChild(buildSubmenu(node.children, prefix));
      } else {
        var a = el("a", null, node.title);
        a.href = pageHref(prefix, node.slug);
        li.appendChild(a);
      }
      ul.appendChild(li);
    });
    return ul;
  }

  document.addEventListener("DOMContentLoaded", function () {
    var mount = document.getElementById("main-nav");
    if (!mount || typeof NAV_DATA === "undefined") return;

    var prefix = document.body.getAttribute("data-prefix") || "";
    var currentSlug = document.body.getAttribute("data-slug") || "";
    mount.appendChild(buildList(NAV_DATA, prefix, currentSlug));

    var toggle = document.getElementById("nav-toggle");
    if (toggle) {
      toggle.addEventListener("click", function () {
        mount.classList.toggle("open");
      });
    }
    document.addEventListener("click", function () {
      document.querySelectorAll(".has-children.open").forEach(function (o) {
        o.classList.remove("open");
      });
    });
  });
})();
