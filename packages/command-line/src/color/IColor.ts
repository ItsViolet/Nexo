import chalk from 'chalk';
import stripAnsi from 'strip-ansi';
import IRGB from './IRGB';

export default class IColor {
    /**
     * Colorize text with a hex color
     * @param hexColor The hex color for the text
     * @param text The text to colorize
     * @returns The colorized text
     */
    public withHex(hexColor: string, text: string) {
        return chalk.hex(hexColor)(text);
    }

    /**
     * Colorize text with an RGB color
     * @param rgbColor The RGB colors
     * @param text The text to colorize
     * @returns The colorized text
     */
    public withRGB(rgbColor: IRGB, text: string) {
        return chalk.rgb(rgbColor.r, rgbColor.g, rgbColor.b)(text);
    }

    /**
     * Reset the color of text
     * @param text The text to reset the colors of
     * @returns The text with the default color of the cli/terminal
     */
    public reset(text: string) {
        return chalk.reset(text);
    }

    /**
     * Strip out all ansi escape characters from text
     * @param text Text to remove ansi from
     * @returns The text without any invisible characters
     */
    public removeAnsi(text: string) {
        return stripAnsi(text);
    }
}
