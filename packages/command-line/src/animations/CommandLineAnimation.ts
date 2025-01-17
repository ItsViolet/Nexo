import chalk from "chalk";
import cliCursor from "cli-cursor";
import {
	CommandLineAnimationState,
	TerminalPrompt,
	TerminalPromptBoolean,
	TerminalPromptSelect,
	TerminalPromptString,
} from "../CommandLine";
import AnimationItem from "./AnimationItem";
import AnimationMeta from "./AnimationMeta";

/**
 * Create animations in the terminal
 */
export default class CommandLineAnimation {
	/**
	 * If the animation is running
	 */
	private static _isRunning = false;

	/**
	 * The animation items
	 */
	private static currentAnimationItems: AnimationItem[] = [];

	/**
	 * Current animation's meta
	 */
	private static currentAnimationMeta: AnimationMeta[] = [];

	/**
	 * Animation loop
	 */
	private static loop: NodeJS.Timer;

	/**
	 * The number of lines rendered
	 */
	private static linesRendered: null | number = null;

	/**
	 * Create animations
	 * @param animations The animation or animations
	 */
	public static start(animations: AnimationItem | AnimationItem[]) {
		if (
			TerminalPromptString.isRunning ||
			TerminalPromptBoolean.isRunning ||
			TerminalPromptSelect.isRunning ||
			this.isRunning
		) {
			return;
		}

		this._isRunning = true;
		this.currentAnimationItems = [];
		this.currentAnimationMeta = [];
		this.linesRendered = null;

		cliCursor.hide();

		TerminalPrompt.addKeyListener((value: any, key: { name: string; ctrl: any; }) => {
			if (key.name == "c" && key.ctrl) {
				process.exit();
			}
		});

		if (Array.isArray(animations)) this.currentAnimationItems = animations;
		else this.currentAnimationItems = [animations];

		const muted = chalk.hex("#999999");
		const defaultFrames = [muted("|"), muted("/"), muted("-"), muted("\\")];

		this.currentAnimationItems.forEach((animationItem) => {
			this.currentAnimationMeta.push({
				frame: 0,
				frames: animationItem.frames ?? defaultFrames,
				label: animationItem.label,
				name: animationItem.name,
				done: false,
				state: CommandLineAnimationState.success,
			});
		});

		this.loop = setInterval(() => {
			this.currentAnimationMeta.forEach((metaItem) => {
				metaItem.frame++;

				if (metaItem.frames.length == metaItem.frame) {
					metaItem.frame = 0;
				}
			});

			this.renderLines();
		}, 100);
	}

	/**
	 * If the animation is running
	 */
	public static get isRunning() {
		return this._isRunning;
	}

	/**
	 * Render all lines
	 */
	private static renderLines() {
		const render = () => {
			const lines = [] as string[];

			const getHexFromState = (state: CommandLineAnimationState) => {
				let hex = "";

				switch (state) {
					case CommandLineAnimationState.success:
						hex = "#40c283";
						break;

					case CommandLineAnimationState.warning:
						hex = "#FFAB00";
						break;

					case CommandLineAnimationState.info:
						hex = "#999999";
						break;

					case CommandLineAnimationState.error:
						hex = "#FF5555";
						break;
				}

				return hex;
			};

			this.currentAnimationMeta.forEach((metaItem) => {
				const color = chalk.hex(getHexFromState(metaItem.state));
				let prefix = "";

				switch (metaItem.state) {
					case CommandLineAnimationState.success:
						prefix = `${chalk.hex("#999999")(`[ ${color("✓")} ]`)}`;
						break;

					case CommandLineAnimationState.warning:
						prefix = `${chalk.hex("#999999")(`[ ${color("△")} ]`)}`;
						break;

					case CommandLineAnimationState.error:
						prefix = `${chalk.hex("#999999")(`[ ${color("×")} ]`)}`;
						break;

					case CommandLineAnimationState.info:
						prefix = `${chalk.hex("#999999")(`[ ${color("@")} ]`)}`;
						break;
				}

				lines.push(
					`${metaItem.done ? prefix : metaItem.frames[metaItem.frame]} ${metaItem.label}`
				);
			});

			this.linesRendered = TerminalPrompt.renderLines(lines);
		};

		if (this.linesRendered) {
			TerminalPrompt.clearLinesFrom(-this.linesRendered);

			render();
			return;
		}

		render();
	}

	/**
	 * Stop an animation
	 * @param name Animation name
	 * @param newLabel New animation label
	 */
	public static stop(name: string | number, state: CommandLineAnimationState, newLabel?: string) {
		let stoppedAnimation = 0;

		this.currentAnimationMeta.forEach((metaItem) => {
			if (metaItem.name == name) {
				if (newLabel) metaItem.label = newLabel;

				metaItem.state = state;
				metaItem.done = true;
			}

			if (metaItem.done) {
				stoppedAnimation++;
			}
		});

		if (stoppedAnimation == this.currentAnimationMeta.length) {
			this._isRunning = false;
			TerminalPrompt.removeKeyListeners();
			cliCursor.show();
			clearInterval(this.loop);
		}

		this.renderLines();
	}

	/**
	 * Stop all animations and show a new state for the animation name specified
	 * @param name Animation name
	 * @param state Animation state
	 * @param newLabel New animation label
	 */
	public static stopAll(name: string | number, state: CommandLineAnimationState, newLabel?: string) {
		let newItems = [] as AnimationItem[];
		let newMeta = [] as AnimationMeta[];

		this.currentAnimationMeta.forEach((metaItem) => {
			if (metaItem.name == name) {
				if (newLabel) metaItem.label = newLabel;

				metaItem.state = state;
				metaItem.done = true;

				newMeta.push(metaItem);
			}
		});

		this.currentAnimationItems.forEach((item) => {
			if (item.name == name) {
				newItems.push(item);
			}
		});

		this.currentAnimationItems = newItems;
		this.currentAnimationMeta = newMeta;

		this._isRunning = false;
		TerminalPrompt.removeKeyListeners();
		cliCursor.show();
		clearInterval(this.loop);

		this.renderLines();
	}
}