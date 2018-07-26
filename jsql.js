let data = undefined;

function create(url) {
	data = new Object();
}

function load(url) {
	ajaxGET("file.php")
}

function saveData(url) {
	ajaxPOST("io.php",null,"url",url,"data",JSON.stringify(data));
}