(function() {
    var init = init;

    init();

    function init() {
        // get audio object
        var audioObj = getElement('audio');

        // event handler
        getElement('play').onclick = audioPlay.bind({ audioObj: audioObj });
        getElement('pause').onclick = audioPause.bind({ audioObj: audioObj });
    }

    function audioPause() {
        if (!isAudioPaused(this.audioObj)) {
            this.audioObj.pause();
        }
    }

    function audioPlay() {
        if (isAudioPaused(this.audioObj)) {
            this.audioObj.play();
        }
    }

    function isAudioPaused(audioObj) {
        return audioObj.paused;
    }
})();
