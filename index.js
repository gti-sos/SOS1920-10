const express = require("express");
const bodyParser = require("body-parser");

var app = express();

var port = process.env.PORT || 80;

app.use("/", express.static("./public"));

app.use(bodyParser.json());

const BASE_API_URL = "/api/v1";

/*====================================================*/
/*========= API_ANTONIO_JOSE_JIMENEZ_SEGOVIA =========*/
/*====================================================*/
var globalSuicides = [
	{
		country: "Croatia",
		lengthCoord: 15.977979,
		latitudeCoord: 45.8144417,
		year: 2003,
		men: 31.4,
		women: 8.4,
		average: 19.5
	},
	{
		country: "Serbia",
		lengthCoord: 20.4651299,
		latitudeCoord: 44.8040085,
		year: 2002,
		men: 28.8,
		women: 10.4,
		average: 19.3
	}	,
	{
		country: "Belgium",
		lengthCoord: 4.3487802,
		latitudeCoord: 50.8504486,
		year: 2009,
		men: 28.7,
		women: 10.9,
		average: 18.9
	}	,
	{
		country: "South Korea",
		lengthCoord: 126.9784012,
		latitudeCoord: 37.5660019,
		year: 2012,
		men: 38.2,
		women: 18.0,
		average: 28.1
	}	,
	{
		country: "Latvia",
		lengthCoord: 24.1058903,
		latitudeCoord: 56.9459991,
		year: 2004,
		men: 42.9,
		women: 8.5,
		average: 24.3
	}	
];

// 5-b
//GET globalSuicides  /api/v1/global-suicides/loadInitialData FUNCIONA
app.get(BASE_API_URL+"/global-suicides/loadInitialData",(req, res) => {
	globalSuicides = [
	{
		country: "Croatia",
		lengthCoord: 15.977979,
		latitudeCoord: 45.8144417,
		year: 2003,
		men: 31.4,
		women: 8.4,
		average: 19.5
	},
	{
		country: "Serbia",
		lengthCoord: 20.4651299,
		latitudeCoord: 44.8040085,
		year: 2002,
		men: 28.8,
		women: 10.4,
		average: 19.3
	}	,
	{
		country: "Belgium",
		lengthCoord: 4.3487802,
		latitudeCoord: 50.8504486,
		year: 2009,
		men: 28.7,
		women: 10.9,
		average: 18.9
	}	,
	{
		country: "South Korea",
		lengthCoord: 126.9784012,
		latitudeCoord: 37.5660019,
		year: 2012,
		men: 38.2,
		women: 18.0,
		average: 28.1
	}	,
	{
		country: "Latvia",
		lengthCoord: 24.1058903,
		latitudeCoord: 56.9459991,
		year: 2004,
		men: 42.9,
		women: 8.5,
		average: 24.3
	}	
];
	res.sendStatus(200,"OK");
});

// 6-a
//GET globalSuicides  /api/v1/global-suicides FUNCIONA
app.get(BASE_API_URL+"/global-suicides",(req, res) => {
	res.send(JSON.stringify(globalSuicides,null,2));
	res.sendStatus(200,"OK");
});


//6-b
//POST globalSuicides crea un nuevo recurso FUNCIONA
app.post(BASE_API_URL+"/global-suicides",(req,res) =>{
	
	var newGlobalSuicides = req.body;
	
	if((newGlobalSuicides == "") || (newGlobalSuicides == null)){
		res.sendStatus(400,"BAD REQUEST(Resource empty or null)");
	} else {
		globalSuicides.push(newGlobalSuicides); 	
		res.sendStatus(201,"CREATED");
	}
});


//6-c
//GET globalSuicides  /api/v1/global-suicides/xxx devuelve ese recurso FUNCIONA
app.get(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	//console.log("ENTRA.");
	var country = req.params.country;
	
	var countryFilter = globalSuicides.filter((c) => {
		return (c.country == country);
	});
	
	if(countryFilter.length >= 1){
		res.send(countryFilter[0]);
		res.sendStatus(200,"OK");
		//console.log("LO HA ENCONTRADO");
	}else{
		res.sendStatus(404,"COUNTRY NOT FOUND");
		//console.log("NO HAY");
	}
});

