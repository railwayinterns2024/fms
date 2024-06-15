import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";

const auth = getAuth(); // Initialize Firebase auth

// Add event listener for auth state changes
onAuthStateChanged(auth, (user) => {
  if (!user) {
    window.location.href = 'index.html'; // Redirect to login page if user is not authenticated
  }
});

// Add event listener for logout button
const logoutButton = document.getElementById('logout');
logoutButton.addEventListener('click', () => {
  localStorage.removeItem('loggedInUserId'); // Remove user ID from local storage
  signOut(auth)
    .then(() => {
      window.location.href = 'index.html'; // Redirect to login page after logout
    })
    .catch((error) => {
      console.error('Error signing out:', error);
    });
});

// Add event listener for popstate (back button)
window.addEventListener('popstate', (event) => {
  const loggedInUserId = localStorage.getItem('loggedInUserId');
  if (!loggedInUserId) {
    window.location.href = 'index.html'; // Redirect to login page if user is not authenticated and navigates back
  }
});
