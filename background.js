let activeTabID = 0

chrome.tabs.onActivated.addListener(tab => {
    chrome.tabs.get(tab.tabId, current_tab_info => {
        activeTabID = tab.tabId
        if(/^https:\/\/www\.google/.test(current_tab_info.url)) {
            chrome.tabs.insertCSS(null, {file: './mystyles.css'})
            chrome.tabs.executeScript(null, {file: './foreground.js'}, () => {
                console.log("i injected")
            })
        }
    })
});

// chrome.tabs.executeScript(null, {file: './foreground.js'}, () => {
//     console.log("i injected")
// })

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if(request.message === 'check the storage') {
        chrome.tabs.sendMessage(activeTabID, {message: 'I got your message'})
        
        chrome.storage.local.get("password", value => {
            console.log(value)
        })
    }
})