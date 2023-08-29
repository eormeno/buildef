class HRElement {

	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params;
		this._elementName = `hr${++HRElement.#elementCounter}`
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		//code += `${ind0}let ${this._elementName} = document.createElement('hr');\n`
		code += `${ind0}let ${this._elementName} = this.createElementIfNotExists(document, 'hr', '${this._elementName}', ${container});\n`
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._elementName});\n`
		}
		return { code: code, element: this._elementName, container: false }
	}
}

module.exports = HRElement