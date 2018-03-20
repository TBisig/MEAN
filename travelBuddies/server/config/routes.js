var path = require('path');
var userController = require('./../controllers/user');

module.exports = function(app){
    app.post('/login', function(req, res){
        // console.log("hi from routes")
        userController.login(req, res)
    })

    app.post('/addCity', function(req,res){
        // console.log("here is the travel route")
        userController.addCity(req, res)
    })

    app.get('/findAll', function(req, res){
        userController.findAll(req, res)
    })


    app.delete('/delete/:id', function(req,res){
        console.log("delete")
        userController.delete(req, res)
    })

    app.get('/join/:id', function(req, res){
        // console.log('joining from routes')
        userController.join(req, res)
    })

    app.get('/logout', function(req, res){
        userController.logout(req, res)
    })

    app.get('/checkSession', function(req, res){
        userController.checkSession(req, res)
    })

    app.get('/city', function(req,res){
        userController.display(req,res)
    }) //doesnt work

    app.get("/get/:id", function(req,res){
        userController.cityInfo(req, res)
    })



    //all means if it gets to this route, 
    //send it back bc we dont have a route for it
    app.all("*", (req, res, next)=> {
        res.sendFile(path.resolve('./client/dist/index.html'))
    })
}