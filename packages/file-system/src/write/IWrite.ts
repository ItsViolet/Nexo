import fsExtra from 'fs-extra';
import IRead from '../read/IRead';
import ICreateDirErrors from './ICreateDirErrors';
import ICreateFileErrors from './ICreateFileErrors';

/**
 * FS write utils
 */
export default class IWrite {
    /**
     * Create a new file
     * @param filePath Path to the file
     */
    public static async createFile(filePath: string) {
        if (IRead.pathExists(filePath)) {
            const error = new Error(`The file at "${filePath}" already exists`);
            error.name = ICreateFileErrors.fileExists;

            throw error;
        }

        try {
            await fsExtra.createFile(filePath);
        } catch (fsCreateError) {
            const error = new Error(`Failed to create file, FSError: ${fsCreateError}`);
            error.name = ICreateFileErrors.otherError;

            throw error;
        }
    }

    /**
     * Create a new directory
     * @param dirPath Path to the directory you want to make
     */
    public static async createDir(dirPath: string) {
        if (IRead.pathExists(dirPath)) {
            const error = new Error(`The dir path "${dirPath}" already exists`);
            error.name = ICreateDirErrors.dirExists;

            throw error;
        }

        try {
            await fsExtra.mkdir(dirPath, {
                recursive: true,
            });
        } catch (fsError) {
            const error = new Error(`Failed to create the directory at "${dirPath}", FSError: ${fsError}`);
            error.name = ICreateDirErrors.otherError;

            throw error;
        }
    }
}
