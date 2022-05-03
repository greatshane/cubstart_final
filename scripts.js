// JS arrays
var caloriesList = []
var foodList = []
var sugarList = []
var totalFatList = []
var satFatList = []
var proteinList = []
var sodiumList = []
var potassiumList = []
var cholesterolList = []
var carbsList = []
var fiberList = []

// Arguement/s: inputted word/s 
// Calls the API with these word/s as queries and uses the received 
//information to fill in above arrays as well as display calories and sugar to the screen
const getInfo = async (input) => {

    //"Caption" is basically what I'm using as a label rn
    const caption = document.getElementById("caption");
   
    try {
   
        //my Authentication Key
        let key = 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR';
        
        let query = input;

        //API get 
        const response = await axios.get(
            'https://api.api-ninjas.com/v1/nutrition?query=' + query,
            {headers: { 'X-Api-Key': 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR'},}
        

        );
        
        // Go through all the data and push entries to lists
        for (let i = 0; i < response.data.length; i++) {
          const data = response.data[i];

          // From the data, get the name and calories (prob changing later)
          const entry = data.name;
          if (!foodList.includes(entry)) {
            foodList.push(entry)
          }
          const entry2 = data.calories;
          caloriesList.push(entry2);

          const entry3 = data.sugar_g;
          sugarList.push(entry3);

          totalFatList.push(data.fat_total_g);
          satFatList.push(data.fat_saturated_g);
          proteinList.push(data.protein_g);
          sodiumList.push(data.sodium_mg);
          potassiumList.push(data.potassium_mg);
          cholesterolList.push(data.cholesterol_mg);
          carbsList.push(data.carbohydrates_total_g);
          fiberList.push(data.fiber_g);
      
          const line = document.createElement("p");
          line.innerText = 'Food: ' + entry + '    ';
         
          line.innerText += 'Calories: ' + entry2 + '    ';

          caption.appendChild(line);
        }
        
    } catch (error) {
        console.log(error);
    }

}


// all our DOM elements
const taskName = document.getElementById("task-name");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");

const foodButton = document.getElementById("food");
const totalButton = document.getElementById("total");



// If there is a word/s in the text box, will call getInfo on word/s
submitButton.addEventListener("click", () => {
    if (taskName.value != "") {
      getInfo(taskName.value)
    }
  });
  
// Will clear the screen and reset all the Nutritional categories
clearButton.addEventListener("click", () => {
    
    const caption = document.getElementById("caption");
    const foodLabel = document.getElementById("food_label");
    const totalLabel = document.getElementById("total_label");
    
    caption.replaceChildren();
    foodLabel.replaceChildren();
    totalLabel.replaceChildren();
    
    taskName.value = "";
    foodList = []
    caloriesList = []
    sugarList = []
    totalFatList = []
    satFatList = []
    proteinList = []
    sodiumList = []
    potassiumList = []
    cholesterolList = []
    carbsList = []
    fiberList = []
  });
  
  // Will display in alphabetical order all the food the user has eaten thusfar.
foodButton.addEventListener("click", () => {
    const label = document.getElementById("food_label");
    if (foodList.length != 0) {
        label.replaceChildren();
        var newlabel = document.createElement("Label");
        newlabel.style.color = "#69a2ec";
        newlabel.innerHTML = "You have eaten: " + foodList.sort().toString() + " today.";
        label.appendChild(newlabel);
    }
  });

  // On each button click, will calculate the sum of all the nutritional information of all food eaten thusfar.
  // Will display this information to the screen
totalButton.addEventListener("click", () => {
    const label = document.getElementById("total_label");
    if (caloriesList.length != 0) {
        label.replaceChildren();
        var newlabel = document.createElement("Label");
        newlabel.style.color = "#69a2ec";
        newlabel.innerHTML = "Today you have eaten: ";
        newlabel.innerHTML += "<br> " + Math.floor((caloriesList.reduce((partialSum, a) => partialSum + a, 0))) + " calories.";
        newlabel.innerHTML +=  "<br> " + Math.floor((sugarList.reduce((partialSum, a) => partialSum + a, 0))) + "g sugar.";
        newlabel.innerHTML += "<br>  " + Math.floor((totalFatList.reduce((partialSum, a) => partialSum + a, 0))) + "g fat.";
        newlabel.innerHTML += "<br>  " + Math.floor((satFatList.reduce((partialSum, a) => partialSum + a, 0))) + "g saturated fat.";
        newlabel.innerHTML += "<br>  " + Math.floor((proteinList.reduce((partialSum, a) => partialSum + a, 0))) + "g protein.";
        newlabel.innerHTML += "<br>  " + Math.floor((sodiumList.reduce((partialSum, a) => partialSum + a, 0))) + "mg sodium.";
        newlabel.innerHTML += "<br>  " + Math.floor((potassiumList.reduce((partialSum, a) => partialSum + a, 0))) + "mg potassium.";
        newlabel.innerHTML += "<br>  " + Math.floor((cholesterolList.reduce((partialSum, a) => partialSum + a, 0))) + "mg cholesterol.";
        newlabel.innerHTML += "<br>  " + Math.floor((carbsList.reduce((partialSum, a) => partialSum + a, 0))) + "g carbohydrates.";
        newlabel.innerHTML += "<br>  " + Math.floor((fiberList.reduce((partialSum, a) => partialSum + a, 0))) + "g fiber.";
        label.appendChild(newlabel);
    }
  });






