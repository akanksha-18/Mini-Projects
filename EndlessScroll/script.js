const imageContainer=document.getElementById("image-container");
const loader=document.getElementById("loader");
let photosArray=[];
const count=30;
const apiKey="U0XL2dYhtLOm8Jw6JSX04EPCzS6ISvt1OEDQzbnnf-M";
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

function imageLoaded(){
    console.log("image loaded");
}
function setAttribute(element,Attributes){
    for(const key in Attributes){
      element.setAttribute(key,Attributes[key]);
    }
}

function displayPhotos(){
    photosArray.forEach((photo)=>{
        const item=document.createElement("a");
        // item.setAttribute("href",photo.links.html);
        // item.setAttribute("target","blank");
        setAttribute(item,{
            href:photo.links.html,
            target:"blank",
        });

        const img=document.createElement("img");
        // img.setAttribute("src",photo.urls.regular);
        // img.setAttribute("alt",photo.alt_description);
        // img.setAttribute("title",photo.alt_description);

        setAttribute(img,{
            src:photo.urls.regular,
            alt:photo.alt_description,
            title:photo.alt_description,
        })
        img.addEventListener("load",imageLoaded);
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}
async function getPhotos(){
    try{
       const response=await fetch(apiUrl);
       photosArray=await response.json();
       displayPhotos();
       console.log(photosArray);
    }
    catch(error){
      
    }
}
window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight - 1000){
        getPhotos();
        console.log("Load More");
    }
    
})
getPhotos();