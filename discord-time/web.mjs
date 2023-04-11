import { discordTime } from "./discord-time.mjs";
import * as chrono from "chrono-node";

function htmlEntities(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

let date = false;

function rehydrate() {
  const u = new URL(document.location);
  const hash = u.hash.slice(1);
  const int = parseInt(hash);
  if (isNaN(int)) {
    return false;
  }
  const newDate = new Date(int * 1000);
  if (isNaN(newDate)) {
    return false;
  }
  return newDate;
}

const newDate = rehydrate();
if (newDate) {
  date = newDate;
} else {
  const u = new URL(document.location);
  u.hash = "";
  window.history.replaceState({}, "", u.toString());
}

document.querySelector(".timestr").addEventListener("keyup", (e) => {
  date = chrono.parseDate(e.target.value);
  if (date) {
    const u = new URL(document.location);
    u.hash = Math.round(date.getTime() / 1000);
    window.history.replaceState({}, "", u.toString());
  }
  render();
});

let last = "";

function render() {
  const out = discordTime(date);
  if (!out) {
    document.querySelector(".output").innerHTML = "";
  } else {
    // lol why didn't i just use react
    const next = `
        ${Object.entries(out)
          .map(
            ([k, v]) => `
            <div class="row" copy-text="${btoa(k)}">
              <div class="cell cell-left">
                <code>${htmlEntities(k)}</code>
              </div>
              <div class="cell cell-right">
                ${htmlEntities(v)}
              </div>
            </div>
        `
          )
          .join("\n")}
      `;
    if (next !== last) {
      document.querySelector(".output").innerHTML = next;
      last = next;
    }
  }
}

// Search up the stack for a div row
document.querySelector(".output").addEventListener("click", (e) => {
  let current = e.target;
  while (current && !current.hasAttribute("copy-text")) {
    current = current.parentNode;
  }
  if (!current) {
    return;
  }
  const text = atob(current.getAttribute("copy-text"));
  navigator.clipboard.writeText(text);
  current.classList.add("copy");
  setTimeout(() => {
    current.classList.remove("copy");
  }, 0);
});

function renderLoop() {
  render();
  // ugh fine. overkill.
  // requestAnimationFrame(renderLoop);
  setTimeout(renderLoop, 250);
}

renderLoop();
