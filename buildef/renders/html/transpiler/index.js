import fs from 'fs';
import path from 'path'
import logger from '@utils/applicationLogger'
import libxmljs from 'libxmljs2';
import AliasPathFileLoader from '@helpers/alias.path.file.loader';
import ResourcesLoader from '@helpers/resources.loader';

class TemplatesParser {

	#templatesFileExtension = '.html';
	#templatesSourcesFolder = 'components/templates';
	#buildDestinationFolder = AliasPathFileLoader.filePath('@template.builds')

	#codeGeneratorsClasses = {};
	#codeGeneratorsFolder = 'templates.parser/code.generators';

	start() {
		ResourcesLoader.processFilesWithExtension(
			this.#codeGeneratorsFolder,
			'.js',
			(file) => {
				this.#processCodeGenerators(file);
			});
		ResourcesLoader.processFilesWithExtension(
			this.#templatesSourcesFolder,
			this.#templatesFileExtension,
			(file) => {
				this.#processTemplateFile(file);
			});
	}

	#processCodeGenerators(filePath) {
		let elementCodeGenerator = require(filePath);
		let elementName = elementCodeGenerator.name.toLowerCase();
		this.#codeGeneratorsClasses[elementName] = elementCodeGenerator;
	}

	#processTemplateFile(filePath) {
		try {
			let xml = fs.readFileSync(filePath, 'utf8');
			let generatedCode = this.parse(xml);
			let fileName = path.basename(filePath, '.html') + '.js';
			let destFile = path.join(this.#buildDestinationFolder, fileName);
			fs.writeFileSync(destFile, generatedCode);
		} catch (e) {
			logger.error(e.message);
		}
	}

	parse(xmlTemplate) {
		let xmlDoc = libxmljs.parseXmlString(xmlTemplate, { noblanks: true });

		let template = this.deepIterate(xmlDoc.root(), (node, parent) => {
			let attributes = node.attrs();
			let attrObj = {};
			attributes.forEach((attribute) => {
				attrObj[attribute.name()] = attribute.value();
			});

			let textContent = node.text();
			if (textContent) {
				textContent = textContent.trim();
			}
			textContent = textContent || undefined;

			let className = node.name().toLowerCase() + 'element';
			// remove all dots from the name
			className = className.replace(/\./g, '');

			let elementArg = {
				attributes: attrObj,
				textContent: textContent,
			}

			let elementClass = this.#codeGeneratorsClasses[className];
			let element = null;
			try {
				element = new elementClass(elementArg);
			} catch (e) {
				logger.error(e.message);
			}

			if (parent) {
				parent.add(element);
			}
			return element;
		});

		let code = template.writeCode('  ', 0, null);
		return code;
	}

	deepIterate(node, callback, parent = null) {
		let newElement
		if (node.type() == "element") {
			newElement = callback(node, parent);
			node.childNodes().forEach((childNode) => {
				this.deepIterate(childNode, callback, newElement);
			});
		}
		return newElement;
	}
}

export default TemplatesParser;