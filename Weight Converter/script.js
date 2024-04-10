const inputEl=document.getElementById("input");
const errorEl=document.getElementById("error");
const resultE1=document.getElementById("result");
let errorTime;
let resultTime;
function updateResults(){
    if(inputEl.value<=0 || isNaN(inputEl.value)){
        errorEl.innerText="Please enter a valid number!";
        clearTimeout(errorTime);
        errorTime=setTimeout(()=>{
            errorEl.innerText="";
            inputEl.value="";
        },2000);
    }else{
        resultE1.innerText=(+inputEl.value/2.2).toFixed(2);
        clearTimeout(resultTime);
        resultTime=setTimeout(()=>{
            resultE1.innerText="";
            inputEl.value="";
        },1000);
    }
}
inputEl.addEventListener("input",updateResults);
