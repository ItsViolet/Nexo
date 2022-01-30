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
		"Couldn't start core because it does't exist"
	);
}, 1000);