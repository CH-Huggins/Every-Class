"use strict";

function openNav() {
    document.getElementById("nav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
    document.body.style.transition = ".5s ease-in-out;"
  }
  
  function closeNav() {
    document.getElementById("nav").style.width = "0";
    document.getElementById("main").style.marginLeft= "0";
    document.body.style.transition = ".5s ease-in-out;"
  }