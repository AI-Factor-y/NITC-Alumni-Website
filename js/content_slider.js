

// content slider class instantiation at bottom of the page



class content_slider{

  constructor(wrapper_id,image_arr,auto_interval_t){

    this.wrap_elem=document.querySelector(`#${wrapper_id}`);

    // storing input parameters for style injection
    this.container_class_name='slides-container_'+wrapper_id;
    this.slideImage_name='slide-image_'+wrapper_id;
    this.next_but_name='next-btn_'+wrapper_id;
    this.prev_but_name='prev-btn_'+wrapper_id;
    this.nav_name= 'navigation-dots_'+wrapper_id;
    this.single_dot='single-dot_'+wrapper_id;

    this.image_arr=image_arr // array for storing all images
    this.auto_interval_time=auto_interval_t

    this.init_injection();
    
    this.slideImage = document.querySelectorAll(`.${this.slideImage_name}`);
    this.slidesContainer = document.querySelector(`.${this.container_class_name}`);
    this.nextBtn = document.querySelector(`.${this.next_but_name}`);
    this.prevBtn = document.querySelector(`.${this.prev_but_name}`);
    this.navigationDots = document.querySelector(`.${this.nav_name}`);

    this.numberOfImages = this.slideImage.length;
    this.slideWidth = this.slideImage[0].clientWidth;
    this.currentSlide = 0;

    this.auto_slide=null;
    
    this.slideImage.forEach((img, i) => {
      img.style.left = i * 100 + "%";
    });
  
    this.slideImage[0].classList.add("active");
  
    this.createNavigationDots();
    this.initiate_buttons();
  }

  
  createNavigationDots() {
    for (let i = 0; i < this.numberOfImages; i++) {
      const dot = document.createElement("div");
      dot.classList.add(`${this.single_dot}`);
      this.navigationDots.appendChild(dot);
  
      dot.addEventListener("click", () => {
        this.goToSlide(i);
      });
    }
  
    this.navigationDots.children[0].classList.add("active");
  }
  
  move_next_slide(){
    if (this.currentSlide >= this.numberOfImages - 1) {
      this.goToSlide(0);
      return;
    }
  
    this.currentSlide++;
    this.goToSlide(this.currentSlide);
  }

  initiate_buttons(){
    this.nextBtn.addEventListener("click", () => {
      if (this.currentSlide >= this.numberOfImages - 1) {
        this.goToSlide(0);
        return;
      }
      clearInterval(this.auto_slide);
      this.currentSlide++;
      this.goToSlide(this.currentSlide);
    });
    
    // Previous Button
    
    this.prevBtn.addEventListener("click", () => {
      if (this.currentSlide <= 0) {
        this.goToSlide(this.numberOfImages - 1);
        return;
      }
      clearInterval(this.auto_slide);
      this.currentSlide--;
      this.goToSlide(this.currentSlide);
    });
    
    this.auto_slide=setInterval(() => {
      this.move_next_slide();
    }, this.auto_interval_time*1000);
  }



  init_injection(){

    var style=`
      <style>
      .${this.container_class_name}{
        height: 500px;
        transition: 900ms cubic-bezier(0.48, 0.15, 0.18, 1);
        position: relative;
      
      }
      
      .${this.slideImage_name}{
        height: 100%;
        width: 100%;
        position: absolute;
      }
      
      .${this.slideImage_name} img{
        width: 100%;
        height: 100%;
        object-fit: cover;
      }
    
      .${this.next_but_name} , 
      .${this.prev_but_name}{
        background: #eee;
        padding: 16px;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        font-size: 20px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.6);
        z-index: 100;
        cursor: pointer;
        transition: 400ms;
        opacity:0.4;
      }
      
      .${this.next_but_name}:hover,
      .${this.prev_but_name}:hover {
        opacity:0.8;
      }
      
      .${this.prev_but_name} {
       
        left: 0;
      }
      
      .${this.next_but_name} {
        right: 0;
      }

      .${this.nav_name} {
        display: flex;
        height: 32px;
        align-items: center;
        justify-content: center;
        margin: 16px 0;
        z-index:200;
        
      }

      .${this.single_dot} {
        background: #333;
        height: 8px;
        width: 8px;
        border: 2px solid #262626;
        border-radius: 50%;
        margin: 0 8px;
        cursor: pointer;
        transition: 400ms;
      }
      
      .${this.single_dot}.active {
        background: #eee;
      }
      
      </style>

    `
    var image_data=``;
    for(var i=0;i<this.image_arr.length;i++){

      image_data+=`

        <div class="${this.slideImage_name}">

          ${this.image_arr[i]}

        </div>
      
      `
    }

    this.wrap_elem.innerHTML=`
      <div class="${this.prev_but_name}"><i class="fas fa-chevron-left"></i></div>
      <div class="${this.container_class_name}">
        
        ${image_data}

      </div>
      <div class="${this.next_but_name}"><i class="fas fa-chevron-right"></i></div>
      <div class="${this.nav_name}"></div>
      ${style}
    `


  }