//6-d
//DELETE globalSuicides  /api/v1/global-suicides/xxx borra ese recurso //FUNCIONA
app.delete(BASE_API_URL+"/global-suicides/:country", (req,res)=>{
	
	var country = req.params.country;
	
	var countryFilter = globalSuicides.filter((c) => {
		return (c.country != country);
	});
	
	if(countryFilter.length < globalSuicides.length){
		globalSuicides = countryFilter;
		res.sendStatus(200, "OK(Country deleted)");
	}else{
		res.sendStatus(404,"NOT FOUND(Country)");
	}	
});

//6-e
//PUT globalSuicides  /api/v1/global-suicides/xxx actualiza ese recurso
app.put(BASE_API_URL+"/global-suicides/:country", (req,res) =>{
	
	var params = req.params;
	var country = params.country;	
	var year = params.year;
	var lengthCoord = params.lengthCoord;
	var latitudeCoord = params.latitudeCoord;
	var men = params.men;
	var women = params.women;
	var avg = params.average;
	
	var body = req.body;
	
	if(country!=body.country){
        res.sendStatus(400,"BAD REQUEST(Wrong Country)");
    }else{
        var countryFilter = globalSuicides.filter((c) => {
        return (c.country != country || c.year != year);
        });      
        public_budget_stats = countryFilter;
        public_budget_stats.push(data);
        res.status(200).send("DATA UPDATED");
    }	
	
});


//6-f
//POST globalSuicides  /api/v1/global-suicides/xxx debe dar un error de método no permitido. //FUNCIONA
app.post(BASE_API_URL + "/global-suicides/:country", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Post/:country)");
});


//6-g
//PUT globalSuicides  /api/v1/global-suicides debe dar un error de método no permitido. //FUNCIONA
app.put(BASE_API_URL + "/global-suicides", (req, res) => {
	
    res.sendStatus(405, "NOT ALLOWED(Put)");
});

//6-h
//DELETE globalSuicides  /api/v1/global-suicides borra todos los recursos //FUNCIONA
app.delete(BASE_API_URL + "/global-suicides", (req,res)=>{
	
	globalSuicides = [];
	
	res.sendStatus(200,"OK(Deleted)");
});

/*====================================================*/
/*========= API_Jesús Vázquez Rivadeneyra =========*/
/*====================================================*/

var global_marriages = [
		{"country": "Italy","year": 2018,"marriages": "195,778","avg_wm": 32.4,"avg_m": 35.2},
		{"country": "Belgium", "year": 2017,   "marriages": "44,329",   "avg_wm": 31.2,   "avg_m": 33.5 },
 		{   "country": "México",   "year": 2011,   "marriages": "570,954",  "avg_wm": 26.3,   "avg_m": 29.2 },
 		{   "country": "Portugal",   "year": 2016,   "marriages": "32,399",   "avg_wm": 30.4,   "avg_m": 32.2 },
 		{   "country": "Suiza",   "year": 2018,   "marriages": "40,716",   "avg_wm": 30.5,   "avg_m": 32.9 }
	];


//var copyGlobal_Marriages = global_marriages;

//const BASE_API_URL="/api/v1";   // ESta es la URL base



//LOADINITIALDATA

app.get(BASE_API_URL + "/global_marriages/loadInitialData", (req, res) => {
	var global_marriages = [
		{"country": "Italy","year": 2018,"marriages": "195,778","avg_wm": 32.4,"avg_m": 35.2},
		{"country": "Belgium", "year": 2017,   "marriages": "44,329",   "avg_wm": 31.2,   "avg_m": 33.5 },
 		{   "country": "México",   "year": 2011,   "marriages": "570,954",  "avg_wm": 26.3,   "avg_m": 29.2 },
 		{   "country": "Portugal",   "year": 2016,   "marriages": "32,399",   "avg_wm": 30.4,   "avg_m": 32.2 },
 		{   "country": "Suiza",   "year": 2018,   "marriages": "40,716",   "avg_wm": 30.5,   "avg_m": 32.9 }
	];
	res.send(JSON.stringify(global_marriages,null,2));
	//res.sendStatus(200);
});










