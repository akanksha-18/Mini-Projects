const form=document.querySelector('form');
const resultDiv=document.querySelector('.result');

form.addEventListener('submit',(e)=>{
      e.preventDefault();
      getWordInfo(form.elements[0].value);
})
async function getWordInfo(word){
    const response=await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    const data=await response.json();
    if (data.length > 0) {
    resultDiv.innerHTML=`
    <p><strong>Word:</strong>${data[0].word}</p>
    <p><strong>Meaning:</strong>${data[0].meanings[0].definitions[0].definition}</p>
    <p>${data[0].meanings[0].partOfSpeech}</p>  `;
    resultDiv.style.display = 'block';
    console.log(data);
    }else {
        // If no data is available, you can handle it here
        console.log('No data available');
    }
    
}