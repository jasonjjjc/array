// wait for the page to load before running the script
$(document).ready(function () {


    // make the header menu appear and disappear when the menu button is clicked and enable other buttons to close the nav on small screens

    // Get the elements by their IDs
    const hidesNav = document.querySelectorAll('.hides-nav');
    const nav = document.getElementById('nav');
    // get the width of the screen
    const screenWidth = window.innerWidth;

    // Add event listener to the menu-wrapper element
    hidesNav.forEach((el) => {
        el.addEventListener('click', function () {
            // Check if the nav is currently visible
            const isNavVisible = parseInt(getComputedStyle(nav).left) >= 0;

            // Toggle the visibility of the nav with animation
            if (el.id === 'menu-wrapper') {
                // only the menu button can both open and close the nav
                if (isNavVisible) {
                    hideNav();
                } else {
                    showNav();
                }
            } else {

                // all others can only close the nav if the screen is small, otherwise the nav will stay visible
                if (isNavVisible && screenWidth < 992) {
                    hideNav();
                }
            }
        });


    })

    // attach an eventListener to every element on the page that is not the nav bar so that on mobile the user can click anywhere on the page to close the nav

    // Get all the elements on the page
    const allElements = document.querySelectorAll('*');

    // Add event listener to each element
    allElements.forEach((el) => {
        if (el.id !== 'nav' && screenWidth < 992) {
            el.addEventListener('click', function () {
                // Check if the nav is currently visible
                const isNavVisible = parseInt(getComputedStyle(nav).left) >= 0;

                // Toggle the visibility of the nav with animation
                if (isNavVisible) {
                    hideNav();
                }
            });
        }
    });





    // Function to animate showing the nav
    function showNav() {
        nav.style.left = '0'; // Move the nav back to its original position
    }

    // Function to animate hiding the nav
    function hideNav() {
        nav.style.left = '-200px'; // Move the nav off to the left
    }


    // listen to the screen width to reposition the nav when the screen width is large or wider

    function handleResponsive() {
        const largeScreenWidth = 992; // Define the large screen width (replace with your desired value)
        const nav = document.getElementById('nav');

        // Get the current screen width
        const screenWidth = window.innerWidth;

        // Check if the screen width is greater than or equal to the large screen width
        if (screenWidth >= largeScreenWidth) {
            nav.style.left = '0'; // Apply the corresponding style when the condition is met
        } else {
            nav.style.left = ''; // Reset the style when the condition is not met
        }
    }

    // Call the function initially to set the style based on the initial screen width
    handleResponsive();

    // Listen for the 'resize' event on the 'window' object and call the function accordingly
    window.addEventListener('resize', handleResponsive);













    // Perform input validation on all contact form inputs and ensure that the email address is in a valid format using regex

    // Get the form and submit button elements
    const contactSection = document.getElementById('contact');
    const contactForm = document.getElementById('contact-form');
    const contactFormInputs = document.getElementById('contact-form-inputs');
    const submitButton = document.getElementById('contact-form-submit');

    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Function to display validation error messages below the input fields
    function showValidationError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'validation-error';
        errorDiv.textContent = message;
        contactFormInputs.appendChild(errorDiv);
    }

    // Function to remove validation error messages
    function removeAllValidationErrors() {
        const errorDivs = document.querySelectorAll('.validation-error');
        errorDivs.forEach(errorDiv => {
            errorDiv.remove();
        });
    }

    // Add event listener to the form's submit button
    // Add event listener to the form's submit button
    // submitButton.addEventListener('click', function (event) {
    //     // Prevent the form from submitting by default
    //     event.preventDefault();

    //     // Remove all existing validation error messages
    //     removeAllValidationErrors();

    //     // Get the values of the form fields
    //     const firstName = document.getElementById('first-name').value;
    //     const lastName = document.getElementById('last-name').value;
    //     const email = document.getElementById('email').value;
    //     const message = document.getElementById('contact-form-inputs-message').value;

    //     // Array to store validation error messages
    //     let errorMessages = [];

    //     // Perform basic validation
    //     if (firstName.trim() === '') {
    //         errorMessages.push('Please enter your first name.');
    //     }

    //     if (lastName.trim() === '') {
    //         errorMessages.push('Please enter your last name.');
    //     }

    //     if (email.trim() === '') {
    //         errorMessages.push('Please enter your email address.');
    //     } else if (!emailRegex.test(email)) {
    //         errorMessages.push('Please enter a valid email address.');
    //     }

    //     if (message.trim() === '') {
    //         errorMessages.push('Please enter your message.');
    //     }

    //     // Display all validation error messages
    //     errorMessages.forEach(message => {
    //         showValidationError(message);
    //     });

    //     // If there are no validation errors, proceed with form submission
    //     if (errorMessages.length === 0) {
    //         // If all validation passes, submit the form
    //         // contactForm.submit();
    //         // append confirmation message to the form
    //         const confirmationMessage = document.createElement('p');
    //         confirmationMessage.className = 'confirmation-message';
    //         confirmationMessage.textContent = 'Thank you for your message. I will get back to you as soon as possible.';
    //         contactSection.appendChild(confirmationMessage);
    //         // remove the form
    //         contactForm.remove();
    //     }

    // });




    // Cookie Pop-up ////////////////////////////////////////////////////////////////////////////


    const crumbOverlay = document.getElementById("crumbOverlay");
    const acceptCrumbs = document.getElementById("acceptCrumbs");
    const crumbPreferenceBtn = document.getElementById("crumbPreferenceBtn");


    if (document.cookie.indexOf("cookiesAccepted=true") > -1) {
        crumbOverlay.style.display = "none";
        console.log(document.cookie);
    } else {
        crumbOverlay.style.display = "flex";
        console.log(document.cookie);
    }

    acceptCrumbs.addEventListener("click", () => {
        document.cookie = "cookiesAccepted=true; expires=Fri, 31 Dec 9999 23:59:59 GMT; path=/";
        if (document.cookie.indexOf("cookiesAccepted=true") > -1) {
            crumbOverlay.style.display = "none";
        } else {
            crumbOverlay.style.display = "flex";
        }

    });

    crumbPreferenceBtn.addEventListener("click", () => {
        crumbOverlay.style.display = "flex";
    });

});