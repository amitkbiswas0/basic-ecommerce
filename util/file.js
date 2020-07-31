const fs = require("fs");

async function fileWrite(file, content) {
  return await fs.promises.writeFile(file, JSON.stringify(content), (err) => {
    if (err) throw "write error";
  });
}
async function fileRead(file) {
  return JSON.parse(
    await fs.promises.readFile(file, (err) => {
      if (err) throw "read error";
    })
  );
}

exports.fileWrite = fileWrite;
exports.fileRead = fileRead;
