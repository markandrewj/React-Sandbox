'use strict';

var express = require('express');
/**
 * If using mongo stored sessions
 *
 * mongoStore = require('connect-mongo')(express),
 * flash = require('connect-flash'),
 */


module.exports = function(app){
	app.set('showStackError', true);
	/**
	 * gzip compresses all js/css/html files
	 *
	 * app.use(express.compress());
	 */

	if (process.env.NODE_ENV !== 'test'){
		app.use(express.logger('dev'));
	}

	/**
	 * Set views here if app has a front-facing end
	 *
	 * app.set('views', app.get('root') + '/root/path/to/views');
	 * app.set('view engine', 'jade');
	 */

	app.enable('jsonp callback');
	app.configure(function(){
		/**
		 * If using sessions, cookieParser shoudl be above session
		 *
		 * app.use(express.cookieParser());
		 */

			// Body parsing middleware should be above methodOverride
		app.use(express.urlencoded());
		app.use(express.json());
		// --
		app.use(express.methodOverride());

		/**
		 * If using sessions, specifically mongo stored sessions
		 *
		 * app.use(express.session({
		 *	secret: 'MONGOSECRET',
		 *	store: new mongoStore({
		 *		db: db.connection.db,
		 *		collection: 'sessions'
		 *	})
		 * }));
		 *
		 * app.use(flash());
		 */

		app.use(app.router);

		app.use(express.favicon());
		app.use(express.static(app.get('root') + '/public'));


		app.use(function(err, req, res, next){
			var mongoErrors = ['MongoError', 'ValidationError', 'CastError'];
			if(mongoErrors.indexOf(err.name) >= 0){
				res.send(403, err.err);
			} else next(err);
		});

		app.use(function(err, req, res, next){
			//This was an error
			if (process.env.NODE_ENV !== 'test') console.log(err.stack);

			res.writeHead(err.code, err.message);
			res.end(err.message);
		});


	});

};