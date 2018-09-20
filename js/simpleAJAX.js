function checkStatus(r) { 
	if (r.status >= 200 && r.status < 300) {
		return r.text();
	} else {
		return Promise.reject(
			new Error(r.status + ": " + r.statusText);
		);
	}
}

function ajaxGET(url, onSuccess) {
	fetch(url, { credentials: "include" })
		.then(checkStatus)
		.then(onSuccess)
		.catch(function(e) { 
			console.log(e);
		});
}