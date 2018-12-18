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
            let itemDataId = itemData.show.id;
            //console.log(itemDataId);
            const imageNull = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';
            
            if (itemDataImage === null) {
                itemDataImage = imageNull
            } else {
                itemDataImage = itemData.show.image.medium
            }

            list.innerHTML += `<li class="li-el" id="${itemDataId}"><img src="${itemDataImage}" alt="Imagen de la serie"></img> <p class=text>${itemDataName}</p> </li>`;

        }

        const listEl = document.querySelectorAll(".li-el");
        //console.log(listEl);

        function favoriteShow(event) {
            const itemsList = event.currentTarget;
            itemsList.classList.toggle("favorite");

            let favoritesArr = [];
            favoritesArr[0] = itemsList.id;
            //console.log(favoritesArr);

            localStorage.setItem(itemsList.id, "Favorite Show");
            //console.log(itemsList.id);
            if (itemsList.classList.contains("favorite")) {
                localStorage.setItem(itemsList.id, "Favorite Show");
                favoritesArr = JSON.stringify(localStorage.getItem(itemsList.id));
            } else {localStorage.removeItem(itemsList.id, "Favorite Show")};
            
        }

        for (const itemsList of listEl) {
            itemsList.addEventListener('click', favoriteShow);
        }

        
        /*let favoritesArr = [];
        function keepFavLS() {
            
            const saveId = JSON.parse(localStorage.getItem(itemsList.id));
            console.log(favoritesArr);
            if (saveId) {
                favoritesArr = saveId;
            } 
        }
        window.addEventListener('load', keepFavLS);*/
        
    })
    
}



btnEl.addEventListener('click', handlerSearch);