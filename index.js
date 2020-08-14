'use strict';

// ployfill for {element}.matches() for IE
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}

// ployfill for {element}.closest() for IE
if (!Element.prototype.closest) {
    Element.prototype.closest = function (s) {
        var el = this;

        do {
            if (Element.prototype.matches.call(el, s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}

// Polyfill for IE 10/11 and Firefox <26, where classList.add and
// classList.remove exist but support only one argument at a time.
var createMethod = function (method) {
    var _method = DOMTokenList.prototype[method];

    DOMTokenList.prototype[method] = function (token) {
        for (var i = -1, len = arguments.length; ++i < len;) {
            token = arguments[i];
            _method.call(this, token);
        }
    };
};
createMethod('add');
createMethod('remove');

// ployfill for {element}.classList.replace() for IE
if (!DOMTokenList.prototype.replace) {
    DOMTokenList.prototype.replace = function (a, b) {
        var arr = Array(this);
        var regex = new RegExp(arr.join("|").replace(/ /g, "|"), "i");
        if (!regex.test(a)) {
            return this;
        }
        this.remove(a);
        this.add(b);
        return this;
    }
}

// Check if browser is IE
let detectIE = () => {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf('MSIE ');
    if (msie > 0) {
        return 'IE';
    }
    var trident = ua.indexOf('Trident/');
    if (trident > 0) {
        return 'IE';
    }
    return false;
}

// addEventListener once option for IE
// must include the follwing code if once option is selected 
/*
 * if (IE_once(e) == true) {
 *     code goes here...
 * }
 */
let IE_once = (e) => {
    if (detectIE() == 'IE') {
        if (e.target.dataset.triggered == undefined) {
            e.target.dataset.triggered = true;
            return true; // IE event first call
        } else {
            return false; // IE event already called
        }
    } else {
        return true; // not IE
    }
}


window.$_ = (function () {
    class Selector {
        constructor(els) {
            for (let i = 0; i < els.length; i++) {
                this[i] = els[i];
            }
            this.length = els.length;
        }
        // ========= UTILS =========
        forEach(callback) {
            this.map(callback);
            return this;
        }
        map(callback) {
            let results = [];
            for (let i = 0; i < this.length; i++) {
                results.push(callback.call(this, this[i], i));
            }
            return results; //.length > 1 ? results : results[0];
        }
        ready(callback) {
            document.readyState != 'loading' ? callback() 
            : document.addEventListener ? document.addEventListener('DOMContentLoaded', callback) 
            : document.attachEvent('onreadystatechange', function () {
                if (document.readyState == 'complete'){
                    callback();
                }
            });
        }
        buildModal(el) {
            let overlay = document.createElement("div");
            overlay.classList.add('modal__overlay');
            overlay.addEventListener('click', () => {
                let modal = el.parentElement;
                modal.classList.remove('open');
            })

            //header
            let header = document.createElement("div");
            header.classList.add('modal__header');

            //title
            let title = el.getAttribute('data-modal-title');
            let elTitle = document.createElement("div");
            let content = el.querySelector('.modal__content');
            elTitle.classList.add('modal__title');
            elTitle.innerHTML = title;

            //close button
            let closeBtn = document.createElement("button");
            closeBtn.classList.add('modal__close--button');
            closeBtn.addEventListener('click', () => {
                let modal = el.parentElement.parentElement.parentElement;
                el.classList.remove('open');
            })

            //body
            let body = document.createElement("div");
            body.classList.add('modal__body');
            body.appendChild(content);

            //build
            header.appendChild(elTitle);
            header.appendChild(closeBtn);
            body.insertBefore(header, body.firstChild);
            el.appendChild(overlay);
            el.appendChild(body);
            document.body.appendChild(el);
        }
        exist(callback) {
            if(this.length != 0) {
                return this.forEach(callback);
            } else {
                return null;
            }
        }
        // ========== DOM MANIPULATION ==========
        on(event, callback, options = null) {
            return this.forEach(function (el) {
                el.addEventListener(event, callback, options);
            });
        }
        addClass(classes) {
            let className = "";
            if (typeof classes !== 'string') {
                for (let i = 0; i < classes.length; i++) {
                    className += " " + classes[i];
                }
            } else {
                className = " " + classes;
            }

            return this.forEach(function (el) {
                el.className += className;
            });
        }
        removeClass(clazz) {
            return this.forEach(function (el) {
                let cs = el.className.split(' '),
                    i;

                while ((i = cs.indexOf(clazz)) > -1) {
                    cs = cs.slice(0, i).concat(cs.slice(++i));
                }
                el.className = cs.join(' ');
            });
        }
        fadeOut(time) {
            return this.forEach(function (el) {
                el.style.opacity = "0";
                el.style.transition = (time / 1000) + "s opacity";

                setTimeout(function () {
                    el.style.display = "none";
                }, time)
            })
        }
        modal() {
            return this.forEach((el) => {
                if (el.querySelector('.modal__overlay')) {
                    el.classList.add('open');
                    return false;
                }

                this.buildModal(el);
                el.classList.add('open');
            })
        }
        slide(pos, time) {
            return this.forEach(function (el) {
                let start = Date.now();
                let final_pos = Math.round(pos);
                let pos_frame = Math.abs(final_pos / 100);

                let timer = setInterval(function () {
                    let timePassed = Date.now() - start;

                    if (timePassed >= time) {
                        clearInterval(timer);
                        return;
                    }

                    if (el.scrollLeft < final_pos) {
                        el.scrollLeft += pos_frame;
                    } else if (el.scrollLeft > final_pos) {
                        el.scrollLeft -= pos_frame;
                    }

                }, time / 100);
            })
        }
    }

    let selector = (selector) => {
        let els;
        if (typeof selector === 'string') {
            els = document.querySelectorAll(selector);
        } else if (selector.length) {
            els = selector;
        } else {
            els = [selector];
        }
        return new Selector(els);
    }

    return selector;
}());