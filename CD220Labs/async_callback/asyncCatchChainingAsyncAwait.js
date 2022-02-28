const useValidURL             = true; // Set to true to see a valid response. To false to see an error
const printEntireResponseBody = false; //Set to true to have verbose response

const axios                   = require('axios').default;
const webSite                 = "https://reststop.randomhouse.com/";
const urlPath                 = "resources/works/";
const requestPrefix           = "?expandLevel=1&search=";
const realAuthor              = "Grisham";
const fakeAuthor              = "IDontExist.html";
const tab                     = "\t";
const newLine                 = "\n";
const correctURL              = webSite + urlPath + requestPrefix + realAuthor;
const fakeURL                 = webSite + urlPath + fakeAuthor;
var   urlToUse                = useValidURL == true ? correctURL : fakeURL;

/*
In the following code we try to get list of all book ids from remote url and then based on that make request about each of the
id. Finally print them all out. We are using axios get, which returns a promise.
*/
async function connectToURL( url ) {
    console.log("Creating request object for URL [" + url + "]");
    const response    = await axios.get(url);
    console.log("Request object created.");
    let   listOfWork  = response.data.work;
    console.log("Mapping list of work for author");
    let   workIDs     = listOfWork.map( ( work ) => {
      console.log(tab + "Found work ID [" + work.workid + "]");
      return work.workid;
    });
    console.log("Looping over each work ID");
    workIDs.forEach(async (workID)=>{
      console.log("Creating a promise for work ID: " + workID);
      const response = await axios.get(webSite + urlPath + workID);
      console.log(newLine + tab + "Obtained a response for the individual work ID [" + workID + "]. Printing title and author below:");
      console.log(tab + response.data.titleAuth + newLine);
    });
}

console.log(newLine + "Issuing a request to URL [" + urlToUse + "]");
connectToURL(urlToUse).catch(err => {
    console.log(err.toString());
});
console.log(newLine + "Finished issuing request to URL [" + urlToUse + "]" + newLine);
console.log("--------------------------------------------------");
console.log(newLine);
