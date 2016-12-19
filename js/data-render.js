(function() {
    var tempFn = doT.template(getElement('#songListTmpl').innerText);
    var resultText = tempFn(songList);
    window.songListItemDom = resultText;
})(window);
