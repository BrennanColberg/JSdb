"use strict";
!function() {
	
	window.addEventListener("load", function() {
		
		$("save").onclick = putCookie;
		$("load").onclick = getCookie;
		
	});
	
	function putCookie() {
		save({"name":"brennan", "working":true});
	}
	
	function getCookie() {
		let json = JSON.stringify(load());
		console.log();
		$("output").textContent = json;
	}
	
}();