 goToSlide(slideNumber) {

    this.slidesContainer.style.transform =
      "translateX(-" + (this.slideWidth * slideNumber) + "px)";
  
    this.currentSlide = slideNumber;
  
    this.setActiveClass();
  }
  
  // Set Active Class
  
 setActiveClass() {
    // Set active class for Slide Image
  
    let currentActive = document.querySelector(`.${this.slideImage_name}.active`);
    currentActive.classList.remove("active");
    this.slideImage[this.currentSlide].classList.add("active");
  
      // set active class for navigation dots
  
    let currentDot = document.querySelector(`.${this.single_dot}.active`);
    currentDot.classList.remove("active");
    this.navigationDots.children[this.currentSlide].classList.add("active");
  }

  resize(){
    this.slideWidth = this.slideImage[0].clientWidth;

  }

  kill_all_intervals(){
    clearInterval(this.auto_slide);

  }

}


// all instantiations go here
//-----------------------------

var image_arr_1=[
  `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
    <div>
      Mr. V. A. Thomas, Deputy Director (Retired), ISRO Satellite Centre, Bangalore<br><br>
      Bsc.Engg. Mechanical - 1967<br><br>
      Topic: “My Past and Your Future”
    </div>
  </div>
   `,
   `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
     <div>
     <center>
      Dr. Kallol Roy, Chairman and MD of Bhavini (A Govt. of India Enterprise under Dept. of Atomic Energy)<br><br>
      B.Tech Electrical and Electronics Engineering - 1984<br><br>
      Topic: “Opportunities and Challenges of the Engineering Profession”     
     </center>
     </div>
   </div>
    `,
    `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
      <div>
        <center>
          Mr.Alok Ranjan Tripathy, Senior Director in IT sales in Infosys, UK<br><br>
          B.Tech in Electrical and Electronics Engineering – 1994<br><br>
          Topic: “Are You Born to Lead”
        </center>
      </div>
    </div>
     `,
     `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
       <div>
        <center>
          Air Commodore T.T.Job, Indian Air Force<br><br>
          BSc.Engg. Mechanical – 1967<br><br>
          Topic: “How the Brain is Similar to a Computer”
        </center>
       </div>
     </div>
      `,
      `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
        <div>
          <center>
            Dr. Tomy Sebastian, Director; Motor Drive Systems, Halla Mechatronics, Bay City, Michigan, United States<br><br>
            B.Tech Electrical Engineering - 1978<br><br>
            Topic: “State of the Art in Electric/Autonomous Vehicles”     
          </center>   
        </div>
      </div>
       `,
       `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
         <div>
          <center>
            Mr. P M Sugathan, Rtd. Additional General Manager (Operation Services), NTPC, Noida<br><br>
            B.Tech Mechanical Engineering in 1984.<br><br>
            Topic: “Thermal Power Plants: State of the Art and Future”
          </center>
         </div>
       </div>
        `

];

var image_arr_2=[
  ` <img src="/images/img_10.jpg" alt="" />`,
  ` <img src="/images/img_9.jpg" alt="" />`,
  ` <img src="/images/img_8.jpg" alt="" />`,
  ` <img src="/images/img_7.jpg" alt="" />`,
  ` <img src="/images/img_6.jpg" alt="" />`,

];

