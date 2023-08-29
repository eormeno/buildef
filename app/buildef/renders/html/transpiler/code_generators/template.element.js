import ParamElement from './param.element.js';

class TemplateElement {

	elementParams = {}

	constructor(params = {}) {
		this.params = params
		this._name = params.attributes['name']
		let idParam = new ParamElement({ attributes: { name: 'id', type: 'string', readonly: true } })
		this.add(idParam)
	}

	get name() {
		return this._name
	}

	add(element) {
		if (!this._children) {
			this._children = []
		}

		if (element instanceof ParamElement) {
			this.elementParams[element.name] = element
		} else {
			this._children.push(element)
		}
	}

	writeCode(indent, level, container) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let ind3 = indent.repeat(level + 3)
		let code = ''
		code += `${ind0}class ${this.name}Render {\n\n`
		code += `${ind1}classVars = {}\n`
		code += `${ind1}domElements = {}\n\n`
		code += `${ind1}paramsConfig = {\n${this.buildParamsConfig(indent, level)}\n${ind1}}\n\n`
		code += `${ind1}constructor (params = {${this.buildConstructorParams(indent, level)}}, updateState, renderElement, registerElement, inputElementChanges) {\n`
		code += `${ind2}this.paramValuesResolver(params);\n`
		code += `${ind2}this.updateState = updateState;\n`
		code += `${ind2}this.renderElement = renderElement;\n`
		code += `${ind2}this.registerElement = registerElement;\n`
		code += `${ind2}this.inputElementChanges = inputElementChanges;\n`
		code += `${ind1}}\n\n`

