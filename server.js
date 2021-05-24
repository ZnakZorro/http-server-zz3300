
const https = require('https');
var http = require('http');

let url ='https://www.yr.no/api/v0/locations/2-3083828/forecast'; // Dąbie
//let url ='https://www.yr.no/api/v0/locations/5-1220500/forecast'; // Szczecin 

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
      //console.log(czas,"T=",day.temperature.value,"FL=",day.feelsLike.value,"  D="+deszcz+" mm");
      html += '<p>T='+day.temperature.value+' F='+day.feelsLike.value+' D='+deszcz+' mm</p>\n';
      
		}
    console.log(html);
    serverStart(html);

}

let getYRNO=(url)=>{
    https.get(url,(res) => {
        let body = "";
        res.on("data", (chunk) => {
            body += chunk;
        });
        res.on("end", () => {
            try {
                let json = JSON.parse(body);
                //console.log(json);
                parsowanie(json);
            } catch (error) {
                console.error(error.message);
            };
        });
    }).on("error", (error) => {
        console.error(error.message);
    });
}


let serverStart=(html="qwerty")=>{
  http
    .createServer(function(req, res) {
      let czas = (new Date()).toLocaleString();
      console.log(1,czas);
        res.setHeader("Content-Type", "text/html");
        res.writeHead(200);
        res.end(html);
        //res.write(czas+html+' <br />yrno Hello, Node.js!'); //write a response to the client
        //res.end(); //end the response
    })
    .listen(8088); //the server object listens on port 8080
  let czas = (new Date()).toLocaleString();
  console.log(0,czas);
  console.log('Server running on port 8088');
}

console.log("+++++++++++++++++++++++++++++++");

getYRNO(url);
