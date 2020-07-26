const inp = document.querySelector('input');
const ul = document.querySelector('ul');
const divlist = document.querySelector('.list');
const divload = document.querySelector('.load');

inp.oninput = function() {

    divlist.setAttribute('class', 'loadlist');

    let load = document.createElement('span');
    if (!divload.firstChild) {
        load.textContent = 'Loading...';
        divload.appendChild(load);
    }
    let inputText = inp.value;
    console.log(inputText);
    setTimeout(searchfunction, 500);

    function searchfunction() {
        let re = 'https://swapi.dev/api/people/?search=' + inputText;
        fetch(re).then(function(response) {
            return response.json();
        }).then(function(json) {
            let products = json.results;
            initialize(products);
        }).catch(function(err) {
            console.log('Some wrong: ' + err.message);
        });

    };

    function initialize(json) {
        divload.removeChild(divload.firstChild);
        // console.log(json);
        let group = [];
        for (let i = 0; i < json.length; i++) {
            group.push(json[i].name);
        }

        while (ul.firstChild) {
            ul.removeChild(ul.firstChild);
        }
        for (let i = 0; i < json.length; i++) {
            let item = document.createElement('li');
            item.textContent = group[i];

            ul.appendChild(item);
        }
        divlist.setAttribute('class', '');
    }

};