		code += `${ind1}render(document) {\n`
		if (this._children) {
			let retElement = null
			this._children.forEach((child) => {
				let childCode = child.writeCode(indent, level + 2)
				retElement = childCode.element
				code += childCode.code + '\n'
			})
			if (code.endsWith('\n')) {
				code = code.slice(0, -1)
			}
			code += `${ind2}return ${retElement};\n`
		}
		code += `${ind1}}\n`
		code += `${ind0}\n`
		code += `${ind1}${this.buildSolveValueFunction(indent, level)}\n`
		code += `${ind0}${this.buildConstructorParamResolvers(indent, level)}\n`
		code += `${ind0}${this.buildSolveBooleanExpFunction(indent, level)}\n`
		code += `${ind0}${this.buildCreateElementFunction(indent, level)}\n`
		code += `${ind0}${this.buildUpdateFunction(indent, level)}`
		code += `${ind0}}\n`
		code += `${ind0}export default ${this.name}Render;`
		return code
	}

	buildSolveValueFunction(indent, level) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let ind3 = indent.repeat(level + 3)
		let ind4 = indent.repeat(level + 4)
		let code = ''
		code += `${ind0}solveValue(name) {\n`
		code += `${ind2}let value = this.classVars.params[name]\n`
		code += `${ind2}if (value !== undefined && value !== null) {\n`
		code += `${ind3}let type = this.paramsConfig[name].type\n`
		code += `${ind3}if (type === 'string') {\n`
		code += `${ind4}return value\n`
		code += `${ind3}} else if (type === 'boolean') {\n`
		code += `${ind4}return value === 'true'\n`
		code += `${ind3}} else if (type === 'number') {\n`
		code += `${ind4}return Number(value)\n`
		code += `${ind3}}\n`
		code += `${ind3}return value;\n`
		code += `${ind2}}\n`
		code += `${ind2}value = this.classVars.vars[name]\n`
		code += `${ind2}if (value !== undefined && value !== null) {\n`
		code += `${ind3}return value;\n`
		code += `${ind2}}\n`
		code += `${ind3}return name;\n`
		code += `${ind1}}\n`
		return code
	}

	buildUpdateFunction(indent, level) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let ind3 = indent.repeat(level + 3)
		let ind4 = indent.repeat(level + 4)
		let code = ''
		code += `${ind1}update(document, changes) {\n`
		code += `${ind1}  for (let key in this.paramsConfig) { \n`
		code += `${ind1}	  let value = changes[key];\n`
		code += `${ind1}	  if (value !== undefined && value !== null) {\n`
		code += `${ind1}	    this.classVars.params[key] = value;\n`
		code += `${ind1}	  }\n`
		code += `${ind1}  }\n`
		code += `${ind1}  this.render(document);\n`
		code += `${ind1}}\n`
		return code
	}

	buildCreateElementFunction(indent, level) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let ind3 = indent.repeat(level + 3)
		let ind4 = indent.repeat(level + 4)
		let code = ''
		code += `${ind1}createElementIfNotExists(document, elementType, elementName, container) {\n`
		code += `${ind1}	if (!this.domElements[elementName]) {\n`
		code += `${ind1}	  this.domElements[elementName] = document.createElement(elementType);\n`
		code += `${ind1}	  if (container) {\n`
		code += `${ind1}		 container.appendChild(this.domElements[elementName]);\n`
		code += `${ind1}	  }\n`
		code += `${ind1}	}\n`
		code += `${ind1}	return this.domElements[elementName];\n`
		code += `${ind1}}\n`
		return code
	}

	buildParamsConfig(indent, level) {
		let params = ''
		let self = this
		if (this.elementParams) {
			Object.keys(self.elementParams).forEach((key) => {
				let param = self.elementParams[key]
				params += param.writeCode(indent, level + 1) + ',\n'
			})
			if (params.endsWith(',\n')) {
				params = params.slice(0, -2)
			}
		}
		return params
	}

	buildConstructorParams(indent, level) {
		let params = ''
		let self = this
		if (this.elementParams) {
			Object.keys(self.elementParams).forEach((key) => {
				let param = self.elementParams[key]
				params += param.name + ': null' + ', '
			})
			if (params.endsWith(', ')) {
				params = params.slice(0, -2)
			}
		}
		return params
	}

	buildConstructorBody(indent, level) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let body = ''
		let self = this
		if (this.elementParams) {
			Object.keys(self.elementParams).forEach((key) => {
				let param = self.elementParams[key]
				body += `${ind0}this.${param.name} = params.${param.name}\n`
			})
			if (body.endsWith('\n')) {
				body = body.slice(0, -1)
			}
		}
		return body
	}

	buildConstructorParamResolvers(indent, level) {
		let ind0 = indent.repeat(level)
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let ind3 = indent.repeat(level + 3)
		let ind4 = indent.repeat(level + 4)
		let ind5 = indent.repeat(level + 5)
		let code = ''
		code += `${ind1}paramValuesResolver(params) {\n`
		code += `${ind2}this.logicalInstance = params;\n`
		code += `${ind2}this.classVars.vars = {};\n`
		code += `${ind2}this.classVars.params = {};\n`
		code += `${ind2}for (let key in this.paramsConfig) {\n`
		code += `${ind3}let param = this.paramsConfig[key]\n`
		code += `${ind3}let value = params[key]\n`
		code += `${ind3}if (value !== undefined && value !== null) {\n`
		code += `${ind4}this.classVars.params[key] = value\n`
		code += `${ind3}} else {\n`
		code += `${ind4}if (param.default !== undefined && param.default !== null) {\n`
		code += `${ind5}this.classVars.params[key] = param.default\n`
		code += `${ind4}} else {\n`
		code += `${ind5}// console.log('Param ' + key + ' is required')\n`
		code += `${ind5}this.classVars.params[key] = null\n`
		code += `${ind4}}\n`
		code += `${ind3}}\n`
		code += `${ind2}}\n`
		code += `${ind1}}\n`
		return code
	}

	buildSolveBooleanExpFunction(indent, level) {
		let ind1 = indent.repeat(level + 1)
		let ind2 = indent.repeat(level + 2)
		let ind3 = indent.repeat(level + 3)
		let code = ''
		code += `${ind1}solveBooleanExp(booleanExpression) {\n`
		code += `${ind2}try {\n`
		code += `${ind3}let exp = JSON.parse(booleanExpression);\n`
		code += `${ind3}let evalExpression = '"' + exp.var + '" ' + exp.op + ' "' + exp.value + '"';\n`
		code += `${ind3}let result = eval(evalExpression);\n`
		code += `${ind3}// console.log(evalExpression + " = " + result);\n`
		code += `${ind3}return result;\n`
		code += `${ind2}} catch (e) {\n`
		code += `${ind3}console.error(booleanExpression);\n`
		code += `${ind3}return false;\n`
		code += `${ind2}}\n`
		code += `${ind1}}\n`
		return code
	}
}

module.exports = TemplateElement