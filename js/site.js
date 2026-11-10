(function () {
  "use strict";

  var THEME_KEY = "mostly-air-theme";
  var DAY_NAMES = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var MONTH_NAMES = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  function applyTheme(theme, persist) {
    var next = theme === "dark" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", next);
    if (persist) {
      try {
        localStorage.setItem(THEME_KEY, next);
      } catch (e) {}
    }
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.setAttribute("aria-pressed", next === "dark" ? "true" : "false");
    });
  }

  function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    if (saved === "dark" || saved === "light") {
      applyTheme(saved, false);
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      applyTheme("dark", false);
    } else {
      applyTheme("light", false);
    }
    document.querySelectorAll(".theme-toggle").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var current = document.documentElement.getAttribute("data-theme");
        applyTheme(current === "dark" ? "light" : "dark", true);
      });
    });
  }

  function fieldValue(form, name) {
    var el = form.elements[name];
    if (!el) return "";
    if (el.length && el[0] && el[0].type === "radio") {
      for (var i = 0; i < el.length; i++) {
        if (el[i].checked && !el[i].disabled) return String(el[i].value || "").trim();
      }
      return "";
    }
    return String(el.value || "").trim();
  }

  function setInvalid(el, on) {
    if (!el) return;
    el.classList.toggle("is-invalid", on);
    el.setAttribute("aria-invalid", on ? "true" : "false");
  }

  function checkedRadio(form, name) {
    var el = form.elements[name];
    if (!el) return null;
    if (el.length) {
      for (var i = 0; i < el.length; i++) {
        if (el[i].checked && !el[i].disabled) return el[i];
      }
      return null;
    }
    return el.checked && !el.disabled ? el : null;
  }

  function formatDay(date) {
    return DAY_NAMES[date.getDay()] + " " + date.getDate() + " " + MONTH_NAMES[date.getMonth()];
  }

  function isoDay(date) {
    var m = date.getMonth() + 1;
    var d = date.getDate();
    return date.getFullYear() + "-" + (m < 10 ? "0" : "") + m + "-" + (d < 10 ? "0" : "") + d;
  }

  function updateBookSummary(form) {
    var line = form.querySelector(".book-summary");
    if (!line) return;
    var dayEl = checkedRadio(form, "day");
    var timeEl = checkedRadio(form, "window");
    var day = dayEl ? dayEl.getAttribute("data-label") || dayEl.value : "";
    var time = timeEl ? timeEl.value : "";
    if (day && time) line.textContent = day + ", " + time;
    else if (day) line.textContent = day;
    else if (time) line.textContent = time;
    else line.textContent = "";
  }

  function fillDays(group) {
    var today = new Date();
    today.setHours(0, 0, 0, 0);
    group.innerHTML = "";
    for (var i = 0; i < 14; i++) {
      var date = new Date(today);
      date.setDate(today.getDate() + i);
      var weekend = date.getDay() === 0 || date.getDay() === 6;
      var label = formatDay(date);
      var wrap = document.createElement("label");
      wrap.className = "chip" + (weekend ? " is-weekend" : "");
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "day";
      input.value = isoDay(date);
      input.setAttribute("data-label", label);
      if (weekend) input.disabled = true;
      var span = document.createElement("span");
      span.textContent = label;
      wrap.appendChild(input);
      wrap.appendChild(span);
      group.appendChild(wrap);
    }
  }

  function initBookWidget(form) {
    var days = form.querySelector("[data-days]");
    if (days) fillDays(days);
    form.addEventListener("change", function () {
      updateBookSummary(form);
    });
    updateBookSummary(form);
  }

  function initForm(form) {
    var errors = form.querySelector(".form-errors");
    var thanks = form.parentNode.querySelector(".thanks");
    var kind = form.getAttribute("data-form");

    if (kind === "book") initBookWidget(form);

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
        var bphone = fieldValue(form, "bphone");
        var dayVal = fieldValue(form, "day");
        var timeVal = fieldValue(form, "window");
        var dayGroup = form.querySelector("[data-days]");
        var timeGroup = form.querySelector("[data-times]");
        var phoneEl = form.elements.bphone;
        setInvalid(phoneEl, bphone.replace(/\D/g, "").length < 8);
        if (dayGroup) {
          dayGroup.classList.toggle("is-invalid", !dayVal);
          dayGroup.setAttribute("aria-invalid", dayVal ? "false" : "true");
        }
        if (timeGroup) {
          timeGroup.classList.toggle("is-invalid", !timeVal);
          timeGroup.setAttribute("aria-invalid", timeVal ? "false" : "true");
        }
        if (!dayVal) msgs.push("Choose a day.");
        if (!timeVal) msgs.push("Choose a time.");
        if (bphone.replace(/\D/g, "").length < 8) msgs.push("Enter a phone number.");
      }

      if (msgs.length) {
        if (errors) {
          errors.hidden = false;
          errors.textContent = msgs.join(" ");
        }
        var first = form.querySelector(".is-invalid");
        if (first) {
          var focusEl = first.matches("input, select, textarea") ? first : first.querySelector("input:not(:disabled), select, textarea, button");
          if (focusEl) focusEl.focus();
        }
        return;
      }

      if (errors) {
        errors.hidden = true;
        errors.textContent = "";
      }

      form.hidden = true;
      if (thanks) {
        thanks.hidden = false;
        thanks.focus();
      }
    });
  }

  initTheme();
  document.querySelectorAll("form[data-form]").forEach(initForm);
})();
