const searchBox=document.querySelector(".searchBox");
const searchBtn=document.querySelector(".searchBtn");
const recipeContainer=document.querySelector(".recipe-container");
const closeBtn=document.querySelector(".recipe-close-Btn");
const recipeDetailsContent=document.querySelector(".recipe-details-content");


const fetchRecipes=async(searchInput)=>{
    recipeContainer.innerHTML="<h2>Fetching recipes</h2>";
   const data=await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInput}`);
   const response=await data.json();
   recipeContainer.innerHTML="";
   response.meals.forEach(meal=>{
      const recipeDiv=document.createElement('div');
      recipeDiv.classList.add('recipe');
      recipeDiv.innerHTML=`
       <img src="${meal.
        strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <h3>${meal.strArea} 
       <span> Dish</span></h3>
        <p>${meal.strCategory}</p>
       
      `
      const button=document.createElement('button');
      button.textContent="View Recipe";
      recipeDiv.appendChild(button);
      button.addEventListener('click',()=>{
        openRecipePopup(meal);
      })
      recipeContainer.appendChild(recipeDiv);
   });
//    console.log(response);
}
const fetchIngredients=(meal)=>{
  let ingredientsList="";
  for(let i=1;i<=20;i++){
     const ingredient=meal[`strIngredient${i}`];
     if(ingredient){
        const measure=meal[`strMeasure${i}`];
       ingredientsList+=`<li>${measure} ${ingredient}</li>`
     }
     else{
        break;
     }
  }
  return ingredientsList;
}

const openRecipePopup=(meal)=>{
   recipeDetailsContent.innerHTML=`
     <h2 class="recipeName">${meal.strMeal}</h2>
     <h3>Ingredients:</h3>
     <ul class="ingredientList">
     ${fetchIngredients(meal)}
     </ul>
     <div class="recipeInstructions">
     <h3>Instructions:</h3>
     <p >${meal.strInstructions}</p>
     </div>
   `
   
   recipeDetailsContent.parentElement.style.display="block";
}

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput=searchBox.value.trim(); 
    fetchRecipes(searchInput);
    // console.log("button click");
});
closeBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display="none";
})