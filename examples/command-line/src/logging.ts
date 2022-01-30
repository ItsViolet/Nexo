import CommandLine from "../../../packages/command-line";

CommandLine.out.log("This is a general info message");
CommandLine.out.success("This is a success message indicating something has succeeded");
CommandLine.out.warning("This is a warning message which indicated that something doesn't seem to be write and that attention should be provided");
CommandLine.out.notice("This is a notice message which holds a similar purpose to warnings, but this is for things that are highly recommended and should be taken into though");
CommandLine.out.error(["This is an error indicating that something very bad has happened", "This is another line for the error"]);
