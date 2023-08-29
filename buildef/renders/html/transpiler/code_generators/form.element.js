class FormElement {

	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._class = params.attributes['class']
		this._elementName = `form${++FormElement.#elementCounter}`
	}

	add(element) {
		if (!this._children) {
			this._children = []
		}
		this._children.push(element)
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		//code += `${ind0}let ${this._elementName} = document.createElement('div');\n`
		code += `${ind0}let ${this._elementName} = this.createElementIfNotExists(document, 'div', '${this._elementName}');\n`
		code += `${ind0}if (this.solveValue('${this._class}')) ${this._elementName}.className = this.solveValue('${this._class}');\n`
		for (let child of this._children) {
			let childCode = child.writeCode(indent, level, this._elementName)
			code += childCode.code
		}
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._elementName});\n`
		}
		return { code: code, element: this._elementName, container: true }
	}
}

module.exports = FormElement