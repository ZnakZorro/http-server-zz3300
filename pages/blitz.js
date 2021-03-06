 const getF = async (u) => {
  const r = await fetch(u);
  const o = await r.json();
  return o;
}
let radio=(nr)=>{
  getF("/radio/"+nr).then((re) => {
    console.log(re)
  })
}
let volume=(nr)=>{
  getF("/volume/"+nr).then((re) => {
    console.log(re)
  })
}
let yrno=(miasto)=>{
  getF("/yrno/"+miasto).then((ret) => {
    //console.log(ret);    
    if (ret.html) {
        document.getElementById("html").innerHTML =ret.html;
        lookTable();
    }
    else document.getElementById("info").textContent = JSON.stringify(ret);
  })
}

let lookTable=()=>{
  let rows = document.querySelectorAll("table.table tr.rw");
  let obj = {};
  rows.forEach((r)=>{
    //console.log(r);
    let rowid = r.id;
   
    let tds = r.querySelectorAll("td");
    //console.log(tds);
    let arr = [];
      tds.forEach((t,x)=>{
        //console.log(x,t.textContent);
        if (x===0)      arr.push(parseFloat(t.dataset.time));
        else if (x===8) arr.push(t.textContent);
        else            arr.push(parseFloat(t.textContent));
      });
       obj[rowid]=arr;
  });
  console.log(obj);
}

document.addEventListener("DOMContentLoaded",function(){
    let czas = (new Date()).toLocaleString();
    document.getElementById('debug').innerHTML = czas;
    setTimeout(()=>{yrno("Dabie")},1000);
    //setInterval(()=>{yrno("Szczecin")},300000);
})