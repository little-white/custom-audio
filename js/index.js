(function() {
    var init = init;
    var obj = {
        audio: new Audio(songList[0].url)
    }

    init();

    function init() {
        var songListDom = getElement('#song-list');

        // event handler
        getElement('#play').onclick = audioPlay;
        getElement('#pause').onclick = audioPause;
        songListDom.innerHTML = songListItemDom;
        songListDom.addEventListener('click', songListSelect);
    }

    function songListSelect(e) {
        if (e.target && e.target.className.indexOf('item') !== -1) {
            getElements('#song-list .item').removeClass('active');
            addClass(e.target, 'active');
            
            obj.audio.load();
            obj.audio = new Audio(e.target.getAttribute('data-song-link'));
        }
    }

    function audioPause() {
        if (!isAudioPaused(obj.audio)) {
            obj.audio.pause();
        }
    }

    function audioPlay() {
        if (isAudioPaused(obj.audio)) {
            obj.audio.play();
        }
    }

    function isAudioPaused(audioObj) {
        return audioObj.paused;
    }
})();
