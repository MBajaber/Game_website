    // get Color From Local Storage 

    let mainColor = localStorage.getItem("color-option");

    if(mainColor != null) {
        document.documentElement.style.setProperty("--main-color",mainColor);
        // Remove Class Active 
        document.querySelectorAll(".color-list li").forEach(ele => {
            ele.classList.remove("active");
            // Add Class Active 
            if(ele.dataset.color === mainColor){
                ele.classList.add("active");
            }
        });
    }

    // Define Background 

    let backgroundOption = true;
    let intervalBackground;


    // Get Background From Local Storage 

    backgroundLocal = localStorage.getItem("background-option");

    if (backgroundLocal != null) {
        
        document.querySelectorAll(".random-background span").forEach(ele => {
            ele.classList.remove("active");

            if (ele.dataset.background === backgroundLocal) {

                ele.classList.add("active");
            }

            if(backgroundLocal === "yes") {
                backgroundOption = true;
            } else {
                backgroundOption = false;
            }

        });
    }

    // Get Bullet Option From Local Storage 

    let bulletOption = localStorage.getItem("bullet-option");

    if(backgroundOption != null) {

        document.querySelectorAll(".show-bullet span").forEach(ele => {
            ele.classList.remove("active");

            if(bulletOption === "hide") {
                document.querySelector(".bullets-box").style.display = "none";
                document.querySelector(".show-bullet .no").classList.add("active");
                
            } else {
                document.querySelector(".bullets-box").style.display = "block";
                document.querySelector(".show-bullet .yes").classList.add("active");
            }
        });
    };

    // Open Setting Box 
    document.querySelector(".setting-box .fa-cog").onclick = function() {

        this.classList.toggle("fa-spin");

        document.querySelector(".setting-box").classList.toggle("open");
    };

    // Click On Color Of Website 

    let colorLi = document.querySelectorAll(".color-list li");

    colorLi.forEach(li => {

        li.addEventListener("click", function(e){

            document.documentElement.style.setProperty("--main-color", e.target.dataset.color);

            localStorage.setItem("color-option",e.target.dataset.color);

            // Remove Class Active
            e.target.parentElement.querySelectorAll(".active").forEach(ele => {
                ele.classList.remove("active");
            });
            
            // Add Class Active
            e.target.classList.add("active");
        });
    });

    // Change Background 

    let landing = document.querySelector(".landing");

    let arrayImage = ["ez1.jpg", "ez2.jpg", "ez3.jpg", "ez4.jpg", "ez5.jpg"];

    function randomImage() {

        if(backgroundOption === true) {
            
            intervalBackground = setInterval(function(){
                let random = Math.floor (Math.random() * arrayImage.length);
                landing.style.backgroundImage = "url('img/" + arrayImage[random] +"')"    
            },10000);
        }
    }

    randomImage();

    let randomBackground = document.querySelectorAll(".random-background span");

    randomBackground.forEach(ele => {

        ele.addEventListener("click", function (e){

            e.target.parentElement.querySelectorAll(".active").forEach(e => {
                e.classList.remove("active");
            });

            e.target.classList.add("active");

            if(e.target.dataset.background === "yes") {
                backgroundOption = true;
                randomImage()
                localStorage.setItem("background-option",e.target.dataset.background)
            
            } else {
                
                backgroundOption = false;
                clearInterval(intervalBackground);

                localStorage.setItem("background-option",e.target.dataset.background)
            }
        });
    });

    // // Bullet Option 

    let showBullet = document.querySelectorAll(".show-bullet span");
    let bulletParent = document.querySelector(".bullets-box");

    showBullet.forEach(ele => {
        ele.addEventListener("click", function(e){
            e.target.parentElement.querySelectorAll(".active").forEach(element => {
                element.classList.remove("active");
            });
            e.target.classList.add("active");

            if(e.target.dataset.bullet === "block") {
                bulletParent.style.display = "block";
                localStorage.setItem("bullet-option",e.target.dataset.bullet)
            
            } else {
                bulletParent.style.display = "none";
                localStorage.setItem("bullet-option",e.target.dataset.bullet)
            }
        });
    });


    document.querySelector(".reset-option").onclick = function(){
        localStorage.removeItem("color-option");
        localStorage.removeItem("bullet-option");
        localStorage.removeItem("background-option");
        window.location.reload();
    };

    // Show Progress bar On Scroll 

    let skills = document.querySelector(".skills")

    window.onscroll = function(){
        // Skill Place On Top 
        let skillTop = skills.offsetTop;
        // Skill All Height 
        let skillHeight = skills.offsetHeight
        // Window Screen Height 
        let windowHeight = this.innerHeight
        // Window Screen Y on Paage
        let windowY = this.pageYOffset

        if(windowY > (skillTop + skillHeight - windowHeight - 100)){
            document.querySelectorAll(".skills .skills-box .skill-progress span").forEach(ele => {
                ele.style.width = ele.dataset.progress
            });
        }
    };


    // Show Popup When Click On Image on Gallery

    let galleryImgs = document.querySelectorAll(".gallery .images-box img");
    // Create Popup Parent 
    galleryImgs.forEach(img => {
        img.addEventListener("click", (e) => {
            let overlay = document.createElement("div");
            overlay.className = "popup";
            document.body.appendChild(overlay);
            // Create Popup Box In Popup Parent
            let popupBox = document.createElement("div");
            popupBox.className = "popup-box";
            overlay.appendChild(popupBox);
            // Create Title From Image alt In Popup Box
            if (img.alt != null) {
                let createHeading = document.createElement("h3");
                let text = document.createTextNode(img.alt);
                createHeading.appendChild(text);
                popupBox.appendChild(createHeading);
            }
            // Create Image In Popup Box
            let createImg = document.createElement("img");
            createImg.src = img.src;
            popupBox.appendChild(createImg);
            // Create close Button In Popup Box
            let closeBtn = document.createElement("button");
            closeBtn.className = "close-btn";
            let CloseBtnText = document.createTextNode("X");
            closeBtn.appendChild(CloseBtnText);
            popupBox.appendChild(closeBtn);
        })
    });

    // Remove Popup Parent On Click Close Button 
    document.addEventListener("click", e => {
        if (e.target.className === "close-btn") {
            e.target.parentElement.remove();
            document.querySelector(".popup").remove();
        }
        // Remove Popup Parent On Click Popup Parent 
        if (e.target.className === "popup") {
            e.target.remove();
        }

        // Scroll The Page When Click In Bullet Element 
        if(e.target.className === "bullet") {
            document.querySelector("." + e.target.dataset.section).scrollIntoView({
                behavior: "smooth"
            });
        }
    });

    // Remove Popup Parent On Click On Keyborad Escape key (Esc)
    window.onkeydown = function(e){
        let escCode = e.keyCode || e.which;
        if (document.querySelector(".popup") !== null){
            if (escCode === 27 ){
                document.querySelector(".popup").remove();
            }
        }
    };

    let links = document.querySelectorAll(".links li a");
     
    // Scroll The Page When Click In Any Element 
    scrollSomeWhere(links);

    // Create Bullet In Side Bullet Box 
    links.forEach(link => {
        let bullet = document.createElement("div");
        bullet.className = "bullet";
        bullet.setAttribute("data-section", link.dataset.section);
        let showMsg = document.createElement("div");
        showMsg.className = "show-msg";
        let bulletText = document.createTextNode(link.textContent);
        showMsg.appendChild(bulletText);
        bullet.appendChild(showMsg);
        document.querySelector(".bullets-box").appendChild(bullet);
        
        // when you Click On Link li 
        link.addEventListener("click", function() {
            document.querySelector(".links").style.display = "none"
        });
    });

    function scrollSomeWhere(elements) {
        elements.forEach(ele => {
            ele.addEventListener("click", (e) => {
                e.preventDefault();
                document.querySelector("." + e.target.dataset.section).scrollIntoView({
                    behavior: "smooth"
                });
            });
        });
    };

    // Click on Toggle Bar

    let toggleBar = document.querySelector(".toggle-menu");

    toggleBar.onclick = function () {

        let link = document.querySelector(".links");

        link.style.display = "block";
    }