var dat_ar=[
  `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
    <div>
     <center>
     1.     Prof. A. O. Kunjipaulo<br><br>
     2.     Class of 1992 Computer Engineering Alumni<br><br>
     3.     RECCAA, Singapore<br><br>
     4.     RECCAA, USA<br><br>
     5.     RECCAA, Bahrain<br><br>
     6.     REC 1st Batch<br><br>
     7.     RECCAA, Mumbai<br><br>    
     </center>
    </div>
  </div>`,
  `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
    <div>
     <center>

     8.     CSAI (Class of 2000) <br><br>
     9.     REC 76 – 81 Batch<br><br>
     10.  10 years of XXXII Batch (CREC 96)<br><br> 
     11.  REC Calicut 1982 Batch<br><br>
     12.  NITC (REC) 1983 Batch<br><br>
     13.  REC Calicut, Class of ’84<br><br>
     14.  CREC 80-85 Batch    <br><br>
     </center>
    </div>
  </div>`,
  `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
    <div>
     <center>
     15.  Padmanabhan in Memory of All Departed Souls of 77 Batch, CREC<br><br>
     16.  Capt. Mohammed Memorial Endowment<br><br>
     17.  Nitin Sharma Memorial Endowment<br><br>
     18.  1997-2001 CSE B.Tech. Batch <br><br>
     20.  Joseephus MT, John Sebastian & Luthufi K T  Memorial  2004-08 Batch <br><br>
     21.  1984-88 Batch of CREC/NITC    <br><br>
     </center>
    </div>
  </div>`,
  `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
    <div>
     <center>
     22.  Sainadhan M.S (1983-87 Batch) Memorial Endowment<br><br>
     23.  1986-90 Batch of CREC/NITC<br><br>
     24.  1987-1991 Batch of CREC/NITC<br><br>
     25.  1971 CREC batch<br><br>
     26.  1988-1992 Batch of CREC/NITC<br><br> 
     27.  1989-1993 Batch of CREC/NITC <br><br>
     28.  Deepak Venugopal Memorial      <br><br>
     </center>
    </div>
  </div>`,

]

var dat_ar_i=[
  `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
    <div>
      University of Toledo, USA
    </div>
  </div>
   `,
   `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
     <div>
     <center>
      Missouri State University, USA 
     </center>
     </div>
   </div>
    `,
    `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
      <div>
        <center>
          National University of Ireland
        </center>
      </div>
    </div>
     `,
     `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
       <div>
         <center>
           University College Cork, Cork, Ireland
         </center>
       </div>
     </div>
      `,
     `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
       <div>
        <center>
          University of Shanghai for Science and Technology Shanghai, China
        </center>
       </div>
     </div>
      `,
      `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
        <div>
         <center>
          School of Energy and Power Engineering, Shanghai, China
         </center>
        </div>
      </div>
       `,
      `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
        <div>
          <center>
            University of Pitsberg, Mechanical Engineering and Materials Science Department    
          </center>   
        </div>
      </div>
       `,
       `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
         <div>
          <center>
            Dong - A University, Nano-Thermal Laboratory Division of Mechanical Engineering
          </center>
         </div>
       </div>
        `,
        `<div style="height:100%;width:100%;align-items:center;justify-content:center;display:flex;">
          <div>
           <center>
            Michigan Technological University Houghton, Michigan U.S.A
           </center>
          </div>
        </div>
         `

];

// format
//--------
// content_slider(id_name,html_array,auto_slide_interval_sec)

var instantiation_dict={};

var c_slider_1=new content_slider('wrapper',image_arr_1,3);

var c_slider_2=new content_slider('wrapper-2',dat_ar,4);
var c_slider_3=new content_slider('wrapper-3',dat_ar_i,3.5);
var c_slider_4=new content_slider('wrapper-4',image_arr_2,2.5);

function instantiate_class(id_name){
    // create a new slider and store it in a dictionary
    console.log("instantiating");
    instantiation_dict[id_name]=new content_slider(id_name,image_arr_2,2.5); 

}

function kill_all_view_intervals(id_name){

  if(id_name!=null){
    console.log("killing");
    var slider=instantiation_dict[id_name];
    slider.kill_all_intervals();
    delete slider;  // destroy the slider of current view
  }

}