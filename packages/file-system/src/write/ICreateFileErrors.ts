/**
 * Errors for when creating files
 */
enum ICreateFileErrors {
    /**
     * The file already exists
     */
    fileExists = 'EFileExists',

    /**
     * An error occurred
     */
    otherError = 'EOtherError',
}

export default ICreateFileErrors;
