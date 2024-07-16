const path = require ("path")
const fs = require ("node:fs")
const fileUpload = require ("express-fileupload")
const express = require ("express")
const { checkAndMakeDir } = require("express-fileupload/lib/utilities")
const app = express()

app.use(express.static(path.join(__dirname, "/views")))

app.use(fileUpload())

app.post("/upload", (req, res) => {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  const filesArray = [];

  for (let file in req.files) {
    console.log('File:', file);
    let uploadPath = __dirname + '/poster/' + req.files[file].name;
    req.files[file].mv(uploadPath, function(err) {
      if (err) {
        console.error('Error uploading file:', err);
        res.status(500).send(err);
      } else {
        // Convert the uploaded file to a JSON object
        const fileObject = {
          name: req.files[file].name,
          size: req.files[file].size,
          type: req.files[file].type,
        };
        filesArray.push(fileObject);
      }
    });
  }

  // Once all files are processed, convert the array to a JSON string
  const jsonFiles = JSON.stringify(filesArray);

  res.send(jsonFiles);
});
app.listen(3000);