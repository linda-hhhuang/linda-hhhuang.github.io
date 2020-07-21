const displayedImage = document.querySelector('.displayed-img');
const thumbBar = document.querySelector('.thumb-bar');

const btn = document.querySelector('button');
const overlay = document.querySelector('.overlay');

/* Looping through images */

for (let i = 1; i < 6; i++) {
    const newImage = document.createElement('img');
    let srcString = 'images/pic' + i + '.jpg';
    newImage.setAttribute('src', srcString);
    thumbBar.appendChild(newImage);
    newImage.onclick = function() {
        displayedImage.setAttribute('src', srcString);
    }
}

/* Wiring up the Darken/Lighten button */

btn.onclick = function() {
    let btnClassName = btn.getAttribute('class');

    if (btnClassName === 'dark') {
        btn.setAttribute('class', 'light');
        btn.textContent = 'Lighten';
        overlay.style.backgroundColor = 'rgba(0,0,0,0.5)';
    } else if (btnClassName === 'light') {
        btn.setAttribute('class', 'dark');
        btn.textContent = 'Darken';
        overlay.style.backgroundColor = 'rgba(0,0,0,0)';
    }
}