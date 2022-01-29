import I_Color from './color/I_Color';
import I_Out from './logger/IOut';

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
