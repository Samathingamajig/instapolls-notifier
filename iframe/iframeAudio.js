const weewooAudio = new Audio(chrome.runtime.getURL("audio/dougdoug-weewoo.mp3"));

window.addEventListener("message", (event) => {
    if (event.data.message === "play") {
        weewooAudio.play();
    }
});
