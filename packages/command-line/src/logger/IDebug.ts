import stripAnsi from 'strip-ansi';
import { highlight } from 'cli-highlight';
import { DateTime } from 'luxon';
import IColor from '../color/IColor';

const colorizer = new IColor();

export default class IDebug {
    /**
     * Debugger settings
     */
    private settings = {
        outputToTerminal: false,
        generateLogFiles: false,
    };

    /**
     * Whether the first debug file was generated for this application session
     */
    private initialFileWritten = false;

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
     * Whether to log debug output into the terminal
     * @param mode The mode for logging debug data to the std out/err channels
     */
    public setSettingLogDebugOutput(mode: boolean) {
        this.settings.outputToTerminal = mode;
    }

    /**
     * Whether to generate debug log files
     * @param mode The mode for generating debug files
     */
    public setSettingGenerateDebugFiles(mode: boolean) {
        this.settings.generateLogFiles = mode;
    }

    public logWithPrefixTag(prefixTag: string, data: any, channel: 'out' | 'error' = 'out') {
        // let prefixTXT: string;
        let prefixCLI: string;

        const colorMute = (text: string) => colorizer.withRGB({
            r: 100,
            g: 100,
            b: 100,
        }, text);

        const timeStampText = DateTime.fromJSDate(new Date()).toFormat('MMM d yyyy, hh:mm:ss a');
        if (this.settings.outputToTerminal) prefixCLI = `${colorMute('[')}  ${stripAnsi(prefixTag)}  ${colorMute(']')}`;
        // if (this.settings.generateLogFiles) prefixTXT = `[  ${stripAnsi(prefixTag)}  ]`;

        const logStandard = (text: string) => {
            const timeStampCLI = `${colorMute(`[  ${timeStampText}  ]`)}`;

            if (channel === 'out') {
                this.stdout.write(`${timeStampCLI} ${text}\n`);
                return;
            }

            this.stderr.write(`${timeStampCLI} ${text}\n`);
        };

        if (this.settings.outputToTerminal) {
            if (typeof data === 'string') {
                logStandard(`${prefixCLI!} ${data}`);
            } else if (Array.isArray(data)) {
                data.forEach((line: any) => {
                    if (typeof line === 'object') {
                        logStandard(`${prefixCLI!} ${highlight(JSON.stringify(line), {
                            language: 'json',
                            ignoreIllegals: true,
                        })}`);
                        return;
                    }

                    logStandard(`${prefixCLI!} ${line}`);
                });
            } else if (typeof data === 'object') {
                const stringOBJLines = highlight(JSON.stringify(data, null, 2), {
                    language: 'json',
                    ignoreIllegals: true,
                });

                if (stringOBJLines.split('\n').length > 0) {
                    stringOBJLines.split('\n').forEach((objLine: string) => {
                        logStandard(`${prefixCLI!} ${objLine}`);
                    });
                } else {
                    logStandard(`${prefixCLI!} ${stringOBJLines}`);
                }
            }
        }
    }

    public log(data: any) {
        this.logWithPrefixTag('INFO', data);
    }
}
