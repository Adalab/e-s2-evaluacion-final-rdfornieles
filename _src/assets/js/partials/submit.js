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
            console.log(itemDataId);
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
            localStorage.setItem(itemsList.id, "cualquier cosa")
        }

        for (const itemsList of listEl) {
            itemsList.addEventListener('click', favoriteShow);
        }
        
        //let favoriteArr = [];

        /*function saveId(){
        localStorage.setItem("itemsDataId", "cualquier cosa");

        }
        
        for (items of itemDataId) {
        items.addEventListener('click', saveId);
        }*/
    })
    
}



btnEl.addEventListener('click', handlerSearch);


/*function printLocalStorage() {
    localStorage.setItem(itemData.show.id);
}
printLocalStorage();*/