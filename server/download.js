const https = require("https");
const fs = require("fs");
const path = require("path");

const url =
  "https://japana.vn/uploads/product/imageresize/90x90-1583311336-perfect-one-9g-sieu-thi-nhat-ban-japana-0-(4).jpeg";

function downloadFile(url, callback) {
  const fileName = path.basename(url);
  const pathName = path.resolve(__dirname, "uploads", fileName);

  https.get(url, function (res) {
    const fileStream = fs.createWriteStream(pathName);
    res.pipe(fileStream);

    fileStream.on("error", function (error) {
      console.log(error);
    });

    fileStream.on("close", function () {
      callback(fileName);
    });

    fileStream.on("finish", function () {
      fileStream.close();
      console.log("OK");
    });
  });
}


module.exports = {
  downloadFile,
};
