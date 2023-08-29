import IfElement from './if.element.js';

class IfNotNullElement extends IfElement {

	constructor(params = {}) {
		super(params)
		this._var = params.attributes['var']
		this._bexp = `{ "var": "' + this.solveValue("${this._var}") + '", "value": "null", "op": "!=" }`;
	}
}

module.exports = IfNotNullElement