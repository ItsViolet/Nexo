import I_Color from './color/I_Color';
import I_Out from './logger/IOut';
import KeyPressMeta from "./prompt/KeyPressMeta";
import AnimationItem from "./animations/AnimationItem";
import CommandLineAnimation from "./animations/CommandLineAnimation";
import AnimationMeta from "./animations/AnimationMeta";
import CommandLineAnimationState from "./animations/CommandLineAnimationState";
import TerminalPrompt from "./prompt/TerminalPrompt";
import TerminalPromptString from "./prompt/TerminalPromptString";
import TerminalPromptBoolean from "./prompt/TerminalPromptBoolean";
import TerminalPromptSelect from "./prompt/TerminalPromptSelect";

export default class CommandLine {
    /**
   * Standard out channel
   */
    public static out = new I_Out(process.stdout, process.stderr);

    /**
   * Text color utilities for the console
   */
    public static color = new I_Color();
}

export {
	TerminalPrompt,
	KeyPressMeta,
	CommandLineAnimation as CommandLineAnimation,
	AnimationMeta,
	AnimationItem,
	CommandLineAnimationState,
	TerminalPromptBoolean,
	TerminalPromptSelect,
	TerminalPromptString,
};