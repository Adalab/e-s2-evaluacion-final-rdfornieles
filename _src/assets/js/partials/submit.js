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
            //const itemDataImageO = itemData.show.image.original;
            listEl.innerHTML += `<img src="${itemDataImageM}" alt="Imagen de la serie"></img><li class="listEl"> ${itemDataName} </li>`;
        }
    })
}

btnEl.addEventListener('click', handlerSearch);