const mealDetailsContainer = document.querySelector(".meal-details-container");
// console.log(mealDetailsContainer);
function showMealDetailsPage() {
  let mealId = localStorage.getItem("mealDetail");
if(mealId){
  mealId = parseInt(mealId);

  fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then((res) => res.json())
    .then((data) => {
      const { meals } = data;
      let html = "";
      console.log(meals);

 html = ` <div class="meal-primary-detail">
  <div class="meal-img-container">
    <img src=${meals[0].strMealThumb} alt="">
  </div> 
  <div class="meal-primary-right">

    <div class="meal-title"><span>Name: </span>${meals[0].strMeal}</div>
    <div class="meal-category"><span>Origin: </span>${meals[0].strArea}</div>
  </div>

</div>
   <p class="meal-instructions"><span> Procedure to prepare:</span>  ${meals[0].strInstructions}</p>`

  mealDetailsContainer.innerHTML = html
    });
  }else{
    mealDetailsContainer.innerHTML = `<div class='welcome-text'<p>OOPS!! You have not selected any meal </p></div`
  }
}

showMealDetailsPage();
