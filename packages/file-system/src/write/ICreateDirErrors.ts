/**
 * Errors for when creating a directory
 */
enum ICreateDirErrors {
    /**
     * The dir already exists
     */
    dirExists = 'EDirExists',

    /**
     * An unclassified error occurred
     */
    otherError = 'EOtherError',
}

export default ICreateDirErrors;
