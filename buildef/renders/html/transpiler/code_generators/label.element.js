class LabelElement {

	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._for = params.attributes['for']
		this._class = params.attributes['class']
		this._text = params.textContent
		this._elementName = `label${++LabelElement.#elementCounter}`
	}

	get for() {
		return this._for
	}

	get class() {
		return this._class
	}

	get text() {
		return this._text
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		//code += `${ind0}let ${this._elementName} = document.createElement('label');\n`
		code += `${ind0}let ${this._elementName} = this.createElementIfNotExists(document, 'label', '${this._elementName}', ${container});\n`
		code += `${ind0}${this._elementName}.setAttribute('for', this.solveValue('${this._for}'));\n`
		code += `${ind0}${this._elementName}.setAttribute('class', this.solveValue('${this._class}'));\n`
		code += `${ind0}${this._elementName}.textContent = this.solveValue('${this._text}');\n`
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._elementName});\n`
		}
		return { code: code, element: this._elementName, container: false }
	}
}

module.exports = LabelElement