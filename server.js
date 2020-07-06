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
          var iceCream = myIces.filter(function (e) {
               console.log(req.params.name);
               return e.name === req.params.name;
               
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
          
     
     app.put('/users/:name',function(req,res){

          
          
          const found = myIces.find(e => e.name === req.params.name);
          console.log(found);
          const index = myIces.indexOf(found);
          const body = req.body;
 
          if (!found) {
               res.json({
                    success: true,
                    message: 'Icecream not found!'
                })
           }   else {
                    const updatedIcecream = { ...found, ...body };
                    myIces[index] = updatedIcecream;
                res.json({
                    success: false,
                    message: 'Your icecream has been updated!'
                })
           }
           });
     
           app.delete('/users/:name',function(req,res){
               const iceCream = myIces.find(e => e.name === req.params.name);
               const delIndex = myIces.indexOf(iceCream);
                    
               if(!iceCream) {
                    res.json({
                         success: true,
                         message: 'This icecream is not in stock!'

                    })
               } else {
                    myIces.splice(delIndex, 1);
                
                    res.json({
                    success: false,
                    message: 'This icecream has been deleted!'
                    
               })
          }
     });
     
     



 
app.listen(8007,function(){
    console.log("server is running")
    })

