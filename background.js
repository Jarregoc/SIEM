chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'insert') {
        let insert_request = insert_records(request.payload);

        insert_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'insert_success',
                payload: res
            }) 
        })
    }
    else if(request.message === 'get') {
        let get_request = get_record(request.payload);

        get_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'get_success',
                payload: res
            }) 
        })
    }
    else if(request.message === 'update') {
        let update_request = update_record(request.payload);

        update_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'update_success',
                payload: res
            }) 
        })
    }
    else if(request.message === 'delete') {
        let delete_request = delete_record(request.payload);

        delete_request.then(res => {
           chrome.runtime.sendMessage({
                message: 'delete_success',
                payload: res
            }) 
        })
    }
});

let roster = [{
        "date": "22/11/80",
        "url": "https://www.google.com/",
    },
    {
        "date": "02/05/78",
        "url": "https://www.youtube.com/",
    },
    {
        "date": "18/07/95",
        "url": "https://www.lmu.edu/",
    },
    {
        "date": "03/14/87",
        "url": "https://www.elcamino.edu/",
    },
]

let db = null

function create_database() {
    const request = window.indexedDB.open('MySIEM')

    request.onerror = function(event) {
        console.log("Problem opening DB")
    }

    request.onupgradeneeded = function(event) {
        console.log("in updgradeneeded")
        db = event.target.result;

        console.log("in updgradeneeded")
        let objectStore = db.createObjectStore('roster', {keyPath : 'url'})
        objectStore.createIndex("date", "date", {unique: false})
        
        objectStore.transaction.oncomplete = function(event) {
            console.log("ObjectStore created");
        }
    }

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("DB opened");

        insert_records(roster, true)

        db.onerror = function(event) {
            console.log("Failed to open DB")
        }
    }
}

function delete_database() {
    const request = window.indexedDB.deleteDatabase('MySIEM');

    request.onerror = function(event) {
        console.log("Problem deleting DB")
    }

    request.onsuccess = function(event) {
        db = event.target.result;
        console.log("DB deleted");

        db.onerror = function(event) {
            console.log("Failed to delete DB")
        }
    }
}

function insert_records(records, needsClear = false) {
    if(db) {
        const insert_transaction = db.transaction("roster", "readwrite");
        const objectStore = insert_transaction.objectStore("roster")

        return new Promise((resolve, reject) => {
            insert_transaction.oncomplete = function() {
                console.log("All insert transactions complete");
                resolve(true)
            }

            insert_transaction.onerror = function() {
                console.log("Problem inserting records");
                resolve(false)
            }
            if(needsClear) {
                console.log("clearing")
                let clearStore = objectStore.clear() 
            }
            records.forEach( person => {
                let getPerson = objectStore.get(person.url)
                getPerson.onsuccess = function() {
                    if(getPerson.result == undefined) {
                        let request = objectStore.add(person);
                        request.onsuccess = function() {
                            console.log("Added: ", person);
                        }
        
                        let getStore = objectStore.getAll()
                        getStore.onsuccess = function(event) {
                            console.log(getStore.result)
                        }
                    }
                    else {
                        console.log("the url was already in store: ", person.url)
                    }
                }
            })
        })
    }
}

function get_record(url) {
    console.log("in get_record")
    if(db) {
        console.log("In db true")
        const get_transaction = db.transaction("roster", "readwrite");
        const objectStore = get_transaction.objectStore("roster")

        return new Promise((resolve, reject) => {
            get_transaction.oncomplete = function() {
                console.log("All get transactions complete");
            }
    
            get_transaction.onerror = function() {
                console.log("Problem geting records");
            }
    
            let request = objectStore.get(url);
            request.onsuccess = function(event) {
                console.log(request.result)
                resolve(request.result);
            }
        })
    }
}

function update_record(record) {
    if(db) {
        const put_transaction = db.transaction("roster", "readwrite");
        const objectStore = put_transaction.objectStore("roster")

        return new Promise((resolve, reject) => {
            put_transaction.oncomplete = function() {
                console.log("All put transactions complete");
                resolve(true)
            }
    
            put_transaction.onerror = function() {
                console.log("Problem puting records");
                resolve(false)
            }
    
            let request = objectStore.put(record);
        })
    }
}

function delete_record(url) {
    if(db) {
        const delete_transaction = db.transaction("roster", "readwrite");
        const objectStore = delete_transaction.objectStore("roster")

        return new Promise((resolve, reject) => {
            delete_transaction.oncomplete = function() {
                console.log("All delete transactions complete");
                resolve(true)
            }
    
            delete_transaction.onerror = function() {
                console.log("Problem deleting records");
                resolve(false)
            }
    
            objectStore.delete(url);
        })
    }
}

create_database()


