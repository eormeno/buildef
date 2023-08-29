import logger from "winston";

class Base {
	classType = ''
	name = ''
	prefix = ''
	dotName = ''
	className = ''
	dashName = ''

	constructor(args = { suffixClassName: 'Base' }) {

		this.classType = args.suffixClassName || ''

		if (this.className == '') {
			this.className = this.constructor.name
		}

		if (this.name == '') {
			this.name = this.constructor.name.replace(this.classType, '')
		}

		if (this.prefix == '') {
			// converts the camelCase class name to snake_case
			this.prefix = this.name.replace(/([a-z])([A-Z])/g, '$1_$2').toLowerCase() + '__'
		}

		if (this.dotName == '') {
			// converts the pascalCase class name to dot.case
			this.dotName = this.name.replace(/([a-z])([A-Z])/g, '$1.$2').toLowerCase()
		}

		if (this.dashName == '') {
			// converts the pascalCase class name to dash-case
			this.dashName = this.name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
		}
	}

	getName() {
		return this.name
	}

	getPrefix() {
		return this.prefix
	}

	getClassName() {
		return this.className
	}

	static getDashName() {
		return this.dashName
	}

	throwError(errorCode, message, params = {}) {
		throw new ControllerError(errorCode, {
			message: `${this.getPrefix()}${message}`,
			params: params
		})
	}

	catchError(contextMessage, error, response) {
		ControllerError.onCatch(`${this.getPrefix()}${contextMessage}`, error, response)
	}

	log(message, params = {}) {
		logger.info(`[${this.getClassName()}]: ${message}`, params)
	}

	error(message, params = {}) {
		logger.error(`[${this.getClassName()}]: ${message}`, params)
	}

	warn(message, params = {}) {
		logger.warn(`[${this.getClassName()}]: ${message}`, params)
	}
}

module.exports = Base;