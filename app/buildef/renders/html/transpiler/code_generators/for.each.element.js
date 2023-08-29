class ForEachElement {

	constructor(params = {}) {
		this.params = params
		this._var = params.attributes['var']
		this._in = params.attributes['in']
	}

	add(element) {
		if (!this._children) {
			this._children = []
		}
		this._children.push(element)
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let code = ''
		code += `${ind0}let arr = this.solveValue('${this._in}');\n`
		code += `${ind0}arr.forEach((item) => {\n`
		code += `${ind1}this.classVars.vars['${this._var}'] = item;\n`
		if (this._children) {
			this._children.forEach((child) => {
				let childCode = child.writeCode(indent, level + 1, container)
				code += childCode.code + '\n'
			})
		}
		code += `${ind0}});\n`
		return { code: code, element: null, container: false }
	}
}

module.exports = ForEachElement