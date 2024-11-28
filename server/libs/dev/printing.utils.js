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

export const printingUtils = {
  sendToConsole: _sendToConsole,
  writeToLog: _writeToLog,
};

export function formatDate() {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  const currentTS = new Date(),
    formattedDate = currentTS.toLocaleString("en-US", options);

  // Extract month abbreviation and day
  const [dayName, day] = formattedDate.split(", ");

  // Function to add ordinal suffix
  function addOrdinalSuffix() {
    const suffixes = ["st", "nd", "rd", "th"];
    const lastDigit = currentTS.getDate() % 10;

    if (lastDigit < 5) {
      return suffixes[lastDigit - 1];
    } else if (lastDigit === 0 || lastDigit >= 5) {
      return suffixes[3];
    }
  }

  // Combine month abbreviation, formatted day, and "ND"
  console.log("Returning: ", `${dayName} ${day}${addOrdinalSuffix()}`);
  return `${dayName} ${day}${addOrdinalSuffix()}`;
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
