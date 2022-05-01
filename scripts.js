
const runCoco = async (input) => {
    // BEGIN PART 3
    // const net = await cocoSsd.load();
    console.log("loaded correctly");
    // detect(net);
    // END PART 3
    getCaption(input)
};


const getCaption = async (input) => {

    //"Caption" is basically what I'm using as a label rn
    const caption = document.getElementById("caption");
   
    try {
   
        //my Authentication Key
        let key = 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR';
        //var authorizationHeaderString = encodedData;
        let query = input;

        //API get 
        const response = await axios.get(
            'https://api.api-ninjas.com/v1/nutrition?query=' + query,
            {headers: { 'X-Api-Key': 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR'},}
        

        );
        // Retrieve the indexed data portion of the response
        const data = response.data[0];

        // From the data, get the name and calories (prob changing later)
        const entry = data.name;
        const entry2 = data.calories;
        
    
        const line = document.createElement("p");
        line.innerText = 'Food: ' + entry;
        caption.appendChild(line);
        const line2 = document.createElement("p");
        line2.innerText = 'Calories: ' + entry2;
        caption.appendChild(line2);
        
    } catch (error) {
        console.log(error);
    }

}


//for the image input (might add where if you upload an image itll generate the word for it then access API)
const input = document.getElementById("img-upload");

//for the text button input
const taskName = document.getElementById("task-name");
const submitButton = document.getElementById("submit");
const clearButton = document.getElementById("clear");

//Submit Button Listener
submitButton.addEventListener("click", () => {
    if (taskName.value != "") {
      runCoco(taskName.value)
    }
  });
  
//Clear Button Listener
clearButton.addEventListener("click", () => {
    // taskList.replaceChildren();
    taskName.value = "";
  });
  

//OLD** image button listener (don't need rn)
input.addEventListener("change", (event) => {
    const caption = document.getElementById("caption");
    //caption.replaceChildren();
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0])
    // What should you run to drive the execuation of all your functions?
    runCoco();
})

