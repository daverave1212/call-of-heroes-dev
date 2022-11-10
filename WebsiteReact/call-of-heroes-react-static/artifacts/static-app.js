(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded chunks
/******/ 	// "0" means "already loaded"
/******/ 	var installedChunks = {
/******/ 		0: 0
/******/ 	};
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
/******/ 	// The chunk loading function for additional chunks
/******/ 	// Since all referenced chunks are already included
/******/ 	// in this file, this function is empty here.
/******/ 	__webpack_require__.e = function requireEnsure() {
/******/ 		return Promise.resolve();
/******/ 	};
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
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// uncaught error handler for webpack runtime
/******/ 	__webpack_require__.oe = function(err) {
/******/ 		process.nextTick(function() {
/******/ 			throw err; // catch this error by using import().catch()
/******/ 		});
/******/ 	};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 74);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ ClassFeatures; });
__webpack_require__.d(__webpack_exports__, "b", function() { return /* binding */ LevelingUp; });
__webpack_require__.d(__webpack_exports__, "e", function() { return /* binding */ SpellCasting; });
__webpack_require__.d(__webpack_exports__, "c", function() { return /* binding */ Spec; });
__webpack_require__.d(__webpack_exports__, "d", function() { return /* binding */ SpecTalents; });
__webpack_require__.d(__webpack_exports__, "f", function() { return /* binding */ StartingAbilities; });

// UNUSED EXPORTS: PHealthAndArmor

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "yaml"
var external_yaml_ = __webpack_require__(29);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/utils.js
var utils = __webpack_require__(7);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/PageH1/PageH1.js
var PageH1 = __webpack_require__(10);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/PageH2/PageH2.js
var PageH2 = __webpack_require__(9);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/PageH3/PageH3.js
var PageH3 = __webpack_require__(11);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/SmallStat/SmallStat.js
var SmallStat = __webpack_require__(14);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/SmallStat/SmallStatList.js
var SmallStatList = __webpack_require__(30);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Separator/Separator.js
var Separator = __webpack_require__(3);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TableNormal/TableNormal.js
var TableNormal = __webpack_require__(18);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TableNormal/TableNormal.css
var TableNormal_TableNormal = __webpack_require__(41);

// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TableNormal/TableNormalLevelUpExhaust.js



/* harmony default export */ var TableNormalLevelUpExhaust = (function () {
  return /*#__PURE__*/external_react_default.a.createElement(TableNormal["a" /* default */], {
    type: "info",
    columns: ['Level', 'You Get...']
  }, /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 1"), /*#__PURE__*/external_react_default.a.createElement("td", null, "-")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 2"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 1)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 3"), /*#__PURE__*/external_react_default.a.createElement("td", null, "+1 in any Stat", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Weapon Training", /*#__PURE__*/external_react_default.a.createElement("br", null), "+1 Feat")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 4"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 2)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 5"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Action Surge (see below)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 6"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 3)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 7"), /*#__PURE__*/external_react_default.a.createElement("td", null, "+1 in any Stat", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Weapon Training", /*#__PURE__*/external_react_default.a.createElement("br", null), "+1 Feat")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 8"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 4)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 9"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Pick one more Talent from either Tier 2 or Tier 4. alternatively, you can get a Feat instead.")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 10"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 5)")));
});
// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TwoColumns/TwoColumns.js
var TwoColumns = __webpack_require__(6);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TwoColumns/Column.js
var Column = __webpack_require__(2);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/Spell.js
var Spell = __webpack_require__(12);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Icon.js
var Icon = __webpack_require__(13);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/databases/Classes/Cleric.json
var Cleric = __webpack_require__(16);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/databases/ClassAbilities.json
var ClassAbilities = __webpack_require__(27);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/ManySpells.js
var ManySpells = __webpack_require__(26);

// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TableNormal/TableNormalLevelUpWarlock.js




/* harmony default export */ var TableNormalLevelUpWarlock = (function () {
  return /*#__PURE__*/external_react_default.a.createElement(TableNormal["a" /* default */], {
    type: "info",
    columns: ['Level', 'You Get...']
  }, /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 1"), /*#__PURE__*/external_react_default.a.createElement("td", null, "-")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 2"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 1)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 3"), /*#__PURE__*/external_react_default.a.createElement("td", null, "+1 in any Stat", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Weapon Training", /*#__PURE__*/external_react_default.a.createElement("br", null), "+1 Feat", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Extra ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Charge"
  }), "Charge")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 4"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 2)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 5"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Action Surge (see below)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 6"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 3)", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Extra ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Charge"
  }), "Charge")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 7"), /*#__PURE__*/external_react_default.a.createElement("td", null, "+1 in any Stat", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Weapon Training", /*#__PURE__*/external_react_default.a.createElement("br", null), "+1 Feat")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 8"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 4)")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 9"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Pick one more Talent from either Tier 2 or Tier 4. Alternatively, you can get a Feat instead.", /*#__PURE__*/external_react_default.a.createElement("br", null), "1 Extra ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Charge"
  }), "Charge")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "Level 10"), /*#__PURE__*/external_react_default.a.createElement("td", null, "Talent from your Specialization (Tier 5)")));
});
// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/InsertableTemplates/ClassComponents.js




















function ClassFeatures(_ref) {
  var theClass = _ref.theClass;
  return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH2["a" /* default */], null, "Class Features"), /*#__PURE__*/external_react_default.a.createElement(TwoColumns["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Health"
  }, theClass['Base Health']), /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Armor Training"
  }, theClass['Armor Training']), theClass['Language'] && /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Language",
    topDown: "true"
  }, theClass['Language'])), /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(PHealthAndArmor, null))));
}
function LevelingUp(_ref2) {
  var theClass = _ref2.theClass;
  return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Leveling Up"), /*#__PURE__*/external_react_default.a.createElement(TwoColumns["a" /* default */], {
    type: "normal"
  }, /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, theClass['Spellcasting']['Type'] == 'Special Charge-based' ? /*#__PURE__*/external_react_default.a.createElement(TableNormalLevelUpWarlock, null) : /*#__PURE__*/external_react_default.a.createElement(TableNormalLevelUpExhaust, null)), /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, theClass['Spellcasting']['Type'] == 'Exhaust-based' ? /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(TableNormal["a" /* default */], {
    columns: ['Every Level Above 1 You Get...']
  }, /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, theClass['Level Up']['Every Level']['Health'], " ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Health"
  }), "Health")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "1 Known Advanced Spell"))), /*#__PURE__*/external_react_default.a.createElement("p", null, "When you level up (e.g. Level 1 to Level 2), you gain some Health and a Known Advanced Spell. Also, depending on your level, you also gain something else (see the table on the left)."), /*#__PURE__*/external_react_default.a.createElement("p", null, "Once you reach Level 4, you unlock the Action Surge Ability."), /*#__PURE__*/external_react_default.a.createElement(Spell["a" /* default */], {
    spell: ClassAbilities["a" /* ~Action Surge~ */]
  })) : theClass['Spellcasting']['Type'] == 'Charge-based' ? /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(TableNormal["a" /* default */], {
    columns: ['Every Level Above 1 You Get...']
  }, /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, theClass['Level Up']['Every Level']['Health'], " ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Health"
  }), "Health")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "1 Known Spell")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "1 Extra ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Charge"
  }), "Charge"))), /*#__PURE__*/external_react_default.a.createElement("p", null, "When you level up (e.g. Level 1 to Level 2), you gain some Health and a Known Spell. You also gain 1 more Charge per Long Rest (raises your maximum number of Charges). Also, depending on your level, you also gain something else (see the table on the left)."), /*#__PURE__*/external_react_default.a.createElement("p", null, "Once you reach Level 4, you unlock the Action Surge Ability."), /*#__PURE__*/external_react_default.a.createElement(Spell["a" /* default */], {
    spell: ClassAbilities["a" /* ~Action Surge~ */]
  })) : theClass['Spellcasting']['Type'] == 'Special Charge-based' ? /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(TableNormal["a" /* default */], {
    columns: ['Every Level Above 1 You Get...']
  }, /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, theClass['Level Up']['Every Level']['Health'], " ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Health"
  }), "Health")), /*#__PURE__*/external_react_default.a.createElement("tr", null, /*#__PURE__*/external_react_default.a.createElement("td", null, "1 Known Spell"))), /*#__PURE__*/external_react_default.a.createElement("p", null, "When you level up (e.g. Level 1 to Level 2), you gain some Health and a Known Spell. You also gain 1 more Charge per Long Rest (raises your maximum number of Charges). Also, depending on your level, you also gain something else (see the table on the left)."), /*#__PURE__*/external_react_default.a.createElement("p", null, "Once you reach Level 4, you unlock the Action Surge Ability."), /*#__PURE__*/external_react_default.a.createElement(Spell["a" /* default */], {
    spell: ClassAbilities["a" /* ~Action Surge~ */]
  })) : null)));
}
function SpellCasting(_ref3) {
  var theClass = _ref3.theClass;
  function ChargeBasedSpellcasting() {
    return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Charge-Based Spellcasting"), /*#__PURE__*/external_react_default.a.createElement("p", null, theClass.Class, " Abilities are Charge-based."), "As a ", theClass.Class, ", you have a number of Charges. To cast any Advanced Ability from your known spells, you must expend 1 Charge (or according to its Cost). You don't have restrictions for how many times you can cast a spell per Long Rest, but you have restrictions on your Charges.", /*#__PURE__*/external_react_default.a.createElement(Separator["a" /* default */], null), "All your Charges recharge when you finish a Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.", /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Changing Spells"), "You can change your known Spells (not Talents) when taking a Long Rest.", /*#__PURE__*/external_react_default.a.createElement("br", null), "Talents can't generally be changed once picked; they are permenant decisions.", theClass.Spellcasting.Other);
  }
  function ExhaustBasedSpellcasting() {
    return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Exhaust-Based Spellcasting"), /*#__PURE__*/external_react_default.a.createElement("p", null, theClass.Class, " Abilities are Exhaust-based."), "As a ", theClass.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.", /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement(Separator["a" /* default */], null), "All your Abilities Un-exhaust when you finish a Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.", /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Changing Spells"), "You can change your known Spells (not Talents) when taking a Long Rest.", /*#__PURE__*/external_react_default.a.createElement("br", null), "Talents can't generally be changed once picked; they are permenant decisions.", theClass.Spellcasting.Other);
  }
  function SpecialChargeBasedSpellcasting() {
    return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Special Charge-Based Spellcasting"), /*#__PURE__*/external_react_default.a.createElement("p", null, theClass.Class, " Abilities are Charge-based, with a twist."), "As a ", theClass.Class, ", you have a number of Charges. Unlike other Charge-based classes, your Charges instantly reset 10 minutes after finishing every combat encounter (if you don't enter another combat meanwhile).", /*#__PURE__*/external_react_default.a.createElement(Separator["a" /* default */], null), "Advanced Abilities are all Abilities from the Spell Lists listed as Advanced.", /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Changing Spells"), "You can change your known Spells (not Talents) when taking a Long Rest.", /*#__PURE__*/external_react_default.a.createElement("br", null), "Talents can't generally be changed once picked; they are permenant decisions.", theClass.Spellcasting.Other);
  }
  return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH2["a" /* default */], null, "Spell Casting"), /*#__PURE__*/external_react_default.a.createElement(TwoColumns["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Spell Stats"), /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Spellcasting Style",
    color: "blue"
  }, theClass['Spellcasting']['Type']), /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Main Stat",
    color: "blue"
  }, theClass['Spellcasting']['Main Stat']), /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Enemy Check Grade",
    color: "blue"
  }, theClass['Spellcasting']['Spell DC']), /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Known Spells"), theClass['Spellcasting']['Known Basic Spells'] != null && /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Known Basic Spells",
    color: "blue"
  }, theClass['Spellcasting']['Known Basic Spells']), theClass['Spellcasting']['Known Advanced Spells'] != null && /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Known Advanced Spells",
    color: "blue"
  }, theClass['Spellcasting']['Known Advanced Spells']), theClass['Spellcasting']['Known Spells'] != null && /*#__PURE__*/external_react_default.a.createElement(SmallStat["a" /* default */], {
    name: "Known Spells",
    color: "blue"
  }, theClass['Spellcasting']['Known Spells']), /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "Spell Lists"), /*#__PURE__*/external_react_default.a.createElement(SmallStatList["a" /* default */], {
    name: "Spell Lists",
    color: "blue"
  }, theClass['Spellcasting']['Spell Lists'].map(function (spellCategory) {
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: spellCategory
    }, spellCategory);
  }))), /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, theClass.Spellcasting.Type == 'Charge-based' ? /*#__PURE__*/external_react_default.a.createElement(ChargeBasedSpellcasting, null) : theClass.Spellcasting.Type == 'Exhaust-based' ? /*#__PURE__*/external_react_default.a.createElement(ExhaustBasedSpellcasting, null) : theClass.Spellcasting.Type == 'Special Charge-based' ? /*#__PURE__*/external_react_default.a.createElement(SpecialChargeBasedSpellcasting, null) : null)));
}
function PHealthAndArmor() {
  return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement("p", null, "When you create your character, your total starting Health will be:"), /*#__PURE__*/external_react_default.a.createElement("p", null, /*#__PURE__*/external_react_default.a.createElement("b", null, /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Health"
  }), "Race Health + ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Health"
  }), "Class Health + 2 * Might.")), /*#__PURE__*/external_react_default.a.createElement("p", null, "You also start with an armor of choice from the Armors list, as long as you can wear it."));
}
function Spec(_ref4) {
  var children = _ref4.children,
    name = _ref4.name,
    spec = _ref4.spec;
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "page",
    key: name
  }, /*#__PURE__*/external_react_default.a.createElement(PageH1["a" /* default */], null, name), /*#__PURE__*/external_react_default.a.createElement("p", null, spec.Description), /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, "You start with..."), /*#__PURE__*/external_react_default.a.createElement(ManySpells["a" /* default */], {
    spells: utils["c" /* spellsFromObject */](spec['Starting Abilities'])
  }), children);
}
function SpecTalents(_ref5) {
  var spec = _ref5.spec;
  return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH2["a" /* default */], null, "Talents"), /*#__PURE__*/external_react_default.a.createElement("p", null, "At each of the following levels, you can pick one of the Abilities listed."), Object.keys(spec.Talents).map(function (talentTierName) {
    return /*#__PURE__*/external_react_default.a.createElement("div", {
      key: talentTierName
    }, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], null, talentTierName), /*#__PURE__*/external_react_default.a.createElement(ManySpells["a" /* default */], {
      spells: utils["c" /* spellsFromObject */](spec.Talents[talentTierName])
    }));
  }));
}
function StartingAbilities(_ref6) {
  var spellsObject = _ref6.spellsObject,
    description = _ref6.description;
  var spells = utils["c" /* spellsFromObject */](spellsObject);
  var spellsLeft = spells.filter(function (spell) {
    return spell.AlignOnWebsite == 'Left' || spell.AlignOnWebsite == null;
  });
  var spellsRight = spells.filter(function (spell) {
    return spell.AlignOnWebsite == 'Right';
  });
  function SADescription() {
    if (typeof description === 'string' || description instanceof String) return /*#__PURE__*/external_react_default.a.createElement("span", null, description);else {
      return description.map(function (section) {
        return /*#__PURE__*/external_react_default.a.createElement("div", {
          key: Object.keys(section)[0]
        }, /*#__PURE__*/external_react_default.a.createElement(PageH3["a" /* default */], {
          hasMarginTop: false
        }, Object.keys(section)[0]), /*#__PURE__*/external_react_default.a.createElement("p", null, section[Object.keys(section)[0]]));
      });
    }
  }
  console.log({
    spells: spells
  });
  return /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement(PageH2["a" /* default */], null, "Starting Abilities"), /*#__PURE__*/external_react_default.a.createElement(TwoColumns["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, spellsLeft.map(function (spell) {
    return /*#__PURE__*/external_react_default.a.createElement(Spell["a" /* default */], {
      key: spell.Name,
      spell: spell
    });
  })), /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, spellsRight.map(function (spell) {
    return /*#__PURE__*/external_react_default.a.createElement(Spell["a" /* default */], {
      key: spell.Name,
      spell: spell
    });
  }), /*#__PURE__*/external_react_default.a.createElement(SADescription, null))));
}

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwoColumns; });
/* harmony import */ var _TwoColumns_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var _TwoColumns_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_TwoColumns_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function TwoColumns(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "column"
  }, children);
}

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Separator; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _Separator_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(101);
/* harmony import */ var _Separator_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_Separator_css__WEBPACK_IMPORTED_MODULE_1__);


function Separator(_ref) {
  var children = _ref.children,
    title = _ref.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "separator",
    src: "/separator.png"
  });
}

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("babel-plugin-universal-import/universalImport");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TwoColumns; });
/* harmony import */ var _TwoColumns_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(55);
/* harmony import */ var _TwoColumns_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_TwoColumns_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function TwoColumns(_ref) {
  var children = _ref.children,
    type = _ref.type;
  var typeClass = type == 'lefty' ? 'two-columns--lefty' : 'two-columns--normal';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "two-columns ".concat(typeClass)
  }, children);
}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export spellWithName */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return spellsFromObject; });
/* unused harmony export spellFromObject */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return sortObjectArrayByKey; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return insertBetweenAll; });
/* unused harmony export ifOk */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return stringReplaceAllMany; });
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(72);
/* harmony import */ var _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(73);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1__);


function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }
function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_1___default()(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }
function spellWithName(name, spellData) {
  return _objectSpread(_objectSpread({}, spellData), {}, {
    Name: name
  });
}
// Retrieves all keys as .Name in an array of all objects
function spellsFromObject(obj) {
  var spellsArray = [];
  for (var _i = 0, _Object$keys = Object.keys(obj); _i < _Object$keys.length; _i++) {
    var key = _Object$keys[_i];
    if (key == 'default')
      // Ignore it if it's the 'default' module property
      continue;
    var spellName = key.startsWith('<') || key.startsWith('~') ? key.substring(1, key.length - 1) : key;
    spellsArray.push(spellWithName(spellName, obj[key]));
  }
  return spellsArray;
}
// Gets all keys as spell objects into an array, BUT the objects are taken from a database by their key
// Use import classAbilities, then give a database as a parameter
// This is useful because some class abilities have ": Inherit", therefore you need to get the spell from the database by name
function spellFromObject(obj, name) {
  return spellWithName(name, obj[name]);
}

// Puts it at the end if it has no keyName property.
function sortObjectArrayByKey(array, keyName) {
  if (Array.isArray(array) == false) {
    console.log({
      array: array
    });
    throw "Did not give an array to sortObjectArrayByKey. See object above.";
  }
  var sortedArray = _babel_runtime_helpers_toConsumableArray__WEBPACK_IMPORTED_MODULE_0___default()(array).sort(function (a, b) {
    var aSort = a[keyName] != null ? a[keyName] : 99999;
    var bSort = b[keyName] != null ? b[keyName] : 99999;
    return aSort - bSort;
  });
  return sortedArray;
}
function insertBetweenAll(array, insertWhat) {
  if (array.length == 0) return array;
  var newArray = [array[0]];
  for (var i = 1; i < array.length; i++) {
    newArray.push(typeof insertWhat === 'function' ? insertWhat(i) : insertWhat);
    newArray.push(array[i]);
  }
  return newArray;
}
function ifOk(whatToCheck, then) {
  return whatToCheck == null ? null : then;
}
function stringReplaceAllMany(str, replaceWhats, replaceWiths) {
  for (var i = 0; i < replaceWhats.length; i++) {
    str = str.split(replaceWhats[i]).join(replaceWiths[i]);
  }
  return str;
}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _reach_router__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(33);
/* harmony import */ var _reach_router__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_reach_router__WEBPACK_IMPORTED_MODULE_0__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "a", function() { return _reach_router__WEBPACK_IMPORTED_MODULE_0__["Link"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "b", function() { return _reach_router__WEBPACK_IMPORTED_MODULE_0__["Router"]; });



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageH2; });
/* harmony import */ var _PageH2_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(99);
/* harmony import */ var _PageH2_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_PageH2_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function PageH2(_ref) {
  var children = _ref.children,
    title = _ref.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "page-h2"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/h2-background.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h2", null, children));
}

/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageH1; });
/* harmony import */ var _PageH1_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(98);
/* harmony import */ var _PageH1_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_PageH1_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function PageH1(_ref) {
  var children = _ref.children,
    title = _ref.title;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "page-h1"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("img", {
    src: "/h1-background.png"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h1", null, children));
}

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return PageH3; });
/* harmony import */ var _PageH3_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(100);
/* harmony import */ var _PageH3_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_PageH3_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function PageH3(_ref) {
  var children = _ref.children,
    hasMarginTop = _ref.hasMarginTop;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "page-h3"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("h3", null, children));
}

/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Spell; });
/* harmony import */ var _Spell_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var _Spell_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_Spell_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _PageH2_PageH2__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(9);
/* harmony import */ var _Separator_Separator__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(3);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);





function Spell(_ref) {
  var children = _ref.children,
    spell = _ref.spell;
  if (spell == null) {
    throw "Given null spell to Spell: ".concat(spell);
  }
  if (spell.Name == null) {
    console.log({
      spell: spell
    });
    throw "Spell has no Name (printed above): ".concat(spell);
  }
  var Name = spell.Name,
    A = spell.A,
    Cost = spell.Cost,
    Range = spell.Range,
    Cooldown = spell.Cooldown,
    Effect = spell.Effect,
    Notes = spell.Notes,
    Requirement = spell.Requirement,
    IsSubspell = spell.IsSubspell;
  if (Name == null || typeof Name != 'string') {
    Name = 'Default';
  }
  if (Name.startsWith('~')) Name = Name.substring(1, Name.length - 1);
  var iconName = Object(_utils__WEBPACK_IMPORTED_MODULE_4__[/* stringReplaceAllMany */ "d"])(Name, [' ', '/', '%'], ['_', '_', '']);
  var iconPath = "/Icons/Spells/".concat(iconName, ".png");
  var spellNormalOrSubClass = IsSubspell == true ? 'spell--subspell' : 'spell--normal';
  var spellPassiveOrActiveClass = A == 'Passive' == true ? 'spell--passive' : 'spell--active';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell ".concat(spellNormalOrSubClass, " ").concat(spellPassiveOrActiveClass)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell__border"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell__background"
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell__box"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-top"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-top__icon-side"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
    src: iconPath
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-top__title-side"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-top__title__wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-top__title"
  }, Name)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-top__stats"
  }, A != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
    src: "/Icons/UI/Hand.png",
    className: "inline-icon--spell"
  }), A), Cost != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
    src: "/Icons/UI/Charge.png",
    className: "inline-icon--spell"
  }), Cost), Range != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
    src: "/Icons/UI/Range.png",
    className: "inline-icon--spell"
  }), Range), Cooldown != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("img", {
    src: "/Icons/UI/Cooldown.png",
    className: "inline-icon--spell"
  }), Cooldown)))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_Separator_Separator__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-description"
  }, Effect), Notes != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "spell-notes"
  }, Notes)));
}

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Icon; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

function Icon(_ref) {
  var name = _ref.name;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "inline-icon",
    src: "/Icons/UI/".concat(name, ".png")
  });
}

/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmallStat; });
/* harmony import */ var _SmallStat_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _SmallStat_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_SmallStat_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function SmallStat(_ref) {
  var children = _ref.children,
    name = _ref.name,
    color = _ref.color,
    topDown = _ref.topDown;
  var smallStatColorClass = color == 'blue' ? 'small-stat--blue' : 'small-stat--normal';
  var smallStatNameColorClass = color == 'blue' ? 'small-stat__name--blue' : 'small-stat__name--normal';
  var smallStatFlexDirectionClass = topDown == true || topDown == 'true' ? 'small-stat--column' : 'small-stat--row';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat ".concat(smallStatColorClass, " ").concat(smallStatFlexDirectionClass)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat__name ".concat(smallStatNameColorClass)
  }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat__value"
  }, children)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null));
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(module) {

var _typeof = __webpack_require__(38);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.setHasBabelPlugin = exports.ReportChunks = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _requireUniversalModule = __webpack_require__(80);
Object.defineProperty(exports, 'CHUNK_NAMES', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.CHUNK_NAMES;
  }
});
Object.defineProperty(exports, 'MODULE_IDS', {
  enumerable: true,
  get: function get() {
    return _requireUniversalModule.MODULE_IDS;
  }
});
var _reportChunks = __webpack_require__(82);
Object.defineProperty(exports, 'ReportChunks', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_reportChunks)["default"];
  }
});
exports["default"] = universal;
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _propTypes = __webpack_require__(45);
var _propTypes2 = _interopRequireDefault(_propTypes);
var _hoistNonReactStatics = __webpack_require__(47);
var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
var _requireUniversalModule2 = _interopRequireDefault(_requireUniversalModule);
var _context = __webpack_require__(46);
var _context2 = _interopRequireDefault(_context);
var _utils = __webpack_require__(39);
var _helpers = __webpack_require__(83);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
function _objectWithoutProperties(obj, keys) {
  var target = {};
  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }
  return target;
}
var hasBabelPlugin = false;
var isHMR = function isHMR() {
  return (
    // $FlowIgnore
    module.hot && (false)
  );
};
var setHasBabelPlugin = exports.setHasBabelPlugin = function setHasBabelPlugin() {
  hasBabelPlugin = true;
};
function universal(asyncModule) {
  var _class, _temp;
  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var userRender = opts.render,
    _opts$loading = opts.loading,
    Loading = _opts$loading === undefined ? _utils.DefaultLoading : _opts$loading,
    _opts$error = opts.error,
    Err = _opts$error === undefined ? _utils.DefaultError : _opts$error,
    _opts$minDelay = opts.minDelay,
    minDelay = _opts$minDelay === undefined ? 0 : _opts$minDelay,
    _opts$alwaysDelay = opts.alwaysDelay,
    alwaysDelay = _opts$alwaysDelay === undefined ? false : _opts$alwaysDelay,
    _opts$testBabelPlugin = opts.testBabelPlugin,
    testBabelPlugin = _opts$testBabelPlugin === undefined ? false : _opts$testBabelPlugin,
    _opts$loadingTransiti = opts.loadingTransition,
    loadingTransition = _opts$loadingTransiti === undefined ? true : _opts$loadingTransiti,
    options = _objectWithoutProperties(opts, ['render', 'loading', 'error', 'minDelay', 'alwaysDelay', 'testBabelPlugin', 'loadingTransition']);
  var renderFunc = userRender || (0, _utils.createDefaultRender)(Loading, Err);
  var isDynamic = hasBabelPlugin || testBabelPlugin;
  options.isDynamic = isDynamic;
  options.usesBabelPlugin = hasBabelPlugin;
  options.modCache = {};
  options.promCache = {};
  return _temp = _class = function (_React$Component) {
    _inherits(UniversalComponent, _React$Component);
    _createClass(UniversalComponent, [{
      key: 'requireAsyncInner',
      value: function requireAsyncInner(requireAsync, props, state, isMount) {
        var _this2 = this;
        if (!state.mod && loadingTransition) {
          this.update({
            mod: null,
            props: props
          }); // display `loading` during componentWillReceiveProps
        }

        var time = new Date();
        requireAsync(props).then(function (mod) {
          var state = {
            mod: mod,
            props: props
          };
          var timeLapsed = new Date() - time;
          if (timeLapsed < minDelay) {
            var extraDelay = minDelay - timeLapsed;
            return setTimeout(function () {
              return _this2.update(state, isMount);
            }, extraDelay);
          }
          _this2.update(state, isMount);
        })["catch"](function (error) {
          return _this2.update({
            error: error,
            props: props
          });
        });
      }
    }, {
      key: 'handleBefore',
      value: function handleBefore(isMount, isSync) {
        var isServer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        if (this.props.onBefore) {
          var onBefore = this.props.onBefore;
          var info = {
            isMount: isMount,
            isSync: isSync,
            isServer: isServer
          };
          onBefore(info);
        }
      }
    }, {
      key: 'handleAfter',
      value: function handleAfter(state, isMount, isSync, isServer) {
        var mod = state.mod,
          error = state.error;
        if (mod && !error) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
          if (this.props.onAfter) {
            var onAfter = this.props.onAfter;
            var info = {
              isMount: isMount,
              isSync: isSync,
              isServer: isServer
            };
            onAfter(info, mod);
          }
        } else if (error && this.props.onError) {
          this.props.onError(error);
        }
        this.setState(state);
      }
      // $FlowFixMe
    }, {
      key: 'init',
      value: function init(props) {
        var _req = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
          addModule = _req.addModule,
          requireSync = _req.requireSync,
          requireAsync = _req.requireAsync,
          asyncOnly = _req.asyncOnly;
        var mod = void 0;
        try {
          mod = requireSync(props);
        } catch (error) {
          return (0, _helpers.__update)(props, {
            error: error,
            props: props
          }, this._initialized);
        }
        this._asyncOnly = asyncOnly;
        var chunkName = addModule(props); // record the module for SSR flushing :)
        if (this.context && this.context.report) {
          this.context.report(chunkName);
        }
        if (mod || _utils.isServer) {
          this.handleBefore(true, true, _utils.isServer);
          return (0, _helpers.__update)(props, {
            asyncOnly: asyncOnly,
            props: props,
            mod: mod
          }, this._initialized, true, true, _utils.isServer);
        }
        this.handleBefore(true, false);
        this.requireAsyncInner(requireAsync, props, {
          props: props,
          asyncOnly: asyncOnly,
          mod: mod
        }, true);
        return {
          mod: mod,
          asyncOnly: asyncOnly,
          props: props
        };
      }
    }], [{
      key: 'preload',
      value: function preload(props) {
        props = props || {};
        var _req2 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
          requireAsync = _req2.requireAsync,
          requireSync = _req2.requireSync;
        var mod = void 0;
        try {
          mod = requireSync(props);
        } catch (error) {
          return Promise.reject(error);
        }
        return Promise.resolve().then(function () {
          if (mod) return mod;
          return requireAsync(props);
        }).then(function (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
          return mod;
        });
      }
      /* eslint-enable react/sort-comp */

      /* eslint-disable react/sort-comp */
    }, {
      key: 'preloadWeak',
      value: function preloadWeak(props) {
        props = props || {};
        var _req3 = (0, _requireUniversalModule2["default"])(asyncModule, options, props),
          requireSync = _req3.requireSync;
        var mod = requireSync(props);
        if (mod) {
          (0, _hoistNonReactStatics2["default"])(UniversalComponent, mod, {
            preload: true,
            preloadWeak: true
          });
        }
        return mod;
      }
    }]);
    function UniversalComponent(props, context) {
      _classCallCheck(this, UniversalComponent);
      var _this = _possibleConstructorReturn(this, (UniversalComponent.__proto__ || Object.getPrototypeOf(UniversalComponent)).call(this, props, context));
      _this.update = function (state) {
        var isMount = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
        var isSync = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
        var isServer = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
        if (!_this._initialized) return;
        if (!state.error) state.error = null;
        _this.handleAfter(state, isMount, isSync, isServer);
      };
      _this.state = _this.init(_this.props);
      // $FlowFixMe
      _this.state.error = null;
      return _this;
    }
    _createClass(UniversalComponent, [{
      key: 'componentDidMount',
      value: function componentDidMount() {
        this._initialized = true;
      }
    }, {
      key: 'componentDidUpdate',
      value: function componentDidUpdate(prevProps) {
        var _this3 = this;
        if (isDynamic || this._asyncOnly) {
          var _req4 = (0, _requireUniversalModule2["default"])(asyncModule, options, this.props, prevProps),
            requireSync = _req4.requireSync,
            requireAsync = _req4.requireAsync,
            shouldUpdate = _req4.shouldUpdate;
          if (shouldUpdate(this.props, prevProps)) {
            var mod = void 0;
            try {
              mod = requireSync(this.props);
            } catch (error) {
              return this.update({
                error: error
              });
            }
            this.handleBefore(false, !!mod);
            if (!mod) {
              return this.requireAsyncInner(requireAsync, this.props, {
                mod: mod
              });
            }
            var state = {
              mod: mod
            };
            if (alwaysDelay) {
              if (loadingTransition) this.update({
                mod: null
              }); // display `loading` during componentWillReceiveProps
              setTimeout(function () {
                return _this3.update(state, false, true);
              }, minDelay);
              return;
            }
            this.update(state, false, true);
          }
        }
      }
    }, {
      key: 'componentWillUnmount',
      value: function componentWillUnmount() {
        this._initialized = false;
      }
    }, {
      key: 'render',
      value: function render() {
        var _props = this.props,
          isLoading = _props.isLoading,
          userError = _props.error,
          props = _objectWithoutProperties(_props, ['isLoading', 'error']);
        var _state = this.state,
          mod = _state.mod,
          error = _state.error;
        return renderFunc(props, mod, isLoading, userError || error);
      }
    }], [{
      key: 'getDerivedStateFromProps',
      value: function getDerivedStateFromProps(nextProps, currentState) {
        var _req5 = (0, _requireUniversalModule2["default"])(asyncModule, options, nextProps, currentState.props),
          requireSync = _req5.requireSync,
          shouldUpdate = _req5.shouldUpdate;
        if (isHMR() && shouldUpdate(currentState.props, nextProps)) {
          var mod = requireSync(nextProps);
          return _extends({}, currentState, {
            mod: mod
          });
        }
        return null;
      }
    }]);
    return UniversalComponent;
  }(_react2["default"].Component), _class.contextType = _context2["default"], _temp;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(79)(module)))

