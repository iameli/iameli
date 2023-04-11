import * as chrono from "./node_modules/chrono-node";

const typeFormats = {
  t: { timeStyle: "short" },
  T: { timeStyle: "medium" },
  d: { dateStyle: "short" },
  D: { dateStyle: "long" },
  f: { dateStyle: "long", timeStyle: "short" },
  F: { dateStyle: "full", timeStyle: "short" },
  R: { style: "long", numeric: "auto" },
};

function automaticRelativeDifference(d) {
  const diff = -((new Date().getTime() - d.getTime()) / 1000) | 0;
  const absDiff = Math.abs(diff);
  if (absDiff > 86400 * 30 * 10) {
    return { duration: Math.round(diff / (86400 * 365)), unit: "years" };
  }
  if (absDiff > 86400 * 25) {
    return { duration: Math.round(diff / (86400 * 30)), unit: "months" };
  }
  if (absDiff > 3600 * 21) {
    return { duration: Math.round(diff / 86400), unit: "days" };
  }
  if (absDiff > 60 * 44) {
    return { duration: Math.round(diff / 3600), unit: "hours" };
  }
  if (absDiff > 30) {
    return { duration: Math.round(diff / 60), unit: "minutes" };
  }
  return { duration: diff, unit: "seconds" };
}

const nav = typeof navigator === "undefined" ? {} : navigator;

function updateOutput(ms, str) {
  // const selectedDate = new Date(
  //   dateInput.valueAsNumber +
  //     timeInput.valueAsNumber +
  //     new Date().getTimezoneOffset() * 60000
  // );
  const selectedDate = new Date(ms);
  const ts = selectedDate.getTime().toString();
  // output.value = `<t:${ts.substr(0, ts.length - 3)}:${typeInput.value}>`;

  if (["R"].includes(str)) {
    const formatter = new Intl.RelativeTimeFormat(
      nav.language || "en",
      typeFormats[str] || {}
    );
    const format = automaticRelativeDifference(selectedDate);
    return formatter.format(format.duration, format.unit);
  } else {
    const formatter = new Intl.DateTimeFormat(
      nav.language || "en",
      typeFormats[str] || {}
    );
    return formatter.format(selectedDate);
  }
}

export function discordTime(str) {
  let d = str;
  if (typeof str === "string") {
    d = chrono.parseDate(str);
  }
  if (!d) {
    return;
  }
  const ms = Math.round(d.getTime() / 1000);

  const out = {};
  for (const key of Object.keys(typeFormats)) {
    const str = `<t:${ms}:${key}>`;
    const preview = updateOutput(d.getTime(), key);
    out[str] = preview;
  }
  return out;
}

if (typeof process !== "undefined" && process.argv[2]) {
  console.log(discordTime(process.argv[2]));
  // console.log(`${str}\t\`${preview}\``);
}
