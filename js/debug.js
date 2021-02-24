class Debug{
    constructor(filename,elementid){
        this.filename=filename??"no filname given";
        this.elementid=elementid;
        var element=document.getElementById(elementid);
        if(element){
            this.instance(element);
        }
        console.log(`%cDebugger is instantiated in ${this.filename}`,"font-size:1.2rem;color:#0f0;");
    }
    instance(Debug_html){
        Debug_html.innerHTML=`<marquee behavior="alternate" onMouseOver="this.stop()" onMouseOut="this.start()">Debugger is Present. Remove before stable release (click to hide or auto remove in 5s).<marquee>`;
        Debug_html.style.padding="10px 0px";
        Debug_html.style.background="#f00";
        Debug_html.style.color="#fff";
        Debug_html.style.fontSize="1.2rem";
        Debug_html.style.position="fixed";
        Debug_html.style.zIndex=100;
        Debug_html.style.top="50%";
        Debug_html.style.width="100%";
        Debug_html.addEventListener('click',()=>{
            this.remove(Debug_html);
        });
        setTimeout(()=>{
            this.remove(Debug_html);
        },5000);
    }
    remove(Debug_html){
        console.log(`%cclearing %cdebug html%c div`,"color:#0f0;","color:#f00;","color:#0f0;")
        Debug_html.innerHTML="";
        Debug_html.style.padding="0px";
    }
    bold(msg,lineno){
        msg=msg??"Bold";
        console.log(`%c${msg} : from ${this.filename} ${lineno}`,"font-weight:bold;");
    }
    imp(msg,col,lineno){
        msg=msg??"Bold";
        col=col??"white";
        console.log(`%c${msg} : from ${this.filename} ${lineno}`,"font-size:1.2rem;color:"+col+";")
    }
    color(msg,col,lineno){
        msg=msg??"msg is null";
        col=col??"white";
        console.log(`%c${msg} : from ${this.filename} ${lineno}`,"color:"+col+";");
    }
    log(msg,lineno){
        this.color(msg,"#0f0",lineno);
    }
    error(msg,lineno){
        this.color(msg,"#f00",lineno);
    }
    Warning(msg,lineno){
        this.color(msg,"#ff0",lineno);
    }
}
