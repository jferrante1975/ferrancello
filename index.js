var express = require('express');
var app = express();



var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    transport: "SMTP",
    port: 25,
    host: 'mail.torji.com.ar',
    tls: {
        rejectUnauthorized:false
    },
    auth: {
        user: 'error@torji.com.ar',
        pass: '$LaMonaLisa$'
    }
}));

app.get('/check', function (req, res) {
	var latitud = req.query.latitud;
	var longitud = req.query.longitud;

	if(calcCrow(latitud,longitud,-34.635576,-58.434463) < 1.2){
		res.send({"distancia":"ok"});
	}else{
		res.send({"distancia":"error"});
	}
});

app.get('/gustos', function (req, res) {
	var gustos = [];
	gustos.push("Bananita Dolca");
	gustos.push("Pistacho");
	gustos.push("Granizado");
	gustos.push("Chocolate");
	gustos.push("Chocolate Ferrancello");
	gustos.push("Chocolate con Almendras");
	gustos.push("Chocolate al Rhum con Pasas");
	gustos.push("Chocolate con Dulce de Leche Casero");
	gustos.push("Chocolate Nevado");
	gustos.push("Chocolate Blanco");
	gustos.push("Dulce de Leche");
	gustos.push("Dulce de Leche Tentación");
	gustos.push("Dulce de Leche Granizado");
	gustos.push("Flan con Dulce de Leche Casero");
	gustos.push("Mascarpone con Frutos del Bosque");
	gustos.push("Crema Kinder");
	gustos.push("Sabayón");
	gustos.push("Sabayón Relleno");
	gustos.push("Tramontana");
	gustos.push("Kinotos al Whisky");
	gustos.push("Banana Split");
	gustos.push("Menta Granizada");
	gustos.push("Crema del Cielo");
	gustos.push("Crema Americana");
	gustos.push("Crema Oreo");
	gustos.push("Frutilla a la Crema");
	gustos.push("Mousse de Limón");
	gustos.push("Mousse de Café");
	gustos.push("Mousse de Chocolate");
	gustos.push("Vainilla");
	gustos.push("Coco");
	gustos.push("Banana");
	gustos.push("Maracuyá");
	gustos.push("Tiramisú");
	gustos.push("Ananá con Pedacitos");
	gustos.push("Durazno con Pedacitos");
	gustos.push("Frutos del Bosque");
	gustos.push("Limón");
	gustos.push("Melón");
	gustos.push("Mousse de Naranja");
	gustos.push("Frutilla");
	console.log("Pedido de gustos")
	res.send({"gustos":gustos});
});

app.get('/precios', function (req, res) {
	var precios = [];
	//si promocion es "0" no muestra nada en la aplicación
	var promocion = "Promo 2kg: $200.-";
	precios.push({"tipo":"CUARTO"	,"precio":35	,"sabores":3});
	precios.push({"tipo":"MEDIO"		,"precio":65	,"sabores":3});
	precios.push({"tipo":"KILO"				,"precio":115	,"sabores":4});

	console.log("Pedido de precios")

	res.send({"precios":precios,"promocion":promocion});
});

app.get('/promociones', function (req, res) {
	var promos = [];
	promos.push({"texto":"Gana un millon de dolares!"});
	res.send({"promos":promos});
});

app.get('/pedido', function (req, res) {
	console.log("Recepcion de pedido");
	var nombre = req.query.nombre;
	var observaciones = req.query.observaciones;
	var telefono = req.query.telefono;
	var direccion = req.query.direccion;
	var pedidos = req.query.pedidos;
	var fs = require('fs');

	if(nombre!=null && observaciones!=null && telefono!=null && direccion!=null && pedidos!=null && nombre!="" && telefono!="" && direccion!="" && pedidos!=""){
		var texto = nombre.replace("%20"," ") + ", " + telefono + ", " + direccion + ", " + pedidos + " " + observaciones + "\r\n";
		console.log(texto);
		fs.appendFile('message.txt', texto, encoding='utf8', function (err) {
		        if (err) throw err;
	        		console.log('It\'s saved! in same location.');
		});


var mailOptions = {
    from: 'TorjiMobile <noreply@torji.com>', // sender address
    to: 'francoferrante95@gmail.com,javierferrante@gmail.com', // list of receivers
    subject: 'Pedido',
    text: texto // Subject line
};

transporter.sendMail(mailOptions, function(error, info){



    if(error){
        return console.log(error);
    }
    console.log('Message sent: ' + info.response);

});


		res.send({"respuesta":"ok"});
	}else{
		res.send({"respuesta":"error"});
	}
});

var server = app.listen(3009, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
 function toRad(Value) {
        return Value * Math.PI / 180;
    }