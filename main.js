var fs = require("fs");
var new_data = fs.readFileSync("server.js");

console.log(new_data.toString());
console.log("\nProgram End !!! \n\n");

fs.readFile('server.js', function (err, data) {
    if (err) return console.error(err);
    console.log(data.toString());
});

console.log(__filename);
console.log(__dirname);
console.log("....\n");
