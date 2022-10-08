// global Variables
const favContainer = document.querySelector(".fav-container");
// console.log(favContainer);
const favMeals = localStorage.getItem("favouriteMeals");
// console.log(typeof favMeals);
const favArray = [];


// onload of the html page, script files this function will be invoked as we mention it in the onload attribute of body tag
function showFavourites() {
  let mealId = "";
  if (favMeals) {
    for (let data of favMeals) {
      if (data != ",") {
        mealId += data;
      } else {
        // console.log(typeof mealId);
        favArray.push(parseInt(mealId));
        mealId = "";
      }
    }
    favArray.push(parseInt(mealId));
    let html = "";
    for (let mealId of favArray) {
      fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
        .then((res) => res.json())
        .then((data) => {
          const { meals } = data;
          // console.log(meals[0].strMeal);

          html += ` <div class="fav-card">
          <a href="meal-details.html" onclick='showMealDetailPage(${meals[0].idMeal})'>
              <div class="fav-img-container">
                <img src=${meals[0].strMealThumb} alt="" />
              </div>
              <div class="fav-title">${meals[0].strMeal}</div>
              </a>
              <button class="fav-card-btn" type="button" onclick = 'removeFromFavourites(${meals[0].idMeal}, this)'>Remove</button>
            </div>`;
          favContainer.innerHTML = html;
        });
    }
  }else{
    favContainer.innerHTML = `<div class='welcome-text'<p>OOPS!! You have not added any meal to favourite list</p></div`
  }
}

function removeFromFavourites(mealId, element) {
  // console.log('clicked');
  const index = favArray.indexOf(parseInt(mealId))

  if(index != -1){
    favArray.splice(index,1)
    localStorage.setItem('favouriteMeals', favArray);
    element.parentElement.remove()
    // console.log(favArray);
  }

}

function showMealDetailPage(mealId){
  localStorage.setItem('mealDetail', mealId)
}