// FUNCION DEL GET   /marriages/
app.get(BASE_API_URL+"/global_marriages",(req,res) =>{         //Funcion para cuando nos piden un get. Devuelve todos los contactos 
	res.send(JSON.stringify(global_marriages,null,2))
});

// FUNCION DEL GET /marriages/XXXXX

app.get (BASE_API_URL+"/global_marriages/:country/:year", (req, res) =>{
	var country = req.params.country;
	var year = req.params.year;
	
	var filteredCountriesAndYear = global_marriages.filter( (c)=> {
		return (c.country == country && c.year == year );
	});
	
	if(filteredCountriesAndYear.length >=1){
		res.send(filteredCountriesAndYear[0]);
		//res.sendStatus(200,"OK");

	}else{
		res.sendStatus(404, "COUNTRY NOT FOUND")
	}
		
	
});  











// FUNCION DEL POST /marriages
app.post(BASE_API_URL+"/global_marriages",(req,res) =>{  // Coge el cuerpo de la peticion y los añade al array 
	var newMarriage = req.body;
	
	if((newMarriage == "") || (newMarriage.country == null || newMarriage.year ==null)){
		res.sendStatus(400,"BAD REQUEST");
	} else {
		global_marriages.push(newMarriage); 	
		res.sendStatus(201,"CREATED");
	}
});


//POST incorrecto
app.post(BASE_API_URL + "/global_marriages/:country/:year", (req, res) => {
    res.sendStatus(405, "Forbidden POST");
});











// FUNCION DEL PUT /marriages/XXXX

app.put(BASE_API_URL+"/global_marriages/:country/:year", (req, res) =>{
	
	var country = req.params.country;
	var year = req.params.year;
    var updateMarriages = req.body;
	
	filteredMarriages = global_marriages.filter((c) => {
		return (c.country == country && c.year ==year);
	});

	if(filteredMarriages.length == 0){
		res.sendStatus(404);
		return;
	}
	
	if(!updateMarriages.country || !updateMarriages.year ||!updateMarriages.marriages || !updateMarriages.avg_wm
	   || !updateMarriages.avg_m || updateMarriages.country != country){
                res.sendStatus(400);
		return;
	}
	
	global_marriages = global_marriages.map((c) => {
		if(c.country == updateMarriages.country){
			return updateMarriages;
		}else{
			return c;
		}
		
	});
	res.sendStatus(200);
});


//PUT incorrecto
app.put(BASE_API_URL + "/global_marriages/", (req, res) => {
    res.sendStatus(405, "Forbidden PUT");
});












// FUNCION DEL DELETE /marriages/

app.delete (BASE_API_URL+"/global_marriages", (req, res) =>{
	global_marriages=[]
//	return global_marriages;
	res.sendStatus(200)
	
});  


// FUNCION DEL DELETE /marriages/XXXX

app.delete (BASE_API_URL+"/global_marriages/:country/:year", (req, res) =>{
	var country = req.params.country;
	var year = req.params.year;

	var filteredCountriesAndYear = global_marriages.filter( (c)=> {
		return (c.country != country || c.year !=year);
	});
	
	if(filteredCountriesAndYear.length < global_marriages.length){
		global_marriages=filteredCountriesAndYear;
		res.sendStatus(200)
	}else{
		res.sendStatus(404, "COUNTRY NOT FOUND")
	}
		
	
});  











/*====================================================*/
/*========= Juan Manuel Cortés Alonso =========*/
/*====================================================*/



/*====================================================*/
/*================== WEB_SERVER_TIME ================*/
/*===================================================*/
app.get("/time", (request, response) => {
	response.send("<html>"+new Date()+"</html>");
});

app.listen(port, () => {
	console.log("Server ready.");
});

console.log("Loading Server...");
console.log(new Date());