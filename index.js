const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const exec = require('child_process');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'pages')));

// Send all other requests to the Angular app
/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'));
});*/

	let sendInfo=(res,ret)=>{
		var json = JSON.stringify(ret);
		res.setHeader("Access-Control-Allow-Origin", "*");
		//res.setHeader("Access-Control-Allow-Methods", "*");
		//res.setHeader("Access-Control-Allow-Headers", "*");
		console.log(ret);
		res.send(ret);
	}	

app.get('/radio/*', (req, res) => {
    //console.log(req.params);
    let nr = req.params[0];
    //console.log(nr);
    let ret = {"radio":nr};
    sendInfo(res,ret);
   
});


app.get('/volume/*', (req, res) => {
    let vol = req.params[0];
    let ret = {"volume":vol};
    sendInfo(res,ret);
});


app.get('/yrno/*', (req, res) => {
    let miasto = req.params[0];
    let ret = {"miasto":miasto};
    sendInfo(res,ret);
});






app.get('/radio1/', (req, res) => {
    console.log(22);    
    //res.send("11);
    res.sendFile(path.join(__dirname, 'pages/index.html'));
});

app.get('/radio2/', (req, res) => {
    console.log(22);    
    //res.send("22);
    res.sendFile(path.join(__dirname, 'pages/index.html'));

   /* exec('mpc play 2', (err, stdout, stderr) => {
      if (err) {onsole.log(err); return; }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }); */   
});
app.get('/radio3', (req, res) => {
    console.log(33);
    //res.send("33");
    res.sendFile(path.join(__dirname, 'pages/index.html'));

   /* exec('mpc play 3', (err, stdout, stderr) => {
      if (err) {onsole.log(err); return; }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    });*/

});












//Set Port
const port = process.env.PORT || '3300';
app.set('port', port);

const server = http.createServer(app);

server.listen(port, () => console.log(`1 Running on localhost:${port}`));