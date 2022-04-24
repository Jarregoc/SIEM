
const first = document.createElement('button')
first.innerText = "SET DATA"
first.id = "first"

const second = document.createElement('button')
second.innerText = "SHOUT OUT TO BACKEND"
second.id = "second"

document.querySelector('body').appendChild(first)
document.querySelector('body').appendChild(second)

first.addEventListener('click', () => {
    //chrome.storage.sync
    chrome.storage.local.set({"password" : "1234"})
    console.log("I SET DATA")
})

second.addEventListener('click', () => {
    chrome.runtime.sendMessage({message: 'check the storage'})
    console.log('I sent the message for storage')
})

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(request.message);
})