var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var mongoose = require('mongoose');
mongoose.connect('mongodb://adminDatabase:rgh67t7GFFTYFd4e5345dRDD5D@ds163679.mlab.com:63679/epdatabase');

var ESimg = {
	ES: '/img/ES.jpeg',
	PA: '/img/PA.jpeg'
}

var Employee = mongoose.model('Employee', mongoose.Schema({
	notaFiscal: String,
	conhecimentoFiscal: String,
	dataEmissao:String,
	previsaoEntrega:String,
	origem:String,
	destino:String,
	valorMercadoria:String,
	valorFrete: String,
	volume: String,
	peso: String,
	ocorrencia: String,
	status: String
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client'));

app.get('/api/employees', function(req, res){
	Employee.find(function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.get('/api/employees/:id', function(req, res, {ESimg}){
	Employee.findOne({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.post('/api/employees', function(req, res){
	Employee.create( req.body, function(err, employees){
		if(err)
			res.send(err);
		res.json(employees);
	});
});

app.delete('/api/employees/:id', function(req, res){
	Employee.findOneAndRemove({_id:req.params.id}, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});
app.put('/api/employees/:id', function(req, res){
	var query = {
		notaFiscal:req.body.notaFiscal,
		dataEmissao:req.body.dataEmissao,
		previsaoEntrega:req.body.previsaoEntrega,
		origem:req.body.origem,
		destino:req.body.destino,
		valorMercadoria:req.body.valorMercadoria,
		valorFrete:req.body.valorFrete,
		volume:req.body.volume,
		peso:req.body.peso,
		ocorrencia:req.body.ocorrencia,
		status:req.body.status		
	};
	Employee.findOneAndUpdate({_id:req.params.id}, query, function(err, employee){
		if(err)
			res.send(err);
		res.json(employee);
	});
});

app.set('port', (process.env.PORT || 8000));

app.listen(app.get('port'), function(){
	console.log('Server started on port '+app.get('port'));
});