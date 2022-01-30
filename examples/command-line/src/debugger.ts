import CommandLine from "../../../packages/command-line";

CommandLine.debug.setSettingDebuggerEnabled(true);
CommandLine.debug.setSettingLogDebugOutput(true);

CommandLine.debug.log("This is debug output");
CommandLine.debug.log(["This is line #1", "This is line #2"]);
CommandLine.debug.log({
    "//": "This is an object",
    hello: "world"
});