/***/ }),
/* 16 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Class\":\"Cleric\",\"Description\":\"Clerics are people attuned to a certain god.\",\"Base Health\":5,\"Language\":\"If your Intelligence is at least 2, choose one Higher or Common language you can speak.\",\"Armor Training\":\"Medium Armor\",\"Level Up\":{\"Every Level\":{\"Health\":5,\"Spells\":\"1 known Advanced Spell\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Exhaust-based\",\"Description\":\"Cleric Abilities are Exhaust-based.\\nAs a Cleric, you know a certain number of Advanced Abilities.\\nYou can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Choose permanently - Wisdom or Charisma\",\"Spell DC\":\"6 + (Main Stat)\",\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Cleric-specific abilities are considered spells (unless stated otherwise).\",\"Known Basic Spells\":\"2 + Your Intelligence\",\"Known Advanced Spells\":\"2 + Your Level\",\"Spell Lists\":[\"Mysticism\",\"Divine\"]},\"Starting Abilities\":{\"~Awe~\":{\"A\":\"0 Actions\",\"Range\":\"5 meters\",\"Effect\":\"Instantly heal or damage a target for 1d4 (True damage).\\nYou can do this once per Long Rest.\\nSome other Cleric spells will cast Awe for free.\\n\",\"Name\":\"~Awe~\"}},\"Starting Abilities Description\":\"Clerics start with the Awe Spell.\\nYour future Cleric Talents will <i>trigger</i> Awe casts for free or reset its cooldown.\\n\",\"Other Ability Mentions\":\"The first time you choose a cleric domain (specialization), you must choose between two abilities.\\nFor example, for Battle Cleric, you have to choose either March Ahead or Piety.\\nChoose wisely...\\n\",\"Specializations\":{\"Description\":\"At Level 1, you can choose your specialization.\",\"Choices\":[\"Battle Cleric, where you become devoted to either Peace or War (or both) and pursue either of those\",\"Beacon Cleric, a keeper of the light or darkness, whose power draws from flame or shadow...\",\"Life Cleric, a balancer between life and death; your very fate hangs in this balance\"]},\"Specs\":{\"Battle Cleric\":{\"Description\":\"Battle clerics specialize in conditions of war. You must choose your side\",\"Starting Abilities\":{\"~Chains~\":{\"A\":\"1 Action\",\"Range\":\"6 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Cast Awe on a target 2 times (for free).\\nIt must pass a Might Check or be Paralyzed.\\n\",\"Name\":\"~Chains~\"}},\"Choose your side\":\"Battle Cleric!\\nPick only one of the following two abilities!\\n\",\"Abilities\":{\"~March Ahead~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"All allies can move 3 extra meters on their next turn (and you too this turn).\\n\",\"Name\":\"~March Ahead~\"},\"~Piety~\":{\"A\":\"Passive\",\"Effect\":\"Casting Awe yourself (manually, the actual Ability) now does 2d4 instead of 1d4.\",\"Name\":\"~Piety~\"}},\"Talents\":{\"Level 2\":{\"<Eternal Bindings>\":{\"A\":\"0 Actions or Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"A creature within 3 meters makes a Wisdom save.\\nIf it fails, cast Awe on it.\\nIt becomes magically bound to an object within 3 meters of it and can't willingly move more than 3 meters away from that object.\\nIt rolls the save again at the start end of their turn to escape the binding.\\nLasts up to 1 minute.\\n\",\"OrderOnWebsite\":3,\"Name\":\"<Eternal Bindings>\"},\"<Heavy Burden>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"A creature within 3 meters makes a Wisdom Check.\\nIf it fails, cast Awe on it and it is Crippled.\\n\",\"OrderOnWebsite\":1,\"Name\":\"<Heavy Burden>\"},\"<Repentance>\":{\"A\":\"0 Actions\",\"Cost\":\"50% of your maximum health\",\"Range\":\"1 meter (touch)\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Restore 50% of an ally's maximum health, then cast Awe on yourself.\",\"OrderOnWebsite\":2,\"Name\":\"<Repentance>\"}},\"Level 4\":{\"<War Smite>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"When you land an attack, roll 1d4 again and again until your roll 1.\\nAdd them all together, and add the total to the attack.\\n\",\"OrderOnWebsite\":1,\"Name\":\"<War Smite>\"},\"<Shadow Realm>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"A Unit within 6 meters becomes trapped in a Shadow Realm with you for 2 rounds (this and the next).\\nYour attacks against it cast Awe on it for free while inside the Shadow Realm.\\nNeither of you can interact with the outside world, but can feintly see it.\\nUnits on the outside can faintly see the two of you, as if you were ghosts.\\n\",\"Notes\":\"The Shadow Realm is a copy of the normal world, but with no other units.\",\"OrderOnWebsite\":3,\"Name\":\"<Shadow Realm>\"},\"<Holy Apex>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"5 meters to edge\",\"Effect\":\"Declare a 6x6 meter area.\\nA giant spectral fist hits the ground and deals 2d10 + (Round Number d6) True damage (against Defense) to all Units there, except you.\\n\",\"Notes\":\"E.g. on the first round of combat, this deals 2d10 + 1d6. Second round - 2d10 + 2d6. Third round - 2d10 + 3d6. And so on.\",\"OrderOnWebsite\":2,\"Name\":\"<Holy Apex>\"}}}},\"Beacon Cleric\":{\"Description\":\"As a cleric, you become a devotee of darkness or/and light.\",\"Starting Abilities\":{\"~Grasp~\":{\"A\":\"0.5 Actions\",\"Range\":\"15 meters (you don't need line of sight)\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Cast Awe on the target.\\nThat target does not benefit from Cover for 1 minute.\\n\",\"Name\":\"~Grasp~\"}},\"Choose your side\":\"Beacon Cleric!\\\\nPick only one of the following two abilities!\",\"Abilities\":{\"~Radiance~\":{\"A\":\"Passive\",\"Effect\":\"At all times, you radiate light in a 3 meter radius.\\nYou can turn this on and off at will.\\nYou are immune to being Blinded.\\nIf you have full health, Awe damage and healing is 1d6.\\n\",\"Name\":\"~Radiance~\"},\"~Twilight~\":{\"A\":\"Passive\",\"Effect\":\"You have Dark Vision.\\nYou are immune to being Feared.\\nIf you have 50% or less health, Awe damage and healing is 1d6.\\n\",\"Name\":\"~Twilight~\"}},\"Talents\":{\"Level 2\":{\"<Let There Be Light>\":{\"A\":\"Passive\",\"Effect\":\"Grasp now casts Awe 2 times instead of 1.\\nYou can also split your Grasp to target 2 targets (1 Awe each).\\n\",\"Name\":\"<Let There Be Light>\"},\"<Let There Be Darkness>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters to edge\",\"Effect\":\"You create a 4x4 meter area of magical darkness.\\nAll attacks done from and towards units in the area have Partial Cover.\\n\",\"Name\":\"<Let There Be Darkness>\"},\"<Repentance>\":{\"A\":\"0.5 Actions\",\"Cost\":\"50% of your maximum health\",\"Range\":\"1 meter (touch)\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Restore 50% of an ally's maximum health, then cast Awe on yourself.\",\"Name\":\"<Repentance>\"}},\"Level 4\":{\"<Shadow Realm>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"A Unit within 6 meters becomes trapped in a Shadow Realm with you for 2 rounds (this and the next).\\nYour attacks against it cast Awe on it for free while inside the Shadow Realm.\\nNeither of you can interact with the outside world, but can feintly see it.\\nUnits on the outside can faintly see the two of you, as if you were ghosts.\\n\",\"Notes\":\"The Shadow Realm is a copy of the normal world, but with no other units.\",\"OrderOnWebsite\":3,\"Name\":\"<Shadow Realm>\"},\"<Circle of Awe>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters to edge\",\"Effect\":\"Declare a 4x4 area within 6 meters.\\nNow, and at the start of your next turn, cast Awe on all Units inside the area.\\n\",\"OrderOnWebsite\":1,\"Name\":\"<Circle of Awe>\"},\"<Black Hole>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You create a 1x1 Black Hole at a position.\\nCast Grasp for free on all enemies within 6 meters of the hole.\\nIf a Unit gets to the center of the Black Hole, it must pass a Might Check or be Snared.\\nAt the end of your turn, all Units within 6 meters of it are pulled 2 meters towards it.\\n\",\"Notes\":\"If 2 Units would be pulled to the center, you choose which.\",\"OrderOnWebsite\":2,\"Name\":\"<Black Hole>\"}}}},\"Life Cleric\":{\"Description\":\"You are a worshipper of life and/or death. Seek their balance, and seek balance within yourself.\\\\nYou have a Second Soul character, which is essentially another toned-down character you play.\",\"Starting Abilities\":{\"~Second Soul~\":{\"A\":\"Special\",\"Effect\":\"You have another character beside you: your 'minion'.\\nIt knows 1 + Your Level Basic Spells from the Maneuvers, Divine, Eldritch and Arcane spell lists.\\nIt has Training in one Weapon Category and gets Training in another again at levels 3, 6 and 9.\\nYou share the same Actions between yourselves.\\nIts main stat is Wisdom.\\nEx: If you used 0.5 Actions on your turn, your minion has 0.5 Actions left to use on its turn.\\n\",\"Stats\":{\"Health\":\"Determined by your minion's nature (see below)\",\"Defense\":3,\"Movement\":\"5 meters (land)\",\"Stats\":\"Assign the numbers (-1, 0, 1, 2, 3) in any order\",\"Languages\":\"Common and one more Common or Wild language that makes sense for it\",\"Initiative Bonus\":\"The minion rolls initiative separately with its own Dexterity + Charisma modifier.\"},\"Name\":\"~Second Soul~\"}},\"Choose your side\":\"Life Cleric!\\\\nPick only one of the following two abilities!\",\"Abilities\":{\"~True Necromancy~\":{\"A\":\"Passive\",\"Effect\":\"Your minion is a reanimated humanoid, whose soul is compelled to stay in this plane until its purpose is met.\\nCome up with a story about why you have an Undead minion and why your god allowed this or gave him or her to you.\\nAwe dice increases by 1 tier when healing yourself (or your minion).\\nYour minion shares the same Health pool with you.\\n\",\"Name\":\"~True Necromancy~\"},\"~Celestial Follower~\":{\"A\":\"Passive\",\"Effect\":\"Your minion is a Celestial being, whose task is to protect, guide or follow you until its purpose is met.\\nYour Celestial follower can be a humanoid or animal in appearance (it can't fly) and is sentient.\\nCome up with a story about why you have a Celestial follower, and why your god allowed this or gave him or her to you.\\nYour minion's max Health is always half of your max Health.\\n\",\"Notes\":\"If it's animal-shaped and you want to use the rules for weapon attacks, just pretend the minion bites or scratches, but apply normal weapon rules.\",\"OrderOnWebsite\":1,\"Name\":\"~Celestial Follower~\"}},\"Talents\":{\"Level 2\":{\"<Divine Message>\":{\"A\":\"10 minutes\",\"Cost\":\"1 Charge\",\"Cooldown\":\"24 Hours (in game)\",\"Effect\":\"You pray for 10 minutes to get an answer to a question from your god(s).\\nSet a real life timer of 10 minutes (time in which you can do anything out of the game).\\nWhen the timer expires, you can ask the DM one question consisting of maximum 3 words (e.g. 'Is sword cursed?').\\nThe answer you will get will consist of maximum 3 words.\\nThe DM can choose not to answer, to answer falsely or say something completely different. The gods' wills are unknowable.\\n\",\"Name\":\"<Divine Message>\"},\"<Disembodiment>\":{\"A\":\"2 hours\",\"Requirement\":\"True Necromancy\",\"Cooldown\":\"24 Hours\",\"Effect\":\"You are able to ever improve your minion by mix and matching parts from other corpses.\\nEvery time you use this ability, you must consume a fresh corpse from a Worthy enemy (maximum 2 hours after death) and you irreversably sacrifice something.\\nEach of these effects has a limited number of uses\\n- +1 Maximum Health (5 uses)\\n- +1 Defense for either you or your minion (2 uses)\\n- +1 Spell DC (1 use)\\n- +1 use of Awe per Long Rest (1 use)\\n\",\"Name\":\"<Disembodiment>\"},\"<Repentance>\":{\"A\":\"0 Actions\",\"Cost\":\"50% of your maximum health\",\"Range\":\"1 meter (touch)\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Restore 50% of an ally's maximum health.\",\"Notes\":\"You can't use this if you don't have at least 50% Health.\",\"OrderOnWebsite\":1,\"Name\":\"<Repentance>\"}},\"Level 4\":{\"<Life Echo>\":{\"A\":\"0 Actions\",\"Effect\":\"You put a Life Echo on an ally.\\nWhenever YOU heal another Unit, the unit with the Life Echo on them is also healed for 50% of that amount.\\nLasts 1 minute.\\n\",\"Notes\":\"If you put this on your True Necromancy follower, you essentially heal for 150% of the health.\",\"OrderOnWebsite\":2,\"Name\":\"<Life Echo>\"},\"<Dazzling Essence>\":{\"A\":\"Passive\",\"Effect\":\"Your follower's first Spell or Attack every encounter attempts to also Daze the target (against a Might Check).\\nWhenever you drop to (or below) 50% Health, this effect resets this encounter.\\n\",\"OrderOnWebsite\":3,\"Name\":\"<Dazzling Essence>\"},\"<Cleric Lich Ritual>\":{\"A\":\"Special\",\"Effect\":\"You spend 24 hours in a special place of power (this could be a temple or given to you by your DM).\\nAfter it's finished, you become a Lich, and you are considered Undead.\\nApply the following:\\n- You are Undead, thus immune to Charm, Fear and being put to Sleep\\n- You no longer need to eat, drink or sleep.\\n- You gain access to the Elemental and Eldritch Spell Lists.\\n- You can no longer cast Basic Spells, but gain 2 extra slots for known Advanced Spells. Passive Basic Spells still apply.\\n- The range of all your Spells is doubled.\\n- Your Health decreases by 5, but your Defense, Spell DC and all Combat Checks increase by 1.\\nYou also gain the following abilities:\\n- Phylactery\\n- Dismorphment\\n\",\"Notes\":\"Your Follower can still cast Basic Spells.\",\"OrderOnWebsite\":1,\"Name\":\"<Cleric Lich Ritual>\"},\"~Phylactery~\":{\"IsSubspell\":true,\"A\":\"Special\",\"Effect\":\"When you become a Lich, you place your soul inside a Phylactery - a special object, dear to you.\\nWhen you would reach 0 Health, instead of going Down, you can instantly teleport your body inside the Phylactery.\\nA spellcaster can channel during a whole Long Rest to resummon you near the Phylactery with full Health, Spells, etc.\\nIf the Phylactery is destroyed, you must wait 1 year to make another one.\\n\",\"Notes\":\"The Long Rest still applies to the channeler who revives you, and to you as well.\",\"Name\":\"~Phylactery~\"},\"~Dismorphment~\":{\"IsSubspell\":true,\"A\":\"Reaction or 0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"When a Unit declares an attack or Spell on you, you can instantly teleport up to 6 meters away.\\nThat Unit can keep their action or change it.\\nYou can also instantly teleport using 0 Actions on your turn.\\n\",\"Name\":\"~Dismorphment~\"}}}}}}");

/***/ }),
/* 17 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Class\":\"Druid\",\"Description\":\"Druids are protectors of the nature and master shapeshifters.\",\"Base Health\":9,\"Armor Training\":\"Medium Armor\",\"Language\":\"If your Intelligence is at least 1, you know Druidic, the secret and ancient language of Druids.\\nIf your Intelligence is at least 2, choose one Common, Wild or Elemental language you can speak.\\n\",\"Level Up\":{\"Every Level\":{\"Health\":5,\"Spells\":\"1 known Advanced Spell\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Exhaust-based\",\"Description\":\"Druid Abilities are Exhaust-based.\\nAs a Druid, you know a certain number of Advanced Abilities.\\nYou can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Wisdom\",\"Spell Grade\":\"6 + (Main Stat)\",\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Druid-specific abilities are considered spells (unless stated otherwise).\",\"Known Basic Spells\":\"2 + Your Intelligence\",\"Known Advanced Spells\":\"1 + Your Level\",\"Spell Lists\":[\"Elemental\",\"Nature\",\"Mysticism\"]},\"Starting Abilities Description\":[{\"Druidcraft\":\"Druids have the ability to create small magical effects that affect plants, animals or just nature.\\nYou can use the Druidcraft Spell in roleplay scenarios to affect the environment and people.\\n\"},{\"Shapeshift\":\"As a Druid, you can tranform into various animals, both in combat and outside of combat.\\nThe Shapeshift Spell provides an infinite amount of options to help out your party in any situation!\\nYou can choose any animal from the Animals list to Shapeshift into, as long as it's not Exotic or non-standard. Each Animal allows you to use its special Ability once per Long Rest. You are still only allowed to use that Ability once per Long Rest, even if you Shapeshift into that animal twice (the cooldown stays the same).\\nOther Druid Talents might allow you to Shapeshift into more unusual beasts.\\nShapeshift is considered a Spell.\\n{Separator}\\nWhen in Shapeshift form, you always have access to the Animal Attack Ability, which is not considered a Spell.\\nAnimal Attack is, of course, impaired if you are Crippled.\\n\"}],\"Starting Abilities\":{\"~Druidcraft~\":{\"A\":\"Depends\",\"Effect\":\"You can create harmless sensory effects or tiny weather effects (6 meters range).\\nYou can massively speed up the growth of small plants (touch range).\\nYou can slightly soothe physical pains (with no combat effect) (touch range).\\nYou can attempt to communicate simple ideas with animals and plants (3 meters range).\\nYou have +3 on rolls for identifying plants.\\nYou can do these even while Shapeshifted.\\n\",\"AlignOnWebsite\":\"Right\",\"Name\":\"~Druidcraft~\"},\"~Shapeshift~\":{\"A\":\"1 Action\",\"Cooldown\":\"2 times / Long Rest (see effect)\",\"Effect\":\"Pick an animal from the Animal Pets and Shapeshift Animals list and instantly transform into it.\\nAs soon as you Shapeshift, you can perform an Animal Attack.\\nYou gain that animal's Fortitude and Dexterity saves.\\nApply any other modifiers (except for base Stats) from that animal.\\nYou also gain its exact abilities.\\nWhile Shapeshifted, you can do Animal Attack.\\nWhile Shapeshifted, you can do any maneuvers you know. You can't cast spells.\\nWhen you Shapeshift, your Health stays the same, unless the animal states it has a bonus/minus to Health.\\nWhen Shapeshift ends, subtract back whatever health you added, or add back whatever health you subtracted.\\nWhen you end Shapeshift, if your health would be 0 or less, it stays at 1.\\nShapeshift ends if you drop to 0 Health, and you go Unconscious.\\nAt first, you can't fly, even if your animal can. If your animal can fly, you have Proficiency in Jumping and you can glide (you don't take falling damage).\\nFrom Level 3, you can use this 3 times per Long Rest.\\nFrom Level 6, you can use this 4 times per Long Rest and you can fly.\\nFrom Level 9, you can use this 5 times per Long Rest.\\n\",\"Notes\":\"You can't make attacks with ranged weapons while Shapeshifted (obviously).\\nYou choose what items you keep on you when Shapeshifting, and those items are 'merged' into your new form.\\nYou can turn back into your humanoid form for 0 Actions (on your turn).\\n\",\"OrderOnWebsite\":1,\"Name\":\"~Shapeshift~\"},\"~Animal Attack~\":{\"IsSubspell\":true,\"A\":\"1 Action\",\"Effect\":\"Make a melee attack for 2d8 + your Main Stat (not the animal's).\\n\",\"OrderOnWebsite\":2,\"Name\":\"~Animal Attack~\"}},\"Specializations\":{\"Description\":\"At Level 1, you can choose your coven (Specialization). A coven is a spiritual path you adhere to, and whose culture you represent.\",\"Choices\":[\"Coven of the Old Ways, using the old magic, worshipping old gods and drawing power from the sun, the moon and the stars\",\"Coven of the Wild, where your true fey or animalistic nature takes shape!\",\"Coven of the Wicked, where nature-infused eldritch magic overcomes your mind, body and soul\",\"Coven of the Land, a protector of the flora and fauna specific to your chosen domain\"]},\"Specs\":{\"Coven of the Old Ways\":{\"Description\":\"You worship the sun, the moon and the stars, for only they can truly guide your path.\\nPagan Druids believe no one has the right to dictate someone else's spiritual path.\\nAs a Pagan Druid, you oppose fanaticism, opressors and stupidity.\\nPagan Druids usually worship no god, but they do acknowledge their power and they heavily respect nature and the earth.\\nA Pagan Druid gains the power through not black, nor white magic.\\nThe suggested alignment for Pagan Druids is True Neutral.\\n\",\"Starting Abilities\":{\"~Day Night Cycle~\":{\"A\":\"Passive\",\"Effect\":\"Instead of knowing one set of spells, as normal, you know two: one for the moon, and one for the sun.\\nThe Moon spells can only be used at night (from end of dusk until start of dawn).\\nThe Sun spells can only be used at day (from start of dawn until end of dusk).\\nThe Sun spell set and the Moon spell set can not contain any of the same spell.\\n\",\"Notes\":\"So, in total, you know twice as many Basic and Advanced spells.\",\"Downside\":\"Once you prepare a spell for Day or Night, you can no longer assign it to the other one. Ever.\",\"Name\":\"~Day Night Cycle~\"},\"~Moonsun Fire~\":{\"A\":\"0.5 Actions\",\"Range\":\"6 meters\",\"Cooldown\":\"Day/Night (see below)\",\"Effect\":\"A target within 6 meters makes a Wisdom Check.\\nIf it fails, it takes 1d4 + Main Stat Fire Damage and is Crippled (if day) or True damage and is Silenced (if night).\\nIt takes half of that damage if it passes.\\nIf you use this at night, you can't use it until day, and vice versa.\\n\",\"Name\":\"~Moonsun Fire~\"}},\"Talents\":{\"Level 2\":{\"<Old Ritualist>\":{\"A\":\"10 minutes\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Unexhaust 3 Advanced Spells you have used (you can't use this on Druid-only spells).\\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\\n\",\"Downside\":\"You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.\",\"Name\":\"<Old Ritualist>\"},\"<Improved Moonsun Fire>\":{\"A\":\"Passive\",\"Effect\":\"If day, Moonsun Fire also burns the target for 10% of its total Health as Fire damage.\\nIf night, Moonsun Fire heals a target you choose within 6 meters for the same damage dealt.\\n\",\"Name\":\"<Improved Moonsun Fire>\"},\"<Lycanthropy>\":{\"A\":\"Passive\",\"Effect\":\"During the night (24:00 to 6:00) you can Shapeshift into a Lycanthrope (see Lycanthrope form) when using Shapeshift.\\n\",\"Name\":\"<Lycanthropy>\"},\"<Animal Companion>\":{\"A\":\"Passive\",\"Effect\":\"You have an animal pet that can fight alongside you!\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\nPets can't make Opportunity Attacks.\\n\",\"Name\":\"<Animal Companion>\"},\"<Pet Attack>\":{\"IsSubspell\":true,\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce of Slash Damage (your choice).\\n\",\"Name\":\"<Pet Attack>\"}},\"Level 4\":{\"<Regrowth>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Heal a Unit within 6 meters for 1d8 for each 10 Health it is missing.\",\"Name\":\"<Regrowth>\"},\"<Sunrise/Moonfall>\":{\"A\":\"Passive\",\"Effect\":\"Moonsun Fire now hits all Units within a 4x4 area you choose and deals an extra 2d4 Damage.\",\"Name\":\"<Sunrise/Moonfall>\"},\"<Equinox>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Day/Night\",\"Effect\":\"If it's day, choose up to Main Stat Units within 15 meters.\\nThey must pass a Wisdom Check or they forget to how to use ranged attacks or spells for 1 turn.\\nIf it's night, your next Spell (this turn or next turn) casts twice.\\n\",\"Name\":\"<Equinox>\"}}}},\"Coven of the Wild\":{\"Description\":\"You are heavily in touch with nature and with strange creatures, uncommon to the normal folk.\",\"Starting Abilities\":{\"~Wild Shape~\":{\"A\":\"Passive\",\"Effect\":\"When you use Shapeshift, you can transform into a combination of 2 animals.\\nYou take the highest stat from both animals, and you have access to both of their abilities.\\n\",\"Notes\":\"For example, you could transform into a combination of Bird of Prey and Bear, resulting in a kind of Owlbear, with a lot of health and a lot of Armor! Be creative!\\nThe animal size is either the larger or the smaller of the two - your choice.\\nEven if you Shapeshift into 2 combinations of a same animal, the cooldown of that animal's Ability persists (e.g. you can't use Bear's Maul twice per Long Rest, no matter what animal combination you transform into).\\n\",\"Name\":\"~Wild Shape~\"}},\"Talents\":{\"Level 2\":{\"<Forest Friend>\":{\"A\":\"Passive\",\"Effect\":\"You have a Pixie companion, a very small humanoid with wings.\\nThe Pixie has 10 Defense, 1 HP, 5 Movement Speed.\\nIt takes its turn at the same time as you and it has 0.5 Actions on its turn.\\nIt can't attack with weapons, but it can use scrolls and potions.\\nEvery Long Rest, you can teach it one Basic Spell that costs 0.5 Actions from any Spell List and it can cast it once for 0.5 Actions until the next Long Rest.\\nIf the Pixie goes more than 50 meters away from you, it becomes unsummoned (you can summon it back by channeling for 10 minuets).\\nThe Pixie has Charisma, Wisdom and Intelligence equal to yours, but its Dexterity is 0 and its Might is -5.\\nDecide with your DM whether you or the DM controls the Pixie roleplay-wise.\\nHave fun!        \\n\",\"Name\":\"<Forest Friend>\"},\"<Treesposition>\":{\"A\":\"0 Actions or Reaction\",\"Cooldown\":\"2 times / Long Rest\",\"Effect\":\"Touch a large or larger piece of wood and choose one of the following:\\n1. Teleport near another large or larger piece of wood within 5 meters.\\n2. Partially enter the piece of wood, becoming camouflaged. You have +5 Stealth until you exit back to your normal space.\\nYou can stay like that for up to 1 hour.\\nYou benefit from Cover while inside a tree.\\nAs a Reaction, you can use this when you are attacked or right when someone casts a spell (before the roll).\\n\",\"Name\":\"<Treesposition>\"},\"<Exotic Shapeshift>\":{\"A\":\"Passive\",\"Effect\":\"You can now Shapeshift into Exotic Animals.\\nYou can also use Shapeshift to also transform into other people.\\nWhen you want to do this, roll a Deception check.\\nThis check determines how close you get to the form of that person (12 or more means a perfect copy).\\nThis copy just mimicks the look of the person, not the voice or personality.\\n\",\"Name\":\"<Exotic Shapeshift>\"}},\"Level 4\":{\"<Shapeshift Ally>\":{\"A\":\"0 Actions\",\"Cost\":\"1 use of Shapeshift\",\"Effect\":\"Passively, you get 2 more uses of Shapeshift per Long Rest.\\nChoose a willing ally within 6 meters and Shapeshift them into an standard animal of your choice.\\nThey have Animal Attack and all of the animal's Abilities.\\nThey can cancel it for 0 Actions on their turn.\\n\",\"Name\":\"<Shapeshift Ally>\"},\"<Regrowth>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Heal a Unit within 6 meters for 1d8 for each 10 Health it is missing.\",\"Name\":\"<Regrowth>\"},\"<Beastly Stamina>\":{\"A\":\"Passive\",\"Effect\":\"For each animal, you gain an extra use of their Long Rest Abilities (per Long Rest).\",\"Name\":\"<Beastly Stamina>\"}}}},\"Coven of the Wicked\":{\"Description\":\"Witch druids use eldritch magic of the nature to bend reality in an unseen way, cast curses and dispell magic.\\nHowever, this comes at a price, usually of its own sanity and control over the powers.\\nWiccan Druids believe no one has the right to dictate someone else's spiritual path.\\nAs a Wiccan Druid, you oppose fanaticism, opressors and stupidity.\\nWiccan Druids worship no god, but they do acknowledge their power and they heavily respect nature and the earth.\\nA Wiccan Druid gains the power through not black, nor white eldritch magic.\\nThe suggested alignment for Wiccan Druids is True Neutral.\\n\",\"Starting Abilities\":{\"~Eldritch Spells\":{\"A\":\"Passive\",\"Effect\":\"You can also learn Spells from the Eldritch Spell List.\",\"Name\":\"~Eldritch Spells\"},\"~Blood Magic~\":{\"A\":\"0 Actions\",\"Cost\":\"6 Health\",\"Effect\":\"Unexhaust an Exhausted Advanced Spell from your Spell Lists.\",\"Name\":\"~Blood Magic~\"},\"~Black Charm~\":{\"A\":\"0 Actions\",\"Range\":\"10 meters\",\"Effect\":\"Choose a target.\\nAt the start of your next turn, it must pass a Wisdom Check or be Stunned and take 3d12 - 2 Psychic damage.\\nIf it passes, it takes half of the damage.\\n\",\"Name\":\"~Black Charm~\"}},\"Talents\":{\"Level 2\":{\"<Future Blood>\":{\"A\":\"Passive\",\"Effect\":\"Blood Magic can now draw Health from your Extra Health Pool.\\nYour Extra Health Pool increases by 8.\\n\",\"Name\":\"<Future Blood>\"},\"<Old Ritualist>\":{\"A\":\"10 minutes\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Unexhaust 3 Advanced Spells you have used (you can't use this on Druid-only spells).\\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\\n\",\"Downside\":\"You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.\",\"Name\":\"<Old Ritualist>\"},\"<Animal Companion>\":{\"A\":\"Passive\",\"Effect\":\"You have an animal pet that can fight alongside you!\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\nPets can't make Opportunity Attacks.\\n\",\"Name\":\"<Animal Companion>\"},\"<Pet Attack>\":{\"IsSubspell\":true,\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce of Slash Damage (your choice).\\n\",\"Name\":\"<Pet Attack>\"}}}},\"Coven of the Land\":{\"Description\":\"The Druid of the Land is a guardian of its own domain. Be it a lush forest, a snowy mountain or a rocky cave, the Druid of the Land knows its own ways.\",\"Starting Abilities\":{\"~Circle of the Land~\":{\"A\":\"Passive\",\"Effect\":\"You know 2 more Basic Spells from the Nature spell list.\\nWhen you transform into an animal native to your domain, heal for 1d4 health.\\nChoose one domain from: Mountains, Forest, Sea and Desert. Choose one of the Abilities below corresponding to your domain:\\n\",\"Name\":\"~Circle of the Land~\"}},\"Abilities\":{\"~Raise Wall~\":{\"A\":\"0 Actions\",\"Range\":\"6 meters to margin\",\"Cooldown\":\"2 times / Long Rest\",\"Effect\":\"You raise a wall of stone, dirt or other such material from the ground, 1x3x2 (1 meter thick, 3 wide, 2 tall).\\nEnemies hit directly by the wall growing from below them take 1d6 Smash damage.\\n\",\"Notes\":\"You can instantly crumble the wall on your turn by using 0 Actions.\\nYou can't raise a wall under another wall, but you can cast this Spell twice to grow a wall twice as tall.\\n\",\"Name\":\"~Raise Wall~\"},\"~Wild Roots~\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Roots spawn from your position (next to you) and travel 10 meters.\\nYou control how the roots travel (they 'move' like a normal Unit).\\nAll Units they pass through take 2d8 Pierce damage and must pass a Dexterity Check or be Snared.\\n\",\"Name\":\"~Wild Roots~\"},\"~Storm~\":{\"A\":\"0 Actions\",\"Range\":\"6 meters to margin\",\"Effect\":\"Target a 4x4x4 meter area and create a storm there.\\nCreatures inside the sand storm are Blinded and the storm acts as hard terrain.\\nOn your turn, you can use 0.5 Actions to move the Storm up to 2 meters in any direction.\\nLasts 1 minute.\\n\",\"Name\":\"~Storm~\"},\"~Endurance~\":{\"A\":\"Passive\",\"Effect\":\"You gain +1 on all Combat Checks and +5 to your maximum Health.\\n\",\"Name\":\"~Endurance~\"}},\"Talents\":{\"Level 2\":{\"<Old Ritualist>\":{\"A\":\"10 minutes\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Unexhaust 3 Advanced Spells you have used (you can't use this on Druid-only spells).\\nThe Old Ritual must be performed outdoors, in a safe, uncorrupted place untouched by regular folk.\\n\",\"Downside\":\"You permanently lose the Shapeshift ability, and you can never choose Talents that improve Shapeshift.\",\"Name\":\"<Old Ritualist>\"},\"<Innervate>\":{\"A\":\"0 Actions\",\"Range\":\"6 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Heal an ally for 3 Health and it regains 1 Charge or unexhausts one Advanced Spell.\\n\",\"Downside\":\"Can not be cast on other Druids.\",\"Name\":\"<Innervate>\"},\"<Animal Companion>\":{\"A\":\"Passive\",\"Effect\":\"You have an animal pet that can fight alongside you!\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\nPets can't make Opportunity Attacks.\\n\",\"Name\":\"<Animal Companion>\"},\"<Pet Attack>\":{\"IsSubspell\":true,\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce of Slash Damage (your choice).\\n\",\"Name\":\"<Pet Attack>\"}},\"Level 4\":{\"<Regrowth>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Heal a Unit within 6 meters for 1d8 for each 10 Health it is missing.\",\"Name\":\"<Regrowth>\"},\"<Dazzling Miasma>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Shoot a tainted gust of spores in a 10x1 meter line from your position.\\nIt hits the first 2 Units it travels into.\\nIf you hit one Unit, it must pass a Might Check or take 4d10 Poison damage (or half of that if it passes).\\nIf you hit 2 Units, they must pass a Might Check or be Stunned and take 1d10 Poison damage (or half of that if they pass).\\n\",\"Name\":\"<Dazzling Miasma>\"},\"<Animate Plants>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Choose 3 plants you can see. They become animated and fight for you.\\nThe Abilities and stats of the plant depends on what type of plant it is (see the Pets page).\\nYou don't control your plants; they attack the closest enemy to them, or use their Ability when they can.\\nWhen a Plant reaches 0 Health, it doesn't die, but it becomes de-animated.\\nPick the plant type from the Druid Plants list that fits the plant the best.\\nLasts up to 10 minutes.\\n\",\"Name\":\"<Animate Plants>\"}}}}}}");

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TableNormal; });
/* harmony import */ var _TableNormal_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(41);
/* harmony import */ var _TableNormal_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_TableNormal_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function TableNormal(_ref) {
  var children = _ref.children,
    columns = _ref.columns,
    type = _ref.type;
  if (type == null) type = 'normal';
  var tableTypeClass = type == 'info' ? 'table--info' : 'table--normal';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "table-normal-container-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "table-normal-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "table-normal__header-row-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", {
    className: tableTypeClass,
    cellSpacing: "0"
  }, " ", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tr", null, columns.map(function (col) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("th", null, col);
  }))), " ")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "table-normal-wrapper"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("table", {
    className: tableTypeClass,
    cellSpacing: "0",
    css: "border: solid red 3px"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("tbody", null, children)))));
}

