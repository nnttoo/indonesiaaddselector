var loader = new indoselectorclient.KotaIndoSelector();
loader.server = "https://nnttoo.github.io/indonesiaaddselector/loader.html"


loader.load(function(){     
    function nulOrUndef(txt){
        return (typeof(txt) == "undefined" || txt == "")
    } 

    $('.locselector').on("change",function(ev){ 
        var target = $(ev.target); 
        

        var code = target.val();  

        var childId = target.data("childid");
        if(nulOrUndef(childId)){
            console.log("child id null");
            return;
        }

        var childElem = $('#' + childId);
        var childFun = childElem.data("loaderfun")  
        if(nulOrUndef(childFun)){
            console.log("childfun null");
            return;
        }
        childElem.val(null)
        childElem.trigger("change")
        if(code == "pilih" || code == null) {
            childElem.html("");
            return;
        }
        loader[childFun](code,function(arrData){
            childElem.html("");
            $("<option value='pilih'>"+childElem.data("defmsg")+"</option>").appendTo(childElem) 
            arrData.forEach(function(codename){
                var opt = $("<option>" + codename.name + "</option>").appendTo(childElem)
                opt.attr("value",codename.code)
            }) 
            
        })
    })
    var provselect = $("#provselect")
    loader.getProv((data)=>{
        $("<option value='pilih'>Pilih Provinsi</option>").appendTo(provselect) 
        data.forEach(function(codename){
                var opt = $("<option>" + codename.name + "</option>").appendTo(provselect)
                opt.attr("value",codename.code)
        }); 

    })
});