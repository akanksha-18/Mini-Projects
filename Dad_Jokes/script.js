const btnEl = document.getElementById("btn");
const jokeEl = document.getElementById("joke");
const spinnerEl = document.getElementById("spinner");

const apiKey = "4kqGcJx8uDXo3XIskcbzokAz7rN8nWJs3PL9Mcll";

const options = {
    method: "GET",
    headers: {
        "X-Api-Key": apiKey,
    },
};

const apiURL = "https://api.api-ninjas.com/v1/dadjokes?limit=1";

async function getJoke() {
    try {
        jokeEl.innerText = "Updating...";
        btnEl.disabled = true;
        btnEl.innerText = "Loading...";
        spinnerEl.style.display = "inline-block"; // Show spinner

        const response = await fetch(apiURL, options);
        const data = await response.json();

        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke";
        spinnerEl.style.display = "none"; // Hide spinner

        jokeEl.innerText = data[0].joke;
    } catch (error) {
        jokeEl.innerText = "An error happened, try again later";
        btnEl.disabled = false;
        btnEl.innerText = "Tell me a joke";
        console.log(error);
        spinnerEl.style.display = "none"; 
    }
}
function increaseTextSize() {
    changeTextSize(2); 
}

function decreaseTextSize() {
    changeTextSize(-2); 
}

function changeTextSize(increment) {
    const jokeElement = document.getElementById("joke");
    const currentSize = parseFloat(window.getComputedStyle(jokeElement, null).getPropertyValue('font-size'));
    const newSize = currentSize + increment + "px";

    jokeElement.style.fontSize = newSize;
}
function shareJoke() {
    const jokeText = document.getElementById("joke").innerText;

    if (navigator.share) {
        navigator.share({
            title: "Dad Joke",
            text: jokeText,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
        alert("Web Share API not supported. You can manually copy the joke and share it.");
    }
}

btnEl.addEventListener("click", getJoke);