/***/ }),
/* 19 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Ideas\":[\"Instead of choosing a preferred enemy, you just get a bonus after killing an enemy type\"],\"Class\":\"Hunter\",\"Description\":\"You are a hunter, tracker, always on your toes. No matter your foe, be it a beast, a vampire or a dragon, you know best how to deal with it.\",\"Armor Training\":\"Medium Armor\",\"Base Health\":6,\"Language\":\"If your Intelligence is at least 1, choose one Common or Wild language you can speak.\",\"Level Up\":{\"Every Level\":{\"Health\":5,\"Spells\":\"1 known Advanced Spell\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Exhaust-based\",\"Description\":\"Hunter Abilities are Exhaust-based.\\nAs a Hunter, you know a certain number of Advanced Abilities.\\nYou can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Wisdom\",\"Spell DC\":\"6 + (Main Stat)\",\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Hunter-specific abilities are considered maneuvers (unless stated otherwise).\",\"Known Basic Spells\":\"1 + Your Intelligence\",\"Known Advanced Spells\":\"2 + Your Level\",\"Spell Lists\":[\"Maneuvers\",\"Nature\"]},\"Starting Abilities\":{\"~Slay~\":{\"A\":\"Passive\",\"Effect\":\"You always know the type of a monster.\\nYou gain a different bonus when fighting an enemy of a certain type:\\nMonstrosities: Attacks against Monstrosities ignore half of the Defense.\\nBeasts: You have +1 Defense and +1 to all Combat Checks against Beasts.\\nFiends: Your attacks against Fiends ignore damage resistances (but not immunities).\\nUndead: You have +2 Spell DC against Undead.\\n\",\"Name\":\"~Slay~\"},\"~Tumble~\":{\"AlignOnWebsite\":\"Right\",\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Move 1 meter in any direction, without triggering attacks of oportunity.\",\"Name\":\"~Tumble~\"}},\"Starting Abilities Description\":[{\"Slay and Tumble\":\"You have various different bonuses when fighting certain types of enemies. If unsure about the type of a monster, ask the DM.\"},{\"Tumble\":\"Generally, when you move outside of a monster's attack range, it can make a free attack on you. Tumble allows you to reposition so that you can easily exit that zone.\\n\"}],\"Specializations\":{\"Description\":\"At Level 1, you can choose your specialization.\",\"Choices\":[\"Draven, a tracker and hunter of beats and men, never lost and never without purpose\",\"Warden, a potent user of fast and practical magic to use against foes, and with allies\",\"Beastmaster, a pack hunter, who finds friends in even the most ruthless of beasts\"]},\"Specs\":{\"Draven\":{\"Description\":\"lorem\",\"Starting Abilities\":{\"~Tracker~\":{\"A\":\"Passive\",\"Effect\":\"o You can more easily track creatures.\\nWhen you try to track a creature, your roll for that try gains +3.\\nIf you succeed, you may learn about its size, how many of them there are, if it's injured or roughly how far away it is.\\no Your party can't get lost in the wild except by magical means\\no You (and your pets) are unaffected by Difficult Terrain.\\n\",\"Name\":\"~Tracker~\"},\"~Hunter Mark~\":{\"A\":\"0 Actions\",\"Range\":\"15 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Choose and mark a target.\\nYour single target attacks (against Defense) against the marked target have the damage dice increased by 1 tier.\\nWhen the target with the mark dies, you can use your Reaction to freely move the mark to another enemy.\\n\",\"Notes\":\"Increasing dice by 1 tier means, for example, d6 become d8, or d10 become d12.\\nD12's don't increase.\\n\",\"Name\":\"~Hunter Mark~\"}},\"Talents\":{\"Level 2\":{\"<Animal Companion>\":{\"AlignOnWebsite\":\"Right\",\"A\":\"Passive\",\"Effect\":\"You have an animal pet that can fight alongside you!\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\nPets can't make Opportunity Attacks.\\n\",\"Name\":\"<Animal Companion>\"},\"<Pet Attack>\":{\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce or Slash Damage (your choice).\\n\",\"Name\":\"<Pet Attack>\"},\"<Flare Shot>\":{\"A\":\"Reaction or 0 Actions\",\"Range\":\"15 meters\",\"Cooldown\":\"Once Per Combat\",\"Effect\":\"Quickly shoot a flare at a target point.\\nThe area around the flare lights up in a 6 meter radius, creating normal light.\\nWhen cast, all allies in the area are cleared of Stun, Fear or Cripple.\\nAllies in the area have Advantage on rolls against Fear.\\nThe flare lasts 1 minute.\\n\",\"Notes\":\"But seriously, get the Animal Companion. Why would you even pick this?\",\"Name\":\"<Flare Shot>\"}},\"Level 4\":{\"<Crosshair Shot>\":{\"A\":\"1 Action\",\"Range\":\"16 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Make an attack on a target.\\nFor each meter to the target, the attack deals 1d6 Pierce damage, up to 8 meters.\\nFor each meter to the target over 8 meters, deal one less d6.\\n\",\"Notes\":\"At exactly 8 meters range, the attack deals 8d6 damage. At 7 and 9 meters, it deals 7d6. At 6 and 10 meters, 6d6. And so on.\",\"Name\":\"<Crosshair Shot>\"}}}},\"Warden\":{\"Description\":\"Lorem :)\",\"Starting Abilities\":{\"~Warden~\":{\"A\":\"Passive\",\"Effect\":\"Your Spellcasting type becomes Charge-based instead of Exhaust-based.\\nYou have a number of Charges equal to 3 + Your Level.\\nChoose 2 more Advanced or Basic Spells to know permanently from the Elemental, Divine and Arcane spells list.\\n\",\"Notes\":\"Explanation for Charge-based:\\nInstead of being able to cast each Advanced Ability you know once per Long Rest, you now have a set number of Charges.\\nYou can expend 1 Charge to cast 1 Advanced Ability (and there is no limit to how many times you can cast it).\\nYour Charges recover on Long Rests.\\n\",\"Name\":\"~Warden~\"},\"~Quick Magic~\":{\"A\":\"0 Actions\",\"Cost\":\"1 or more Charges\",\"Cooldown\":\"Once per Turn\",\"Effect\":\"Spend any number of Charges.\\nChoose one of the following effects, then apply the exact same effect for each Charge spent:\\n- Instantly deal 1d6 Fire, Frost or Shock damage to a target, and permanently reduce its Defense by 1 (3 meter range).\\n- Instantly heal a target for 1d6 (3 meter range).\\n- Instantly dash 3 meters, ignoring attacks of oportunity, and going through enemies and small obstacles or medium gaps.\\n\",\"Name\":\"~Quick Magic~\"}},\"Talents\":{\"Level 2\":{\"<Animal Companion>\":{\"A\":\"Passive\",\"Effect\":\"You have an animal pet that can fight alongside you!\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Health: Half of yours\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\nPets can't make Opportunity Attacks.\\n\",\"Name\":\"<Animal Companion>\"},\"<Pet Attack>\":{\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce of Slash Damage (your choice).\\n\",\"Name\":\"<Pet Attack>\"},\"<Watcher Form>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You take on a special form, called a Watcher Form.\\nYour body becomes engulfed in a magical aura (you choose its color), your eyes glow, and you can gain other aesthetics-only body transformations (customize it with your DM).\\nWhile in this form, your first Attack deals +1d8 damage once per turn, you gain +2 Spell DC and +2 to all Combat Checks.\\nAlso, when you cast a spell (before you do; excluding this), you can instantly dash 3 meters, ignoring attacks of oportunity, and going through enemies and small obstacles or medium gaps.\\nLasts up to 1 minute.\\n\",\"Name\":\"<Watcher Form>\"},\"<Combo Set>\":{\"A\":\"Passive\",\"Effect\":\"You gain Quickfire, Parry and Tumblestrike.\",\"Name\":\"<Combo Set>\"},\"<Quickfire (Hunter)>\":{\"IsSubspell\":true,\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Perform an attack with a 1-Handed weapon.\\nThis attack ignores Cover and has no pentaly if you're Blinded.\\nThis attack does not trigger attacks of oportunity and can be used in melee range without penalty if it's a ranged weapon.            \\n\",\"Name\":\"<Quickfire (Hunter)>\"},\"<Parry>\":{\"IsSubspell\":true,\"A\":\"Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"When a Unit declares a melee attack with a weapon on you (before you see the roll), you can block this attack and it deals 0 damage.\",\"Name\":\"<Parry>\"},\"<Tumblestrike>\":{\"IsSubspell\":true,\"A\":\"Passive\",\"Effect\":\"After you Tumble or Parry, your next Attack has the dice tiers increased.\",\"Notes\":\"For example, instead of 2d6, an attack would be 2d8.\\nD12's don't increase, they stay d12.\\nThis only affects Attacks. If an Ability tells you to Attack, then it applies.\\nFor example, Quick Magic is not an attack.\\n\",\"Name\":\"<Tumblestrike>\"}},\"Level 4\":{\"<Warden Corral>\":{\"A\":\"0 Actions\",\"Range\":\"10 meters to edge\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Declare a 6x6 meter zone.\\nAll Units have their Defense quartered (25%) while in that zone.\\nThe zone lasts until the start of your next turn.\\n\",\"Name\":\"<Warden Corral>\"},\"<Wind Wall>\":{\"A\":\"Reaction (or 0 Actions)\",\"Range\":\"6 meters to an end\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Use when an enemy or enemy group declares an attack.\\nCreate a 4x4 meter wall of powerful Wind that destroys all projectiles.\\nIt can't be passed through from the direction it is facing towards.\\nLasts for 1 minute.\\n\",\"Notes\":\"The wall pushes objects or willing Units away from it and can be used as a platform.\\nIf you decide to place it horizontally, it acts as Hard Terrain.\\n\",\"Name\":\"<Wind Wall>\"}}}},\"Beastmaster\":{\"Description\":\"Lawrrremm!!!\",\"Starting Abilities\":{\"~Animal Companion~\":{\"A\":\"Passive\",\"Effect\":\"You have an animal pet that can fight alongside you!\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Health: Half of yours\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\nPets can't make Opportunity Attacks.\\n\",\"Name\":\"~Animal Companion~\"},\"~Pet Attack~\":{\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce of Slash Damage (your choice).\\n\",\"Name\":\"~Pet Attack~\"}},\"Talents\":{\"Level 2\":{\"<Second Animal Companion>\":{\"A\":\"Passive\",\"Effect\":\"You have one more Animal Companion, aside from the one you get from your Beastmaster Companion.\\nThis Animal Companion obeys the same rules as the regular one.\\n\",\"Name\":\"<Second Animal Companion>\"},\"<Exotic Trainer>\":{\"A\":\"Passive\",\"Effect\":\"Instead of your normal pets, you can choose from the Exotic list of pets.\",\"Name\":\"<Exotic Trainer>\"}},\"Level 4\":{\"<Ravage!>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Your pet makes a melee Attack for 4d8 Slash damage.\\nDeals Main Stat extra damage if the target is below 50% Health.\\nThe target can't regain Health until the end of combat\\n\",\"Notes\":\"This takes 1 Action from YOU, not your pet.\",\"Name\":\"<Ravage!>\"},\"<Sickem>\":{\"A\":\"Reaction\",\"Effect\":\"Use when a Unit goes flying against its will and on another Unit's turn.\\nYour pet(s) within 5 meters of its landing place can dash to it (after it lands) and make a total of 3 Pet Attacks on it.\\nPets don't provoke Opportunity Attacks when dashing like this.\\n\",\"Notes\":\"Goes flying means is pushed, knocked up, dragged, etc.\\nThis uses YOUR Reaction, not your pets'.\\nObviously, the pets need line of sight and can't jump through walls, or over large obstacles. Apply common sense.\\n\",\"Name\":\"<Sickem>\"}}}}}}");

/***/ }),
/* 20 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Ideas\":[\"Book is alive!!\"],\"Class\":\"Mage\",\"Description\":\"Mages are powerful spellcasters who gain their powers through either study or ust pure talent.\",\"Base Health\":3,\"Armor Training\":\"Light Armor\",\"Language\":\"You speak one extra Common language of choice.\\nIf your Intelligence is at least 2, choose one more Higher or Common language you can speak.\\n\",\"Level Up\":{\"Every Level\":{\"Health\":4,\"Spells\":\"1 known Spell\",\"Charges\":\"1 Charge\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Charge-based\",\"Description\":\"Mage Abilities are Charge-based.\\nAs a Mage, you have a number of Charges.\\nTo cast any Advanced Ability from your known spells, you must expend 1 Charge (or according to its Cost).\\nYou don't have restrictions for how many times you can cast a spell per Long Rest, but you have restrictions on your Charges.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Intelligence\",\"Spell DC\":\"6 + (Main Stat)\",\"Charges\":{\"Amount\":3,\"Regain\":\"You regain all Charges back when you Long Rest.\"},\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Mage-specific abilities are considered spells (except Magic Mastery).\",\"Known Spells\":\"3 + Your Intelligence + Your Level\",\"Spell Lists\":[\"Elemental\",\"Arcane\",\"Conjuration\",\"Mysticism\"]},\"Starting Abilities\":{\"~Magic Mastery~\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge\",\"Effect\":\"The next ability you use that has the cost of 1 Action now costs 0.5 Actions.\\nThis is considered a Maneuver.\\n\",\"Name\":\"~Magic Mastery~\"}},\"Starting Abilities Description\":[{\"Magic Mastery\":\"Magic Mastery can convert a Spell from 0.5 Actions to 1 Action.\\nYou can use this twice per turn or multiple times per turn to dish out a lot of spells in quick succession, in a single turn.\\nIt is considered a maneuver because some other Mage abilities affect Spells specifically, so Magic Mastery is unaffacted by them.\\n\"}],\"Specializations\":{\"Description\":\"At Level 1, you can choose your specialization. Every Mage can choose from the following Mage specializations\",\"Choices\":[\"Sorcerer, a born user of magic, floating with the hard to control magic itself\",\"Wizard, who became a master of magic through intense study, and carries its spells in an indispensible tome\",\"Artificer, who is dedicated to creation, research and experimentation with magical potions, scrolls and magical items!\"]},\"Specs\":{\"Sorcerer\":{\"Description\":\"Lorem!!\",\"Starting Abilities\":{\"~Charisma Caster~\":{\"AlignOnWebsite\":\"Left\",\"A\":\"Passive\",\"Effect\":\"You can freely use Charisma as your Main Stat, if you choose to do so.\",\"Name\":\"~Charisma Caster~\"},\"~Innate Magic~\":{\"AlignOnWebsite\":\"Right\",\"A\":\"Passive\",\"Effect\":\"When you cast a spell, if it's different than the previous spell you casted, the previous spell becomes Exhausted, even if it's a Basic Spell.\\nThis means you can't use that previous spell until your next Long Rest.\\n\",\"Notes\":\"Example: 3 turns in a row, you cast Fire Bolt; next turn, you cast Magic Missiles; after this, you can't cast Fire Bolt again until the next Long Rest.\\n\",\"Name\":\"~Innate Magic~\"},\"~Overcharge~\":{\"AlignOnWebsite\":\"Left\",\"A\":\"Passive\",\"Effect\":\"After you cast a spell the 3rd time in a row, your next ability benefits from Magic Mastery.\\nAfter this, that spell becomes Exhausted and can't be used until the next Long Rest.\\n\",\"Name\":\"~Overcharge~\"}},\"Talents\":{\"Level 2\":{\"<Eldritch Specialization>\":{\"AlignOnWebsite\":\"Right\",\"A\":\"Passive\",\"Effect\":\"You gain access to the Eldritch Spell List, and when you cast an Eldritch Spell, you can choose to split the d8's into 2d4's and d12's into 2d6's.\\n\",\"Notes\":\"For example, if a Spell deals 2d8 damage, that becomes 4d4.\\nit might sound like the same thing, but because of math, 4d4 is actually, on average, 1 extra damage compared to 2d8.\\n\",\"Name\":\"<Eldritch Specialization>\"},\"<Wild Cast>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Roll 1d6 and 1d8. This spell has the effect of the 2 combined rolls.\\nFor the 1d6:\\n1. Attack a target for 3d6 Fire Damage\\n2. A target must pass a Dexterity Check or take 2d8 Cold Damage (or half if it passes).\\n3. Target all Units in a 4x4 area. Attack them all for 2d6 + 2 Shock Damage.\\n4. Two Units instantly take 6 Force Damage.\\n5. Attack all units in a 6x1 line from your position for 4d4 Pierce Damage.\\n6. One Unit you choose takes 1d10 Force Damage and is pushed 3 meters away from you.\\nFor the 1d8:\\n1. Nothing else happens.\\n2. Target(s) all take an extra 2d6 Damage (directly) of the damage type of the 1d6 effect..\\n3. Target(s) must pass an Dexterity Check or be Snared.\\n4. Target(s) must pass an Dexterity Check or be Crippled.\\n5. Target(s) must pass an Intelligence Check or be Silenced.\\n6. Target(s) must pass a Wisdom Check or be Feared.\\n7. Target(s) must pass a Wisdom Check or be Dazed.\\n8. Target(s) must pass a Might Check or be Stunned.\\n\",\"Name\":\"<Wild Cast>\"},\"<Wild Magic>\":{\"AlignOnWebsite\":\"Right\",\"A\":\"Passive\",\"Effect\":\"Whenever you cast an Advanced Spell or use Magic Mastery, roll 1d12.\\nIf you roll 12, something wild happens!\\n\",\"Name\":\"<Wild Magic>\"}},\"Level 4\":{\"<Arcane Comet>\":{\"AlignOnWebsite\":\"Left\",\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"8 meters\",\"Effect\":\"Shoot a comet that changes in power the longer it travels - it deals damage and Crowd Controls a target.\\nIt deals 1d4 Force damage (against Defense) for every meter it travels (up to 8d4).\\nHowever, the longer it travels, the weaker it's Crowd Control is.\\nApply the following Crowd Control (directly) to the target depending on the distance traveled (distance between you and the target):\\n- 1 or 2 meters: Stun\\n- 3 or 4 meters: Daze\\n- 5 or 6 meters: Snare\\n- 7 or 8 meters: None\\n\",\"Name\":\"<Arcane Comet>\"},\"<Star Burst>\":{\"AlignOnWebsite\":\"Right\",\"A\":\"0.5 Actions\",\"Cost\":\"1 Charge\",\"Effect\":\"Declare up to 4 different targets within 15 meters.\\nAssign a different number from #1 to #4 to each.\\nRoll (3 + Main Stat) d4's. Each number deals that much Shock damage to the target with that number.\\nEach rolled 1 deals 1 damage to target number #1.\\nEach rolled 2 deals 2 damage to target number #2.\\nAnd so on.\\n\",\"Notes\":\"E.g. if you put #2 on a goblin, and you roll three 2's on the d4's, then that goblin takes 6 Force damage.\\nYou should probably assign the higher number to the target you want to do most damage to.\\nYou can declare fewer targets, but then the missing number will deal damage to no target.\\n\",\"Name\":\"<Star Burst>\"},\"<Honorificabilitudinitatibus>\":{\"AlignOnWebsite\":\"Left\",\"A\":\"Passive\",\"Effect\":\"Your single-target Spells that deal half damage when a target passes a Check now deal the full damage regardless.\",\"Notes\":\"That means spells like Acid Burst don't even require a Check anymore.\",\"Name\":\"<Honorificabilitudinitatibus>\"}}}},\"Wizard\":{\"Description\":\"Hmm, lorem...\",\"Starting Abilities\":{\"~Spell Book~\":{\"A\":\"Passive\",\"Effect\":\"You have a special Spell Book.\\nEach Long Rest, you can prepare one Advanced Spell you can known.\\nYou can cast this Spell once until the next Long Rest, without using a Charge.\\nThen it becomes Exhausted.\\n\",\"Name\":\"~Spell Book~\"},\"~Magic Expertise~\":{\"A\":\"Passive\",\"Effect\":\"You can cast Level 4 spells from Level 1, and Level 8 spells from Level 4.\\n\",\"Name\":\"~Magic Expertise~\"}},\"Talents\":{\"Level 2\":{\"<Counterspell>\":{\"A\":\"Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"When a Unit you can see casts a Spell, cancel it. It loses the Action (but not the Charge).\",\"Name\":\"<Counterspell>\"},\"<Conjuration Specialization>\":{\"A\":\"Passive\",\"Effect\":\"Whenever you cast a Conjuration Advanced Spell, gain Shielding equal to your Main Stat.\",\"Name\":\"<Conjuration Specialization>\"},\"<Arcane Specialization>\":{\"A\":\"Passive\",\"Effect\":\"Whenever you cast an Arcane Advanced Spell, shoot a magic missile at a target within 4 meters that instantly deals 1d4 Force Damage.\",\"Name\":\"<Arcane Specialization>\"},\"<Eldritch Specialization>\":{\"A\":\"Passive\",\"Effect\":\"You gain access to the Eldritch Spell List, and when you cast an Eldritch Spell, you can choose to split the d8's into 2d4's and d12's into 2d6's.\\n\",\"Notes\":\"For example, if a Spell deals 2d8 damage, that becomes 4d4.\\nit might sound like the same thing, but because of math, 4d4 is actually, on average, 1 extra damage compared to 2d8.\\n\",\"Name\":\"<Eldritch Specialization>\"},\"<Force Pulse>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"All enemies within 10 meters must pass a Might Check or be knocked Prone and take 1d4 Force damage.\",\"Name\":\"<Force Pulse>\"}},\"Level 4\":{\"<Crystal Mage>\":{\"A\":\"Passive\",\"Effect\":\"You become a Crystal Mage.\\nAll your spells that deal Fire, Cold or Force damage now deal a special type of damage, Crystal damage.\\nYou also get the following Crystal Abilities.\\n\",\"Notes\":\"Almost no creature has resistance or immunity specifically to Crystal damage.\",\"Name\":\"<Crystal Mage>\"},\"<Battle Mage>\":{\"A\":\"Passive\",\"Effect\":\"While you have an even number of Charges, your first melee weapon attack each turn deals an extra 1d6 Fire or Cold damage (your choice).\\nThis can only happen if you're wearing Heavy Armor (Scale Mail or Plate Armor) or a Shield.\\nYou also get either Training in Shields, or one free Technique Feat of choice.\\n\",\"Name\":\"<Battle Mage>\"},\"<Arcane Comet>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"8 meters\",\"Effect\":\"Shoot a comet that changes in power the longer it travels - it deals damage and Crowd Controls a target.\\nIt deals 1d4 Force damage (against Defense) for every meter it travels (up to 8d4).\\nHowever, the longer it travels, the weaker it's Crowd Control is.\\nApply the following Crowd Control (directly) to the target depending on the distance traveled (distance between you and the target):\\n- 1 or 2 meters: Stun\\n- 3 or 4 meters: Daze\\n- 5 or 6 meters: Snare\\n- 7 or 8 meters: None\\n\",\"Name\":\"<Arcane Comet>\"},\"~Crystal Bolt~\":{\"IsSubspell\":true,\"A\":\"1 Action\",\"Range\":\"Exactly 6 meters\",\"Effect\":\"Attack a Unit exactly 6 meters away for 4d4 Crystal Damage.\\nThe target and all Units within 1 meter of it also take Main Stat Crystal damage afterwards.\\n\",\"Name\":\"~Crystal Bolt~\"},\"~Diamondize~\":{\"IsSubspell\":true,\"A\":\"Reaction\",\"Cooldown\":\"Long Range\",\"Effect\":\"Use when you would take damage.\\nPrevent the damage and become invulnerable and Stunned until the start of your next turn.\\n\",\"Name\":\"~Diamondize~\"},\"~Cutting Field~\":{\"IsSubspell\":true,\"A\":\"1 Action\",\"Cost\":\"1 Charge\",\"Cooldown\":\"1 use / Combat\",\"Effect\":\"All units in a 90 degree, 6 meter long cone take 4d4 Crystal Damage.\\nCreate spikes on all empty spaces (1x1 meter size each space).\\nWhenever a Unit steps on a spike, it takes 1d4 Crystal Damage and shatters the spike.\\n\",\"Name\":\"~Cutting Field~\"}}}},\"Artificer\":{\"Description\":\"Losum iprem\",\"Starting Abilities\":{\"~Artificer~\":{\"A\":\"Special\",\"Effect\":\"You own a set of Artificer's Tools, with which you can create potions, scrolls and other items.\\nSome of your class spells require you to use your Artificer's Tools (described below).\\nIf they require you to spend Charges, those Charges become locked and can't be regained through any means, until the item created is used or destroyed.\\nFor 1 Action, you can summon or vanish your Artificer's Tools.\\nFurthermore, you can use your Artificer's Tools for 10 minutes to make items shed light, emmit a sound or smell or paint surfaces in rough images or writing. The magical effects last for up to 8 hours.\\nFeel free to be creative with what you can do - the tools might do other small artificer tasks as well. Ask your DM!\\n\",\"Notes\":\"Spells noted as 'Artificer' require you to use Artificer's Tools.\\nIf you ever lose your Artificer's Tools, the price for a new set is 200 gold.\\nAs usual, items created this way require 0.5 Actions to use.\\nArtificer potions do not count towards the potion limit cooldown.\\nArtificer's Tools's small tasks are a non-combat. You can't use them to deal damage, crowd control or heal.\\n\",\"Name\":\"~Artificer~\"},\"~Artificer - Magic Scroll~\":{\"AlignOnWebsite\":\"Right\",\"A\":\"5 minutes\",\"Cost\":\"1 Charge\",\"Effect\":\"Choose a Spell you can cast and spend Charges for it if it requires charges.\\nYou create a scroll containing that spell.\\n\",\"Name\":\"~Artificer - Magic Scroll~\"},\"~Artificer - Magic Elixir~\":{\"AlignOnWebsite\":\"Right\",\"A\":\"5 minutes\",\"Cost\":\"1 Charge\",\"Effect\":\"Choose one of the following types of potions and create it\\no Elixir of Healing - Heal for 2d6 + 1.\\no Elixir of Strength - Attacks with 2-Handed weapons deal +2 damage, and attacks with 1-Handed weapons deal +1 damage (lasts 2 combat encounters).\\no Elixir of Agility - Doubled movement speed.\\no Elixir of Mana - Gain 1 Charge (if the user does not have Charge-based spellcasting, it has no effect).\\n\",\"Name\":\"~Artificer - Magic Elixir~\"}},\"Talents\":{\"Level 2\":{\"<Master Specialization>\":{\"A\":\"Passive\",\"Effect\":\"You have access to all Spell Lists in the game to know Spells from.\",\"Name\":\"<Master Specialization>\"},\"<Artificer - Magic Weapon>\":{\"A\":\"5 minutes\",\"Cooldown\":\"Long rest\",\"Effect\":\"You conjure a special weapon out of magic.\\nChoose a type of weapon, and choose 2 of the following effects:\\no +2 damage\\no Damage can freely be converted to Fire/Cold/Shock (choose one)\\no +2 meters move speed\\no +5 health while wielding it\\nYou can only have 1 Magic Weapon created at a time.\\nThe Magic Weapon is automatically destroyed after 24 hours.\\n\",\"Name\":\"<Artificer - Magic Weapon>\"},\"<Artificer - Spellcraft>\":{\"A\":\"Special\",\"Cooldown\":\"Long Rest\",\"Effect\":\"When you cast a spell, you can apply this any of the following effects to it:\\n- For every 2 dice in its damage, roll 1 more\\n- If it targets an area, freely change the area to a 4x4 meter zone, 8x1 meter line or 5 meter 90* cone\\n- Change its damage type to any type, except True and Necrotic damage\\n- Change it's Check Stat to any other Stat (if it requires a Check)\\n- Swap Snare, Cripple or Silence with any other of these\\n- Swap Slow, Prone or Pushing with any other of these (Push a target 2 meters away from you or from the zone center)\\n- Double its range\\nAt any point, you can expend 1 Charge to Unexhaust this Spell (Artificer - Spellcraft).\\n\",\"Name\":\"<Artificer - Spellcraft>\"}},\"Level 4\":{\"<Artificer - Golem>\":{\"A\":\"1 Action\",\"Cost\":\"1 Charge\",\"Range\":\"3 meters to edge\",\"Effect\":\"Choose an empty 2x2 meter space and deploy a Golem there.\\nChoose if it's made of Clay, Metal or Flesh.\\nIt has different abilities based on its material.\\nYou can find the Golem's stats in the Pets section.\\n\",\"Notes\":\"The Golem has 0 initiative, so it usually takes its turn last in combat.\",\"Name\":\"<Artificer - Golem>\"},\"<Artificer - Autoturret>\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge\",\"Range\":\"6 meters\",\"Cooldown\":\"2 times / Turn\",\"Effect\":\"Choose an element: Fire, Cold, Shock or Force.\\nChoose an empty space to deploy an Autoturret of that element.\\nOn your turn, you can freely make one attack with each Autoturret for 1d4 direct damage that ignores Defense and all resistances.\\nIt has 5 Health, 7 Defense and fails all Checks.\\n\",\"Name\":\"<Artificer - Autoturret>\"},\"<Artificer - Grenade>\":{\"A\":\"0.5 Actions\",\"Cost\":\"1 Charge\",\"Range\":\"6 meters to edge\",\"Cooldown\":\"1 use / Encounter\",\"Effect\":\"Throw a grenade at a target 5x5x5 meter area.\\nChoose one of the following effects. They apply to all Units caught in the area.\\n- Units must pass a Might Check or be Stunned\\n- Units must pass a Dexterity Check or take 6d4 Smash, Pierce or Slash damage (you choose) and be knocked away from the center of the area to closest space outside of the edge of the area. If a unit passes, it only takes half of that damage.\\n- The grenade explodes at the start of your next turn and deals 4d8 + Main Stat Fire damage (against Defense).\\n\",\"Notes\":\"Alternatively, you create the Grenade out of combat and give it to an ally to use. If you do this, only one Grenade can be thrown during a combat. A second grenade has no effect (since it's magical by nature and draws from your magic power).\",\"Name\":\"<Artificer - Grenade>\"}},\"Level 6\":{\"<Artificer - Magic Armor>\":{\"A\":\"5 minutes\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You magically enchant a piece of armor until your next Long Rest.\\nChoose 2 of the following effects to apply to it:\\n- +1 Defense\\n- Choose a damage type. Wearer takes only 50% damage from that type.\\n- +2 meters Movement Speed, and the wearer can freely jump up to 2 meters (up or ahead; this still uses Movement).\",\"Name\":\"<Artificer - Magic Armor>\"}}}}}}");

/***/ }),
/* 21 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Class\":\"Paladin\",\"Description\":\"Paladins are knights in shiny armor who fight for their god.\",\"Base Health\":3,\"Language\":\"If your Intelligence is at least 2, you can speak either Celestial or Abyssal.\",\"Armor Training\":\"Heavy Armor\",\"Level Up\":{\"Every Level\":{\"Health\":6,\"Spells\":\"1 known Advanced Spell\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Exhaust-based\",\"Description\":\"Paladin Abilities are Exhaust-based.\\nAs a Paladin, you know a certain number of Advanced Abilities.\\nYou can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Choose permanently - Wisdom and Charisma\",\"Spell DC\":\"6 + (Main Stat)\",\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Paladin-specific abilities are considered spells (unless stated otherwise).\",\"Known Basic Spells\":\"1 + Your Intelligence\",\"Known Advanced Spells\":\"1 + Your Level\",\"Spell Lists\":[\"Maneuvers\",\"Divine\"]},\"Starting Abilities\":{\"~Divine Sense~\":{\"A\":\"0 Actions\",\"Cooldown\":\"1 Hour\",\"Effect\":\"You sense if there are Undead, Demons, Fiends or Celestials, or holy or unholy places or objects within 15 meters.\\nThick walls obstruct your Divine Sense.\\n\",\"Name\":\"~Divine Sense~\"},\"~Lay on Hands~\":{\"A\":\"1 Action\",\"Effect\":\"You have a pool of 6 + Your Level Holy points.\\nUsing an action, you can expend any amount of Holy Points to heal a creature for that amount.\\nAll your Holy Points replenish on Long Rests.\\n\",\"Name\":\"~Lay on Hands~\"},\"~Divine Smite~\":{\"AlignOnWebsite\":\"Right\",\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Add 2d6 True damage to a melee attack (after you roll).\",\"Name\":\"~Divine Smite~\"}},\"Starting Abilities Description\":[{\"Divine Sense\":\"You have the power to detect foul creatures within range. Use this carefully, as it has a long cooldown.\\n\"},{\"Lay on Hands and Divine Smite\":\"At Level 1, you have 7 Holy points. At Level 2, you have 8 Holy points. And so on.\\nYou might receive other Abilities in the future that consume or replenish Holy Points.\\nDivine Smite will bring wrath upon your foes!\\n  \\n\"}],\"Specializations\":{\"Description\":\"At Level 1, you can choose your oath (Specialization).\\nBy choosing your oath, you dedicate yourself to a purpose; an oath is a lifestyle, not a mere choice!\\n\",\"Choices\":[\"Oath of Conquest, which inspires a strong personality and desire to achieve greatness by any means necessary\",\"Oath of Devotion, dedicated to helping the unfortunate and being someone to look up to\",\"Oath of Protection, chosen by those who vow to protect and wish to become a paragon of the people\"]},\"Specs\":{\"Conquest\":{\"Description\":\"Lorem! Lorem ipsum!!\",\"Starting Abilities\":{\"~Oath of Conquest~\":{\"A\":\"Passive\",\"Effect\":\"Every Worthy Enemy YOU defeat grants you 2 Holy Points.\\nYou also gain Proficiency in Indimidation if you don't have it already.\\n\",\"Name\":\"~Oath of Conquest~\"},\"~Impose~\":{\"A\":\"0.5 Actions\",\"Range\":\"3 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"A Unit must pass a Wisdom Check or be Feared. It has -2 to the roll if it's a Humanoid or Unholy.\",\"Name\":\"~Impose~\"}},\"Talents\":{\"Level 2\":{\"<Pledge of Conquest>\":{\"A\":\"Special\",\"Cooldown\":\"Lifetime\",\"Effect\":\"Ask a party member to join your cause and pledge his/her honor to you.\\nIf it accepts, it gains its own pool of 6 Holy Points and can use Lay on Hands.\\nThat ally also benefits from Oath of Conquest.\\nAt any point, you can transfer any number of Holy Points from you to that ally, but not vice versa.\\n\",\"Notes\":\"You can only have one character who pledged for you.\\nThe number of Holy Points of the ally does not increase.\\n\",\"Name\":\"<Pledge of Conquest>\"},\"<Retribution>\":{\"A\":\"Special\",\"Effect\":\"You permanently lose Lay on Hands, but you can know 2 more Advanced Spells and gain access to the Eldritch Spell List.\",\"Name\":\"<Retribution>\"},\"<Fury Smite>\":{\"A\":\"0 Actions\",\"Effect\":\"After an attack, deal 50% of the weapon damage done by the attack (dice plus any modifiers) to all enemies within 3 meters around the target (except you).\",\"Cooldown\":\"Long Rest\",\"Notes\":\"The damage of the attack counts as the dice rolled + any modifiers.\\nUsing Divine Smite over an attack, for example, does not count as added to the weapon damage.\\nDamage done means damage inflicted after Defense and Resistances calculations.\\n\",\"Name\":\"<Fury Smite>\"},\"<Divine Reach>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You empower yourself to make your melee weapons send fiery waves.\\nYour melee attacks have up to 3 meters range, deal 1d4 extra Damage and deal Fire Damage instead of Physical.\\nLasts 1 minute.\\nAlso, passively, you can always apply smites to ranged attacks.\\n\",\"Notes\":\"Alternatively, if it makes sense for your character, the DM might allow it to deal Cold or Shock damage instead of Fire. Talk to your DM about this.\",\"Name\":\"<Divine Reach>\"}},\"Talents 4\":{\"<Vengeance>\":{\"A\":\"Passive\",\"Effect\":\"When a Worthy Enemy dies in combat, get a Vengeance Counter.\\nEvery 6 Vengeance Counters, unexhaust one of your Advanced Spells.\\nYou keep your Vengeance Counters even on Long Rests.\\n\",\"Name\":\"<Vengeance>\"}}}},\"Devotion\":{\"Description\":\"Lorem, ipsum, dolor sit amet!\",\"Starting Abilities\":{\"~Oath of Devotion~\":{\"A\":\"Passive\",\"Effect\":\"You are immune to diseases and curses.\\nWhen using Lay on Hands, instead of healing, you can expend 5 points to cure a minor disease or a poison.\\nYou have 5 more maximum Holy Points.\\n\",\"Name\":\"~Oath of Devotion~\"},\"~Divine Power~\":{\"A\":\"0 Actions\",\"Effect\":\"Exhaust any known unused Advanced Spell.\\nGain 6 Holy Points.\\n\",\"Notes\":\"You can't keep more than your maximum number of Holy Points through a Long Rest.\",\"Name\":\"~Divine Power~\"}},\"Talents\":{\"Level 2\":{\"<Divine Blast>\":{\"A\":\"1 Action\",\"Range\":\"12 meters\",\"Effect\":\"Make a Spell attack against a target and consume any number of Holy points. The attack deals 1d4 True Damage for each Holy Point used.\\nYou can apply Smites to this attack.\\n\",\"Name\":\"<Divine Blast>\"},\"<Shielding Hand>\":{\"A\":\"Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Use after an ally takes damage. After that ally takes damage, it gains Shielding equal to the damage taken (after Defense and Resistances). The shield lasts up to 1 minute.\",\"Name\":\"<Shielding Hand>\"},\"<Focused Smites>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"For 1 minute, your weapon attacks and offensive spells deal extra True damage and heal an ally within 6 meters of the target.\\nBonus Damage and Heal: 1 for 1-Handed weapons and Spells, 2 for 2-Handed weapons and Spells.\\n\",\"Notes\":\"If a spell doesn't deal damage, just instantly deal the Focused Smites damage to the target.\",\"Name\":\"<Focused Smites>\"},\"<Divine Reach>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You empower yourself to make your melee weapons send fiery waves.\\nYour melee attacks have up to 3 meters range, deal 1d4 extra Damage and deal Fire Damage instead of Physical.\\nLasts 1 minute.\\nAlso, passively, you can always apply smites to ranged attacks.\\n\",\"Notes\":\"Alternatively, if it makes sense for your character, the DM might allow it to deal Cold or Shock damage instead of Fire. Talk to your DM about this.\",\"Name\":\"<Divine Reach>\"}},\"Level 4\":{\"<Life Echo>\":{\"A\":\"0 Actions\",\"Effect\":\"You put a Life Echo on an ally.\\nWhenever YOU heal another Unit, the unit with the Life Echo on them is also healed for 50% of that amount.\\nLasts 1 minute.\\n\",\"Name\":\"<Life Echo>\"}}}},\"Protection\":{\"Description\":\"Lorem. Lorem ipsum dolor sit amet.\",\"Starting Abilities\":{\"~Oath of Protection~\":{\"A\":\"Reaction\",\"Range\":\"4 meters to that ally\",\"Cooldown\":\"2 times / Long Rest\",\"Effect\":\"When an ally is attacked (after the roll), dash next to that ally.\\nThe attack is now targeted on you instead of the ally.\\n\",\"Name\":\"~Oath of Protection~\"},\"~Stand Behind~\":{\"A\":\"Passive\",\"Effect\":\"You stand out for allies adjacent to you.\\nEnemy ranged attacks against other allies adjacent to you have Cover.\\n\",\"Notes\":\"Nothing happens if an ally adjacent to you already has Cover.\",\"Name\":\"~Stand Behind~\"}},\"Talents\":{\"Level 2\":{\"<Divine Rain>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You prepare to take lethal blow.\\nIf you would drop to 0 Health until the start of your next turn, you remain instead at 1 Health and can't take damage until the start of your next turn.\\nWhen this happens, divine rays strike all enemies within 3 meters of you, and they all take 1d6 True damage.\\n\",\"Name\":\"<Divine Rain>\"},\"<Reckoning>\":{\"A\":\"1 Action\",\"Range\":\"6 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Make a spell attack on a target for 2d10 Force damage.\\nIt must pass a Might Check or be Dazed and pushed away from you until the distance between you and the target is 6 meters.\\nIf it stops in a wall or another enemy, it takes another 1d10 Force damage.\\n\",\"Name\":\"<Reckoning>\"},\"<Consacrated Zone>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"The area in a 5 meter diameter circle around you becomes Consacrated.\\nWhile inside the area, your and all allies' Divine, Mysticism, Nature and Class Spells (not Abilities) have their dice tier increased by 1.\\nDoes not apply to Passive Spells.\\n\",\"Notes\":\"Increasing dice by 1 tier means, for example, d6 become d8, or d10 become d12.\\nD12's don't increase.\\nClass Spells are Spells given by the character's class.\\n\",\"Name\":\"<Consacrated Zone>\"}},\"Level 4\":{\"<Sanctuary Zone>\":{\"A\":\"0 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters to edge\",\"Effect\":\"Declare a 7x7 area.\\nAll units in the area take only 50% damage (after Defense).\\nLasts until the start of your next turn's next turn.\\n\",\"Name\":\"<Sanctuary Zone>\"}}}}}}");

/***/ }),
/* 22 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Class\":\"Rogue\",\"Description\":\"Rogues are masters of stealth and deception.\",\"Base Health\":3,\"Armor Training\":\"Medium Armor\",\"Language\":\"If your Inteligence is at least 1, you know Thieves' Cant.\\nThieves' Cant is not a spoken language, but rather a set of symbols, sign language and code names for various objects, places or people.\\nUse Thieves' Cant wisely!\\n\",\"Level Up\":{\"Every Level\":{\"Health\":4,\"Spells\":\"1 known Ability\",\"Charges\":\"1 Charge\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Charge-based\",\"Description\":\"Rogue Abilities are Charge-based.\\nAs a Rogue, you have a number of Charges.\\nTo cast any Advanced Spell from your known spells, you must expend 1 Charge.\\nYou don't have restrictions for how many times you can cast a spell per Long Rest, but you have restrictions on your Charges.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Intelligence\",\"Spell DC\":\"6 + (Main Stat)\",\"Charges\":{\"Amount\":2,\"Regain\":\"You regain all Charges back when you Long Rest.\"},\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Rogue-specific abilities are considered Maneuvers (unless stated otherwise).\",\"Known Spells\":\"1 + Your Intelligence + Your Level\",\"Spell Lists\":[\"Maneuvers\"]},\"Starting Abilities Description\":[{\"Ambush\":\"Ambush can normally happen only once per turn, and you can charge it up to deal more damage!\\nHowever, your Rogue Specialization will give you extra ways to Ambush target!\\n\"},{\"Hide\":\"Essentially, you can interrupt another Unit's turn, put that unit on pause, and start your turn. When your turn ends, the Unit resumes its turn.\\nBefore you attack an enemy group, you can tell your DM where you are sitting, so that you benefit from cover.\\n\"},{\"Rogue Feats\":\"Nothing is stopping you from using a 2-Handed weapon instead of 1-Handed ones.\\nThere should be no downside to that.\\nHowever, given that 1-Handed weapons are weaker than 2-Handed weapons, either one of the 2 feats will make wielding 1-Handed or 2-Handed weapons equally strong.\\n\"}],\"Starting Abilities\":{\"~Ambush~\":{\"A\":\"Passive\",\"Effect\":\"If you start your turn Hidden, your first attack deals 1d6 + 1 extra damage.\\nWhen Ambushing, you can also spend as many Charges as you want.\\nThat attack gains 1d6 + 1 damage more for each Charge spent.\\nAmbush can only happen once per turn.\\n\",\"Notes\":\"Your Specialization will give you extra ways to Ambush.\\nYou can't stack 2 Ambushes at the same time, obviously.\\n\",\"Name\":\"~Ambush~\"},\"~Hide~\":{\"AlignOnWebsite\":\"Right\",\"A\":\"Special\",\"Cooldown\":\"Once per encounter\",\"Effect\":\"When combat starts, if you have Cover from all enemies, you start as Hidden.\\nWhile Hidden, you can skip your turn.\\nThen, you can unhide and start your turn whenever you like (even during enemies' turns).\\nIf you did this, when your turn ends, you are no longer hidden.\\n\",\"Notes\":\"Attacking or using Abilities or moving out of cover in relation to any enemy makes you unhides you.\\nIf you don't start your turn this round, you essentially lose your turn. You don't take 2 turns next round.\\nIf you want to start during an enemy's turn, you do so when they declare they want to do something or after they finish doing something.\\nIn special circumstances, the DM might ask you to make a Dexterity Check to remain Hidden.\\nYou can't become Hidden through non-Ability means.\\n\",\"Name\":\"~Hide~\"},\"~Rogue Feats~\":{\"A\":\"Passive\",\"Effect\":\"When creating your character, pick one of the following Feats to get for free.\",\"Name\":\"~Rogue Feats~\"},\"~Dual Wielding~\":{\"A\":\"Passive\",\"Requirement\":\"Trained in 1-Handed melee or ranged weapons\",\"Effect\":\"If you have a different type of 1-Handed Weapon equipped in each hand, your 1-Handed attacks deal +1 Damage.\\nEvery turn, you must alternate attacks between each hand's weapon to get the +1.\\n\",\"Notes\":\"For example, you must do one attack with your main hand weapon, one with the off-hand, one with main hand, one with off hand, etc\"},\"~Duelist Technique~\":{\"A\":\"Passive\",\"Requirement\":\"Trained in 1-Handed melee weapons\",\"Effect\":\"If you are wielding a 1-Handed weapon and nothing in the other hand, your attacks with that weapon do +1 Damage.\\n\"}},\"Specializations\":{\"Description\":\"At Level 1, you can choose your specialization.\\nEvery Rogue can choose from the following Rogue specializations\\n\",\"Choices\":[\"Thief, an agile-handed individual, crafty and stealthy, dexterous and silent\",\"Assassin, a person specialized in taking targets out one-on-one, through whatever means\",\"Skirmisher, an outlaw who is not afraid to engage in direct combat and apply whatever tricks necessary to get the job done\"]},\"Specs\":{\"Thief\":{\"Description\":\"...lorem... ipsum...\",\"Starting Abilities\":{\"~Backstab~\":{\"A\":\"Passive\",\"Effect\":\"When you Flank an enemy, Ambush is applied.\",\"Name\":\"~Backstab~\"},\"~Agile Hand~\":{\"A\":\"Passive\",\"Effect\":\"Your movement does not trigger Opportunity Attacks.\",\"Name\":\"~Agile Hand~\"},\"~Fool's Coin~\":{\"A\":\"Passive\",\"Effect\":\"Whenever you spend Charges on Ambush, choose one of the rolled dice of the attack. Gain that many Gold Tokens.\\nGold Tokens are an imaginary currency.\\nWhen in a town or city, you convert all Gold Tokens to actual gold coins (1 Gold Token for 10 Gold) (this is done on a Long Rest).\\n\",\"Notes\":\"Lore-wise, as a Thief you steal successfully in a city when converting tokens, while preparing and gaining momentum for it in combat.\\n\",\"Name\":\"~Fool's Coin~\"}},\"Talents\":{\"Level 2\":{\"<Payback Shot>\":{\"A\":\"0 Actions\",\"Cost\":\"All Gold Tokens (at least 1)\",\"Effect\":\"A Unit within 2 meters must pass a Dexterity Check or be Stunned.\\nFor every 2 Gold Tokens you spent, increase the DC of this by 1.\\n\",\"Name\":\"<Payback Shot>\"},\"<Arcane Trickster>\":{\"A\":\"Passive\",\"Effect\":\"You can now cast spells!\\nYou permanently know 3 Spells from the Arcane and Conjuration Spell Lists.\\nFool's Coin now also applies when spending Charges on an Advanced Spell.\\nYou can change these Spells when you Long Rest.\\nYou learn 1 additional ability at Levels 3, 5, 7 and 9.\\n\",\"Name\":\"<Arcane Trickster>\"},\"<Way of Fooling>\":{\"A\":\"Passive\",\"Effect\":\"Your Charisma is increased by 2, (up to a maximum of 4).\",\"Name\":\"<Way of Fooling>\"},\"<Whiplash>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest, otherwise it costs 1 Charge\",\"Effect\":\"Throw a whiplash at a grabbable point within 6 meters.\\nPull yourself to a target point.\\n\",\"Notes\":\"Requires a Whiplash item, which can be bought for 100 gold.\",\"Name\":\"<Whiplash>\"}},\"Level 4\":{\"<Thief Shock Wire>\":{\"A\":\"0 Actions\",\"Cost\":\"2 Gold Tokens\",\"Range\":\"6 meters to end in line of sight\",\"Effect\":\"Deploy a Shock Tripwire of up to 5 meters long between 2 obstacles.\\nWhen a Unit passes through the tripwire, it takes 1d8 Shock Damage and must pass a Dexterity Check with -3 or be Snared.\\nA Unit can see the tripwire only if it has 3 or more Wisdom.\\n\",\"Notes\":\"Each end of the wire must be attached to something solid and static.\\nYou can make use of walls, obstacles, etc.\\nRequires a Special Tripwire Set which can be bought for 200 gold.\\n\",\"Name\":\"<Thief Shock Wire>\"},\"<Blade Tempest>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You throw out 8 boomerang blades: one towards each direction (up, up-right, right, etc).\\nEach blade travels 4 meters and stops in that space (can occupy the same space as another Unit).\\nEach blade deals 2d6 direct Slash damage (not against Defense) to all Units it passes through.\\nAt the end of your next turn, the blades return to you.\\nThen, again, each blade deals 2d6 direct Slash damage (not against Defense) to all Units it passes through.\\n\",\"Notes\":\"Requires 8 special blades, which can be bought for a total of 240 gold.\",\"Name\":\"<Blade Tempest>\"},\"<Poisoned Weapons>\":{\"A\":\"10 minutes\",\"Cooldown\":\"8 hours\",\"Effect\":\"You coat up to 2 weapons in different poisons that last for 8 hours.\\nChoose 2 weapons, and choose a different poison to apply for each:\\n- Deathly Venom: Deals 1d12 extra Poison damage to targets with more than 50% Health; then the target becomes immune to this poison for 1 minute.\\n- Necrotic Toxin: The attack's target becomes Slowed and can't regain Health for 1 minute\\n- Phosphorus Mix: The target can't benefit from Cover for 1 minute (and this attack ignores Cover)\\n- Weakening Poison: The target can only do 1 Attack on their next turn\\n\",\"Notes\":\"Remember to specify which weapon you are attacking to.\\nRequires a Poisoner's Kit which can be bought for 200 gold on the black market. If you're in a tight scenario, the DM might let you use monster blood or gather herbs for a 1-time use of this Ability.\\n\",\"Name\":\"<Poisoned Weapons>\"}}}},\"Assassin\":{\"Description\":\"...LOREMIPSUM! <you died>\",\"Starting Abilities\":{\"~Isolated~\":{\"A\":\"Passive\",\"Effect\":\"When you attack a Unit, and there is no other Unit adjacent to you or to that enemy (except you), the attack gains Ambush.\\nIf you are already Ambushing the target, the attack gains an additional 1d6 + 1 damage.\\n\",\"Name\":\"~Isolated~\"},\"~Planned Assassination~\":{\"A\":\"1 minute\",\"Cost\":\"1 Charge\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You plan an attack for 1 minute.\\nYour next attack on that target deals 2d6 + 2 Poison damage.\\nPlanned Assassination fails if your Line of Sight to the target is broken until you attack it.\\n\",\"Notes\":\"The Charge is spent the moment you declare Planned Assassination.\",\"Name\":\"~Planned Assassination~\"}},\"Talents\":{\"Level 2\":{\"<Take Out>\":{\"A\":\"0.5 Actions\",\"Cost\":\"1 Charge\",\"Effect\":\"A Unit within 1 meter must pass a Dexterity Check or be put to Sleep for 1 minute.\\nIf it fails, you gain the Action back.\\n\",\"Downside\":\"You must be hiding to use Take Out, and the target must be Isolated.\\nThis ability unhides you!\\n\",\"Name\":\"<Take Out>\"},\"<Poison Master>\":{\"A\":\"1 hour\",\"Cost\":\"1 Charge\",\"Effect\":\"Using ingredients costing 35 Gold, you are able to create a few drops of Drinkable Poison.\\nSomeone ingesting them takes 1d12 Poison damage instantly.\\nCombining multiple instances of Drinkable Poison increases its damage by 1d12 for each Drinkable Poison combined.\\nThe poison loses its effect after 72 hours.\\n\",\"Name\":\"<Poison Master>\"},\"<Shadowstep>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"If you are covered in shadow, choose another point covered in shadow up to 6 meters away.\\nInstantly teleport to that place.\\n\",\"Notes\":\"This is considered a Spell.\",\"Name\":\"<Shadowstep>\"}},\"Level 4\":{\"<Blade Tempest>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You throw out 8 boomerang blades: one towards each direction (up, up-right, right, etc).\\nEach blade travels 4 meters and stops in that space (can occupy the same space as another Unit).\\nEach blade deals 2d6 direct Slash damage (not against Defense) to all Units it passes through.\\nAt the end of your next turn, the blades return to you.\\nThen, again, each blade deals 2d6 direct Slash damage (not against Defense) to all Units it passes through.\\n\",\"Notes\":\"Requires 8 special blades, which can be bought for a total of 240 gold.\",\"Name\":\"<Blade Tempest>\"},\"<Death Mark>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Mark a Unit you can see.\\nWhenever YOU deal damage to it until your next turn, remember the damage done.\\nAt the start of your next turn, the mark bursts and the Unit takes directly 50% of the damage you dealt to it in this time period.\\n\",\"Name\":\"<Death Mark>\"},\"<Poisoned Weapons>\":{\"A\":\"10 minutes\",\"Cooldown\":\"8 hours\",\"Effect\":\"You coat up to 2 weapons in different poisons that last for 8 hours.\\nChoose 2 weapons, and choose a different poison to apply for each:\\n- Deathly Venom: Deals 1d12 extra Poison damage to targets with more than 50% Health; then the target becomes immune to this poison for 1 minute.\\n- Necrotic Toxin: The attack's target becomes Slowed and can't regain Health for 1 minute\\n- Phosphorus: The target can't benefit from Cover for 1 minute (and this attack ignores Cover)\\n- Weakening Poison: The target can only do 1 Attack on their next turn\\n\",\"Notes\":\"Remember to specify which weapon you are attacking to.\\nRequires a Poisoner's Kit which can be bought for 200 gold on the black market. If you're in a tight scenario, the DM might let you use monster blood or gather herbs for a 1-time use of this Ability.\\n\",\"Name\":\"<Poisoned Weapons>\"}}}},\"Skirmisher\":{\"Description\":\"Loreeeem!!!\",\"Starting Abilities\":{\"~Savagery~\":{\"A\":\"Passive\",\"Effect\":\"Attacks on Units that have 50% or less health gain Ambush.\",\"Name\":\"~Savagery~\"},\"~Parry~\":{\"A\":\"Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Halve the damage of a weapon attack you receive (after the roll, before subtracting Defense).\",\"Name\":\"~Parry~\"}},\"Talents\":{\"Level 2\":{\"<10% Luck>\":{\"A\":\"Passive\",\"Effect\":\"Once per turn, when you roll a 1 on an attack die, you can reroll that die.\",\"Name\":\"<10% Luck>\"},\"<Cheap Tricks>\":{\"A\":\"0 Actions\",\"Cost\":\"2 Charges\",\"Range\":\"3 meters\",\"Effect\":\"A Unit within 3 meters must pass a Dexterity Check or be Blinded for 2 turns.\",\"Name\":\"<Cheap Tricks>\"},\"<Whiplash>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest, otherwise it costs 1 Charge\",\"Effect\":\"Throw a whiplash at a grabbable point within 6 meters.\\nPull yourself to a target point.\\n\",\"Notes\":\"Requires a Whiplash item, which can be bought for 100 gold.\",\"Name\":\"<Whiplash>\"},\"<Quickfire>\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge\",\"Cooldown\":\"1 use / Turn\",\"Effect\":\"Perform an attack with a 1-Handed Ranged weapon.\\nThis attack ignores Cover and has no penalty if you're Blinded.\\nThis attack does not trigger attacks of oportunity and can be used in melee range without penalty.\\n\",\"Name\":\"<Quickfire>\"}},\"Level 4\":{\"<Combat Shock Wire>\":{\"A\":\"Passive\",\"Range\":\"6 meters to end in line of sight\",\"Effect\":\"Whenever you spend one or more Charges, freely deploy a Shock Tripwire of up to 5 meters long between 2 obstacles.\\nWhen a Unit passes through the tripwire, it takes 1d8 Shock Damage and must pass a Dexterity Check with -3 or be Snared.\\nA Unit can see the tripwire only if it has 3 or more Wisdom.\\n\",\"Notes\":\"Each end of the wire must be attached to something solid and static.\\nYou can make use of walls, obstacles, etc.\\nRequires a Special Tripwire Set which can be bought for 200 gold.\\n\",\"Name\":\"<Combat Shock Wire>\"},\"<Poisoned Weapons>\":{\"A\":\"10 minutes\",\"Cooldown\":\"8 hours\",\"Effect\":\"You coat up to 2 weapons in different poisons that last for 8 hours.\\nChoose 2 weapons, and choose a different poison to apply for each:\\n- Deathly Venom: Deals 1d10 extra Poison damage to targets with more than 50% Health; then the target becomes immune to this poison for 1 minute.\\n- Necrotic Toxin: The attack's target becomes Slowed and can't regain Health for 1 minute\\n- Phosphorus: The target can't benefit from Cover for 1 minute (and this attack ignores Cover)\\n- Weakening Poison: The target can only do 1 Attack on their next turn\\n\",\"Notes\":\"Remember to specify which weapon you are attacking to.\\nRequires a Poisoner's Kit which can be bought for 200 gold on the black market. If you're in a tight scenario, the DM might let you use monster blood or gather herbs for a 1-time use of this Ability.\\n\",\"Name\":\"<Poisoned Weapons>\"},\"<Swing Thing>\":{\"A\":\"Reaction\",\"Effect\":\"Use when a Unit within 6 meters becomes Snared, Stunned or knocked Prone (you must have line of sight to it).\\nDeal 1d8 Pierce damage to it and push it up to 3 meters in any direction.\\n\",\"Notes\":\"Requires a Whiplash item for pushing towards you or to a side, which can be bought for 100 gold.\\nFor pushing away from you, requires a gun or crossbow of any type.\\n\",\"Name\":\"<Swing Thing>\"}}}}}}");

/***/ }),
/* 23 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Ideas\":[\"Ayahuasca\",\"Akashik records\",\"Past life\",{\"Far sight\":\"undo your turn and do it again\"},\"Mind Link should be free\"],\"Class\":\"Shaman\",\"Description\":\"Shaman are people in close attunement with the spirits.\",\"Armor Training\":\"Light Armor\",\"Base Health\":8,\"Language\":\"If your Intelligence is at least 2, choose one Common, Wild or Elemental language you can speak.\",\"Level Up\":{\"Every Level\":{\"Health\":5,\"Spells\":\"1 known Advanced Spell\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Exhaust-based\",\"Description\":\"Shaman Abilities are Exhaust-based.\\nAs a Shaman, you know a certain number of Advanced Abilities.\\nYou can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Choose permanently - Wisdom or Charisma\",\"Spell DC\":\"6 + (Main Stat)\",\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Shaman-specific abilities are considered spells (unless stated otherwise).\",\"Known Basic Spells\":\"1 + Your Intelligence\",\"Known Advanced Spells\":\"1 + Your Level\",\"Spell Lists\":[\"Maneuvers\",\"Elemental\",\"Mysticism\",\"Eldritch\"]},\"Other\":\"As a Shaman, you have a spirit animal that represents you.\\nChoose one of the following spirit animals.\\nYou will permanently gain the bonuses of that spirit animal.\\n\",\"Starting Abilities Description\":[{\"Animal Spirit\":\"As a Shaman, you have a spirit animal that you choose when you create your character.\\nThis spirit animal accompanies you spiritually.\\nThe spirit animal is generally invisible and manifests as a ghostly presence when you use the Ability specific to it.\\n\"}],\"Starting Abilities\":{\"~Animal Spirit~\":{\"AlignOnWebsite\":\"Left\",\"A\":\"Special\",\"Effect\":\"Choose one of the 4 animal spirits. You gain an Ability and a bonus to a Skill Check depending on your Spirit Animal.\\nBear - You gain Bear's Roar.\\nWolf - You gain Wolf's Leap.\\nEagle - You gain Eagle's Sight.\\nOwl - You gain Owl's Foresight.\\n\",\"Name\":\"~Animal Spirit~\"},\"~Bear's Roar~\":{\"IsSubspell\":true,\"AlignOnWebsite\":\"Left\",\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"All enemies within 3 meters of you must pass a Charisma Check or take 1d6 Psychic damage and be Crippled.\",\"Name\":\"~Bear's Roar~\"},\"~Wolf's Leap~\":{\"IsSubspell\":true,\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"AlignOnWebsite\":\"Left\",\"Effect\":\"Leap at a target up to 3 meters away.\\nThe target takes 1d6 Bleed damage at the end of each of your turns for 1 minute.\\n\",\"Name\":\"~Wolf's Leap~\"},\"~Eagle's Sight~\":{\"IsSubspell\":true,\"AlignOnWebsite\":\"Right\",\"A\":\"Passive\",\"Effect\":\"You have Maximum Initiative every encounter.\\nAll your ranged attacks have an extra 3 meters range.\\nYour spell DC is increased by 1.\\n\",\"Name\":\"~Eagle's Sight~\"},\"~Owl's Foresight~\":{\"IsSubspell\":true,\"AlignOnWebsite\":\"Right\",\"A\":\"Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Use when an enemy casts a spell (non-naturally).\\nThe spell is cancelled and the enemy loses the Action for it.\\n\",\"Name\":\"~Owl's Foresight~\"}},\"Specializations\":{\"Description\":\"Lorem.\",\"Choices\":[\"Berserker, a heavy fighter, guided by the ways of the spirits, both wise and strong - a combination to fear\",\"Seer, one who can perceive beyond the eyes and ears, who can get to the root of your mind and soul\",\"Witch Doctor, a strange ally when it comes to helping, and en even stranger foe when it comes to combat\"]},\"Specs\":{\"Berserker\":{\"Description\":\"LOREM IPSUUUM!!\",\"Starting Abilities\":{\"~Path of the Berserker~\":{\"A\":\"Passive\",\"Effect\":\"Your total Defense is always halved (even with buffs), rounded down, no matter what armor type you are wearing.\\nYour total Health is increased by 50% (buffs are not increased).\\nYour Extra Health Pool does not increase with your Health.\\n\",\"Name\":\"~Path of the Berserker~\"},\"~Bloodlust~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Add damage to an attack equal to 25% of your missing Health (rounded up).\",\"Name\":\"~Bloodlust~\"}},\"Talents\":{\"Level 2\":{\"<Reincarnation>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Stabilize an Fallen Unit or revive a Unit that died recently (12 hours maximum).\\nThis puts the Unit at 1 Health.\\nYou can do this on yourself if you are dead.\\n\",\"Name\":\"<Reincarnation>\"},\"<Spirit Draw>\":{\"A\":\"Special\",\"Cost\":\"5 Health\",\"Cooldown\":\"Long Rest\",\"Effect\":\"An ally can channel for 10 minutes to draw power from your soul.\\nThat ally can use Bloodlust once and use your spirit animal Ability once.\\nLasts until either of you cancel it, or until either's next Long Rest.\\nAn ally can't draw your soul more than once per Long Rest.\\nAn ally can't keep your soul drawn through a Long Rest.\\n\",\"Name\":\"<Spirit Draw>\"},\"<Animal Companion>\":{\"A\":\"0 Actions\",\"Cooldown\":\"10 minutes\",\"Cost\":\"5 Health\",\"Effect\":\"You summon your Spirit Animal next to you for up to 10 minutes!\\nCheck out your animal's stats in the Animals section, Spirit Animals category.\\nAdditionally, you can see through your Pet's eyes if you choose so.\\nYour animal has stats depending on its species.\\nBy default, apply the following stats to your pet (these will get modified by your pet's species):\\n- Movement: 5 meters\\nYour pet takes its turn at the same time as you do, and always has the same initiative as yours.\\nYour pet has 1 Action per turn.\\nYour pet can make normal Checks using using its own Stats.\\nYour pet will not stray more than 30 meters away from you in hostile territory.\\nAll pets have the Pet Attack ability.\\n\",\"Name\":\"<Animal Companion>\"},\"<Pet Attack>\":{\"A\":\"1 Action (from the pet)\",\"Effect\":\"The pet melee attacks a target.\\nThe attack deals 1d6 + 2 Pierce or Slash Damage (your choice).\\n\",\"Name\":\"<Pet Attack>\"}},\"Level 4\":{\"<Jotunn>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You grow to the size of a giant and become Large.\\nYour normal Melee attacks hit all Units within 1 meter of the target for the same damage, without the Main Stat modifier (against Defense).\\nYou are immune to Slows, Snares and Cripples.\\nYou gain 10 Shielding.\\nLasts 1 minute.\\n\",\"Name\":\"<Jotunn>\"},\"<Earthshattering Wave>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"All units in a 9x3 line must pass a Might Check or be Stunned. If they pass, they become Dazed instead.\",\"Notes\":\"There is no escape!\",\"Name\":\"<Earthshattering Wave>\"},\"<Ruining Shout>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Damages all Enemies within 4 meters of you.\\nDeals 1d6 Psychic damage (directly) for each 1 meter to the target (up to 4d6).\\nRoll 4d6 at the same time, and choose which dice affect the units closer.\\n\",\"Name\":\"<Ruining Shout>\"}}}},\"Seer\":{\"Description\":\"Video morituri...\",\"Starting Abilities\":{\"~Spirit Bond~\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Touch an ally.\\nWhenever either of you makes a Check, add the higher bonus from either of you instead of the normal Check bonus.\\nYou can do this once per Long Rest, and lasts until your next Long Rest.\\n\",\"Notes\":\"This does apply to Proficiencies - if your bonded ally has Proficiency in something, you also add the ally's Level, as it would normally make sense.\",\"Name\":\"~Spirit Bond~\"},\"~Mind Sight~\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"15 meters\",\"Effect\":\"A Unit you can clearly see must pass a Wisdom Check or be Blinded and take 3d6 damage, or half of that if it passes.\\nThen, if you succeeded, you can then see through the target's eyes until you make another action or move.\\nIf the target is unaware and it rolls 7 or less (total), it doesn't notice what just happened.\\n\",\"Notes\":\"You can choose not to deal the damage for this ability and not to Blind the target.\\nYou see more and more blurry as the target gets farther away. At 10 kilometers, the spell breaks.\\n\",\"Name\":\"~Mind Sight~\"}},\"Talents\":{\"Level 2\":{\"<Mind Link>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Establish a mind connection with a willing ally.\\nUntil your next Long Rest, you can talk to eachother telepathically.\\nAdditionally, the ally can do Mind Sight once until your Long Rest.\\n\",\"Name\":\"<Mind Link>\"},\"<Dream Walk>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters\",\"Effect\":\"A Unit must pass a Wisdom Check or fall Asleep for 2 turns.\\nAlternatively, you can use Dream Walk on an already sleeping target to alter their dreams to your liking.\\n\",\"Notes\":\"A Sleeping Unit wakes up if it takes damage or other Crowd Control.\",\"Name\":\"<Dream Walk>\"}},\"Level 4\":{\"<Regrowth>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Heal a Unit within 6 meters for 1d8 for each 10 Health it is missing.\",\"Name\":\"<Regrowth>\"},\"<Strong Spirited>\":{\"A\":\"Passive\",\"Effect\":\"Spirit Bond now works for Attack bonuses and Spell DC's too.\\nFor your every 3rd Advanced Spell, if it's single target Spell, the target must pass a Wisdom Check or be Dazed.\\n\",\"Name\":\"<Strong Spirited>\"},\"<Psyche Tether>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Place a tether on 2 Units within 10 meters of you.\\nThe next time one of them takes damage, the other one takes the damage (directly) as well as True damage.\\n\",\"Notes\":\"If both are damaged at the same time, this only applies once and you choose which takes the damage of the other.\\nThe extra damage of Smites, Ambush, etc count over an attack counts as the same damage source.\\nIf another case is ambiguous, the DM makes the choice if it counts.\\n\",\"Name\":\"<Psyche Tether>\"}}}},\"Witch Doctor\":{\"Description\":\"Lorem, ipsum, snitel, dolor!\",\"Starting Abilities\":{\"~Spirit Guides~\":{\"A\":\"Special\",\"Effect\":\"You are in constant communion with certain spirits.\\nThese spirits can be the souls of people you knew who died, spirits of other animals, etc.\\nThese spirits will sometimes guide your way and aid you in your endeavors.\\nAfter every Long Rest, roll 1d6 and remember what you rolled.\\nThese dice are called Guide Dice.\\nYou can freely consume one Guide Dice and add it to any Check you or your party makes.\\nAt levels 2, 5 and 8, you gain one more Guide Die.\\n\",\"Name\":\"~Spirit Guides~\"},\"~Hex and Curse~\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"2 uses / Long Rest\",\"Effect\":\"Declare either an ally or an enemy within 6 meters.\\nIf it's an enemy, it must pass a Wisdom Check or have all its damage dice downgraded 1 tier for 1 minute.\\nIf it's an ally, it must pass a Wisdom Check to be healed for 1d12, or half of that if it fails.\\nDowngrading can stack (you can downgrade an enemy's dice multiple times).\\n\",\"Notes\":\"Downgrading dice by 1 tier means, for example, d6 become d4, or d12 become d10.\\nD4's don't decrease.\\nIf you target an Epic Monster, the tier downgrade happens to its first turn only.\\n\",\"Name\":\"~Hex and Curse~\"}},\"Talents\":{\"Level 2\":{\"<Voodoo Magic>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters\",\"Effect\":\"A Unit within 6 meters makes a Wisdom Check.\\nIf it fails, it takes 2d6 Psychic damage at the start of your turn for 1 minute and for its next turn, you can choose that enemy's actions as long as it would seem reasonable to that enemy (decide with your DM).\\nEpic Monsters can not be controlled; they only take the damage.\\n\",\"Notes\":\"For example, you can make a goblin run or recklessly attack one of your party members. But you can't make a guard jump off a cliff, because that's not what it would normally do.\",\"Name\":\"<Voodoo Magic>\"},\"<Incorporeal Form>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"You become a bodyless soul for up to 8 hours and enter a willing ally.\\nWhile inside the ally's body, you can communicate with them mentally, and only they can see you.\\nYou can slightly peek outside of their body, and move your arms, upper body and head as if you were a ghost originating from that ally's body.\\no You can't move yourself, but you always move with that ally.\\no You can't do any physical actions (because you are basically a ghost and can't touch anything or anyone).\\no You can cast spells as normal. \\no You follow your own Initiative in combat.\\no You can't take damage from external sources, but you feel every body sensation that ally feels.\\nYou can freely exit their body and revert back to your physical self using 0 Actions.\\n\",\"Name\":\"<Incorporeal Form>\"}},\"Level 4\":{\"<Bomboclaat>\":{\"A\":\"Passive\",\"Effect\":\"You gain 1 more Guide Die.\\nYou can now do the following with Guide Dice:\\n- Add to another ally's damage roll\\n- Subtract from an enemy's damage roll\\n- Add to another ally's Combat Check\\n- Subtract from an enemy's Combat Check\\nYou can only use 1 Guide Die at a time.\\n\",\"Name\":\"<Bomboclaat>\"},\"<Dead Hands>\":{\"A\":\"1 Action\",\"Cost\":\"1 Guide Die\",\"Effect\":\"Choose a 3x3 meter zone.\\nUndead hands appear in that zone and make it Hard Terrain.\\nAt the start of your next turn, use one of your Guide Dice to summon that many Zombies wherever you choose in that zone.\\nThey take their turn the same time as you and you can command them to do whatever you want.\\nThey have 4 Speed, 1 Health, 3 Defense and fail all saves.\\nEach can attack for 1d4 - 1 direct Necrotic damage (ignores Defense).\\nZombies last up to 10 minutes.\\n\",\"Name\":\"<Dead Hands>\"},\"<Bone Mass>\":{\"A\":\"0.5 Actions\",\"Cost\":\"1 Guide Die\",\"Range\":\"6 meters to edge\",\"Effect\":\"Spend one Guide Die and declare a square area.\\nThe diameter of the area is equal to the spent Guide Die.\\nSharp bones occupying 1x1 meters each grow from the area.\\nWhen a Unit steps on a Sharp Bone, it directly takes 1d8 Pierce Damage and loses 1 meter of its remaining speed.\\nThe bone then shatters.\",\"Name\":\"<Bone Mass>\"}}}}}}");

/***/ }),
/* 24 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Class\":\"Warlock\",\"Description\":\"Warlocks are people who made pacts with powerful beings.\",\"Base Health\":6,\"Language\":\"If your Intelligence is at least 2, choose one Higher language you can speak.\",\"Armor Training\":\"Light Armor\",\"Level Up\":{\"Every Level\":{\"Health\":5,\"Spells\":\"1 known Spell\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\nYou gain +1 Charge.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3).\\nYou gain +1 Charge.\\n\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\\nYou gain +1 Charge.\\n\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Special Charge-based\",\"Description\":\"Warlock Abilities are Charge-based, with a twist.\\nAs a Warlock, you have a number of Charges.\\nTo cast any Advanced Spell from your known spells, look at the cost of the Spell and expend that many Charges.\\nYou don't have restrictions for how many times you can cast a spell per Long Rest, but you have restrictions on your Charges.\\n\",\"Main Stat\":\"Choose permanently - Intelligence or Charisma\",\"Spell DC\":\"6 + (Main Stat)\",\"Charges\":{\"Amount\":2,\"Regain\":\"Your charges reset after every combat.\"},\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Warlock-specific abilities are considered spells.\",\"Known Spells\":\"3 + Your Intelligence + Your Level\",\"Spell Lists\":[\"Elemental\",\"Mysticism\",\"Eldritch\"]},\"Starting Abilities\":{\"~Power Tap~\":{\"A\":\"Depends\",\"Cost\":\"Depends\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Cast an ability one of your Allies has (with that ability's actions and costs and your modifiers).\\nIf it's a non-class Advanced Spell or it costs Charges, you must spend its Charges.\\n\",\"Notes\":\"Does not work on Passives. The Ability must have 0, 0.5 or 1 Actions cost.\",\"Name\":\"~Power Tap~\"}},\"Starting Abilities Description\":[{\"Spell Casting\":\"Warlock spell casting is somewhat different from other classes.\\nYour Charges regenerate inbetween combat encounters. So, for optimal play, use all your Charges every encounter!\\n\"},{\"Power Tap\":\"Try to clone strong Abilities from your teammates that don't take up Charges.\\nTalent Abilities are generally stronger than standard Spell List Abilities.\\n\"}],\"Other\":\"When creating your character, choose one type of being you serve. That being is called your Patron:\\n- Fey Patron, a wild, outworldly being, heavily magical or in tune with nature, and often outward strange. A Fey Patron often represents an old god of nature or magic, resembled by a magical animal or humanoid.\\n- Celestial Patron, a being from a divine plain. Portrayed as angels or divine spirits of life and death\\n- Demon or Devil patron, a being residing in Hell, an archdevil or lord in hell\\n- Old God Patron, an eldritch being of nightmare and terror, whose thoughts, form and wants are incomprehensible to most people\\n\",\"Abilities\":{\"~Fey Patron~\":{\"A\":\"Passive\",\"Effect\":\"Your lord is a higher fey creature.\\nChoose one more Race Ability from your Race's choices.\\n\",\"Notes\":\"Yes, you will have 2 Race Talents of the same level.\\nLore-wise, the Fey Patron enhances you magically, mutates your arcane flow and transforms you into an unordinarily adapted person.\\n\",\"Name\":\"~Fey Patron~\"},\"~Celestial Patron~\":{\"A\":\"Passive\",\"Effect\":\"Your lord is a celestial being, who lives in a higher plane. You gain Life Cycle.\",\"Notes\":\"The gift of Life Cycle is granted to you by your patron. Use it well. Withhold the balance.\",\"Name\":\"~Celestial Patron~\"},\"<Life Cycle>\":{\"IsSubspell\":true,\"AlignOnWebsite\":\"Right\",\"A\":\"0.5 Actions\",\"Cost\":\"6 Health\",\"Effect\":\"Heal a Unit within 6 meters for up to 10 Health from their remaining Extra Health Pool.\",\"Name\":\"<Life Cycle>\"},\"~Demon Patron~\":{\"A\":\"Passive\",\"Effect\":\"Your lord is a powerful demon.\\nYou gain Soul Drain.\\n\",\"Notes\":\"Through every soul drained, your demon lord feeds, and in return, grants you even more power.\",\"Name\":\"~Demon Patron~\"},\"<Soul Drain>\":{\"IsSubspell\":true,\"AlignOnWebsite\":\"Right\",\"A\":\"0.5 Actions\",\"Cost\":\"1 Charge\",\"Range\":\"12 meters\",\"Effect\":\"Deal 7 Necrotic damage to a creature.\\nIf it dies, you get the Charge back and heal for 3 Health.\\n\",\"Name\":\"<Soul Drain>\"},\"~Old God Patron~\":{\"IsSubspell\":true,\"A\":\"Passive\",\"Effect\":\"Your lord is an old, slumbering god.\\nYou can pick a Racial Ability from any other race and have it permanently.\\n\",\"Notes\":\"Eldritch thoughts flow through your mind, infecting you with strange abilities acquired in unfathomable ways.\",\"Name\":\"~Old God Patron~\"}},\"Specializations\":{\"Description\":\"At Level 1, you can choose your specialization. Every Warlock can choose from the following Warlock specializations.\",\"Choices\":[\"Hexblade, a user of both magic and a weapon infused with the power of their master\",\"Summoner, specialized in calling for aid from familiars and otherworldly beings\"]},\"Specs\":{\"Hexblade\":{\"Description\":\"Ha! Lorem ipsum!!\",\"Starting Abilities\":{\"~Sentient Weapon~\":{\"A\":\"Special\",\"Effect\":\"You have a Hexblade Weapon, inside which your patron's avatar lies, either possessing the weapon, being trapped inside it or using it as a means of communication with you.\\nPick any weapon type, and it becomes your Hexblade Weapon.\\nYou can customize your weapon's personality, voice, the way it looks. Talk to your DM about this.\\nYou are automatically considered trained in your Hexblade Weapon.\\n\",\"Name\":\"~Sentient Weapon~\"},\"~Hexblade~\":{\"A\":\"Passive\",\"Effect\":\"After you cast an offensive spell, your next weapon attack deals +1d6 damage.\",\"Notes\":\"Offensive means that it deals damage or applies hard Crowd Control (anything better than Slow and creating Hard Terrain).\",\"Name\":\"~Hexblade~\"}},\"Talents\":{\"Level 2\":{\"<Shapeshifting Weapon>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Once per turn\",\"Effect\":\"Instantly change the type of weapon of your Hexblade.\",\"Name\":\"<Shapeshifting Weapon>\"},\"<Hexstaff>\":{\"A\":\"Passive\",\"Effect\":\"Your Hexblade Ability is changed and now has the following effect:\\nAfter you attack with a weapon, your next offensive spell has +1 DC and deals +1d6 damage.\\n\",\"Name\":\"<Hexstaff>\"},\"<Doublehex>\":{\"A\":\"Passive\",\"Effect\":\"You now have 1 more Hexblade Weapon, of any kind. The same patron or another one is possessing your second weapon.\\nAt any time, you can vanish or resummon either weapon.\\n\",\"Name\":\"<Doublehex>\"}},\"Level 4\":{\"<Hungering Weapon>\":{\"A\":\"Passive\",\"Effect\":\"When YOU drop a Worthy Enemy to 0 Health, gain an extra 0.5 Actions this turn and Shielding equal to your Main Stat.\\n\",\"Name\":\"<Hungering Weapon>\"},\"<Spell Tap>\":{\"A\":\"Passive\",\"Effect\":\"Every Worthy Combat, when you drop to 0 Charges, unexhaust Power Tap and gain Shielding equal to your Main Stat.\\n\",\"Name\":\"<Spell Tap>\"},\"<Somatic Pulse>\":{\"A\":\"0.5 Actions\",\"Cost\":\"1 Charge\",\"Effect\":\"Count the Units within 3 meters of you (except you).\\nThey are all attacked for 2d6 + (the number of Units) True damage (against Defense).\\n\",\"Notes\":\"E.g. if this affects 2 Units, it deals 3d6. If it affects 3 Units, it deals 4d6. 4 Units - 5d6. And so on.\",\"Name\":\"<Somatic Pulse>\"}}}},\"Summoner\":{\"Description\":\"Lorem \\\"ipsum dolor\\\" sit amet.\",\"Starting Abilities\":{\"~Summon Familiar~\":{\"A\":\"1 Hour\",\"Effect\":\"You conjure a ritual using various magical materials worth 25 Gold.\\nThe first time you cast this ritual, you summon a familiar which becomes yours.\\nYou can choose which type of familiar you want:\\n- It can take the shape of a small creature.\\n- It can look spectral or look as a normal animal with a slight glow (does not radiate light).\\n- You can choose what color it is if it's spectral or what color its glow is.\\nAlso, choose an element which is bound to it: Fire, Water, Frost, Arcane, Thunder, Earth, Wind, Light or Darkness.\\nThat becomes your Familiar Element.\\nYour familiar comes with a name. Roll for your familiar name on the Familiar Name Table (or your DM will choose one for you).\\nYou can communicate with your Familiar telepathically.\\nThe familiar doesn't take turns on its own, but at the same time as you.\\nOn your turn, your familiar can use its own movement to move, but you must spend your actions for it to take actions.\\nIf your familiar goes more than 20 meters away from you, it becomes unsummoned.\\nIf it dies, it becomes unsummoned.\\nYou can always summon it back with this Ability.\\nAfter your familiar is unsummoned, you can only summon it back after your next Long Rest.\\nYour familiar has the following stats:\\n- Health: 8 + Your Fortitude + 2 * Your Level.\\n- Defense: Your Dexterity (minimum 0)\\n- Stats and Saves: Same as yours\\n- Movement: Same as yours, can't fly, but it can swim at half normal speed\\n\",\"Name\":\"~Summon Familiar~\"},\"~Familiar Pet Attack~\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"1 turn\",\"Effect\":\"The familiar melee attacks a target (2 meters range).\\nThe attack deals 1d10 + Main Stat damage (of your pet's elemental type).\\n\",\"Notes\":\"The attack is against target's Defense, of course.\",\"Name\":\"~Familiar Pet Attack~\"},\"~Familiar Feats~\":{\"A\":\"Special\",\"Effect\":\"You also have access to the Familiar Feats.\\nYou can choose one Familiar Feat to get for free.\\n\",\"Name\":\"~Familiar Feats~\"}},\"Talents\":{\"Level 2\":{\"<Tongues>\":{\"A\":\"Passive\",\"Effect\":\"You speak all Common and Wild languages.\\nYou have +1 Spell DC.\\n\",\"Name\":\"<Tongues>\"},\"<Impmaster>\":{\"A\":\"Special\",\"Effect\":\"When you get this Talent, gain 1 Feat.\",\"Name\":\"<Impmaster>\"},\"<Dream Walk>\":{\"A\":\"0.5 Actions\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters\",\"Effect\":\"A Unit must pass a Wisdom Check or fall Asleep for 2 turns.\\nAlternatively, you can use Dream Walk on an already sleeping target to alter their dreams to your liking.\\n\",\"Notes\":\"A Sleeping Unit wakes up if it takes damage or other Crowd Control.\",\"Name\":\"<Dream Walk>\"}},\"Level 4\":{\"<Demon Shape>\":null,\"<Patron Avatar>\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters\",\"Effect\":\"You summon an Avatar of your patron.\\nWhile the Avatar is summoned, you can't move, except with teleportation Spells.\\nYou and the Avatar share Actions and you must use at least 0.5 Actions with it every turn, otherwise it becomes unsummoned.\\nThe Avatar can't take damage or be directly Crowd Controlled, but all Crowd Control you would take is redirected to it.\\nSee the Avatar's Stats and Abilities in the Pets sections.\\nLasts up to 1 minute or until you are Stunned, Paralyzed or physically moved from place, or if the Avatar moves outside of a 30 meter range.\\n\",\"Notes\":\"You can cancel the summon at any point on your turn.\",\"Name\":\"<Patron Avatar>\"}}}}}}");

/***/ }),
/* 25 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Class\":\"Warrior\",\"Description\":\"Warriors are highly trained combat experts\",\"Base Health\":7,\"Language\":\"A true warrior speaks only the language of battle!\\n(Being a warrior does not grant you other languages, except the ones you already speak.)\\n\",\"Armor Training\":\"Heavy Armor\",\"Level Up\":{\"Every Level\":{\"Health\":6,\"Spells\":\"1 known Advanced Spell\",\"Charges\":\"1 Charge\"},\"Level Bonuses\":{\"1\":\"Choose your Specialization\",\"2\":\"Talent from your Specialization (Tier 1)\",\"3\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"4\":\"Talent from your Specialization (Tier 2)\",\"5\":{\"~Action Surge~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}},\"6\":\"Talent from your Specialization (Tier 3)\",\"7\":\"You gain +1 in any Stat of choice.\\nYou gain +1 Training Point.\\nYou gain 1 Feat.\\n\",\"8\":\"Talent from your Specialization (Tier 4)\",\"9\":\"Pick one more Talent from your Specialization, from any Tier from Tier 1 to Tier 3.\",\"10\":\"Talent from your Specialization (Tier 5)\"}},\"Spellcasting\":{\"Type\":\"Charge-based\",\"Description\":\"Warrior Abilities are Charge-based.\\nAs a Warrior, you have a number of Charges.\\nTo cast any Advanced Spell from your known spells, you must expend 1 Charge.\\nYou don't have restrictions for how many times you can cast a spell per Long Rest, but you have restrictions on your Charges.\\nAdvanced Abilities are all Abilities from the Spell Lists listed as Advanced.\\nIf an Ability is not listed as Advanced, you can use it as many times as you like.\\n\",\"Main Stat\":\"Choose permanently - Wisdom or Charisma\",\"Spell DC\":\"6 + (Main Stat)\",\"Charges\":{\"Amount\":3,\"Regain\":\"You regain all Charges back when you Long Rest.\"},\"Change\":\"You can change your known Spells (not Talents) when taking a Long Rest.\",\"Other\":\"All Warrior-specific abilities are considered Maneuvers (unless stated otherwise).\",\"Known Spells\":\"1 + Your Intelligence + Your Level\",\"Spell Lists\":[\"Maneuvers\"]},\"Starting Abilities\":{\"~Advanced Flank~\":{\"A\":\"Reaction or 0 Actions\",\"Cooldown\":\"2 uses / Round, only 1 use / Turn\",\"Effect\":\"When you flank-attack an enemy, or an ally flank-attacks an enemy with you, the flank damage bonus is +1d4 instead of +1.\",\"Name\":\"~Advanced Flank~\"}},\"Starting Abilities Description\":[{\"Advanced Flank\":\"Note the Action cost and Cooldown of Advanced Flank.\\nYou can use Advanced Flank once on your turn, and once outside of your turn, on an Ally's attack.\\nRemember that you have only 1 Reaction per Round!\\nIf you choose to use Advanced Flank on an ally's attack, you forego your other Reaction options, like making Opportunity Attacks.\\n\"}],\"Specializations\":{\"Description\":\"At Level 1, you can choose your specialization. Every Warrior can choose from the following Warrior specializations\",\"Choices\":[\"Fighter, a person specialized in weapon fighting and body-to-body combat\",\"Battlemaster, a heavily trained and armed warrior; master yourself - master the enemy\",\"Barbarian, a crude and battle thirsty warrior, who seeks to shed blood and lives for the fight\",\"Marksman, a precise and mechanical soldier, always finding the best tactic and position; the Marksman wins the battle before it begins\"]},\"Specs\":{\"Fighter\":{\"Description\":\"Lorem!\",\"Starting Abilities\":{\"~Overpower~\":{\"A\":\"0 Actions\",\"Cost\":\"1 (or 2 Charges)\",\"Cooldown\":\"Once per turn\",\"Effect\":\"Gain 0.5 Actions (or 1 Action) more this turn.\\nYou can do this once per turn.\\n\",\"Notes\":\"If you use 1 Charge, you gain 0.5 Actions. If you use 2 Charges, you gain 1 Action.\",\"Name\":\"~Overpower~\"},\"~Upper Hand~\":{\"A\":\"Passive\",\"Effect\":\"Your first attack you make before you move in a turn counts as if it is Flanking.\\nIf you are wielding a 1-Handed weapon, when you make an attack of opportunity, you can make 2 attacks of opportunity instead (with that weapon).\\n\",\"Name\":\"~Upper Hand~\"}},\"Talents\":{\"Level 2\":{\"<Might Over Magic>\":{\"A\":\"Passive\",\"Effect\":\"Choose an Advanced spell from the Elemental spell list that deals damage.\\nYou can cast that spell once per Long Rest.\\nThat spell becomes a physical version of itself.\\nInstead of using magic to cast that spell, you use your body/weapons/tools.\\nCome up with a description of how it works (see notes).\\nThe damage of that spell becomes Slash, Smash or Pierce, whichever makes sense.\\nIt counts as a Maneuver.\\n\",\"Notes\":\"E.g. Scorching Rays - you shoot 3 arrows with your bow (Pierce damage).\\nE.g. Frost Nova - you smash the ground with such force that it damages and slows units around you (Smash damage).\\nBe creative!\\n\",\"Name\":\"<Might Over Magic>\"},\"<Weaponmaster>\":{\"A\":\"Passive\",\"Effect\":\"When you get this, choose one weapon type.\\nYou have that weapon effect too, no matter what weapon you are using.\\nYou can the weapon type you always know on a Long Rest.\\n\",\"Name\":\"<Weaponmaster>\"}},\"Level 4\":{\"<Into the Fray>\":{\"A\":\"Passive\",\"Effect\":\"When combat starts, determine which side is your Allied Side and which is the Enemy Side of the battlefield. Each side has a direction (Allied Direction and Enemy Direction).\\nIf you end your turn more to the Allied Direction than you started, you gain 4 Shielding until the start of your next turn.\\nIf you end your turn more to the Enemy Direction than you started, your first attack next turn deals 1d6 extra damage.\\n\",\"Name\":\"<Into the Fray>\"},\"<Glory Run>\":{\"A\":\"Passive\",\"Effect\":\"When combat starts, a Glory Point appears behind the furthermost Enemy from you that you can see.\\nIf you touch the Glory Point, heal for 20% of your total Health and all Enemies you can see must pass a Charisma Check or be Crippled.\\nThe Glory Point then disappears.\\n\",\"Notes\":\"The Glory Point is not a physical thing. It's merely a concept (a point).\",\"Name\":\"<Glory Run>\"}}}},\"Battlemaster\":{\"Description\":\"Lorem? Ipsum!\",\"Starting Abilities\":{\"~Solid Defense~\":{\"A\":\"Passive\",\"Effect\":\"Whenever you are attacked (after damage), your Defense is reduced by 1.\\nEvery Long Rest, your Defense resets to its base value and is increased by +1 on top of it.\\n\",\"Name\":\"~Solid Defense~\"},\"~Defense Up~\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge.\",\"Effect\":\"Increase your Defense by 2.\",\"Name\":\"~Defense Up~\"},\"~Obliterate~\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge\",\"Cooldown\":\"Once per turn\",\"Effect\":\"Deal bonus damage on top of an attack equal to your current Defense (minimum 0).\\nReset your Defense.\\n\",\"Name\":\"~Obliterate~\"}},\"Talents\":{\"Level 2\":{\"<Protect the Meek>\":{\"A\":\"Reaction\",\"Cooldown\":\"2 times / Encounter\",\"Effect\":\"When an ally within 3 meters of you is targeted by a ranged attack, you become its target instead.\",\"Name\":\"<Protect the Meek>\"},\"<Bashing Charge>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Move 3 meters in a straight line, then choose a target near you.\\nThat target takes 1d8 damage and try to Stun the target (Might Check).\\n\",\"Name\":\"<Bashing Charge>\"},\"<Weaponmaster>\":{\"A\":\"Passive\",\"Effect\":\"When you get this, choose one weapon type.\\nYou have that weapon effect too, no matter what weapon you are using.\\nYou can the weapon type you always know on a Long Rest.\\n\",\"Name\":\"<Weaponmaster>\"}},\"Level 4\":{\"<Glory Run>\":{\"A\":\"Passive\",\"Effect\":\"When combat starts, a Glory Point appears behind the furthermost Enemy from you that you can see.\\nIf you touch the Glory Point, heal for 20% of your total Health and all Enemies you can see must pass a Charisma Check or be Crippled.\\nThe Glory Point then disappears.\\n\",\"Notes\":\"The Glory Point is not a physical thing. It's merely a concept (a point).\",\"Name\":\"<Glory Run>\"}}}},\"Barbarian\":{\"Description\":\"AAAAAAAAAAAA LOREMM!!\",\"Starting Abilities\":{\"~Onslaught~\":{\"A\":\"Passive\",\"Effect\":\"Whenever YOU kill a worthy enemy, heal for 1d6.\",\"Name\":\"~Onslaught~\"},\"~Reckless Attack~\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge.\",\"Effect\":\"After you land an attack, you can deal 2d6 damage to you and also add that damage to the attack.\",\"Name\":\"~Reckless Attack~\"},\"~Undying Rage~\":{\"A\":\"Reaction\",\"Cost\":\"1 Charge\",\"Effect\":\"Taking damage that would kill you leaves you at 1 Health instead.\",\"Name\":\"~Undying Rage~\"},\"~Blood Boil~\":{\"A\":\"0 Actions\",\"Cost\":\"1 Charge.\",\"Effect\":\"Heal for 2d6 health.\",\"Name\":\"~Blood Boil~\"}},\"Talents\":{\"Level 2\":{\"<Heartbeat Trance>\":{\"A\":\"0 Actions or Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Take 1d6 damage.\\nEnter a Heart Trance for 1 minute.\\nWhile in Heart Trance, you take 50% less damage from all non-Physical combat damage (except from your own abilities).\\nWhen Heart Trance ends, heal for 2d6.\\n\",\"Notes\":\"You can activate this as a Reaction when you would take damage.\",\"Name\":\"<Heartbeat Trance>\"},\"<Rage Trance>\":{\"A\":\"0 Actions or Reaction\",\"Cooldown\":\"Long rest\",\"Effect\":\"Take 1d6 damage.\\nUntil the end of your next turn, you are immune to Stuns, Slows, Snares, Cripples and being knocked Prone.\\nYour attacks while in Rage Trance have an extra +1 damage to all attacks.\\nWhen Rage Trance ends, heal for 2d6.\\n\",\"Notes\":\"You can activate this as a Reaction when you would be Crowd Controlled.\",\"Name\":\"<Rage Trance>\"},\"<Battle Trance>\":{\"A\":\"0 Actions or Reaction\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Take 1d6 damage.\\nEnter a Battle Trance that lasts until the end of your next turn.\\nYou gain a protective shield around you which absorbs up to Your Might + Your Level physical damage.\\nWhen Battle Trance ends, heal for 3d6, and the shield fades.\\n\",\"Notes\":\"You can activate this as a Reaction when you would take damage.\",\"Name\":\"<Battle Trance>\"}},\"Level 4\":{\"<Death Mark>\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Mark a Unit you can see.\\nWhenever YOU deal damage to it until your next turn, remember the damage done.\\nAt the start of your next turn, the mark bursts and the Unit takes directly 50% of the damage it has taken in this time period.\\n\",\"Name\":\"<Death Mark>\"},\"<Glory Run>\":{\"A\":\"Passive\",\"Effect\":\"When combat starts, a Glory Point appears behind the furthermost Enemy from you that you can see.\\nIf you touch the Glory Point, heal for 20% of your total Health and all Enemies you can see must pass a Charisma Check or be Crippled.\\nThe Glory Point then disappears.\\n\",\"Notes\":\"The Glory Point is not a physical thing. It's merely a concept (a point).\",\"Name\":\"<Glory Run>\"}}}},\"Marksman\":{\"Description\":\"Lorem ipsum dolor sit amet.\",\"Starting Abilities\":{\"~Marksmanship~\":{\"A\":\"Passive\",\"Effect\":\"YOU can flank a target from up to 6 meters away (if you, the target and the ally are on the same line).\",\"Notes\":\"As usual, that ally helping with your flank must right behind the target (meaning allies can't flank an enemy with you being 6 meters away).\",\"Name\":\"~Marksmanship~\"},\"~Reload~\":{\"A\":\"Passive\",\"Effect\":\"Once per turn, you get some damage modifiers to your first attack, depending on the current round:\\nYour first regular weapon attack in an encounter deals +1 damage.\\nYour second regular weapon attack in the encounter deals +1d6 damage.\\nYour third regular weapon attack and all upcoming ones in the encounter deal -5 damage.\\nYou can spend 1 Charge and 0 Actions to 'reset' this Ability to its original state.\\n\",\"Name\":\"~Reload~\"},\"~Point Mark~\":{\"A\":\"0 Actions\",\"Cooldown\":\"Once / Encounter\",\"Range\":\"15 meters\",\"Effect\":\"Mark a point on the ground.\\nAllies and you can use the mark to flank targets.\\nThose attacks do benefit from Advanced Flank.\\n\",\"Name\":\"~Point Mark~\"}},\"Talents\":{\"Level 2\":{\"<Recoil Shot>\":{\"A\":\"0 Actions\",\"Cooldown\":\"2 times / Long Rest\",\"Range\":\"2 meters\",\"Effect\":\"Dash up to 2 meters away from the target.\\nPush the target 2 meters away. It takes 1d8 Damage if it collides with something.\\n\",\"Notes\":\"This does not trigger attacks of oportunity.\",\"Name\":\"<Recoil Shot>\"},\"<Harpoon>\":{\"A\":\"1 Action\",\"Cooldown\":\"Long Rest\",\"Range\":\"6 meters\",\"Effect\":\"Make a ranged attack that deals 2d12 + Main Stat damage (against Defense).\\nThe target makes a Dexterity save.\\nIf it fails, it is pulled to you.\\nOtherwise, you are pulled to it.\\n\",\"Notes\":\"Requires a Harpoon, which can be bought for 50 Gold.\",\"Name\":\"<Harpoon>\"},\"<Precise Weapon>\":{\"A\":\"1 hour\",\"Effect\":\"Choose any weapon and make it Precise.\\nThe weapon's scaling becomes +4 instead of scaling with a Stat.\\nThe wielder of the weapon is also immune to Cripple and has +1 Movement Speed.\\nMaking another weapon Precise makes the previous back to how it was.\\n\",\"Name\":\"<Precise Weapon>\"}},\"Level 4\":{\"<Ground Aim Lock>\":{\"A\":\"Passive\",\"Effect\":\"Your first attack every turn while Prone deals +1d6 damage.\\nYou can go prone for 0 Actions on your turn.\\n\",\"Name\":\"<Ground Aim Lock>\"},\"<Scatterblast>\":{\"A\":\"1 Action\",\"Range\":\"20 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Make an attack on a target for 3d8 + Main Stat Smash damage.\\nThe impact is so powerful that all units within 3 meters of the target take the final damage taken by the target directly (not against Defense).\\nThis attack is affected by your Reload state.\\n\",\"Name\":\"<Scatterblast>\"},\"<Crosshair Shot>\":{\"A\":\"1 Action\",\"Range\":\"16 meters\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Make an attack on a target.\\nFor each meter to the target, the attack deals 1d6 Pierce damage, up to 8 meters.\\nFor each meter to the target over 8 meters, deal one less d6.\\n\",\"Notes\":\"At exactly 8 meters range, the attack deals 8d6 damage. At 7 and 9 meters, it deals 7d6. At 6 and 10 meters, 6d6. And so on.\",\"Name\":\"<Crosshair Shot>\"}}}}}}");

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ManySpells; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _Spell__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(12);
/* harmony import */ var _TwoSpells__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(56);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(7);







