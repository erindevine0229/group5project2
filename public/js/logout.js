const logout = async () => {
    try {
        const response = await fetch('/api/users/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/'); // Redirect to the homepage
        } else {
            alert('Failed to log out.');
        }
    } catch (error) {
        console.error('Error logging out:', error);
        alert('An error occurred while logging out.');
    }
};

document.getElementById('logout').addEventListener('click', logout);