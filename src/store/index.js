if(process.env.NODE_ENV === 'production'){
	module.exports = require('./Store.prod');
}else{
	module.exports = require('./Store.dev');
}