// Returns many TwoColumns, each fitting 2 spells.
function ManySpells(_ref) {
  var spells = _ref.spells;
  spells = Object(_utils__WEBPACK_IMPORTED_MODULE_5__[/* sortObjectArrayByKey */ "b"])(spells, 'OrderOnWebsite');
  if (spells.length == 0) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null);
  }
  if (spells.length == 1) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Spell__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      spell: spells[0]
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null));
  }
  var column1Spells = spells.filter(function (spell) {
    return spell.AlignOnWebsite == 'Left';
  });
  var column2Spells = spells.filter(function (spell) {
    return spell.AlignOnWebsite == 'Right';
  });
  var spellsRest = spells.filter(function (spell) {
    return spell.AlignOnWebsite == null;
  });
  var half = spellsRest.length % 2 === 0 ? spellsRest.length / 2 : Math.floor(spellsRest.length / 2) + 1;
  for (var i = 0; i < spellsRest.length; i++) {
    if (i < half) {
      column1Spells.push(spellsRest[i]);
    } else {
      column2Spells.push(spellsRest[i]);
    }
  }
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, column1Spells.map(function (spell) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Spell__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      key: spell.Name,
      spell: spell
    });
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, column2Spells.map(function (spell) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Spell__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      key: spell.Name,
      spell: spell
    });
  })));
}

