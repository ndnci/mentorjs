/**
 * MentorJS v1.0
 * https://github.com/ndnci/mentorjs
 *
 * Copyright (C) 2019 NDNCI - www.ndnci.com ( Ahliman HUSEYNOV )
 */
class MentorJS {

    constructor(globalConfig) {

        // other parameters
        this._globalConfig = globalConfig;
        this._isOpened = null;
        this._stepsArray = [];
        this._modalOptions = {};

        // settings for all script
        this._settings = {
            // auto start script or not, params: true | false
            autoRun: true,
            // any existing step, for the first "0"
            stepFrom: 0,
        };

        // config for all modals
        this._config = {
                // params: dark | light
                theme: "light",
                // params: zoom | pulse | bounce | toLeft | toRight | toTop | toBottom
                animation: null,
                // area with background effect
                backgroundArea: document.querySelector("body"),
                // effect for backgroundarea when modal run
                backgroundEffectClass: "mentor-blur",
                // effect on defined target when modal run
                targetNoEffectClass: "mentor-noblur",
                // class will add to hidden target
                targetToggleClass: "mentor-toggle",
                // scroll to element/target when modal opened, params: true | false
                autoScroll: true,
                // params: scrollIntoView | scrollTo
                scrollMethod: "scrollTo",
                // params: target | modal
                scrollOn: "modal",
                // params: auto | smooth, behavior is not supported by Safari
                scrollBehavior: "smooth",
                // needs "scrollIntoView", params: start | center | end | nearest
                scrollBlock: "center",
                scrollInline: "center",
                // custom class names
                modalDivClass: "mentor-modal",
                modalDivHeaderClass: "mentor-modal-header",
                modalDivHeaderCloseClass: "close",
                modalDivBodyClass: "mentor-modal-body",
                modalDivFooterClass: "mentor-modal-footer",
                previousButtonClass: "mentor-btn mentor-modal-previous",
                nextButtonClass: "mentor-btn mentor-modal-next",
                endButtonClass: "mentor-btn mentor-modal-end",
                // open button for open concerned modal, must be unique per step
                // you can not set this option on all modals, ex: "#step1"
                openButtonId: null,
                // custom close button id without "#", close only current step, ex: "customClose"
                closeButtonId: "modalClose",
                // custom texts, allows HTML tags
                previousButtonText: "&laquo; Back",
                nextButtonText: "Next &raquo;",
                endButtonText: "Thanks",
                // order of modal, ex: 5
                order: null,
                // title of modal, allow HTML tags
                title: null,
                // content of message, allow HTML tags
                message: null,
                // target who will be not affected by background effect
                target: null,
                // show close button on header
                closeButton: false,
                // show header
                showHeader: true,
                // show footer
                showFooter: true,
                // show arrows
                showArrow: true,
                // exit modal on outside click
                outsideClick: false,
                // show target if its hidden and after hide
                targetAutoShow: false,
                // space between modal and target, only number, max 10 recommended
                // if you customise the arrow style, you should add arrow width too
                margin: 10,
                // horizontal align of modal, params: left | center | right | auto
                horizontal: "auto",
                // vertical align of modal, params: top | center | bottom | auto
                vertical: "auto",
                // if true, script modal be responsive
                responsive: true,
                /* wait time ( for actual modal ) when user click to next or previous button
                   default is 0 for modal speed, but if previous or next modal
                   is near of actual modal, you can get a problem with click (touchstart)
                   on mobile devices, if you added "touchstart" event and have this problem
                   on mobile, you can change it, the recommended value is "300",
                   modal will be faster on mobile and large screen
                   and you will not have a problem with button clicks (touchstart) */
                wait: 0,
                // you can define events for listener function
                // you can add multiple events with space " " between events
                // for exemple : "click touchstart mouseover" etc.
                events: "click",
                // you can disable the modal on mobile
                mobileSupport: true,
                /* dont change this values, script need this and auto change them values */
                positionTop: null
        };
    }

    /* ******************** getters and setters for variables */
    getConfig(key) {
        return this._config[key];
    }
    setConfig(key, value) {
        this._config[key] = value;
    }
    getSetting(key) {
        return this._settings[key];
    }
    setSetting(key, value) {
        this._settings[key] = value;
    }
    getModalOption(key) {
        return this._modalOptions[key];
    }
    setModalOption(key, value) {
        this._modalOptions[key] = value;
    }
    getCurrentStep() {
        return this.getSetting('stepFrom');
    }
    setCurrentStep(value) {
        this.setSetting('stepFrom', value);
    }

