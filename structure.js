// needs toolbox.js to run

"use strict";
(function () {

	let generatorMethods = {
		"menu": generateMenu,
		"html": embedHTML,
		"text": embedText,
		"article": generateArticle
	};

	let defaultElementGeneratorMethods = {
		"NAV": generateMenu,
		"ARTICLE": generateArticle,
		"HTML": embedHTML,
		"DIV": embedHTMl,
		"P": embedText,
	};

	window.addEventListener("load", function () {
		let generated = $$("[generate]");
		for (let i = 0; i < generated.length; i++) {
			generate(generated[i]);
		}
	});

	// selects the proper function & generates it
	function generate(dom) {
		let chosenMethod = undefined;

		// chooses default action
		if (dom.tagName in defaultElementGeneratorMethods)
			chosenMethod = defaultElementGeneratorMethods[dom.tagName];

		// chooses specified method through class (overrides default if both)
		for (let className of dom.classList)
			if (className in generatorMethods)
				chosenMethod = generatorMethods[className];

		// runs the chosen generator method if one was selected
		if (chosenMethod) {
			ajaxGET(dom.getAttribute("src"), function (json) {
				chosenMethod(dom, json);
			});
		}
	}

	// generates a menu!
	function generateMenu(dom, json) {
		let data = JSON.parse(json);
		let entries = Object.keys(data);
		for (let i = 0; i < entries.length; i++) {
			let link = ce("a", null, entries[i]);
			link.href = data[entries[i]];
			dom.appendChild(link);
		}
	}

	// generates an article (effectively just Markdown)
	function generateArticle(dom, text) {
		let sections = text.split("\n\n");
		for (let i = 0; i < sections.length; i++) {
			let div = ce("div");
			let lines = sections[i].split("\n");
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
					div.appendChild(ce("h" + headerNumber, null, line));
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
					div.appendChild(list);
				}

				// paragraph
				else {
					div.appendChild(ce("p", null, line));
				}
			}

			// creates div around multi-element section if necessary
			if (div.childElementCount > 1) {
				dom.appendChild(div);
			} else if (div.childElementCount) {
				dom.appendChild(div.firstChild);
			}
		}
	}

	// copies HTML into innerHTML
	function embedHTML(dom, html) {
		dom.innerHTML = html;
	}

	// copies content into textContent
	function embedText(dom, text) {
		dom.textContent = text;
	}

})();
