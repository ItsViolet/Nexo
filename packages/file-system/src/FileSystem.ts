import IRead from './read/IRead';
import IReadError from './read/IError';
import IWrite from './write/IWrite';

/**
 * NodeJS file system controller
 */
export default class FileSystem {
    /**
     * File system reading utilities
     */
    public static read = IRead;

    /**
     * File system writing utilities
     */
    public static write = IWrite;
}

export { IReadError as ReadError };
