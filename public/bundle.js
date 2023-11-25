/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./errors.js":
/*!*******************!*\
  !*** ./errors.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ERRORS: () => (/* binding */ ERRORS),\n/* harmony export */   renderErrorMessage: () => (/* binding */ renderErrorMessage)\n/* harmony export */ });\n// this is the file for errors management\n\nvar ERRORS = {\n  'auth-missing': 'Please login',\n  'required-word': 'Should not be empty. Please input a word',\n  'invalid-word': 'Please input a valid word',\n  'auth-insufficient': 'wrong password',\n  'unauthorized': 'Welcome, Please login',\n  'Unauthorized': 'Please login',\n  'required-username': 'Please input a valid name, and less than 20 characters',\n  'logout-failed': 'logout error',\n  'network-error': 'network error, please try again',\n  'msgs-required': 'Please input a message'\n};\nfunction renderErrorMessage(errorType, elementId) {\n  var errorElement = document.getElementById(elementId);\n  if (ERRORS[errorType]) {\n    errorElement.innerHTML = ERRORS[errorType];\n    errorElement.style.display = 'block';\n  } else {\n    errorElement.textContent = 'Unknown error';\n  }\n}\n\n//# sourceURL=webpack://project2/./errors.js?");

/***/ }),

/***/ "./messages.js":
/*!*********************!*\
  !*** ./messages.js ***!
  \*********************/
