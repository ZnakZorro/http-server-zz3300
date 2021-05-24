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



app.get('/radio/:nr', (req, res) => {
    console.log(req.params.nr);
    res.send("1");
   
});
app.get('/radio2/', (req, res) => {
    console.log(22);
    res.send("1");
    //res.sendFile(path.join(__dirname, 'pages/index.html'));

   /* exec('mpc play 2', (err, stdout, stderr) => {
      if (err) {onsole.log(err); return; }
      console.log(`stdout: ${stdout}`);
      console.log(`stderr: ${stderr}`);
    }); */   
});
app.get('/radio3', (req, res) => {
    console.log(33);
    res.send("1");
    //res.sendFile(path.join(__dirname, 'pages/index.html'));

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