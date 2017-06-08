// COMMMON SETTING
//define the CRUD interface
function dbcrud(){};
dbcrud.insert = function(){
    console.log('insert');
}

//exports dbcrud
module.exports = dbcrud;