
const textarea = document.getElementById("myTextarea");


function saveToLocalStorage() {
    localStorage.setItem("savedText", textarea.value);
}

if (localStorage.getItem("savedText")) {
    textarea.value = localStorage.getItem("savedText");
}

textarea.addEventListener("input", saveToLocalStorage);
function changeTheme(theme) {
    const body = document.body;
    const container = document.getElementById('themeContainer');

    if (theme === 'dark') {
        body.style.backgroundColor = '#222';
        body.classList.add('dark');
        container.style.backgroundColor = '#333';
        container.style.color = '#fff';
    } else {
        body.style.backgroundColor = '#f0f0f0';
        container.style.backgroundColor = '#fff';
        container.style.color = '#333';
    }
}