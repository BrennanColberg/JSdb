"use strict";
! function () {

	window.addEventListener("load", function () {

		ajaxGET("return_args.php", function (text) {
			$("#output").textContent = text;
		}, {
			"test": 1,
			"why": "no",
			"foo": "bar"
		});

		$("body").appendChild(ce("ul", "test", ce("li", undefined, "hi this is the first method"), ce("li", undefined, "wow this is cool", ce("marquee", undefined, "this is deprecated!"))));

	});

}();
