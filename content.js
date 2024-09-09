const iframe = document.createElement("iframe");
iframe.id = "audioIframe";
iframe.src = chrome.runtime.getURL("/iframe/audioPlayerIframe.html");
iframe.allow = "autoplay";
iframe.style = `
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    `;
iframe.frameBorder = 0;
iframe.scrolling = "no";

document.body.appendChild(iframe);

/** @type {Map<string, {timesNotified: number, lastNotified: number}} */
const handledPolls = new Map();

setInterval(() => {
    const polls = document.querySelectorAll(`#modals-container [data-modal^="poll_"]`);

    for (const poll of polls) {
        if (!handledPolls.has(poll.dataset.modal)) {
            handledPolls.set(poll.dataset.modal, { timesNotified: 0, lastNotified: 0 });
        }

        const time = Date.now();
        const pollData = handledPolls.get(poll.dataset.modal);
        if (time - pollData.lastNotified > 10 * 1000) {
            pollData.timesNotified++;
            pollData.lastNotified = time;
            iframe.contentWindow.postMessage({ message: "play" }, "*");
            console.log("Wee woo! Wee woo!", pollData.timesNotified, pollData.lastNotified);
        }
    }
}, 1000);
