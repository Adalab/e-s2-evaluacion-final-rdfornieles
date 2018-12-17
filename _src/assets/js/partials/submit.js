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
        console.log(data.name);
    })
}

btnEl.addEventListener('click', handlerSearch);