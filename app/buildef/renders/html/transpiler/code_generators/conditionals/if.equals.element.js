import IfElement from './if.element.js';

class IfEqualsElement extends IfElement {

	constructor(params = {}) {
		super(params)
		this._var = params.attributes['var']
		this._value = params.attributes['value']
		this._bexp = `{ "var": "' + this.solveValue("${this._var}") + '", "value": "' + this.solveValue("${this._value}") + '", "op": "==" }`;
	}
}

module.exports = IfEqualsElement