let pokemonContainer=document.querySelector("#pokemon-card-container");
let searchInput=document.querySelector("#pokemon-search-input");
let filterBtn=document.querySelector("#filterbtn");
let type=document.querySelector("#type");
let colors={
    normal:'grey',
    grass:'green',
    poison:'purple',
    rock:'brown'
}
function createPokemoncard(details){
    let card=document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML=`<div class='card-inner'>
    <div class='card-front'>
        <div class='id'>${details.id}</div>
        <img src='${details.sprites.front_default}'>
        <div class='name'>${details.name}</div>
        <div class='type'>${details.types[0].type.name}</div>
    </div>
    <div class='card-back'>
        <div class='id'>${details.id}</div>
        <img src='${details.sprites.back_default}'>
        <div class='ability'>${details.abilities[0].ability.name}</div>
        <div class='name'>${details.name}</div>
    </div>
</div>`
    card.querySelector('.card-inner').style.backgroundColor=colors[details.types[0].type.name];
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

filterBtn.addEventListener('click', (event) => {
    event.preventDefault(); 

    let allCards = document.querySelectorAll(".card");
    let pokeArray = Array.from(allCards);
    pokeArray.forEach((element) => {
        let pokemonType = element.querySelector('.type').innerText;
        if (type.value === "" || pokemonType.toLowerCase() === type.value.toLowerCase()) {
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