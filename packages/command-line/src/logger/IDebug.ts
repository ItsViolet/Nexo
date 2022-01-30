export default class IDebug {
    /**
   * Whether the debugger is enabled
   */
    private enabled = false;

    /**
   * Whether to log the output to the terminal
   */
    private logToTerminal = false;

    /**
     * Whether to generate debug log files
     */
    private generateLogFiles = false;

    /**
   * Create a new debugger
   * @param stdout STDOUT channel
   * @param stderr STDERR channel
   */
    public constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {}

    /**
   * Enable or disable the debugger
   * @param mode The mode for the debugger
   */
    public setDebuggerEnabled(mode: boolean) {
        this.enabled = mode;
    }

    /**
   * Whether to log debug output into the terminal
   * @param mode The mode for logging debug data to the std out/err channels
   */
    public setLogDebugOutput(mode: boolean) {
        this.logToTerminal = mode;
    }

    /**
     * Whether to generate debug log files
     * @param mode The mode for generating debug files
     */
    public setGenerateDebugFiles(mode: boolean) {
        this.generateLogFiles = mode;
    }
}
