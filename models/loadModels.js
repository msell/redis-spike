var User = require('./User.js'),
    Pet = require('./Pet.js');


module.exports = function(orm){
    orm.loadCollection(User);
    orm.loadCollection(Pet);
}