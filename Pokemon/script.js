let pokemonContainer=document.querySelector("#pokemon-card-container");
let searchInput=document.querySelector("#pokemon-search-input");
let filterBtn=document.querySelector("#filterbtn");
let type=document.querySelector("#type");
let colors={
    normal:'#51ff0d',
    grass:'#4FA64F',
    poison:'#8E0FED',
    rock:'#DAA06D',
    bug:'#F0E68C',
    ghost:'#F2D2BD',
    fire:'#FFC300 ',
    water:'#89CFF0',
    electric:'#7DF9FF',
    psychic:'#625981',
    ice:'#00FCFC',
    dragon:'#F75700',
    fairy:'#E36B89',
    ground:'#E5FC9A',
    fighting:'#9AFCC6'
}
// function createPokemoncard(details){
//     let card=document.createElement("div");
//     card.classList.add("card");
    
//     card.innerHTML=`<div class='card-inner'>
//     <div class='card-front'>
//         <div class='id'>${details.id}</div>
//         <img src='${details.sprites.front_default}'>
//         <div class='name'>${details.name}</div>
//         <div class='type'>${details.types[0].type.name}</div>
//     </div>
//     <div class='card-back'>
//         <div class='id'>${details.id}</div>
//         <img src='${details.sprites.back_default}'>
//         <div class='ability'>${details.abilities[0].ability.name}</div>
//         <div class='name'>${details.name}</div>
//     </div>
// </div>`

//     card.querySelector('.card-inner').style.backgroundColor=colors[details.types[0].type.name];
//     return card;
// }
function createPokemoncard(details) {
    let card = document.createElement("div");
    card.classList.add("card");
    
    let cardInner = document.createElement("div");
    cardInner.classList.add("card-inner");

    let cardFront = document.createElement("div");
    cardFront.classList.add("card-front");
    cardFront.innerHTML = `
        <div class='id'>${details.id}</div>
        <img src='${details.sprites.front_default}'>
        <div class='name'>${details.name}</div>
        <div class='type'>${details.types[0].type.name}</div>
        <div class='height'>Height:${details.height}</div>
    `;
    cardInner.appendChild(cardFront);

    let cardBack = document.createElement("div");
    cardBack.classList.add("card-back");
    cardBack.innerHTML = `
        <div class='id'>${details.id}</div>
        <img src='${details.sprites.back_default}'>
        <div class='ability'>${details.abilities[0].ability.name}</div>
        <div class='name'>${details.name}</div>
        <div class='weight'>Weight:${details.weight}</div>
    `;
    cardInner.appendChild(cardBack);

    card.appendChild(cardInner);

    cardFront.style.backgroundColor = colors[details.types[0].type.name]; // Apply color to the front card
    cardBack.style.backgroundColor = colors[details.types[0].type.name]; // Apply color to the back card
    return card;
}




searchInput.addEventListener('input', () => {
    let allCards = document.querySelectorAll(".card");
    allCards.forEach((element) => {
        let pokemonName = element.querySelector('.name').innerText.trim(); 
        if (pokemonName.startsWith(searchInput.value.trim())) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

// filterBtn.addEventListener('click', (event) => {
//     event.preventDefault(); 

//     let allCards = document.querySelectorAll(".card");
//     let pokeArray = Array.from(allCards);
//     pokeArray.forEach((element) => {
//         let pokemonType = element.querySelector('.type').innerText;
//         if (type.value === "" || pokemonType.toLowerCase() === type.value.toLowerCase()) {
//             element.style.display = "block";
//         } else {
//             element.style.display = "none";
//         }
//     });
// });
filterBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    let allCards = document.querySelectorAll(".card");
    let pokeArray = Array.from(allCards);
    pokeArray.forEach((element) => {
        let pokemonType = element.querySelector('.type').innerText.toLowerCase();
        let selectedType = type.value.toLowerCase();
        if (selectedType === "" || pokemonType === selectedType) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});



async function fetchPokemon(i){
    let response=await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`);
    let result=await response.json();
    return result;
}

async function fetchmainpage(){
    for(let i=1;i<=151;i++){
        let pokemon=await fetchPokemon(i);
        console.log(pokemon);
         let card=createPokemoncard(pokemon);
         pokemonContainer.appendChild(card);
    }
}
fetchmainpage();