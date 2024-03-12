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
        spinnerEl.style.display = "none"; // Hide spinner in case of an error
    }
}

btnEl.addEventListener("click", getJoke);
