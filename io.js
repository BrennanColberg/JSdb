const MS_PER_DAY = 1000 * 60 * 60 * 24;

function save(data, path = "/", days = 30) {
	let date = new Date();
	date.setTime(date.getTime() + (days * MS_PER_DAY));
	let dataString = "data=" + data + ";";
	let expirationString = "expires=" + date.toUTCString() + ";";
	let pathString = "path=" + path;
	document.cookie = dataString + expirationString + pathString;
}

function load(path = "/") {
	let cookie = decodeURIComponent(document.cookie);
	let vars = cookie.split(';');
	for (let i = 0; i < vars.length; i++) {
		let parts = vars[i].split('=');
		if (parts[0] === "data") {
			return parts[1];
		}
	}
}