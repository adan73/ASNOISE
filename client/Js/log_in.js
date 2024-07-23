document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const signinForm = document.getElementById('signin-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission

            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Validate input
            if (!username || !password) {
                alert('Please enter both username and password.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8081/api/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ username, password })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();

                if (data.success) {
                    // Redirect to index.html on successful login
                    window.location.href = 'index.html';
                } else {
                    alert(data.error || 'Login failed');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('Username or Password are invalid.');
            }
        });
    }

    if (signinForm) {
        signinForm.addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent the default form submission
            
            const first_name = document.getElementById('firstname').value;
            const last_name = document.getElementById('lastname').value;
            const users_id = document.getElementById('id').value;
            const username = document.getElementById('username').value;
            const user_password = document.getElementById('password').value;
            const email = document.getElementById('email').value;
            const profile_image = 'user_first_profile.jpg';

            // Validate input
            if (!users_id || !first_name || !last_name || !user_password || !email || !username) {
                alert('Please fill all the requested data.');
                return;
            }

            try {
                const response = await fetch('http://127.0.0.1:8081/api/addUser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ users_id, first_name, last_name, user_password, email, profile_image, username })
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok.');
                }

                const data = await response.json();

                if (data.success) {
                    window.location.href = 'index.html';
                } else {
                    alert(data.error || 'Sign in failed');
                }
            } catch (error) {
                console.error('Error during signin:', error);
                alert('Username or Email or Id is already exist. Please try again.');
            }
        });
    }
});
