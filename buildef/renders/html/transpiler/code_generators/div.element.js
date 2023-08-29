class DivElement {

	static #divElementCounter = 0

	constructor(params = {}) {
		this.params = params
		this._style = params.attributes['style']
		this._class = params.attributes['class']
		this._id = params.attributes['id']
		this._text = params.attributes['text']
		this._elementName = `div${++DivElement.#divElementCounter}`
	}

	add(element) {
		if (!this._children) {
			this._children = []
		}
		this._children.push(element)
	}

	get id() {
		return this._id
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
		let elementName = `${this._elementName}`
		//code += `${ind0}let ${elementName} = document.createElement('div');\n`
		code += `${ind0}let ${elementName} = this.createElementIfNotExists(document, 'div', '${elementName}', ${container});\n`
		code += `${ind0}if (this.solveValue('${this._style}') !== '${this._style}') ${elementName}.style = '${this._style}';\n`
		if (this.class) {
			code += `${ind0}${elementName}.setAttribute('class', this.solveValue('${this._class}'));\n`
		}
		if (this.id) {
			code += `${ind0}${elementName}.setAttribute('id', this.solveValue('${this._id}'));\n`
		}
		if (this.text) {
			code += `${ind0}${elementName}.innerHTML = this.solveValue('${this._text}');\n`
		}
		if (this._children) {
			this._children.forEach((child) => {
				let childCode = child.writeCode(indent, level, elementName)
				code += childCode.code + '\n'
			})
		}
		if (container) {
			//code += `${ind0}${container}.appendChild(${elementName});\n`
		}
		return { code: code, element: elementName, container: true }
	}
}

module.exports = DivElement