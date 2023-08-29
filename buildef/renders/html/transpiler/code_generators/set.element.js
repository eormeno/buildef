class SetElement {

	constructor(params = {}) {
		this.params = params
		this._var = params.attributes['var']
		this._value = params.attributes['value']
		this._expr = params.attributes['expr']
	}

	get var() {
		return this._var
	}

	get value() {
		return this._value
	}

	get expr() {
		return this._expr
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let code = ''
		if (this.expr) {
			code += `${ind0}this.classVars.vars['${this.var}'] = this.solveExp('${this.expr}')`
		} else {
			code += `${ind0}this.classVars.vars['${this.var}'] = this.solveValue('${this.value}')`
		}
		return { code: code, element: null, container: false }
	}
}

module.exports = SetElement