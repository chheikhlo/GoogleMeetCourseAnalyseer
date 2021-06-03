
class MainContent {
    allParticipants = document.querySelectorAll(".cS7aqe");
    
    async initialize() {
        this._localize();
        this.listenMsg();
    }

    _localize() {
        // CSS selector
        document.querySelectorAll("[data-loc]").forEach(el => {
            const key = el.getAttribute("data-loc");
            el.innerHTML = key.loc();
        });
    }
    //listen message from popup
    listenMsg() {
        chrome.runtime.onMessage.addListener(
            (request, sender, sendResponse) => {
                if (request.message == "getState") {
                    let state = document.querySelector(".ZaI3hb") ? true : false;
                    let btnViewUser = document.querySelector(".gV3Svc");
                    if (btnViewUser)
                        btnViewUser.click();
                    sendResponse(state);
                }
                else if (request.message == "getAll") {
                    sendResponse(this.getAll());
                }
                else if (request.message == "isInjected") {
                    sendResponse("yes");
                }
                else {
                    sendResponse({ result: "error", message: `Invalid 'cmd'` });
                }
                return true;
            });
    }

    getAll(){
        let selectAllUser = document.querySelectorAll(`[aria-label="Participants"] [role="listitem"]`);
        const divsArr = Array.from(selectAllUser);
        let allUser = [];
        divsArr.forEach((el) => {
            //console.log(el);
            allUser.push(el.innerText.replace("\n"," "));
        });
        return allUser;
    }
}
var reactionsMainContent = new MainContent();
reactionsMainContent.initialize();