/***/ }),
/* 27 */
/***/ (function(module) {

module.exports = JSON.parse("{\"a\":{\"A\":\"0 Actions\",\"Cooldown\":\"Long Rest\",\"Effect\":\"Gain 0.5 Actions this turn.\",\"Name\":\"~Action Surge~\"}}");

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);
      if (item[2]) {
        return '@media ' + item[2] + '{' + content + '}';
      } else {
        return content;
      }
    }).join('');
  }; // import a list of modules into the list

  list.i = function (modules, mediaQuery) {
    if (typeof modules === 'string') {
      modules = [[null, modules, '']];
    }
    var alreadyImportedModules = {};
    for (var i = 0; i < this.length; i++) {
      var id = this[i][0];
      if (id != null) {
        alreadyImportedModules[id] = true;
      }
    }
    for (i = 0; i < modules.length; i++) {
      var item = modules[i]; // skip already imported module
      // this implementation is not 100% perfect for weird media query combinations
      // when a module is imported multiple times with different media queries.
      // I hope this will never occur (Hey this way we have smaller bundles)

      if (item[0] == null || !alreadyImportedModules[item[0]]) {
        if (mediaQuery && !item[2]) {
          item[2] = mediaQuery;
        } else if (mediaQuery) {
          item[2] = '(' + item[2] + ') and (' + mediaQuery + ')';
        }
        list.push(item);
      }
    }
  };
  return list;
};
function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || '';
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */';
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }
  return [content].join('\n');
} // Adapted from convert-source-map (MIT)

