const MS_PER_DAY = 1000 * 60 * 60 * 24;

function saveData(data, days) {
	let json = JSON.stringify(data);
	let date = new Date();
	date.setTime(date.getTime() + days * MS_PER_DAY);
	let dataString = "data=" + json + "; ";
	let expirationString = "expires=" + date.toUTCString(); + "; ";
	document.cookie = dataString + expirationString + "path=/;";
}

function loadData() {
	let cookie = document.cookie;
	let vars = cookie.split(';');
	for (let i = 0; i < vars.length; i++) {
		let parts = vars[i].split('=');
		if (parts[0].trim === "data") {
			let json = part[1].trim;
			let data = JSON.parse(json);
			return data;
		}
	}
}

function eraseData() {
	saveData("", -1);
}