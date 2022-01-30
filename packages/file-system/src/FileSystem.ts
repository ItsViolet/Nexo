import IRead from './read/IRead';
import IReadError from './read/IError';

/**
 * NodeJS file system controller
 */
export default class FileSystem {
    /**
     * File system reading utilities
     */
    public static read = IRead;
}

export { IReadError as ReadError };
