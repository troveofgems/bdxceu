import fs from "fs";

////////////////////////////////////////////////////
//  PRINTS AN OBJECTS KEYS AND VALUES TO THE CONSOLE
////////////////////////////////////////////////////
const __constructMessage = (o, m, r, s) => `${m}\n${JSON.stringify(o, r, s)}`,
  __printMessage = (m, t) => console[t](m),
  __printLog = (logId, logData) => {
    let logName = `logs/${logId}.log`;
    fs.appendFileSync(logName, logData);
  };

const _sendToConsole = (o, m, t, r, s) => {
  let constructedMessageForConsole = __constructMessage(o, m, r, s);
  return __printMessage(constructedMessageForConsole, t);
};

const _writeToLog = (o, m, r, s, eid) => {
  let constructedMessageForConsole = __constructMessage(o, m, r, s);
  return __printLog(eid, constructedMessageForConsole);
};

const _assignOrdinalSuffix = (val) => {
  let ord = "th",
    assignOrdinalST = val % 10 === 1 && val % 100 !== 11,
    assignOrdinalND = val % 10 === 2 && val % 100 !== 12,
    assignOrdinalRD = val % 10 === 3 && val % 100 !== 13;

  if (assignOrdinalST) {
    ord = "st";
  } else if (assignOrdinalND) {
    ord = "nd";
  } else if (assignOrdinalRD) {
    ord = "rd";
  }

  return ord;
};

export function formatDate() {
  const setLocales = "en-US",
    formatOptions = {
      weekday: "long",
      year: "numeric",
      month: "short",
      day: "numeric",
    },
    currentTS = new Date(),
    formattedDate = currentTS.toLocaleString(setLocales, formatOptions),
    [dayName, day] = formattedDate.split(", ");

  // Combine month abbreviation, formatted day, and "<ORDINAL>"
  return `${dayName} ${day}${_assignOrdinalSuffix(currentTS)}`;
}

export function formatToUsd(number) {
  // Check if the input is a valid number
  if (typeof number !== "number" || isNaN(number)) {
    throw new Error("Input must be a valid number");
  }

  // Use Intl.NumberFormat to format the number as USD currency
  const formatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(number);
}

export const printingUtils = {
  getOrdinalSuffixForNumber: _assignOrdinalSuffix,
  sendToConsole: _sendToConsole,
  writeToLog: _writeToLog,
  formatDate,
  formatToUsd,
};
