/**
 * Errors for when reading files
 */
enum IError {
    /**
     * Failed to read the file
     */
    failedToRead = 'EFailedToRead',

    /**
     * The path provided is a directory
     */
    pathIsDirectory = 'EPathIsDirectory',

    /**
     * The path provided could not be found
     */
    notFound = 'ENotFound',
}

export default IError;
