import MsgFormated from "./msgFormated";
import MsgWin from "./msgWin"; 

//import "@babel/polyfill";

/**
 * import "@babel/polyfill";
 * add on the top for async wait work on your project
 * 
 * Gak PAKE ASYNC
 */
class LoaderKota{
    constructor(){
        /** @type {Window} */
        this.parent = null;
        this.msgWin = new MsgWin();
 
    }

    registerListener(){
         this.msgWin.mywin = window;
         this.msgWin.owin = this.parent;
         this.msgWin.publicFun = this;
         this.msgWin.register()
    }
 

    callLoad(){
        this.msgWin.postMsg({
            callFun : "Loaded",
            callType : MsgFormated.TYPEcall
        })
    }

    publicGetAjax(path, cb){
        $.get("/kotadb/" + path,function(data){
            cb(data)
        })
    }
}

var loader = new LoaderKota();
loader.parent = parent;
loader.registerListener();
loader.callLoad();