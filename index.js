"use strict";
!function() {
	
	window.addEventListener("load", function() {
		
		$("save").onclick = putCookie;
		$("load").onclick = getCookie;
		
	});
	
	function putCookie() {
		save(JSON.stringify({"name":"brennan", "working":true}));
	}
	
	function getCookie() {
		let json = load();
		console.log();
		$("output").textContent = json;
	}
	
}();