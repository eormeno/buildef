import Base from "@base"

class AWidget extends Base {
	static nextId = 0;

	_manager;
	_session;

	constructor(params = {}) {
		super({ suffixClassName: "Component" })
		this.id = AWidget.nextId++;
		this.#configSessionManager(params);
		this.#registerNewObject(this);
	}

	get manager() {
		return this._manager;
	}

	get session() {
		return this._session;
	}

	#configSessionManager(params = { sessionManager: null, session: null }) {
		if (params.sessionManager && params.session) {
			this._manager = params.sessionManager;
			this._session = params.session;
		}
	}

	#registerNewObject(object) {
		if (this.manager) {
			this.manager.registerNewObject(this.session, object);
		}
	}

	changeAttribute(attribute, value) {
		if (this[attribute] !== value) {
			this[attribute] = value;
			if (this.manager) {
				this.manager.registerUpdatedObject(this.session, attribute, this);
			}
		}
	}

	changePage(pageClassName) {
		if (this.manager) {
			this.manager.setPage(this.session, pageClassName);
		}
	}

	toJSON() {
		return {
			id: this.id,
			class: this.className,
		}
	}
}

module.exports = AWidget