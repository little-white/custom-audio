(function() {
    var obj = {
        audio: new Audio(songList[0].url)
    }
    var init = init;

    init();

    function init() {

        songCacheService.audioArr = [obj.audio];
        var songListDom = getElement('#song-list');

        // event handler
        getElement('#play').onclick = audioPlay;
        getElement('#pause').onclick = audioPause;
        getElement('#volume').oninput = audioVolume;
        songListDom.innerHTML = songListItemDom;
        songListDom.addEventListener('click', songListSelect);
    }

    function songListSelect(e) {
        if (e.target && e.target.className.indexOf('item') !== -1) {
            var itemsDom = getElements('#song-list .item');
            itemsDom.removeClass('active');
            addClass(e.target, 'active');

            obj.audio.load();
            for (var i = 0, len = itemsDom.length; i < len; i++) {
                if (itemsDom[i] === e.target && typeof songCacheService.audioArr[i] !== 'object') {
                    songCacheService.audioArr[i] = new Audio(e.target.getAttribute('data-song-link'));
                    obj.audio = songCacheService.audioArr[i];
                }
                getElement('#song-lrc').innerText = '';
            }

        }
    }

    function getLrc(songLink, index) {
        if (typeof songCacheService.lrcArr[index] !== 'string') {
            songService.getLrc(songLink, success, error);
        } else {
            getElement('#song-lrc').innerText = songCacheService.lrcArr[index].replace(/\[.+?\]/g, '');
        }

        function success(result) {
            songCacheService.lrcArr[index] = result;
            getElement('#song-lrc').innerText = result.replace(/\[.+?\]/g, '');
        }

        function error() {

        }
    }

    function audioPause() {
        if (!isAudioPaused(obj.audio)) {
            obj.audio.pause();
        }
    }

    function audioPlay() {
        if (isAudioPaused(obj.audio)) {
            var itemsDom = getElements('#song-list .item');
            for (var i = 0, len = itemsDom.length; i < len; i++) {
                if (getElement('.active') === itemsDom[i]) {
                    getLrc(getElement('.active').getAttribute('data-song-lrc'), i);
                }
            }

            obj.audio.play();
        }
    }

    function audioVolume(e) {
        obj.audio.volume = getElement('#volume').value / 100;
    }

    function isAudioPaused(audioObj) {
        return audioObj.paused;
    }
})();
