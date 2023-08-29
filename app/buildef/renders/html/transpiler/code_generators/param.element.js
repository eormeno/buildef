class ParamElement {

	constructor(params = {}) {
		this.params = params
		this._name = params.attributes['name']
		this._type = params.attributes['type']
		this._default = params.attributes['default']
		this._readonly = params.attributes['readonly']
	}

	get name() {
		return this._name
	}

	get type() {
		return this._type
	}

	get default() {
		return this._default
	}

	get readonly() {
		return this._readonly
	}

	writeCode(indent, level, container) {
		let ind1 = indent.repeat(level + 1)
		let code = `${ind1}${this.name}: {`
		if (this.default !== undefined && this.default !== null) {
			code += `default: '${this.default}', `
		}
		if (this.readonly !== undefined && this.readonly !== null) {
			code += `readonly: ${this.readonly}, `
		}
		if (this.type !== undefined && this.type !== null) {
			code += `type: '${this.type}', `
		}
		if (code.endsWith(', ')) {
			code = code.slice(0, -2)
		}
		code += '}'
		return code
	}
}

module.exports = ParamElement