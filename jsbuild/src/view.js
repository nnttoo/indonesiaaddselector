 
import MsgFormated from "./msgFormated";
import CodeName from "./codename"; 
import MsgWin from "./msgWin";
//import "@babel/polyfill";

/**
 * import "@babel/polyfill";
 * add on the top for async wait work on your project
 * 
 * 
 * Gak PAKE ASYNC
 */

/**
 * @callback ArrCallback
 * @param {CodeName[]} list
 */


/**
 * @callback DataCallback
 * @param {String} data
 */




class KotaIndoSelector{
    constructor(){ 
        this.server = "/iframe.html" 
        this.cbload = null; 

        this.msgWin = new MsgWin()
    }

    load(fun){
        this.cbload = fun;
        var div = $('<div/>').appendTo('body');
        div.css({display: 'none'});
        var iframe = $('<iframe src="' + this.server + '"></iframe>').appendTo(div)
        var framewin = iframe[0].contentWindow

        this.msgWin.mywin = window;
        this.msgWin.owin = framewin;
        this.msgWin.origin = new URL(this.server).origin;
        this.msgWin.publicFun = this;
        this.msgWin.register();
    } 

    /**
     * 
     * @param {String} fname 
     * @param {ArrCallback} cb 
     */
    getDataServer(fname,cb){
 
        var msg = new MsgFormated();
        msg.data = fname;
        msg.callFun = "GetAjax";
        this.msgWin.callOtherWithReply(msg,(data)=>{
 
            /**
             * @type {CodeName[]}
             */
            var arrResult = [] 
            var lines = data.split("\n");
            lines.forEach((line)=>{
                var splited = line.split("|");

                if(splited.length > 1){

                    var codename = new CodeName()
                    codename.code = splited[0]
                    codename.name = splited[1]

                    arrResult.push(codename);
                }

            }) 
            cb(arrResult)

        })


    }

    /** call from iframe */
    publicLoaded(){  
        if(this.cbload != null){
            this.cbload();
        }
    }

    /**
     * 
     * @param {ArrCallback} cb 
     */
    getProv(cb){
         this.getDataServer("prov.txt",(arr)=>{
             cb(arr);
         })
    }

    /**
     * contoh code "92.10.19.2003","Tomase"
     * @param {String} code 
     * @param {ArrCallback} cb 
     */
    getKab(code,cb){
          
        this.getDataServer(code + ".txt",(arr)=>{
            var result = [];
            arr.forEach((codename)=>{
                if(codename.code.split(".").length == 2){
                    result.push(codename);
                }
            })
            cb(result)
            
        })
    }

    /**
     * 
     * @param {String} code 
     * @param {ArrCallback} cb 
     */
    getKec(code,cb){
        var codekab = code.substr(0,2) 
        this.getDataServer(codekab + ".txt",(arr)=>{
            var result = [];
            arr.forEach((codename)=>{   
                if(codename.code.startsWith(code)){
                    if(codename.code.split(".").length == 3){
                        result.push(codename);
                    } 
                }
               
            })
            cb(result)
            
        })
    }
    

    /**
     * 
     * @param {String} code 
     * @param {ArrCallback} cb 
     */
    getDes(code,cb){
        var codekab = code.substr(0,2)
        this.getDataServer(codekab + ".txt",(arr)=>{
            var result = [];
            arr.forEach((codename)=>{
                if(codename.code.split(".").length == 4){
                    if(codename.code.startsWith(code)){
                        result.push(codename);
                    }
                }
            })
            cb(result)
            
        })
    }

}

export {KotaIndoSelector};