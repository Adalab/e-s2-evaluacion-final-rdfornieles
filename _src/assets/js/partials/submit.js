const btnEl = document.querySelector(".btn");

const input = document.querySelector("#searchTv");

const list = document.querySelector(".list");

const results = document.querySelector(".results");

function handlerSearch(event) {
    list.innerHTML = "";
    const inputEl = input.value;
    event.preventDefault();

    fetch(` http://api.tvmaze.com/search/shows?q=${inputEl}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            let totalData = data.length;

            for (const itemData of data) {
                const itemDataName = itemData.show.name;
                let itemDataImage = itemData.show.image;
                let itemDataId = itemData.show.id;
                let itemDataLanguage = itemData.show.language;
                
                console.log(data);
                const imageNull = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

                if (itemDataImage === null) {
                    itemDataImage = imageNull
                } else {
                    itemDataImage = itemData.show.image.medium
                }
                
                list.innerHTML += `<li class="li-el" id="${itemDataId}"><img src="${itemDataImage}" alt="Imagen de la serie"></img> <p class=text>${itemDataName}</p> <p> Lenguaje: ${itemDataLanguage}</p></li>`;

                

            }

            results.innerHTML = `Hemos encontrado ${totalData} resultados`;

            const listEl = document.querySelectorAll(".li-el");


            function favoriteShow(event) {
                const itemsList = event.currentTarget;
                itemsList.classList.toggle("favorite");

                let favoritesArr = [];
                favoritesArr[0] = itemsList.id;


                localStorage.setItem(itemsList.id, "Favorite Show");

                if (itemsList.classList.contains("favorite")) {
                    localStorage.setItem(itemsList.id, "Favorite Show");
                    favoritesArr = JSON.stringify(localStorage.getItem(itemsList.id));
                } else { localStorage.removeItem(itemsList.id, "Favorite Show") };

            }

            for (const itemsList of listEl) {
                itemsList.addEventListener('click', favoriteShow);
            }

        })

}

function hiddenList(){
    console.log('hola');
    list.classList.toggle("hidden");
    
}


results.addEventListener('click', hiddenList);
btnEl.addEventListener('click', handlerSearch);