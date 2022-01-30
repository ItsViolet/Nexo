import fsExtra from 'fs-extra';
import IError from './IError';

/**
 * File reading utility
 */
export default class IRead {
    /**
     * Read a file with all contents
     * @param filePath Path to the file
     * @returns The file contents
     */
    public static async full(filePath: string) {
        if (!fsExtra.existsSync(filePath)) {
            const error = new Error(`Failed to resolve file at "${filePath}" because it doesn't exist`);
            error.name = IError.notFound;

            throw error;
        }

        if (this.pathIsDir(filePath)) {
            const error = new Error(`Failed to read file because "${filePath}" is a directory but we expected a file path`);
            error.name = IError.pathIsDirectory;

            throw error;
        }

        try {
            const fsReadResult = await fsExtra.readFile(filePath);
            return fsReadResult.toString();
        } catch (fsReadError) {
            const error = new Error(`Failed to read file provided, FSError: ${fsReadError}`);
            error.name = IError.failedToRead;

            throw error;
        }
    }

    /**
     * Check if a file/dir path exists
     * @param filePath File/dir path
     * @returns If the file/dir path exists
     */
    public static pathExists(filePath: string) {
        return fsExtra.existsSync(filePath);
    }

    /**
     * Check if a path is a directory
     * @param filePath The path to check
     * @returns If the path provided is a directory
     */
    public static pathIsDir(filePath: string) {
        return fsExtra.lstatSync(filePath).isDirectory();
    }
}
