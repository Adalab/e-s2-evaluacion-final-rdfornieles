const btnEl = document.querySelector(".btn");

const input = document.querySelector("#searchTv");

const list = document.querySelector(".list");

function handlerSearch(event){
    const inputEl = input.value;
    event.preventDefault();

    fetch(` http://api.tvmaze.com/search/shows?q=${inputEl}`)
    .then(function(response) {
        return response.json();
      })
    .then(function(data) {
        //console.log(data);
        
        for ( const itemData of data) {
            const itemDataName = itemData.show.name;
            let itemDataImage = itemData.show.image;
            
            const imageNull = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
            
            if (itemDataImage === null) {
                itemDataImage = imageNull
            } else {
                itemDataImage = itemData.show.image.medium
            }

            list.innerHTML += `<li class="li-el"><img src="${itemDataImage}" alt="Imagen de la serie"></img> <p class=text>${itemDataName}</p> </li>`;

            const listEl = document.querySelectorAll(".li-el");
            console.log(listEl);

            //esta funciona pero solo selecciona el primer Li
            /*function favoriteShow() {
            //listEl = event.target;
            listEl.classList.toggle("favorite");
   
    }
        list.addEventListener('click', favoriteShow);*/

           function favoriteShow() {
                
               for (let i = 0;i < NodeList.length; i++) {
                listEl.classList.toggle("favorite");
               }
        }
        list.addEventListener('click', favoriteShow);
        
        }
    
    })
    
}

// esta funciona pero me selecciona todo lo que pincho
/*function favoriteShow(event) {
    const selectFavorite = event.currentTarget;
    selectFavorite.classList.toggle("favorite");
   
}
list.addEventListener('click', favoriteShow);*/

btnEl.addEventListener('click', handlerSearch);


/*function printLocalStorage() {
    localStorage.setItem(itemData.show.id);
}
printLocalStorage();*/