    /* ******************** getters for models */
    getModelHeader() {
        return `<div class="${this.getModalOption('modalDivHeaderClass')}">
                    ${this.getModelTitle()}
                    ${this.getModalOption('closeButton') ? this.getModelHeaderClose() : ""}
                </div>`;
    }
    getModelHeaderClose() {
        return `<span class="${this.getModalOption('modalDivHeaderCloseClass')}" id="${this.getModalOption('closeButtonId')}"></span>`;
    }
    getModelTitle() {
        return `<span>${this.getModalOption('title')}</span>`;
    }
    getModelBody() {
        return `<div class="${this.getModalOption('modalDivBodyClass')}">${this.getModalOption('message')}</div>`;
    }
    getModelPreviousButton() {
        return `<button class="${this.getModalOption('previousButtonClass')}">${this.getModalOption('previousButtonText')}</button>`;
    }
    getModelNextButton() {
        return `<button class="${this.getModalOption('nextButtonClass')}">${this.getModalOption('nextButtonText')}</button>`;
    }
    getModelEndButton() {
        return `<button class="${this.getModalOption('endButtonClass')}">${this.getModalOption('endButtonText')}</button>`;
    }
    getModelFooter() {
        return `<div class="${this.getModalOption('modalDivFooterClass')}">
                    ${!this.isFirstStep() ? this.getModelPreviousButton() : ""}
                    ${!this.isLastStep() ? this.getModelNextButton() : this.getModelEndButton()}
                </div>`;
    }

    /* ******************** other getters */
    getCurrenStepVal(key) {
        let value = this._stepsArray[this.getCurrentStep()][key];
        // if config is not defined by user
        // set it to modal config value
        if(value === undefined) value = this.getConfig(key);
        return value;
    }

    // use for change modal index on declared array
    goToStep(index) {
        // check if step exists
        if(this._stepsArray[index]) {
            // pass to next step
            this.setCurrentStep(index);
            // go to next modal with new informations
            this.resetModal();
        } else {
            // if not close the last modal
            this.closeModal();
        }
    }

    // check if step is the last of array
    isFirstStep() {
        return this.getCurrentStep() == 0;
    }

    // check if step is the last of array
    isLastStep() {
        return this.getCurrentStep() == (this._stepsArray.length - 1);
    }

    // make a modal template
    modalElementModel() {
        return `${this.getModalOption('showHeader') && this.getModalOption('title') ? this.getModelHeader() : ""}
                ${this.getModelBody()}
                ${this.getModalOption('showFooter') ? this.getModelFooter() : ""}`;
    }

    /* ******************** Declared parameters when page is loaded */
    updateConfig() {

        // get all declared global configs and change default values
        Object.getOwnPropertyNames(this._globalConfig).forEach(function(key) {
            this.setConfig(key, this._globalConfig[key]);            
        }, this);

        return this;
    }
    // all settings
    settings(settingsObj) {
        // get all declared settings and change default values
        Object.getOwnPropertyNames(settingsObj).forEach(function(key) {
            this.setSetting(key, settingsObj[key]);            
        }, this);
        
        return this;
    }
    // all declared steps
    steps(objectsArray) {

        // update all config declared values
        if(this._globalConfig) this.updateConfig();

        // get all objects declared in this function
        objectsArray.forEach(function(object) {

            // add object to array for stockage
            this._stepsArray.push(object);

            // reorder objects with order value
            objectsArray.sort(function(a, b) {
                return a.order - b.order;
            });

        }, this);

        // if device is mobile and support is false, remove all not supported
        // steps on array
        if(this.isMobile()) {
            this._stepsArray = this._stepsArray.filter(function (step) {
                return step.mobileSupport != false
            });
        }
        
        // if auto open is true open modal 
        if(this.getSetting('autoRun')) this.run();

        return this;
    }

    // go to previous step
    backStep() {
        this.goToStep(this.getCurrentStep() - 1);
        return this;
    }

    // go to next step
    nextStep() {
        this.goToStep(this.getCurrentStep() + 1);
        return this;
    }

    /* ******************** Inner functions */

