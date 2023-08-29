class H3Element {

	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._text = params.textContent
		this._elementName = `h3${++H3Element.#elementCounter}`
	}

	get id() {
		return this._id
	}

	get text() {
		return this._text
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		//code += `${ind0}let ${this._elementName}  = document.createElement('h3');\n`
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._elementName});\n`
			code += `${ind0}let ${this._elementName} = this.createElementIfNotExists(document, 'h3', '${this._elementName}', ${container});\n`
		}
		code += `${ind0}${this._elementName}.innerHTML = this.solveValue('${this.text}');\n`
		return { code: code, element: this._elementName, container: false }
	}
}

module.exports = H3Element