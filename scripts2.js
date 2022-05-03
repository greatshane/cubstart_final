// Page 2 with the tensor flow and neural network is inspired by Cubstart Homework 3.

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

// loads cocoSsd and calls imageRecog
const runCoco = async () => {
    const net = await cocoSsd.load();
    console.log("loaded correctly");
    imageRecog(net);
};

// calls getCaption of object and makes image visible
const imageRecog = async (net) => {
    const img = document.getElementById("img");
    const imgWidth = img.width;
    const imgHeight = img.height;
    const canvas = document.getElementById("mesh");
    canvas.width = imgWidth;
    canvas.height = imgHeight;
    
 
    const obj = await net.detect(img);
 
    
 
    
  
    getCaption(obj);
    
    img.style.visibility = "visible";
};

// uses owlbot api to identify image and then calls getinfo on data reponse
const getCaption = (predictions) => {
    predictions.forEach(async (prediction) => {
        // const caption = document.getElementById("caption");
        // const imger = document.getElementById("imgholder");
        const entity = prediction["class"];
        try {
            // Access token provided
            const accessToken = "574a554e5a8cad9b2666048e80c20365f33323fc";
            // Store the response from GET request
            const response = await axios.get(
            `https://owlbot.info/api/v4/dictionary/${entity}`,
            { headers: { Authorization: `Token ${accessToken}` } }
            );
            // Retrieve the data portion of the response
            const data = response.data;
       
            let lineText = data.word;
            // Input the word into our getInfo functions which will do the other APi access
            getInfo(lineText);


           
        } catch (error) {
            console.log(error);
        }
    })
}

// Input is the word that the image recognition API outputs.
// So upload photo of apple -> Image API says its apple -> send "apple" to this function
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
        // Retrieve the indexed data portion of the response
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
          
          line.innerText += 'Sugar: ' + entry3;
          caption.appendChild(line);
        }
        
    } catch (error) {
        console.log(error);
    }

}


const clearButton = document.getElementById("clear");

const foodButton = document.getElementById("food");
const totalButton = document.getElementById("total");





  
//Clear Button Listener
clearButton.addEventListener("click", () => {
    const caption = document.getElementById("caption");
    const foodLabel = document.getElementById("food_label");
    const totalLabel = document.getElementById("total_label");
    
    const input = document.getElementById("img");
    caption.replaceChildren();
    foodLabel.replaceChildren();
    totalLabel.replaceChildren();
    
    img.style.visibility = "hidden";
    
    
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
  
// List all food button listener
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

// List total calories button listener
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

const input = document.getElementById("img-upload");

// If image is uploaded this gets triggered
input.addEventListener("change", (event) => {
    const caption = document.getElementById("caption");
    caption.replaceChildren();
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0])
    runCoco();
})