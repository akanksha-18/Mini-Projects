async function fetchUserDetails() {
    const username = document.getElementById("usernameInput").value;
    const userDetailsContainer = document.getElementById("userDetails");
    const errorContainer = document.getElementById("error");

    try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) {
            throw new Error('User not found');
        }
        const data = await response.json();

        // Clear previous user details and error message
        userDetailsContainer.innerHTML = "";
        errorContainer.textContent = "";

        // Create elements to display user details
        const img = document.createElement("img");
        img.src = data.avatar_url;
        img.alt = "Profile Picture";
        userDetailsContainer.appendChild(img);

        const name = document.createElement("p");
        name.textContent = `Name: ${data.name}`;
        userDetailsContainer.appendChild(name);

        const bio = document.createElement("p");
        bio.textContent = `Bio: ${data.bio || 'Not available'}`;
        userDetailsContainer.appendChild(bio);

        const location = document.createElement("p");
        location.textContent = `Location: ${data.location || 'Not available'}`;
        userDetailsContainer.appendChild(location);
    } catch (error) {
        errorContainer.textContent = error.message;
        userDetailsContainer.innerHTML = "";
    }
}
