const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.json())

const myIces = [
     {name: 'strawberry', supplier: 'Mr Moos', vegan: 'Y'},
	{name: 'vanilla', supplier: 'Devon Ices',vegan:'Y'},
	{name: 'chocolate', supplier: 'Devon Ices',vegan:'N'},
	{name: 'Raspberry', supplier: 'Mr Moos', vegan:'Y'}
];
        
     app.get('/users', function(req,res){
          res.json({
               success: true,
               message: 'Here is all our icecream data!',
               users: myIces
          })
     })
    
     app.get('/users/:name',function(req,res){
          var whatever = req.params.name;
          var iceCream = myIces.filter(function (e) {
               console.log(whatever);
               return e.name === whatever;
               
             });
               res.json({
               success: true,
               message: 'Here is your preferred icecream!',
               user: iceCream
          })
     })

     app.post('/login',function(req,res){

          const found = myIces.find(e => e.name === req.body.name);
          console.log(found);

          if ('name' in req.body && 'supplier' in req.body && 'vegan' in req.body && !found ) {
          console.log(req.body);
          myIces.push(req.body);
          res.json({
               success: true,
               message: 'Delivered, thanks!'
          })
     }    else {
		res.json({
			success: false,
			message: !found ? 'Data missing. Please try again ' : 'Icecream already exists!'
		})
	}
     });
          

 
app.listen(8007,function(){
    console.log("server is running")
    })

