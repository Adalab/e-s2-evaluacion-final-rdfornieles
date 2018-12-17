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
            let itemDataImage = itemData.show.image;

            const imageNull = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
            
            if (itemDataImage === null) {
                itemDataImage = imageNull
            } else {
                itemDataImage = itemData.show.image.medium
            }

            listEl.innerHTML += `<li class="liEl"><img src="${itemDataImage}" alt="Imagen de la serie"></img> ${itemDataName} </li>`;
        }
        

    })
    

}
function favoriteShow(event) {
    const selectFavorite = event.currentTarget;
    selectFavorite.classList.toggle("favorite");

   
}
btnEl.addEventListener('click', handlerSearch);
listEl.addEventListener('click', favoriteShow);

/*function printLocalStorage() {
    localStorage.setItem(itemData.show.id);
}
printLocalStorage();*/