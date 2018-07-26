function checkStatus(r){if(r.status>=200&&r.status<300){return r.text();}else{return Promise.reject(new Error(r.status+": "+r.statusText));}}
function ajaxGET(url,onSuccess) { // pass args as name, value, name, value... etc
	if (arguments.length > 2) url += "?" + arguments[2]; + "=" + arguments[3];
	for (let i = 4; i < arguments.length; i += 2) {
		url += "&" + arguments[i] + "=" + arguments[i+1];
	}
	fetch(url, {credentials: "include"}) // include credentials for cloud9
	   .then(checkStatus)
	   .then(onSuccess)
	   .catch(function(e){console.log(e);});
}
function ajaxPOST(url, onSuccess) { // pass args as name, value, name, value... etc
	let data = new FormData();
	for (let i = 2; i < arguments.length; i += 2) {
		data.append(arguments[i], arguments[i+1]);
	}
	fetch(url, {method: "POST", body: data, credentials: "include"}) // include credentials for cloud9
	   .then(checkStatus)
	   .then(onSuccess)
	   .catch(function(e){console.log(e);});
}