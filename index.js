'use strict';

window.$ = (function () {
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
        // needs testing!!!
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