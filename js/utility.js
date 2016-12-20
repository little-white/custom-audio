function getElement(selector) {
    var selector = document.querySelector(selector);
    selector.addClass = function(className) {
        selector.className += ' ' + className;
    }
    selector.hasClass = function(className) {
        return selector.className.indexOf(className) !== -1;
    }
    selector.removeClass = function(className) {
        selector.className = selector.className.replace(className, '');
    }
    return selector;
}

function addClass(element, className) {
    element.className += ' ' + className;
}

function getElements(selector) {
    var selectors = document.querySelectorAll(selector);

    selectors.removeClass = function(className) {
        for (var i = 0; i < selectors.length; i++) {
            var classNames = selectors[i].className;
            selectors[i].className = classNames.replace(className, '');
        }
    }

    selectors.addClass = function(className) {
        for (var i = 0; i < selectors.length; i++) {
            var classNames = selectors[i].className;
            selectors[i].className = classNames.replace(className, '');
        }
    }

    selectors.forEach(function(elem){
        var currentElem = elem;
        elem.addClass = function(className){
            currentElem.className += ' ' + className;
        }
    })
    return selectors;
}
