

(function () {
    const DATA_URL_PREFIX = 'data:text/javascript;charset=utf-8,'
    const FUNCTION = 'function';
    const CONSTRUCTOR = 'constructor';
    const DEFAULT_CONTROLLER_ATTRIBUTE = "web-controller";

    function setHtml(ctrl, elm, doNext) {

        const r = ctrl.getHtml.call(elm);
        if (r.then) {
            r.then(r => {
                elm.innerHTML = r;
                if (typeof doNext  === 'function') doNext();
            });
        } else {
            elm.innerHTML = r;
            if (typeof doNext === 'function') doNext();
        }
    }

    function autowire(rootElement = document, scanAttribute = DEFAULT_CONTROLLER_ATTRIBUTE) {

        let result = {};
        let module = null;

        async function getClassForName(className) {
            let importUrl = './' + className;
            if (className.endsWith('.js')) {

                module = await import(importUrl);
                className = className.split('/').pop().replace('.js', '');
            }

            //if it is a module return de class in de module
            if (module) {
                console.log('class ' + className + ' imported as module!');
                if (!module[className]) {
                    console.error('class', className, ' not found in module', importUrl, '!');
                }
                return module[className];
            }

        }



        function bindMethodsAndEvents (controller, ctrl, elm) {
            let elmType = Object.getPrototypeOf(elm).constructor.name;
            let keys = getPropNames(controller);


            let methods = keys.filter(k => typeof ctrl[k] == FUNCTION).filter(k => k != CONSTRUCTOR);

            for (let method of methods) {
                let srcElements = [elm];
                let event = method.substring(2);

                if ('onresize' === method)  {
                    new ResizeObserver(ctrl[method].bind(elm)).observe(elm);
                    continue;
                }

                let methodParts = /on([a-z]+)([A-Z][a-z]+)(_\w+|[0-9]*)/.exec(method);
                if (methodParts) {
                    [method, event, srcElmType, attrOrElmIndex] = methodParts;
                    let isNumeric = /\d+/.test(attrOrElmIndex);
                    if (isNumeric) {
                        srcElements = arrayify(elm.querySelectorAll(srcElmType)).filter((e, i) => i == (attrOrElmIndex - 1));
                    } else {
                        srcElements = arrayify(elm.querySelectorAll(srcElmType + attrOrElmIndex.replace('_', '#')));
                    }
                    if (srcElements.length == 0) {
                        console.error('Could not find ', srcElmType + attrOrElmIndex, ' to add EventListener for ', event);
                        continue;
                    }
                } else {
                    methodParts = /on([a-z]+)_(\w+)/.exec(method);
                    if (methodParts) {
                        [method, event, id] = methodParts;
                        srcElements = [elm.querySelector(`#${id}`)];
                        if (!srcElements[0]) {
                            console.error(`Could not find element with id "${id}" to add EventListener for ${event}`);
                            continue;
                        }
                    }
                }


                if (('on' + event) in HTMLElement.prototype) {
                    srcElements.forEach(se => se.addEventListener(event, ctrl[method].bind(elm)));
                    console.log('added listener:', method, ' from ', controller.name, ' to ', elmType, ' with id: ', elm.id);
                } else {
                    if (method in elm ) {
                        if (elm[method] !== ctrl[method]) {
                            console.error('Cannot add method:', method + ', another with this name allready exsists in ', elmType, ' with id: ', elm.id);
                        }
                        continue;
                    }
                    srcElements.forEach(se => {
                        se[method] = ctrl[method];
                    });
                    console.log('added method:', method, ' from ', controller.name, ' to ', elmType, ' with id: ', elm.id);
                }


            }

        }

        async function wireUp(controller, elms) {
            controller = await controller;
            elms.forEach((elm, i) => {
                result[controller.name] = controller;
                result[elm.id || (controller.name + i)] = elm;
                elm.controller = controller;
                let ctrl = new controller();


                if (controller.prototype.init && !elm.initialized) {
                    controller.prototype.init.call(elm);
                    elm.initialized = true;
                }
                //insert html
                if (ctrl.getHtml) {
                    let doNext = () =>{
                        Object.assign(result, autowire(elm));
                        bindMethodsAndEvents(controller, ctrl, elm);
                    };
                    setHtml(ctrl, elm, doNext);
                } else {

                    bindMethodsAndEvents(controller, ctrl, elm);
                }




                elm.refresh = () => {
                    "use strict";
                    let activeId = document.activeElement.id;
                    let selStart = document.activeElement.selectionStart;
                    let selEnd = document.activeElement.selectionEnd;
                    //elm.innerHTML = elm.getHtml();
                    wireUp(elm.controller, [elm]);
                    window.setTimeout(()=>{
                        const activeElm = document.getElementById(activeId);
                        activeElm?.setSelectionRange(selStart, selEnd);
                        activeElm?.focus();
                    },0);
                };

            });
        }



        //collect all classes and elements having the corresponding attribute
        let jsClasses = {}; //init empty map
        let elms = rootElement.querySelectorAll(`[${scanAttribute}]`);
        for (let i = 0; i < elms.length; i++) {
            let elm = elms[i];
            let jsClass = elm.getAttribute(scanAttribute);
            if (jsClass in jsClasses) {
                jsClasses[jsClass].push(elm);
            } else {
                jsClasses[jsClass] = [elm];
            }
        }
        for (let c in jsClasses) {
            let controller = getClassForName(c);
            if (controller) {
                wireUp(controller, jsClasses[c]);
            }

        }
        //console.log("returning:\n", JSON.stringify(result,null,3));
        return result;

    }

    function getPropNames(controller) {
        let result = [];
        let proto = controller.prototype;
        while (Object.getPrototypeOf(proto)) {
            let keys = Object.getOwnPropertyNames(proto);
            result = result.concat(keys);
            proto = Object.getPrototypeOf(proto);

        }
        return result;

    }

    function arrayify(elms) {
        return [].slice.call(elms, 0);
    }

    function doAutoWire() {
        //wait until autowire is loaded
        if (autowire) {
            window.app = autowire();
            console.log('autowire loaded app' ,window.app);
            return ;
        }
        console.log('waiting for autowire to be loaded');
        window.setTimeout(doAutoWire, 100);
    }


    window.app = null;
    window.addEventListener('load', doAutoWire);

}());
