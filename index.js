const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();

const exec = require('child_process');

const https = require('https');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false}));

// Angular DIST output folder
app.use(express.static(path.join(__dirname, 'pages')));

// Send all other requests to the Angular app
/*app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'pages/index.html'));
});*/

const parsowanie=(body)=>{
  //console.log(body);
		for (var o in body){
			//console.log(o);
		}
    console.log("------------------------------");
    let html = "";
		for (var o in body.longIntervals){
      let day = body.longIntervals[o];
			//console.log(o,day);      
      let czas = (new Date(day.start)).toLocaleString('pl-PL');
      let deszcz = Math.max(day.precipitation.value,day.precipitation.min,day.precipitation.max);
      console.log(czas,"T=",day.temperature.value,"FL=",day.feelsLike.value,"  D="+deszcz+" mm");      
		}
  //return html;
}


async function getYRNO(miasto) {
  console.log(miasto);
  let url ='https://www.yr.no/api/v0/locations/2-3083828/forecast'; // Dąbie
    https.get(url,(res) => {
        let body = "";
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                console.log(json);
                parsowanie(json);
            } catch (error) {
                console.error(error.message);
            };
        });
    }).on("error", (error) => {
        console.error(error.message);
    });

  //const res = await fetch.fetchUrl(url)
  //const posts = await res.json()
  //console.log(posts);
  return miasto;
}



app.get('/yrno/*', (req, res) => {
    let miasto = req.params[0];    
    let yr = getYRNO(miasto);
    let ret = {"miasto":miasto,"html":yr};
    sendInfo(res,ret);
});




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