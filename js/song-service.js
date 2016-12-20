(function() {
    var songService = {
        getLrc: getLrc
    }

    function getLrc(songLrcLink, success, error) {
        fetch(songLrcLink, {
            method: 'get'
        }).then(function(result){
    		result.text().then(success)
        }).then(error);
    }

    window.songService = songService;
})(window);
