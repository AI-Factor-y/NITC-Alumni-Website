

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


}


// all instantiations go here
//-----------------------------

var image_arr_1=[
  ` <img src="/images/img_6.jpg" alt="" />`,
  ` <img src="/images/img_7.jpg" alt="" />`,
  ` <img src="/images/img_8.jpg" alt="" />`,
  ` <img src="/images/img_9.jpg" alt="" />`,
  ` <img src="/images/img_10.jpg" alt="" />`,

];

var image_arr_2=[
  ` <img src="/images/img_10.jpg" alt="" />`,
  ` <img src="/images/img_9.jpg" alt="" />`,
  ` <img src="/images/img_8.jpg" alt="" />`,
  ` <img src="/images/img_7.jpg" alt="" />`,
  ` <img src="/images/img_6.jpg" alt="" />`,

];


// format
//--------
// content_slider(id_name,html_array,auto_slide_interval_sec)

var c_slider_1=new content_slider('wrapper',image_arr_1,3);



var c_slider_2=new content_slider('wrapper-2',image_arr_2,4);
var c_slider_3=new content_slider('wrapper-3',image_arr_1,3.5);
var c_slider_4=new content_slider('wrapper-4',image_arr_2,2.5);