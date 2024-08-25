const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../assets");
const outputFilePath = path.join(__dirname, "../assets/files.js");

function generateFileList(dirName) {
  const dir = path.join(assetsDir, "medications");
  return fs.readdirSync(dir).map((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      return generateFileList(fullPath, relativePath);
    } else {
      return `require('./${dirName}/${file.replace(/\\/g, "/")}')`;
    }
  });
}

const imagesList = generateFileList("medications");

const content = `
export const medicationFiles = [${imagesList.flat().join(", ")}];
`;

fs.writeFileSync(outputFilePath, content);

console.log("Assets list generated successfully.");
