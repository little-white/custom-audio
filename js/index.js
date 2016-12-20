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
        getElement('#progress').oninput = audioProgress;
        getElement('.control').onclick = audioControl;
        songListDom.innerHTML = renderView.getSongListDom(songList);
        songListDom.addEventListener('click', songListSelect);
        getLrc(getElement('.active').getAttribute('data-song-lrc'), 0);
        showCurrentTime(0);
        showTotalTime(0);
    }

    function songListSelect(e) {
        if (e.target && e.target.className.indexOf('item') !== -1) {
            var itemsDom = getElements('#song-list .item');
            itemsDom.removeClass('active');
            addClass(e.target, 'active');

            obj.audio.load();
            for (var i = 0, len = itemsDom.length; i < len; i++) {
                if (itemsDom[i] === e.target) {
                    if (typeof songCacheService.audioArr[i] !== 'object') {
                        songCacheService.audioArr[i] = new Audio(e.target.getAttribute('data-song-link'));
                    }
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
            // console.log(result.split(/\n/));
            songCacheService.lrcArr[index] = result;
            // console.log(renderView.getLrcListDom(result.split(/\n/)));
            getElement('#song-lrc').innerHTML = renderView.getLrcListDom(result.split(/\n/));
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
        obj.audio.volume = getElement('#volume').value / 100;
        if (isAudioPaused(obj.audio)) {
            var itemsDom = getElements('#song-list .item');
            // for (var i = 0, len = itemsDom.length; i < len; i++) {
            //     if (getElement('.active') === itemsDom[i]) {
            //         getLrc(getElement('.active').getAttribute('data-song-lrc'), i);
            //     }
            // }

            obj.audio.play();
        }
        showTotalTime(obj.audio.duration);
        setInterval(function() {
            showCurrentTime(obj.audio.currentTime);
        }, 1000);
        var step = -42;
        setInterval(function() {

            for (var i = 0; i < getElements('#song-lrc li').length; i++) {
                if (getElements('#song-lrc li')[i].getAttribute('data-song-lrc-time') === formatExactTime(obj.audio.currentTime)) {
                    getElements('#song-lrc li').removeClass('active');
                    getElements('#song-lrc li')[i].addClass('active');
                    smooth_scroll_to(getElement('.song-lrc-container'), step, 200);
                    console.log(step);
                    // transitionScrollTo({
                    //     element: getElement('.song-lrc-container'),
                    //     x:0,
                    //     y:step

                    // })
                    // getElement('.song-lrc-container').scrollTop = step;
                    step += 42;
                }
            }
            getElement('.current-bar').style.width = obj.audio.currentTime * 100 / obj.audio.duration + '%';
        }, 1);
    }

    function showTotalTime(seconds) {
        getElement('#total-time').innerText = formatTime(seconds);
    }

    function showCurrentTime(seconds) {
        getElement('#current-time').innerText = formatTime(seconds);
    }

    function audioVolume(e) {
        obj.audio.volume = getElement('#volume').value / 100;
    }

    function audioProgress(e) {
        obj.audio.currentTime = getElement('#progress').value * obj.audio.duration / 100;
    }

    function isAudioPaused(audioObj) {
        return audioObj.paused;
    }

    function audioControl() {
        if (getElement('.control').hasClass('listening')) {
            getElement('.control').removeClass('listening');
        } else {
            getElement('.control').addClass('listening');
        }
    }
})();
