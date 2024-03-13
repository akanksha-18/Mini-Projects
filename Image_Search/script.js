const accessKey = "RZEIOVfPhS7vMLkFdd2TSKGFBS4o9_FmcV1Nje3FSjw";

const formEl = document.querySelector("form");
const searchInputEl = document.getElementById("search-input");
const searchResultsEl = document.querySelector(".search-results");
const showMoreButtonEl = document.getElementById("show-more-button");
// Add this JavaScript code to your existing script.js file

const lightboxEl = document.getElementById("lightbox");
const lightboxContentEl = document.getElementById("lightbox-content");
const lightboxImageEl = document.getElementById("lightbox-image");
const closeLightboxEl = document.getElementById("close-lightbox");

let savedImages = [];

searchResultsEl.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".search-result img");
  if (targetElement) {
    openLightbox(targetElement.src);
  }
});

closeLightboxEl.addEventListener("click", closeLightbox);

function openLightbox(imageSrc) {
  lightboxImageEl.src = imageSrc;
  lightboxEl.classList.remove("hidden");
}

function closeLightbox() {
  lightboxEl.classList.add("hidden");
}

// Save/Favorite Image Feature
searchResultsEl.addEventListener("click", (event) => {
  const targetElement = event.target.closest(".search-result img");
  if (targetElement) {
    const imageSrc = targetElement.src;
    if (!savedImages.includes(imageSrc)) {
      savedImages.push(imageSrc);
      alert("Image saved/favorited!");
      // You can implement further functionality (e.g., display saved images, store in local storage)
    } else {
      alert("You already saved this image!");
    }
  }
});


let inputData = "";
let page = 1;

async function searchImages() {
  inputData = searchInputEl.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accessKey}`;

  const response = await fetch(url);
  const data = await response.json();
  if (page === 1) {
    searchResultsEl.innerHTML = "";
  }

  const results = data.results;

  results.map((result) => {
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");

    const imageInner = document.createElement("div");
    imageInner.classList.add("search-result-inner");

    const image = document.createElement("img");
    image.src = result.urls.small;
    image.alt = result.alt_description;

    const imageLink = document.createElement("a");
    imageLink.href = result.links.html;
    imageLink.target = "_blank";
    imageLink.textContent = result.alt_description;

    imageInner.appendChild(image);
    imageWrapper.appendChild(imageInner);
    imageWrapper.appendChild(imageLink);
    searchResultsEl.appendChild(imageWrapper);
});


  page++;

  if (page > 1) {
    showMoreButtonEl.style.display = "block";
  }
}

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  page = 1;
  searchImages();
});

showMoreButtonEl.addEventListener("click", () => {
  searchImages();
});

