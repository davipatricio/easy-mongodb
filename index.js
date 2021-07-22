const Mongoose = require('mongoose');
const EventEmmiter = require('events');
module.exports = class DatabaseMongooseConnection extends EventEmmiter {
	constructor (url, name = 'easy-mongodb', config) {
		super();
		this.url = url;
		this.config = config;
		this.name = name;
		this.firstConnect = true;
		this._usefulMethods();
	}
	// Connect to mongodb
	connect () {
		Mongoose.connect(this.url, this.config ? this.config : { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
		this.db = Mongoose.connection;
		if(this.firstConnect) this._setupEvents();
		this.firstConnect = false;
		this.schema = new Mongoose.Schema({
			name: {},
			value: {}
		});
		this.model = Mongoose.model(this.name, this.schema);
		return Mongoose.connection;
	}

	// Disconnect from mongodb
	disconnect () {
		this.forcedDisconnect = true;
		return Mongoose.disconnect();
	}

	// Get database connection
	get connection () {
		return Mongoose.connection;
	}

	// Set database value
	async set (key, value) {
		// Buscamos o objeto da chave
		const obj = await this.model.findOne({ name: key });
		// Verificamos se a chave já existe, se existe, apenas alteramos o valor
		if (obj) {
			obj.value = value;
			return obj.save();
		}
		// Se não existe, criamos um novo objeto
		else {
			const newObj = new this.model({ name: key, value: value });
			return newObj.save();
		}
	}

	// Get database value
	async get (key) {
		const obj = await this.model.findOne({ name: key });
		return obj ? obj.value : undefined;
	}

	// Remove database value
	async remove (key) {
		const obj = await this.model.findOne({ name: key });
		return obj ? obj.remove() : null;
	}

	// Remove database value
	async delete (key) {
		const obj = await this.model.findOne({ name: key });
		return obj ? obj.remove() : null;
	}

	// Get all database values
	async getAll () {
		const obj = await this.model.find({}).exec();
		return obj ? obj : [];
	}

	// Get all database keys
	async getKeys () {
		const obj = await this.model.find({}).exec();
		return obj ? obj.map(o => o.name) : [];
	}

	// Delete all database values
	async deleteAll () {
		const obj = await this.model.find({}).exec();
		return obj ? obj.map(o => o.remove()) : [];
	}

	// Exists database value
	async exists (key) {
		const obj = await this.model.findOne({ name: key });
		return obj ? true : false;
	}

	// Increment database value
	async inc (key, value) {
		const obj = await this.model.findOne({ name: key });
		if (obj) {
			obj.value = obj.value + value;
			return obj.save();
		}
		else {
			const newObj = new this.model({ name: key, value: value });
			return newObj.save();
		}
	}

	// Decrement database value
	async dec (key, value) {
		const obj = await this.model.findOne({ name: key });
		if (obj) {
			obj.value = obj.value - value;
			return obj.save();
		}
		else {
			const newObj = new this.model({ name: key, value: value });
			return newObj.save();
		}
	}

	// Pull database value (array)
	async pull (key, value) {
		const obj = await this.model.findOne({ name: key });
		if (obj) {
			obj.value = obj.value.filter(v => v !== value);
			return obj.save();
		}
		else {
			const newObj = new this.model({ name: key, value: value });
			return newObj.save();
		}
	}

	// Push database value (array)
	async push (key, value) {
		const obj = await this.model.findOne({ name: key });
		if (obj) {
			obj.value.push(value);
			return obj.save();
		}
		else {
			const newObj = new this.model({ name: key, value: value });
			return newObj.save();
		}
	}

	// Database value includes (array)
	async includes (key, value) {
		const obj = await this.model.findOne({ name: key });
		if (obj) {
			return obj.value.includes(value);
		}
		else {
			return false;
		}
	};

	// Moongose object
	get mongoose () {
		return this.model;
	};

	// Setup events
	_setupEvents () {
		this.db.on('open', () => this.emit('ready'));
		this.db.on('error', e => this.emit('error', e));
		this.db.on('disconnect', () => {
			this.emit('disconnect');
			// Reconnect to mongodb
			if(!this.forcedDisconnect) Mongoose.connect(this.url, this.config ? this.config : { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true });
		});
	}

	// Useful methods
	_usefulMethods () {
		this.add = this.inc;
		this.rem = this.dec;
		this.aumentar = this.inc;
		this.diminuir = this.dec;
		this.adicionar = this.inc;
		this.remover = this.dec;
		this.all = this.getAll;
		this.keyArray = this.getAll;
		this.clear = this.deleteAll;
		this.has = this.exists;
		this.keys = this.getKeys;
	}

};