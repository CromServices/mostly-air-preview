(function () {
  "use strict";

  var THEME_KEY = "mostly-air-theme";

  function applyTheme(theme) {
    var next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      var isDark = next === "dark";
      btn.setAttribute("aria-pressed", isDark ? "true" : "false");
      btn.textContent = isDark ? "Light" : "Dark";
      btn.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme"
      );
    });
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    if (saved === "dark" || saved === "light") {
      applyTheme(saved);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark");
    } else {
      applyTheme("light");
    }
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark");
      });
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

  function initForm(form) {
    var errors = form.querySelector(".form-errors");
    var thanks = form.parentNode.querySelector(".thanks");
    var title = thanks ? thanks.querySelector(".thanks-title") : null;
    var kind = form.getAttribute("data-form");

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      e.stopPropagation();

      var msgs = [];
      function need(cond, field, msg) {
        setInvalid(form.elements[field], !cond);
        if (!cond) msgs.push(msg);
      }

      if (kind === "quote") {
        var name = fieldValue(form, "name");
        var phone = fieldValue(form, "phone");
        var email = fieldValue(form, "email");
        var suburb = fieldValue(form, "suburb");
        var details = fieldValue(form, "details");
        var typeEl = form.elements.work;
        var whenEl = form.elements.when;
        need(name.length > 0, "name", "Enter your name.");
        need(phone.replace(/\D/g, "").length >= 8, "phone", "Enter a phone number.");
        need(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "email", "Enter an email address.");
        need(suburb.length > 0, "suburb", "Enter a suburb or address.");
        need(typeEl && typeEl.value, "work", "Choose a type of work.");
        need(details.length > 0, "details", "Add a short description.");
        need(whenEl && whenEl.value, "when", "Choose a preferred time to talk.");
      } else if (kind === "book") {
        var bname = fieldValue(form, "bname");
        var bphone = fieldValue(form, "bphone");
        var day = fieldValue(form, "day");
        var windowEl = form.elements.window;
        need(bname.length > 0, "bname", "Enter your name.");
        need(bphone.replace(/\D/g, "").length >= 8, "bphone", "Enter a phone number.");
        need(day.length > 0, "day", "Enter a preferred day.");
        need(windowEl && windowEl.value, "window", "Choose a time window.");
      }

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
        var who = kind === "book" ? fieldValue(form, "bname") : fieldValue(form, "name");
        title.textContent = who ? "Thanks " + who + ". I’ll call you back." : "Thanks. I’ll call you back.";
        thanks.hidden = false;
        thanks.focus();
      }
    });
  }

  initTheme();
  document.querySelectorAll("form[data-form]").forEach(initForm);
})();
