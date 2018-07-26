"use strict";
!function() {
	
	window.addEventListener("load", function() {
		
		let object = {"name":"brennan", "working":true};
		console.log(JSON.stringify(object));
		
		saveData(object, 1);
		
		console.log(JSON.stringify(loadData()));
		
		eraseData();
		
		console.log(JSON.stringify(loadData()));
		
	});
	
}();