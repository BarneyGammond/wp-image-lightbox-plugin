/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/extendImageBlock.js":
/*!*********************************!*\
  !*** ./src/extendImageBlock.js ***!
  \*********************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);

const {
  __
} = wp.i18n;
const {
  addFilter
} = wp.hooks;
const {
  Fragment
} = wp.element;
const {
  InspectorControls
} = wp.blockEditor;
const {
  PanelBody,
  TextControl,
  ToggleControl
} = wp.components;
const {
  createHigherOrderComponent
} = wp.compose;
addFilter("blocks.registerBlockType", "bg-custom/add-works-text", addWorksText);
addFilter("editor.BlockEdit", "bg-custom/add-image-inspector-controls", addImageInspectorControls);
addFilter("blocks.getSaveContent.extraProps", "bg-custom/add-text-to-element-dataset", addTextToElementDataset);

function addWorksText(settings, name) {
  if ("core/image" !== name) {
    return settings;
  }

  ;
  settings.attributes.lightbox = {
    type: 'boolean',
    default: false
  };
  settings.attributes.workTitle = {
    type: 'string',
    default: ''
  };
  settings.attributes.workMedium = {
    type: 'string',
    default: ''
  };
  settings.attributes.workDimensions = {
    type: 'string',
    default: ''
  };
  settings.attributes.workDate = {
    type: 'string',
    default: ''
  };
  settings.attributes.workDescription = {
    type: 'string',
    default: ''
  };
  return settings;
}

function addImageInspectorControls(BlockEdit) {
  const withInspectorControls = createHigherOrderComponent(BlockEdit => {
    return props => {
      if ("core/image" !== props.name) return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockEdit, props);
      return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Fragment, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockEdit, props)), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(InspectorControls, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(PanelBody, {
        title: __("Lightbox Settings", "bg-custom")
      }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(ToggleControl, {
        label: __("Lightbox Enabled", "bg-custom"),
        checked: props.attributes.lightbox,
        onChange: lightbox => props.setAttributes({
          lightbox
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
        label: __("Work Title", "bg-custom"),
        value: props.attributes.workTitle,
        onChange: workTitle => props.setAttributes({
          workTitle
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
        label: __("Work Medium", "bg-custom"),
        value: props.attributes.workMedium,
        onChange: workMedium => props.setAttributes({
          workMedium
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
        label: __("Work Dimensions", "bg-custom"),
        value: props.attributes.workDimensions,
        onChange: workDimensions => props.setAttributes({
          workDimensions
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
        label: __("Work Date", "bg-custom"),
        value: props.attributes.workDate,
        onChange: workDate => props.setAttributes({
          workDate
        })
      }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(TextControl, {
        label: __("Work Description", "bg-custom"),
        value: props.attributes.workDescription,
        onChange: workDescription => props.setAttributes({
          workDescription
        })
      }))));
    };
  });
  return withInspectorControls(BlockEdit);
}

function addTextToElementDataset(props, type, attributes) {
  if ("core/image" !== type.name) return props;
  props["data-lightbox-enabled"] = attributes.lightbox;
  props["data-work-title"] = attributes.workTitle;
  props["data-work-medium"] = attributes.workMedium;
  props["data-work-dimensions"] = attributes.workDimensions;
  props["data-work-date"] = attributes.workDate;
  props["data-work-description"] = attributes.workDescription;
  return props;
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _extendImageBlock__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./extendImageBlock */ "./src/extendImageBlock.js");


/***/ }),

/***/ "@wordpress/element":
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

(function() { module.exports = window["wp"]["element"]; }());

/***/ })

/******/ });
//# sourceMappingURL=index.js.map