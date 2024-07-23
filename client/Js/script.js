window.onload = () => {
    const userName = window.sessionStorage.getItem('userName');
    
    const userNameElement = document.getElementById('user-name');
    if (userNameElement) {
        userNameElement.textContent = userName ? userName : 'Guest'; // Default to 'Guest' if no name is found
    }
};
