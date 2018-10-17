/***** AJAX Methods *****/

/**
 * Helper function used by AJAX methods; no useful normal function.
 * 
 * @param {object} r	a promise to check the status of
 */
function checkStatus(r) {
	if (r.status >= 200 && r.status < 300) {
		return r.text();
	} else {
		return Promise.reject(
			new Error(r.status + ": " + r.statusText)
		);
	}
}

/**
 * Boilerplate AJAX GET method.
 * 
 * @param {string} url	the URL to query
 * @param {function} onSuccess	the function to call with retrieved data as soon
 * 								as it comes
 * @param {object} arguments	an object representing each argument that should
 * 								be given to the queried source
 */
function ajaxGET(url, onSuccess, arguments) {
	if (arguments) {
		let keys = Object.keys(arguments);
		for (let i = 0; i < keys.length; i++) {
			url += (i === 0) ? "?" : "&";
			url += keys[i] + "=" + arguments[keys[i]];
		}
	}
	fetch(url, {
			method: "GET",
			credentials: "include"
		})
		.then(checkStatus)
		.then(onSuccess)
		.catch(function (e) {
			console.log(e);
		});
}

/**
 * Boilerplate AJAX POST method.
 * 
 * @param {string} url	the URL to query
 * @param {function} onSuccess	the function to call with retrieved data as soon
 * 								as it comes
 * @param {object} arguments	an object representing each argument that should
 * 								be given to the queried source
 */
function ajaxPOST(url, onSuccess, arguments) {
	let data = new FormData();
	if (arguments) {
		let keys = Object.keys(arguments);
		for (let i = 0; i < keys.length; i++) {
			data.append(keys[i], arguments[keys[i]]);
		}
	}
	fetch(url, {
			method: "POST",
			body: data,
			credentials: "include"
		})
		.then(checkStatus)
		.then(onSuccess)
		.catch(function (e) {
			console.log(e);
		});
}


/***** Standard DOM Shortcuts *****/

/**
 * Single DOM selector function.
 * 
 * @param {string} selector	CSS attribute to search with
 * @param {object} parent	an optional DOM element to base the search on
 * @return {object}	the selected DOM element
 */
function $(selector, parent) {
	return (parent ? parent : document).querySelector(selector);
}

/**
 * Multiple DOM selector function.
 * 
 * @param {string} selector	CSS attribute to search with
 * @param {object} parent	an optional DOM element to base the search on
 * @return {array}	all selected DOM elements
 */
function $$(selector, parent) {
	return (parent ? parent : document).querySelectorAll(selector);
}

/**
 * DOM element creation shortcut.
 * 
 * @param {string} tag	type of HTML element to create
 * @param {string} className	class of new element (optional)
 * @param {string || object} content	things to put inside (text or other DOMs)
 * @return {object}	generated DOM element
 */
function ce(tag, className, content) {
	let element = document.createElement(tag);
	if (className) element.className = className;
	for (let i = 2; i < arguments.length; i++) {
		let arg = arguments[i];
		if (typeof arg === "string") {
			element.textContent += arg;
		} else if (isElement(arg)) {
			element.appendChild(arg);
		}
	}
	return element;
}

/**
 * Simple test to determine whether an object is a DOM element. Does not work in IE7.
 * 
 * @param {object} element	object to test 
 * @return {boolean} 	whether or not it's an element
 */
function isElement(element) {
	return element instanceof Element || element instanceof HTMLDocument;
}


/***** Cookie Management Methods *****/

/**
 * Saves a cookie to the browser.
 * 
 * @param {string} title	name of cookie to save
 * @param {string} data 	content of cookie to save
 * @param {string} path 	path at which to save cookie (defaults to "/")
 * @param {number} days 	days for which to store cookie (defaults to 30)
 */
function saveCookie(title, data, path = "/", days = 30) {
	let date = new Date();
	date.setTime(date.getTime() + (days * 1000 * 60 * 60 * 24));
	let dataString = title.trim() + "=" + data + ";";
	let expirationString = "expires=" + date.toUTCString() + ";";
	let pathString = "path=" + path;
	document.cookie = dataString + expirationString + pathString;
}

/**
 * Retrieves the stored value of a cookie from the browser.
 * 
 * @param {string} title 	name of cookie to retrieve
 * @param {string} path 	path from which to load cookie (defaults to "/")
 * @return {string} 	retrieved cookie value
 */
function loadCookie(title, path = "/") {
	let cookie = decodeURIComponent(document.cookie);
	let vars = cookie.split(';');
	for (let i = 0; i < vars.length; i++) {
		let parts = vars[i].split('=');
		if (parts[0].trim() === title.trim()) {
			return parts[1].trim();
		}
	}
	return undefined;
}

/**
 * Erases a cookie from memory on the browser.
 * 
 * @param {string} title 	name of cookie to erase
 * @param {string} path 	path at which to erase cookie
 */
function eraseCookie(title, path = "/") {
	saveCookie(title, "", path, -1);
}

/**
 * Checks whether a cookie is equivalent to a certain value.
 * 
 * @param {string} title 	name of cookie to compare against
 * @param {string} data		content against which to check for matching
 * @param {string} path		path to get cookie from for comparing
 * @return {boolean} 	whether or not the retrieved cookie matches given value
 */
function cookieEquals(title, data, path = "/") {
	return loadCookie(title, path) == data;
}

/**
 * Checks whether or not a cookie exists.
 * 
 * @param {string} title 	name of cookie of which to test existence
 * @param {string} path 	path at which the cookie would exist if it does
 * @return {boolean} 	whether or not the cookie exists
 */
function cookieExists(title, path = "/") {
	return !cookieEquals(title, undefined, path);
}
