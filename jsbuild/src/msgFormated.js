export default class MsgFormated{ 
    constructor(){
        this.callFun = ""
        this.data = "" 
        this.callType = MsgFormated.TYPEcall;
        this.callId = "";
    }
}
MsgFormated.TYPEcall = 0;
MsgFormated.TYPEreply = 1;
MsgFormated.TYPEcallwithCb = 2;