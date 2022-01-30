import IColor from '../color/IColor';
import IRGB from '../color/IRGB';

const colorizer = new IColor();
type DataForLogging = string | string[];

/**
 * NodeJS standard out/err utils
 */
export default class IOut {
    /**
     * The standard out write stream
     */
    private stdout: NodeJS.WriteStream;

    /**
     * The standard error write stream
     */
    private stderr: NodeJS.WriteStream;

    /**
     * Create a new STDOUT wrapper
     * @param stdout Standard out write stream
     * @param stderr Standard error write steam
     */
    public constructor(stdout: NodeJS.WriteStream, stderr: NodeJS.WriteStream) {
        this.stdout = stdout;
        this.stderr = stderr;
    }

    /**
     * Log a message into the CommandLine
     * @param prefix The prefix
     * @param color The prefix's color
     * @param text The text to log
     * @param colorTextWithPrefix Whether to apply the prefix color to the text
     * @param channel Whether to send the message to the error or standard channel
     */
    public logWithPrefix(
        prefix: string,
        color: IRGB | string | null,
        text: string | string[],
        colorTextWithPrefix = false,
        channel: 'out' | 'error' = 'out',
    ) {
        const muteText = (textToMute: string) => colorizer.withRGB(
            {
                r: 100,
                g: 100,
                b: 100,
            },
            textToMute,
        );

        const colorizePrefix = () => {
            if (!color) {
                return prefix;
            }

            if (typeof color === 'string') {
                return colorizer.withHex(color, prefix);
            }

            return colorizer.withRGB(color, prefix);
        };

        const colorizeText = (textToColorize: string) => {
            if (!color || !colorTextWithPrefix) {
                return text;
            }

            if (typeof color === 'string') {
                return colorizer.withHex(color, textToColorize);
            }

            return colorizer.withRGB(color!, textToColorize);
        };

        const log = (textToLog: string) => {
            if (channel === 'out') {
                this.stdout.write(`${textToLog}\n`);
                return;
            }

            this.stderr.write(`${textToLog}\n`);
        };

        const prefixWithBrackets = (textForPrefix: string) => `${muteText('[')}  ${textForPrefix}  ${muteText(']')}`;

        if (typeof text === 'string') {
            log(`${prefixWithBrackets(colorizePrefix())}  ${colorizeText(text)}`);
        } else {
            text.forEach((textLine) => {
                log(
                    `${prefixWithBrackets(colorizePrefix())}  ${colorizeText(textLine)}`,
                );
            });
        }
    }

    /**
     * Log a message out into the console
     * @param data The data to log to the console
     */
    public log(data: DataForLogging) {
        this.logWithPrefix(
            'INFO',
            {
                r: 100,
                g: 100,
                b: 100,
            },
            data,
        );
    }

    /**
     * Log a success message out into the console
     * @param data The success message to log to the console
     */
    public success(data: DataForLogging) {
        this.logWithPrefix('SUCCESS', '#50FFAB', data);
    }

    /**
     * Log a warning message into the console
     * @param data The data to warn in the console
     */
    public warning(data: DataForLogging) {
        this.logWithPrefix('WARN', '#FFFF55', data);
    }

    /**
     * Log an error message out into the console
     * @param data The error message to log to the console
     */
    public error(data: DataForLogging) {
        this.logWithPrefix('ERR', '#FF5555', data, true, 'error');
    }

    /**
     * Log a notice message into the console
     * @param data The notice to write
     */
    public notice(data: DataForLogging) {
        this.logWithPrefix('NOTICE', '#FFFF55', data, true);
    }
}