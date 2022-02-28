const useValidURL = true; // Set to true to see a valid response. To false to see an error

const axios       = require('axios').default;
const folderPath  = "https://raw.githubusercontent.com/PasqualePerilli/NodeJS-Tutorial-1/master/CD220Labs/async_callback/";
const realFile    = "courseDetails.json";
const fakeFile    = "courseDetails.jason";
const tab         = "\t";
const newLine     = "\n";
const correctURL  = folderPath + realFile;
const fakeURL     = folderPath + fakeFile;
var   urlToUse    = useValidURL == true ? correctURL : fakeURL;

const request     = axios.get(urlToUse);


console.log(newLine + "Printing request below: " + newLine + tab + JSON.stringify(request.toString()) + newLine);
request.then(response => {
    let courseDetails = response.data;
    console.log(newLine + "Printing response below, obtained from request issued at URL: [" + urlToUse + "]");
    console.log(newLine + JSON.stringify(courseDetails, null, 4) + newLine);
})
.catch(error => {
    console.log(newLine + "Obtained an error while attempting to connect to URL [" + urlToUse + "]");
    console.log(newLine + tab + error.toString() + newLine); //This will console log the error withe the code. eg. Error: Request failed with status code 404
});
console.log("Finished calling request method for URL [" + urlToUse + "]" + newLine);
console.log("----------------------------------------------------------");
