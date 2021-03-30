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
    onscroll(force=false){
        var tran=0;
        if(window.scrollY>header.scrollY || force){
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
    resize(){
        var dummy=this.element.children[0].children[1];
        var abs=this.element.children[0].children[0];
        abs.style.width=dummy.offsetWidth+"px";
        abs.style.height=dummy.offsetHeight+"px";
    }
    autochange(sli){
        if(sli.cur==0 || sli.cur==heroslider.imgdivs.length-1)
            sli.directionleft=!sli.directionleft;
        sli.change(sli.directionleft);
    }
}

class Nexter{
    constructor(nexterid,_call=false){
        this.element=document.getElementById(nexterid);
        this.eles=this.element.children;
        for(var i=1;i<this.eles.length;i++){
            this.eles[i].style.transform="translateX(100%)";
        }
        this.curpos=0;
        this.call=_call;
    }
    async next(pre=false,content_slider_id=null){
        // kill all the intervals in current view while switching
        kill_all_view_intervals(content_slider_id);

        if(pre) 
            this.curpos--;
        else
            this.curpos++;
        if(this.curpos<0)this.curpos=0;
        if(this.curpos>this.eles.length-1)this.curpos=this.eles.length-1;
        for(var i=0;i<this.eles.length;i++){
            var tran=0;
            if(this.curpos<i)
                tran=100;
            if(this.curpos>i)
                tran=-100;
            this.eles[i].style.transform=`translateX(${tran}%)`;
        }
        if(this.call)
            this.call(this.curpos);
            return new Promise(res=>setTimeout(res,500));
    }
}

var Debugger=new Debug("index.js","debug");
var header=new Header("header");
Debugger.log("Header Instantiated",153);
var heroslider=new HeroSlider("heroslider",["images/favicon.jpg","images/favicon.jpg","images/favicon.jpg"]);

var MainNexter=new Nexter("MainNexter");

heroslider.init();
window.onresize=()=>{
    heroslider.resize();
}
function Inject(val){
    var injectdiv=document.getElementById("_injecthere_");
    if(val=='about'){
        injectdiv.innerHTML=`
        
        <h2>About US</h2>
        <p>
        NIT Calicut has a vibrant Alumni of over 30,000 who have been contributing to the development of the institute through various initiatives. The Institute is very proud of its former 
        students now occupying key positions in the country and outside. The Silver Jubilee and Golden Jubilee reunions of REC/NITC is conducted every year in the campus. The Silver Jubilee 
        Endowment Fund, contributed by each batch of alumni while celebrating the Silver Jubilee of their graduation is awarding scholarships worth 10 lakhs each year. This is in addition 
        to the scholarships instituted by individual alumnus. In 2018, during the WNM held in NIT Calicut, the Creative Zone sponsored by NITCAA was inaugurated. Further to this a Gazebo 
        is under construction which is sponsored by the 1969 batch alumni, who recently celebrated their Golden Jubilee. A lot of similar infrastructure and technology projects are expected 
        to come up in the campus, with the support of Alumni. The Distinguished Alumni Lecture series is another way by which alumni give back to the alma mater, where they will be sharing 
        their professional experience with the budding engineers to motivate them. The North America NITC Alumni Association initiated a program called NITC Alumni Mentoring Program 
        (NITCAMP), where current students are mentored by alumni and help them out in selecting career paths. This program has been running successfully since 2017. NITCAA and NITC are 
        together in the process of preparing the alumni database, which will help a lot in augmenting the interactions. The Office of Dean Alumni Affairs and International Relations (AAIR) 
        is extending all the support to NITCAA for fruitful interaction with the alumni. An Agreement was signed between NITC and NITCAA on February 2020 to articulate and execute 
        programmes and projects which provides avenues for meaningful engagement between NITC and its Alumni.
        </p>
        <div class="tran2-btn" onclick="MainNexter.next(true)">Back to Home</div>
        
        `;
    }
    if(val=='msg'){
        injectdiv.innerHTML=`

        <h2>Message from the Director</h2>
        <p>
        <br><br>
        I am delighted to note that a website has been launched for Alumni Affairs and International Relations at NIT Calicut. I wholeheartedly welcome this significant initiative by the Office of the Dean, Alumni Affairs and International Relations. This website will be a unique platform that will evoke lots of nostalgic memories in each and every one of you, which will invigorate all of us to work together for a better tomorrow.
        <br><br>
        Right from its inception, NIT Calicut (formerly REC Calicut) has undergone sustained progress in all spheres of activity and became one of the prestigious academic institutions in the country. It is understood that the hallmarks of this Institute of National Importance are its highly qualified & dedicated faculty and staff, excellent student input, impressive placement record and state-of-the-art facilities. One of the major yardsticks to assess the success of an academic institution like NIT Calicut is the performance of its alumni. NIT Calicut has a lot to rejoice in this respect, as thousands of its illustrious alumni are occupying enviable positions in various parts of the globe, both in industry and academia. 
        <br><br>
        Government of India is presently undertaking major initiatives to change the higher education landscape of our country. Government is keen to transform the institutions to world-class standards and is contemplating a competitive funding mechanism linked to performance. Since the support is linked to performance, institutions will have to strategize their programmes, intake, research, innovation, outreach, welfare, management and the institutional branding so as to excel in their mission. In this context, our alumni can play leading role in making our system vibrant, garnering international attention and ensuring seamless networking with the best in class institutions/industries across the globe. This website will be the playground for such game changing activities.
        <br><br>
        Entrepreneurs are national assets to be cultivated and motivated to the greatest possible extent. In this backdrop, this website will promote the cause of entrepreneurship. NIT alumni are present worldwide and they would be able to collaborate and share their diverse knowledge and experience using this platform for this cause. 
        <br><br>
        Collaboration with leading institutions and industries in India and abroad is the need of the hour to reach the higher echelons of academia. International collaborations help in raising institutional profile and to complement & improve research capabilities. This website will be the nuclei for making lasting connections, and for utilising both formal and informal networks to approach a wider academic audience and groups of professionals.
        <br><br>
        This website is a dedicated initiative for NITC alumni and will add great value to the alumni, and the institution. It will also spread the message of social responsibility on the part of NITC and its alumni. I also take this opportunity to give a clarion call to NITC Alumni to do their best for the overall upliftment of their alma mater. 
        <br><br>
        I would also like to convey my sincere appreciation of the efforts put in by the Dean (AA & IR), and her committed team members, who have toiled hard to make this website a reality. I am sure that this website will help in reaping rich benefits in the years to come. 
        <br><br>
        Sivaji Chakravorti
        </p>
        <div class="tran2-btn" onclick="MainNexter.next(true)">Back to Home</div>

        `;
    }
    if(val=='nitcamp'){
        injectdiv.innerHTML=`

        <center>
            <h2>NITCAA USA Mentoring Program (NITCAMP)</h2><br>
            <h3>AN INITIATIVE BY THE NITCAA USA CHAPTER CO-SPONSORED BY <br> NITC OFFICE OF ALUMNI AFFAIRS AND INTERNATIONAL RELATIONS</h3><br><br>
        </center>
        <p>
        NITCAA USA  Mentoring Program (NITCAMP) is a platform through which NITC students can interact with NITC alumni in the US, to receive guidance regarding career development, higher studies, and other technical/professional needs of students. The NITCAMP was launched in 2017 and has gained acceptance from the students. Some highlights about NITCAMP are:
        <ul>
            <br><br><li>
                The NITCAA mentoring program shall be mentee-driven. To elaborate, the mentee is expected to determine his/her development needs by himself/herself or with the mentor’s support. The mentee is expected to seek inputs from the mentor to meet those needs. The mentor is expected to provide guidance to the mentee accordingly.
            <br><br></li>
            <li>
                Each mentee would interact with one mentor. If required, the mentor may facilitate in connecting the mentee with an expert in the mentee’s area of interest. Mentors may choose to guide more than one mentee each, if they are willing to do so. Priority needs to be given to providing effective mentoring, and not to maximize the number of mentees.
            <br><br></li>
            <li>
                In addition to one-to-one mentoring, platforms such as email groups/WhatsApp groups will be developed to provide a forum for discussing questions/answers as a group. This will help address general questions on common topics such as studying in the U. S.
            <br><br></li>
            <li>
                The program framework will ensure that mentee-mentor matching is effective by pairing a mentee with an appropriate mentor. The mentee will be able to choose a preferred mentor. The program will ensure transparency in the mentee-mentor matching process, and will be overseen by the NITCAA USA mentoring team as well as NITC faculty.
            <br><br></li>
            <li>
                Every mentee-mentor pair will be finalized only upon the mutual agreement of the mentee and the mentor. In the event, one or both the two parties express discontent, the pair will be deemed invalid and a fresh pairing process will be carried out.
            <br><br></li>
            <li>
                The roll out of the program shall take place by the first week of August every year.
            <br><br></li>
        </ul>
        </p>
        <h3><u>Mentee Feedback</u></h3>
        <div class="postion-slider">
            <div id="wrapper-5"></div>
        </div>
       
        <div class="tran2-btn" onclick="MainNexter.next(true,'wrapper-5')">Back to Home</div>
        `;
        
        instantiate_class("wrapper-5");
    }
    MainNexter.next();
}