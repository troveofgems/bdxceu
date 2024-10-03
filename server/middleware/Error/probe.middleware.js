import { printingUtils } from "../../libs/dev/printing.utils.js";

const // Default Props
    DEFAULT_OBJECT_TO_PROBE = { discoverObject: 'You have failed to provide a printable object to probe. probe.js' },
    DEFAULT_MESSAGE_TO_PRINT = 'Default Print String. Not Receiving Upstream Message...',
    DEFAULT_CONSOLE_PRINT_TYPE = 'log',
    DEFAULT_PRINT_SPACING = 4,
    DEFAULT_PRINT_REPLACER = null;

export const discoverObject = (
    objectToProbe= DEFAULT_OBJECT_TO_PROBE,
    prefixMessage= DEFAULT_MESSAGE_TO_PRINT,
    consoleMessageType = DEFAULT_CONSOLE_PRINT_TYPE,
    printSpacing = DEFAULT_PRINT_SPACING,
    setReplacer = DEFAULT_PRINT_REPLACER
) => printingUtils.sendToConsole(objectToProbe, prefixMessage, consoleMessageType, setReplacer, printSpacing);

export const logTheError = (
    objectToProbe= DEFAULT_OBJECT_TO_PROBE,
    prefixMessage= DEFAULT_MESSAGE_TO_PRINT,
    printSpacing = DEFAULT_PRINT_SPACING,
    setReplacer = DEFAULT_PRINT_REPLACER,
    eid
) => printingUtils.writeToLog(objectToProbe, prefixMessage, setReplacer, printSpacing, eid);