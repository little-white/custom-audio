(function() {
    var init = init;
    var obj = {
        audio: new Audio(songList[0].url)
    }
    var objArr = [obj.audio];

    init();

    function init() {
        var songListDom = getElement('#song-list');

        // event handler
        getElement('#play').onclick = audioPlay;
        getElement('#pause').onclick = audioPause;
        songListDom.innerHTML = songListItemDom;
        songListDom.addEventListener('click', songListSelect);
        getLrc(songList[0].lrcLink);
    }

    function songListSelect(e) {
        if (e.target && e.target.className.indexOf('item') !== -1) {
            var itemsDom = getElements('#song-list .item');
            itemsDom.removeClass('active');
            addClass(e.target, 'active');

            obj.audio.load();
            for (var i = 0, len = itemsDom.length; i < len; i++) {
                if (itemsDom[i] == e.target) {
                    if (typeof objArr[i] !== 'object') {
                        objArr[i] = new Audio(e.target.getAttribute('data-song-link'));
                        obj.audio = objArr[i];
                    }
                }
            }
            getLrc(e.target.getAttribute('data-song-lrc'));

        }
    }

    function getLrc(songLink){
        songService.getLrc(songLink, success, error);

        function success(result){
            getElement('#song-lrc').innerText = result.replace(/\[.+?\]/g, '');
        }

        function error(){

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