function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;
  return '/*# ' + data + ' */';
}

/***/ }),
/* 29 */
/***/ (function(module, exports) {

module.exports = require("yaml");

/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SmallStatList; });
/* harmony import */ var _SmallStat_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(54);
/* harmony import */ var _SmallStat_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_SmallStat_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);


function SmallStatList(_ref) {
  var children = _ref.children,
    name = _ref.name,
    color = _ref.color;
  var smallStatColorClass = color == 'blue' ? 'small-stat--blue' : 'small-stat--normal';
  var smallStatNameColorClass = color == 'blue' ? 'small-stat__name--blue' : 'small-stat__name--normal';
  var smallStatListItemsColorClass = color == 'blue' ? 'small-stat__value--list--blue' : 'small-stat__value--list--normal';
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat-container"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat small-stat--column ".concat(smallStatColorClass)
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat__name ".concat(smallStatNameColorClass)
  }, name), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("div", {
    className: "small-stat__value small-stat__value--list ".concat(smallStatListItemsColorClass)
  }, children)), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement("br", null));
}

/***/ }),
/* 31 */
/***/ (function(module, exports) {

module.exports = require("react-static");

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _utils = __webpack_require__(39);
var requireById = function requireById(id) {
  if (!(0, _utils.isWebpack)() && typeof id === 'string') {
    return __webpack_require__(81)("" + id);
  }
  return __webpack_require__('' + id);
};
exports["default"] = requireById;

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = require("@reach/router");

/***/ }),
/* 34 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXPORTS
__webpack_require__.d(__webpack_exports__, "a", function() { return /* binding */ ManyBoxes; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TwoColumns/TwoColumns.js
var TwoColumns = __webpack_require__(6);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/TwoColumns/Column.js
var Column = __webpack_require__(2);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/Spell.js
var Spell = __webpack_require__(12);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/TwoSpells.js
var TwoSpells = __webpack_require__(56);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/utils.js
var utils = __webpack_require__(7);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/Spell.css
var Spell_Spell = __webpack_require__(42);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/PageH2/PageH2.js
var PageH2 = __webpack_require__(9);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Separator/Separator.js
var Separator = __webpack_require__(3);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Icon.js
var Icon = __webpack_require__(13);

// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/Weapon.js






function Weapon(_ref) {
  var weapon = _ref.weapon,
    isActuallyArmor = _ref.isActuallyArmor;
  console.log({
    weapon: weapon
  });
  if (weapon == null) {
    throw "Given null weapon to Weapon: ".concat(weapon);
  }
  if (weapon.Name == null) {
    console.log({
      weapon: weapon
    });
    throw "Weapon has no Name (printed above): ".concat(weapon);
  }
  var Name = weapon.Name,
    Stat = weapon.Stat,
    Hands = weapon.Hands,
    Special = weapon.Special,
    Requirement = weapon.Requirement,
    Damage = weapon.Damage,
    Effect = weapon.Effect,
    Description = weapon.Description,
    Alternatives = weapon.Alternatives,
    Notes = weapon.Notes,
    Downside = weapon.Downside;
  var ArmorBonus = weapon['Armor Bonus'];
  var iconName = Object(utils["d" /* stringReplaceAllMany */])(Name, [' ', '/', '%'], ['_', '_', '']);
  var descriptionElements = [Damage == null ? null : /*#__PURE__*/external_react_default.a.createElement("span", {
    key: "Damage"
  }, Damage, " ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Damage"
  }), "Damage"), ArmorBonus == null ? null : /*#__PURE__*/external_react_default.a.createElement("span", {
    key: "ArmorBonus"
  }, ArmorBonus, " ", /*#__PURE__*/external_react_default.a.createElement(Icon["a" /* default */], {
    name: "Defense"
  }), "Defense"), Effect == null ? null : /*#__PURE__*/external_react_default.a.createElement("span", {
    key: "Effect",
    style: {
      color: 'rgb(0, 180, 0)'
    }
  }, Effect), Downside == null ? null : /*#__PURE__*/external_react_default.a.createElement("span", {
    key: "Downside",
    style: {
      color: 'red'
    }
  }, Downside)].filter(function (elem) {
    return elem != null;
  });
  descriptionElements = Object(utils["a" /* insertBetweenAll */])(descriptionElements, function (key) {
    return /*#__PURE__*/external_react_default.a.createElement("span", {
      key: key
    }, /*#__PURE__*/external_react_default.a.createElement("br", null), /*#__PURE__*/external_react_default.a.createElement("br", null));
  });
  var extraText = [Description, Notes, Alternatives == null ? null : "Alternatives: ".concat(Alternatives)].filter(function (thing) {
    return thing != null && thing.length > 0;
  }).join('\n\n');
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell__border"
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell__background"
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell__box"
  }, " ", /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-top"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-top__icon-side"
  }, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: "/Icons/Items/".concat(iconName, ".png")
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-top__title-side"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-top__title__wrapper"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-top__title"
  }, Name)), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-top__stats"
  }, Hands != null && /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: "/Icons/UI/Special.png",
    className: "inline-icon--spell"
  }), Hands), Stat != null && /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: "/Icons/UI/Hand.png",
    className: "inline-icon--spell"
  }), Stat), Special != null && /*#__PURE__*/external_react_default.a.createElement("div", null, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: "/Icons/UI/Hand.png",
    className: "inline-icon--spell"
  }), Special)))), /*#__PURE__*/external_react_default.a.createElement(Separator["a" /* default */], null), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-description"
  }, descriptionElements), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "spell-notes"
  }, extraText)));
}
// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Spell/ManyBoxes.js







function ManyBoxes(_ref) {
  var objects = _ref.objects,
    type = _ref.type;
  function Box(_ref2) {
    var type = _ref2.type,
      object = _ref2.object;
    type = type.toLowerCase();
    switch (type) {
      case 'spell':
        return /*#__PURE__*/external_react_default.a.createElement(Spell["a" /* default */], {
          spell: object
        });
      case 'weapon':
        return /*#__PURE__*/external_react_default.a.createElement(Weapon, {
          weapon: object
        });
      case 'armor':
        return /*#__PURE__*/external_react_default.a.createElement(Weapon, {
          weapon: object,
          isActuallyArmor: true
        });
      default:
        throw "Unknown type given to ManyBoxes: type='".concat(type, "'");
    }
  }
  console.log({
    objects: objects
  });
  objects = Object(utils["b" /* sortObjectArrayByKey */])(objects, 'OrderOnWebsite');
  console.log({
    objects: objects
  });
  if (objects.length == 0) {
    return /*#__PURE__*/external_react_default.a.createElement("div", null);
  }
  if (objects.length == 1) {
    return /*#__PURE__*/external_react_default.a.createElement(TwoColumns["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(Box, {
      type: type,
      object: objects[0]
    })), /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null));
  }
  var column1Boxes = [];
  var column2Boxes = [];
  var half = objects.length % 2 === 0 ? objects.length / 2 : Math.floor(objects.length / 2) + 1;
  for (var i = 0; i < objects.length; i++) {
    if (i < half) {
      column1Boxes.push(objects[i]);
    } else {
      column2Boxes.push(objects[i]);
    }
  }
  return /*#__PURE__*/external_react_default.a.createElement(TwoColumns["a" /* default */], null, /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, column1Boxes.map(function (object) {
    return /*#__PURE__*/external_react_default.a.createElement(Box, {
      key: object.Name,
      type: type,
      object: object
    });
  })), /*#__PURE__*/external_react_default.a.createElement(Column["a" /* default */], null, column2Boxes.map(function (object) {
    return /*#__PURE__*/external_react_default.a.createElement(Box, {
      key: object.Name,
      type: type,
      object: object
    });
  })));
}

/***/ }),
/* 35 */
/***/ (function(module) {

module.exports = JSON.parse("{\"Light\":{\"Unarmored\":{\"Armor Bonus\":\"Your Dexterity\",\"Effect\":\"+1 meter Movement Speed and +1 to all Dexterity Checks\",\"Downside\":\"You take 50% more Piercing damage.\",\"Description\":\"No armor or very little clothing, such as a bare chest or lightly clothed body. You rely on your reflexes more than on armor.\"},\"Common Clothes\":{\"Armor Bonus\":1,\"Effect\":\"No bonus or drawback.\",\"Description\":\"Common Clothes can range from cheap peasant clothes to expensive, noble or formal clothes. Feel free to customize the way your character looks with Common Clothes!\"},\"Robes\":{\"Armor Bonus\":1,\"Requirement\":\"At least 2 Intelligence.\",\"Effect\":\"You have 1 extra Charge. If you're a Warlock, that Charge regenerates on Long Rests, not every combat.\",\"Description\":\"Robes vary in purpose and design. They can symbolize a wizard's robes, a priest's apparel or a noble's dress.\"},\"Leather Armor\":{\"Requirement\":\"Training in Medium Armor\",\"Armor Bonus\":2,\"Effect\":\"+4 Initiative\",\"Description\":\"The Breastplate and shoulder protectors of this armor are made of leather that has been stiffened by being boiled in oil. It takes a toll on the wearer's stamina.\"}},\"Medium\":{\"Padded Armor\":{\"Requirement\":\"Training in Medium Armor\",\"Armor Bonus\":2,\"Effect\":\"+3 total Health\",\"Description\":\"Padded Armor consists of quilted layers of cloth and batting. It's thickness is both a pro and a con, as it absorbs water quickly.\",\"Downside\":\"-5 on swimming Checks\"},\"Hide Armor\":{\"Requirement\":\"Training in Medium Armor\",\"Armor Bonus\":2,\"Effect\":\"You take only 50% Smash damage and from Falling.\",\"Description\":\"This crude armor consists of thick furs and pelts. It is commonly worn by Barbarian and other folk who lack access to the tools and materials needed to create better armor. Prone to catching fire.\",\"Downside\":\"You take 50% more Fire damage\"},\"Splint Armor\":{\"Requirement\":\"Training in Medium Armor\",\"Armor Bonus\":3,\"Description\":\"This armor is made of narrow vertical strips of metal riveted to a backing of leather that is worn over cloth padding. Flexible Chain Mail protects the joints, yet also puts some strain on them, hence the penalty to reflexes.\",\"Effect\":\"+1 Movement Speed\",\"Downside\":\"-2 Initiative and -2 Dexterity Combat Checks\"},\"Chain Mail\":{\"Requirement\":\"Training in Medium Armor\",\"Armor Bonus\":3,\"Description\":\"Made of interlocking metal rings, Chain Mail includes a layer of quilted fabric worn underneath the mail to prevent chafing and to cushion the impact of blows. Noisy, but effective.\",\"Downside\":\"-5 on all Checks for Stealth\"}},\"Heavy\":{\"Scale Mail\":{\"Requirement\":\"Training in Heavy Armor\",\"Armor Bonus\":4,\"Description\":\"This armor consists of a coat and leggings (and perhaps a separate skirt) of leather covered with overlapping pieces of metal, much like the scales of a fish. Great defense capabilities, though prone to breaking by force.\",\"Downside\":\"You take 150% Smash and Force damage.\"},\"Plate Armor\":{\"Armor Bonus\":4,\"Requirement\":\"Training in Heavy Armor and at least 2 Might\",\"Effect\":\"+3 maximum Health\",\"Description\":\"Plate consists of shaped, interlocking metal plates to cover the entire body. A suit of plate includes gauntlets, heavy leather boots, a visored helmet, and thick layers of padding underneath the armor. Buckles and straps distribute the weight over the body.\",\"Downside\":\"-1 meter Movement Speed and -3 on all Dexterity Checks\"}}}");

/***/ }),
/* 36 */
/***/ (function(module) {

module.exports = JSON.parse("{\"One-Handed Melee\":{\"Punch\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"1-Handed Melee\",\"Requirement\":\"At least 1 Might and 1 Dexterity\",\"Damage\":\"1d4 + 2 Smash\",\"Effect\":\"Each time you hit, you can move 1 more meter this turn.\",\"Alternatives\":\"Kick, Slam, Karate-Chop, etc\"},\"Club\":{\"Stat\":\"Might\",\"Hands\":\"1-Handed melee\",\"Damage\":\"1d8 Smash\",\"Effect\":\"If the target's Defense is more than 5, it counts as 5 against attacks with this weapon.\",\"Alternatives\":\"Katar (Slash instead of Smash)\"},\"Dagger\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Melee\",\"Special\":\"Optionally Thrown\",\"Damage\":\"1d6 + 1 Pierce\",\"Effect\":\"If you roll 6 on the main roll, deal an extra 1d6 damage.\",\"Alternatives\":\"Kunai\"},\"Mace\":{\"Stat\":\"Might\",\"Hands\":\"1-Handed Melee\",\"Damage\":\"2d4 - 1 Smash\",\"Effect\":\"Ignores resistance to physical damage. If you roll 1 and 1, it counts as 8 damage.\",\"Alternatives\":\"Light Morning Star\"},\"Hand Axe\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"1-Handed Melee\",\"Special\":\"Optionally Thrown\",\"Damage\":\"1d12 - 2 Slash\",\"Effect\":\"If you rolled a 11 or 12 on the die, heal for 1 health (against a Worthy Enemy).\",\"Alternatives\":\"Claws (not Optionally Thrown)\"},\"Hand Hammer\":{\"Stat\":\"Might\",\"Hands\":\"1-Handed Melee\",\"Special\":\"Optionally Thrown\",\"Damage\":\"2d6 - 3 Smash\",\"Effect\":\"6 counts as 7 on the base rolls.\"},\"Sickle\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"1-Handed Melee\",\"Requirement\":\"At least 1 Might and 1 Dexterity\",\"Damage\":\"4 Slash\",\"Alternatives\":\"Nunchaku (Smash instead of Slash)\"},\"Spear\":{\"Stat\":\"Might\",\"Hands\":\"1-Handed Melee\",\"Damage\":\"1d10 - 1 Pierce\",\"Effect\":\"2 meters range.\",\"Alternatives\":\"Lance\"},\"Flail\":{\"Stat\":\"Might\",\"Hands\":\"1-Handed Melee\",\"Damage\":\"1d12 - 2 Pierce\",\"Effect\":\"You can choose to deal Smash damage instead of Pierce.\",\"Alternatives\":\"Combat Chains, Kusarigama\"},\"Shortsword\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"1-Handed Melee\",\"Damage\":\"1d6 + 1 Slash\",\"Effect\":\"If the target's armor is 2 or less, attacks ignore armor.\",\"Alternatives\":\"Falchion, Sabre, Scimitar variant, Arming Sword\"},\"Scimitar\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"1-Handed Melee\",\"Special\":\"You are more appreciated if you pronounce it as 'Skimitar'\",\"Damage\":\"1d8 Slash\",\"Effect\":\"If you roll 1 on the damage die, reroll the die.\"},\"Rapier\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Melee\",\"Requirement\":\"At least 2 Dexterity\",\"Damage\":\"1d8 Pierce\",\"Effect\":\"If your other hand is empty, your Rapier attacks do +1 Damage.\"},\"Cleaver\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"1-Handed Melee\",\"Special\":\"Optionally Thrown\",\"Damage\":\"1d6 + 1 Slash\",\"Effect\":\"Flank attacks do an extra +1 damage.\",\"Alternatives\":\"Dead Fish (Smash instead of Slash)\"},\"Warglaive\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Melee\",\"Special\":\"Optionally Thrown\",\"Requirement\":\"At least 1 Dexterity\",\"Damage\":\"1d12 - 2 Slash\",\"Alternatives\":\"Anchor, Boomerang, Chakram, Shuriken\"}},\"Two-Handed Melee\":{\"Greatclub\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"4d4 Smash\",\"Effect\":\"If you roll 4 and 4, the target must pass a Might Save or be Stunned.\"},\"Warhammer\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"2d8 + 1 Smash\",\"Effect\":\"Your first attack with this weapon on the first round of combat ignores 50% of the target's armor.\"},\"Heavy Mace\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"1d12 + 3 Smash\",\"Effect\":\"Ignores physical damage resistance.\"},\"Longsword\":{\"Stat\":\"Might\",\"Hands\":\"1-Handed or 2-Handed Melee\",\"Damage\":\"1d10 / 1d12 + 3 damage\",\"Effect\":\"Can be wielded either as a 1-Handed (for 1d10 damage) or 2-Handed weapon (for 1d12 damage).\",\"Alternatives\":null,\"Notes\":\"You only need to be trained in 1-Handed or 2-Handed weapons to wield this weapon in both ways.\"},\"Greatsword\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"3d6 Slash\",\"Effect\":\"If all three d6 are 6, deal another 3d6 damage!\",\"Alternatives\":\"Claymore\"},\"Ultra Greatsword\":{\"Stat\":\"Might\",\"Requirement\":\"At least 3 Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"1d20 - 1 Slash\"},\"Quarterstaff\":{\"Stat\":\"Dexterity\",\"Hands\":\"2-Handed Melee\",\"Requirement\":\"At least 1 Might and 1 Dexterity\",\"Damage\":\"1d10 + 4 Smash\",\"Effect\":\"If you are wearing no armor, you have +1 Defense against melee weapon attacks.\",\"Notes\":\"A Quarterstaff is a wooden weapon masterfully crafted for physical combat; it's not a mage's walking stick!\"},\"Battle Axe\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"2d12 - 3 Slash\",\"Effect\":\"For each 11 and 12 rolled on the base dice, heal for 1 health (against Worthy Enemies).\"},\"Scythe\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"2-Handed Melee\",\"Requirement\":\"At least 1 Might and 1 Dexterity\",\"Damage\":\"3d4 + 3 Slash\",\"Effect\":\"Instead of attacking, you can just deal 8 damage to all Units around you (against their armor).\"},\"Pike\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"1d12 + 3 Pierce\",\"Effect\":\"2 meters range.\"},\"Halberd\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"2d10 - 1 Slash\",\"Effect\":\"Has +1 damage against Large or larger enemies.\",\"Alternatives\":\"Garden Rake, Glaive, Bardiche\"},\"Katana\":{\"Stat\":\"Dexterity\",\"Hands\":\"2-Handed Melee\",\"Requirement\":\"At least 2 Dexterity\",\"Damage\":\"2d12 - 3 Slash\",\"Effect\":\"If you roll the same number on both dice, deal 1d8 extra damage.\"},\"Trident\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"3d6 - 1 Pierce\",\"Effect\":\"If you moved at least 3 meters in a straight line and then attacked, the attack gains +1d4 damage.\",\"Alternatives\":\"Pitchfork\"},\"Pickaxe\":{\"Stat\":\"Might\",\"Hands\":\"2-Handed Melee\",\"Damage\":\"2d4 + 5 Pierce\",\"Effect\":\"Deals +1d4 damage against humanoids wearing shields.\",\"Alternatives\":\"Falx\"},\"Whip\":{\"Stat\":\"Dexterity\",\"Hands\":\"2-Handed Melee\",\"Requirement\":\"At least 1 Dexterity\",\"Damage\":\"1d4 + 7 Pierce\",\"Effect\":\"Deals +1d4 damage against unarmored or lightly armored creatures.\"}},\"Two-Handed Ranged\":{\"Longbow\":{\"Stat\":\"Dexterity\",\"Hands\":\"2-Handed Ranged\",\"Damage\":\"1d8 + 5 Pierce\",\"Effect\":\"Deal +1d8 extra damage if you roll 8.\"},\"Shortbow\":{\"Stat\":\"None\",\"Hands\":\"2-Handed Ranged\",\"Damage\":\"2d8 Pierce\",\"Effect\":\"Shortbow does not require Training to use properly.\",\"Alternatives\":\"Javelin, Rock Throwing\",\"Notes\":\"This weapon is intended for characters who are not trained in ranged weapons, such as heavy melee, strength based warriors who want a decent ranged attack once in a while.<br>Attacks with the Shortbow do not benefit from Stats.\"},\"Heavy Crossbow\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"2-Handed Ranged\",\"Damage\":\"3d6 Pierce\",\"Downside\":\"You must use either 0.5 Actions or all of your possible movement to reload the Heavy Crossbow before you can use it again.\"},\"Heavy Gun\":{\"Stat\":\"Might or Dexterity\",\"Hands\":\"2-Handed Ranged\",\"Damage\":\"4d4 + 2 Pierce\",\"Effect\":\"Instead of attacking, you can spend 5 ammo to deal 4 damage to all creatures in a 3x3 area directly in front of you\",\"Downside\":\"You must always spend 0.5 Actions to reload the gun before you can attack or do its special ability again.\"}},\"One-Handed Ranged\":{\"Sling\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Ranged\",\"Damage\":\"1d8 Smash\",\"Effect\":\"Attacks with slings use 0.33 actions\",\"Alternatives\":\"Slingshot\",\"Downside\":\"Carrying the perfect rocks for the Sling reduces your movement speed by 1 meter.\",\"Notes\":\"Yes, and you can attack 3 times per turn with the same sling. Abilities that require you to make a 1-Handed weapon attack will still take 0.5 Actions, even if the normal Sling attack would take 0.33 Actions\"},\"Light Crossbow\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Ranged\",\"Damage\":\"1d10 - 1 Pierce\",\"Alternatives\":\"Handgun variant\",\"Downside\":\"You must use either 0.25 Actions or half of your possible movement to reload the Light Crossbow before you can use it again.\"},\"Handgun\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Ranged\",\"Damage\":\"1d6 + 1 Pierce\",\"Effect\":\"You have no penalties for melee attacks with the Handgun.\",\"Alternatives\":\"Light Crossbow variant\",\"Downside\":\"The half range of the Handgun is 3 meters.<br>You must use either 0.25 Actions or half of your possible movement to reload the Handgun before you can use it again.\"},\"Blowgun\":{\"Stat\":\"Dexterity\",\"Hands\":\"1-Handed Ranged\",\"Damage\":\"1d8 Pierce\",\"Effect\":\"If the target has below 50% Health, deals 1 extra Poison damage which ignores Defense. You can make as many attacks per turn witht he Blowgun as you can.\",\"Alternatives\":\"Poison Darts\"}}}");

/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "react-static"
var external_react_static_ = __webpack_require__(31);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/Router.js
var Router = __webpack_require__(8);

// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/containers/Dynamic.js

/* harmony default export */ var Dynamic = (function () {
  return /*#__PURE__*/external_react_default.a.createElement("div", null, "This is a dynamic page! It will not be statically exported, but is available at runtime");
});
// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/app.css
var app = __webpack_require__(91);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/nav.css
var nav = __webpack_require__(95);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/page-style.css
var page_style = __webpack_require__(96);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/PageH1/PageH1.js
var PageH1 = __webpack_require__(10);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/PageH2/PageH2.js
var PageH2 = __webpack_require__(9);

// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/App.js


//








// Any routes that start with 'dynamic' will be treated as non-static routes
Object(external_react_static_["addPrefetchExcludes"])(['dynamic']);
function App() {
  return /*#__PURE__*/external_react_default.a.createElement(external_react_static_["Root"], null, /*#__PURE__*/external_react_default.a.createElement("div", {
    id: "Window"
  }, /*#__PURE__*/external_react_default.a.createElement("nav", null, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/"
  }, "Home")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Other/Weapons"
  }, "Weapons")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Other/Armors"
  }, "Armors")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "#"
  }, "Races"), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Bertle")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Dragonborn")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Dwarf")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Elf")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Gnome")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Hollow")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Human")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/blog"
  }, "Orc")))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "#"
  }, "Classes"), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-cleric"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Cleric"
  }, "Cleric")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-druid"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Druid"
  }, "Druid")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-hunter"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Hunter"
  }, "Hunter")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-mage"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Mage"
  }, "Mage")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-paladin"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Paladin"
  }, "Paladin")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-rogue"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Rogue"
  }, "Rogue")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-shaman"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Shaman"
  }, "Shaman")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-warlock"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Warlock"
  }, "Warlock")), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "nav-item__dropdown-item hover-warrior"
  }, /*#__PURE__*/external_react_default.a.createElement(Router["a" /* Link */], {
    to: "/Classes/Warrior"
  }, "Warrior"))))), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "content"
  }, /*#__PURE__*/external_react_default.a.createElement(external_react_default.a.Suspense, {
    fallback: /*#__PURE__*/external_react_default.a.createElement("em", null, "Loading...")
  }, /*#__PURE__*/external_react_default.a.createElement(Router["b" /* Router */], null, /*#__PURE__*/external_react_default.a.createElement(Dynamic, {
    path: "dynamic"
  }), /*#__PURE__*/external_react_default.a.createElement(external_react_static_["Routes"], {
    path: "*"
  })))), /*#__PURE__*/external_react_default.a.createElement("footer", {
    className: "footer"
  })));
}
/* harmony default export */ var src_App = __webpack_exports__["a"] = (App);

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/typeof");

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof2 = __webpack_require__(38);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cacheProm = exports.loadFromPromiseCache = exports.cacheExport = exports.loadFromCache = exports.callForString = exports.createDefaultRender = exports.createElement = exports.findExport = exports.resolveExport = exports.tryRequire = exports.DefaultError = exports.DefaultLoading = exports.babelInterop = exports.isWebpack = exports.isServer = exports.isTest = undefined;
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
var _typeof = typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol" ? function (obj) {
  return _typeof2(obj);
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
};
var _react = __webpack_require__(0);
var React = _interopRequireWildcard(_react);
var _requireById = __webpack_require__(32);
var _requireById2 = _interopRequireDefault(_requireById);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj["default"] = obj;
    return newObj;
  }
}
var isTest = exports.isTest = "production" === 'test';
var isServer = exports.isServer = !(typeof window !== 'undefined' && window.document && window.document.createElement);
var isWebpack = exports.isWebpack = function isWebpack() {
  return typeof __webpack_require__ !== 'undefined';
};
var babelInterop = exports.babelInterop = function babelInterop(mod) {
  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && mod.__esModule ? mod["default"] : mod;
};
var DefaultLoading = exports.DefaultLoading = function DefaultLoading() {
  return React.createElement('div', null, 'Loading...');
};
var DefaultError = exports.DefaultError = function DefaultError(_ref) {
  var error = _ref.error;
  return React.createElement('div', null, 'Error: ', error && error.message);
};
var tryRequire = exports.tryRequire = function tryRequire(id) {
  try {
    return (0, _requireById2["default"])(id);
  } catch (err) {
    // warn if there was an error while requiring the chunk during development
    // this can sometimes lead the server to render the loading component.
    if (false) {}
  }
  return null;
};
var resolveExport = exports.resolveExport = function resolveExport(mod, key, onLoad, chunkName, props, modCache) {
  var isSync = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : false;
  var exp = findExport(mod, key);
  if (onLoad && mod) {
    var _isServer = typeof window === 'undefined';
    var info = {
      isServer: _isServer,
      isSync: isSync
    };
    onLoad(mod, info, props);
  }
  if (chunkName && exp) cacheExport(exp, chunkName, props, modCache);
  return exp;
};
var findExport = exports.findExport = function findExport(mod, key) {
  if (typeof key === 'function') {
    return key(mod);
  } else if (key === null) {
    return mod;
  }
  return mod && (typeof mod === 'undefined' ? 'undefined' : _typeof(mod)) === 'object' && key ? mod[key] : babelInterop(mod);
};
var createElement = exports.createElement = function createElement(Component, props) {
  return React.isValidElement(Component) ? React.cloneElement(Component, props) : React.createElement(Component, props);
};
var createDefaultRender = exports.createDefaultRender = function createDefaultRender(Loading, Err) {
  return function (props, mod, isLoading, error) {
    if (isLoading) {
      return createElement(Loading, props);
    } else if (error) {
      return createElement(Err, _extends({}, props, {
        error: error
      }));
    } else if (mod) {
      // primary usage (for async import loading + errors):
      return createElement(mod, props);
    }
    return createElement(Loading, props);
  };
};
var callForString = exports.callForString = function callForString(strFun, props) {
  return typeof strFun === 'function' ? strFun(props) : strFun;
};
var loadFromCache = exports.loadFromCache = function loadFromCache(chunkName, props, modCache) {
  return !isServer && modCache[callForString(chunkName, props)];
};
var cacheExport = exports.cacheExport = function cacheExport(exp, chunkName, props, modCache) {
  return modCache[callForString(chunkName, props)] = exp;
};
var loadFromPromiseCache = exports.loadFromPromiseCache = function loadFromPromiseCache(chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)];
};
var cacheProm = exports.cacheProm = function cacheProm(pr, chunkName, props, promisecache) {
  return promisecache[callForString(chunkName, props)] = pr;
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function escape(url, needQuotes) {
  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them

  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls

  if (/["'() \t\n]/.test(url) || needQuotes) {
    return '"' + url.replace(/"/g, '\\"').replace(/\n/g, '\\n') + '"';
  }
  return url;
};

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, "\r\n:root {\r\n    --table-row-side-padding: 12px;\r\n}\r\n\r\n.table-normal-container-wrapper {\r\n    display: block;\r\n    width: 100%;\r\n    margin-top: 12px;\r\n    margin-bottom: 12px;\r\n}\r\n.table-normal-container {\r\n    border: solid var(--medium-color) 2px;\r\n    padding: 2px;\r\n    display: block;\r\n}\r\n.table-normal-container table {\r\n    table-layout: fixed;            /* Forces all cells to have their own width */\r\n    border-collapse: separate;      /* Not sure */\r\n    width: 100%;\r\n}\r\n.table-normal__header-row-container table {\r\n    border-spacing: 0 4px;          /* Space between rows */\r\n}\r\n.table-normal-wrapper table {\r\n    border-spacing: 0 8px;          /* Space between rows */\r\n}\r\n.table-normal-container td, .table-normal-container th {\r\n    text-align: center;\r\n    padding: 4px;\r\n    border: none;\r\n    margin: 0px;\r\n    width: 200px;\r\n}\r\n.table-normal-container th {\r\n    font-family: TitleFont;\r\n    font-weight: 100;\r\n}\r\n\r\n.table-normal__header-row-container {\r\n    background-color: var(--medium-color);\r\n    color: white !important;\r\n    padding-left: var(--table-row-side-padding);\r\n    padding-right: var(--table-row-side-padding);\r\n}\r\n.table-normal-wrapper {\r\n    padding-left: var(--table-row-side-padding);\r\n    padding-right: var(--table-row-side-padding);\r\n}\r\n\r\n/* Row Styling */\r\n.table-normal-wrapper table tr:nth-child(even) {\r\n    background-color: white;\r\n    color: black; \r\n    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.15);\r\n}\r\n.table-normal-wrapper table tr:nth-child(odd) {\r\n    background-color: rgb(232, 232, 232);\r\n    color: black; \r\n    box-shadow: 0px 0px 5px 0px rgba(0,0,0,0.075);\r\n}\r\ntd:first-child, th:first-child {    /* For rounded borders */\r\n  border-radius: 2px 0 0 2px;\r\n}\r\ntd:last-child, th:last-child {\r\n  border-radius: 0 2px 2px 0;\r\n}\r\n\r\n\r\n/* Width Configuration */\r\n.table--info td:nth-child(1), .table--info th:nth-child(1) { width: 25%; vertical-align: baseline; }\r\n.table--info td:nth-child(2), .table--info th:nth-child(2) { width: 75%; }", ""]);



/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Imports
var urlEscape = __webpack_require__(40);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(102));

