const fs = require("fs");
const download = require("download");
const path = require("path");

async function downloadFile(url) {
  const fileName = path.basename(url);
  const pathName = path.resolve(__dirname, "uploads", fileName);

  const data = await download(url);

  fs.writeFileSync(pathName, data);

  return "uploads/" + fileName;
}

module.exports = {
  downloadFile,
};
