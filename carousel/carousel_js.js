"use strict";

let slides = document.querySelector(".slides");
let slide = document.querySelectorAll(".slides li");
let slideWidth = 320 , slideMargin = 30;
let currentIndex =0;
let slideCount = 3;
let btn = document.querySelectorAll(".btn_wrapper .btns .btn");
let i=0; 

for(i = 0; i < 3 ; i++){
    btn[i].addEventListener('click', function(){
        pageScroll(i);
    });
}

function pageScroll(i){
    if(i != currentIndex && i > currentIndex){
        moveSlide(currentIndex+1);
        console.log(i + "," + currentIndex)
    }
    else if(i != currentIndex && i < currentIndex){
        moveSlide(currentIndex-1);
        console.log(i + "," + currentIndex)
    }
    
}

function moveSlide(num){
    let move = 0;

    if(currentIndex < num){
        move = -num * 1050 + "px";
    }else{
        move = num * 1050 + "px";
    }
    slides.style.left = move;
    currentIndex = num;
}

// function pageScroll(i){
    
//     if(i != currentIndex){
//         if( currentIndex == 0 || currentIndex == 2){
//             currentIndex = 0;
//             moveSlide(currentIndex+1);
//         }else if( currentIndex == 1 || currentIndex == 2){
//             moveSlide(currentIndex+1);
//         }else{
//             moveSlide(currentIndex+1);
//         }
//     }
// }

// function moveSlide(num){
//     if(num == 0){
//         slides.style.left = 0+ "px";
//         currentIndex = num;
//     }
//     else if(num == 1){
//         slides.style.left = -1050+ "px";
//         currentIndex = num;
//     }
//     else if(num == 2){
//         slides.style.left = -2100 + "px";
//         currentIndex=num;
//     }
//     console.log("num = " + num + " , " + "currentIndex= " + currentIndex  )
// }

    
