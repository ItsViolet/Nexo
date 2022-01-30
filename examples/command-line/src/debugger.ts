import CommandLine from "@nexojs/command-line";

CommandLine.debug.setSettingLogDebugOutput(true);

CommandLine.debug.log("This is debug output");
CommandLine.debug.log(["This is line #1", "This is line #2"]);
CommandLine.debug.log({
    "//": "This is an object",
    hello: "world"
});
CommandLine.debug.log([
    {
        "//": "This is an object that will be rendered in one line",
        hello: "world"
    },
    "Another line after the object rendering"
]);
