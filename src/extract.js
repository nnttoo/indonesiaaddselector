const fs = require("fs")
const path = require("path")
var csvjson = require('csvjson');

var arrayData = []

var csvDir = "./csv/"
var outputDir = "./output"

function readFile(){
    var bufftxt = fs.readFileSync(path.join(csvDir,"wilayah_2020.csv"));
    var txt = bufftxt.toString();
     

    arrayData = csvjson.toArray(txt, {
        delimiter : ',', // optional
        quote     : '"' // optional
        
    });
     
}
 
/**
 * 
 * @typedef {Object} KodeNama
 * @property {String} kode
 * @property {String} nama 
 */

/**
 * 
 * @callback CBloop
 * @param {KodeNama} dkode 
 */

/**
 * 
 * @param {CBloop} cb 
 * 
 */
function loopAll(cb){    
    arrayData.forEach((v)=>{
        cb({
            kode : v[0],
            nama : v[1].replace('\r','')
        })
    })
}

/**
 * 
 * @param {KodeNama[]} kodanamas 
 */
function stringify(kodanamas){
    var str = ""
    kodanamas.forEach((kn)=>{
        str += kn.kode + "|" + kn.nama + "\n"
    })

    return str;
}

function getDataProv(){
    /**
     * @type {KodeNama[]}
     */
    var output = []
    
    loopAll((datakota)=>{ 
         if(datakota.kode.indexOf(".") == -1){
             output.push(datakota)
         }

    })    
     
    return output;
}

function saveDataProv(){
    var dataprov = getDataProv()
    var txtprov =  stringify(dataprov);

    fs.writeFileSync(path.join(outputDir,"prov.txt"),txtprov)
}
 

function getDaerah(kodekc){
    var result = []
    loopAll((d)=>{
        if(d.kode.startsWith(kodekc)){
            result.push(d)
        }
    })

    return result;
}

function saveAllDaerah(){ 
    var allprov = getDataProv()
    allprov.forEach((prov)=>{
        var daerahs = getDaerah(prov.kode);
        var str = stringify(daerahs);
        fs.writeFileSync(path.join(outputDir,prov.kode + ".txt"),str)

    })
}

 
readFile()
saveDataProv(); 
saveAllDaerah();