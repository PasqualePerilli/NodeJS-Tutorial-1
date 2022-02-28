const useValidURL   = true; // Set to true to see a valid response. To false to see an error

const axios         = require('axios').default;
const webSite       = "https://reststop.randomhouse.com/";
const urlPath       = "resources/works/?expandLevel=1&search=";
const realAuthor    = "Grisham";
const fakeAuthor    = "IDontExist.html";
const tab           = "\t";
const newLine       = "\n";
const correctURL    = webSite + urlPath + realAuthor;
const fakeURL       = webSite + fakeAuthor;
var   urlToUse      = useValidURL == true ? correctURL : fakeURL;


const connectToURL  = async(url) => {
    console.log("Attempting to send request to URL [" + url + "]");
    const outcome = axios.get(url);
    let listOfWork = (await outcome).data.work;
    console.log("Obtained response from URL [" + url + "].");
    console.log("Proceeding to print all titles below:" + newLine);
    listOfWork.forEach((work)=>{
      console.log(tab + work.titleAuth);
    });
    console.log(newLine + "Finished attempt to send request to URL [" + url + "]" + newLine);
}

console.log(newLine + "Before connecting to URL [" + urlToUse + "]");
connectToURL(urlToUse).catch( error => {
  console.log("An error occurred while attempting to connect to URL [" + urlToUse + "]. Printing details below:");
  console.log(newLine + tab + error.toString() + newLine);
});
console.log(newLine + "After connecting to URL [" + urlToUse + "]" + newLine);
console.log("--------------------------------------------------------");
console.log(newLine);
