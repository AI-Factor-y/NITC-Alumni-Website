class Header{
    constructor(headerid){
        this.element=document.getElementById(headerid);
        this.element.style.transition="all 0.5s";
        this.scrollY=window.scrollY;
        this.element.style.position="fixed";
        this.element.style.top="0px";
        this.eles=document.getElementsByClassName("mainele");
        this.trace=[];
        for(var i=0;i<this.eles.length;i++){
            this.eles[i].onscroll=()=>{this.checkscroll(this.eles,this.trace)};
            this.trace.push(this.eles[i].scrollTop);
        }
        console.log(this.trace);
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
    checkscroll(){
        for(var i=0;i<header.eles.length;i++){
            if(header.trace[i]!=header.eles[i].scrollTop){
                console.log("changed "+i);
                var tran=-100;
                if(header.trace[i]>header.eles[i].scrollTop){
                    tran=0;
                }
                header.element.style.transform=`translateY(${tran}%)`;
                header.scrollY=window.scrollY;
                header.trace[i]=header.eles[i].scrollTop;
            }
        }
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
        
        <h2>About US</h2><br><br>
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

        <h2>Message from the Director</h2><br>
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
        </p><br>
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
        var array=[
            
       `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
       <div>
        <center style="padding : 0% 10%;">
            <h2>1.Neha N</h2>
            <p>
                Applying for universities abroad is a scary and demanding task. I didn't know where to begin. And let's not forget the huge expense that goes into just applying to different schools. I came across the NITCAA Mentoring Programme in my final year of architecture when I was quite clueless about what to do. I applied and was quite surprised and relieved to be appointed with a mentor. I have been mailing with him since and the inputs are really helpful. He has helped me understand the different exams that I have to take, the kind of portfolio that have to be prepared and also possible schools that I can apply to. As I am looking to join for the next academic year, the process continues. But without this programme, I wouldn't have had the confidence to start preparing for studying abroad. 
            </p>
        </center>
       </div>
     </div>
      `,
       `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
        <div>
         <center style="padding : 0% 10%;">
             <h2>2. P Swaminadh</h2>
             <p>
                I P.Swaminadh(S-7,B.tech) wholeheartedly appreciate people involved in NITCAA Mentorship program for their concern towards current students of NITC. Most of us understood that studying in foreign country is not a "Mission impossible". Based on my personal experience,Mentors mostly replied within one day for query.They shared their valuable experiences and indeed given suggestions to improve ourselves.We were made aware how important Academic performance(CGPA) as well as Communication skills. Finally it is a overall good experience regarding future opportunities and study in Abroad. I hope this improves and develops with time.
             </p>
         </center>
        </div>
      </div>
        `,
        `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
         <div>
          <center style="padding : 0% 10%;">
                <h2>3. Anju Anand</h2>
                <p>
                    The mentor program is a brilliant idea in conception - it is not very straightforward to get information about MS from the internet and having a person who has gone through the same eases the process. For instance, I came to know about edulix, which is a site to check for universities one can apply to, from my mentor. Although she has been helpful, I find our conversations lacking vigour, which I hope to rectify soon. Overall, I would say that the program is good and very much required, but that it would be nice if there was an initial ice breaking session of sorts.
                </p>
          </center>
         </div>
       </div>
         `,
         `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
          <div>
           <center style="padding : 0% 10%;">
                 <h2>4. Lijo George</h2>
                 <p>
                    The NITCAA mentor-ship program was indeed a career changing step for me, the program thoroughly changed my outlook towards engineering. I was able to understand the different possibilities an engineering student has when he comes out as a graduate and the importance of specializing in a specific field keeping a close eye on the job opportunities available in that field. My mentor was working in a leading automobile company in America after having completed masters there .He gave me a rough sketch of his life as an engineering student and what are the different procedures of applying for MS in a foreign University. He tried to understand my interests and helped me find the right program for masters. He also connected me to people who were pursuing my field of interest so that i would get gain more knowledge in that field. My mentor was able to convince me to follow and spent more time on my strong subjects. He was able to help me choose the right electives i.e. the ones that matched my interests. My mentor was open with me, we had no senior junior barrier at all. He thoroughly understands the way the way I think as a student because he had already passed through the same situation. He wanted me to know the problems and issues he faced as a student and he did not want me to go through the same. Currently we haven't contacted each other for over a month but he has given me the liberty to contact him any time. 
                    <br><br> "If only I knew those possibilities when i was in college ". I have heard a number of  passed out seniors tell this phrase as they had regretted  about not having studied more when they had the chance. I believe that this program will instill the need for specialization in the students because without it you are just another one out of the 5 lakh unemployed engineering graduates.
                 </p>
           </center>
          </div>
        </div>
          `,
          `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
           <div>
            <center style="padding : 0% 10%;">
                  <h2>5. Nihal Saji</h2>
                  <p>
                    I would like to express my sincere gratitude towards the mentorship team. Like some of my friends, I had lot of doubts regarding the opportunities we had after doing our B.tech. I didn’t have any relatives and friends who could help me with this. The effort made by this team has helped me a lot. I was given a mentor who was very friendly and patient to hear and clarify my doubts. As he was working outside India I could also ask him about the career opportunities abroad. Mostly he was the one who contacted me frequently and enquired about my problems and doubts. I was able to share many of my doubts with him and he was always a   good mentor for me. I am sure that this mentorship programme  would be a great  help  to most of our college  students like me.
                  </p>
            </center>
           </div>
         </div>
           `,
           `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
            <div>
             <center style="padding : 0% 10%;">
                   <h2>6. Renjith Krishnan</h2>
                   <p> 
                        Nitcaa mentorship programme is a great initiative. Its gives us a chance to interact with alumni who work in areas of our interest and help us understand the requirements needed to achieve our goal. They also constantly guide us by giving suggestions on what concepts to learn and what steps to take so that we end up achieving a career we want. For me my mentor has helped me a lot in understanding how analytics industry works , and also gave me insights on paths that we can opt after becoming an Analyst. Thank you for taking the time off your busy schedule  and helping us out!   
                   </p>
             </center>
            </div>
          </div>
            `,
            `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
             <div>
              <center style="padding : 0% 10%;">
                    <h2>7. Heera</h2>
                    <p>
                        As a third year electronics and communication engineering student, the future opportunities one encounters are many. In such a scenario, it is highly beneficial to receive the guidance of someone who has already walked this path. That is exactly what the NITC alumni mentoring has done for me. I was assigned Mr Joju Joseph Zajo of 2013 batch as my mentor. He had extremely good credentials and I was fortunate to have such an experienced person willing to guide me. From the start, he was very patient and always ready to clear my doubts. He was kind enough to spend his precious time offering suggestions to various applications/letters and even editing some of them. Apart from that, he was keen in notifying various internship opportunities and helped me in building my resume. Overall, I was extremely happy with the opportunity I got and I recommend everyone to give it a try.    
                    </p>
              </center>
             </div>
           </div>
             `,
             `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
              <div>
               <center style="padding : 0% 10%;">
                     <h2>8. Akshai B</h2>
                     <p> 
                        As a part of mentorship program by NITC US Alumni I got Nived as my mentor. It was a great opportunity for me to talk with him .Me myself Akshai B, Anand Jose and Navneeth Krishna are under his mentorship. I got very good experience talking to him.  He is currently working in Ford as a designer of engine cooling system. He motivated me a lot by talking about the real industrial experience .We also had a video call session in which he shared with us his college experience. In that session he help us to orient in the right direction so as to succeed in the competitive world. Overall as a student of NITC he help me a lot which I hope will help me in future to become as an automobile engineer which is my dream.                           
                     </p>
               </center>
              </div>
            </div>
              `,
              `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
               <div>
                <center style="padding : 0% 10%;">
                      <h2>9. Ashish Rambhatla</h2>
                      <p> 
                        My mentor is Amrutha Nadarajan who is currently pursuing PhD in USC. I am a student aspiring to pursue MS in the US. In our first conversation itself she believed that I could do it and provided me the support necessary for me to keep going. She took time to read all my crappy SOPs, edited them. The timelines she has set for me and the reminders she gave me played a key role in completing my application process on time. I thank NITCAA for taking this initiative and helping me out.                         
                      </p>
                </center>
               </div>
             </div>
               `,
               `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
                <div>
                 <center style="padding : 0% 10%;">
                       <h2>10. Micah Wilson</h2>
                       <p> 
                           The mentor-ship program was a truly enriching experience for me. I could get into touch with an alumnus from our college who is currently working in the US after completing his MS there. His first call came as a complete surprise to me, and we talked for hours regarding career, college-life and academics. He was able to guide me and shed light on the path to which I could pursue an MS in the US. He had given me all the necessary information that I needed to know about taking the GRE exam, giving proper emphasis upon learning materials, strategy and other important guidelines. Now I have a clear cut plan in front of me (thanks to him and NITCAA) to pursue MS in US. I am really grateful towards this mentor-ship program initiated by NITCAA.                           
                       </p>
                 </center>
                </div>
              </div>
                `
        ];
        instantiate_class("wrapper-5",array,7);
    }
    header.element.style.transform=`translateY(0%)`;
    MainNexter.next();
    document.body.scrollTop=0;
    MainNexter.eles[1].scrollTop=0;
}