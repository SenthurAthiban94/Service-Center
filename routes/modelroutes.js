var galaxyMotorS = require('../models/galaxyMotorsDB');
 
module.exports = {
  configure: function(app) {
  ////////////////////////////// ROLES ////////////////////////////////  
    app.post('/admin/roles', function(req, res) {
      galaxyMotorS.createroles(req.body, res);
    });
    app.get('/admin/roles', function(req, res) {
      galaxyMotorS.getroles(req.query.Role_Id,res);
    });
    app.put('/admin/roles', function(req, res) {
      galaxyMotorS.editroles(req.body, res);
    });
    app.delete('/admin/roles', function(req, res) {
      galaxyMotorS.deleteroles(req.query.Role_Id, res);
    });
  ///////////////////////////// ADMIN USERS ////////////////////////////
    app.post('/admin/AdminUsers', function(req, res) {
      galaxyMotorS.addnewAdmin(req.body, res);
    });
    app.get('/admin/AdminUsers', function(req, res) {
      galaxyMotorS.getAdminUsers(req.query.Admin_Id,res);
    });
    app.put('/admin/AdminUsers', function(req, res) {
      galaxyMotorS.editadminUsers(req.body, res);
    });
    app.delete('/admin/AdminUsers', function(req, res) {
      galaxyMotorS.deleteadminUser(req.query.Admin_Id, res);
    });

/////////////////////////////////////////////////////////////////////////////
    app.post('/admin/login', function(req, res) {
      galaxyMotorS.login(req.body, res);
    });
    
    app.get('/contacts/', function(req, res) {
      galaxyMotorS.getcontactDetails(res);
    });
 
    app.post('/contacts/', function(req, res) {
      galaxyMotorS.createnewContact(req.body, res);
    });
 
    app.put('/contacts/', function(req, res) {
      galaxyMotorS.updateoldContact(req.body, res);
    });
 
    app.delete('/contacts/:contact_id/', function(req, res) {
      galaxyMotorS.deleteContact(req.params.contact_id, res);
    });
  }
};