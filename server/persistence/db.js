'use strict';

var models = require('./../models');

var db = {
	sync: syncTables
};

function syncTables(){
	models.user.sync(/*{ force: true }*/);
}

module.exports = db;