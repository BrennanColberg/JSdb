/***** AJAX methods *****/

/**
 * Helper function used by AJAX methods; no useful normal function.
 * 
 * @param {object} r a promise to check the status of
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
 * General shorthand selector function.
 * 
 * @param {string} selector CSS attribute to search with
 * @param {object} parent an optional DOM element to base the search on
 * @return {object} the selected DOM element
 */
function $(selector, parent) {
	return (parent ? parent : document).querySelector(selector);
}

/**
 * DOM element creation shortcut.
 * 
 * @param {string} tag  type of HTML element to create
 * @param {string} className class of new element (optional)
 * @param {string || object} content things to put inside (text or other DOMs)
 * @return {object} generated DOM element
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
 * @param {object} object to test 
 * @return {boolean} whether or not it's an element
 */
function isElement(element) {
	return element instanceof Element || element instanceof HTMLDocument;
}


/***** cookie methods *****/
