import IfElement from './if.element.js';

class IfTrueElement extends IfElement {

	constructor(params = {}) {
		super(params)
		this._var = params.attributes['var']
		this._bexp = `{ "var": "' + this.solveValue("${this._var}") + '", "value": "true", "op": "==" }`;
	}
}

module.exports = IfTrueElement