class IfElement {

	constructor(params = {}) {
		this.params = params
		this._bexp = params.attributes['bexp']
	}

	get bexp() {
		return this._bexp
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
		code += `${ind0}if (this.solveBooleanExp('${this.bexp}')) {\n`
		if (this._children) {
			this._children.forEach((child) => {
				let childCode = child.writeCode(indent, level + 1, container)
				code += childCode.code + '\n'
			})
		}
		code += `${ind0}}`
		return { code: code, element: null, container: false }
	}
}

module.exports = IfElement