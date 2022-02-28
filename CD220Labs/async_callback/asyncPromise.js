var   prompt      = require('prompt-sync')();
var   fileSystem  = require('fs');
const readOnly    = "r";
const encoding    = "utf8";

const readFile    = new Promise( (resolve, reject ) => {
    var filename = prompt('What is the name of the file to be read? ');
    try {
      const data = fileSystem.readFileSync(filename, {encoding: encoding, flag: readOnly});
      resolve(data);
    }
    catch(error) {
      reject(error);
    }
});

//console.log(readFile);

readFile.then( (data) => console.log(data), (error) => console.log("Error reading file. Error is: [" + error + "]") );
