//CONTROLLER

var mongoose = require('mongoose');
var User = mongoose.model("User");
var City = mongoose.model("City");

module.exports = {
    login: function(req,res){
        // console.log("hi from controller")
        User.findOne({name: req.body.name}, function(err, userFound){
            if(userFound == null){
                User.create({name: req.body.name}, function(err, userCreated){
                    req.session.user = userCreated //storing user in session
                    res.json('success')
                })
            } else{
                req.session.user = userFound;
                res.json('success')
            }
        })
    },

    addCity: function(req, res){
        // console.log("controller addcity")
        //find the city
        //check if city exists
        //if city exists, redirect
        //else add city
        City.findOne({name: req.body.name}, function(err, cityFound){
            if(cityFound == null){
                City.create({name: req.body.name, _user: req.session.user}, function(err, cityCreated){
                    res.json(cityCreated)
                })
            } else {
                res.redirect('/travel')
            }
        })
        
    },

    findAll: function(req, res){
        City.find({}).populate('_user').exec(function(err, citiesFound){
            res.json(citiesFound)
        }) 
    },

    delete: function(req, res){
        City.findOneAndRemove({_id: req.params.id}, function(err){
            res.json('deleted')
        })
    },

    join: function(req, res){
        console.log("still trying to join")
        City.findOne({_id: req.params.id}, function(err, cityFound){
            console.log("here is city found", cityFound._joiners)
            // console.log("current user", req.session.user)
            cityFound._joiners.push(req.session.user)
            console.log("updated city", cityFound._joiners)
            res.json('joined')
        })
    },
    
    logout: function(req, res){
        req.session.destroy();
        res.redirect('/')
    },

    checkSession: function(req, res){
        if(req.session.user){
            return res.json(req.session.user)
        } else{
            res.json(null)
        }
    },

    display: function(req,res){
        // res.json("new city display page")
        res.redirect("/city")
    }, //doesnt work

    // cityInfo: function(req,res){
    //     City.findOne({_id: req.params.id}).populate(_joiners).exec(function(err, citiesFound){
    //         res.json(cityFound)
    //     })
    // }

    cityInfo: function(req,res){
        City.findOne({_id: req.params.id}, function(err, cityFound){
            res.json(cityFound)
        })
    }
}