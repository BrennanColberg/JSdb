// needs toolbox.js to run

"use strict";
(function () {

	let generatorMethods = {
		"menu": generateMenu,
		"html": embedHTML,
		"text": embedText,
		"article": generateArticle
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
			if (classes.length > 1) {
				let generator = generatorMethods[classes.item(1)];
				if (generator && dom.getAttribute("src")) {
					ajaxGET(dom.getAttribute("src"), function (json) {
						generator(dom, json);
						// change "generate" to past tense to indicate success
						dom.className = dom.className.replace("generate", "generated");
					});
				} else {
					console.error("Invalid generation attempt!");
				}
			}
		}
	}

	function generateMenu(dom, json) {
		let data = JSON.parse(json);
		let entries = Object.keys(data);
		for (let i = 0; i < entries.length; i++) {
			let link = ce("a", null, entries[i]);
			link.href = data[entries[i]];
			dom.appendChild(link);
		}
	}

	function generateArticle(dom, text) {
		let subsections = text.split("\n\n");
		for (let i = 0; i < subsections.length; i++) {
			let subsection = subsections[i];
			let lines = subsection.split("\n");
			for (let j = 0; j < lines.length; j++) {
				let line = lines[j];

				// header
				if (line.startsWith("#")) {
					// figure out which header it is
					let headerNumber = 1;
					while (line.charAt(headerNumber) === "#" && headerNumber < 6)
						headerNumber++;
					// remove indicator
					line = line.substr(headerNumber, line.length - 1);
					// add element!
					dom.appendChild(ce("h" + headerNumber, null, line));
				}

				// list (only one layer deep as of yet)
				else if (line.startsWith("\t")) {
					let list = ce("ul");
					j--;
					while (j + 1 < lines.length && lines[j + 1].startsWith("\t")) {
						j++;
						line = lines[j].substr(1, lines[j].length - 1);
						list.appendChild(ce("li", null, line));
					}
					dom.appendChild(list);
				}

				// paragraph
				else {
					dom.appendChild(ce("p", null, line));
				}

			}
		}
	}

	function embedHTML(dom, html) {
		dom.innerHTML = html;
	}

	function embedText(dom, text) {
		dom.textContent = text;
	}

})();
