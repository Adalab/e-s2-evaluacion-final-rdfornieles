'use strict';
const btnEl = document.querySelector(".btn");

const input = document.querySelector("#searchTv");

const list = document.querySelector(".list");

function handlerSearch(event) {
    list.innerHTML = "";
    const inputEl = input.value;
    event.preventDefault();

    fetch(` http://api.tvmaze.com/search/shows?q=${inputEl}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {


            for (const itemData of data) {
                const itemDataName = itemData.show.name;
                let itemDataImage = itemData.show.image;
                let itemDataId = itemData.show.id;

                const imageNull = 'https://via.placeholder.com/210x295/cccccc/666666/?text=TV';

                if (itemDataImage === null) {
                    itemDataImage = imageNull
                } else {
                    itemDataImage = itemData.show.image.medium
                }
                
                list.innerHTML += `<li class="li-el" id="${itemDataId}"><img src="${itemDataImage}" alt="Imagen de la serie"></img> <p class=text>${itemDataName}</p> </li>`;

            }

            const listEl = document.querySelectorAll(".li-el");
            

            function favoriteShow(event) {
                const itemsList = event.currentTarget;
                const favLocal = JSON.parse(localStorage.getItem('favoritesShows'))|| {};
                itemsList.classList.toggle("favorite");
                //let favoritesArr = [];
                favLocal[itemsList.id] = itemsList.classList.contains("favorite");
                
                

                localStorage.setItem("favoritesShows", JSON.stringify(favLocal));

                /*if (itemsList.classList.contains("favorite")) {
                    localStorage.setItem(itemsList.id, "Favorite Show");
                    favoritesArr = JSON.stringify(localStorage.getItem(itemsList.id));
                } else { localStorage.removeItem(itemsList.id, "Favorite Show") };*/

            }

            for (const itemsList of listEl) {
                itemsList.addEventListener('click', favoriteShow);
            }

        })

}


btnEl.addEventListener('click', handlerSearch);