(function() {

    window.renderView = {
        getSongListDom: getSongListDom,
        getLrcListDom: getLrcListDom
    }

    var tempFn;

    function getSongListDom(data) {
        tempFn = doT.template(getElement('#songListTmpl').innerText);
        if (songList.length > 0) {
            songList[0].active = 'active';
        }
        return tempFn(data);
    }

    function getLrcListDom(data) {
    	var arr = [];
    	data.map(function(elem){
    		elem.match(/\[(.+?)\]/);
			arr.push({
				time: RegExp.$1,
				name: elem.replace(/\[.+?\]/g, '')
			})
    	})
        tempFn = doT.template(getElement('#lrcListTmpl').innerText);
        return tempFn(arr);
    }

})(window);
