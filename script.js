async function passToChrome() {
    console.log(chrome.tabs);

    const chromeScript = () => {
        let oldFavicon = document.querySelector("link[rel='shortcut icon']");
        let newFavicon = document.createElement("link");
        newFavicon.rel = "shortcut icon";
        newFavicon.href = chrome.runtime.getURL("old-twitter.png");
        document.head.removeChild(oldFavicon);
        document.head.appendChild(newFavicon);
    };

    let queryOptions = { active: true, lastFocusedWindow: true };
    let [tab] = await chrome.tabs.query(queryOptions);

    let id = tab.id;

    chrome.scripting.executeScript({
        target: {
            "tabId": id
        }, 
        func: chromeScript
    })
};

passToChrome();