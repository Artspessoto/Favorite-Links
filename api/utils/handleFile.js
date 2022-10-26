const fs = require("fs");
const path = require("path");

function handleFile(data) {
  deleteFile();
  createFile(data);
}

function createFile(data) {
  fs.writeFile(
    path.join(__dirname, "../") + "/urls.json",
    JSON.stringify(data),
    (error) => {
      callbackResponse(error, "The file has been saved!");
    }
  );
}

function deleteFile() {
  fs.unlink(path.join(__dirname, "../") + "/urls.json", (error) => {
    callbackResponse(error, "The file has been delete!");
  });
}

function callbackResponse(error, response) {
  if (error) {
    console.log("error:", error);
  } else {
    console.log("response: ", response);
  }
}

module.exports = handleFile;
