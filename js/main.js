let allLies = document.querySelectorAll(".setting-box .box ul li") ;
let localColor = localStorage.getItem("color_options") ;
let localOpacity = localStorage.getItem("color_opacity") ;
let groundElements = document.querySelectorAll(".setting-box .random span") ;

let about_img = document.querySelector(".about .about-img img") ;
let localAboutImg = localStorage.getItem("about-src") ;

let skills_img = document.querySelector(".skills .skills-img") ;
let localSkillsImg = localStorage.getItem("skills-src") ;

let navbar = document.querySelector(".navbar") ;
// ----------------------------------------------------------------------------------

// open and close setting box
document.querySelector(".setting-box-icon").addEventListener("click" , ()=>{
    document.querySelector(".setting-box").classList.toggle("open") ;
    document.querySelector(".setting-icon").classList.toggle("fa-spin") ;
}) ;

// ----------------------------------------------------------------------------------



// to set localstorage's options
if(localColor !== null && localOpacity !== null && localAboutImg !== null  && localSkillsImg !== null ){
    document.documentElement.style.setProperty("--main-color" , localColor) ;
    document.documentElement.style.setProperty("--main-color-opacity" , localOpacity) ;
    about_img.setAttribute("src" ,localAboutImg ) ;
    skills_img.setAttribute("src" , localSkillsImg) ;

    allLies.forEach(rem =>{
        rem.classList.remove("active") ;
        if(rem.dataset.color === localColor){
            rem.classList.add("active");
        };
    });
};

// loop on all lies of colors elements
allLies.forEach(li=>{
    // to change the main color on root of page
    li.addEventListener("click" , (e)=>{
        document.documentElement.style.setProperty("--main-color" , e.target.dataset.color) ;
        localStorage.setItem("color_options" , e.target.dataset.color) ;

        document.documentElement.style.setProperty("--main-color-opacity" , e.target.dataset.opacity) ;
        localStorage.setItem("color_opacity" , e.target.dataset.opacity) ;

        about_img.setAttribute("src" , e.target.dataset.aboutsrc) ;
        localStorage.setItem("about-src" , e.target.dataset.aboutsrc) ;

        skills_img.setAttribute("src" , e.target.dataset.skillssrc) ;
        localStorage.setItem("skills-src" , e.target.dataset.skillssrc) ;
        // to remove and add the active class of lies colors

        // allLies.forEach(re =>{
        //     re.classList.remove("active") ;
        // });
        // li.classList.add("active") ;
        removeStatus(e);
    });
});


function removeStatus(ev){
    ev.target.parentElement.querySelectorAll(".active").forEach(re =>{
        re.classList.remove("active") ;
    });
    ev.target.classList.add("active") ;
}

// --------------------------------------------------------------------------------

// variable to clearInterval
let backgroundInterval ;
// function of randam backgrounds
function randmizeIMG(){
    let imgArray = ["1.jpg" , "2.jpg" , "3.jpg" ,"4.jpg" , "5.jpg"] ;
    backgroundInterval = setInterval(()=>{
        let randomNumber = Math.floor(Math.random() * imgArray.length) ;
        document.querySelector(".landing").style.backgroundImage = `url(images/${imgArray[randomNumber]})`
        
    },2000);
};
// call background's function
randmizeIMG() ;

// loop on the two spans of background options
groundElements.forEach(span =>{
    span.addEventListener("click" , (e)=>{
        // to remove and add the active class of spans

        // groundElements.forEach(re =>{
        //     re.classList.remove("active") ;
        // });
        // span.classList.add("active") ;
        removeStatus(e);
        // to set and clear the interval of background
        if(e.target.dataset.background === "yes"){
            randmizeIMG() ;
        }else{
            clearInterval(backgroundInterval) ;
        };
    });
});
// ---------------------------------------------------------------------
// nav-bullets
let navLinks = document.querySelectorAll(".navbar .nav-item a") ;
let navBullets = document.querySelectorAll(".nav-bullets .bullet") ;

function scrollToAnyWhere(elements){
    // console.log(navBullets) ;
    elements.forEach((el)=>{
        el.addEventListener("click" , (e)=>{
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior : 'smooth' ,
            }) ;
        }) ;
    }) ;
} ;
scrollToAnyWhere(navLinks);
scrollToAnyWhere(navBullets);

