const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../assets");
const outputFilePath = path.join(__dirname, "../assets/files.js");

function generateFileList(dirName) {
  const dir = path.join(assetsDir, dirName);
  return fs.readdirSync(dir).map((file) => {
    const fullPath = path.join(dir, file);

    if (fs.statSync(fullPath).isDirectory()) {
      return generateFileList(fullPath, relativePath);
    } else {
      return `require('./${dirName}/${file.replace(/\\/g, "/")}')`;
    }
  });
}

const medicationsList = generateFileList("medications");
const symptomsList = generateFileList("symptoms");

const content = `
export const medicationFiles = [${medicationsList.flat().join(", ")}];
export const symptomFiles = [${symptomsList.flat().join(", ")}];
`;

fs.writeFileSync(outputFilePath, content);

console.log("Assets list generated successfully.");
