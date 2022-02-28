const axios       = require('axios').default;
const folderPath  = "https://raw.githubusercontent.com/PasqualePerilli/NodeJS-Tutorial-1/master/CD220Labs/async_callback/";
const realFile    = "sampleData.json";
const fakeFile    = "sampleData.jason";
const tab         = "\t";
const newLine     = "\n";

const connectToURL = (url) => {
    const request = axios.get(url);
    console.log("Starting connect to URL method for: [" + url + "]");
    console.log("Logging request below:");
    console.log(request);
    request.then(response => {
        console.log("Obtained a response for request sent to URL [" + url + "]. Printing response data below: ");
        console.log(newLine + tab + JSON.stringify(response.data) + newLine);
    })
    .catch(error => {
        console.log("Obtained a failure trying to obtain a response for request sent to URL [" + url + "]. Printing error below: ");
        console.log(newLine + tab + error.toString() + newLine);
    });
    console.log("Exiting connect to URL method for URL [" + url + "]");
    console.log("-----------------------------------------------------------");
}

connectToURL(folderPath + realFile); //Valid URL

connectToURL(folderPath + fakeFile); //Invalid URL
