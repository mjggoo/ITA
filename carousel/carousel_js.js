"use strict";

let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slides li");
let slideWidth = 320 , slideMargin = 30;
let currentIndex =0;
let slideCount = slide.length;
let btn  = document.querySelectorAll(".btn");

slides.style.width = slideWidth*3  + slideMargin*2 + "px";

function moveSlide(num){
    slides.style.left = -num * 350 + "px";
    currentIndex = num;
}
btn.addEventListener('click', function(){
    alert()
    moveSlide(currentIndex+1);
    
});