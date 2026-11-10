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
        var workVal = fieldValue(form, "work");
        var whenVal = fieldValue(form, "when");
        var workGroup = form.querySelector("[data-quote-work]");
        var whenGroup = form.querySelector("[data-quote-when]");
        need(name.length > 0, "name", "Enter your name.");
        need(phone.replace(/\D/g, "").length >= 8, "phone", "Enter a phone number.");
        need(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email), "email", "Enter an email address.");
        need(suburb.length > 0, "suburb", "Enter a suburb or address.");
        need(details.length > 0, "details", "Add a short description.");
        if (workGroup) {
          workGroup.classList.toggle("is-invalid", !workVal);
          workGroup.setAttribute("aria-invalid", workVal ? "false" : "true");
        }
        if (whenGroup) {
          whenGroup.classList.toggle("is-invalid", !whenVal);
          whenGroup.setAttribute("aria-invalid", whenVal ? "false" : "true");
        }
        if (!workVal) msgs.push("Choose a type of work.");
        if (!whenVal) msgs.push("Choose a preferred time to talk.");
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

  function initLightbox() {
    var items = Array.prototype.slice.call(document.querySelectorAll("[data-lightbox]"));
    var box = document.querySelector(".lightbox");
    if (!items.length || !box) return;

    var img = box.querySelector(".lb-img");
    var caption = box.querySelector(".lb-caption");
    var counter = box.querySelector(".lb-counter");
    var btnClose = box.querySelector(".lb-close");
    var btnPrev = box.querySelector(".lb-prev");
    var btnNext = box.querySelector(".lb-next");
    var index = 0;
    var lastFocus = null;
    var startX = 0;
    var startY = 0;
    var swiping = false;

    function controls() {
      return [btnClose, btnPrev, btnNext];
    }

    function show(i) {
      index = (i + items.length) % items.length;
      var link = items[index];
      var src = link.getAttribute("href");
      var text = link.getAttribute("data-caption") || "";
      var thumb = link.querySelector("img");
      img.src = src;
      img.alt = (thumb && thumb.getAttribute("alt")) || text;
      caption.textContent = text;
      counter.textContent = index + 1 + " / " + items.length;
    }

    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      box.hidden = false;
      document.documentElement.classList.add("lb-open");
      document.body.classList.add("lb-open");
      btnClose.focus();
    }

    function close() {
      box.hidden = true;
      img.removeAttribute("src");
      document.documentElement.classList.remove("lb-open");
      document.body.classList.remove("lb-open");
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    }

    items.forEach(function (link, i) {
      link.addEventListener("click", function (e) {
        e.preventDefault();
        open(i);
      });
    });

    btnClose.addEventListener("click", function (e) {
      e.stopPropagation();
      close();
    });
    btnPrev.addEventListener("click", function (e) {
      e.stopPropagation();
      show(index - 1);
    });
    btnNext.addEventListener("click", function (e) {
      e.stopPropagation();
      show(index + 1);
    });

    box.addEventListener("click", function (e) {
      if (e.target === box) close();
    });
    img.addEventListener("click", function (e) {
      e.stopPropagation();
    });

    document.addEventListener("keydown", function (e) {
      if (box.hidden) return;
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        show(index - 1);
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        show(index + 1);
        return;
      }
      if (e.key === "Tab") {
        var els = controls();
        var first = els[0];
        var last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    });

    document.addEventListener("focusin", function (e) {
      if (box.hidden || box.contains(e.target)) return;
      btnClose.focus();
    });

    box.addEventListener("touchstart", function (e) {
      if (!e.changedTouches.length) return;
      swiping = true;
      startX = e.changedTouches[0].clientX;
      startY = e.changedTouches[0].clientY;
    }, { passive: true });

    box.addEventListener("touchend", function (e) {
      if (!swiping || !e.changedTouches.length) return;
      swiping = false;
      var dx = e.changedTouches[0].clientX - startX;
      var dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) < 40 && Math.abs(dy) < 40) return;
      if (Math.abs(dy) > Math.abs(dx) && dy > 60) {
        close();
      } else if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx < 0) show(index + 1);
        else show(index - 1);
      }
    });
  }

  initTheme();
  document.querySelectorAll("form[data-form]").forEach(initForm);
  initLightbox();
})();
