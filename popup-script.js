chrome.runtime.onMessage((request, sender ,sendResponse) => {
    //handle the 4 cases: Insert, Update, Get, Delete
    //Insert message: "Inserted the record"
    if(request.message === "Inserted the record") {
        //Check if the request payload exists
        if(request.payload) {
            //get rid of the inputed values in the text boxes because they have already been inserted
            document.querySelectorAll("add_rec_input").forEach(input => input.value = "test")
        }
    }   
    //Get Message: "Got the record"
    else if(request.message === "Got the record") {
        if(request.payload) {
            document.querySelectorAll(".updated-details").forEach(ud => ud.value = "none");
            document.querySelectorAll(".search-label").forEach(sl => sl.style.display = "")
            document.querySelectorAll(".details").forEach(d => d.style.display = "")
            document.getElementById("delete-record").style.display = ""
            document.getElementById("edit-record").style.display = ""

            document.getElementById("edit-record").innerText = "Edit Record"
            document.getElementById("details-URL").innerText = request.payload.URL
            document.getElementById("details-date").innerText = request.payload.date
        }
        else {
            console.log("No record found")
        }
    }
    //Delete Message: "Deleted the record"
    else if(request.message === "Deleted the record") {
        
    }
    //Update Message: "Updated the record"
    else if(request.message === "Updated the record") {
        if(request.payload) {
            document.getElementById("edit-record").innerText = "Changes saved"
            
        }
    }
})