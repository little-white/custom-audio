(function() {
    var tempFn = doT.template(getElement('#songListTmpl').innerText);
    if(songList.length > 0){
		songList[0].active = 'active';
    }
    var resultText = tempFn(songList);
    window.songListItemDom = resultText;
})(window);
