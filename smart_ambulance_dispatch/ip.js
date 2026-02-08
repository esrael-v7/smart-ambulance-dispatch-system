// JavaScript to handle login popup
const loginButton = document.querySelector('.login-button');
const loginPopup = document.getElementById('loginPopup');
const body = document.body;

// popup logic to blur background
function toggleBlur(isBlurred) {
    const mainContent = document.querySelector('main'); // Assuming main content is wrapped in a <main> tag
    if (mainContent) {
        if (isBlurred) {
            mainContent.classList.add('blurred');
        } else {
            mainContent.classList.remove('blurred');
        }
    }
}

// Show the login popup
loginButton.addEventListener('click', (e) => {
    e.preventDefault();
    loginPopup.classList.add('active');
    body.classList.add('popup-active');
    toggleBlur(true);
});

// Close both login and registration popups when clicking outside

// JavaScript to handle registration popup
const registerLink = document.querySelector('.register a');
const registrationPopup = document.getElementById('registrationPopup');
const loginLink = document.getElementById('loginLink');

registerLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginPopup.classList.remove('active');
    registrationPopup.classList.add('active');
    toggleBlur(true);
});

loginLink.addEventListener('click', (e) => {
    e.preventDefault();
    registrationPopup.classList.remove('active');
    loginPopup.classList.add('active');
    toggleBlur(true);
});

// Mock account for login
const mockAccount = {
    email: "test@example.com",
    password: "password123"
};

// Track login state
let isLoggedIn = false;

// Handle logout functionality
const navbar = document.querySelector('.nav-links');

function updateNavbarForLogin() {
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.remove();
        const logoutButton = document.createElement('li');
        logoutButton.classList.add('logout-li');
        logoutButton.innerHTML = `
            <a href="#" class="logout-button">
                <img src="images/freepik__upload__51570.png" alt="Logout" class="logout-img" style="width:32px;height:32px;vertical-align:middle;">
                <span class="logout-text" style="display:none;">Logout</span>
            </a>`;
        navbar.appendChild(logoutButton);

        // Add logout functionality
        logoutButton.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Logged out successfully!');
            logoutButton.remove();
            const loginLi = document.createElement('li');
            loginLi.innerHTML = '<a href="#" class="login-button">Login</a>';
            navbar.appendChild(loginLi);
            body.classList.remove('popup-active');
            loginPopup.classList.remove('active');
            toggleBlur(false);
            reattachEventListeners();
        });
    }
}

// Call updateNavbarForLogin after successful login
function handleLoginSuccess() {
    isLoggedIn = true;
    loginPopup.classList.remove('active');
    body.classList.remove('popup-active');
    toggleBlur(false);
    updateNavbarForLogin();
}

// Update login form submission to call handleLoginSuccess
const loginForm = document.querySelector('.login-popup form');
loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = e.target.querySelector('input[type="email"]').value;
    const password = e.target.querySelector('input[type="password"]').value;

    if (email === mockAccount.email && password === mockAccount.password) {
        handleLoginSuccess();
    } else {
        alert('Invalid email or password.');
    }
});

// Corrected reattachEventListeners function
function reattachEventListeners() {
    const loginButton = document.querySelector('.login-button');
    if (loginButton) {
        loginButton.addEventListener('click', (e) => {
            e.preventDefault();
            loginPopup.classList.add('active');
            body.classList.add('popup-active');
            toggleBlur(true);
        });
    }

    const registerLink = document.querySelector('.register a');
    if (registerLink) {
        registerLink.addEventListener('click', (e) => {
            e.preventDefault();
            loginPopup.classList.remove('active');
            registrationPopup.classList.add('active');
            toggleBlur(true);
        });
    }

    const requestAmbulanceButton = document.querySelector('.request-button');
    if (requestAmbulanceButton) {
        requestAmbulanceButton.addEventListener('click', (e) => {
            e.preventDefault();
            if (!isLoggedIn) {
                alert('You must log in first to request an ambulance.');
                return;
            }
            requestAmbulancePopup.style.display = 'block';
            requestAmbulancePopup.classList.add('active');
            body.classList.add('popup-active');
            toggleBlur(true);
        });
    }
}
// Update the "Services" button event listener to show the services section
const servicesButton = document.querySelector('.nav-links li:nth-child(2) a'); // Updated selector for "Services" button
if (servicesButton) {
    servicesButton.addEventListener('click', (e) => {
        e.preventDefault();

        // Hide other sections and display the services section
        document.querySelectorAll('main > section').forEach(section => section.style.display = 'none');
        const servicesPage = document.getElementById('servicesPage');
        if (servicesPage) {
            servicesPage.style.display = 'block';
        }
    });
}

