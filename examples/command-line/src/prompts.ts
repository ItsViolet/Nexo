// import CommandLine, { CommandLinePrompt, CommandLinePromptType } from "../../src/CommandLine";
/* tslint:disable */
import CommandLine from "@nexojs/command-line";
import CommandLinePromptBoolean from '@nexojs/command-line';


CommandLinePromptBoolean.prompt(
	"Are you a programmer?",
	(dev: string) => {
        CommandLine.debug.log("You selected "+dev);
	},
	true
);