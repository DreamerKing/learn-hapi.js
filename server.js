const Hapi = require('hapi');
const Good = require('good');

const server = new Hapi.Server();
server.connection({
	port: 3000
});

server.route({
	method: 'GET',
	path: '/',
	handler: function(req, reply) {
		reply("Hello, DK!");
	}
});

server.route({
	method: 'GET',
	path: '/{name}',
	handler: function(req, reply) {
		reply(`Hello, ${req.params.name}!`);
	}
});

server.register({
	register: Good,
	option: {
		reporters: {
			console: [{
					module: 'good-squeeze',
					name: 'Squeeze',
					args: [{
						response: '*',
						log: '*'
					}]
				},{
					module: 'good-console'
				}, 'stdout']
			}
		}
	},(err) => {
		if(err){
			throw err;
		}
		
		server.start((err) => {
			if(err) {
				throw err;
			}
			console.log(`Server runing at: ${server.info.uri}`);
		});
});

