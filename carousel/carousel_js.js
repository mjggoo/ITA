"use strict";

let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slides li");
let slideWidth = 320 , slideMargin = 30;
let currentIndex =0;
let slideCount = 3;
let btn = document.getElementsByClassName("btn");
let i=0; 

    btn[0].style.backgroundColor="transparent";

    btn[0].addEventListener('click', function(){
        pageScroll(0);
        
        btn[0].style.backgroundColor="transparent";
        btn[1].style.backgroundColor="#30598b";
        btn[2].style.backgroundColor="#30598b";
    });
    btn[1].addEventListener('click', function(){
        pageScroll(1);

        btn[0].style.backgroundColor="#30598b";
        btn[1].style.backgroundColor="transparent";
        btn[2].style.backgroundColor="#30598b";
    });

    btn[2].addEventListener('click', function(){
        pageScroll(2);

        btn[0].style.backgroundColor="#30598b";
        btn[1].style.backgroundColor="#30598b";
        btn[2].style.backgroundColor="transparent";
    });

    function pageScroll(i){
        if( currentIndex !=i ){
            slides.style.left = i * (-1050) + "px";
            currentIndex = i;
        }
    }

