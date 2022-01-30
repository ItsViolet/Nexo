import IColorColor from './color/IColor';
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

    public static debug = new 
}

export { ILoggerOut };
