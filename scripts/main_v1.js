let myImage = document.querySelector('img');

myImage.onclick = function() {
    let mySrc = myImage.getAttribute('src');
    if(mySrc === 'images/xiaoxin.jpg') {
      myImage.setAttribute('src', 'images/xiaoxin2.jpg');
    } else {
      myImage.setAttribute('src', 'images/xiaoxin.jpg');
    }
}

let myButton = document.querySelector('button');
let myHeading = document.querySelector('h1');

function setUserName() {
    let myName = prompt('请输入你的名字。');
    if(!myName || myName === null) {
      setUserName();
    } else {
      localStorage.setItem('name', myName);
      myHeading.innerHTML = myName+'是最~棒的';
    }
  }
if(!localStorage.getItem('name')) {
    setUserName();
  } else {
    let storedName = localStorage.getItem('name');
    myHeading.textContent =  storedName +' 是最~棒的';
}
myButton.onclick = function() {
    setUserName();
 }