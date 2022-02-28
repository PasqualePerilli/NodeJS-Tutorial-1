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
const connectToURL            = (url) => {
  console.log("Creating request object");
  const request = axios.get(url);
  console.log("Request object created.");
  request.then(response => {
      console.log("Obtained a valid response. Attempting to get author's work data");
      let listOfWork = response.data.work;
      if(printEntireResponseBody == true){
        console.log(newLine + "Printing work data below:");
        console.log(newLine + tab + JSON.stringify(listOfWork));
      }
      console.log("Mapping work data");
      return listOfWork.map( (work) => {
          return work.workid;
      });
    }).then( (workIDs) => {
        console.log("Creating an array of promises for the " + workIDs.length + " work IDs received.");
        let arrayOfPromises = [];
        console.log("Looping over each returned work ID.");
        workIDs.forEach( (workID) => {
            console.log("Creating a promise for work ID: " + workID);
            const request = axios.get(webSite + urlPath + workID);
            console.log("Adding request for work ID [" + workID + "] to array of promises");
            arrayOfPromises.push(request);
            console.log("Array of promises is now of size " + arrayOfPromises.length);
            request.then( response => {
                console.log(newLine + tab + "Obtained a response for the individual work ID [" + workID + "]. Printing title and author below:");
                console.log(tab + response.data.titleAuth + newLine);
            });
            request.catch( error => {
              console.log("An error was thrown for the individual work ID [" + workID + "]. Printing error below:");
              console.log(newLine + tab + error.toString() + newLine);
            } );
        });
    })
  .catch( error => {
      console.log("Obtained an error while attempting to contact URL [" + urlToUse + "]. Printing error below" + newLine);
      console.log(tab + error.toString() + newLine);
  });
}

console.log(newLine + "Issuing a request to URL [" + urlToUse + "]");
connectToURL(urlToUse);
console.log(newLine + "Finished issuing request to URL [" + urlToUse + "]" + newLine);
console.log("--------------------------------------------------");
console.log(newLine);
