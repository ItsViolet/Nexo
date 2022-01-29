import { DataForLogging } from "../CommandLine";

export default class I_Out {
  /**
   * The standard out write stream
   */
  private stdout: NodeJS.WriteStream;

  /**
   * Create a new STDOUT wrapper
   * @param stdout Standard out write stream
   */ 
  public constructor(stdout: NodeJS.WriteStream) {
    this.stdout = stdout;
    }
    
    public log(data: DataForLogging) {
        
    }
}
