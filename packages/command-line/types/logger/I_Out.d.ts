/// <reference types="node" />
import { DataForLogging } from "../CommandLine";
export default class I_Out {
    /**
     * The standard out write stream
     */
    private stdout;
    /**
     * Create a new STDOUT wrapper
     * @param stdout Standard out write stream
     */
    constructor(stdout: NodeJS.WriteStream);
    log(data: DataForLogging): void;
}
