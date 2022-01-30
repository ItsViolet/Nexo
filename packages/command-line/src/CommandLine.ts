import IColorColor from './color/IColor';
import IDebug from './logger/IDebug';
import ILoggerOut from './logger/IOut';

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

export { ILoggerOut };
