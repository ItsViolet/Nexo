import stripAnsi from 'strip-ansi';
import IColor from '../color/IColor';

const colorizer = new IColor();

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
     * The STDOUT write channel
     */
    private stdout: NodeJS.WriteStream;

    /**
     * The STDERR write channel
     */
    private stderr: NodeJS.WriteStream;

    /**
     * Create a new debugger
     * @param stdout STDOUT channel
     * @param stderr STDERR channel
     */
    public constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
        this.stdout = stdout;
        this.stderr = stderr;
    }

    /**
     * Enable or disable the debugger
     * @param mode The mode for the debugger
     */
    public setSettingDebuggerEnabled(mode: boolean) {
        this.enabled = mode;
    }

    /**
     * Whether to log debug output into the terminal
     * @param mode The mode for logging debug data to the std out/err channels
     */
    public setSettingLogDebugOutput(mode: boolean) {
        this.logToTerminal = mode;
    }

    /**
     * Whether to generate debug log files
     * @param mode The mode for generating debug files
     */
    public setSettingGenerateDebugFiles(mode: boolean) {
        this.generateLogFiles = mode;
    }

    public logWithPrefixTag(prefixTag: string, data: any, channel: 'out' | 'error' = 'out') {
        let prefixTXT: string;
        let prefixCLI: string;

        const colorMute = (text: string) => colorizer.withRGB({
            r: 100,
            g: 100,
            b: 100,
        }, text);

        if (this.logToTerminal) prefixCLI = `${colorMute('[')} ${stripAnsi(prefixTag)} ${colorMute(']')}`;
        if (this.generateLogFiles) prefixTXT = `[ ${stripAnsi(prefixTag)} ]`;

        const logStandard = (text: string) => {
            if (channel === 'out') {
                this.stdout.write(`${text}\n`);
                return;
            }

            this.stderr.write(`${text}\n`);
        };

        if (this.logToTerminal) {
            logStandard(`${prefixCLI!}`);
        }
    }

    public log(data: any) {
        this.logWithPrefixTag('INFO', data);
    }
}
