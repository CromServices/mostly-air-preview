(function () {
  "use strict";

  function setChromePad() {
    var chrome = document.querySelector(".site-chrome");
    if (!chrome) return;
    document.documentElement.style.setProperty(
      "--chrome",
      Math.ceil(chrome.getBoundingClientRect().height) + "px"
    );
  }

  function initMenu() {
    var toggle = document.querySelector(".menu-toggle");
    var nav = document.getElementById("site-nav");
    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      setChromePad();
    }

    function open() {
      nav.classList.add("is-open");
      toggle.setAttribute("aria-expanded", "true");
      setChromePad();
    }

    toggle.addEventListener("click", function () {
      if (nav.classList.contains("is-open")) close();
      else open();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.matchMedia("(min-width: 901px)").matches) close();
      else setChromePad();
    });
  }

  function fieldValue(form, name) {
    var el = form.elements[name];
    return el ? String(el.value || "").trim() : "";
  }

  function setInvalid(el, on) {
    if (!el) return;
    el.classList.toggle("is-invalid", on);
    el.setAttribute("aria-invalid", on ? "true" : "false");
  }

  function initForms() {
    document.querySelectorAll("form.quote-form").forEach(function (form) {
      var errors = form.querySelector(".form-errors");
      var thanks = form.parentNode.querySelector(".thanks");
      var title = thanks ? thanks.querySelector(".thanks-title") : null;

      form.addEventListener("submit", function (e) {
        e.preventDefault();
        e.stopPropagation();

        var name = fieldValue(form, "name");
        var phone = fieldValue(form, "phone");
        var email = fieldValue(form, "email");
        var suburb = fieldValue(form, "suburb");
        var details = fieldValue(form, "details");
        var when = fieldValue(form, "when");
        var typeEl = form.elements.type;

        var msgs = [];
        function need(cond, field, msg) {
          setInvalid(form.elements[field], !cond);
          if (!cond) msgs.push(msg);
        }

        need(name.length > 0, "name", "Enter your name.");
        need(phone.replace(/\D/g, "").length >= 8, "phone", "Enter a phone number.");
        need(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "email", "Enter an email address.");
        need(suburb.length > 0, "suburb", "Enter a suburb or address.");
        need(typeEl && typeEl.value, "type", "Choose a type of work.");
        need(details.length > 0, "details", "Add a short description.");
        need(when.length > 0, "when", "Enter a preferred time to talk.");

        if (msgs.length) {
          if (errors) {
            errors.hidden = false;
            errors.textContent = msgs.join(" ");
          }
          var first = form.querySelector(".is-invalid");
          if (first) first.focus();
          return;
        }

        if (errors) {
          errors.hidden = true;
          errors.textContent = "";
        }

        form.hidden = true;
        if (thanks && title) {
          title.textContent = "Thanks " + name + ", your request is in";
          thanks.hidden = false;
          thanks.classList.add("is-visible");
          thanks.focus();
        }
      });
    });
  }

  initMenu();
  initForms();
  setChromePad();
  window.addEventListener("resize", setChromePad);
})();
