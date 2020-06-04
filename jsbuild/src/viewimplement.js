
var loader = new indoselectorclient.KotaIndoSelector();
loader.server = "https://nnttoo.github.io/indonesiaaddselector/loader.html"

function nulUndef(txt){
    return (typeof(txt) == "undefined" || txt == null || txt == "")
}

/**
 * @typedef {object} childObject
 * @property {string} id
 * @property {string} fun
 * @property {string} name
 */

var provid = "provselect";
/**
 * @type {Object<string, childObject>}
 */
var childObject = {}
loader.load(function(){ 
    var provselect = $("#" + provid)
    var listchild = provselect.data('childselectors').split("|")
    childObject['def'] = {
        id : provid,
        name : "Provinsi",
        fun : "getProv",            
    };

    childObject[provid] = {
            id : listchild[0],
            name : "Kabupaten/Kota",
            fun : "getKab",            
    };
    childObject[listchild[0]] = { 
        id : listchild[1],
        name : "Kecamatan",
        fun : "getKec", 
    };
    childObject[listchild[1]] = { 
        id : listchild[2],
        name : "Desa",
        fun : "getDes", 
    }  
     

    $('.locselector').on("change",function(ev){  
        var target = $(ev.currentTarget);
        var childObjectSelected = childObject[target.attr("id")] 
        if(childObjectSelected == null){ 
            return;
        }
        var childElem = $('#' + childObjectSelected.id);
        childElem.val(null)
        childElem.trigger("change");

        var code = target.val(); 
        if(code == "pilih" || code == null || code == "") {
            childElem.html("");
            return;
        }

        loader[childObjectSelected.fun](code,function(arrData){
            childElem.html("");
            $("<option value='pilih'>Pilih "+childObjectSelected.name+"</option>").appendTo(childElem) 
            arrData.forEach(function(codename){
                var opt = $("<option>" + codename.name + "</option>").appendTo(childElem)
                opt.attr("value",codename.code)
            }) 
        })

    })


    loader.getProv((data)=>{
        $("<option value='pilih'>Pilih Provinsi</option>").appendTo(provselect) 
        data.forEach(function(codename){
                var opt = $("<option>" + codename.name + "</option>").appendTo(provselect)
                opt.attr("value",codename.code)
        }); 

    })
});

function getAlamat(){
    var r = {
        alamat : "",
        error : ""
    }

    var objkeys = Object.keys(childObject);
    for(var i=0;i<objkeys.length;i++){
        var cur = childObject[objkeys[i]];
        
        var currenElem = $('#' + cur.id);
        var val = currenElem.val()

        if(nulUndef(val) || val == "pilih"){
            r.error += "Pilih " + cur.name
            return r;
        }

        r.alamat += cur.name + " : " + currenElem.find('option:selected').text() + "\n";

    } 

    return r;
}
 
export {
    getAlamat 
}