const btnEl = document.querySelector(".btn");

const input = document.querySelector("#searchTv");

const listEl = document.querySelector(".list");

function handlerSearch(event){
    const inputEl = input.value;
    event.preventDefault();

    fetch(` http://api.tvmaze.com/search/shows?q=${inputEl}`)
    .then(function(response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data);
        
        for ( const itemData of data) {
            const itemDataName = itemData.show.name;
            const itemDataImageM = itemData.show.image.medium;
            const itemDataImageO = itemData.show.image.original;
            console.log(itemDataImageO);
            console.log(itemDataImageM);
            listEl.innerHTML += `<li class="listEl"> ${itemDataName} ${itemDataImageM} ${itemDataImageO}</li>`;
        }
    })
}

btnEl.addEventListener('click', handlerSearch);