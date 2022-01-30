import FileSystem from "@nexojs/file-system";
import path from "path";

await FileSystem.write.create(path.join(process.cwd(), "Control!"));
