class I_Out {
    /**
     * The standard out write stream
     */
    stdout;
    /**
     * Create a new STDOUT wrapper
     * @param stdout Standard out write stream
     */
    constructor(stdout) {
        this.stdout = stdout;
    }
    log(data) {
    }
}

class CommandLine {
    /**
     * Standard out channel
     */
    static out = new I_Out(process.stdout);
}

export { I_Out, CommandLine as default };
