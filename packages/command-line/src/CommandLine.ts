import I_Out from "./logger/I_Out";

/**
 * Data for logging text
 */
export type DataForLogging = string | string[];

export default class CommandLine {
  /**
   * Standard out channel
   */
  public static out = new I_Out(process.stdout);
}

export { I_Out };