// Add functionality to display the "Request Ambulance" form as a popup
const requestAmbulancePopup = document.createElement('div');
requestAmbulancePopup.id = 'requestAmbulancePopup';
requestAmbulancePopup.classList.add('popup');
requestAmbulancePopup.style.display = 'none';// Ensure the "Request Ambulance" popup is hidden by default
body.appendChild(requestAmbulancePopup);// Append the popup to the body
requestAmbulancePopup.innerHTML = `
    <h1>Request Ambulance</h1> 
    <form>
        <label for="address">Address</label>
        <input type="text" id="address" placeholder="Enter your address" required>

        <label for="phone">Phone Number</label>
        <input type="tel" id="phone" placeholder="Enter your phone number" required>

        <label for="condition">Condition</label>
        <select id="condition" required>
            <option value="">Select a condition</option>
            <option value="heart_attack">Heart Attack</option>
            <option value="stroke">Stroke</option>
            <option value="fracture">Fracture</option>
            <option value="burn">Burn</option>
            <option value="allergic_reaction">Allergic Reaction</option>
            <option value="other">Other</option>
        </select>

        <button type="submit" class="submit-request-button">Request Ambulance</button>
    </form>
`;
// event listener for the "Request Ambulance" button
const requestAmbulanceButton = document.querySelector('.request-button');
if (requestAmbulanceButton) {
    requestAmbulanceButton.addEventListener('click', (e) => {
        e.preventDefault();
        if (!isLoggedIn) {
            alert('You must log in first to request an ambulance.');
            return;
        }
        requestAmbulancePopup.style.display = 'block';
        requestAmbulancePopup.classList.add('active');
        body.classList.add('popup-active');
        toggleBlur(true);
    });
}

// the "Request Ambulance" form submission logic
const requestAmbulanceForm = requestAmbulancePopup.querySelector('form');
if (requestAmbulanceForm) {
    requestAmbulanceForm.addEventListener('submit', (e) => {
        e.preventDefault(); // Prevent page refresh

        // Capture form data
        const address = e.target.querySelector('#address').value;
        const phone = e.target.querySelector('#phone').value;
        const condition = e.target.querySelector('#condition').value;

        if (!address || !phone || !condition) {
            alert('Please fill out all fields before submitting.');
            return;
        }

        // Close the popup
        requestAmbulancePopup.style.display = 'none';
        requestAmbulancePopup.classList.remove('active');
        body.classList.remove('popup-active');
        toggleBlur(false);

        // Maintain logged-in state (isLoggedIn remains true)
    });
}

// Optional: Persist logged-in state using localStorage
if (isLoggedIn) {
    localStorage.setItem('isLoggedIn', 'true');
}

// Restore logged-in state on page load
window.addEventListener('load', () => {
    if (localStorage.getItem('isLoggedIn') === 'true') {
        isLoggedIn = true;
        updateNavbarForLogin();
    }
});

// popup closing logic
window.addEventListener('click', (e) => {
    const activePopups = [loginPopup, registrationPopup, requestAmbulancePopup];
    const triggerButtons = [loginButton, registerLink, requestAmbulanceButton,];

    activePopups.forEach((popup, index) => {
        if (popup && popup.classList.contains('active') && !popup.contains(e.target) && !triggerButtons[index].contains(e.target)) {
            popup.classList.remove('active');
            body.classList.remove('popup-active');
            toggleBlur(false);
            if (popup === requestAmbulancePopup) {
                popup.style.display = 'none';
            }
        }
    });
});
// Add functionality to the "Contacts" button
const contactsButton = document.querySelector('.nav-links li:nth-child(3) a'); // Assuming the Contacts button is the third link in the navbar
if (contactsButton) {
    contactsButton.addEventListener('click', (e) => {
        e.preventDefault();
        const footer = document.getElementById('footer'); // Assuming the footer has an ID of 'footer'
        if (footer) {
            footer.scrollIntoView({ behavior: 'smooth' });
        }
    });
}

// Add functionality to the "Home" button
const homeButton = document.querySelector('.nav-links li:nth-child(1) a'); // Assuming Home is the first link
if (homeButton) {
    homeButton.addEventListener('click', (e) => {
        e.preventDefault();
        // Hide only the services section (and any other non-home sections)
        const servicesPage = document.getElementById('servicesPage');
        if (servicesPage) servicesPage.style.display = 'none';
        // Show all other main sections (home content) by removing inline display style
        document.querySelectorAll('main > section').forEach(section => {
            if (!servicesPage || section !== servicesPage) {
                section.style.display = '';
            }
        });
        // Close all popups
        const loginPopup = document.getElementById('loginPopup');
        const registrationPopup = document.getElementById('registrationPopup');
        const requestAmbulancePopup = document.getElementById('requestAmbulancePopup');
        if (loginPopup) loginPopup.classList.remove('active');
        if (registrationPopup) registrationPopup.classList.remove('active');
        if (requestAmbulancePopup) {
            requestAmbulancePopup.classList.remove('active');
            requestAmbulancePopup.style.display = 'none';
        }
        // Remove blur and popup-active classes
        document.body.classList.remove('popup-active');
        toggleBlur(false);
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// Mobile menu toggle for responsive navigation
const mobileMenuButton = document.querySelector('.mobile-menu-button');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuButton && navLinks) {
    mobileMenuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active'); // Show/hide nav links on mobile
    });

    // Ensure login popup opens and menu closes on mobile
    const mobileLoginButton = navLinks.querySelector('.login-button');
    if (mobileLoginButton) {
        mobileLoginButton.addEventListener('click', (e) => {
            if (isMobile()) {
                navLinks.classList.remove('active'); // Close mobile menu
            }
            // The rest is handled by the main login popup event
        });
    }
}

// Optional: Adjust menu state on window resize
function isMobile() {
    return window.innerWidth <= 768;
}

window.addEventListener('resize', () => {
    if (!isMobile() && navLinks) {
        navLinks.classList.remove('active'); // Ensure menu is visible on desktop
    }
});

// Reattach event listeners to ensure they work after DOM changes               
reattachEventListeners();