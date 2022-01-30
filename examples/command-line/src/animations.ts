import { CommandLineAnimation, CommandLineAnimationState } from "@nexojs/command-line";

CommandLineAnimation.start([
	{
		label: "Starting core service",
		name: "core",
	},
	{
		label: "Starting dev server",
		name: "dev",
	},
]);

setTimeout(() => {
	CommandLineAnimation.stopAll(
		"core",
		CommandLineAnimationState.error,
		"This is an intentional error to check functionality"
	);
}, 1000);