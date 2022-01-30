<<<<<<< HEAD
<<<<<<< HEAD
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
=======
import IColorColor from './color/IColor';
import IDebug from './logger/IDebug';
import ILoggerOut from './logger/IOut';
>>>>>>> 69692c5a4d904f813e77a68098cf5a584c4e0523
=======
import IColorColor from './color/IColor';
import IDebug from './logger/IDebug';
import ILoggerOut from './logger/IOut';
>>>>>>> 69692c5a4d904f813e77a68098cf5a584c4e0523

/**
 * NodeJS command line utilities
 */
export default class CommandLine {
    /**
     * Standard out channel
     */
    public static out = new ILoggerOut(process.stdout, process.stderr);

    /**
     * Text color utilities for the console
     */
    public static color = new IColorColor();

    /**
     * The debugger system
     */
    public static debug = new IDebug(process.stdout, process.stderr);
}

<<<<<<< HEAD
<<<<<<< HEAD
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
=======
export { ILoggerOut };
>>>>>>> 69692c5a4d904f813e77a68098cf5a584c4e0523
=======
export { ILoggerOut };
>>>>>>> 69692c5a4d904f813e77a68098cf5a584c4e0523
