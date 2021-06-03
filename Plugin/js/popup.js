var homepage = function () {
    return chrome.runtime.getManifest().homepage_url
};

class Popup {
    lblState = document.querySelector("#state");
    btnAttend = document.querySelector("#attend");
    listUserEle = document.querySelector("#list-user");
    inMeeting = document.querySelector("#in-meeting");
    

    async initialize() {
        this.sendMsg();
        this._localize();
    }

    sendMsg() {
        document.addEventListener("DOMContentLoaded", () => {
            // send msg
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.tabs.sendMessage(tabs[0].id, { "message": "getState" }, (response) => {
                    this.setState(response);
                    this.setElement(response);
                });
            });
        });
        this.btnAttend.addEventListener("click", () => {
            this.listUserEle.innerHTML = "";
            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {

                chrome.tabs.sendMessage(tabs[0].id, { "message": "getAll" }, (response) => {

                    let listUser = "";
                    response.forEach((item) => {
                        listUser += item + "\n";
                    });

                    console.log(listUser);

                    this.listUserEle.innerHTML = listUser;
                });
            });
        });
    }
   
    //page Actuel es ce dans Google Meet?
    setState(isMeeting) {
        this.lblState.innerHTML = "";
        let msg = "";
        if (isMeeting) {
            msg = "InMeeting".loc();
        }
        else {
            msg = "OutMeeting".loc();
        }
        this.lblState.innerHTML = msg;
    }
    
    //localize
    _localize() {
        // CSS selector
        document.querySelectorAll("[data-loc]").forEach(el => {
            const key = el.getAttribute("data-loc");
            el.innerHTML = key.loc();
        });
    }
}

new Popup().initialize();