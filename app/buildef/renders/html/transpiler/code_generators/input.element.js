class InputElement {

	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._id = params.attributes['id']
		this._type = params.attributes['type']
		this._class = params.attributes['class']
		this._value = params.attributes['value']
		this._name = params.attributes['name']
		this._formId = params.attributes['formId']
		this._ariaDescribedby = params.attributes['aria-describedby']
		this._placeholder = params.attributes['placeholder']
		this._required = params.attributes['required']
		this._readonly = params.attributes['readonly']
		this._disabled = params.attributes['disabled']
		this._elementName = `input${++InputElement.#elementCounter}`
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		//code += `${ind0}let ${this._elementName} = document.createElement('input');\n`
		code += `${ind0}let ${this._elementName} = this.createElementIfNotExists(document, 'input', '${this._elementName}', ${container});\n`
		code += `${ind0}${this._elementName}.id = this.solveValue('${this._id}');\n`
		code += `${ind0}${this._elementName}.name = this.solveValue('${this._name}');\n`
		code += `${ind0}${this._elementName}.type = this.solveValue('${this._type}');\n`
		code += `${ind0}${this._elementName}.className = this.solveValue('${this._class}');\n`
		code += `${ind0}${this._elementName}.value = this.solveValue('${this._value}');\n`
		code += `${ind0}${this._elementName}.setAttribute('aria-describedby', this.solveValue('${this._ariaDescribedby}'));\n`
		code += `${ind0}${this._elementName}.placeholder = this.solveValue('${this._placeholder}');\n`
		code += `${ind0}if (this.solveValue('${this._required}')) ${this._elementName}.setAttribute('required', '');\n`
		code += `${ind0}if (this.solveValue('${this._readonly}')) ${this._elementName}.setAttribute('readonly', '');\n`
		code += `${ind0}if (this.solveValue('${this._disabled}')) ${this._elementName}.setAttribute('disabled', '');\n`
		//code += `${ind0}if (this.solveValue('${this._formId}') !== '${this._formId}') console.log('Input ' + this.solveValue('${this._name}') + ' belongs to form ' + this.solveValue('${this._formId}'));\n`
		code += `${ind0}this.registerElement(${this._elementName}, this.logicalInstance);\n`
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._elementName});\n`
		}
		return { code: code, element: this._elementName, container: false }
	}
}

module.exports = InputElement