// Module
exports.push([module.i, ":root {\r\n    --spell-border-width: 16px;\r\n    --spell-true-border-width: 6px;\r\n    --spell-box-width: 400px;\r\n    /* --spell-max-width: 450px; */\r\n\r\n    --spell-border-z: 20;\r\n\r\n    --spell-banner-height: 0px;\r\n\r\n    --spell-padding: 16px;\r\n    --spell-padding-small: 6px;\r\n    --spell-icon-size: 90px;\r\n\r\n    --subspell-size-multiplier: 0.75;\r\n}\r\n\r\n.spell {\r\n    /* width: var(--spell-box-width); */\r\n    width: 100%;\r\n    max-width: var(--spell-max-width);\r\n    position: relative;\r\n    margin: auto;\r\n    margin-bottom: var(--page-padding);\r\n\r\n    white-space: pre-line; /* Uses \\n instead of <br> for new lines */ \r\n    box-shadow: 0px 0px 10px 2px rgba(0,0,0,0.41);\r\n}\r\n.spell--normal {}\r\n.spell--subspell {\r\n    width: calc(100% * var(--subspell-size-multiplier));\r\n    max-width: calc(var(--subspell-size-multiplier) * var(--spell-max-width));\r\n}\r\n/* Decoration */\r\n.spell__border {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    -o-border-image: url(" + ___CSS_LOADER_URL___0___ + ") 16 stretch;\r\n       border-image: url(" + ___CSS_LOADER_URL___0___ + ") 16 stretch;\r\n    border-width: var(--spell-border-width);\r\n    border-style: solid;\r\n    border-color: transparent;\r\n    box-sizing: border-box;\r\n    -moz-box-sizing: border-box;\r\n    -webkit-box-sizing: border-box;\r\n    z-index: 60;\r\n}\r\n.spell--subspell .spell__border {\r\n    border-width: calc(var(--spell-border-width) / 3 * 2);\r\n}\r\n.spell__banner {\r\n    position: absolute;\r\n    background-color: var(--medium-color);\r\n    height: var(--spell-banner-height);\r\n    width: calc(var(--spell-box-width) - 12px);\r\n    left: var(--spell-true-border-width);\r\n    top: var(--spell-true-border-width);\r\n    border-bottom: solid black 2px;\r\n    z-index: 40;\r\n}\r\n.spell__background {\r\n    position: absolute;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: 20;\r\n    background-color: white;\r\n    \r\n}\r\n\r\n\r\n/* Actual spell box */\r\n.spell__box {\r\n    height: 100%;\r\n    position: relative;\r\n    margin: auto;\r\n    padding-top: calc(var(--spell-banner-height) + var(--spell-padding-small));\r\n    padding-left: var(--spell-padding-small);\r\n    padding-right: var(--spell-padding-small);\r\n    z-index: 80;\r\n}\r\n\r\n\r\n/* Spell Top */\r\n.spell-top {\r\n    display: flex;\r\n    flex-direction: row;\r\n    min-height: calc(var(--spell-icon-size) + 2 * var(--spell-padding));\r\n}\r\n.spell-top__icon-side {\r\n    padding: var(--spell-padding);\r\n    padding-right: 0px;\r\n    padding-bottom: 0px;\r\n    z-index: 120;\r\n}\r\n.spell-top__icon-side img {\r\n    width: var(--spell-icon-size);\r\n    padding: 1px;\r\n    border: solid black 1px;\r\n}\r\n.spell--passive .spell-top__icon-side img {\r\n    border-radius: 100%;\r\n    padding: 2px;\r\n}\r\n.spell--subspell .spell-top__icon-side img {\r\n    width: calc(var(--subspell-size-multiplier) * var(--spell-icon-size));\r\n    height: calc(var(--subspell-size-multiplier) * var(--spell-icon-size));\r\n}\r\n.spell-top__title-side {\r\n    flex: 1 1;\r\n}\r\n.spell-top__title__wrapper {\r\n    width: 90%;\r\n    border: solid black 2px;\r\n    border-left: none;\r\n    margin-top: calc(var(--spell-padding) + var(--spell-padding-small));\r\n    display: inline-block;\r\n    padding: 1px;\r\n    z-index: 100;\r\n}\r\n.spell--passive .spell-top__title__wrapper {\r\n    margin-top: calc(20.95px + var(--spell-padding));\r\n    margin-left: -7px;\r\n}\r\n.spell--subspell.spell--passive .spell-top__title__wrapper {\r\n    margin-top: calc(8px + var(--spell-padding));\r\n    margin-left: -11px;\r\n}\r\n.spell-top__title {\r\n    border: solid black 1px;\r\n    border-top-right-radius: 6px;\r\n    border-bottom-right-radius: 6px;\r\n    border-left: none;\r\n    background-color: white;\r\n    color: var(--dark-color);\r\n    \r\n    min-width: 125px;\r\n\r\n    padding: calc(var(--spell-padding) / 2);\r\n    padding-left: calc(var(--spell-padding) + 6px);\r\n    padding-right: var(--spell-padding);\r\n\r\n    font-weight: bold;\r\n    font-size: 1.25rem;\r\n    letter-spacing: 0.075rem;\r\n    font-family: TitleFont;\r\n    text-align: center;\r\n    white-space: nowrap;\r\n}\r\n\r\n.spell-top__stats {\r\n    padding: var(--spell-padding);\r\n    padding-bottom: 0px;\r\n    display: flex;\r\n    /* flex-direction: column; */\r\n    flex-direction: row;\r\n    flex-wrap: wrap;\r\n}\r\n.spell-top__stats div {\r\n    font-family: TextFont;\r\n    font-size: 0.9em;\r\n    line-height: 18px;\r\n    display: inline-block;\r\n\r\n    border-radius: 4px;\r\n\r\n    margin-bottom: var(--spell-padding-small);\r\n    margin-right: var(--spell-padding);\r\n}\r\n\r\n\r\n/* Bottom side */\r\n.spell .separator {\r\n    margin-top: 0px;\r\n    margin-bottom: 0px;\r\n}\r\n.spell-description {\r\n    padding: var(--spell-padding);\r\n    padding-top: var(--spell-padding-small);\r\n    padding-bottom: calc(var(--spell-padding) * 1.5);\r\n}\r\n.spell-notes {\r\n    padding: var(--spell-padding);\r\n    padding-top: var(--spell-padding-small);\r\n    padding-bottom: calc(3 * var(--spell-padding-small));\r\n\r\n    color: #999999;\r\n    font-style: italic;\r\n    font-size: 0.75em;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n/* Spell Container */\r\n.many-spells-container {\r\n    /* box-sizing: border-box;\r\n    display: flex;\r\n    flex-direction: column;\r\n    flex-wrap: wrap;\r\n    justify-content: flex-start;\r\n    align-items: flex-start; */\r\n\r\n    width: 100%;\r\n    margin: 0 auto;\r\n    height: 500px;\r\n    /* height: 470px; */\r\n    display: flex;\r\n    flex-flow: column wrap; /* Shorthand – you could use ‘flex-direction: column’ and ‘flex-wrap: wrap’ instead */\r\n    justify-content: flex-start;\r\n    align-items: flex-start;\r\n}\r\n.many-spells-container .spell {\r\n    max-width: 30%;\r\n    display: block;\r\n}\r\n\r\n.item {\r\n    background-color: orange;\r\n    height: 150px;\r\n    width: 31%;\r\n    margin: 1%;\r\n    padding: 10px;\r\n  }\r\n  \r\n  .item:nth-child(2) {\r\n    background-color: pink;\r\n    height: 250px;\r\n  }\r\n  \r\n  .item:nth-child(3) {\r\n    height: 190px;\r\n  }\r\n  \r\n  .item:nth-child(4) {\r\n    background-color: aqua;\r\n    height: 220px;\r\n  }", ""]);



/***/ }),
/* 43 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 44 */
/***/ (function(module, exports) {

module.exports = require("E:\\Work\\GitHub\\Call of Heroes Design\\call-of-heroes-dev\\WebsiteReact\\call-of-heroes-react-static\\node_modules\\react-static\\lib\\browser");

/***/ }),
/* 45 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var ReportContext = _react2["default"].createContext({
  report: function report() {}
});
exports["default"] = ReportContext;

/***/ }),
/* 47 */
/***/ (function(module, exports) {

module.exports = require("hoist-non-react-statics");

/***/ }),
/* 48 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireDefault");

/***/ }),
/* 49 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/interopRequireWildcard");

/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "404 - Oh no's! We couldn't find that page :("));
});

/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);

/* harmony default export */ __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "React Static is a progressive static site generator for React."));
});

/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Blog; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_static__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);


//

function Blog() {
  var _useRouteData = Object(react_static__WEBPACK_IMPORTED_MODULE_1__["useRouteData"])(),
    posts = _useRouteData.posts;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h1", null, "It's blog time."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#bottom",
    id: "top"
  }, "Scroll to bottom!")), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), "All Posts:", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("ul", null, posts.map(function (post) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("li", {
      key: post.id
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Router__WEBPACK_IMPORTED_MODULE_2__[/* Link */ "a"], {
      to: "/blog/post/".concat(post.id, "/")
    }, post.title));
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("a", {
    href: "#top",
    id: "bottom"
  }, "Scroll to top!"));
}

/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Cleric; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(16);
var _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(16, 1);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_15___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(26);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Cleric() {
  console.log('CLERIC');
  console.log({
    theClass: _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '0px',
      marginTop: '0px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__['Starting Abilities'],
    description: _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Cleric_json__WEBPACK_IMPORTED_MODULE_14__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, "Choose One..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_16__[/* default */ "a"], {
      spells: _utils__WEBPACK_IMPORTED_MODULE_2__[/* spellsFromObject */ "c"](spec.Abilities)
    }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ".small-stat-container {\r\n    display: block;\r\n    margin-top: 12px;\r\n    margin-bottom: 12px;\r\n}\r\n.small-stat {\r\n    width: auto;\r\n    display: inline-flex;   /* Does not take parent width and rescales with content size */\r\n}\r\n.small-stat--column { flex-direction: column; }\r\n.small-stat--row    { flex-direction: row; }\r\n\r\n.small-stat--normal { border: solid var(--darker-color) 2px; }\r\n.small-stat--blue   { border: solid var(--darker-blue) 2px; }\r\n.small-stat__name--normal { background-color: var(--dark-color); }\r\n.small-stat__name--blue   { background-color: var(--dark-blue); }\r\n\r\n\r\n.small-stat div {   /* Affects both __name and __value */\r\n    padding: 5px;\r\n    padding-left: 10px;\r\n    padding-right: 10px;\r\n}\r\n.small-stat__name {\r\n    letter-spacing: 0.10rem;\r\n    font-family: TitleFont;\r\n    color: white;\r\n\r\n}\r\n.small-stat__value {\r\n    margin: 0px;\r\n    background-color: white;\r\n    color: var(--dark-color);\r\n    font-size: 1.35rem;\r\n    line-height: 1.75rem;\r\n}\r\n\r\n/* For List variant of SmallStat */\r\n.small-stat__value--list {\r\n    padding: 0px !important;\r\n    padding-left: 0px !important;   /* For clarity */\r\n    padding-right: 0px !important;  /* For clarity */\r\n}\r\n.small-stat__value--list div {\r\n    padding-top: 6px;\r\n    padding-bottom: 6px;\r\n}\r\n.small-stat__value--list--normal div { border-top: solid var(--darker-color) 2px; }\r\n.small-stat__value--list--normal div:first-child { border-top: none; }\r\n.small-stat__value--list--blue div { border-top: solid var(--dark-blue) 2px; }\r\n.small-stat__value--list--blue div:first-child { border-top: none; }", ""]);



/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ".two-columns {\r\n    width: 100%;\r\n    /* min-height: 300px; */\r\n\r\n    display: flex;\r\n    flex-direction: row;\r\n}\r\n.column {\r\n    display: relative;\r\n    padding-top: calc(var(--page-padding) / 2);\r\n    padding-bottom: calc(var(--page-padding) / 2);\r\n    /* min-height: 300px; */\r\n}\r\n.column:nth-child(1) {\r\n    padding-right: calc(var(--page-padding) / 2);\r\n}\r\n.column:nth-child(2) {\r\n    padding-left: calc(var(--page-padding) / 2);\r\n}\r\n\r\n.class-image {\r\n    position: absolute;\r\n    z-index: -0.5;\r\n    height: 800px;\r\n    width: auto;\r\n}\r\n\r\n.two-columns--normal .column {\r\n    flex: 1 1;\r\n}\r\n.two-columns--lefty .column:nth-child(1) {\r\n    flex: 3 1;\r\n}\r\n.two-columns--lefty .column:nth-child(2) {\r\n    flex: 2 1;\r\n}\r\n  ", ""]);



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export default */
/* harmony import */ var _Spell__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(12);
/* harmony import */ var _TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(2);
/* harmony import */ var _Spell_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(42);
/* harmony import */ var _Spell_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_Spell_css__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_4__);





function TwoSpells(_ref) {
  var spells = _ref.spells;
  if (spells == null || spells.length == 0) throw "TwoSpells spells given should be an array of spell objects";
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_1__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Spell__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], {
    spell: spells[0]
  })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_2__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_4___default.a.createElement(_Spell__WEBPACK_IMPORTED_MODULE_0__[/* default */ "a"], {
    spell: spells[1]
  })));
}

/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Druid; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(17);
var _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(17, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Druid() {
  console.log('DSRUIRDIUDIDD');
  console.log({
    theClass: _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '-100px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Druid_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, spec.Abilities != null && /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, "Choose One Domain..."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__[/* default */ "a"], {
      spells: _utils__WEBPACK_IMPORTED_MODULE_2__[/* spellsFromObject */ "c"](spec.Abilities)
    })), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Hunter; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(19);
var _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(19, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Hunter() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '-25px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Hunter_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Mage; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(20);
var _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(20, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Mage() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '-25px',
      marginTop: '-25px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Mage_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Paladin; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(21);
var _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(21, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Paladin() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '-55px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Paladin_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rogue; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(22);
var _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(22, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Rogue() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '55px',
      marginTop: '-25px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Rogue_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Shaman; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(23);
var _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(23, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Shaman() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '50px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Shaman_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Rogue; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(24);
var _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(24, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Rogue() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '0px',
      marginTop: '-25px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Warlock_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 64 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Warrior; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH3_PageH3__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(11);
/* harmony import */ var _components_SmallStat_SmallStat__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(14);
/* harmony import */ var _components_SmallStat_SmallStatList__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(30);
/* harmony import */ var _components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(3);
/* harmony import */ var _components_TableNormal_TableNormal__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(18);
/* harmony import */ var _components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(6);
/* harmony import */ var _components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(2);
/* harmony import */ var _components_Spell_Spell__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(12);
/* harmony import */ var _components_Icon__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(13);
/* harmony import */ var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(27);
var _databases_ClassAbilities_json__WEBPACK_IMPORTED_MODULE_14___namespace = /*#__PURE__*/__webpack_require__.t(27, 1);
/* harmony import */ var _components_Spell_ManySpells__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(26);
/* harmony import */ var _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(25);
var _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16___namespace = /*#__PURE__*/__webpack_require__.t(25, 1);
/* harmony import */ var _components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(1);



















function Warrior() {
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_TwoColumns__WEBPACK_IMPORTED_MODULE_10__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like.", /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Separator_Separator__WEBPACK_IMPORTED_MODULE_8__[/* default */ "a"], null), _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, " Abilities are Exhaust-based. As a ", _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced. If an Ability is not listed as Advanced, you can use it as many times as you like. As a ", _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, ", you know a certain number of Advanced Abilities. You can cast each Advanced Ability you know ONCE, then it becomes unusable (Exhausted) until your next Long Rest. Advanced Abilities are all Abilities from the Spell Lists listed as Advanced."), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_TwoColumns_Column__WEBPACK_IMPORTED_MODULE_11__[/* default */ "a"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    style: {
      marginLeft: '-35px',
      marginTop: '-25px'
    },
    className: "class-image",
    src: "/Classes/".concat(_databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__.Class, ".png")
  }))), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* ClassFeatures */ "a"], {
    theClass: _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* LevelingUp */ "b"], {
    theClass: _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpellCasting */ "e"], {
    theClass: _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* StartingAbilities */ "f"], {
    spellsObject: _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities'],
    description: _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__['Starting Abilities Description']
  }), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__[/* default */ "a"], null, "Specialzations"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, "The first time you choose a cleric domain (specialization), you must choose between two abilities. For example, for Battle Cleric, you have to choose either March Ahead or Piety. Choose wisely...")), Object.keys(_databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__['Specs']).map(function (specName) {
    var spec = _databases_Classes_Warrior_json__WEBPACK_IMPORTED_MODULE_16__['Specs'][specName];
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* Spec */ "c"], {
      name: specName,
      spec: spec
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_InsertableTemplates_ClassComponents__WEBPACK_IMPORTED_MODULE_17__[/* SpecTalents */ "d"], {
      spec: spec
    }));
  }));
}

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ":root {\r\n    --banner-width: 300px;\r\n    --banner-height: 400px;\r\n}\r\n\r\n.home-banner-1 {\r\n    position: relative;\r\n    width: var(--banner-width);\r\n    height: var(--banner-height);\r\n    overflow: hidden;\r\n}\r\n.home-banner-1 img {\r\n    border-radius: 6px;\r\n    position: absolute;\r\n    z-index: 20;\r\n}\r\n.home-banner__dark-overlay {\r\n    border-radius: 6px;\r\n    position: absolute;\r\n    width: var(--banner-width);\r\n    height: var(--banner-height);\r\n    z-index: 40;\r\n    \r\n    background-color: rgba(0, 0, 0, 0.55);\r\n}\r\n.home-banner__window {\r\n    position: relative;\r\n    width: 100%;\r\n    height: 100%;\r\n    z-index: 60;\r\n\r\n    display: flex;\r\n    align-items: flex-end;\r\n\r\n    text-align: center;\r\n    color: white;\r\n    padding: 18px;\r\n}\r\n.home-banner-1 h2 {\r\n    font-size: 1.8em;\r\n    margin-bottom: 0px;\r\n    font-weight: 100;\r\n}\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n:root {\r\n    --banner-2-width: 500px;\r\n    --banner-2-height: 200px;\r\n}\r\n\r\n.home-banner-2 {\r\n    width: var(--banner-2-width);\r\n    height: var(--banner-2-height);\r\n\r\n    border-radius: 6px;\r\n\r\n    overflow: hidden;\r\n\r\n    display: flex;\r\n    align-items: flex-end;\r\n\r\n    cursor: pointer;\r\n}\r\n.home-banner-2__img-wrapper {\r\n    width: var(--banner-2-width);\r\n    height: var(--banner-2-height);\r\n    position: absolute;\r\n    overflow: hidden;\r\n    border-radius: 6px;\r\n}\r\n.home-banner-2 img {\r\n    animation: Home-Banner-Image-Shrink 0.15s forwards;\r\n}\r\n.home-banner-2 img:hover {\r\n    animation: Home-Banner-Image-Grow 0.25s forwards;\r\n}\r\n@keyframes Home-Banner-Image-Grow {\r\n    from {\r\n        margin-left: 0px;\r\n        margin-top: 0px;\r\n        width: var(--banner-2-width);\r\n        height: var(--banner-2-height);\r\n    }\r\n    to {\r\n        margin-left: calc((-1) * var(--banner-2-width) * 0.1);\r\n        margin-top: calc((-1) * var(--banner-2-height) * 0.1);\r\n        width: calc(var(--banner-2-width) * 1.2);\r\n        height: calc(var(--banner-2-height) * 1.2);\r\n    }\r\n}\r\n@keyframes Home-Banner-Image-Shrink {\r\n    from {\r\n        margin-left: calc((-1) * var(--banner-2-width) * 0.1);\r\n        margin-top: calc((-1) * var(--banner-2-height) * 0.1);\r\n        width: calc(var(--banner-2-width) * 1.2);\r\n        height: calc(var(--banner-2-height) * 1.2);\r\n    }\r\n    to {\r\n        margin-left: 0px;\r\n        margin-top: 0px;\r\n        width: var(--banner-2-width);\r\n        height: var(--banner-2-height);\r\n    }\r\n}\r\n\r\n.home-banner-2__bottom {\r\n    pointer-events: none;\r\n\r\n    width: 100%;\r\n\r\n    background-color: rgba(0, 0, 0, 0.55);\r\n\r\n    z-index: 40;\r\n}\r\n.home-banner-2 h2 {\r\n    color: white;\r\n    font-weight: 100;\r\n    text-align: center;\r\n}", ""]);



/***/ }),
/* 66 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Armors; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var _databases_Armors_json__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(35);
var _databases_Armors_json__WEBPACK_IMPORTED_MODULE_2___namespace = /*#__PURE__*/__webpack_require__.t(35, 1);
/* harmony import */ var _components_Spell_ManyBoxes__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(34);
/* harmony import */ var _components_PageH2_PageH2__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(9);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(10);







function Armors() {
  console.log({
    armors: _databases_Armors_json__WEBPACK_IMPORTED_MODULE_2__
  });

  // const armorsArray = U.spellsFromObject(armors)

  var armorCategories = Object.keys(_databases_Armors_json__WEBPACK_IMPORTED_MODULE_2__).filter(function (key) {
    return key != 'default';
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "page"
  }, armorCategories.map(function (categoryName) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], null, categoryName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Spell_ManyBoxes__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], {
      objects: _utils__WEBPACK_IMPORTED_MODULE_1__[/* spellsFromObject */ "c"](_databases_Armors_json__WEBPACK_IMPORTED_MODULE_2__[categoryName]),
      type: "armor"
    }));
  }));
}

/***/ }),
/* 67 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Weapons; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(29);
/* harmony import */ var yaml__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(yaml__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _utils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(10);
/* harmony import */ var _databases_Weapons_json__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(36);
var _databases_Weapons_json__WEBPACK_IMPORTED_MODULE_4___namespace = /*#__PURE__*/__webpack_require__.t(36, 1);
/* harmony import */ var _components_Spell_ManyBoxes__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(34);







function Weapons() {
  console.log(Object.keys(_databases_Weapons_json__WEBPACK_IMPORTED_MODULE_4__));
  var categories = Object.keys(_databases_Weapons_json__WEBPACK_IMPORTED_MODULE_4__).filter(function (name) {
    return name != 'default';
  });
  console.log({
    categories: categories
  });
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, categories.map(function (categoryName) {
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
      className: "page",
      key: categoryName
    }, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_PageH1_PageH1__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"], null, categoryName), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_components_Spell_ManyBoxes__WEBPACK_IMPORTED_MODULE_5__[/* default */ "a"], {
      type: "weapon",
      objects: _utils__WEBPACK_IMPORTED_MODULE_2__[/* spellsFromObject */ "c"](_databases_Weapons_json__WEBPACK_IMPORTED_MODULE_4__[categoryName])
    }));
  }));
}

/***/ }),
/* 68 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Post; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(31);
/* harmony import */ var react_static__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_static__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var components_Router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(8);


//

function Post() {
  var _useRouteData = Object(react_static__WEBPACK_IMPORTED_MODULE_1__["useRouteData"])(),
    post = _useRouteData.post;
  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(components_Router__WEBPACK_IMPORTED_MODULE_2__[/* Link */ "a"], {
    to: "/blog/"
  }, '<', " Back"), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", null), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("h3", null, post.title), /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("p", null, post.body));
}

/***/ }),
/* 69 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/HomeBanner/HomeBanner.css
var HomeBanner = __webpack_require__(65);

// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/HomeBanner/HomeBanner1.js


function HomeBanner1(_ref) {
  var title = _ref.title,
    text = _ref.text;
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner-1"
  }, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: "/Banners/Dwarf.png"
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner__dark-overlay"
  }), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner__window"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner__content"
  }, /*#__PURE__*/external_react_default.a.createElement("h2", null, title), /*#__PURE__*/external_react_default.a.createElement("p", null, text))));
}
// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/components/HomeBanner/HomeBanner2.js


function HomeBanner2(_ref) {
  var title = _ref.title,
    text = _ref.text;
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner-2"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner-2__img-wrapper"
  }, /*#__PURE__*/external_react_default.a.createElement("img", {
    src: "/Banners/".concat(title, ".png")
  })), /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-banner-2__bottom"
  }, /*#__PURE__*/external_react_default.a.createElement("h2", null, title)));
}
// CONCATENATED MODULE: E:/Work/GitHub/Call of Heroes Design/call-of-heroes-dev/WebsiteReact/call-of-heroes-react-static/src/pages/index.js



