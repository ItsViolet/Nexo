import I_Out from "./logger/I_Out";
/**
 * Data for logging text
 */
export declare type DataForLogging = string | string[];
export default class CommandLine {
    /**
     * Standard out channel
     */
    static out: I_Out;
}
export { I_Out };
