class ContainerElement {
	static #elementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._for = params.attributes.for
		this._containerVarName = `container${++ContainerElement.#elementCounter}`
		this._elementVarName = `element${ContainerElement.#elementCounter}`
	}

	get for() {
		return this._for
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		//code += `${ind0}let ${this._containerVarName} = document.createElement('div');\n`
		code += `${ind0}let ${this._containerVarName} = this.createElementIfNotExists(document, 'div', '${this._containerVarName}', ${container});\n`
		code += `${ind0}let ${this._elementVarName} = this.solveValue('${this.for}');\n`
		code += `${ind0}let child = this.renderElement(${this._elementVarName}, document);\n`
		code += `${ind0}${this._containerVarName}.appendChild(child);\n`
		if (container) {
			//code += `${ind0}${container}.appendChild(${this._containerVarName});\n`
		}
		return { code: code, element: `${this._containerVarName}`, container: false }
	}
}

module.exports = ContainerElement