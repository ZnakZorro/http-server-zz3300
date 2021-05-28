const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const http = require('http');
const app = express();
const exec = require('child_process');
const https = require('https');
const request = require('request');

// Parsers
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'pages')));

const sendInfo = (res, ret) => {
  var json = JSON.stringify(ret);
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader("Access-Control-Allow-Methods", "*");
  //res.setHeader("Access-Control-Allow-Headers", "*");
  //console.log(ret);
  res.send(ret);
};

const myPad=(n)=> {
  let nr =n+0.001;
  let fx = nr.toFixed(1);
  return fx;
  let tx = ("0"+fx).slice(-4);
  return tx;
}


const parsowanie = (resmain, data, miasto) => {
   let czas = (new Date()).toLocaleString();
  console.log('-------------'+miasto+'-'+czas+'----------------');
  let html = `<h3>${miasto} ${czas}</h3>`;
  html += `<table class="table table-sm table-bordered table-striped">`;
  html +=`<tr>
    <th>Czas</th><th>Temp</th><th>Feel</th><th>Dev</th><th>Press</th><th>Humi</th><th>Wind</th><th>Stan</th><th>Deszcz</th>
  </tr>`;
  let count=0;
  for (var o in data) {
    let day = data[o];
    //console.log(o,day);
    //let czas = new Date(day.start).toLocaleString('pl-PL');
    let czas = (new Date(day.start)).toLocaleString('pl-PL', {hour: 'numeric',minute: '2-digit',weekday: 'long',year: 'numeric',month: 'short',day: 'numeric'});
    //long  narrow  short 
    console.log(czas);
    //console.log(day.precipitation);
    let deszcz = Math.max(
      day.precipitation.value,
      day.precipitation.min,
      day.precipitation.max
    );
    deszcz = deszcz || day.precipitation.value;
    let opis = day.symbol.var ? day.symbol.var : day.symbolCode.next6Hours;
    let trid = "row_"+count;
    html += `<tr id="${trid}">
          <td>${czas}</td>
          <td>${myPad(day.temperature.value)}</td>
          <td>${myPad(day.feelsLike.value)}</td>
          <td>${myPad(day.dewPoint.value)}</td>
          <td>${day.pressure.value}</td>
          <td>${day.humidity.value}</td>
          <td>${myPad(day.wind.speed)}</td>
          <td>${opis}</td>
          <td>${myPad(deszcz)} mm</td>
      </tr>`;
      count++;
  }
  html += '</table>';
  sendInfo(resmain, { html: html });
};

let getYRNO = (resmain, miasto) => {
  console.log(miasto);
  let miastaURL={
    "Dabie":"https://www.yr.no/api/v0/locations/2-3083828/forecast",
    "Szczecin":"https://www.yr.no/api/v0/locations/5-1220500/forecast",
    "Warszawa":"https://www.yr.no/api/v0/locations/2-7531926/forecast"
    }
  //console.log(miastaURL[miasto]);

  //let url = 'https://www.yr.no/api/v0/locations/2-3083828/forecast'; // Dąbie
  let url = miastaURL[miasto];
  console.log(url);
  let options = { json: true };
  request(url, options, (error, res, body) => {
    if (error) {
      return console.log(error);
    }
    if (!error && res.statusCode == 200) {
      parsowanie(resmain, body.longIntervals,miasto);
    }
  });
};


/* ROUTING * ROUTING * ROUTING * ROUTING * ROUTING */
/* ROUTING * ROUTING * ROUTING * ROUTING * ROUTING */
/* ROUTING * ROUTING * ROUTING * ROUTING * ROUTING */

app.get('/yrno/*', (req, res) => {
  let miasto = req.params[0];
  getYRNO(res, miasto);
  //let ret = {"miasto":miasto,"html":"???"};
});

app.get('/radio/*', (req, res) => {
  //console.log(req.params);
  let nr = req.params[0];
  //console.log(nr);
  let ret = { radio: nr };
  sendInfo(res, ret);
});

app.get('/volume/*', (req, res) => {
  let vol = req.params[0];
  let ret = { volume: vol };
  sendInfo(res, ret);
});



//Set Port
const port = process.env.PORT || '3305';
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => console.log(`1 Running on localhost:${port}`));
