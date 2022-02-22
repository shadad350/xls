var xlslx = require("xlsx");
var fs = require("fs");
var path = require("path");

function readFileToJson(filename) {
  var wb = xlslx.readFile(filename);
  var firstTabName = wb.SheetNames[0];
  var ws = wb.Sheets[firstTabName];
  var data = xlslx.utils.sheet_to_json(ws);
  return data;
}

var targetDir = __dirname;
// var targetDir = path.join(__dirname)
var files = fs.readdirSync(targetDir);

files.forEach(function (file) {
  var fileExtention = path.parse(file).ext;
  if (fileExtention === ".XLS" && file[0]!=="~"){
  console.log(file);}
});

//console.log(files);

// var data = readFileToJson("180222.XLS")

// console.log(data);
