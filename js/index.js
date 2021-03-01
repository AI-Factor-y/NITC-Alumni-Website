class Header{
    constructor(headerid){
        this.element=document.getElementById(headerid);
        this.element.style.transition="all 0.5s";
        this.scrollY=window.scrollY;
        this.element.style.position="fixed";
        this.element.style.top="0px";
        window.onscroll=this.onscroll;
        var body=document.body;
        this.height=this.element.offsetHeight;
        if(body.style.marginTop<this.height){
            body.style.marginTop=(body.style.marginTop+this.height)+"px";
        }
    }
    onscroll(){
        var tran=0;
        if(window.scrollY>header.scrollY){
            tran=-100;
        }
        else{
            tran=0;
        }
        header.element.style.transform=`translateY(${tran}%)`;
        header.scrollY=window.scrollY;
    }
}
class HeroSlider{
    constructor(id,imgs){
        this.id=id;
        this.element=document.getElementById(id);
        if(!this.element){
            Debugger.error("No element found",32);
            return;
        }
        var i=0;
        for(i=0;i<imgs.length;i++){
            if(!imgs[i]?.length || !imgs[i].split(".")[1]){
                Debugger.error("Error in imgs array",38);
                return;
            }
        }
        if(i==0){
            Debugger.error("Error in imgs array",43);
            return;
        }
        this.imgs=imgs;
        this.imgdivs="unset";
        this.cur=0;
        this.directionleft=true;
    }
    change(left=true){
        if(left)
            this.cur--;
        else    
            this.cur++;
        if(this.cur<0){
            Debugger.error("Error in changing imgdivs.",57);
            this.cur=0;
            return;
        }
        if(this.cur>=this.imgdivs.length){
            Debugger.error("Error in changing imgdivs.",62);
            this.cur=this.imgdivs.length-1;
            return;
        }
        for(var i=0;i<this.imgdivs.length;i++){
            var cls=" ";
            if(i<this.cur)
                cls="left";
            if(i>this.cur)
                cls="right";
            this.imgdivs[i].classList=cls;
        }
    }
    init(width="100%",interval=2.5){
        var id=this.id;
        if(!this.imgs){
            Debugger.error("Error in instantiation",78);
            return;
        }
        var style=`
            <style>
                #${id} .sliderbox{
                    overflow-x : hidden;
                }
                #${id} img{
                    max-width : 100%;
                    max-height : 80vh;
                    margin-left : 50%;
                    transform : translateX(-50%);
                }
                #${id} .slider-abs{
                    position : absolute;
                    overflow-x:hidden;
                    margin-left : 50%;
                    transform : translateX(-50%);
                }
                #${id} .slider-abs{
                    width : 100%;
                    overflow : hidden;
                    max-height : 80vh;
                }
                #${id} .slider-abs img{
                    position : absolute;
                    max-width : 100%;
                    margin-left : 0%;
                    transform : translateX(0%);
                    transition : all 0.5s;
                }
                #${id} .slider-abs img.left{
                    transform : translateX(-100%);
                }
                #${id} .slider-abs img.right{
                    transform : translateX(100%);
                }
            </style>
        `;
        var imgs=``;
        for(var i=0;i<this.imgs.length;i++){
            var cls="right";
            if(i==0)
                cls=" ";
            imgs+=`<img src="images/favicon.jpg" alt="" srcset="" style="max-width: 100%;" class=${cls}>`;
        }
        this.element.innerHTML=`
        <div class="sliderbox">
            <div class="slider-abs">
                ${imgs}
            </div>
            <img src="images/favicon.jpg" alt="" srcset="" style="max-width: 100%;">
        </div>
        ${style}
        `;
        this.imgdivs=this.element.children[0].children[0].children;
        setTimeout(()=>{this.set(interval)},100);
    }
    set(interval){
        var dummy=this.element.children[0].children[1];
        var abs=this.element.children[0].children[0];
        Debugger.log(dummy.offsetHeight,140);
        abs.style.width=dummy.offsetWidth+"px";
        abs.style.height=dummy.offsetHeight+"px";
        setInterval(()=>{this.autochange(this)},interval*1000);
    }
    autochange(sli){
        if(sli.cur==0 || sli.cur==heroslider.imgdivs.length-1)
            sli.directionleft=!sli.directionleft;
        sli.change(sli.directionleft);
    }
}
var Debugger=new Debug("index.js","debug");
var header=new Header("header");
Debugger.log("Header Instantiated",153);
var heroslider=new HeroSlider("heroslider",["images/favicon.jpg","images/favicon.jpg","images/favicon.jpg"]);
heroslider.init();
window.onresize=()=>{
    heroslider.init();
}