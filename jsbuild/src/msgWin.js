import MsgFormated from "./msgFormated";

var regCallid = 0;
function createCallId(){
    regCallid++;
    return "n" + regCallid;
}

/**
 * @callback DataCallback
 * @param {String} data
 */
export default class MsgWin{
    constructor(){
        this.origin = ""

        /** @type {Window} */
        this.mywin = null;
        /** @type {Window} */
        this.owin = null; // other windows (iframe or something like that)

        this.rplListener = {}

        this.publicFun = {}
    }

   
    /**
     * 
     * @param {MsgFormated} objMsg 
     */
    postMsg(objMsg){
        var jsonstr = JSON.stringify(objMsg);
        this.owin.postMessage(jsonstr,"*");
    }

    register(){
        this.mywin.addEventListener("message",(msg)=>{
            if(this.origin != "" && msg.origin != this.origin){
                return;
            }

            /** @type {MsgFormated} */
            var objMsg = null;
            try {
                
                objMsg = JSON.parse(msg.data);

            } catch (error) { 
                objMsg = null;
            }
 

            if(objMsg == null || objMsg.callType == null) return;

            if(objMsg.callType == MsgFormated.TYPEcall){

                if(objMsg.callFun == null) return;                
                try {                    
                    this.publicFun["public"+objMsg.callFun](objMsg.data)
                } catch (error) { }

                return;
            }

            if(objMsg.callType == MsgFormated.TYPEcallwithCb){
                if(objMsg.callFun == null) return;    
                if(objMsg.callId == null) return;
                 
                try {                    
                    this.publicFun["public"+objMsg.callFun](objMsg.data,(data)=>{
                        var replyObj = new MsgFormated();
                        replyObj.callId = objMsg.callId;
                        replyObj.callType = MsgFormated.TYPEreply
                        replyObj.data = data;
                        this.postMsg(replyObj)
                    })

                } catch (error) { }

                return;
            }

            if(objMsg.callType == MsgFormated.TYPEreply){
                if(objMsg.callId == null) return;
                try {
                    this.rplListener[objMsg.callId](objMsg.data);
                } catch (error) {
                    
                }

                return;
            }

        })
    }

    /**
     * 
     * @param {MsgFormated} msgObj 
     * @param {DataCallback} cb 
     */
    callOtherWithReply(msgObj,cb){
        msgObj.callId = createCallId();
        msgObj.callType = MsgFormated.TYPEcallwithCb;

        this.rplListener[msgObj.callId] = (data)=>{
            cb(data);
            delete this.rplListener[msgObj.callId];
        }
        this.postMsg(msgObj)
    }
}