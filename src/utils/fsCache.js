import * as fs from "fs";
import * as path from "path";

const cacheFolderName = "temp";

export const writeToFs = ({
  fileName,
  folderName = cacheFolderName,
  content,
}) => {
  const tempFolderPath = path.join(process.cwd(), folderName);

  if (!fs.existsSync(tempFolderPath)) {
    fs.mkdirSync(tempFolderPath, { recursive: true });
  }

  const tempFileLocation = path.join(tempFolderPath, `${fileName}.json`);

  return fs.promises.writeFile(tempFileLocation, JSON.stringify(content), {
    flag: "wx",
  });
};

export const readFromFs = ({
  fileName,
  folderName = cacheFolderName,
  muteErrorLog = false,
}) => {
  const tempFileLocation = path.join(
    process.cwd(),
    folderName,
    `${fileName}.json`
  );
  try {
    return JSON.parse(fs.readFileSync(tempFileLocation, { encoding: "utf8" }));
  } catch (e) {
    if (!muteErrorLog) {
      logger.error(
        e,
        `JSON parse of cached file failed, file: ${fileName}, folder: ${folderName}`
      );
    }
    return null;
  }
};
