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
		let lines = text.split("\n");
		for (let i = 0; i < lines.length; i++) {
			let line = lines[i];

			// header catch
			if (line.startsWith("#")) {
				// figure out which header it is
				let headerNumber = 1;
				while (line.charAt(headerNumber) === "#" && headerNumber < 6)
					headerNumber++;
				console.log(line.charAt(headerNumber));
				console.log(headerNumber);
				line = line.substr(headerNumber, line.length - 1);
				dom.appendChild(ce("h" + headerNumber, null, line));
			}

			// paragraph parser
			else if (i === lines.length - 1 || !lines[i + 1]) { // standard
				dom.appendChild(ce("p", null, line));
			} else if (false) { // simple line end
				let p = ce("p", null, line);
				p.appendChild(ce("br"));
				p.appendChild(document.createTextNode(lines[i + 1]));
				dom.appendChild(p);
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
