"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * MentorJS v1.0
 * https://github.com/ndnci/mentorjs
 *
 * Copyright (C) 2019 NDNCI - www.ndnci.com ( Ahliman HUSEYNOV )
 */
var MentorJS = /*#__PURE__*/function () {
  function MentorJS(globalConfig) {
    _classCallCheck(this, MentorJS);

    // other parameters
    this._globalConfig = globalConfig;
    this._isOpened = null;
    this._stepsArray = [];
    this._modalOptions = {}; // settings for all script

    this._settings = {
      // auto start script or not, params: true | false
      autoRun: true,
      // any existing step, for the first "0"
      stepFrom: 0
    }; // config for all modals

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


  _createClass(MentorJS, [{
    key: "getConfig",
    value: function getConfig(key) {
      return this._config[key];
    }
  }, {
    key: "setConfig",
    value: function setConfig(key, value) {
      this._config[key] = value;
    }
  }, {
    key: "getSetting",
    value: function getSetting(key) {
      return this._settings[key];
    }
  }, {
    key: "setSetting",
    value: function setSetting(key, value) {
      this._settings[key] = value;
    }
  }, {
    key: "getModalOption",
    value: function getModalOption(key) {
      return this._modalOptions[key];
    }
  }, {
    key: "setModalOption",
    value: function setModalOption(key, value) {
      this._modalOptions[key] = value;
    }
  }, {
    key: "getCurrentStep",
    value: function getCurrentStep() {
      return this.getSetting('stepFrom');
    }
  }, {
    key: "setCurrentStep",
    value: function setCurrentStep(value) {
      this.setSetting('stepFrom', value);
    }
    /* ******************** getters for models */

  }, {
    key: "getModelHeader",
    value: function getModelHeader() {
      return "<div class=\"".concat(this.getModalOption('modalDivHeaderClass'), "\">\n                    ").concat(this.getModelTitle(), "\n                    ").concat(this.getModalOption('closeButton') ? this.getModelHeaderClose() : "", "\n                </div>");
    }
  }, {
    key: "getModelHeaderClose",
    value: function getModelHeaderClose() {
      return "<span class=\"".concat(this.getModalOption('modalDivHeaderCloseClass'), "\" id=\"").concat(this.getModalOption('closeButtonId'), "\"></span>");
    }
  }, {
    key: "getModelTitle",
    value: function getModelTitle() {
      return "<span>".concat(this.getModalOption('title'), "</span>");
    }
  }, {
    key: "getModelBody",
    value: function getModelBody() {
      return "<div class=\"".concat(this.getModalOption('modalDivBodyClass'), "\">").concat(this.getModalOption('message'), "</div>");
    }
  }, {
    key: "getModelPreviousButton",
    value: function getModelPreviousButton() {
      return "<button class=\"".concat(this.getModalOption('previousButtonClass'), "\">").concat(this.getModalOption('previousButtonText'), "</button>");
    }
  }, {
    key: "getModelNextButton",
    value: function getModelNextButton() {
      return "<button class=\"".concat(this.getModalOption('nextButtonClass'), "\">").concat(this.getModalOption('nextButtonText'), "</button>");
    }
  }, {
    key: "getModelEndButton",
    value: function getModelEndButton() {
      return "<button class=\"".concat(this.getModalOption('endButtonClass'), "\">").concat(this.getModalOption('endButtonText'), "</button>");
    }
  }, {
    key: "getModelFooter",
    value: function getModelFooter() {
      return "<div class=\"".concat(this.getModalOption('modalDivFooterClass'), "\">\n                    ").concat(!this.isFirstStep() ? this.getModelPreviousButton() : "", "\n                    ").concat(!this.isLastStep() ? this.getModelNextButton() : this.getModelEndButton(), "\n                </div>");
    }
    /* ******************** other getters */

  }, {
    key: "getCurrenStepVal",
    value: function getCurrenStepVal(key) {
      var value = this._stepsArray[this.getCurrentStep()][key]; // if config is not defined by user
      // set it to modal config value


      if (value === undefined) value = this.getConfig(key);
      return value;
    } // use for change modal index on declared array

  }, {
    key: "goToStep",
    value: function goToStep(index) {
      // check if step exists
      if (this._stepsArray[index]) {
        // pass to next step
        this.setCurrentStep(index); // go to next modal with new informations

        this.resetModal();
      } else {
        // if not close the last modal
        this.closeModal();
      }
    } // check if step is the last of array

  }, {
    key: "isFirstStep",
    value: function isFirstStep() {
      return this.getCurrentStep() == 0;
    } // check if step is the last of array

  }, {
    key: "isLastStep",
    value: function isLastStep() {
      return this.getCurrentStep() == this._stepsArray.length - 1;
    } // make a modal template

  }, {
    key: "modalElementModel",
    value: function modalElementModel() {
      return "".concat(this.getModalOption('showHeader') && this.getModalOption('title') ? this.getModelHeader() : "", "\n                ").concat(this.getModelBody(), "\n                ").concat(this.getModalOption('showFooter') ? this.getModelFooter() : "");
    }
    /* ******************** Declared parameters when page is loaded */

  }, {
    key: "updateConfig",
    value: function updateConfig() {
      // get all declared global configs and change default values
      Object.getOwnPropertyNames(this._globalConfig).forEach(function (key) {
        this.setConfig(key, this._globalConfig[key]);
      }, this);
      return this;
    } // all settings

  }, {
    key: "settings",
    value: function settings(settingsObj) {
      // get all declared settings and change default values
      Object.getOwnPropertyNames(settingsObj).forEach(function (key) {
        this.setSetting(key, settingsObj[key]);
      }, this);
      return this;
    } // all declared steps

  }, {
    key: "steps",
    value: function steps(objectsArray) {
      // update all config declared values
      if (this._globalConfig) this.updateConfig(); // get all objects declared in this function

      objectsArray.forEach(function (object) {
        // add object to array for stockage
        this._stepsArray.push(object); // reorder objects with order value


        objectsArray.sort(function (a, b) {
          return a.order - b.order;
        });
      }, this); // if device is mobile and support is false, remove all not supported
      // steps on array

      if (this.isMobile()) {
        this._stepsArray = this._stepsArray.filter(function (step) {
          return step.mobileSupport != false;
        });
      } // if auto open is true open modal 


      if (this.getSetting('autoRun')) this.run();
      return this;
    } // go to previous step

  }, {
    key: "backStep",
    value: function backStep() {
      this.goToStep(this.getCurrentStep() - 1);
      return this;
    } // go to next step

  }, {
    key: "nextStep",
    value: function nextStep() {
      this.goToStep(this.getCurrentStep() + 1);
      return this;
    }
    /* ******************** Inner functions */

  }, {
    key: "openModal",
    value: function openModal() {
      // disable open button
      if (this.getModalOption('openButtonId')) {
        document.getElementById(this.getModalOption('openButtonId')).setAttribute("disabled", "disabled");
      } // add background effect to DOM


      this.insertElementAfter(this.getModalOption('backgroundArea'), "div", this.getModalOption('backgroundEffectClass')); // create modal div on body

      var newModal = this.getModalOption('modalDivClass');
      if (this.getModalOption('theme')) newModal += " " + this.getModalOption('theme');
      if (this.getModalOption('animation')) newModal += " " + this.getModalOption('animation');
      this.insertElementAfter(this.getModalOption('backgroundArea'), "div", newModal, this.modalElementModel()); // hide all showing divs

      [].forEach.call(document.getElementsByClassName(this.getModalOption('targetToggleClass')), function (el) {
        el.classList.remove(this.getModalOption('targetToggleClass'));
      }, this); // if target is defined

      if (this.getModalOption('target')) {
        // if auto show enabled, toggle hidden element
        if (this.getModalOption('targetAutoShow')) {
          this.showHiddenElement(this.element(this.getModalOption('target')));
        } // add show class to target


        this.element(this.getModalOption('target')).classList.add(this.getModalOption('targetNoEffectClass'));
      } // define modal position


      this.moveModal();

      if (this.getModalOption('autoScroll')) {
        this.scrollModal();
      } // set open status to true


      this._isOpened = true;
    }
  }, {
    key: "closeModal",
    value: function closeModal() {
      // enable open button
      if (this.getModalOption('openButtonId')) {
        document.getElementById(this.getModalOption('openButtonId')).removeAttribute("disabled");
      } // remove div bg effect on background


      var bgEffect = document.getElementsByClassName(this.getModalOption('backgroundEffectClass'))[0];
      if (bgEffect) bgEffect.remove(); // if target is defined previously, remove show class

      if (this.getModalOption('target')) {
        this.element(this.getModalOption('target')).classList.remove(this.getModalOption('targetNoEffectClass'));
      } // remove created modal element


      var previousModal = document.getElementsByClassName(this.getModalOption('modalDivClass'))[0];
      if (previousModal) previousModal.remove(); // set open status to false

      this._isOpened = false;
    } // update all modal informations

  }, {
    key: "updateModal",
    value: function updateModal() {
      // update all informations for new modal
      Object.getOwnPropertyNames(this._config).forEach(function (key) {
        this.setModalOption(key, this.getCurrenStepVal(key));
      }, this);
    } // close current modal and update modal informations, after open new modal

  }, {
    key: "resetModal",
    value: function resetModal() {
      // close current modal
      this.closeModal(); // update modal informations

      this.updateModal(); // open new modal

      this.openModal();
    } // move modal to target position if it was declared

  }, {
    key: "moveModal",
    value: function moveModal() {
      // get screen size
      var windowWidth = document.documentElement.clientWidth;
      var windowHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight); // get modal informations

      var modalElement = document.getElementsByClassName(this.getModalOption('modalDivClass'))[0];
      var modalHeight = modalElement.offsetHeight;
      var modalWidth = modalElement.offsetWidth; // get new offsets for position of modal

      var newTop, newLeft;
      var newWidth = modalWidth;
      var margin = this.getModalOption('margin'); // if target is defined

      if (this.getModalOption('target')) {
        // target is set from config
        var target = this.element(this.getModalOption('target'));
        var targetPosition = this.getOffset(target);
        var targetHeight = target.offsetHeight;
        var targetWidth = target.offsetWidth; // if vertical is auto, change value automatically

        if (this.getModalOption('horizontal') == "auto") {
          // if space between element left and window is too short
          // move element to right
          if (targetPosition.left > modalWidth) {
            this.setModalOption('horizontal', 'left');
          } else {
            this.setModalOption('horizontal', 'right');
          } // if horizontal is right and
          // screen width is smaller than total of calc ( and small screens)
          // move element to center horizontally


          if (this.getModalOption('horizontal') == "right" && targetPosition.left + targetWidth + modalWidth + margin > windowWidth || windowWidth < 650) {
            this.setModalOption('horizontal', 'center');
          }
        } // if vertical is auto, change value automatically


        if (this.getModalOption('vertical') == "auto") {
          // if space between element top and window is too short
          // move element to bottom
          if (targetPosition.top > modalHeight) {
            this.setModalOption('vertical', 'top');
          } else {
            this.setModalOption('vertical', 'bottom');
          } // if horizontal is not center, we have a space left or right for modal
          // if space between top and bottom of target is larger than half of modal


          if (this.getModalOption('horizontal') != "center" && targetPosition.top > modalHeight / 2 && windowHeight - targetPosition.top - modalHeight > modalHeight / 2) {
            // so move it to center vertically
            this.setModalOption('vertical', 'center');
          }
        } // check modal horizontal option


        switch (this.getModalOption('horizontal')) {
          case "left":
            // get actual modal height for calculate and substract it from target top
            newLeft = targetPosition.left - modalWidth - margin;
            break;

          case "center":
            newLeft = targetPosition.left + (targetWidth - modalWidth) / 2;
            break;

          case "right":
            newLeft = targetPosition.left + targetWidth + margin;
            break;
        } // check modal vertical option


        switch (this.getModalOption('vertical')) {
          case "top":
            // get actual modal height for calculate and substract it from target top
            newTop = targetPosition.top - modalHeight - margin;
            break;

          case "center":
            newTop = targetPosition.top + (targetHeight - modalHeight) / 2;
            break;

          case "bottom":
            newTop = targetPosition.top + targetHeight + margin;
            break;
        } // if arrows is enabled


        if (this.getModalOption('showArrow')) {
          var arrowClass;

          if (this.getModalOption('horizontal') == "center") {
            arrowClass = this.getModalOption('vertical');
          } else {
            arrowClass = this.getModalOption('horizontal');
          } // if position is diagonal


          if (this.getModalOption('vertical') != "center" && this.getModalOption('horizontal') != "center") {
            arrowClass = this.getModalOption('vertical') + "-" + this.getModalOption('horizontal');
          } // add modal position to div class


          modalElement.classList.add(arrowClass);
        }
      } else {
        // if target is not defined, center modal element
        newTop = (window.innerHeight - modalHeight) / 2;
        newLeft = (windowWidth - modalWidth) / 2;
      } // if responsive is enabled


      if (this.getModalOption('responsive') && this.getModalOption('horizontal') == "center") {
        // if modal left value is negative or smaller than margin ( mobile device generally )
        // or the left margin + modal + margin total size is bigger than screen
        // set it to center of screen, with defined margin and 100% width
        if (newLeft < 0 || newLeft < margin || newLeft + modalWidth + margin > windowWidth) {
          // 50 is the random value, it's not specific or calculated
          // for exemple : screen : 500px and modal 490px
          // 490 - 50, so modal width = 450px for center
          newWidth = windowWidth - margin * 2 - 50;
          newLeft = 0; // css for center the modal

          modalElement.style.cssText = "right: 0;\n                                              margin-left: auto;\n                                              margin-right: auto;";
        }
      } // set top position on options, for scrollTo() etc


      this.setModalOption('positionTop', newTop); // change actual modal position

      modalElement.style.cssText += "position: absolute !important;\n                                       top: ".concat(newTop, "px;\n                                       left: ").concat(newLeft, "px;\n                                       width: ").concat(newWidth, "px;");
    }
  }, {
    key: "scrollModal",
    value: function scrollModal() {
      // choose element to scroll
      var scrollElement;

      if (this.getModalOption('scrollOn') == "target") {
        scrollElement = this.element(this.getModalOption('target'));
      } else {
        scrollElement = document.getElementsByClassName(this.getModalOption('modalDivClass'))[0];
      } // auto scroll


      if (this.getModalOption('scrollMethod') == "scrollIntoView") {
        scrollElement.scrollIntoView({
          behavior: this.getModalOption('scrollBehavior'),
          block: this.getModalOption('scrollBlock'),
          inline: this.getModalOption('scrollInline')
        });
      } else {
        window.scrollTo({
          top: this.getModalOption('positionTop') - window.innerHeight / 2,
          behavior: this.getModalOption('scrollBehavior')
        });
      }
    }
    /* ******************** Custom functions for short and lisible code */
    // custom event listener for multiple events

  }, {
    key: "addEventListeners",
    value: function addEventListeners(el, s, fn) {
      s.split(' ').forEach(function (e) {
        return el.addEventListener(e, fn, false);
      });
    } // short element selector personalized

  }, {
    key: "element",
    value: function element(selector) {
      var type = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "query";
      if (type == "query") return document.querySelector(selector);
      if (type == "class") return document.getElementsByClassName(selector)[0];
      if (type == "id") return document.getElementById(selector);
    } // returns true if the element or one of its parents has the class classname

  }, {
    key: "hasSomeParentTheClass",
    value: function hasSomeParentTheClass(element, classname) {
      if (element.parentNode) {
        if (element.className.split(' ').indexOf(classname) >= 0) return true;
        return element.parentNode && this.hasSomeParentTheClass(element.parentNode, classname);
      }
    } // this function will deteck if the element

  }, {
    key: "showHiddenElement",
    value: function showHiddenElement(element) {
      // check display of actual element and add custom style class for display block etc
      if (getComputedStyle(element, null).display == "none") {
        element.classList.add(this.getModalOption('targetToggleClass'));
      } // check if element have parent and element is not hidden


      if (element.parentNode && getComputedStyle(element, null).display !== "none") {
        if (getComputedStyle(element.parentNode, null).display == "none") {
          return element.parentNode.classList.add(this.getModalOption('targetToggleClass'));
        } // loop function if nothing founded


        return this.showHiddenElement(element.parentNode);
      }
    } // get element position

  }, {
    key: "getOffset",
    value: function getOffset(el) {
      var _x = 0;
      var _y = 0;

      while (el && !isNaN(el.offsetLeft) && !isNaN(el.offsetTop)) {
        // on mobile dont calc scrollTop and scrollLeft, for exemple Safari
        // will return a different number everytime so script
        // can get the real top distance
        if (this.isMobile()) {
          _x += el.offsetLeft + el.clientLeft;
          _y += el.offsetTop + el.clientTop;
        } else {
          _x += el.offsetLeft - el.scrollLeft + el.clientLeft;
          _y += el.offsetTop - el.scrollTop + el.clientTop;
        }

        el = el.offsetParent;
      }

      return {
        top: _y,
        left: _x
      };
    } // Check if event target id or class is equal to query

  }, {
    key: "targetQueryValidator",
    value: function targetQueryValidator(event, query) {
      return event.target.id == query.replace("#", "") || event.target.className == query.replace(".", "");
    } // Custom element adder into DOM after specific element

  }, {
    key: "insertElementAfter",
    value: function insertElementAfter(whichElement, tagName, className) {
      var content = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : "";
      var element = document.createElement(tagName);
      element.setAttribute("class", className);
      element.innerHTML = content;
      whichElement.parentNode.insertBefore(element, whichElement.nextSibling);
    }
  }, {
    key: "isMobile",
    value: function isMobile() {
      var check = false;

      (function (a) {
        if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))) check = true;
      })(navigator.userAgent || navigator.vendor || window.opera);

      return check;
    }
    /* ******************** Script run and custom listener */

  }, {
    key: "run",
    value: function run() {
      // update informations and open modal
      this.updateModal();
      this.openModal(); // start to listen all events declared on this function

      this.listener();
    }
  }, {
    key: "listener",
    value: function listener() {
      var _this = this;

      var previousEventChecker, nextEventChecker; // Detect click on anywhere

      this.addEventListeners(document, this.getModalOption('events'), function (event) {
        // clear all events timeouts for
        // prevent multiple clicks on the same time 
        clearTimeout(previousEventChecker);
        clearTimeout(nextEventChecker); // Ignore other click events

        event.stopPropagation(); // Detect click on anywhere of outside modal element if its activated

        if (_this.getModalOption('outsideClick') && !_this.hasSomeParentTheClass(event.target, _this.getModalOption('modalDivClass'))) {
          _this.closeModal();
        } // Detect click on specific close button


        if (_this.targetQueryValidator(event, _this.getModalOption('closeButtonId'))) {
          _this.closeModal();
        } // Detect specific open button click


        if (event.target.id) {
          var concernedStep = _this._stepsArray.findIndex(function (step) {
            return step.openButtonId == event.target.id;
          });

          if (concernedStep) _this.goToStep(concernedStep);
        } // wait for going to previous step


        previousEventChecker = setTimeout(function () {
          // Detect previous button click or defined key
          if (_this.targetQueryValidator(event, _this.getModalOption('previousButtonClass'))) {
            // go to previous step number if current is not the first step
            if (!_this.isFirstStep()) _this.backStep();
          }
        }, _this.getModalOption('wait')); // wait for going to next step

        nextEventChecker = setTimeout(function () {
          // Detect next button click or defined key
          if (_this.targetQueryValidator(event, _this.getModalOption('nextButtonClass'))) {
            // go to next step number if current is not the last step
            if (!_this.isLastStep()) _this.nextStep();
          }
        }, _this.getModalOption('wait')); // Detect end button click or defined key

        if (_this.targetQueryValidator(event, _this.getModalOption('endButtonClass'))) {
          if (_this.isLastStep()) _this.closeModal();
        }
      }); // if responsive is enabled

      if (this.getModalOption('responsive')) {
        // if windows size change, reset modal with new position etc
        window.addEventListener("resize", function () {
          // reset modal on only large screens
          if (!_this.isMobile() && _this._isOpened) _this.resetModal();
        });
      }
    }
  }]);

  return MentorJS;
}();
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1haW4uanMiXSwibmFtZXMiOlsiTWVudG9ySlMiLCJnbG9iYWxDb25maWciLCJfZ2xvYmFsQ29uZmlnIiwiX2lzT3BlbmVkIiwiX3N0ZXBzQXJyYXkiLCJfbW9kYWxPcHRpb25zIiwiX3NldHRpbmdzIiwiYXV0b1J1biIsInN0ZXBGcm9tIiwiX2NvbmZpZyIsInRoZW1lIiwiYW5pbWF0aW9uIiwiYmFja2dyb3VuZEFyZWEiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3IiLCJiYWNrZ3JvdW5kRWZmZWN0Q2xhc3MiLCJ0YXJnZXROb0VmZmVjdENsYXNzIiwidGFyZ2V0VG9nZ2xlQ2xhc3MiLCJhdXRvU2Nyb2xsIiwic2Nyb2xsTWV0aG9kIiwic2Nyb2xsT24iLCJzY3JvbGxCZWhhdmlvciIsInNjcm9sbEJsb2NrIiwic2Nyb2xsSW5saW5lIiwibW9kYWxEaXZDbGFzcyIsIm1vZGFsRGl2SGVhZGVyQ2xhc3MiLCJtb2RhbERpdkhlYWRlckNsb3NlQ2xhc3MiLCJtb2RhbERpdkJvZHlDbGFzcyIsIm1vZGFsRGl2Rm9vdGVyQ2xhc3MiLCJwcmV2aW91c0J1dHRvbkNsYXNzIiwibmV4dEJ1dHRvbkNsYXNzIiwiZW5kQnV0dG9uQ2xhc3MiLCJvcGVuQnV0dG9uSWQiLCJjbG9zZUJ1dHRvbklkIiwicHJldmlvdXNCdXR0b25UZXh0IiwibmV4dEJ1dHRvblRleHQiLCJlbmRCdXR0b25UZXh0Iiwib3JkZXIiLCJ0aXRsZSIsIm1lc3NhZ2UiLCJ0YXJnZXQiLCJjbG9zZUJ1dHRvbiIsInNob3dIZWFkZXIiLCJzaG93Rm9vdGVyIiwic2hvd0Fycm93Iiwib3V0c2lkZUNsaWNrIiwidGFyZ2V0QXV0b1Nob3ciLCJtYXJnaW4iLCJob3Jpem9udGFsIiwidmVydGljYWwiLCJyZXNwb25zaXZlIiwid2FpdCIsImV2ZW50cyIsIm1vYmlsZVN1cHBvcnQiLCJwb3NpdGlvblRvcCIsImtleSIsInZhbHVlIiwiZ2V0U2V0dGluZyIsInNldFNldHRpbmciLCJnZXRNb2RhbE9wdGlvbiIsImdldE1vZGVsVGl0bGUiLCJnZXRNb2RlbEhlYWRlckNsb3NlIiwiaXNGaXJzdFN0ZXAiLCJnZXRNb2RlbFByZXZpb3VzQnV0dG9uIiwiaXNMYXN0U3RlcCIsImdldE1vZGVsTmV4dEJ1dHRvbiIsImdldE1vZGVsRW5kQnV0dG9uIiwiZ2V0Q3VycmVudFN0ZXAiLCJ1bmRlZmluZWQiLCJnZXRDb25maWciLCJpbmRleCIsInNldEN1cnJlbnRTdGVwIiwicmVzZXRNb2RhbCIsImNsb3NlTW9kYWwiLCJsZW5ndGgiLCJnZXRNb2RlbEhlYWRlciIsImdldE1vZGVsQm9keSIsImdldE1vZGVsRm9vdGVyIiwiT2JqZWN0IiwiZ2V0T3duUHJvcGVydHlOYW1lcyIsImZvckVhY2giLCJzZXRDb25maWciLCJzZXR0aW5nc09iaiIsIm9iamVjdHNBcnJheSIsInVwZGF0ZUNvbmZpZyIsIm9iamVjdCIsInB1c2giLCJzb3J0IiwiYSIsImIiLCJpc01vYmlsZSIsImZpbHRlciIsInN0ZXAiLCJydW4iLCJnb1RvU3RlcCIsImdldEVsZW1lbnRCeUlkIiwic2V0QXR0cmlidXRlIiwiaW5zZXJ0RWxlbWVudEFmdGVyIiwibmV3TW9kYWwiLCJtb2RhbEVsZW1lbnRNb2RlbCIsImNhbGwiLCJnZXRFbGVtZW50c0J5Q2xhc3NOYW1lIiwiZWwiLCJjbGFzc0xpc3QiLCJyZW1vdmUiLCJzaG93SGlkZGVuRWxlbWVudCIsImVsZW1lbnQiLCJhZGQiLCJtb3ZlTW9kYWwiLCJzY3JvbGxNb2RhbCIsInJlbW92ZUF0dHJpYnV0ZSIsImJnRWZmZWN0IiwicHJldmlvdXNNb2RhbCIsInNldE1vZGFsT3B0aW9uIiwiZ2V0Q3VycmVuU3RlcFZhbCIsInVwZGF0ZU1vZGFsIiwib3Blbk1vZGFsIiwid2luZG93V2lkdGgiLCJkb2N1bWVudEVsZW1lbnQiLCJjbGllbnRXaWR0aCIsIndpbmRvd0hlaWdodCIsIk1hdGgiLCJtYXgiLCJib2R5Iiwic2Nyb2xsSGVpZ2h0Iiwib2Zmc2V0SGVpZ2h0IiwiY2xpZW50SGVpZ2h0IiwibW9kYWxFbGVtZW50IiwibW9kYWxIZWlnaHQiLCJtb2RhbFdpZHRoIiwib2Zmc2V0V2lkdGgiLCJuZXdUb3AiLCJuZXdMZWZ0IiwibmV3V2lkdGgiLCJ0YXJnZXRQb3NpdGlvbiIsImdldE9mZnNldCIsInRhcmdldEhlaWdodCIsInRhcmdldFdpZHRoIiwibGVmdCIsInRvcCIsImFycm93Q2xhc3MiLCJ3aW5kb3ciLCJpbm5lckhlaWdodCIsInN0eWxlIiwiY3NzVGV4dCIsInNjcm9sbEVsZW1lbnQiLCJzY3JvbGxJbnRvVmlldyIsImJlaGF2aW9yIiwiYmxvY2siLCJpbmxpbmUiLCJzY3JvbGxUbyIsInMiLCJmbiIsInNwbGl0IiwiZSIsImFkZEV2ZW50TGlzdGVuZXIiLCJzZWxlY3RvciIsInR5cGUiLCJjbGFzc25hbWUiLCJwYXJlbnROb2RlIiwiY2xhc3NOYW1lIiwiaW5kZXhPZiIsImhhc1NvbWVQYXJlbnRUaGVDbGFzcyIsImdldENvbXB1dGVkU3R5bGUiLCJkaXNwbGF5IiwiX3giLCJfeSIsImlzTmFOIiwib2Zmc2V0TGVmdCIsIm9mZnNldFRvcCIsImNsaWVudExlZnQiLCJjbGllbnRUb3AiLCJzY3JvbGxMZWZ0Iiwic2Nyb2xsVG9wIiwib2Zmc2V0UGFyZW50IiwiZXZlbnQiLCJxdWVyeSIsImlkIiwicmVwbGFjZSIsIndoaWNoRWxlbWVudCIsInRhZ05hbWUiLCJjb250ZW50IiwiY3JlYXRlRWxlbWVudCIsImlubmVySFRNTCIsImluc2VydEJlZm9yZSIsIm5leHRTaWJsaW5nIiwiY2hlY2siLCJ0ZXN0Iiwic3Vic3RyIiwibmF2aWdhdG9yIiwidXNlckFnZW50IiwidmVuZG9yIiwib3BlcmEiLCJsaXN0ZW5lciIsInByZXZpb3VzRXZlbnRDaGVja2VyIiwibmV4dEV2ZW50Q2hlY2tlciIsImFkZEV2ZW50TGlzdGVuZXJzIiwiY2xlYXJUaW1lb3V0Iiwic3RvcFByb3BhZ2F0aW9uIiwidGFyZ2V0UXVlcnlWYWxpZGF0b3IiLCJjb25jZXJuZWRTdGVwIiwiZmluZEluZGV4Iiwic2V0VGltZW91dCIs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VUFBVSxDQUFDLFlBQU07QUFDaEM7QUFDQSxjQUFHLEtBQUksQ0FBQ0gsb0JBQUwsQ0FBMEJ4QixLQUExQixFQUFpQyxLQUFJLENBQUNwSCxjQUFMLENBQW9CLGlCQUFwQixDQUFqQyxDQUFILEVBQTZFO0FBQ3pFO0FBQ0EsZ0JBQUksQ0FBQyxLQUFJLENBQUNLLFVBQUwsRUFBTCxFQUF5QixLQUFJLENBQUM0SSxRQUFMO0FBQzVCO0FBQ0osU0FONEIsRUFNMUIsS0FBSSxDQUFDakosY0FBTCxDQUFvQixNQUFwQixDQU4wQixDQUE3QixDQXhDdUUsQ0FnRHZFOztBQUNBLFlBQUcsS0FBSSxDQUFDNEksb0JBQUwsQ0FBMEJ4QixLQUExQixFQUFpQyxLQUFJLENBQUNwSCxjQUFMLENBQW9CLGdCQUFwQixDQUFqQyxDQUFILEVBQTRFO0FBQ3hFLGNBQUksS0FBSSxDQUFDSyxVQUFMLEVBQUosRUFBd0IsS0FBSSxDQUFDUyxVQUFMO0FBQzNCO0FBQ0osT0FwREQsRUFMTyxDQTJEUDs7QUFDQSxVQUFHLEtBQUtkLGNBQUwsQ0FBb0IsWUFBcEIsQ0FBSCxFQUFzQztBQUVsQztBQUNBa0YsUUFBQUEsTUFBTSxDQUFDYyxnQkFBUCxDQUF3QixRQUF4QixFQUFrQyxZQUFNO0FBQ3BDO0FBQ0EsY0FBRyxDQUFDLEtBQUksQ0FBQ2pFLFFBQUwsRUFBRCxJQUFvQixLQUFJLENBQUN2RixTQUE1QixFQUF1QyxLQUFJLENBQUNxRSxVQUFMO0FBQzFDLFNBSEQ7QUFJSDtBQUNKIiwiZmlsZSI6Im1lbnRvci5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxyXG4gKiBNZW50b3JKUyB2MS4wXHJcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS9uZG5jaS9tZW50b3Jqc1xyXG4gKlxyXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTkgTkROQ0kgLSB3d3cubmRuY2kuY29tICggQWhsaW1hbiBIVVNFWU5PViApXHJcbiAqL1xyXG5jbGFzcyBNZW50b3JKUyB7XHJcblxyXG4gICAgY29uc3RydWN0b3IoZ2xvYmFsQ29uZmlnKSB7XHJcblxyXG4gICAgICAgIC8vIG90aGVyIHBhcmFtZXRlcnNcclxuICAgICAgICB0aGlzLl9nbG9iYWxDb25maWcgPSBnbG9iYWxDb25maWc7XHJcbiAgICAgICAgdGhpcy5faXNPcGVuZWQgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuX3N0ZXBzQXJyYXkgPSBbXTtcclxuICAgICAgICB0aGlzLl9tb2RhbE9wdGlvbnMgPSB7fTtcclxuXHJcbiAgICAgICAgLy8gc2V0dGluZ3MgZm9yIGFsbCBzY3JpcHRcclxuICAgICAgICB0aGlzLl9zZXR0aW5ncyA9IHtcclxuICAgICAgICAgICAgLy8gYXV0byBzdGFydCBzY3JpcHQgb3Igbm90LCBwYXJhbXM6IHRydWUgfCBmYWxzZVxyXG4gICAgICAgICAgICBhdXRvUnVuOiB0cnVlLFxyXG4gICAgICAgICAgICAvLyBhbnkgZXhpc3Rpbmcgc3RlcCwgZm9yIHRoZSBmaXJzdCBcIjBcIlxyXG4gICAgICAgICAgICBzdGVwRnJvbTogMCxcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBjb25maWcgZm9yIGFsbCBtb2RhbHNcclxuICAgICAgICB0aGlzLl9jb25maWcgPSB7XHJcbiAgICAgICAgICAgICAgICAvLyBwYXJhbXM6IGRhcmsgfCBsaWdodFxyXG4gICAgICAgICAgICAgICAgdGhlbWU6IFwibGlnaHRcIixcclxuICAgICAgICAgICAgICAgIC8vIHBhcmFtczogem9vbSB8IHB1bHNlIHwgYm91bmNlIHwgdG9MZWZ0IHwgdG9SaWdodCB8IHRvVG9wIHwgdG9Cb3R0b21cclxuICAgICAgICAgICAgICAgIGFuaW1hdGlvbjogbnVsbCxcclxuICAgICAgICAgICAgICAgIC8vIGFyZWEgd2l0aCBiYWNrZ3JvdW5kIGVmZmVjdFxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEFyZWE6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJib2R5XCIpLFxyXG4gICAgICAgICAgICAgICAgLy8gZWZmZWN0IGZvciBiYWNrZ3JvdW5kYXJlYSB3aGVuIG1vZGFsIHJ1blxyXG4gICAgICAgICAgICAgICAgYmFja2dyb3VuZEVmZmVjdENsYXNzOiBcIm1lbnRvci1ibHVyXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBlZmZlY3Qgb24gZGVmaW5lZCB0YXJnZXQgd2hlbiBtb2RhbCBydW5cclxuICAgICAgICAgICAgICAgIHRhcmdldE5vRWZmZWN0Q2xhc3M6IFwibWVudG9yLW5vYmx1clwiLFxyXG4gICAgICAgICAgICAgICAgLy8gY2xhc3Mgd2lsbCBhZGQgdG8gaGlkZGVuIHRhcmdldFxyXG4gICAgICAgICAgICAgICAgdGFyZ2V0VG9nZ2xlQ2xhc3M6IFwibWVudG9yLXRvZ2dsZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gc2Nyb2xsIHRvIGVsZW1lbnQvdGFyZ2V0IHdoZW4gbW9kYWwgb3BlbmVkLCBwYXJhbXM6IHRydWUgfCBmYWxzZVxyXG4gICAgICAgICAgICAgICAgYXV0b1Njcm9sbDogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vIHBhcmFtczogc2Nyb2xsSW50b1ZpZXcgfCBzY3JvbGxUb1xyXG4gICAgICAgICAgICAgICAgc2Nyb2xsTWV0aG9kOiBcInNjcm9sbFRvXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBwYXJhbXM6IHRhcmdldCB8IG1vZGFsXHJcbiAgICAgICAgICAgICAgICBzY3JvbGxPbjogXCJtb2RhbFwiLFxyXG4gICAgICAgICAgICAgICAgLy8gcGFyYW1zOiBhdXRvIHwgc21vb3RoLCBiZWhhdmlvciBpcyBub3Qgc3VwcG9ydGVkIGJ5IFNhZmFyaVxyXG4gICAgICAgICAgICAgICAgc2Nyb2xsQmVoYXZpb3I6IFwic21vb3RoXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBuZWVkcyBcInNjcm9sbEludG9WaWV3XCIsIHBhcmFtczogc3RhcnQgfCBjZW50ZXIgfCBlbmQgfCBuZWFyZXN0XHJcbiAgICAgICAgICAgICAgICBzY3JvbGxCbG9jazogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIHNjcm9sbElubGluZTogXCJjZW50ZXJcIixcclxuICAgICAgICAgICAgICAgIC8vIGN1c3RvbSBjbGFzcyBuYW1lc1xyXG4gICAgICAgICAgICAgICAgbW9kYWxEaXZDbGFzczogXCJtZW50b3ItbW9kYWxcIixcclxuICAgICAgICAgICAgICAgIG1vZGFsRGl2SGVhZGVyQ2xhc3M6IFwibWVudG9yLW1vZGFsLWhlYWRlclwiLFxyXG4gICAgICAgICAgICAgICAgbW9kYWxEaXZIZWFkZXJDbG9zZUNsYXNzOiBcImNsb3NlXCIsXHJcbiAgICAgICAgICAgICAgICBtb2RhbERpdkJvZHlDbGFzczogXCJtZW50b3ItbW9kYWwtYm9keVwiLFxyXG4gICAgICAgICAgICAgICAgbW9kYWxEaXZGb290ZXJDbGFzczogXCJtZW50b3ItbW9kYWwtZm9vdGVyXCIsXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c0J1dHRvbkNsYXNzOiBcIm1lbnRvci1idG4gbWVudG9yLW1vZGFsLXByZXZpb3VzXCIsXHJcbiAgICAgICAgICAgICAgICBuZXh0QnV0dG9uQ2xhc3M6IFwibWVudG9yLWJ0biBtZW50b3ItbW9kYWwtbmV4dFwiLFxyXG4gICAgICAgICAgICAgICAgZW5kQnV0dG9uQ2xhc3M6IFwibWVudG9yLWJ0biBtZW50b3ItbW9kYWwtZW5kXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBvcGVuIGJ1dHRvbiBmb3Igb3BlbiBjb25jZXJuZWQgbW9kYWwsIG11c3QgYmUgdW5pcXVlIHBlciBzdGVwXHJcbiAgICAgICAgICAgICAgICAvLyB5b3UgY2FuIG5vdCBzZXQgdGhpcyBvcHRpb24gb24gYWxsIG1vZGFscywgZXg6IFwiI3N0ZXAxXCJcclxuICAgICAgICAgICAgICAgIG9wZW5CdXR0b25JZDogbnVsbCxcclxuICAgICAgICAgICAgICAgIC8vIGN1c3RvbSBjbG9zZSBidXR0b24gaWQgd2l0aG91dCBcIiNcIiwgY2xvc2Ugb25seSBjdXJyZW50IHN0ZXAsIGV4OiBcImN1c3RvbUNsb3NlXCJcclxuICAgICAgICAgICAgICAgIGNsb3NlQnV0dG9uSWQ6IFwibW9kYWxDbG9zZVwiLFxyXG4gICAgICAgICAgICAgICAgLy8gY3VzdG9tIHRleHRzLCBhbGxvd3MgSFRNTCB0YWdzXHJcbiAgICAgICAgICAgICAgICBwcmV2aW91c0J1dHRvblRleHQ6IFwiJmxhcXVvOyBCYWNrXCIsXHJcbiAgICAgICAgICAgICAgICBuZXh0QnV0dG9uVGV4dDogXCJOZXh0ICZyYXF1bztcIixcclxuICAgICAgICAgICAgICAgIGVuZEJ1dHRvblRleHQ6IFwiVGhhbmtzXCIsXHJcbiAgICAgICAgICAgICAgICAvLyBvcmRlciBvZiBtb2RhbCwgZXg6IDVcclxuICAgICAgICAgICAgICAgIG9yZGVyOiBudWxsLFxyXG4gICAgICAgICAgICAgICAgLy8gdGl0bGUgb2YgbW9kYWwsIGFsbG93IEhUTUwgdGFnc1xyXG4gICAgICAgICAgICAgICAgdGl0bGU6IG51bGwsXHJcbiAgICAgICAgICAgICAgICAvLyBjb250ZW50IG9mIG1lc3NhZ2UsIGFsbG93IEhUTUwgdGFnc1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZTogbnVsbCxcclxuICAgICAgICAgICAgICAgIC8vIHRhcmdldCB3aG8gd2lsbCBiZSBub3QgYWZmZWN0ZWQgYnkgYmFja2dyb3VuZCBlZmZlY3RcclxuICAgICAgICAgICAgICAgIHRhcmdldDogbnVsbCxcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgY2xvc2UgYnV0dG9uIG9uIGhlYWRlclxyXG4gICAgICAgICAgICAgICAgY2xvc2VCdXR0b246IGZhbHNlLFxyXG4gICAgICAgICAgICAgICAgLy8gc2hvdyBoZWFkZXJcclxuICAgICAgICAgICAgICAgIHNob3dIZWFkZXI6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyBzaG93IGZvb3RlclxyXG4gICAgICAgICAgICAgICAgc2hvd0Zvb3RlcjogdHJ1ZSxcclxuICAgICAgICAgICAgICAgIC8vIHNob3cgYXJyb3dzXHJcbiAgICAgICAgICAgICAgICBzaG93QXJyb3c6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvLyBleGl0IG1vZGFsIG9uIG91dHNpZGUgY2xpY2tcclxuICAgICAgICAgICAgICAgIG91dHNpZGVDbGljazogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBzaG93IHRhcmdldCBpZiBpdHMgaGlkZGVuIGFuZCBhZnRlciBoaWRlXHJcbiAgICAgICAgICAgICAgICB0YXJnZXRBdXRvU2hvdzogZmFsc2UsXHJcbiAgICAgICAgICAgICAgICAvLyBzcGFjZSBiZXR3ZWVuIG1vZGFsIGFuZCB0YXJnZXQsIG9ubHkgbnVtYmVyLCBtYXggMTAgcmVjb21tZW5kZWRcclxuICAgICAgICAgICAgICAgIC8vIGlmIHlvdSBjdXN0b21pc2UgdGhlIGFycm93IHN0eWxlLCB5b3Ugc2hvdWxkIGFkZCBhcnJvdyB3aWR0aCB0b29cclxuICAgICAgICAgICAgICAgIG1hcmdpbjogMTAsXHJcbiAgICAgICAgICAgICAgICAvLyBob3Jpem9udGFsIGFsaWduIG9mIG1vZGFsLCBwYXJhbXM6IGxlZnQgfCBjZW50ZXIgfCByaWdodCB8IGF1dG9cclxuICAgICAgICAgICAgICAgIGhvcml6b250YWw6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gdmVydGljYWwgYWxpZ24gb2YgbW9kYWwsIHBhcmFtczogdG9wIHwgY2VudGVyIHwgYm90dG9tIHwgYXV0b1xyXG4gICAgICAgICAgICAgICAgdmVydGljYWw6IFwiYXV0b1wiLFxyXG4gICAgICAgICAgICAgICAgLy8gaWYgdHJ1ZSwgc2NyaXB0IG1vZGFsIGJlIHJlc3BvbnNpdmVcclxuICAgICAgICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXHJcbiAgICAgICAgICAgICAgICAvKiB3YWl0IHRpbWUgKCBmb3IgYWN0dWFsIG1vZGFsICkgd2hlbiB1c2VyIGNsaWNrIHRvIG5leHQgb3IgcHJldmlvdXMgYnV0dG9uXHJcbiAgICAgICAgICAgICAgICAgICBkZWZhdWx0IGlzIDAgZm9yIG1vZGFsIHNwZWVkLCBidXQgaWYgcHJldmlvdXMgb3IgbmV4dCBtb2RhbFxyXG4gICAgICAgICAgICAgICAgICAgaXMgbmVhciBvZiBhY3R1YWwgbW9kYWwsIHlvdSBjYW4gZ2V0IGEgcHJvYmxlbSB3aXRoIGNsaWNrICh0b3VjaHN0YXJ0KVxyXG4gICAgICAgICAgICAgICAgICAgb24gbW9iaWxlIGRldmljZXMsIGlmIHlvdSBhZGRlZCBcInRvdWNoc3RhcnRcIiBldmVudCBhbmQgaGF2ZSB0aGlzIHByb2JsZW1cclxuICAgICAgICAgICAgICAgICAgIG9uIG1vYmlsZSwgeW91IGNhbiBjaGFuZ2UgaXQsIHRoZSByZWNvbW1lbmRlZCB2YWx1ZSBpcyBcIjMwMFwiLFxyXG4gICAgICAgICAgICAgICAgICAgbW9kYWwgd2lsbCBiZSBmYXN0ZXIgb24gbW9iaWxlIGFuZCBsYXJnZSBzY3JlZW5cclxuICAgICAgICAgICAgICAgICAgIGFuZCB5b3Ugd2lsbCBub3QgaGF2ZSBhIHByb2JsZW0gd2l0aCBidXR0b24gY2xpY2tzICh0b3VjaHN0YXJ0KSAqL1xyXG4gICAgICAgICAgICAgICAgd2FpdDogMCxcclxuICAgICAgICAgICAgICAgIC8vIHlvdSBjYW4gZGVmaW5lIGV2ZW50cyBmb3IgbGlzdGVuZXIgZnVuY3Rpb25cclxuICAgICAgICAgICAgICAgIC8vIHlvdSBjYW4gYWRkIG11bHRpcGxlIGV2ZW50cyB3aXRoIHNwYWNlIFwiIFwiIGJldHdlZW4gZXZlbnRzXHJcbiAgICAgICAgICAgICAgICAvLyBmb3IgZXhlbXBsZSA6IFwiY2xpY2sgdG91Y2hzdGFydCBtb3VzZW92ZXJcIiBldGMuXHJcbiAgICAgICAgICAgICAgICBldmVudHM6IFwiY2xpY2tcIixcclxuICAgICAgICAgICAgICAgIC8vIHlvdSBjYW4gZGlzYWJsZSB0aGUgbW9kYWwgb24gbW9iaWxlXHJcbiAgICAgICAgICAgICAgICBtb2JpbGVTdXBwb3J0OiB0cnVlLFxyXG4gICAgICAgICAgICAgICAgLyogZG9udCBjaGFuZ2UgdGhpcyB2YWx1ZXMsIHNjcmlwdCBuZWVkIHRoaXMgYW5kIGF1dG8gY2hhbmdlIHRoZW0gdmFsdWVzICovXHJcbiAgICAgICAgICAgICAgICBwb3NpdGlvblRvcDogbnVsbFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgLyogKioqKioqKioqKioqKioqKioqKiogZ2V0dGVycyBhbmQgc2V0dGVycyBmb3IgdmFyaWFibGVzICovXHJcbiAgICBnZXRDb25maWcoa2V5KSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2NvbmZpZ1trZXldO1xyXG4gICAgfVxyXG4gICAgc2V0Q29uZmlnKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9jb25maWdba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0U2V0dGluZyhrZXkpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5fc2V0dGluZ3Nba2V5XTtcclxuICAgIH1cclxuICAgIHNldFNldHRpbmcoa2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIHRoaXMuX3NldHRpbmdzW2tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldE1vZGFsT3B0aW9uKGtleSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9tb2RhbE9wdGlvbnNba2V5XTtcclxuICAgIH1cclxuICAgIHNldE1vZGFsT3B0aW9uKGtleSwgdmFsdWUpIHtcclxuICAgICAgICB0aGlzLl9tb2RhbE9wdGlvbnNba2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0Q3VycmVudFN0ZXAoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U2V0dGluZygnc3RlcEZyb20nKTtcclxuICAgIH1cclxuICAgIHNldEN1cnJlbnRTdGVwKHZhbHVlKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTZXR0aW5nKCdzdGVwRnJvbScsIHZhbHVlKTtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKiBnZXR0ZXJzIGZvciBtb2RlbHMgKi9cclxuICAgIGdldE1vZGVsSGVhZGVyKCkge1xyXG4gICAgICAgIHJldHVybiBgPGRpdiBjbGFzcz1cIiR7dGhpcy5nZXRNb2RhbE9wdGlvbignbW9kYWxEaXZIZWFkZXJDbGFzcycpfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICR7dGhpcy5nZXRNb2RlbFRpdGxlKCl9XHJcbiAgICAgICAgICAgICAgICAgICAgJHt0aGlzLmdldE1vZGFsT3B0aW9uKCdjbG9zZUJ1dHRvbicpID8gdGhpcy5nZXRNb2RlbEhlYWRlckNsb3NlKCkgOiBcIlwifVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuICAgIGdldE1vZGVsSGVhZGVyQ2xvc2UoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8c3BhbiBjbGFzcz1cIiR7dGhpcy5nZXRNb2RhbE9wdGlvbignbW9kYWxEaXZIZWFkZXJDbG9zZUNsYXNzJyl9XCIgaWQ9XCIke3RoaXMuZ2V0TW9kYWxPcHRpb24oJ2Nsb3NlQnV0dG9uSWQnKX1cIj48L3NwYW4+YDtcclxuICAgIH1cclxuICAgIGdldE1vZGVsVGl0bGUoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8c3Bhbj4ke3RoaXMuZ2V0TW9kYWxPcHRpb24oJ3RpdGxlJyl9PC9zcGFuPmA7XHJcbiAgICB9XHJcbiAgICBnZXRNb2RlbEJvZHkoKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8ZGl2IGNsYXNzPVwiJHt0aGlzLmdldE1vZGFsT3B0aW9uKCdtb2RhbERpdkJvZHlDbGFzcycpfVwiPiR7dGhpcy5nZXRNb2RhbE9wdGlvbignbWVzc2FnZScpfTwvZGl2PmA7XHJcbiAgICB9XHJcbiAgICBnZXRNb2RlbFByZXZpb3VzQnV0dG9uKCkge1xyXG4gICAgICAgIHJldHVybiBgPGJ1dHRvbiBjbGFzcz1cIiR7dGhpcy5nZXRNb2RhbE9wdGlvbigncHJldmlvdXNCdXR0b25DbGFzcycpfVwiPiR7dGhpcy5nZXRNb2RhbE9wdGlvbigncHJldmlvdXNCdXR0b25UZXh0Jyl9PC9idXR0b24+YDtcclxuICAgIH1cclxuICAgIGdldE1vZGVsTmV4dEJ1dHRvbigpIHtcclxuICAgICAgICByZXR1cm4gYDxidXR0b24gY2xhc3M9XCIke3RoaXMuZ2V0TW9kYWxPcHRpb24oJ25leHRCdXR0b25DbGFzcycpfVwiPiR7dGhpcy5nZXRNb2RhbE9wdGlvbignbmV4dEJ1dHRvblRleHQnKX08L2J1dHRvbj5gO1xyXG4gICAgfVxyXG4gICAgZ2V0TW9kZWxFbmRCdXR0b24oKSB7XHJcbiAgICAgICAgcmV0dXJuIGA8YnV0dG9uIGNsYXNzPVwiJHt0aGlzLmdldE1vZGFsT3B0aW9uKCdlbmRCdXR0b25DbGFzcycpfVwiPiR7dGhpcy5nZXRNb2RhbE9wdGlvbignZW5kQnV0dG9uVGV4dCcpfTwvYnV0dG9uPmA7XHJcbiAgICB9XHJcbiAgICBnZXRNb2RlbEZvb3RlcigpIHtcclxuICAgICAgICByZXR1cm4gYDxkaXYgY2xhc3M9XCIke3RoaXMuZ2V0TW9kYWxPcHRpb24oJ21vZGFsRGl2Rm9vdGVyQ2xhc3MnKX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAkeyF0aGlzLmlzRmlyc3RTdGVwKCkgPyB0aGlzLmdldE1vZGVsUHJldmlvdXNCdXR0b24oKSA6IFwiXCJ9XHJcbiAgICAgICAgICAgICAgICAgICAgJHshdGhpcy5pc0xhc3RTdGVwKCkgPyB0aGlzLmdldE1vZGVsTmV4dEJ1dHRvbigpIDogdGhpcy5nZXRNb2RlbEVuZEJ1dHRvbigpfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+YDtcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKiBvdGhlciBnZXR0ZXJzICovXHJcbiAgICBnZXRDdXJyZW5TdGVwVmFsKGtleSkge1xyXG4gICAgICAgIGxldCB2YWx1ZSA9IHRoaXMuX3N0ZXBzQXJyYXlbdGhpcy5nZXRDdXJyZW50U3RlcCgpXVtrZXldO1xyXG4gICAgICAgIC8vIGlmIGNvbmZpZyBpcyBub3QgZGVmaW5lZCBieSB1c2VyXHJcbiAgICAgICAgLy8gc2V0IGl0IHRvIG1vZGFsIGNvbmZpZyB2YWx1ZVxyXG4gICAgICAgIGlmKHZhbHVlID09PSB1bmRlZmluZWQpIHZhbHVlID0gdGhpcy5nZXRDb25maWcoa2V5KTtcclxuICAgICAgICByZXR1cm4gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gdXNlIGZvciBjaGFuZ2UgbW9kYWwgaW5kZXggb24gZGVjbGFyZWQgYXJyYXlcclxuICAgIGdvVG9TdGVwKGluZGV4KSB7XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgc3RlcCBleGlzdHNcclxuICAgICAgICBpZih0aGlzLl9zdGVwc0FycmF5W2luZGV4XSkge1xyXG4gICAgICAgICAgICAvLyBwYXNzIHRvIG5leHQgc3RlcFxyXG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRTdGVwKGluZGV4KTtcclxuICAgICAgICAgICAgLy8gZ28gdG8gbmV4dCBtb2RhbCB3aXRoIG5ldyBpbmZvcm1hdGlvbnNcclxuICAgICAgICAgICAgdGhpcy5yZXNldE1vZGFsKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gaWYgbm90IGNsb3NlIHRoZSBsYXN0IG1vZGFsXHJcbiAgICAgICAgICAgIHRoaXMuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBjaGVjayBpZiBzdGVwIGlzIHRoZSBsYXN0IG9mIGFycmF5XHJcbiAgICBpc0ZpcnN0U3RlcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50U3RlcCgpID09IDA7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gY2hlY2sgaWYgc3RlcCBpcyB0aGUgbGFzdCBvZiBhcnJheVxyXG4gICAgaXNMYXN0U3RlcCgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRDdXJyZW50U3RlcCgpID09ICh0aGlzLl9zdGVwc0FycmF5Lmxlbmd0aCAtIDEpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIG1ha2UgYSBtb2RhbCB0ZW1wbGF0ZVxyXG4gICAgbW9kYWxFbGVtZW50TW9kZWwoKSB7XHJcbiAgICAgICAgcmV0dXJuIGAke3RoaXMuZ2V0TW9kYWxPcHRpb24oJ3Nob3dIZWFkZXInKSAmJiB0aGlzLmdldE1vZGFsT3B0aW9uKCd0aXRsZScpID8gdGhpcy5nZXRNb2RlbEhlYWRlcigpIDogXCJcIn1cclxuICAgICAgICAgICAgICAgICR7dGhpcy5nZXRNb2RlbEJvZHkoKX1cclxuICAgICAgICAgICAgICAgICR7dGhpcy5nZXRNb2RhbE9wdGlvbignc2hvd0Zvb3RlcicpID8gdGhpcy5nZXRNb2RlbEZvb3RlcigpIDogXCJcIn1gO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqIERlY2xhcmVkIHBhcmFtZXRlcnMgd2hlbiBwYWdlIGlzIGxvYWRlZCAqL1xyXG4gICAgdXBkYXRlQ29uZmlnKCkge1xyXG5cclxuICAgICAgICAvLyBnZXQgYWxsIGRlY2xhcmVkIGdsb2JhbCBjb25maWdzIGFuZCBjaGFuZ2UgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyh0aGlzLl9nbG9iYWxDb25maWcpLmZvckVhY2goZnVuY3Rpb24oa2V5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0Q29uZmlnKGtleSwgdGhpcy5fZ2xvYmFsQ29uZmlnW2tleV0pOyAgICAgICAgICAgIFxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICByZXR1cm4gdGhpcztcclxuICAgIH1cclxuICAgIC8vIGFsbCBzZXR0aW5nc1xyXG4gICAgc2V0dGluZ3Moc2V0dGluZ3NPYmopIHtcclxuICAgICAgICAvLyBnZXQgYWxsIGRlY2xhcmVkIHNldHRpbmdzIGFuZCBjaGFuZ2UgZGVmYXVsdCB2YWx1ZXNcclxuICAgICAgICBPYmplY3QuZ2V0T3duUHJvcGVydHlOYW1lcyhzZXR0aW5nc09iaikuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRTZXR0aW5nKGtleSwgc2V0dGluZ3NPYmpba2V5XSk7ICAgICAgICAgICAgXHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgXHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcbiAgICAvLyBhbGwgZGVjbGFyZWQgc3RlcHNcclxuICAgIHN0ZXBzKG9iamVjdHNBcnJheSkge1xyXG5cclxuICAgICAgICAvLyB1cGRhdGUgYWxsIGNvbmZpZyBkZWNsYXJlZCB2YWx1ZXNcclxuICAgICAgICBpZih0aGlzLl9nbG9iYWxDb25maWcpIHRoaXMudXBkYXRlQ29uZmlnKCk7XHJcblxyXG4gICAgICAgIC8vIGdldCBhbGwgb2JqZWN0cyBkZWNsYXJlZCBpbiB0aGlzIGZ1bmN0aW9uXHJcbiAgICAgICAgb2JqZWN0c0FycmF5LmZvckVhY2goZnVuY3Rpb24ob2JqZWN0KSB7XHJcblxyXG4gICAgICAgICAgICAvLyBhZGQgb2JqZWN0IHRvIGFycmF5IGZvciBzdG9ja2FnZVxyXG4gICAgICAgICAgICB0aGlzLl9zdGVwc0FycmF5LnB1c2gob2JqZWN0KTtcclxuXHJcbiAgICAgICAgICAgIC8vIHJlb3JkZXIgb2JqZWN0cyB3aXRoIG9yZGVyIHZhbHVlXHJcbiAgICAgICAgICAgIG9iamVjdHNBcnJheS5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBhLm9yZGVyIC0gYi5vcmRlcjtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBpZiBkZXZpY2UgaXMgbW9iaWxlIGFuZCBzdXBwb3J0IGlzIGZhbHNlLCByZW1vdmUgYWxsIG5vdCBzdXBwb3J0ZWRcclxuICAgICAgICAvLyBzdGVwcyBvbiBhcnJheVxyXG4gICAgICAgIGlmKHRoaXMuaXNNb2JpbGUoKSkge1xyXG4gICAgICAgICAgICB0aGlzLl9zdGVwc0FycmF5ID0gdGhpcy5fc3RlcHNBcnJheS5maWx0ZXIoZnVuY3Rpb24gKHN0ZXApIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdGVwLm1vYmlsZVN1cHBvcnQgIT0gZmFsc2VcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGlmIGF1dG8gb3BlbiBpcyB0cnVlIG9wZW4gbW9kYWwgXHJcbiAgICAgICAgaWYodGhpcy5nZXRTZXR0aW5nKCdhdXRvUnVuJykpIHRoaXMucnVuKCk7XHJcblxyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIGdvIHRvIHByZXZpb3VzIHN0ZXBcclxuICAgIGJhY2tTdGVwKCkge1xyXG4gICAgICAgIHRoaXMuZ29Ub1N0ZXAodGhpcy5nZXRDdXJyZW50U3RlcCgpIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXM7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gZ28gdG8gbmV4dCBzdGVwXHJcbiAgICBuZXh0U3RlcCgpIHtcclxuICAgICAgICB0aGlzLmdvVG9TdGVwKHRoaXMuZ2V0Q3VycmVudFN0ZXAoKSArIDEpO1xyXG4gICAgICAgIHJldHVybiB0aGlzO1xyXG4gICAgfVxyXG5cclxuICAgIC8qICoqKioqKioqKioqKioqKioqKioqIElubmVyIGZ1bmN0aW9ucyAqL1xyXG5cclxuICAgIG9wZW5Nb2RhbCgpIHtcclxuXHJcbiAgICAgICAgLy8gZGlzYWJsZSBvcGVuIGJ1dHRvblxyXG4gICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ29wZW5CdXR0b25JZCcpKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ29wZW5CdXR0b25JZCcpKS5zZXRBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiLFwiZGlzYWJsZWRcIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhZGQgYmFja2dyb3VuZCBlZmZlY3QgdG8gRE9NXHJcbiAgICAgICAgdGhpcy5pbnNlcnRFbGVtZW50QWZ0ZXIodGhpcy5nZXRNb2RhbE9wdGlvbignYmFja2dyb3VuZEFyZWEnKSwgXCJkaXZcIiwgdGhpcy5nZXRNb2RhbE9wdGlvbignYmFja2dyb3VuZEVmZmVjdENsYXNzJykpO1xyXG4gICAgICAgIFxyXG4gICAgICAgIC8vIGNyZWF0ZSBtb2RhbCBkaXYgb24gYm9keVxyXG4gICAgICAgIGxldCBuZXdNb2RhbCA9IHRoaXMuZ2V0TW9kYWxPcHRpb24oJ21vZGFsRGl2Q2xhc3MnKTtcclxuICAgICAgICBpZih0aGlzLmdldE1vZGFsT3B0aW9uKCd0aGVtZScpKSBuZXdNb2RhbCArPSBcIiBcIiArIHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RoZW1lJyk7XHJcbiAgICAgICAgaWYodGhpcy5nZXRNb2RhbE9wdGlvbignYW5pbWF0aW9uJykpIG5ld01vZGFsICs9IFwiIFwiICsgdGhpcy5nZXRNb2RhbE9wdGlvbignYW5pbWF0aW9uJyk7XHJcbiAgICAgICAgdGhpcy5pbnNlcnRFbGVtZW50QWZ0ZXIodGhpcy5nZXRNb2RhbE9wdGlvbignYmFja2dyb3VuZEFyZWEnKSwgXCJkaXZcIiwgbmV3TW9kYWwsIHRoaXMubW9kYWxFbGVtZW50TW9kZWwoKSk7XHJcblxyXG4gICAgICAgIC8vIGhpZGUgYWxsIHNob3dpbmcgZGl2c1xyXG4gICAgICAgIFtdLmZvckVhY2guY2FsbChkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldFRvZ2dsZUNsYXNzJykpLCBmdW5jdGlvbihlbCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldFRvZ2dsZUNsYXNzJykpO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG5cclxuICAgICAgICAvLyBpZiB0YXJnZXQgaXMgZGVmaW5lZFxyXG4gICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldCcpKSB7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBhdXRvIHNob3cgZW5hYmxlZCwgdG9nZ2xlIGhpZGRlbiBlbGVtZW50XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldEF1dG9TaG93JykpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd0hpZGRlbkVsZW1lbnQodGhpcy5lbGVtZW50KHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldCcpKSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGFkZCBzaG93IGNsYXNzIHRvIHRhcmdldFxyXG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQodGhpcy5nZXRNb2RhbE9wdGlvbigndGFyZ2V0JykpLmNsYXNzTGlzdC5hZGQodGhpcy5nZXRNb2RhbE9wdGlvbigndGFyZ2V0Tm9FZmZlY3RDbGFzcycpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIGRlZmluZSBtb2RhbCBwb3NpdGlvblxyXG4gICAgICAgIHRoaXMubW92ZU1vZGFsKCk7XHJcblxyXG4gICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ2F1dG9TY3JvbGwnKSkge1xyXG4gICAgICAgICAgICB0aGlzLnNjcm9sbE1vZGFsKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gc2V0IG9wZW4gc3RhdHVzIHRvIHRydWVcclxuICAgICAgICAgICAgdGhpcy5faXNPcGVuZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgICBcclxuICAgIGNsb3NlTW9kYWwoKSB7XHJcblxyXG4gICAgICAgIC8vIGVuYWJsZSBvcGVuIGJ1dHRvblxyXG4gICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ29wZW5CdXR0b25JZCcpKSB7XHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ29wZW5CdXR0b25JZCcpKS5yZW1vdmVBdHRyaWJ1dGUoXCJkaXNhYmxlZFwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHJlbW92ZSBkaXYgYmcgZWZmZWN0IG9uIGJhY2tncm91bmRcclxuICAgICAgICBsZXQgYmdFZmZlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ2JhY2tncm91bmRFZmZlY3RDbGFzcycpKVswXTtcclxuICAgICAgICBpZihiZ0VmZmVjdCkgYmdFZmZlY3QucmVtb3ZlKCk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRhcmdldCBpcyBkZWZpbmVkIHByZXZpb3VzbHksIHJlbW92ZSBzaG93IGNsYXNzXHJcbiAgICAgICAgaWYodGhpcy5nZXRNb2RhbE9wdGlvbigndGFyZ2V0JykpIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50KHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldCcpKS5jbGFzc0xpc3QucmVtb3ZlKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldE5vRWZmZWN0Q2xhc3MnKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyByZW1vdmUgY3JlYXRlZCBtb2RhbCBlbGVtZW50XHJcbiAgICAgICAgbGV0IHByZXZpb3VzTW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ21vZGFsRGl2Q2xhc3MnKSlbMF07XHJcbiAgICAgICAgaWYocHJldmlvdXNNb2RhbCkgcHJldmlvdXNNb2RhbC5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgLy8gc2V0IG9wZW4gc3RhdHVzIHRvIGZhbHNlXHJcbiAgICAgICAgdGhpcy5faXNPcGVuZWQgPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICAvLyB1cGRhdGUgYWxsIG1vZGFsIGluZm9ybWF0aW9uc1xyXG4gICAgdXBkYXRlTW9kYWwoKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGFsbCBpbmZvcm1hdGlvbnMgZm9yIG5ldyBtb2RhbFxyXG4gICAgICAgIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzKHRoaXMuX2NvbmZpZykuZm9yRWFjaChmdW5jdGlvbihrZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRNb2RhbE9wdGlvbihrZXksIHRoaXMuZ2V0Q3VycmVuU3RlcFZhbChrZXkpKTsgICAgICAgICAgICBcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBjbG9zZSBjdXJyZW50IG1vZGFsIGFuZCB1cGRhdGUgbW9kYWwgaW5mb3JtYXRpb25zLCBhZnRlciBvcGVuIG5ldyBtb2RhbFxyXG4gICAgcmVzZXRNb2RhbCgpIHtcclxuICAgICAgICAvLyBjbG9zZSBjdXJyZW50IG1vZGFsXHJcbiAgICAgICAgdGhpcy5jbG9zZU1vZGFsKCk7XHJcbiAgICAgICAgLy8gdXBkYXRlIG1vZGFsIGluZm9ybWF0aW9uc1xyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kYWwoKTtcclxuICAgICAgICAvLyBvcGVuIG5ldyBtb2RhbFxyXG4gICAgICAgIHRoaXMub3Blbk1vZGFsKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gbW92ZSBtb2RhbCB0byB0YXJnZXQgcG9zaXRpb24gaWYgaXQgd2FzIGRlY2xhcmVkXHJcbiAgICBtb3ZlTW9kYWwoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IHNjcmVlbiBzaXplXHJcbiAgICAgICAgbGV0IHdpbmRvd1dpZHRoID0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoO1xyXG4gICAgICAgIGxldCB3aW5kb3dIZWlnaHQgPSBNYXRoLm1heCggZG9jdW1lbnQuYm9keS5zY3JvbGxIZWlnaHQsIGRvY3VtZW50LmJvZHkub2Zmc2V0SGVpZ2h0LCBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsSGVpZ2h0LFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50Lm9mZnNldEhlaWdodCApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgLy8gZ2V0IG1vZGFsIGluZm9ybWF0aW9uc1xyXG4gICAgICAgIGxldCBtb2RhbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ21vZGFsRGl2Q2xhc3MnKSlbMF07XHJcbiAgICAgICAgbGV0IG1vZGFsSGVpZ2h0ID0gbW9kYWxFbGVtZW50Lm9mZnNldEhlaWdodDtcclxuICAgICAgICBsZXQgbW9kYWxXaWR0aCA9IG1vZGFsRWxlbWVudC5vZmZzZXRXaWR0aDtcclxuXHJcbiAgICAgICAgLy8gZ2V0IG5ldyBvZmZzZXRzIGZvciBwb3NpdGlvbiBvZiBtb2RhbFxyXG4gICAgICAgIGxldCBuZXdUb3AsIG5ld0xlZnQ7XHJcbiAgICAgICAgbGV0IG5ld1dpZHRoID0gbW9kYWxXaWR0aDtcclxuICAgICAgICBsZXQgbWFyZ2luID0gdGhpcy5nZXRNb2RhbE9wdGlvbignbWFyZ2luJyk7XHJcblxyXG4gICAgICAgIC8vIGlmIHRhcmdldCBpcyBkZWZpbmVkXHJcbiAgICAgICAgaWYodGhpcy5nZXRNb2RhbE9wdGlvbigndGFyZ2V0JykpIHtcclxuXHJcbiAgICAgICAgICAgIC8vIHRhcmdldCBpcyBzZXQgZnJvbSBjb25maWdcclxuICAgICAgICAgICAgbGV0IHRhcmdldCA9IHRoaXMuZWxlbWVudCh0aGlzLmdldE1vZGFsT3B0aW9uKCd0YXJnZXQnKSk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRQb3NpdGlvbiA9IHRoaXMuZ2V0T2Zmc2V0KHRhcmdldCk7XHJcbiAgICAgICAgICAgIGxldCB0YXJnZXRIZWlnaHQgPSB0YXJnZXQub2Zmc2V0SGVpZ2h0O1xyXG4gICAgICAgICAgICBsZXQgdGFyZ2V0V2lkdGggPSB0YXJnZXQub2Zmc2V0V2lkdGg7XHJcblxyXG4gICAgICAgICAgICAvLyBpZiB2ZXJ0aWNhbCBpcyBhdXRvLCBjaGFuZ2UgdmFsdWUgYXV0b21hdGljYWxseVxyXG4gICAgICAgICAgICBpZih0aGlzLmdldE1vZGFsT3B0aW9uKCdob3Jpem9udGFsJykgPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHNwYWNlIGJldHdlZW4gZWxlbWVudCBsZWZ0IGFuZCB3aW5kb3cgaXMgdG9vIHNob3J0XHJcbiAgICAgICAgICAgICAgICAvLyBtb3ZlIGVsZW1lbnQgdG8gcmlnaHRcclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldFBvc2l0aW9uLmxlZnQgPiBtb2RhbFdpZHRoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb2RhbE9wdGlvbignaG9yaXpvbnRhbCcsICdsZWZ0Jyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kYWxPcHRpb24oJ2hvcml6b250YWwnLCAncmlnaHQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIGlmIGhvcml6b250YWwgaXMgcmlnaHQgYW5kXHJcbiAgICAgICAgICAgICAgICAvLyBzY3JlZW4gd2lkdGggaXMgc21hbGxlciB0aGFuIHRvdGFsIG9mIGNhbGMgKCBhbmQgc21hbGwgc2NyZWVucylcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgZWxlbWVudCB0byBjZW50ZXIgaG9yaXpvbnRhbGx5XHJcbiAgICAgICAgICAgICAgICBpZihcclxuICAgICAgICAgICAgICAgICAgICAoXHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5nZXRNb2RhbE9wdGlvbignaG9yaXpvbnRhbCcpID09IFwicmlnaHRcIiAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh0YXJnZXRQb3NpdGlvbi5sZWZ0ICsgdGFyZ2V0V2lkdGggKyBtb2RhbFdpZHRoICsgbWFyZ2luKSA+IHdpbmRvd1dpZHRoXHJcbiAgICAgICAgICAgICAgICAgICAgKSB8fCB3aW5kb3dXaWR0aCA8IDY1MCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kYWxPcHRpb24oJ2hvcml6b250YWwnLCAnY2VudGVyJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGlmIHZlcnRpY2FsIGlzIGF1dG8sIGNoYW5nZSB2YWx1ZSBhdXRvbWF0aWNhbGx5XHJcbiAgICAgICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3ZlcnRpY2FsJykgPT0gXCJhdXRvXCIpIHtcclxuICAgICAgICAgICAgICAgIC8vIGlmIHNwYWNlIGJldHdlZW4gZWxlbWVudCB0b3AgYW5kIHdpbmRvdyBpcyB0b28gc2hvcnRcclxuICAgICAgICAgICAgICAgIC8vIG1vdmUgZWxlbWVudCB0byBib3R0b21cclxuICAgICAgICAgICAgICAgIGlmKHRhcmdldFBvc2l0aW9uLnRvcCA+IG1vZGFsSGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRNb2RhbE9wdGlvbigndmVydGljYWwnLCAndG9wJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TW9kYWxPcHRpb24oJ3ZlcnRpY2FsJywgJ2JvdHRvbScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIGlmIGhvcml6b250YWwgaXMgbm90IGNlbnRlciwgd2UgaGF2ZSBhIHNwYWNlIGxlZnQgb3IgcmlnaHQgZm9yIG1vZGFsXHJcbiAgICAgICAgICAgICAgICAvLyBpZiBzcGFjZSBiZXR3ZWVuIHRvcCBhbmQgYm90dG9tIG9mIHRhcmdldCBpcyBsYXJnZXIgdGhhbiBoYWxmIG9mIG1vZGFsXHJcbiAgICAgICAgICAgICAgICBpZihcclxuICAgICAgICAgICAgICAgICAgICAodGhpcy5nZXRNb2RhbE9wdGlvbignaG9yaXpvbnRhbCcpICE9IFwiY2VudGVyXCIpICYmXHJcbiAgICAgICAgICAgICAgICAgICAgKHRhcmdldFBvc2l0aW9uLnRvcCA+IChtb2RhbEhlaWdodCAvIDIpKSAmJlxyXG4gICAgICAgICAgICAgICAgICAgICh3aW5kb3dIZWlnaHQgLSB0YXJnZXRQb3NpdGlvbi50b3AgLSBtb2RhbEhlaWdodCkgPiAobW9kYWxIZWlnaHQgLyAyKVxyXG4gICAgICAgICAgICAgICAgKVxyXG4gICAgICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIHNvIG1vdmUgaXQgdG8gY2VudGVyIHZlcnRpY2FsbHlcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldE1vZGFsT3B0aW9uKCd2ZXJ0aWNhbCcsICdjZW50ZXInKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gY2hlY2sgbW9kYWwgaG9yaXpvbnRhbCBvcHRpb25cclxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldE1vZGFsT3B0aW9uKCdob3Jpem9udGFsJykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJsZWZ0XCI6XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGFjdHVhbCBtb2RhbCBoZWlnaHQgZm9yIGNhbGN1bGF0ZSBhbmQgc3Vic3RyYWN0IGl0IGZyb20gdGFyZ2V0IHRvcFxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xlZnQgPSB0YXJnZXRQb3NpdGlvbi5sZWZ0IC0gbW9kYWxXaWR0aCAtIG1hcmdpbjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImNlbnRlclwiOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ld0xlZnQgPSB0YXJnZXRQb3NpdGlvbi5sZWZ0ICsgKCh0YXJnZXRXaWR0aCAgLSBtb2RhbFdpZHRoKSAvIDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIFwicmlnaHRcIjpcclxuICAgICAgICAgICAgICAgICAgICBuZXdMZWZ0ID0gdGFyZ2V0UG9zaXRpb24ubGVmdCArIHRhcmdldFdpZHRoICsgbWFyZ2luO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIGNoZWNrIG1vZGFsIHZlcnRpY2FsIG9wdGlvblxyXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3ZlcnRpY2FsJykpIHtcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJ0b3BcIjpcclxuICAgICAgICAgICAgICAgICAgICAvLyBnZXQgYWN0dWFsIG1vZGFsIGhlaWdodCBmb3IgY2FsY3VsYXRlIGFuZCBzdWJzdHJhY3QgaXQgZnJvbSB0YXJnZXQgdG9wXHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VG9wID0gdGFyZ2V0UG9zaXRpb24udG9wIC0gbW9kYWxIZWlnaHQgLSBtYXJnaW47XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2UgXCJjZW50ZXJcIjpcclxuICAgICAgICAgICAgICAgICAgICBuZXdUb3AgPSB0YXJnZXRQb3NpdGlvbi50b3AgKyAoKHRhcmdldEhlaWdodCAgLSBtb2RhbEhlaWdodCkgLyAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSBcImJvdHRvbVwiOlxyXG4gICAgICAgICAgICAgICAgICAgIG5ld1RvcCA9IHRhcmdldFBvc2l0aW9uLnRvcCArIHRhcmdldEhlaWdodCArIG1hcmdpbjtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBpZiBhcnJvd3MgaXMgZW5hYmxlZFxyXG4gICAgICAgICAgICBpZih0aGlzLmdldE1vZGFsT3B0aW9uKCdzaG93QXJyb3cnKSkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBhcnJvd0NsYXNzO1xyXG5cclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ2hvcml6b250YWwnKSA9PSBcImNlbnRlclwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXJyb3dDbGFzcyA9IHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3ZlcnRpY2FsJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycm93Q2xhc3MgPSB0aGlzLmdldE1vZGFsT3B0aW9uKCdob3Jpem9udGFsJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gaWYgcG9zaXRpb24gaXMgZGlhZ29uYWxcclxuICAgICAgICAgICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3ZlcnRpY2FsJykgIT0gXCJjZW50ZXJcIiAmJiB0aGlzLmdldE1vZGFsT3B0aW9uKCdob3Jpem9udGFsJykgIT0gXCJjZW50ZXJcIikge1xyXG4gICAgICAgICAgICAgICAgICAgIGFycm93Q2xhc3MgPSB0aGlzLmdldE1vZGFsT3B0aW9uKCd2ZXJ0aWNhbCcpICsgXCItXCIgKyB0aGlzLmdldE1vZGFsT3B0aW9uKCdob3Jpem9udGFsJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBhZGQgbW9kYWwgcG9zaXRpb24gdG8gZGl2IGNsYXNzXHJcbiAgICAgICAgICAgICAgICBtb2RhbEVsZW1lbnQuY2xhc3NMaXN0LmFkZChhcnJvd0NsYXNzKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIGlmIHRhcmdldCBpcyBub3QgZGVmaW5lZCwgY2VudGVyIG1vZGFsIGVsZW1lbnRcclxuICAgICAgICAgICAgbmV3VG9wID0gKHdpbmRvdy5pbm5lckhlaWdodCAtIG1vZGFsSGVpZ2h0KSAvIDI7XHJcbiAgICAgICAgICAgIG5ld0xlZnQgPSAod2luZG93V2lkdGggLSBtb2RhbFdpZHRoKSAvIDI7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBpZiByZXNwb25zaXZlIGlzIGVuYWJsZWRcclxuICAgICAgICBpZih0aGlzLmdldE1vZGFsT3B0aW9uKCdyZXNwb25zaXZlJykgJiYgdGhpcy5nZXRNb2RhbE9wdGlvbignaG9yaXpvbnRhbCcpID09IFwiY2VudGVyXCIpIHtcclxuICAgICAgICAgICAgLy8gaWYgbW9kYWwgbGVmdCB2YWx1ZSBpcyBuZWdhdGl2ZSBvciBzbWFsbGVyIHRoYW4gbWFyZ2luICggbW9iaWxlIGRldmljZSBnZW5lcmFsbHkgKVxyXG4gICAgICAgICAgICAvLyBvciB0aGUgbGVmdCBtYXJnaW4gKyBtb2RhbCArIG1hcmdpbiB0b3RhbCBzaXplIGlzIGJpZ2dlciB0aGFuIHNjcmVlblxyXG4gICAgICAgICAgICAvLyBzZXQgaXQgdG8gY2VudGVyIG9mIHNjcmVlbiwgd2l0aCBkZWZpbmVkIG1hcmdpbiBhbmQgMTAwJSB3aWR0aFxyXG4gICAgICAgICAgICBpZihuZXdMZWZ0IDwgMCB8fCBuZXdMZWZ0IDwgbWFyZ2luIHx8IChuZXdMZWZ0ICsgbW9kYWxXaWR0aCArIG1hcmdpbikgPiB3aW5kb3dXaWR0aCkge1xyXG4gICAgICAgICAgICAgICAgLy8gNTAgaXMgdGhlIHJhbmRvbSB2YWx1ZSwgaXQncyBub3Qgc3BlY2lmaWMgb3IgY2FsY3VsYXRlZFxyXG4gICAgICAgICAgICAgICAgLy8gZm9yIGV4ZW1wbGUgOiBzY3JlZW4gOiA1MDBweCBhbmQgbW9kYWwgNDkwcHhcclxuICAgICAgICAgICAgICAgIC8vIDQ5MCAtIDUwLCBzbyBtb2RhbCB3aWR0aCA9IDQ1MHB4IGZvciBjZW50ZXJcclxuICAgICAgICAgICAgICAgIG5ld1dpZHRoID0gd2luZG93V2lkdGggLSAobWFyZ2luICogMikgLSA1MDtcclxuICAgICAgICAgICAgICAgIG5ld0xlZnQgPSAwO1xyXG4gICAgICAgICAgICAgICAgLy8gY3NzIGZvciBjZW50ZXIgdGhlIG1vZGFsXHJcbiAgICAgICAgICAgICAgICBtb2RhbEVsZW1lbnQuc3R5bGUuY3NzVGV4dCA9IGByaWdodDogMDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG1hcmdpbi1sZWZ0OiBhdXRvO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgbWFyZ2luLXJpZ2h0OiBhdXRvO2A7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIHNldCB0b3AgcG9zaXRpb24gb24gb3B0aW9ucywgZm9yIHNjcm9sbFRvKCkgZXRjXHJcbiAgICAgICAgdGhpcy5zZXRNb2RhbE9wdGlvbigncG9zaXRpb25Ub3AnLCBuZXdUb3ApO1xyXG5cclxuICAgICAgICAvLyBjaGFuZ2UgYWN0dWFsIG1vZGFsIHBvc2l0aW9uXHJcbiAgICAgICAgbW9kYWxFbGVtZW50LnN0eWxlLmNzc1RleHQgKz0gYHBvc2l0aW9uOiBhYnNvbHV0ZSAhaW1wb3J0YW50O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0b3A6ICR7bmV3VG9wfXB4O1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWZ0OiAke25ld0xlZnR9cHg7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHdpZHRoOiAke25ld1dpZHRofXB4O2A7XHJcbiAgICB9XHJcblxyXG4gICAgc2Nyb2xsTW9kYWwoKSB7XHJcbiAgICAgICAgXHJcbiAgICAgICAgLy8gY2hvb3NlIGVsZW1lbnQgdG8gc2Nyb2xsXHJcbiAgICAgICAgbGV0IHNjcm9sbEVsZW1lbnQ7XHJcbiAgICAgICAgaWYodGhpcy5nZXRNb2RhbE9wdGlvbignc2Nyb2xsT24nKSA9PSBcInRhcmdldFwiKSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEVsZW1lbnQgPSB0aGlzLmVsZW1lbnQodGhpcy5nZXRNb2RhbE9wdGlvbigndGFyZ2V0JykpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNjcm9sbEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ21vZGFsRGl2Q2xhc3MnKSlbMF07XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBhdXRvIHNjcm9sbFxyXG4gICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3Njcm9sbE1ldGhvZCcpID09IFwic2Nyb2xsSW50b1ZpZXdcIikge1xyXG4gICAgICAgICAgICBzY3JvbGxFbGVtZW50LnNjcm9sbEludG9WaWV3KHtcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiB0aGlzLmdldE1vZGFsT3B0aW9uKCdzY3JvbGxCZWhhdmlvcicpLFxyXG4gICAgICAgICAgICAgICAgYmxvY2s6IHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3Njcm9sbEJsb2NrJyksXHJcbiAgICAgICAgICAgICAgICBpbmxpbmU6IHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3Njcm9sbElubGluZScpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy5zY3JvbGxUbyh7XHJcbiAgICAgICAgICAgICAgICB0b3A6IHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3Bvc2l0aW9uVG9wJykgLSAoIHdpbmRvdy5pbm5lckhlaWdodCAvIDIgKSxcclxuICAgICAgICAgICAgICAgIGJlaGF2aW9yOiB0aGlzLmdldE1vZGFsT3B0aW9uKCdzY3JvbGxCZWhhdmlvcicpXHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKiBDdXN0b20gZnVuY3Rpb25zIGZvciBzaG9ydCBhbmQgbGlzaWJsZSBjb2RlICovXHJcblxyXG4gICAgLy8gY3VzdG9tIGV2ZW50IGxpc3RlbmVyIGZvciBtdWx0aXBsZSBldmVudHNcclxuICAgIGFkZEV2ZW50TGlzdGVuZXJzKGVsLCBzLCBmbikge1xyXG4gICAgICAgIHMuc3BsaXQoJyAnKS5mb3JFYWNoKGUgPT4gZWwuYWRkRXZlbnRMaXN0ZW5lcihlLCBmbiwgZmFsc2UpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBzaG9ydCBlbGVtZW50IHNlbGVjdG9yIHBlcnNvbmFsaXplZFxyXG4gICAgZWxlbWVudChzZWxlY3RvciwgdHlwZSA9IFwicXVlcnlcIikge1xyXG4gICAgICAgIGlmKHR5cGUgPT0gXCJxdWVyeVwiKSByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcik7XHJcbiAgICAgICAgaWYodHlwZSA9PSBcImNsYXNzXCIpIHJldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5Q2xhc3NOYW1lKHNlbGVjdG9yKVswXTtcclxuICAgICAgICBpZih0eXBlID09IFwiaWRcIikgcmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHNlbGVjdG9yKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyByZXR1cm5zIHRydWUgaWYgdGhlIGVsZW1lbnQgb3Igb25lIG9mIGl0cyBwYXJlbnRzIGhhcyB0aGUgY2xhc3MgY2xhc3NuYW1lXHJcbiAgICBoYXNTb21lUGFyZW50VGhlQ2xhc3MoZWxlbWVudCwgY2xhc3NuYW1lKSB7XHJcbiAgICAgICAgaWYoZWxlbWVudC5wYXJlbnROb2RlKSB7XHJcbiAgICAgICAgICAgIGlmIChlbGVtZW50LmNsYXNzTmFtZS5zcGxpdCgnICcpLmluZGV4T2YoY2xhc3NuYW1lKT49MCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgICAgIHJldHVybiBlbGVtZW50LnBhcmVudE5vZGUgJiYgdGhpcy5oYXNTb21lUGFyZW50VGhlQ2xhc3MoZWxlbWVudC5wYXJlbnROb2RlLCBjbGFzc25hbWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyB0aGlzIGZ1bmN0aW9uIHdpbGwgZGV0ZWNrIGlmIHRoZSBlbGVtZW50XHJcbiAgICBzaG93SGlkZGVuRWxlbWVudChlbGVtZW50KSB7XHJcblxyXG4gICAgICAgIC8vIGNoZWNrIGRpc3BsYXkgb2YgYWN0dWFsIGVsZW1lbnQgYW5kIGFkZCBjdXN0b20gc3R5bGUgY2xhc3MgZm9yIGRpc3BsYXkgYmxvY2sgZXRjXHJcbiAgICAgICAgaWYoZ2V0Q29tcHV0ZWRTdHlsZShlbGVtZW50LCBudWxsKS5kaXNwbGF5ID09IFwibm9uZVwiKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZCh0aGlzLmdldE1vZGFsT3B0aW9uKCd0YXJnZXRUb2dnbGVDbGFzcycpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gY2hlY2sgaWYgZWxlbWVudCBoYXZlIHBhcmVudCBhbmQgZWxlbWVudCBpcyBub3QgaGlkZGVuXHJcbiAgICAgICAgaWYoZWxlbWVudC5wYXJlbnROb2RlICYmIGdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCkuZGlzcGxheSAhPT0gXCJub25lXCIpIHtcclxuXHJcbiAgICAgICAgICAgIGlmIChnZXRDb21wdXRlZFN0eWxlKGVsZW1lbnQucGFyZW50Tm9kZSwgbnVsbCkuZGlzcGxheSA9PSBcIm5vbmVcIikge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGVsZW1lbnQucGFyZW50Tm9kZS5jbGFzc0xpc3QuYWRkKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3RhcmdldFRvZ2dsZUNsYXNzJykpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIGxvb3AgZnVuY3Rpb24gaWYgbm90aGluZyBmb3VuZGVkXHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnNob3dIaWRkZW5FbGVtZW50KGVsZW1lbnQucGFyZW50Tm9kZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIGdldCBlbGVtZW50IHBvc2l0aW9uXHJcbiAgICBnZXRPZmZzZXQoIGVsICkge1xyXG4gICAgICAgIHZhciBfeCA9IDA7XHJcbiAgICAgICAgdmFyIF95ID0gMDtcclxuICAgICAgICB3aGlsZSggZWwgJiYgIWlzTmFOKCBlbC5vZmZzZXRMZWZ0ICkgJiYgIWlzTmFOKCBlbC5vZmZzZXRUb3AgKSApIHtcclxuICAgICAgICAgICAgLy8gb24gbW9iaWxlIGRvbnQgY2FsYyBzY3JvbGxUb3AgYW5kIHNjcm9sbExlZnQsIGZvciBleGVtcGxlIFNhZmFyaVxyXG4gICAgICAgICAgICAvLyB3aWxsIHJldHVybiBhIGRpZmZlcmVudCBudW1iZXIgZXZlcnl0aW1lIHNvIHNjcmlwdFxyXG4gICAgICAgICAgICAvLyBjYW4gZ2V0IHRoZSByZWFsIHRvcCBkaXN0YW5jZVxyXG4gICAgICAgICAgICBpZih0aGlzLmlzTW9iaWxlKCkpIHtcclxuICAgICAgICAgICAgICAgIF94ICs9IChlbC5vZmZzZXRMZWZ0ICsgZWwuY2xpZW50TGVmdCk7XHJcbiAgICAgICAgICAgICAgICBfeSArPSAoZWwub2Zmc2V0VG9wICsgZWwuY2xpZW50VG9wKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIF94ICs9IChlbC5vZmZzZXRMZWZ0IC0gZWwuc2Nyb2xsTGVmdCArIGVsLmNsaWVudExlZnQpO1xyXG4gICAgICAgICAgICAgICAgX3kgKz0gKGVsLm9mZnNldFRvcCAtIGVsLnNjcm9sbFRvcCArIGVsLmNsaWVudFRvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgZWwgPSBlbC5vZmZzZXRQYXJlbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB7IHRvcDogX3ksIGxlZnQ6IF94IH07XHJcbiAgICB9XHJcbiAgICBcclxuICAgIC8vIENoZWNrIGlmIGV2ZW50IHRhcmdldCBpZCBvciBjbGFzcyBpcyBlcXVhbCB0byBxdWVyeVxyXG4gICAgdGFyZ2V0UXVlcnlWYWxpZGF0b3IoZXZlbnQsIHF1ZXJ5KSB7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgZXZlbnQudGFyZ2V0LmlkID09IHF1ZXJ5LnJlcGxhY2UoXCIjXCIsIFwiXCIpIHx8XHJcbiAgICAgICAgICAgIGV2ZW50LnRhcmdldC5jbGFzc05hbWUgPT0gcXVlcnkucmVwbGFjZShcIi5cIiwgXCJcIilcclxuICAgICAgICApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEN1c3RvbSBlbGVtZW50IGFkZGVyIGludG8gRE9NIGFmdGVyIHNwZWNpZmljIGVsZW1lbnRcclxuICAgIGluc2VydEVsZW1lbnRBZnRlcih3aGljaEVsZW1lbnQsIHRhZ05hbWUsIGNsYXNzTmFtZSwgY29udGVudCA9IFwiXCIpIHtcclxuICAgICAgICBsZXQgZWxlbWVudCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQodGFnTmFtZSk7XHJcbiAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJjbGFzc1wiLCBjbGFzc05hbWUpO1xyXG4gICAgICAgIGVsZW1lbnQuaW5uZXJIVE1MID0gY29udGVudDtcclxuICAgICAgICB3aGljaEVsZW1lbnQucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoZWxlbWVudCwgd2hpY2hFbGVtZW50Lm5leHRTaWJsaW5nKTtcclxuICAgIH1cclxuXHJcbiAgICBpc01vYmlsZSgpIHtcclxuICAgICAgICB2YXIgY2hlY2sgPSBmYWxzZTtcclxuICAgICAgICAoZnVuY3Rpb24oYSl7aWYoLyhhbmRyb2lkfGJiXFxkK3xtZWVnbykuK21vYmlsZXxhdmFudGdvfGJhZGFcXC98YmxhY2tiZXJyeXxibGF6ZXJ8Y29tcGFsfGVsYWluZXxmZW5uZWN8aGlwdG9wfGllbW9iaWxlfGlwKGhvbmV8b2QpfGlyaXN8a2luZGxlfGxnZSB8bWFlbW98bWlkcHxtbXB8bW9iaWxlLitmaXJlZm94fG5ldGZyb250fG9wZXJhIG0ob2J8aW4paXxwYWxtKCBvcyk/fHBob25lfHAoaXhpfHJlKVxcL3xwbHVja2VyfHBvY2tldHxwc3B8c2VyaWVzKDR8NikwfHN5bWJpYW58dHJlb3x1cFxcLihicm93c2VyfGxpbmspfHZvZGFmb25lfHdhcHx3aW5kb3dzIGNlfHhkYXx4aWluby9pLnRlc3QoYSl8fC8xMjA3fDYzMTB8NjU5MHwzZ3NvfDR0aHB8NTBbMS02XWl8Nzcwc3w4MDJzfGEgd2F8YWJhY3xhYyhlcnxvb3xzXFwtKXxhaShrb3xybil8YWwoYXZ8Y2F8Y28pfGFtb2l8YW4oZXh8bnl8eXcpfGFwdHV8YXIoY2h8Z28pfGFzKHRlfHVzKXxhdHR3fGF1KGRpfFxcLW18ciB8cyApfGF2YW58YmUoY2t8bGx8bnEpfGJpKGxifHJkKXxibChhY3xheil8YnIoZXx2KXd8YnVtYnxid1xcLShufHUpfGM1NVxcL3xjYXBpfGNjd2F8Y2RtXFwtfGNlbGx8Y2h0bXxjbGRjfGNtZFxcLXxjbyhtcHxuZCl8Y3Jhd3xkYShpdHxsbHxuZyl8ZGJ0ZXxkY1xcLXN8ZGV2aXxkaWNhfGRtb2J8ZG8oY3xwKW98ZHMoMTJ8XFwtZCl8ZWwoNDl8YWkpfGVtKGwyfHVsKXxlcihpY3xrMCl8ZXNsOHxleihbNC03XTB8b3N8d2F8emUpfGZldGN8Zmx5KFxcLXxfKXxnMSB1fGc1NjB8Z2VuZXxnZlxcLTV8Z1xcLW1vfGdvKFxcLnd8b2QpfGdyKGFkfHVuKXxoYWllfGhjaXR8aGRcXC0obXxwfHQpfGhlaVxcLXxoaShwdHx0YSl8aHAoIGl8aXApfGhzXFwtY3xodChjKFxcLXwgfF98YXxnfHB8c3x0KXx0cCl8aHUoYXd8dGMpfGlcXC0oMjB8Z298bWEpfGkyMzB8aWFjKCB8XFwtfFxcLyl8aWJyb3xpZGVhfGlnMDF8aWtvbXxpbTFrfGlubm98aXBhcXxpcmlzfGphKHR8dilhfGpicm98amVtdXxqaWdzfGtkZGl8a2VqaXxrZ3QoIHxcXC8pfGtsb258a3B0IHxrd2NcXC18a3lvKGN8ayl8bGUobm98eGkpfGxnKCBnfFxcLyhrfGx8dSl8NTB8NTR8XFwtW2Etd10pfGxpYnd8bHlueHxtMVxcLXd8bTNnYXxtNTBcXC98bWEodGV8dWl8eG8pfG1jKDAxfDIxfGNhKXxtXFwtY3J8bWUocmN8cmkpfG1pKG84fG9hfHRzKXxtbWVmfG1vKDAxfDAyfGJpfGRlfGRvfHQoXFwtfCB8b3x2KXx6eil8bXQoNTB8cDF8diApfG13YnB8bXl3YXxuMTBbMC0yXXxuMjBbMi0zXXxuMzAoMHwyKXxuNTAoMHwyfDUpfG43KDAoMHwxKXwxMCl8bmUoKGN8bSlcXC18b258dGZ8d2Z8d2d8d3QpfG5vayg2fGkpfG56cGh8bzJpbXxvcCh0aXx3dil8b3Jhbnxvd2cxfHA4MDB8cGFuKGF8ZHx0KXxwZHhnfHBnKDEzfFxcLShbMS04XXxjKSl8cGhpbHxwaXJlfHBsKGF5fHVjKXxwblxcLTJ8cG8oY2t8cnR8c2UpfHByb3h8cHNpb3xwdFxcLWd8cWFcXC1hfHFjKDA3fDEyfDIxfDMyfDYwfFxcLVsyLTddfGlcXC0pfHF0ZWt8cjM4MHxyNjAwfHJha3N8cmltOXxybyh2ZXx6byl8czU1XFwvfHNhKGdlfG1hfG1tfG1zfG55fHZhKXxzYygwMXxoXFwtfG9vfHBcXC0pfHNka1xcL3xzZShjKFxcLXwwfDEpfDQ3fG1jfG5kfHJpKXxzZ2hcXC18c2hhcnxzaWUoXFwtfG0pfHNrXFwtMHxzbCg0NXxpZCl8c20oYWx8YXJ8YjN8aXR8dDUpfHNvKGZ0fG55KXxzcCgwMXxoXFwtfHZcXC18diApfHN5KDAxfG1iKXx0MigxOHw1MCl8dDYoMDB8MTB8MTgpfHRhKGd0fGxrKXx0Y2xcXC18dGRnXFwtfHRlbChpfG0pfHRpbVxcLXx0XFwtbW98dG8ocGx8c2gpfHRzKDcwfG1cXC18bTN8bTUpfHR4XFwtOXx1cChcXC5ifGcxfHNpKXx1dHN0fHY0MDB8djc1MHx2ZXJpfHZpKHJnfHRlKXx2ayg0MHw1WzAtM118XFwtdil8dm00MHx2b2RhfHZ1bGN8dngoNTJ8NTN8NjB8NjF8NzB8ODB8ODF8ODN8ODV8OTgpfHczYyhcXC18ICl8d2ViY3x3aGl0fHdpKGcgfG5jfG53KXx3bWxifHdvbnV8eDcwMHx5YXNcXC18eW91cnx6ZXRvfHp0ZVxcLS9pLnRlc3QoYS5zdWJzdHIoMCw0KSkpIGNoZWNrID0gdHJ1ZTt9KShuYXZpZ2F0b3IudXNlckFnZW50fHxuYXZpZ2F0b3IudmVuZG9yfHx3aW5kb3cub3BlcmEpO1xyXG4gICAgICAgIHJldHVybiBjaGVjaztcclxuICAgIH1cclxuXHJcbiAgICAvKiAqKioqKioqKioqKioqKioqKioqKiBTY3JpcHQgcnVuIGFuZCBjdXN0b20gbGlzdGVuZXIgKi9cclxuXHJcbiAgICBydW4oKSB7XHJcbiAgICAgICAgLy8gdXBkYXRlIGluZm9ybWF0aW9ucyBhbmQgb3BlbiBtb2RhbFxyXG4gICAgICAgIHRoaXMudXBkYXRlTW9kYWwoKTtcclxuICAgICAgICB0aGlzLm9wZW5Nb2RhbCgpO1xyXG4gICAgICAgIC8vIHN0YXJ0IHRvIGxpc3RlbiBhbGwgZXZlbnRzIGRlY2xhcmVkIG9uIHRoaXMgZnVuY3Rpb25cclxuICAgICAgICB0aGlzLmxpc3RlbmVyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgbGlzdGVuZXIoKSB7XHJcblxyXG4gICAgICAgIGxldCBwcmV2aW91c0V2ZW50Q2hlY2tlciwgbmV4dEV2ZW50Q2hlY2tlcjtcclxuXHJcbiAgICAgICAgLy8gRGV0ZWN0IGNsaWNrIG9uIGFueXdoZXJlXHJcbiAgICAgICAgdGhpcy5hZGRFdmVudExpc3RlbmVycyhkb2N1bWVudCwgdGhpcy5nZXRNb2RhbE9wdGlvbignZXZlbnRzJyksIChldmVudCkgPT4ge1xyXG5cclxuICAgICAgICAgICAgLy8gY2xlYXIgYWxsIGV2ZW50cyB0aW1lb3V0cyBmb3JcclxuICAgICAgICAgICAgLy8gcHJldmVudCBtdWx0aXBsZSBjbGlja3Mgb24gdGhlIHNhbWUgdGltZSBcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHByZXZpb3VzRXZlbnRDaGVja2VyKTtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KG5leHRFdmVudENoZWNrZXIpO1xyXG5cclxuICAgICAgICAgICAgLy8gSWdub3JlIG90aGVyIGNsaWNrIGV2ZW50c1xyXG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgXHJcbiAgICAgICAgICAgIC8vIERldGVjdCBjbGljayBvbiBhbnl3aGVyZSBvZiBvdXRzaWRlIG1vZGFsIGVsZW1lbnQgaWYgaXRzIGFjdGl2YXRlZFxyXG4gICAgICAgICAgICBpZih0aGlzLmdldE1vZGFsT3B0aW9uKCdvdXRzaWRlQ2xpY2snKSAmJiAhdGhpcy5oYXNTb21lUGFyZW50VGhlQ2xhc3MoZXZlbnQudGFyZ2V0LCB0aGlzLmdldE1vZGFsT3B0aW9uKCdtb2RhbERpdkNsYXNzJykpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZWN0IGNsaWNrIG9uIHNwZWNpZmljIGNsb3NlIGJ1dHRvblxyXG4gICAgICAgICAgICBpZih0aGlzLnRhcmdldFF1ZXJ5VmFsaWRhdG9yKGV2ZW50LCB0aGlzLmdldE1vZGFsT3B0aW9uKCdjbG9zZUJ1dHRvbklkJykpKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsb3NlTW9kYWwoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gRGV0ZWN0IHNwZWNpZmljIG9wZW4gYnV0dG9uIGNsaWNrXHJcbiAgICAgICAgICAgIGlmKGV2ZW50LnRhcmdldC5pZCkge1xyXG5cclxuICAgICAgICAgICAgICAgIGxldCBjb25jZXJuZWRTdGVwID0gdGhpcy5fc3RlcHNBcnJheS5maW5kSW5kZXgoZnVuY3Rpb24oc3RlcCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBzdGVwLm9wZW5CdXR0b25JZCA9PSBldmVudC50YXJnZXQuaWQ7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIFxyXG4gICAgICAgICAgICAgICAgaWYoY29uY2VybmVkU3RlcCkgdGhpcy5nb1RvU3RlcChjb25jZXJuZWRTdGVwKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gd2FpdCBmb3IgZ29pbmcgdG8gcHJldmlvdXMgc3RlcFxyXG4gICAgICAgICAgICBwcmV2aW91c0V2ZW50Q2hlY2tlciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZWN0IHByZXZpb3VzIGJ1dHRvbiBjbGljayBvciBkZWZpbmVkIGtleVxyXG4gICAgICAgICAgICAgICAgaWYodGhpcy50YXJnZXRRdWVyeVZhbGlkYXRvcihldmVudCwgdGhpcy5nZXRNb2RhbE9wdGlvbigncHJldmlvdXNCdXR0b25DbGFzcycpKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIGdvIHRvIHByZXZpb3VzIHN0ZXAgbnVtYmVyIGlmIGN1cnJlbnQgaXMgbm90IHRoZSBmaXJzdCBzdGVwXHJcbiAgICAgICAgICAgICAgICAgICAgaWYoICF0aGlzLmlzRmlyc3RTdGVwKCkgKSB0aGlzLmJhY2tTdGVwKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3dhaXQnKSk7XHJcblxyXG4gICAgICAgICAgICAvLyB3YWl0IGZvciBnb2luZyB0byBuZXh0IHN0ZXBcclxuICAgICAgICAgICAgbmV4dEV2ZW50Q2hlY2tlciA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRGV0ZWN0IG5leHQgYnV0dG9uIGNsaWNrIG9yIGRlZmluZWQga2V5XHJcbiAgICAgICAgICAgICAgICBpZih0aGlzLnRhcmdldFF1ZXJ5VmFsaWRhdG9yKGV2ZW50LCB0aGlzLmdldE1vZGFsT3B0aW9uKCduZXh0QnV0dG9uQ2xhc3MnKSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBnbyB0byBuZXh0IHN0ZXAgbnVtYmVyIGlmIGN1cnJlbnQgaXMgbm90IHRoZSBsYXN0IHN0ZXBcclxuICAgICAgICAgICAgICAgICAgICBpZiggIXRoaXMuaXNMYXN0U3RlcCgpICkgdGhpcy5uZXh0U3RlcCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCB0aGlzLmdldE1vZGFsT3B0aW9uKCd3YWl0JykpO1xyXG5cclxuICAgICAgICAgICAgLy8gRGV0ZWN0IGVuZCBidXR0b24gY2xpY2sgb3IgZGVmaW5lZCBrZXlcclxuICAgICAgICAgICAgaWYodGhpcy50YXJnZXRRdWVyeVZhbGlkYXRvcihldmVudCwgdGhpcy5nZXRNb2RhbE9wdGlvbignZW5kQnV0dG9uQ2xhc3MnKSkpIHtcclxuICAgICAgICAgICAgICAgIGlmKCB0aGlzLmlzTGFzdFN0ZXAoKSApIHRoaXMuY2xvc2VNb2RhbCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIGlmIHJlc3BvbnNpdmUgaXMgZW5hYmxlZFxyXG4gICAgICAgIGlmKHRoaXMuZ2V0TW9kYWxPcHRpb24oJ3Jlc3BvbnNpdmUnKSkge1xyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgLy8gaWYgd2luZG93cyBzaXplIGNoYW5nZSwgcmVzZXQgbW9kYWwgd2l0aCBuZXcgcG9zaXRpb24gZXRjXHJcbiAgICAgICAgICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IG1vZGFsIG9uIG9ubHkgbGFyZ2Ugc2NyZWVuc1xyXG4gICAgICAgICAgICAgICAgaWYoIXRoaXMuaXNNb2JpbGUoKSAmJiB0aGlzLl9pc09wZW5lZCkgdGhpcy5yZXNldE1vZGFsKCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSJdfQ==