    openModal() {

        // disable open button
        if(this.getModalOption('openButtonId')) {
            document.getElementById(this.getModalOption('openButtonId')).setAttribute("disabled","disabled");
        }

        // add background effect to DOM
        this.insertElementAfter(this.getModalOption('backgroundArea'), "div", this.getModalOption('backgroundEffectClass'));
        
        // create modal div on body
        let newModal = this.getModalOption('modalDivClass');
        if(this.getModalOption('theme')) newModal += " " + this.getModalOption('theme');
        if(this.getModalOption('animation')) newModal += " " + this.getModalOption('animation');
        this.insertElementAfter(this.getModalOption('backgroundArea'), "div", newModal, this.modalElementModel());

        // hide all showing divs
        [].forEach.call(document.getElementsByClassName(this.getModalOption('targetToggleClass')), function(el) {
            el.classList.remove(this.getModalOption('targetToggleClass'));
        }, this);

        // if target is defined
        if(this.getModalOption('target')) {

            // if auto show enabled, toggle hidden element
            if(this.getModalOption('targetAutoShow')) {
                this.showHiddenElement(this.element(this.getModalOption('target')));
            }

            // add show class to target
            this.element(this.getModalOption('target')).classList.add(this.getModalOption('targetNoEffectClass'));
        }

        // define modal position
        this.moveModal();

        if(this.getModalOption('autoScroll')) {
            this.scrollModal();
        }

            // set open status to true
            this._isOpened = true;
    }
      
    closeModal() {

        // enable open button
        if(this.getModalOption('openButtonId')) {
            document.getElementById(this.getModalOption('openButtonId')).removeAttribute("disabled");
        }

        // remove div bg effect on background
        let bgEffect = document.getElementsByClassName(this.getModalOption('backgroundEffectClass'))[0];
        if(bgEffect) bgEffect.remove();

        // if target is defined previously, remove show class
        if(this.getModalOption('target')) {
            this.element(this.getModalOption('target')).classList.remove(this.getModalOption('targetNoEffectClass'));
        }

        // remove created modal element
        let previousModal = document.getElementsByClassName(this.getModalOption('modalDivClass'))[0];
        if(previousModal) previousModal.remove();

        // set open status to false
        this._isOpened = false;
    }

    // update all modal informations
    updateModal() {
        // update all informations for new modal
        Object.getOwnPropertyNames(this._config).forEach(function(key) {
            this.setModalOption(key, this.getCurrenStepVal(key));            
        }, this);
    }

    // close current modal and update modal informations, after open new modal
    resetModal() {
        // close current modal
        this.closeModal();
        // update modal informations
        this.updateModal();
        // open new modal
        this.openModal();
    }

