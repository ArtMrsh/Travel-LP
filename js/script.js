window.onload = function () {
   var menuBtn = document.querySelector(".hamburger"),
       menuList = document.querySelector('.navigation');

   function showNav() {
      menuList.classList.toggle("show_navigation")
   }
   menuBtn.addEventListener("click", showNav)

   // SCROLL-TO-TOP BUTTON SHOWING
   var topBtn = document.querySelector('.to-top-btn')
   window.addEventListener("scroll", btnShowing);

   function btnShowing() {
       var scrollToTop = window.pageYOffset;
       if (scrollToTop >= 100) {
           topBtn.classList.add("show_topBtn");
       } else if (scrollToTop <= 100) {
           topBtn.classList.remove("show_topBtn")
       }
   }

   // ADDING ACTIVE CLASS
   elems = document.getElementsByClassName("menu_link");

   makeActive = function () {
       for (var i = 0; i < elems.length; i++) {
          elems[i].classList.remove('active');
          this.classList.add('active');
       }
   };

   for (var i = 0; i < elems.length; i++)
       elems[i].addEventListener('mousedown', makeActive);
}

// AJAX Request
document.getElementById('contacts__form').addEventListener('submit', function(evt){
  var http = new XMLHttpRequest(), f = this;
  evt.preventDefault();
  http.open("POST", "mail.php", true);
  http.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  http.send("name=" + f.nameF.value + "&email=" + f.email.value +"&subject=" + f.subject.value + "&message=" + f.message.value);
  http.onreadystatechange = function() {
    if (http.readyState == 4 && http.status == 200) {
      alert(http.responseText + 'Ваше сообщение получено!');
      f.message.removeAttribute('value');
      f.message.value='';
      f.nameF.removeAttribute('value');
      f.nameF.value='';
      f.email.removeAttribute('value');
      f.email.value='';
      f.subject.removeAttribute('value');
      f.subject.value='';
    }
  }
  http.onerror = function() {
    alert('Извините, данные не были переданы');
  }
}, false);

// SMOOTH SCROLLING INITIALIZE
function currentYPosition() {
    // Firefox, Chrome, Opera, Safari
    if (self.pageYOffset) return self.pageYOffset;
    // Internet Explorer 6 - standards mode
    if (document.documentElement && document.documentElement.scrollTop)
        return document.documentElement.scrollTop;
    // Internet Explorer 6, 7 and 8
    if (document.body.scrollTop) return document.body.scrollTop;
    return 0;
}

function elmYPosition(eID) {
    var elm = document.getElementById(eID);
    var y = elm.offsetTop;
    var node = elm;
    while (node.offsetParent && node.offsetParent != document.body) {
        node = node.offsetParent;
        y += node.offsetTop;
    }
    return y;
}


function smoothScroll(eID) {
    var startY = currentYPosition();
    var stopY = elmYPosition(eID);
    var distance = stopY > startY ? stopY - startY : startY - stopY;
    if (distance < 100) {
        scrollTo(0, stopY);
        return;
    }
    var speed = Math.round(distance / 100);
    if (speed >= 20) speed = 20;
    var step = Math.round(distance / 40);
    var leapY = stopY > startY ? startY + step : startY - step;
    var timer = 0;
    if (stopY > startY) {
        for (var i = startY; i < stopY; i += step) {
            setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
            leapY += step;
            if (leapY > stopY) leapY = stopY;
            timer++;
        }
        return;
    }
    for (var i = startY; i > stopY; i -= step) {
        setTimeout("window.scrollTo(0, " + leapY + ")", timer * speed);
        leapY -= step;
        if (leapY < stopY) leapY = stopY;
        timer++;
    }
}
var elems, makeActive;



elems = document.querySelectorAll(".menu_link");

makeActive = function () {
    for (var i = 0; i < elems.length; i++)
        elems[i].classList.remove('active');

    this.classList.add('active');
};

for (var i = 0; i < elems.length; i++)
    elems[i].addEventListener('mousedown', makeActive);
