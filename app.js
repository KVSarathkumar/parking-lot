let express=require("express");
let bodyparser=require("body-parser");
let app=express();


let cookieparser=require("cookie-parser");
let auth=require("./controllers/auth");
let mongoose=require("mongoose");
let jwt=require('jsonwebtoken');
let secret='djnk68kn8h';
mongoose.connect('mongodb://localhost:27017/parking-lot', {
	useNewUrlParser: true,
	useUnifiedTopology:true
});



const usersRouter=require("./routes/users")
const {cur}=usersRouter.cur;





app.use(express.static('public'));
app.use(express.json());
app.use('/users',usersRouter.router);
app.use(bodyparser.urlencoded({extended:false})) ;
app.use(bodyparser.json()) ;
app.use(cookieparser()); 
app.set("view engine",'ejs');
let db=mongoose.connection;
db.on("error",console.error.bind(console,"connection error:"));
db.once("open",()=>{
	console.log("database connected");
})
let vehicle=require("./modules/user").vehicle;
let user=require("./modules/user").user;

/*let user1=new user({
	id:1,
	name:"Vaibhavi",
	mobnum:"123456789",
	emailid:"kotavaibhu.2000@gmail.com"
})
user1.save();*/
/*user.remove({},function(err)
		   {
	if(err){console.log("oops");}
});*/
// user.find({}, function (err,Allusers){if(err){console.log("oops");}
// else {
// console.log(Allusers);
// }
// });
let slot=require("./modules/slot").slot;

/*slot.find({}, function (err,Allslots){if(err){console.log("oops");}
else {
console.log(Allslots);
}});*/

app.get('/',(req,res)=>
	   {
	res.render("home");
})
app.get('/home',(req,res)=>
	   {
	res.render("home");
})
app.get('/login',(req,res)=>
	   {
	let token=req.cookies['auth_token'];
	
	if(token && auth.checktoken(token)){
		res.render("vehicles");
		
	}
	else{
		res.render("login");
	}
})
app.get('/parkinglot',(req,res)=>
	   {
	res.render("parkinglot");
})

app.get('/vehicles',(req,res)=>{
	let token=req.cookies['auth_token'];
	if(token && auth.checktoken(token)){
		
		/*jwt.verify(token,secret,function(err, decoded) {
  var userId = decoded._id  
		console.log(userId)
};  */
		
		res.render("vehicles",{cur:cur[0]});
		console.log(cur[0]);
		
	}
	else{
		res.redirect("/login");
	}
	
})
app.get('/addvehicle',(req,res)=>{
	res.render("addvehicle");
	
})

app.post('/addvehicle',async(req,res)=>{
		let vehiclenumber=req.body.vehicleno;
		let vehicletype=req.body.vehicletype;
		let newvehicle=new vehicle({
			vehiclenum:vehiclenumber,
			type:vehicletype
			
		})
		console.log("success");
	await newvehicle.save();
	
})
/*vehicle.find({},function(err,allvehicles){if(err){console.log("oops");}
else {
console.log(allvehicles);
}});
user.find({},function(err,allusers){if(err){console.log("oops");}
else {
console.log(allusers);
}});*/

app.listen('3000',()=>{
	console.log("listening to port 3000")
})

