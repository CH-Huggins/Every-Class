"use strict";

function openNav() {
    document.getElementById("nav").style.width = "15%";
    document.getElementById("main").style.marginLeft = "15%";
    document.body.style.transition = ".5s ease-in-out;"
  }
  
  function closeNav() {
    document.getElementById("nav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.transition = ".5s ease-in-out;"
  }