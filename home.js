// global variables
const searchInput = document.querySelector(".search-input");
const mealsContainer = document.querySelector(".meals-list");
const favMealsArr = [];

// to make data persistent even if we reload
addIdToFavMealsArray();

// api call will be made as user types input
searchInput.onkeyup = async (e) => {
  // console.log(e.target.value);
  const mealName = e.target.value;

  await getMealList(mealName);

  // console.log('meals',meals);
};

const getMealList = async (mealName) => {
  try {
    // fetch list of meals available from api call
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${mealName}`,
      { method: "GET" }
    );
    const data = await response.json();
    // console.log(data.meals);
    let html = "";
    if (data.meals) {
      data.meals.forEach((item) => {
        html += `<div class="meal-card">
        <a href = './meal-details.html' onclick='handleMealDetailLocStorage(${
          item.idMeal
        })'>
        <div class="meal-image-container"><img src=${
          item.strMealThumb
        } alt=""></div>
        <div class='meal-title'> ${item.strMeal}</div>
        </a>
        <button type='button'  class='favourite-btn' onclick='handleFavBtnClick(${
          item.idMeal
        }, this)'>${
          isFavourite(item.idMeal) ? "Unfavourite" : "Add To Favourite"
        }</button>
      </div>`;
      });
    } else {
      html = `<div class='welcome-text'<p>OOPS!! Cannot find ${mealName}. Please Make sure words are spelled correctly </p></div`;
    }

    mealsContainer.innerHTML = html;
  } catch (error) {
    console.error("er!!", error);
  }
};

// function that handles add and remove to favourites list
function handleFavBtnClick(mealId, element) {
  console.log("clicked");
  if (favMealsArr) {
    const index = favMealsArr.indexOf(mealId);
    if (index != -1) {
      // console.log(mealId);
      // console.log(typeof(mealId))
      // console.log(element);
      favMealsArr.splice(index, 1);

      // remove property from local storage if its empty
      if (favMealsArr.length == 0) {
        localStorage.removeItem("favouriteMeals");
      } else {
        localStorage.setItem("favouriteMeals", favMealsArr);
      }
      element.innerText = "Add To Favourites";
      // console.log(favMealsArr);
    }
    //  add to array
    else {
      favMealsArr.push(mealId);
      localStorage.setItem("favouriteMeals", favMealsArr);
      element.innerText = "Unfavourite";
      // console.log(favMealsArr);
    }
  } 
  // else add to array and set LS
  else {
    favMealsArr.push(mealId);
    localStorage.setItem("favouriteMeals", favMealsArr);
    element.innerHTML = "Unfavourite";

    // console.log(favMealsArr);
  }
}


// function to check whether an item is added to favourite or not
function isFavourite(mealId) {
  mealId = parseInt(mealId);
  if (favMealsArr) {
    const index = favMealsArr.indexOf(mealId);

    if (index == -1) {
      console.log("inside false");
      return false;
    } else {
      return true;
    }
  }
}

// function that add meal id to LS  so as to show in details page
function handleMealDetailLocStorage(mealId) {
  localStorage.setItem("mealDetail", mealId);
}


function addIdToFavMealsArray() {
  const favMeals = localStorage.getItem("favouriteMeals");
  if (favMeals) {
    let mealIdLS = "";
    for (let data of favMeals) {
      if (data != ",") {
        mealIdLS += data;
      } else {
        // console.log(typeof mealId);
        favMealsArr.push(parseInt(mealIdLS));
        mealIdLS = "";
      }
    }
    favMealsArr.push(parseInt(mealIdLS));
  }
}
