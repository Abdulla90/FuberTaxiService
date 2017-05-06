var express = require('express');
var app = express();
var request = require('superagent');
var cabCordinates = {};
var customerDetail = {};
var customerCordinates = {};
var cabDetails = {};
var getaddressData=function(data,cb){ //Fetching Coordinates from Google API
		request
  			.get('https://maps.googleapis.com/maps/api/geocode/json?address='+data.address+'&key=AIzaSyDwuTMrDnXpV4i4xtWiIG9Jq9953uhCvdU')
  			.end(function(err,res){
    		// Do something
    			if(err){
    				console.log(err,"err")
    				cb(err)
    			}	 
    				cb(null,res.body)
    				//cabCordinates = res.body.results[0].geometry.location;
    				//console.log(cabCordinates);
  				});
		}


app.get('/cabDetails/:cabNumber/:driverNumber/:address34/:cabcolor/:isFree',function(req,res){
var data = req.params;
	cabDetails = {
		cabNumber : data.cabNumber,
		driverNumber : data.driverNumber,
		address : data.address34,
		cabcolor : data.cabcolor,
		isFree : data.isFree 
	}
	getaddressData(cabDetails.address,function(err,data){
			if(err){
				console.log(err)
				res.end('err'+err)
			}
	cabCordinates = data.results[0].geometry.location;
	//console.log(cabCordinates);
	cabDetails.coordinates = cabCordinates;

	console.log(cabDetails);

	});
});

/*app.get('/cabRegister/:address',function(req,res){
	var data = req.params;
	console.log(data.address);
	
		getaddressData(data ,function(err,data){
			if(err){
			console.log(err)
			res.end('err'+err)
		}
		//console.log(data.results[0].geometry.location)
    	cabCordinates = data.results[0].geometry.location;
		console.log(cabCordinates , "cabCordinates");
		//res.send(movies)
		});
	});*/

	app.get('/customerRegister/:name/:number/:address12/:color',function(req,res){
		var data = req.params;
		customerDetail = {
			name : data.name,
			number : data.number,
			address : data.address12,
			color : data.color
		}
		console.log(customerDetail);

		getaddressData(customerDetail.address,function(err,data){
			if(err){
				console.log(err)
				res.end('err'+err)
			}
			customerCordinates = data.results[0].geometry.location;
			console.log(customerCordinates,"customerCordinates");

		})

	})


app.listen(3000, '0.0.0.0', function () {
  console.log('Example app listening on port 3000!')
})



//googlemapAPI = AIzaSyDwuTMrDnXpV4i4xtWiIG9Jq9953uhCvdU