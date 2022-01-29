import I_RGB from "../color/I_RGB";
import CommandLine, { DataForLogging } from "../CommandLine";

export default class I_Out {
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
     * Log a message into the terminal
     * @param prefix The prefix
     * @param color The prefix's color
     * @param text The text to log
     * @param colorTextWithPrefix Whether to apply the prefix color to the text
     * @param channel Whether to send the message to the error or standard channel
     */
    public logWithPrefix(
        prefix: string,
        color: I_RGB | string | null,
        text: string | string[],
        colorTextWithPrefix = false,
        channel = "out" as "out" | "error"
    ) {
        const muteText = (text: string) =>
            CommandLine.color.withRGB(
                {
                    r: 83,
                    g: 83,
                    b: 83,
                },
                text
            );

        const colorizePrefix = () => {
            if (!color) {
                return prefix;
            }

            if (typeof color == "string") {
                return CommandLine.color.withHex(color, prefix);
            }

            return CommandLine.color.withRGB(color, prefix);
        };

        const colorizeText = (text: string) => {
            if (!color || !colorTextWithPrefix) {
                return text;
            }

            if (typeof color == "string") {
                return CommandLine.color.withHex(color, text);
            }

            return CommandLine.color.withRGB(color!, text);
        };

        const prefixWithBrackets = (text: string) =>
            `${muteText("[ ")} ${text} ${muteText(" ]")}`;

        if (typeof text == "string") {
            console.log(
                `${prefixWithBrackets(colorizePrefix())}  ${colorizeText(text)}`
            );
        } else {
            text.forEach((text) => {
                console.log(
                    `${prefixWithBrackets(colorizePrefix())}  ${colorizeText(
                        text
                    )}`
                );
            });
        }
    }

    /**
     * Log a message out into the console
     * @param data The data to log to the console
     */
    public log(data: DataForLogging) {
        this.logWithPrefix("i", null, data);
    }

    /**
     * Log a success message out into the console
     * @param data The success message to log to the console
     */
    public success(data: DataForLogging) {
        this.logWithPrefix("!", {
            r: 83,
            g: 255,
            b: 83
        }, data);
    }

    /**
     * Log a warning message into the console
     * @param data The data to warn in the console
     */
    public warning(data: DataForLogging) {
        this.logWithPrefix(
            "•",
            {
                r: 255,
                g: 150,
                b: 83,
            },
            data
        );
    }

    /**
     * Log an error message out into the console
     * @param data The error message to log to the console
     */
    public error(data: DataForLogging) {
        this.logWithPrefix(
            "•",
            {
                r: 255,
                g: 83,
                b: 83,
            },
            data,
            true
        );
    }

    /**
     * Log a notice message into the console
     * @param data The notice to write
     */
    public notice(data: DataForLogging) {
        this.logWithPrefix(
            "!",
            {
                r: 255,
                g: 150,
                b: 83,
            },
            data,
            true
        );
    }
}
