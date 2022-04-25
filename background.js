// let activeTabID = 0

// chrome.tabs.onActivated.addListener(tab => {
//     chrome.tabs.get(tab.tabId, current_tab_info => {
//         activeTabID = tab.tabId
//         if(/^https:\/\/www\.google/.test(current_tab_info.url)) {
//             chrome.tabs.insertCSS(null, {file: './mystyles.css'})
//             chrome.tabs.executeScript(null, {file: './foreground.js'}, () => {
//                 console.log("i injected")
//             })
//         }
//     })
// });

// chrome.tabs.executeScript(null, {file: './foreground.js'}, () => {
//     console.log("i injected")
// })

// chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
//     if(request.message === 'check the storage') {
//         chrome.tabs.sendMessage(activeTabID, {message: 'I got your message'})
        
//         chrome.storage.local.get("password", value => {
//             console.log(value)
//         })
//     }
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message  === 'insert') {
        let request = insert_record(request.payload)

        request.then(res => {
            chrome.runtime.sendMessage({
                message: "Inserted the record",
                payload: res
            })
        })
        
    }
    else if(request.message  === 'get') {
        let request = get_records(request.payload)

        request.then(res => {
            chrome.runtime.sendMessage({
                message: "Got the record",
                payload: res
            })
        })
    }
    else if(request.message  === 'delete') {
        let request = delete_records(request.payload)

        request.then(res => {
            chrome.runtime.sendMessage({
                message: "Deleted the record",
                payload: res
            })
        })
    }
    else if(request.message  === 'update') {
        let request = update_records(request.payload)

        request.then(res => {
            chrome.runtime.sendMessage({
                message: "Updated the record",
                payload: res
            })
        })
    }
})

let roster = [
    {
        "URL": "https://www.google.com/",
        "date": "04/24/22"
    },
    {
        "URL": "https://www.youtube.com/",
        "date": "04/24/22"
    },
    {
        "URL": "https://www.github.com/",
        "date": "04/24/22"
    },
]

let db = null

function create_database() {
    const request = window.indexedDB.open('MyTestDB')

    request.onerror = function(event) {
        console.log("Problem opening DB")
    }

    request.onupgradeneeded = function(event) {
        db = event.target.result

        let objectStore = db.createObjectStore('roster', {keyPath : 'URL'})
        objectStore.transaction.oncomplete = function(event) {
            console.log("ObjectStore Created")
        }
    }

    request.onsuccess = function(event) {
        db = event.target.result
        console.log("DB opened")

        //insert_record(roster)

        db.onerror = function(event) {
            console.log("Failed to open DB")
        }
    }
}

function delete_database() {
    const request = window.indexedDB.deleteDatabase('MyTestDB')

    request.onerror = function(event) {
        console.log("Problem deleting DB")
    }

    request.onsuccess = function(event) {
        db = event.target.result
        console.log("DB deleted")
        db.onerror = function(event) {
            console.log("Failed to delete DB")
        }
    }
}

function insert_record(records) {
    if(db) {
        const insert_transaction = db.transaction("roster", "readwrite")
        const objectStore = insert_transaction.objectStore("roster")
        return new Promise((resolve, reject) => {
            insert_transaction.oncomplete = function() {
                console.log("Insert transactions completed")
                resolve(true)
            }

            insert_transaction.onerror = function() {
                console.log("Insert transactions were not completed")
                resolve(false)
            }

            roster.forEach(threat => {
                let request = objectStore.add(threat)

                request.onsuccess = function () {
                    console.log("Added: " , threat)
                }
            })
        })

        
    }
}

function get_record(URL) {
    if(db) {
        const get_transaction = db.transaction("roster", "readonly")
        const objectStore = get_transaction.objectStore("roster")
        return new Promise((resolve, reject) => {
            get_transaction.oncomplete = function() {
                console.log("get transactions completed")
            }
    
            get_transaction.onerror = function() {
                console.log("get transactions were not completed")
            }
    
            let request = objectStore.get(URL)
            request.onsuccess = function(event) {
                resolve(event.target.result)
            }
        })
    }
}

function update_record(record) {
    if(db) {
        const put_transaction = db.transaction("roster", "readwrite")
        const objectStore = put_transaction.objectStore("roster")
        return new Promise((resolve, reject) => {
            put_transaction.oncomplete = function() {
                console.log("put transactions completed")
                resolve(true)
            }
    
            put_transaction.onerror = function() {
                console.log("put transactions were not completed")
                resolve(false)
            }
    
            objectStore.put(record) 
        })
    }
}

function delete_record(URL) {
    if(db) {
        const delete_transaction = db.transaction("roster", "readwrite")
        const objectStore = delete_transaction.objectStore("roster")
        return new Promise((resolve, reject) => {
            delete_transaction.oncomplete = function() {
                console.log("delete transactions completed")
                resolve(true)
            }
    
            delete_transaction.onerror = function() {
                console.log("delete transactions were not completed")
                resolve(false)
            }
    
            objectStore.delete(URL)
        })
    }
}

create_database()