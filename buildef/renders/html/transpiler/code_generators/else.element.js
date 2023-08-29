class ElseElement {

	constructor(params = {}) {
		this.params = params
	}

	add(element) {
		if (!this._children) {
			this._children = []
		}
		this._children.push(element)
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level - 1)
		let code = ''
		code += `${ind0}} else {\n`
		if (this._children) {
			this._children.forEach((child) => {
				let childCode = child.writeCode(indent, level, container)
				code += childCode.code + '\n'
			})
			if (code.endsWith('\n')) {
				code = code.slice(0, -1)
			}
		}
		return { code: code, element: null, container: false }
	}
}

module.exports = ElseElement