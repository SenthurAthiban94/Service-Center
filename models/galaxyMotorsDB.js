var connection=require("../connection");

function AdminAccess() {
        
////////////////////////////////////////////// ADMIN USERS ////////////////////////////////////////////////////////////////////////       
        this.getAdminUsers=function(Admin_Id,res){
            connection.acquire(function(err, con) {
                if(Admin_Id){
                    query="select * from gm_users where Admin_Id="+Admin_Id;
                    failure_msg='Failed to Retrive User!!! Admin with Id '+Admin_Id+' does not Exists!!';
                }else{
                    query="select * from gm_users";
                    failure_msg='Failed to Retrive Users!!! No Users Exists!!';
                }
                con.query(query, function(err, result) {
                    if(err || !result.length)
                    {
                        res.send({status: 1, message: failure_msg,error_info : err});    
                    }
                    else
                    {
                        res.send({status: 0,Users: result}); 
                    }
                    con.release();
                });   
            });            
        }
        this.addnewAdmin=function(adminUser,res){
            connection.acquire(function(err, con) {
                con.query('select * from gm_users where Admin_Username = ? OR Admin_Email = ?',[adminUser.Admin_Username,adminUser.Admin_Email], function(err, result) {
                    if(err || result.length)
                    {
                        res.send({status: 1,message: 'Failed to Add User!!! User '+result[0]['Admin_Username']+' already Exists with mail ID '+result[0]['Admin_Email']+'!!',error_info : err});    
                    }
                    else
                    {
                        con.query('insert into gm_users set ?', [adminUser], function(err, result) {
                            if (err) {
                                res.send({status: 1, message: 'Failed to Add Role '+adminUser.Admin_Username+'!!!', error_info : err});
                            } else {
                                res.send({status: 0, message: 'User '+adminUser.Admin_Username+' Created Successfully!!!'});
                            }
                        }); 
                    }
                    con.release();
                });   
            });            
        }
        this.editadminUsers=function(Admin_User,res){
            connection.acquire(function(err, con) {
                con.query('select * from gm_users where Admin_Id = ?',[Admin_User.Admin_Id], function(err, result) {
                    if(err || !result.length)
                    {
                        res.send({status: 1, message: 'Failed to Edit User!!! User with Id '+Admin_User.Admin_Id+' does not Exists!!',error_info : err});    
                    }
                    else
                    {
                        con.query('update gm_users set ? where Admin_Id = ?', [Admin_User,Admin_User.Admin_Id], function(err, result) {
                            if (err) {
                                res.send({status: 1, message: 'Failed to Edit Role with Id '+Admin_User.Admin_Id+'!!!', error_info : err});
                            } else {
                                res.send({status: 0, message: 'User '+Admin_User.Admin_Id+' Edited Successfully!!!'});
                            }
                        }); 
                    }
                    con.release();
                });   
            });            
        }

        this.deleteadminUser=function(Admin_Id,res){
            connection.acquire(function(err, con) {
                if(Admin_Id){
                    query="select * from gm_users where Admin_Id="+Admin_Id;
                    failure_msg='Failed to delete User with Id '+Admin_Id+' ,User does not Exists!!';
                    innerquery="delete from gm_users where Admin_Id="+Admin_Id;
                    innerFailure_msg="Failed to delete User with Id "+Admin_Id+"!!!";
                    innerSuccess_msg="User with Id "+Admin_Id+" is deleted Successfully!!!";
                }else{
                    query="select * from gm_users";
                    failure_msg='No Users Exists to delete!!';
                    innerquery="TRUNCATE TABLE gm_users";
                    innerFailure_msg="Failed to delete Users!!!";
                    innerSuccess_msg="All Users are deleted Successfully!!!";
                }
                con.query(query, function(err, result) {
                    if(err || !result.length)
                    {
                        res.send({status: 1, message: failure_msg,error_info : err});    
                    }
                    else
                    {
                        con.query(innerquery, function(err, result) {
                            if (err) {
                            res.send({status: 1, message: innerFailure_msg});
                            } else {
                            res.send({status: 0, message: innerSuccess_msg});
                            }
                        });
                    }
                    con.release();
                });   
            });            
        }
         
 ////////////////////////////////////////////// ADMIN USERS-End ////////////////////////////////////////////////////////////////////////

 ////////////////////////////////////////////// ROLES ////////////////////////////////////////////////////////////////////////       
        this.getroles=function(role_Id,res){
            connection.acquire(function(err, con) {
                if(role_Id){
                    query="select * from gm_user_roles where Role_Id="+role_Id;
                    failure_msg='Failed to Retrive Role!!! Role with Id '+role_Id+' does not Exists!!';
                }else{
                    query="select * from gm_user_roles";
                    failure_msg='Failed to Retrive Roles!!! No Roles Exists!!';
                }
                con.query(query, function(err, result) {
                    if(err || !result.length)
                    {
                        res.send({status: 1, message: failure_msg,error_info : err});    
                    }
                    else
                    {
                        res.send({status: 0,roles: result}); 
                    }
                    con.release();
                });   
            });            
        }
        this.createroles=function(roles,res){
            connection.acquire(function(err, con) {
                con.query('select * from gm_user_roles where Role_Name = ?',[roles.Role_Name], function(err, result) {
                    if(err || result.length)
                    {
                        res.send({status: 1, message: 'Failed to Add Roles!!! Role '+roles.Role_Name+' already Exists!!',error_info : err});    
                    }
                    else
                    {
                        con.query('insert into gm_user_roles set ?', [roles], function(err, result) {
                            if (err) {
                                res.send({status: 1, message: 'Failed to Add Role '+roles.Role_Name+'!!!', error_info : err});
                            } else {
                                res.send({status: 0, message: roles.Role_Name+' Created Successfully!!!'});
                            }
                        }); 
                    }
                    con.release();
                });   
            });            
        }
        this.editroles=function(roles,res){
            connection.acquire(function(err, con) {
                con.query('select * from gm_user_roles where Role_Id = ?',[roles.Role_Id], function(err, result) {
                    if(err || !result.length)
                    {
                        res.send({status: 1, message: 'Failed to Edit Role!!! Role with Id '+roles.Role_Id+' does not Exists!!',error_info : err});    
                    }
                    else
                    {
                        con.query('update gm_user_roles set ? where Role_Id = ?', [roles,roles.Role_Id], function(err, result) {
                            if (err) {
                                res.send({status: 1, message: 'Failed to Edit Role with Id '+roles.Role_Id+'!!!', error_info : err});
                            } else {
                                res.send({status: 0, message: roles.Role_Id+' Edited Successfully!!!'});
                            }
                        }); 
                    }
                    con.release();
                });   
            });            
        }

        this.deleteroles=function(role_Id,res){
            connection.acquire(function(err, con) {
                if(role_Id){
                    query="select * from gm_user_roles where Role_Id="+role_Id;
                    failure_msg='Failed to delete Role with Id '+role_Id+' ,Role does not Exists!!';
                    innerquery="delete from gm_user_roles where Role_Id="+role_Id;
                    innerFailure_msg="Failed to delete Role with Id "+role_Id+"!!!";
                    innerSuccess_msg="Role with Id "+role_Id+" is deleted Successfully!!!";
                }else{
                    query="select * from gm_user_roles";
                    failure_msg='No Roles Exists to delete!!';
                    innerquery="TRUNCATE TABLE gm_user_roles";
                    innerFailure_msg="Failed to delete Roles!!!";
                    innerSuccess_msg="All Roles are deleted Successfully!!!";
                }
                con.query(query, function(err, result) {
                    if(err || !result.length)
                    {
                        res.send({status: 1, message: failure_msg,error_info : err});    
                    }
                    else
                    {
                        con.query(innerquery, function(err, result) {
                            if (err) {
                            res.send({status: 1, message: innerFailure_msg});
                            } else {
                            res.send({status: 0, message: innerSuccess_msg});
                            }
                        });
                    }
                    con.release();
                });   
            });            
        }
         
 ////////////////////////////////////////////// ROLES-End ////////////////////////////////////////////////////////////////////////       

        //  this.login=function(loginUser,res){
        //     connection.acquire(function(err, con) {
        //         con.query('select * from usersLogin where Contact_Name=? AND Contact_Mobile_No = ?',[loginUser.User_Name,loginUser.User_Password], function(err, result) {
        //             con.release();
        //             if(err || !result.length)
        //             {
        //                 res.send({status: 1, message: 'Failed to Login in to the Admin Panel. Username or Password Doesn\'t exist!!!',error_info : err});    
        //             }
        //             else
        //             {
        //                 res.send({status: 0, message: 'Welcome '+loginUser.User_Name+' !!!'});
        //             }
        //         });   
        //     });
        //  }
         
         this.getcontactDetails = function(res) {
            connection.acquire(function(err, con) {
            con.query('select * from contact_details', function(err, result) {
                con.release();
                if(err)
                {
                    res.send({status: 1, message: 'Failed to Retrive Contacts!!!',error_info : err});    
                }
                else
                {
                    if(result.length)
                    {
                        res.send(result);
                    }
                    else
                    {
                        res.send({status: 0, message: 'Contacts are Empty!!!'});    
                    }
                }
            });
            });
        };
        //Create Contact
        this.createnewContact = function(contact, res) {
            connection.acquire(function(err, con) {
                con.query('select * from contact_details where Contact_Name=? AND Contact_Mobile_No = ?',[contact.Contact_Name,contact.Contact_Mobile_No], function(err, result) {
                    con.release();
                    if(err)
                    {
                        res.send({status: 1, message: 'Failed to Store Contacts!!!',error_info : err});    
                    }
                    else
                    {
                        if(result.length)
                        {
                            res.send({status: 0, message: 'Contact Already Exist!!!'});
                        }
                        else
                        {
                            connection.acquire(function(err, con) {
                                con.query('insert into contact_details set ?', [contact], function(err, result) {
                                    con.release();
                                    if (err) {
                                    res.send({status: 1, message: 'Failed to Store Contacts!!!', error_info : err});
                                    } else {
                                    res.send({status: 0, message: 'Contact Created Successfully'});
                                    }
                                }); 
                            });
                        }
                    }
                });   
            });
        };

        // Update Contact from database
        this.updateoldContact = function(contact, res) {
            connection.acquire(function(err, con) {
                con.query('select * from contact_details where Contact_Id= ?',contact.Contact_Id, function(err, result) {
                    con.release();
                    if(err)
                    {
                        res.send({status: 1, message: 'Failed to Update Contacts!!!',error_info : err});    
                    }
                    else
                    {
                        if(result.length)
                        {
                            connection.acquire(function(err, con) {
                                con.query('update contact_details set ? where Contact_Id = ?', [contact, contact.Contact_Id], function(err, result) {
                                    con.release();
                                    if (err) {
                                    res.send({status: 1, message: 'Failed to Update Contacts!!!',error_info : err});
                                    } else {
                                    res.send({status: 0, message: 'Contact Updated Successfully'});
                                    }
                                });
                            });
                        }
                        else
                        {
                            res.send({status: 0, message: 'Contact Does Not Exist!!!'});
                        }
                    }
                });   
            });
        };


        // Delete Contact from database
        this.deleteContact = function(contact_id, res) {
            connection.acquire(function(err, con) {
                con.query('select * from contact_details where Contact_Id= ?',contact_id, function(err, result) {
                    con.release();
                    if(err)
                    {
                        res.send({status: 1, message: 'Failed to Update Contacts!!!',error_info : err});    
                    }
                    else
                    {
                        if(result.length)
                        {
                            connection.acquire(function(err, con) {
                                con.query('delete from contact_details where Contact_Id = ?', contact_id, function(err, result) {
                                    con.release();
                                    if (err) {
                                    res.send({status: 1, message: 'Failed to Delete Contact!!!'});
                                    } else {
                                    res.send({status: 0, message: 'Contact Deleted Successfully'});
                                    }
                                });
                            });
                        }
                        else
                        {
                            res.send({status: 0, message: 'Contact Already Deleted or Does Not Exist!!!'});
                        }
                    }
                });   
            });
        };
}
module.exports = new AdminAccess();    
  