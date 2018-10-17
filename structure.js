// needs toolbox.js to run

"use strict";
(function () {

	let generatorMethods = {
		"menu": generateMenu
	};

	window.addEventListener("load", function () {
		let generated = $$(".generate");
		for (let i = 0; i < generated.length; i++) {
			generate(generated[i]);
		}
	});

	function generate(dom) {
		let classes = dom.classList;
		if (classes.contains("generate")) {
			// makes sure it has "generate [method] [url]"
			if (classes.length > 2) {
				let generator = generatorMethods[classes.item(1)];
				if (generator) {
					ajaxGET(classes.item(2), function (json) {
						generator(dom, json);
					});
					// change "generate" to past tense to indicate success
					dom.className = dom.className.replace("generate", "generated");
				}
			}
		}
	}

	function generateMenu(dom, json) {
	}

})();