/***/ ((module) => {

eval("// this is the file of data storage for stage\n\nvar messages = [];\nfunction addMessages(sender, text) {\n  var newMsgs = {\n    sender: sender,\n    text: text,\n    avatar: './images/lulupig.webp'\n  };\n  messages.push(newMsgs);\n  return;\n}\nfunction isValidMsgs(text) {\n  var isValid = true;\n  isValid = isValid && text.trim() !== '';\n  return isValid;\n}\nfunction updateMessages(existingMsgsList) {\n  if (!existingMsgsList) {\n    return;\n  }\n  messages = existingMsgsList;\n  var textList = document.querySelector('.new-messages');\n  textList.innerHTML = '';\n  messages.forEach(function (newMsgs) {\n    var mewTextElement = document.createElement('li');\n    var senderInfo = document.createElement('div');\n    var senderName = document.createElement('p');\n    var senderAvatar = document.createElement('img');\n    var sentMsgs = document.createElement('div');\n    var textParagraph = document.createElement('p');\n    mewTextElement.className = 'message';\n    senderInfo.className = 'sender-info column';\n    senderName.className = 'username';\n    senderAvatar.className = 'avatar';\n    sentMsgs.className = 'sent-msgs';\n    senderName.innerHTML = newMsgs.sender;\n    sentMsgs.innerHTML = newMsgs.text;\n    senderAvatar.src = newMsgs.avatar;\n    mewTextElement.appendChild(senderInfo);\n    mewTextElement.appendChild(sentMsgs);\n    senderInfo.appendChild(senderName);\n    senderInfo.appendChild(senderAvatar);\n    sentMsgs.appendChild(textParagraph);\n    textList.appendChild(mewTextElement);\n  });\n}\nmodule.exports = {\n  messages: messages,\n  addMessages: addMessages,\n  updateMessages: updateMessages,\n  isValidMsgs: isValidMsgs\n};\n\n//# sourceURL=webpack://project2/./messages.js?");

/***/ }),

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../users */ \"./users.js\");\n/* harmony import */ var _users__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_users__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../messages */ \"./messages.js\");\n/* harmony import */ var _messages__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_messages__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _errors__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../errors */ \"./errors.js\");\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }\n//this is Client Side JS\n\n\n\nvar loginForm = document.getElementById('login-form');\nvar Error = document.getElementById('error');\nvar inputText = document.querySelector('input[name=\"send-message\"]');\nvar logoutButton = document.querySelector('.logout-button');\nvar chatApp = document.getElementById('chat-app');\nvar outgoingMsgsForm = document.querySelector('.outgoing');\nvar loadingIndicator = document.getElementById('loading-indicator');\nvar usersContent = document.getElementById('user');\n// initialize state\nvar appState = {\n  messages: [],\n  // chat msgs\n  onlineUsers: [],\n  // online users\n  t1: null //timer for polling online users\n};\n// Polling every 5 seconds\nfunction startPolling() {\n  setInterval(function () {\n    fetch('/api/v1/online-users', {\n      method: 'GET',\n      headers: {}\n    }).then(function (response) {\n      if (response.ok) {\n        return response.json();\n      }\n      if (!response.ok) {\n        var errorData = response.json();\n        return errorData.then(function (error) {\n          _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n        });\n      }\n    }).then(function (onlineUsersData) {\n      // Update online user list\n      appState.onlineUsers = _toConsumableArray(onlineUsersData.onlineFolks);\n      renderOnlineUserList(appState.onlineUsers);\n    })[\"catch\"](function (error) {\n      if (error.error) {\n        _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n      }\n    });\n    fetch('/api/v1/chat', {\n      method: 'GET',\n      headers: {}\n    }).then(function (response) {\n      if (response.ok) {\n        return response.json();\n      }\n      if (!response.ok) {\n        var errorData = response.json();\n        return errorData.then(function (error) {\n          _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n        });\n      }\n    }).then(function (chatData) {\n      // Update state(chat list)\n      appState.messages = _toConsumableArray(chatData.msmgListArray);\n      renderChatList(appState.messages);\n    })[\"catch\"](function (error) {\n      if (error.error) {\n        _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n      }\n    });\n  }, 5000);\n}\ndocument.addEventListener('DOMContentLoaded', function () {\n  // Initial rendering\n  fetch('/api/v1', {\n    method: 'GET',\n    headers: {}\n  }).then(function (response) {\n    if (response.ok) {\n      return response.json();\n    }\n    if (!response.ok) {\n      Error.innerHTML = '';\n    }\n  }).then(function (data) {\n    appState.onlineUsers = data.onlineFolks;\n    appState.messages = data.msmgListArray;\n    renderChatApp();\n    renderAll(appState.onlineUsers, appState.messages);\n    startPolling();\n  })[\"catch\"](function (error) {\n    if (error.error == 'network-error') {\n      _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n    } else {\n      Error.innerHTML = '';\n    }\n  });\n});\n\n// login form\nloginForm.addEventListener('submit', function (e) {\n  e.preventDefault();\n  var input = document.querySelector('input[name=\"inputUsername\"]');\n  var username = input.value;\n  var userData = {\n    username: username\n  };\n  fetch('/api/v1/login', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(userData),\n    credentials: 'include'\n  }).then(function (response) {\n    if (response.ok) {\n      return response.json();\n    }\n    if (!response.ok) {\n      var errorData = response.json();\n      return errorData.then(function (error) {\n        _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n        if (response.error.error == 'wrong password') {\n          throw new Error('wrong password');\n        }\n      });\n    }\n  }).then(function (data) {\n    //update users info, render existing chat list & online user list\n    Error.innerHTML = '';\n    appState.onlineUsers = Array.from(data.onlineFolks);\n    appState.messages = Array.from(data.msmgListArray);\n    renderChatApp();\n    renderAll(appState.onlineUsers, appState.messages);\n\n    // Start polling\n    startPolling();\n  })[\"catch\"](function (error) {\n    if (error.error) {\n      _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n    }\n  });\n});\n\n// send msgs\noutgoingMsgsForm.addEventListener('submit', function (e) {\n  e.preventDefault();\n  var msgsData = {\n    message: inputText.value\n  };\n  fetch('/api/v1/chat', {\n    method: 'POST',\n    headers: {\n      'Content-Type': 'application/json'\n    },\n    body: JSON.stringify(msgsData),\n    credentials: 'include'\n  }).then(function (response) {\n    if (response.ok) {\n      return response.json();\n    }\n    if (!response.ok) {\n      var errorData = response.json();\n      return errorData.then(function (error) {\n        _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n      });\n    }\n  }).then(function (data) {\n    inputText.value = '';\n    // Update state and render\n    appState.messages = Array.from(appState.messages).concat(data);\n    _messages__WEBPACK_IMPORTED_MODULE_1__.updateMessages(appState.messages);\n  })[\"catch\"](function (error) {\n    if (error.error) {\n      _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n    }\n  });\n});\n\n//logout \nlogoutButton.addEventListener('click', function (e) {\n  e.preventDefault();\n  fetch('/api/v1/logout', {\n    method: 'POST',\n    headers: {\n      'content-type': 'application/json'\n    },\n    credentials: 'include'\n  }).then(function (response) {\n    if (response.ok) {\n      return response.json();\n    }\n    if (!response.ok) {\n      var errorData = response.json();\n      return errorData.then(function (error) {\n        _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n      });\n    }\n  }).then(function (data) {\n    if (data.success) {\n      clearInterval(appState.t1);\n      Error.style.display = 'block';\n      Error.innerHTML = 'Thank you for using our chat app';\n    }\n    renderLoginForm();\n  })[\"catch\"](function (error) {\n    if (error.error) {\n      _errors__WEBPACK_IMPORTED_MODULE_2__.renderErrorMessage(error.error, 'error');\n    }\n  });\n});\nfunction renderAll(onlineUsers, messages) {\n  return new Promise(function (resolve) {\n    // spinner, when the whole page is loading\n    loadingIndicator.classList.remove('hidden');\n    renderOnlineUserList(onlineUsers);\n    renderChatList(messages);\n    loadingIndicator.classList.add('hidden');\n    resolve();\n  });\n  return;\n}\n\n// render Login Form{\nfunction renderLoginForm() {\n  loginForm.style.display = 'block';\n  chatApp.style.display = 'none';\n}\nfunction renderChatApp() {\n  chatApp.style.display = 'block';\n  loginForm.style.display = 'none';\n  return;\n}\nfunction renderOnlineUserList(onlineUsers) {\n  // spinner, when the whole page is loading\n  loadingIndicator.classList.remove('hidden');\n  _users__WEBPACK_IMPORTED_MODULE_0__.printOnlineUserList(onlineUsers, 'user');\n  loadingIndicator.classList.add('hidden');\n  return;\n}\nfunction renderChatList(existingMsgsListessages) {\n  // spinner, when the whole page is loading\n  loadingIndicator.classList.remove('hidden');\n  _messages__WEBPACK_IMPORTED_MODULE_1__.updateMessages(existingMsgsListessages);\n  loadingIndicator.classList.add('hidden');\n  return;\n}\n\n//# sourceURL=webpack://project2/./src/app.js?");

