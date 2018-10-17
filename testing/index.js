"use strict";
! function () {

	window.addEventListener("load", function () {

		ajaxGET("return_args.php", function (text) {
			$("output").textContent = text;
		}, {
			"test": 1,
			"why": "no",
			"foo": "bar"
		});

	});

}();