let bulletsContainer = document.querySelector(".nav-bullets") ;
let bulletSpan = document.querySelectorAll(".setting-box .bullets-options span")
console.log(bulletSpan)

bulletSpan.forEach((span)=>{
    span.addEventListener("click" , (e)=>{
        if(span.dataset.display === "show"){
            bulletsContainer.style.display = "block"
        }else{
            bulletsContainer.style.display = "none"
        }
        removeStatus(e) ;
    })
})


// ------------------------------------------------------------------------------
// skills section
let skills = document.querySelector(".skills") ;
window.onscroll = function(){
    let skillsOfsetTop = skills.offsetTop ;
    let skillsOuterHeight = skills.offsetHeight ;
    let windowHeight = this.innerHeight ;
    let windowScrollTop = this.pageYOffset ;
    if (windowScrollTop > (skillsOfsetTop + skillsOuterHeight - windowHeight)){
        let allSkillsBar = document.querySelectorAll(".skills .progress-box .progress-item .bar-item ") ;
        allSkillsBar.forEach(skill =>{
            skill.style.width = skill.dataset.progress ;
        }) ;
    } ;
};
// --------------------------------------------------------------------------------

// gallary section
let galaryImg =Array.from(document.querySelectorAll(".gallary .gallary-content img")) ;
let lightBox = document.querySelector(".gallary .light-box") ;
let lightBoxContent = document.querySelector(".gallary .light-box-content") ;
let close = document.querySelector(".gallary .close") ;
let next = document.querySelector(".gallary .light-box .right") ;
let prev = document.querySelector(".gallary .light-box .left") ;
let currentImgIndex = 0 ;


galaryImg.forEach((el)=>{
    el.addEventListener("click", (e)=>{
        let srcImg = e.target.getAttribute("src") ;
        currentImgIndex = galaryImg.indexOf(e.target) ;
        console.log(currentImgIndex) ;
        lightBox.classList.replace("d-none" , "d-flex");
        lightBoxContent.style.cssText = `background-image : url(${srcImg})` ;
    }) ;
}) ;

next.addEventListener("click" , ()=>{
    currentImgIndex ++ ;
    if(currentImgIndex == galaryImg.length){
        currentImgIndex = 0 ;
    } ;
    let srcImg = galaryImg[currentImgIndex].getAttribute("src") ;
    lightBoxContent.style.cssText = `background-image : url(${srcImg})` ;
}) ; 

prev.addEventListener("click" , ()=>{
    currentImgIndex --  ;
    if(currentImgIndex < 0){
        currentImgIndex = galaryImg.length -1 ;
    }
    let srcImg = galaryImg[currentImgIndex].getAttribute("src") ;
    lightBoxContent.style.cssText = `background-image : url(${srcImg})` ;
})


close.addEventListener("click" , ()=>{
    lightBox.classList.replace("d-flex" , "d-none") ;
}) ;

// ----video card validation-------------------------------------------------------

let nameInput = document.querySelector(".video .name") ;
let emailInput = document.querySelector(".video .email");
let textArea = document.querySelector(".video textarea") ;
let btnSubmit = document.querySelector(".video .form-card-btn");

btnSubmit.addEventListener("click" , ()=>{
    if(nameValidation() == true && emailValidation() == true){
        nameInput.classList.remove("is-valid") ;
        emailInput.classList.remove("is-valid") ;
        clearInputs() ;
    };
});

function nameValidation(){
    let reg = /^[A-Z][a-z]{3,}$/g;
    if(reg.test(nameInput.value) == true){
        nameInput.classList.replace("is-invalid" , "is-valid") ;
        return true;
    }else{
        nameInput.classList.add("is-invalid") ;
        return false;
    };
};

function emailValidation(){
    let reg = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/gi ;
    if(reg.test(emailInput.value) == true){
        emailInput.classList.replace("is-invalid" , "is-valid") ;
        return true ;
    }else{
        emailInput.classList.add("is-invalid") ;
        return false ;
    };
};

function clearInputs(){
    nameInput.value = "" ;
    emailInput.value = "" ;
    textArea.value = "" ;
};

// --------------------------------------------------------------------------------