/***/ }),

/***/ "./users.js":
/*!******************!*\
  !*** ./users.js ***!
  \******************/
/***/ ((module) => {

eval("// this is the file of data storage for stage\n\nvar userList = [];\nfunction updateUserList(username) {\n  var newUser = {\n    username: username,\n    online: true,\n    avatar: './images/lulupig.webp'\n  };\n  userList.push(newUser);\n  return userList;\n}\nfunction printOnlineUserList(onlineUserslist, elementId) {\n  var divSection = document.getElementById(elementId);\n  divSection.innerHTML = '';\n  if (onlineUserslist) {\n    userList = onlineUserslist;\n    userList.forEach(function (user) {\n      var span = document.createElement('span');\n      var img = document.createElement('img');\n      span.classList.add('existingUser');\n      img.classList.add('avatar');\n      span.innerHTML = user.username;\n      img.src = user.avatar;\n      divSection.appendChild(span);\n      span.appendChild(img);\n    });\n    return divSection;\n  }\n}\n\n//sanitize the username\nfunction isValidUsername(username) {\n  var isValid = true;\n  isValid = isValid && typeof username === 'string' && username.trim() !== '';\n  isValid = isValid && username.match(/^[a-z][a-z0-9]{2,19}$/i);\n  return isValid;\n}\nmodule.exports = {\n  userList: userList,\n  isValidUsername: isValidUsername,\n  updateUserList: updateUserList,\n  printOnlineUserList: printOnlineUserList\n};\n\n//# sourceURL=webpack://project2/./users.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;