class ButtonElement {
	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._id = params.attributes['id']
		this._action = params.attributes['action']
		this._class = params.attributes['class']
		this._primary = params.attributes['primary']
		this._disabled = params.attributes['disabled']
		this._formId = params.attributes['formId']
		this._text = params.textContent
		this._elementName = `button${++ButtonElement.#elementCounter}`
	}

	get id() {
		return this._id
	}

	get action() {
		return this._action
	}

	get class() {
		return this._class
	}

	get text() {
		return this._text
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let code = ''
		//code += `${ind0}let ${this._elementName} = document.createElement('button');\n`
		code += `${ind0}let ${this._elementName} = this.createElementIfNotExists(document, 'button', '${this._elementName}', ${container});\n`
		code += `${ind0}${this._elementName}.className = this.solveValue('${this.class}');\n`
		code += `${ind0}${this._elementName}.innerHTML = this.solveValue('${this.text}');\n`
		code += `${ind0}${this._elementName}.action = this.solveValue('${this.action}');\n`
		code += `${ind0}if (this.solveValue('${this._disabled}')) ${this._elementName}.disabled = true;\n`
		code += `${ind0}let self = this;\n`
		code += `${ind0}${this._elementName}.onclick = function () {\n`
		code += `${ind1}if (${this._elementName}.disabled) {\n`
		code += `${ind2}return;\n`
		code += `${ind1}}\n`
		//code += `${ind1}if (self.solveValue('${this._formId}') !== '${this._formId}') {\n`
		//code += `${ind2}console.log('This button is submit of form ' + self.solveValue('${this._formId}'));\n`
		//code += `${ind1}} else {\n`
		//code += `${ind2}console.log('The button is free');\n`
		//code += `${ind1}}\n`
		code += `${ind1}let changedElements = self.inputElementChanges();\n`
		code += `${ind1}self.updateState({ action: this.action, data: changedElements });\n`
		code += `${ind0}}\n`
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._elementName});\n`
		}
		return { code: code, element: this._elementName, container: false }
	}
}

module.exports = ButtonElement