(function() {
    var init = init;
    var obj = {
        audio: new Audio(songList[0].url)
    }

    init();

    function init() {
        var songLink = 'list';
        var songListDom = getElement('#song-list');
        // get audio object


        // event handler
        getElement('#play').onclick = audioPlay;
        getElement('#pause').onclick = audioPause;
        songListDom.innerHTML = generateSongListDom(songList);
        songListDom.addEventListener('click', songListSelect);
    }

    function generateSongListDom(list) {
        var length = list.length;
        var dom = '<ul>';
        for (var i = 0; i < length; i++) {
            dom += '<li class="item" data-song-link="' + list[i].url + '">' + list[i].name + '</li>';
        }
        dom += '</ul>';

        return dom;
    }

    function songListSelect(e) {
        if (e.target && e.target.className === 'item') {
        	for(var i=0; i<getElements('#song-list .item').length; i++){
    			getElements('#song-list .item')[i].className = 'item';
        	}
            e.target.className += ' active';
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