    // move modal to target position if it was declared
    moveModal() {
        
        // get screen size
        let windowWidth = document.documentElement.clientWidth;
        let windowHeight = Math.max( document.body.scrollHeight, document.body.offsetHeight, 
                                     document.documentElement.clientHeight,
                                     document.documentElement.scrollHeight,
                                     document.documentElement.offsetHeight );
                                     
        // get modal informations
        let modalElement = document.getElementsByClassName(this.getModalOption('modalDivClass'))[0];
        let modalHeight = modalElement.offsetHeight;
        let modalWidth = modalElement.offsetWidth;

        // get new offsets for position of modal
        let newTop, newLeft;
        let newWidth = modalWidth;
        let margin = this.getModalOption('margin');

        // if target is defined
        if(this.getModalOption('target')) {

            // target is set from config
            let target = this.element(this.getModalOption('target'));
            let targetPosition = this.getOffset(target);
            let targetHeight = target.offsetHeight;
            let targetWidth = target.offsetWidth;

            // if vertical is auto, change value automatically
            if(this.getModalOption('horizontal') == "auto") {
                // if space between element left and window is too short
                // move element to right
                if(targetPosition.left > modalWidth) {
                    this.setModalOption('horizontal', 'left');
                } else {
                    this.setModalOption('horizontal', 'right');
                }
                // if horizontal is right and
                // screen width is smaller than total of calc ( and small screens)
                // move element to center horizontally
                if(
                    (
                    this.getModalOption('horizontal') == "right" &&
                    (targetPosition.left + targetWidth + modalWidth + margin) > windowWidth
                    ) || windowWidth < 650) {
                    this.setModalOption('horizontal', 'center');
                }
            }

            // if vertical is auto, change value automatically
            if(this.getModalOption('vertical') == "auto") {
                // if space between element top and window is too short
                // move element to bottom
                if(targetPosition.top > modalHeight) {
                    this.setModalOption('vertical', 'top');
                } else {
                    this.setModalOption('vertical', 'bottom');
                }

                // if horizontal is not center, we have a space left or right for modal
                // if space between top and bottom of target is larger than half of modal
                if(
                    (this.getModalOption('horizontal') != "center") &&
                    (targetPosition.top > (modalHeight / 2)) &&
                    (windowHeight - targetPosition.top - modalHeight) > (modalHeight / 2)
                )
                {
                    // so move it to center vertically
                    this.setModalOption('vertical', 'center');
                }
            }
            
            // check modal horizontal option
            switch (this.getModalOption('horizontal')) {
                case "left":
                    // get actual modal height for calculate and substract it from target top
                    newLeft = targetPosition.left - modalWidth - margin;
                break;
                case "center":
                    newLeft = targetPosition.left + ((targetWidth  - modalWidth) / 2);
                break;
                case "right":
                    newLeft = targetPosition.left + targetWidth + margin;
                break;
            }

            // check modal vertical option
            switch (this.getModalOption('vertical')) {
                case "top":
                    // get actual modal height for calculate and substract it from target top
                    newTop = targetPosition.top - modalHeight - margin;
                break;
                case "center":
                    newTop = targetPosition.top + ((targetHeight  - modalHeight) / 2);
                break;
                case "bottom":
                    newTop = targetPosition.top + targetHeight + margin;
                break;
            }

            // if arrows is enabled
            if(this.getModalOption('showArrow')) {

                let arrowClass;

                if(this.getModalOption('horizontal') == "center") {
                    arrowClass = this.getModalOption('vertical');
                } else {
                    arrowClass = this.getModalOption('horizontal');
                }

                // if position is diagonal
                if(this.getModalOption('vertical') != "center" && this.getModalOption('horizontal') != "center") {
                    arrowClass = this.getModalOption('vertical') + "-" + this.getModalOption('horizontal');
                }
                // add modal position to div class
                modalElement.classList.add(arrowClass);
            }
        } else {
            // if target is not defined, center modal element
            newTop = (window.innerHeight - modalHeight) / 2;
            newLeft = (windowWidth - modalWidth) / 2;
        }

        // if responsive is enabled
        if(this.getModalOption('responsive') && this.getModalOption('horizontal') == "center") {
            // if modal left value is negative or smaller than margin ( mobile device generally )
            // or the left margin + modal + margin total size is bigger than screen
            // set it to center of screen, with defined margin and 100% width
            if(newLeft < 0 || newLeft < margin || (newLeft + modalWidth + margin) > windowWidth) {
                // 50 is the random value, it's not specific or calculated
                // for exemple : screen : 500px and modal 490px
                // 490 - 50, so modal width = 450px for center
                newWidth = windowWidth - (margin * 2) - 50;
                newLeft = 0;
                // css for center the modal
                modalElement.style.cssText = `right: 0;
                                              margin-left: auto;
                                              margin-right: auto;`;
            }
        }

        // set top position on options, for scrollTo() etc
        this.setModalOption('positionTop', newTop);

        // change actual modal position
        modalElement.style.cssText += `position: absolute !important;
                                       top: ${newTop}px;
                                       left: ${newLeft}px;
                                       width: ${newWidth}px;`;
    }

    scrollModal() {
        
        // choose element to scroll
        let scrollElement;
        if(this.getModalOption('scrollOn') == "target") {
            scrollElement = this.element(this.getModalOption('target'));
        } else {
            scrollElement = document.getElementsByClassName(this.getModalOption('modalDivClass'))[0];
        }

        // auto scroll
        if(this.getModalOption('scrollMethod') == "scrollIntoView") {
            scrollElement.scrollIntoView({
                behavior: this.getModalOption('scrollBehavior'),
                block: this.getModalOption('scrollBlock'),
                inline: this.getModalOption('scrollInline')
            });
        } else {
            window.scrollTo({
                top: this.getModalOption('positionTop') - ( window.innerHeight / 2 ),
                behavior: this.getModalOption('scrollBehavior')
            });
        }
    }

    /* ******************** Custom functions for short and lisible code */

    // custom event listener for multiple events
    addEventListeners(el, s, fn) {
        s.split(' ').forEach(e => el.addEventListener(e, fn, false));
    }

    // short element selector personalized
    element(selector, type = "query") {
        if(type == "query") return document.querySelector(selector);
        if(type == "class") return document.getElementsByClassName(selector)[0];
        if(type == "id") return document.getElementById(selector);
    }