/* harmony default export */ var pages = __webpack_exports__["default"] = (function () {
  return /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-container"
  }, /*#__PURE__*/external_react_default.a.createElement("div", {
    className: "home-container__content"
  }, /*#__PURE__*/external_react_default.a.createElement(HomeBanner2, {
    title: "Races",
    text: "Discover the races of the Call of Heroes world."
  }), /*#__PURE__*/external_react_default.a.createElement(HomeBanner2, {
    title: "Classes",
    text: "Discover the classes of the Call of Heroes world."
  }), /*#__PURE__*/external_react_default.a.createElement(HomeBanner2, {
    title: "Backgrounds",
    text: "Discover the backgrounds of the Call of Heroes world."
  }), /*#__PURE__*/external_react_default.a.createElement(HomeBanner2, {
    title: "Monsters",
    text: "Discover the Monsters of the Call of Heroes world."
  }), /*#__PURE__*/external_react_default.a.createElement(HomeBanner2, {
    title: "Spells",
    text: "Discover the Spells of the Call of Heroes world."
  }), /*#__PURE__*/external_react_default.a.createElement(HomeBanner2, {
    title: "Equipment",
    text: "Discover the Equipment of the Call of Heroes world."
  })));
});

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _react = _interopRequireDefault(__webpack_require__(0));
var _reactStatic = __webpack_require__(31);
var _router = __webpack_require__(33);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };
  return _extends.apply(this, arguments);
}
function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};
  var target = _objectWithoutPropertiesLoose(source, excluded);
  var key, i;
  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);
    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }
  return target;
}
function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;
  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }
  return target;
}
var _default = function _default(_ref) {
  var _ref$RouterProps = _ref.RouterProps,
    userRouterProps = _ref$RouterProps === void 0 ? {} : _ref$RouterProps;
  return {
    Root: function Root(PreviousRoot) {
      return function (_ref2) {
        var children = _ref2.children,
          rest = _objectWithoutProperties(_ref2, ["children"]);
        var basepath = (0, _reactStatic.useBasepath)();
        var staticInfo = (0, _reactStatic.useStaticInfo)();
        var RouteHandler = function RouteHandler(props) {
          return /*#__PURE__*/_react["default"].createElement(PreviousRoot, _extends({}, rest, props), children);
        };
        var renderedChildren = /*#__PURE__*/
        // Place a top-level router inside the root
        // This will give proper context to Link and other reach components
        _react["default"].createElement(_router.Router, _extends({}, basepath ? {
          basepath: basepath
        } : {}, userRouterProps), /*#__PURE__*/_react["default"].createElement(RouteHandler, {
          path: "/*"
        })); // If we're in SSR, use a manual server location

        return typeof document === 'undefined' ? /*#__PURE__*/_react["default"].createElement(_router.ServerLocation, {
          url: (0, _reactStatic.makePathAbsolute)("".concat(basepath, "/").concat(staticInfo.path))
        }, renderedChildren) : renderedChildren;
      };
    },
    Routes: function Routes(PreviousRoutes) {
      return function (props) {
        return /*#__PURE__*/(
          // Wrap Routes in location
          _react["default"].createElement(_router.Location, null, function (location) {
            return /*#__PURE__*/_react["default"].createElement(PreviousRoutes, _extends({
              path: "/*"
            }, props, {
              location: location
            }));
          })
        );
      };
    }
  };
};
exports["default"] = _default;

/***/ }),
/* 71 */
/***/ (function(module, exports) {

module.exports = require("react-hot-loader");

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/toConsumableArray");

/***/ }),
/* 73 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(75);
__webpack_require__(77);
module.exports = __webpack_require__(84);


/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable import/no-dynamic-require */
var plugins = __webpack_require__(76)["default"];
var _require = __webpack_require__(44),
  registerPlugins = _require.registerPlugins;
registerPlugins(plugins);
if (false) {}

/***/ }),
/* 76 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _react_static_root_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(70);
/* harmony import */ var _react_static_root_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_react_static_root_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports


// Plugins
var plugins = [{
  location: "__react_static_root__/node_modules/react-static-plugin-source-filesystem",
  plugins: [],
  hooks: {}
}, {
  location: "__react_static_root__/node_modules/react-static-plugin-reach-router",
  plugins: [],
  hooks: _react_static_root_node_modules_react_static_plugin_reach_router_browser_api_js__WEBPACK_IMPORTED_MODULE_0___default()({})
}, {
  location: "__react_static_root__/node_modules/react-static-plugin-sitemap/dist",
  plugins: [],
  hooks: {}
}, {
  location: "__react_static_root__/",
  plugins: [],
  hooks: {}
}];

// Export em!
/* harmony default export */ __webpack_exports__["default"] = (plugins);

/***/ }),
/* 77 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/* eslint-disable import/no-dynamic-require */
var _require = __webpack_require__(44),
  registerTemplates = _require.registerTemplates;
var _require2 = __webpack_require__(78),
  templates = _require2["default"],
  notFoundTemplate = _require2.notFoundTemplate;
registerTemplates(templates, notFoundTemplate);
if (false) {}

/***/ }),
/* 78 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(__dirname) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "notFoundTemplate", function() { return notFoundTemplate; });
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var path__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(path__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_universal_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(15);
/* harmony import */ var react_universal_component__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_universal_component__WEBPACK_IMPORTED_MODULE_3__);


































Object(react_universal_component__WEBPACK_IMPORTED_MODULE_3__["setHasBabelPlugin"])();
var universalOptions = {
  loading: function loading() {
    return null;
  },
  error: function error(props) {
    console.error(props.error);
    return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement("div", null, "An error occurred loading this page's template. More information is available in the console.");
  },
  ignoreBabelRename: true
};
var t_0 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/404.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/404 */).then(__webpack_require__.bind(null, 50))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/404.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(50);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/404";
  }
}), universalOptions);
t_0.template = '__react_static_root__/src/pages/404.js';
var t_1 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/about.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/about */).then(__webpack_require__.bind(null, 51))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/about.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(51);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/about";
  }
}), universalOptions);
t_1.template = '__react_static_root__/src/pages/about.js';
var t_2 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/blog.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/blog */).then(__webpack_require__.bind(null, 52))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/blog.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(52);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/blog";
  }
}), universalOptions);
t_2.template = '__react_static_root__/src/pages/blog.js';
var t_3 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Cleric.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Cleric */).then(__webpack_require__.bind(null, 53))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Cleric.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(53);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Cleric";
  }
}), universalOptions);
t_3.template = '__react_static_root__/src/pages/Classes/Cleric.js';
var t_4 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Druid.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Druid */).then(__webpack_require__.bind(null, 57))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Druid.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(57);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Druid";
  }
}), universalOptions);
t_4.template = '__react_static_root__/src/pages/Classes/Druid.js';
var t_5 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Hunter.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Hunter */).then(__webpack_require__.bind(null, 58))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Hunter.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(58);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Hunter";
  }
}), universalOptions);
t_5.template = '__react_static_root__/src/pages/Classes/Hunter.js';
var t_6 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Mage.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Mage */).then(__webpack_require__.bind(null, 59))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Mage.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(59);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Mage";
  }
}), universalOptions);
t_6.template = '__react_static_root__/src/pages/Classes/Mage.js';
var t_7 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Paladin.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Paladin */).then(__webpack_require__.bind(null, 60))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Paladin.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(60);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Paladin";
  }
}), universalOptions);
t_7.template = '__react_static_root__/src/pages/Classes/Paladin.js';
var t_8 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Rogue.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Rogue */).then(__webpack_require__.bind(null, 61))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Rogue.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(61);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Rogue";
  }
}), universalOptions);
t_8.template = '__react_static_root__/src/pages/Classes/Rogue.js';
var t_9 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Shaman.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Shaman */).then(__webpack_require__.bind(null, 62))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Shaman.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(62);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Shaman";
  }
}), universalOptions);
t_9.template = '__react_static_root__/src/pages/Classes/Shaman.js';
var t_10 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Warlock.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Warlock */).then(__webpack_require__.bind(null, 63))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Warlock.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(63);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Warlock";
  }
}), universalOptions);
t_10.template = '__react_static_root__/src/pages/Classes/Warlock.js';
var t_11 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Classes/Warrior.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Classes/Warrior */).then(__webpack_require__.bind(null, 64))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Classes/Warrior.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(64);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Classes/Warrior";
  }
}), universalOptions);
t_11.template = '__react_static_root__/src/pages/Classes/Warrior.js';
var t_12 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/index.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/index */).then(__webpack_require__.bind(null, 69))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/index.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(69);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/index";
  }
}), universalOptions);
t_12.template = '__react_static_root__/src/pages/index.js';
var t_13 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Other/Armors.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Other/Armors */).then(__webpack_require__.bind(null, 66))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Other/Armors.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(66);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Other/Armors";
  }
}), universalOptions);
t_13.template = '__react_static_root__/src/pages/Other/Armors.js';
var t_14 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/pages/Other/Weapons.js",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/pages/Other/Weapons */).then(__webpack_require__.bind(null, 67))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/pages/Other/Weapons.js');
  },
  resolve: function resolve() {
    return /*require.resolve*/(67);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/pages/Other/Weapons";
  }
}), universalOptions);
t_14.template = '__react_static_root__/src/pages/Other/Weapons.js';
var t_15 = react_universal_component__WEBPACK_IMPORTED_MODULE_3___default()(babel_plugin_universal_import_universalImport__WEBPACK_IMPORTED_MODULE_1___default()({
  id: "__react_static_root__/src/containers/Post",
  load: function load() {
    return Promise.all([Promise.resolve(/* import() | __react_static_root__/src/containers/Post */).then(__webpack_require__.bind(null, 68))]).then(function (proms) {
      return proms[0];
    });
  },
  path: function path() {
    return path__WEBPACK_IMPORTED_MODULE_0___default.a.join(__dirname, '__react_static_root__/src/containers/Post');
  },
  resolve: function resolve() {
    return /*require.resolve*/(68);
  },
  chunkName: function chunkName() {
    return "__react_static_root__/src/containers/Post";
  }
}), universalOptions);
t_15.template = '__react_static_root__/src/containers/Post';

// Template Map
/* harmony default export */ __webpack_exports__["default"] = ({
  '__react_static_root__/src/pages/404.js': t_0,
  '__react_static_root__/src/pages/about.js': t_1,
  '__react_static_root__/src/pages/blog.js': t_2,
  '__react_static_root__/src/pages/Classes/Cleric.js': t_3,
  '__react_static_root__/src/pages/Classes/Druid.js': t_4,
  '__react_static_root__/src/pages/Classes/Hunter.js': t_5,
  '__react_static_root__/src/pages/Classes/Mage.js': t_6,
  '__react_static_root__/src/pages/Classes/Paladin.js': t_7,
  '__react_static_root__/src/pages/Classes/Rogue.js': t_8,
  '__react_static_root__/src/pages/Classes/Shaman.js': t_9,
  '__react_static_root__/src/pages/Classes/Warlock.js': t_10,
  '__react_static_root__/src/pages/Classes/Warrior.js': t_11,
  '__react_static_root__/src/pages/index.js': t_12,
  '__react_static_root__/src/pages/Other/Armors.js': t_13,
  '__react_static_root__/src/pages/Other/Weapons.js': t_14,
  '__react_static_root__/src/containers/Post': t_15
});
// Not Found Template
var notFoundTemplate = "__react_static_root__/src/pages/404.js";
/* WEBPACK VAR INJECTION */}.call(this, "/"))

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function (module) {
  if (!module.webpackPolyfill) {
    module.deprecate = function () {};
    module.paths = [];
    // module.parent = undefined by default
    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    module.webpackPolyfill = 1;
  }
  return module;
};

/***/ }),
/* 80 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearChunks = exports.flushModuleIds = exports.flushChunkNames = exports.MODULE_IDS = exports.CHUNK_NAMES = undefined;
var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];
    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }
  return target;
};
exports["default"] = requireUniversalModule;
var _utils = __webpack_require__(39);
var CHUNK_NAMES = exports.CHUNK_NAMES = new Set();
var MODULE_IDS = exports.MODULE_IDS = new Set();
function requireUniversalModule(universalConfig, options, props, prevProps) {
  var key = options.key,
    _options$timeout = options.timeout,
    timeout = _options$timeout === undefined ? 15000 : _options$timeout,
    onLoad = options.onLoad,
    onError = options.onError,
    isDynamic = options.isDynamic,
    modCache = options.modCache,
    promCache = options.promCache,
    usesBabelPlugin = options.usesBabelPlugin;
  var config = getConfig(isDynamic, universalConfig, options, props);
  var chunkName = config.chunkName,
    path = config.path,
    resolve = config.resolve,
    load = config.load;
  var asyncOnly = !path && !resolve || typeof chunkName === 'function';
  var requireSync = function requireSync(props) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);
    if (!exp) {
      var mod = void 0;
      if (!(0, _utils.isWebpack)() && path) {
        var modulePath = (0, _utils.callForString)(path, props) || '';
        mod = (0, _utils.tryRequire)(modulePath);
      } else if ((0, _utils.isWebpack)() && resolve) {
        var weakId = (0, _utils.callForString)(resolve, props);
        if (__webpack_require__.m[weakId]) {
          mod = (0, _utils.tryRequire)(weakId);
        }
      }
      if (mod) {
        exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, modCache, true);
      }
    }
    return exp;
  };
  var requireAsync = function requireAsync(props) {
    var exp = (0, _utils.loadFromCache)(chunkName, props, modCache);
    if (exp) return Promise.resolve(exp);
    var cachedPromise = (0, _utils.loadFromPromiseCache)(chunkName, props, promCache);
    if (cachedPromise) return cachedPromise;
    var prom = new Promise(function (res, rej) {
      var reject = function reject(error) {
        error = error || new Error('timeout exceeded');
        clearTimeout(timer);
        if (onError) {
          var _isServer = typeof window === 'undefined';
          var info = {
            isServer: _isServer
          };
          onError(error, info);
        }
        rej(error);
      };

      // const timer = timeout && setTimeout(reject, timeout)
      var timer = timeout && setTimeout(reject, timeout);
      var resolve = function resolve(mod) {
        clearTimeout(timer);
        var exp = (0, _utils.resolveExport)(mod, key, onLoad, chunkName, props, modCache);
        if (exp) return res(exp);
        reject(new Error('export not found'));
      };
      var request = load(props, {
        resolve: resolve,
        reject: reject
      });

      // if load doesn't return a promise, it must call resolveImport
      // itself. Most common is the promise implementation below.
      if (!request || typeof request.then !== 'function') return;
      request.then(resolve)["catch"](reject);
    });
    (0, _utils.cacheProm)(prom, chunkName, props, promCache);
    return prom;
  };
  var addModule = function addModule(props) {
    if (_utils.isServer || _utils.isTest) {
      if (chunkName) {
        var name = (0, _utils.callForString)(chunkName, props);
        if (usesBabelPlugin) {
          // if ignoreBabelRename is true, don't apply regex
          var shouldKeepName = options && !!options.ignoreBabelRename;
          if (!shouldKeepName) {
            name = name.replace(/\//g, '-');
          }
        }
        if (name) CHUNK_NAMES.add(name);
        if (!_utils.isTest) return name; // makes tests way smaller to run both kinds
      }

      if ((0, _utils.isWebpack)()) {
        var weakId = (0, _utils.callForString)(resolve, props);
        if (weakId) MODULE_IDS.add(weakId);
        return weakId;
      }
      if (!(0, _utils.isWebpack)()) {
        var modulePath = (0, _utils.callForString)(path, props);
        if (modulePath) MODULE_IDS.add(modulePath);
        return modulePath;
      }
    }
  };
  var shouldUpdate = function shouldUpdate(next, prev) {
    var cacheKey = (0, _utils.callForString)(chunkName, next);
    var config = getConfig(isDynamic, universalConfig, options, prev);
    var prevCacheKey = (0, _utils.callForString)(config.chunkName, prev);
    return cacheKey !== prevCacheKey;
  };
  return {
    requireSync: requireSync,
    requireAsync: requireAsync,
    addModule: addModule,
    shouldUpdate: shouldUpdate,
    asyncOnly: asyncOnly
  };
}
var flushChunkNames = exports.flushChunkNames = function flushChunkNames() {
  var chunks = Array.from(CHUNK_NAMES);
  CHUNK_NAMES.clear();
  return chunks;
};
var flushModuleIds = exports.flushModuleIds = function flushModuleIds() {
  var ids = Array.from(MODULE_IDS);
  MODULE_IDS.clear();
  return ids;
};
var clearChunks = exports.clearChunks = function clearChunks() {
  CHUNK_NAMES.clear();
  MODULE_IDS.clear();
};
var getConfig = function getConfig(isDynamic, universalConfig, options, props) {
  if (isDynamic) {
    var resultingConfig = typeof universalConfig === 'function' ? universalConfig(props) : universalConfig;
    if (options) {
      resultingConfig = _extends({}, resultingConfig, options);
    }
    return resultingConfig;
  }
  var load = typeof universalConfig === 'function' ? universalConfig :
  // $FlowIssue
  function () {
    return universalConfig;
  };
  return {
    file: 'default',
    id: options.id || 'default',
    chunkName: options.chunkName || 'default',
    resolve: options.resolve || '',
    path: options.path || '',
    load: load,
    ignoreBabelRename: true
  };
};

/***/ }),
/* 81 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	".": 32,
	"./": 32,
	"./index": 32,
	"./index.js": 32
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 81;

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = __webpack_require__(38);
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();
var _react = __webpack_require__(0);
var _react2 = _interopRequireDefault(_react);
var _propTypes = __webpack_require__(45);
var _propTypes2 = _interopRequireDefault(_propTypes);
var _context = __webpack_require__(46);
var _context2 = _interopRequireDefault(_context);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (_typeof(call) === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + _typeof(superClass));
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}
var ReportChunks = function (_React$Component) {
  _inherits(ReportChunks, _React$Component);
  function ReportChunks(props) {
    _classCallCheck(this, ReportChunks);
    var _this = _possibleConstructorReturn(this, (ReportChunks.__proto__ || Object.getPrototypeOf(ReportChunks)).call(this, props));
    _this.state = {
      report: props.report
    };
    return _this;
  }
  _createClass(ReportChunks, [{
    key: 'render',
    value: function render() {
      return _react2["default"].createElement(_context2["default"].Provider, {
        value: this.state
      }, this.props.children);
    }
  }]);
  return ReportChunks;
}(_react2["default"].Component);
ReportChunks.propTypes = {
  report: _propTypes2["default"].func.isRequired
};
exports["default"] = ReportChunks;

/***/ }),
/* 83 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.__handleAfter = exports.__update = undefined;
var _hoistNonReactStatics = __webpack_require__(47);
var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);
var _index = __webpack_require__(15);
var _index2 = _interopRequireDefault(_index);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}
var __update = exports.__update = function __update(props, state, isInitialized) {
  var isMount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  var isSync = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  var isServer = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;
  if (!isInitialized) return state;
  if (!state.error) {
    state.error = null;
  }
  return __handleAfter(props, state, isMount, isSync, isServer);
};

/* eslint class-methods-use-this: ["error", { "exceptMethods": ["__handleAfter"] }] */
var __handleAfter = exports.__handleAfter = function __handleAfter(props, state, isMount, isSync, isServer) {
  var mod = state.mod,
    error = state.error;
  if (mod && !error) {
    (0, _hoistNonReactStatics2["default"])(_index2["default"], mod, {
      preload: true,
      preloadWeak: true
    });
    if (props.onAfter) {
      var onAfter = props.onAfter;
      var info = {
        isMount: isMount,
        isSync: isSync,
        isServer: isServer
      };
      onAfter(info, mod);
    }
  } else if (error && props.onError) {
    props.onError(error);
  }
  return state;
};

/***/ }),
/* 84 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(48);
var _interopRequireWildcard = __webpack_require__(49);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var React = _interopRequireWildcard(__webpack_require__(0));
var _useStaticInfo = __webpack_require__(85);
var _Suspense = _interopRequireDefault(__webpack_require__(86));

/* eslint-disable import/no-dynamic-require */
// Override the suspense module to be our own
// This is expected to break when using preact
// In order to make it work with preact 10, use `patch-package` to remove those 2 lines
// Reference: https://github.com/react-static/react-static/pull/1500
React.Suspense = _Suspense["default"];
React["default"].Suspense = _Suspense["default"];
var App = __webpack_require__(89)["default"];
var _default = function _default(staticInfo) {
  return function (props) {
    return /*#__PURE__*/React.createElement(_useStaticInfo.staticInfoContext.Provider, {
      value: staticInfo
    }, /*#__PURE__*/React.createElement(App, props));
  };
};
exports["default"] = _default;

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = require("E:\\Work\\GitHub\\Call of Heroes Design\\call-of-heroes-dev\\WebsiteReact\\call-of-heroes-react-static\\node_modules\\react-static\\lib\\browser\\hooks\\useStaticInfo");

/***/ }),
/* 86 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireWildcard = __webpack_require__(49);
var _interopRequireDefault = __webpack_require__(48);
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;
var _extends2 = _interopRequireDefault(__webpack_require__(87));
var _objectWithoutProperties2 = _interopRequireDefault(__webpack_require__(88));
var React = _interopRequireWildcard(__webpack_require__(0));
var OriginalSuspense = React.Suspense;
function Suspense(_ref) {
  var key = _ref.key,
    children = _ref.children,
    rest = (0, _objectWithoutProperties2["default"])(_ref, ["key", "children"]);
  return typeof document !== 'undefined' ? /*#__PURE__*/React.createElement(OriginalSuspense, (0, _extends2["default"])({
    key: key
  }, rest), children) : /*#__PURE__*/React.createElement(React.Fragment, {
    key: key
  }, children);
}
var _default = Suspense;
exports["default"] = _default;

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/extends");

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectWithoutProperties");

/***/ }),
/* 89 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(0);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(43);
/* harmony import */ var react_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(71);
/* harmony import */ var react_hot_loader__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(37);




// Your top level component


// Export your top level component as JSX (for static rendering)
/* harmony default export */ __webpack_exports__["default"] = (_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

// Render your app
if (typeof document !== 'undefined') {
  var target = document.getElementById('root');
  var renderMethod = target.hasChildNodes() ? react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.hydrate : react_dom__WEBPACK_IMPORTED_MODULE_1___default.a.render;
  var render = function render(Comp) {
    renderMethod( /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_hot_loader__WEBPACK_IMPORTED_MODULE_2__["AppContainer"], null, /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(Comp, null)), target);
  };

  // Render!
  render(_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', function () {
      render(_App__WEBPACK_IMPORTED_MODULE_3__[/* default */ "a"]);
    });
  }
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(90)(module)))

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function (originalModule) {
  if (!originalModule.webpackPolyfill) {
    var module = Object.create(originalModule);
    // module.parent = undefined by default
    if (!module.children) module.children = [];
    Object.defineProperty(module, "loaded", {
      enumerable: true,
      get: function get() {
        return module.l;
      }
    });
    Object.defineProperty(module, "id", {
      enumerable: true,
      get: function get() {
        return module.i;
      }
    });
    Object.defineProperty(module, "exports", {
      enumerable: true
    });
    module.webpackPolyfill = 1;
  }
  return module;
};

/***/ }),
/* 91 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Imports
var urlEscape = __webpack_require__(40);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(92));
var ___CSS_LOADER_URL___1___ = urlEscape(__webpack_require__(93));
var ___CSS_LOADER_URL___2___ = urlEscape(__webpack_require__(94));

// Module
exports.push([module.i, ":root {\n  --page-border-width: 49px;\n  --page-padding: 25px;\n\n  --medium-color: rgb(95, 39, 39); \n  --dark-color: rgb(68, 22, 22);\n  --darker-color: rgb(48, 2, 2);\n\n  --dark-blue: rgb(22, 22, 98);\n  --darker-blue: rgb(22, 22, 58);\n\n  --gray-color: rgb(31, 31, 31);\n}\n\n* {\n  scroll-behavior: smooth;\n  vertical-align: top;\n  box-sizing: border-box;\n}\n\n@font-face {\n  font-family: TextFont;\n  src: url(" + ___CSS_LOADER_URL___0___ + ");\n}\n@font-face {\n  font-family: TitleFont;\n  src: url(" + ___CSS_LOADER_URL___1___ + ");\n}\n\n\n\n\n\n\n\nbody {\n  /* font-family: Garamond, Baskerville, \"Baskerville Old Face\", \"Hoefler Text\", \"Times New Roman\"; */\n  font-family: TextFont;\n  font-size: 22px;\n  margin: 0;\n  padding: 0;\n}\n\n#Window {\n  background-image: url(" + ___CSS_LOADER_URL___2___ + ");\n  background-repeat: no-repeat;\n  background-size: cover;\n  background-attachment: fixed;\n  width: 100%;\n  min-height: calc(100vh - var(--nav-height));\n  margin: 0px;\n  padding: 0px;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.inline-icon--spell {\n  height: 18px;\n  margin-right: 3px;\n}\n.inline-icon {\n  height: 21px;\n  margin-right: 3px;\n  margin-top: 2px;\n}\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n.footer {\n  min-height: 150px;\n  background-color: var(--gray-color);\n}\n\n\n\n\n.home-container {\n  display: flex;        /* Ensures margin-top doesn't get bugged */\n  width: 100%;\n  min-height: 80vh;\n  margin: auto;\n  margin-top: 0px;\n  \n  /* background-image: url('images/paper-texture-page-transparent.png');\n  background-repeat: repeat;\n  background-size: 90%; */\n}\n\n.home-container__content {\n  width: 1200px;\n  margin: auto;\n  margin-top: 75px;\n  margin-bottom: 75px;\n\n  display: flex;\n  justify-content: center;\n  flex-direction: row;\n  flex-wrap: wrap;\n  gap: var(--page-padding);\n}", ""]);



/***/ }),
/* 92 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/LinLibertine_R.dfb65e12.ttf";

/***/ }),
/* 93 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/DAYROM__.86938d9e.ttf";

/***/ }),
/* 94 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/background-standard-2-dark.ee13e9fd.png";

/***/ }),
/* 95 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, "\r\n:root {\r\n    --nav-height: 115px;\r\n    --nav-item-width: 200px;\r\n    --nav-background-color: rgba(0, 0, 0, 0.6);\r\n}\r\n\r\nnav {\r\n    margin: 0px;\r\n    padding: 0px;\r\n    width: 100%;\r\n    background-color: var(--nav-background-color);\r\n    height: var(--nav-height);\r\n\r\n    display: flex;\r\n    justify-content: flex-end;\r\n}\r\n.nav-item {\r\n    font-family: TitleFont;\r\n    letter-spacing: 0.15em;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-size: 1.35em;\r\n    vertical-align: middle;\r\n    color: white;\r\n    line-height: var(--nav-height);   /* Ensures text is centered vertically */\r\n  \r\n    min-width: var(--nav-item-width);\r\n    height: 100%;\r\n    display: inline-block;            /* Ensures correct height as 100% of parent */\r\n    position: relative;\r\n    z-index: 9999 !important;\r\n}\r\n.nav-item a {\r\n    display: inline-block;\r\n    color: white;\r\n    height: 100%;\r\n    width: 100%;\r\n}\r\nnav a:hover {\r\n    background-color: rgba(256, 256, 256, 0.1);\r\n}\r\n.nav-item {\r\n    position: relative;\r\n}\r\n.nav-item__dropdown {\r\n    display: none;\r\n    position: absolute;\r\n}\r\n.nav-item:hover .nav-item__dropdown {\r\n    display: block;\r\n}\r\n.nav-item__dropdown-item {\r\n    font-family: TitleFont;\r\n    letter-spacing: 0.15em;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-size: 0.8em;\r\n    vertical-align: middle;\r\n    color: white;\r\n    line-height: calc(var(--nav-height) * 0.5);\r\n    \r\n    background-color: var(--nav-background-color);\r\n  \r\n    height: calc(var(--nav-height) * 0);\r\n    min-width: var(--nav-item-width);\r\n    z-index: 9999 !important;         /* So it does not underlap the page's content */\r\n}\r\n.hover-cleric a:hover { color: #fff383 !important; }\r\n.hover-druid a:hover { color: #25e71f !important; }\r\n.hover-hunter a:hover { color: #81ff38 !important; }\r\n.hover-mage a:hover { color: #0084ff !important; }\r\n.hover-paladin a:hover { color: #ffd901 !important; }\r\n.hover-rogue a:hover { color: #766cff !important; }\r\n.hover-shaman a:hover { color: #59c2ff !important; }\r\n.hover-warlock a:hover { color: #a659ff !important; }\r\n.hover-warrior a:hover { color: #ff3c3c !important; }\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n.subnav {\r\n    margin: 0px;\r\n    padding: 0px;\r\n    width: 100%;\r\n    background-color: rgba(0, 0, 0, 0.7);\r\n    height: calc(var(--nav-height) / 2);\r\n  }\r\n  .subnav a {\r\n    font-family: TitleFont;\r\n    letter-spacing: 0.15rem;\r\n    text-decoration: none;\r\n    text-align: center;\r\n    font-size: 1em;\r\n    vertical-align: middle;\r\n    color: white;\r\n  \r\n    min-width: 150px;\r\n    height: 100%;\r\n    line-height: calc(var(--nav-height) / 2);   /* Ensures text is centered vertically */\r\n    display: inline-block;                      /* Ensures correct height as 100% of parent */\r\n    position: relative;\r\n    float: right;\r\n  }\r\n  .subnav a:hover {\r\n    background-color: rgba(1, 1, 1, 0.3);\r\n  }", ""]);



/***/ }),
/* 96 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Imports
var urlEscape = __webpack_require__(40);
var ___CSS_LOADER_URL___0___ = urlEscape(__webpack_require__(97));

// Module
exports.push([module.i, ":root {\r\n    --page-max-width: 1000px;\r\n    --page-min-width: 910px;\r\n}\r\n\r\n.page {\r\n    max-width: var(--page-max-width);\r\n    min-width: var(--page-min-width);\r\n    min-height: 100vh;\r\n    margin: auto;\r\n    margin-top: 25px;\r\n    margin-bottom: 0px;\r\n    padding: var(--page-padding);\r\n  \r\n    background-image: url(" + ___CSS_LOADER_URL___0___ + ");\r\n    background-repeat: repeat;\r\n    background-size: 90%;\r\n  \r\n    /* border-image: url('images/page-borders.png') 49 stretch;\r\n    border-width: 20px;\r\n    border-style: solid;\r\n    border-color: transparent; */\r\n\r\n    border: solid black 2px; \r\n    box-shadow: 0px 0px 10px 5px #000000;\r\n}\r\n\r\n", ""]);



/***/ }),
/* 97 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/paper-texture-page.cb645585.png";

/***/ }),
/* 98 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ".page-h1 {\r\n    position: relative;\r\n    z-index: 1;\r\n}\r\n.page-h1 img {\r\n    position: absolute;\r\n    left: calc(-1px - var(--page-padding));\r\n    height: 100px;\r\n    z-index: -1;\r\n}\r\n.page-h1 h1 {\r\n    margin-bottom: 10px;\r\n    line-height: 100px;\r\n    font-weight: 100;\r\n    font-size: 3rem;\r\n    letter-spacing: 0.15rem;\r\n    font-family: TitleFont;\r\n    color: white;\r\n}\r\n\r\na {\r\n    color: black;\r\n    text-decoration: none;\r\n}", ""]);



/***/ }),
/* 99 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ".page-h2 {\r\n    margin-top: calc(3 * var(--page-padding));\r\n    position: relative;\r\n    z-index: 1;\r\n}\r\n.page-h2 img {\r\n    position: absolute;\r\n    left: calc(0px - var(--page-padding));\r\n    height: 75px;\r\n    z-index: -1;\r\n}\r\n.page-h2 h2 {\r\n    line-height: 75px;\r\n    font-weight: bold;\r\n    font-size: 2rem;\r\n    letter-spacing: 0.15rem;\r\n    font-family: TitleFont;\r\n    color: var(--dark-color);\r\n}\r\n\r\na {\r\n    color: black;\r\n    text-decoration: none;\r\n}", ""]);



/***/ }),
/* 100 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ".page-h3 h3 {\r\n    font-weight: bold;\r\n    font-size: 1.75rem;\r\n    letter-spacing: 0.05rem;\r\n    font-family: TitleFont;\r\n    color: var(--dark-color);\r\n    margin-bottom: 12px;\r\n    margin-top: 0px;\r\n}\r\n", ""]);



/***/ }),
/* 101 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(28)(false);
// Module
exports.push([module.i, ".separator {\r\n    display: block;\r\n    margin: auto;\r\n    width: 100%;\r\n    margin-top: 15px;\r\n    margin-bottom: 15px;\r\n}", ""]);



/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAACRUlEQVR4nO3Z227CMBQF0WPE//+y+1ARJamvSIU4M+utCArSHhxKU/zKIaKUwvHRnqef01dehT5te9M/djc6Pse29fkE2PPScC/FN/ijdGM4/h0VNy2dANsdcy53kNIhJi8d3zWzV47TXrUTwPHXsW1w2mZT2zKiEUDxmRz/qroR1AwH4PiX91YEQwE4/jKmI+gG4PjLmYqgGYDjL2s4gv3/Al73LH1kdPw1tbbMEWOfARx/Xd3tegE4/vqaG7YCcPz7qG459UWQ7scA4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDADOAOAMAM4A4AwAzgDgDACuFUD+2KvQf6tu2TsBjGB9zQ1HLgFGsK7udtUAcj481gjWs2122vKgeQIYwbKGxo8YuAQYwXKGx48Y/DPQCJYxNX7ExPcARnB50+NHTH4RZASX9db4EY0AUkrlZzKCq+mOX9syIiLtfsH+Xg57T382rp0A9WS0quKmz9kH6F72J4DHPse29f4zgIBex7wRMKUfClVe96ox7lkAAAAASUVORK5CYII="

/***/ })
/******/ ]);
});