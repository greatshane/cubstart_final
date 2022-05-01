// const hash = window.location.hash
// .substring(1)
// .split('&')
// .reduce(function (initial, item) {
//   if (item) {
//     var parts = item.split('=');
//     initial[parts[0]] = decodeURIComponent(parts[1]);
//   }
//   return initial;
// }, {});
// window.location.hash = '';

// // Set token
// let _token = hash.access_token;

// const authEndpoint = 'https://accounts.spotify.com/authorize';

// // Replace with your app's client ID, redirect URI and desired scopes
// const clientId = '298a79f00919479da3ace75f2cc3b16d';
// const clientSecret = "1379e727094c4f8f99e2a6178b8ac4a8";
// var encodedData = window.btoa(clientId + ':' + clientSecret);
// const redirectUri = 'https://spotify-recommendations.glitch.me/';
// const scopes = [
//   'streaming',
//   'user-read-birthdate',
//   'user-read-private',
//   'user-modify-playback-state',
//   'user-top-read'
// ];

// // If there is no token, redirect to Spotify authorization
// if (!_token) {
//   window.location = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join('%20')}&response_type=token`;
// }

const runCoco = async () => {
    // BEGIN PART 3
    // const net = await cocoSsd.load();
    console.log("loaded correctly");
    // detect(net);
    // END PART 3
    getCaption()
};

// const detect = async (net) => {
//     // const img = document.getElementById("img");
//     // const imgWidth = img.width;
//     // const imgHeight = img.height;

//     // Set canvas height and width
//     const canvas = document.getElementById("mesh");
//     // BEGIN PART 4
    
//     canvas.width = imgWidth;
//     canvas.height = imgHeight;
    
//     // END PART 4

//     // Make predictions
//     // BEGIN PART 5
//     //const obj = await net.detect(img);
//     // END PART 5

//     // Draw mesh
//     // BEGIN PART 6
//     const ctx = canvas.getContext("2d");
//     // END PART 6
//     //drawRect(obj, ctx);
//     // Generate caption
//     getCaption();
//     // Make image visible after applying boxes
//     img.style.visibility = "visible";
// };

// const drawRect = (predictions, ctx) => {
//     // Loop through each prediction
//     predictions.forEach((prediction) => {
//         // Extract boxes and classes
//         const [x, y, width, height] = prediction["bbox"];
//         const text = prediction["class"];

//         // Set styling
//         const color = Math.floor(Math.random() * 16777215).toString(16);
//         ctx.strokeStyle = "#" + color;
//         ctx.font = "18px Arial";

//         // Draw rectangles and text
//         ctx.beginPath();
//         ctx.fillStyle = "#" + color;
//         ctx.fillText(text, x, y);
//         ctx.rect(x, y, width, height);
//         ctx.stroke();
//     });
// };
const getCaption = async () => {

    // const clientId = '298a79f00919479da3ace75f2cc3b16d';
    // const clientSecret = '1379e727094c4f8f99e2a6178b8ac4a8';
    // var encodedData = window.btoa(clientId + ':' + clientSecret);
    // predictions.forEach(async (prediction) => {
    const caption = document.getElementById("caption");
    // const imger = document.getElementById("imgholder");
    // const entity = prediction["class"];
    try {
        // Access token provided
        //const accessToken = "BQCifKY3heTA1SJhD2rrlS4MJGM_0PYYWfSb_hRSAnMl5rijHayzFfYP3IysiY-bwD9DjcaZ0D8Md0tFgOjK8a7APPAi2NXDrByTLglwib-xVWVwSUED-LitiRbOQ_fkfZnNE0KkDkti54q5-J5gwewxYsEm5is";
        // // Store the response from GET request
        // var authorizationHeaderString = encodedData;
        // const response = await axios.get(
        //     'https://accounts.spotify.com/api/token',
        // { headers: {'Authorization': `Basic ${authorizationHeaderString}` } , 
        // form: {
        //     grant_type: 'client_credentials'
        //   },
        //   json: true
        // }

        // );

        let key = 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR';
        //var authorizationHeaderString = encodedData;
        const response = await axios.get(
            'https://api.api-ninjas.com/v1/nutrition?query=fried rice',
            {headers: { 'X-Api-Key': 'amOmJ7DIV5epVBvcBUvhTg==CUfN8Pn9aBhusoKR'},}
        

        );

        

        //'https://accounts.spotify.com/api/token'

        //https://api.spotify.com/v1/recommendations?" + 'limit=1' + '&min_danceability=1'
        // $.ajax({
        //     url: "https://api.spotify.com/v1/recommendations?" + 'limit=1' + '&min_danceability=1' ,
        //     type: "GET",
        //     beforeSend: function(xhr){xhr.setRequestHeader('Authorization', 'Bearer ' + accessToken );},
        //     success: function(data) { 
        //       console.log(data)
        //       let trackUri = data.tracks[0].uri
        //       print(data)
        //       //play(deviceId, trackUri);
        //     }
        //   });


        // Retrieve the data portion of the response
        const data = response.data[0];
        // From the data, get the first entry of the definitions
        const entry = data.name;
        const entry2 = data.calories;
        console.log(entry)
        let lineText = entry;
        //let imageText;
        // if (entry.example) {
        //     lineText = entry.example;
        // } else {
        //     lineText = entry.definition;
        // }
        // if (entry.emoji) {
        //     lineText += " " + entry.emoji;
        // }
        // lineText += " #" + entity;

        // imageText = entry.image_url;
        //lineText = entry;
        const line = document.createElement("p");
        line.innerText = lineText;
        
        caption.appendChild(line);
        const line2 = document.createElement("p");
        line2.innerText = entry2;
        caption.appendChild(line2);
        // const imag = document.createElement("img");
        // imag.src = imageText; 
        // imag.height = 200;
        // imag.width = 400;
        // caption.appendChild(imag);
    } catch (error) {
        console.log(error);
    }

}


// BEGIN PART 8
// "input" is current undefined, since it hasn't been initialized yet.
// Initialize it here to the appropriate element on the HTML document.
const input = document.getElementById("img-upload");

input.addEventListener("change", (event) => {
    const caption = document.getElementById("caption");
    //caption.replaceChildren();
    const img = document.getElementById("img");
    img.src = URL.createObjectURL(event.target.files[0])
    // What should you run to drive the execuation of all your functions?
    runCoco();
})
// END PART 8
