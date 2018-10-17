/***** AJAX methods *****/

/**
 * Helper function used by AJAX methods; no useful normal function.
 * 
 * @param {Promise} r a promise to check the status of
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


/***** cookie methods *****/