    // returns true if the element or one of its parents has the class classname
    hasSomeParentTheClass(element, classname) {
        if(element.parentNode) {
            if (element.className.split(' ').indexOf(classname)>=0) return true;
            return element.parentNode && this.hasSomeParentTheClass(element.parentNode, classname);
        }
    }

    // this function will deteck if the element
    showHiddenElement(element) {

        // check display of actual element and add custom style class for display block etc
        if(getComputedStyle(element, null).display == "none") {
            element.classList.add(this.getModalOption('targetToggleClass'));
        }
        // check if element have parent and element is not hidden
        if(element.parentNode && getComputedStyle(element, null).display !== "none") {

            if (getComputedStyle(element.parentNode, null).display == "none") {
                return element.parentNode.classList.add(this.getModalOption('targetToggleClass'));
            }
            // loop function if nothing founded
            return this.showHiddenElement(element.parentNode);
        }
    }

    // get element position
    getOffset( el ) {
        var _x = 0;
        var _y = 0;
        while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
            // on mobile dont calc scrollTop and scrollLeft, for exemple Safari
            // will return a different number everytime so script
            // can get the real top distance
            if(this.isMobile()) {
                _x += (el.offsetLeft + el.clientLeft);
                _y += (el.offsetTop + el.clientTop);
            } else {
                _x += (el.offsetLeft - el.scrollLeft + el.clientLeft);
                _y += (el.offsetTop - el.scrollTop + el.clientTop);
            }
            el = el.offsetParent;
        }
        return { top: _y, left: _x };
    }
    
    // Check if event target id or class is equal to query
    targetQueryValidator(event, query) {
        return (
            event.target.id == query.replace("#", "") ||
            event.target.className == query.replace(".", "")
        );
    }

    // Custom element adder into DOM after specific element
    insertElementAfter(whichElement, tagName, className, content = "") {
        let element = document.createElement(tagName);
        element.setAttribute("class", className);
        element.innerHTML = content;
        whichElement.parentNode.insertBefore(element, whichElement.nextSibling);
    }

    isMobile() {
        var check = false;
        (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
        return check;
    }

    /* ******************** Script run and custom listener */

    run() {
        // update informations and open modal
        this.updateModal();
        this.openModal();
        // start to listen all events declared on this function
        this.listener();
    }

    listener() {

        let previousEventChecker, nextEventChecker;

        // Detect click on anywhere
        this.addEventListeners(document, this.getModalOption('events'), (event) => {

            // clear all events timeouts for
            // prevent multiple clicks on the same time 
            clearTimeout(previousEventChecker);
            clearTimeout(nextEventChecker);

            // Ignore other click events
            event.stopPropagation();
            
            // Detect click on anywhere of outside modal element if its activated
            if(this.getModalOption('outsideClick') && !this.hasSomeParentTheClass(event.target, this.getModalOption('modalDivClass'))) {
                this.closeModal();
            }

            // Detect click on specific close button
            if(this.targetQueryValidator(event, this.getModalOption('closeButtonId'))) {
                this.closeModal();
            }
            
            // Detect specific open button click
            if(event.target.id) {

                let concernedStep = this._stepsArray.findIndex(function(step) {
                    return step.openButtonId == event.target.id;
                });
                
                if(concernedStep) this.goToStep(concernedStep);
            }

            // wait for going to previous step
            previousEventChecker = setTimeout(() => {
                // Detect previous button click or defined key
                if(this.targetQueryValidator(event, this.getModalOption('previousButtonClass'))) {
                    // go to previous step number if current is not the first step
                    if( !this.isFirstStep() ) this.backStep();
                }
            }, this.getModalOption('wait'));

            // wait for going to next step
            nextEventChecker = setTimeout(() => {
                // Detect next button click or defined key
                if(this.targetQueryValidator(event, this.getModalOption('nextButtonClass'))) {
                    // go to next step number if current is not the last step
                    if( !this.isLastStep() ) this.nextStep();
                }
            }, this.getModalOption('wait'));

            // Detect end button click or defined key
            if(this.targetQueryValidator(event, this.getModalOption('endButtonClass'))) {
                if( this.isLastStep() ) this.closeModal();
            }
        });

        // if responsive is enabled
        if(this.getModalOption('responsive')) {
            
            // if windows size change, reset modal with new position etc
            window.addEventListener("resize", () => {
                // reset modal on only large screens
                if(!this.isMobile() && this._isOpened) this.resetModal();
            });
        }
    }
}