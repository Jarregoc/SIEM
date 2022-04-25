chrome.runtime.onMessage((request, sender ,sendResponse) => {
    //handle the 4 cases: Insert, Update, Get, Delete
    //Insert message: "Inserted the record"
    if(request.message === "Inserted the record") {

    }   
    //Get Message: "Got the record"
    else if(request.message === "Got the record") {

    }
    //Delete Message: "Deleted the record"
    else if(request.message === "Deleted the record") {
        
    }
    //Update Message: "Updated the record"
    else if(request.message === "Updated the record") {
    
    }
})