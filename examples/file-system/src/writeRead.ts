import FileSystem from "@nexojs/file-system";
import path from "path";

const hello = await FileSystem.read.run(path.join(process.cwd(), "./src/hello.world"));
console.log(hello)