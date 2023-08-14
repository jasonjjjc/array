// wait for the page to load before running the script
$(document).ready(function () {


    // make the header menu appear and disappear when the menu button is clicked and enable other buttons to close the nav on small screens

    // Get the elements by their IDs
    const hidesNav = document.querySelectorAll('.hides-nav');
    const nav = document.getElementById('nav');


    // Add event listener to the menu-wrapper element
    hidesNav.forEach((el) => {
        el.addEventListener('click', function () {
            // Get the current screen width
            const screenWidth = window.innerWidth;

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
        el.addEventListener('click', function () {
            // Get the current screen width
            const screenWidth = window.innerWidth;

            if (el.id !== 'nav' && screenWidth < 992) {
                // Check if the nav is currently visible
                const isNavVisible = parseInt(getComputedStyle(nav).left) >= 0;

                // Toggle the visibility of the nav with animation
                if (isNavVisible) {
                    hideNav();
                }
            }
        });
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






    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////////////////





    // Display and hide the addPhoto modal ///////////////////////////////////////////////////////////////////

    const addPhotoBtn = document.getElementById("addPhotoBtn");
    const addPhotoOverlay = document.getElementById("addPhoto");
    const closeAddPhotoOverlay = document.getElementById("closeAddPhotoOverlay");
    const changeBtn = document.getElementById("changeBtn");
    const photoPreview = document.getElementById("photoPreview");
    const backdrop = document.getElementById("modalBackdrop");

    // Object to store the new collection item
    let newCollectionItem = {
        email: "",
        photos: []
    };

    addPhotoBtn.addEventListener("click", () => {
        backdrop.style.display = "block";
        addPhotoOverlay.style.display = "flex";
        addPhotoOverlay.style.visibility = "visible";
        addPhotoOverlay.style.opacity = "1";
        photoPreview.style.backgroundImage = 'url("https://picsum.photos/800?' + new Date().getTime() + '")';
        newCollectionItem.photos.push(photoPreview.style.backgroundImage.slice(5, -2));
    });

    closeAddPhotoOverlay.addEventListener("click", () => {
        backdrop.style.display = "none";
        addPhotoOverlay.style.display = "none";
        addPhotoOverlay.style.visibility = "hidden";
        addPhotoOverlay.style.opacity = "0";
    });


    // Change the image in the preview ///////////////////////////////////////////////////////////////////



    changeBtn.addEventListener("click", () => {
        photoPreview.style.backgroundImage = 'url("https://picsum.photos/800?' + new Date().getTime() + '")';
        console.log(photoPreview.style.backgroundImage);
    });




    // Store an image and display the email address input ///////////////////////////////////////////////////////////////////

    const chooseBtn = document.getElementById("chooseBtn");
    const emailForm = document.getElementById("emailForm");


    function displayEmailForm() {
        emailForm.style.display = "flex";
    }


    chooseBtn.addEventListener("click", () => {
        displayEmailForm();
    });



    // handle email addresses by storing them to cookies then using the cookies to populate the datalist called emailSuggestions ///////////////////////////////////////////////////////////////////

    // add email to cookies if it is not already there

    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    function addToCookies(email) {
        // Fetch the current emails from the cookie
        const existingEmails = getCookie("userEmails");
        const emailsList = existingEmails ? JSON.parse(existingEmails) : [];

        // If the email is not in the cookie list, add it
        if (!emailsList.includes(email)) {
            emailsList.push(email);
            setCookie("userEmails", JSON.stringify(emailsList), 365);
        }
    }

    // Get the email suggestions datalist

    // Utility function to get a cookie
    function getCookie(name) {
        const value = "; " + document.cookie;
        const parts = value.split("; " + name + "=");
        if (parts.length === 2) return parts.pop().split(";").shift();
    }

    function updateEmailSuggestions(email) {
        // Check if the email is already in the datalist to prevent duplicates
        const existingOption = emailSuggestions.querySelector(`[value="${email}"]`);

        if (!existingOption) {
            const option = document.createElement('option');
            option.value = email;
            emailSuggestions.appendChild(option);
        }
    }



    const submitBtn = document.getElementById("addToCollectionBtn");


    submitBtn.addEventListener("click", (event) => {

        // prevent the default form submission
        event.preventDefault();

        // store the email in the newCollectionItem object
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        const emailLabel = document.getElementById("emailLabel");
        const emailSuggestions = document.getElementById('emailSuggestions');


        // validate the email address, display notification to the user to enter valid email address if necessary and exit function

        // Check for existing error message and remove it if present
        const existingErrorMessage = document.getElementById("emailErrorMessage");
        if (existingErrorMessage) {
            existingErrorMessage.remove();
        }

        // Email validation using a regular expression
        const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if (!emailPattern.test(email)) {
            const errorMessage = document.createElement("p");
            errorMessage.id = "emailErrorMessage";
            errorMessage.textContent = "Please enter a valid email address.";
            errorMessage.style.color = "red";
            emailLabel.appendChild(errorMessage);
            return;  // Exit the function if the email is not valid
        }

        // If the email is valid, store it in the newCollectionItem object
        newCollectionItem.email = email;


        // Add the current email to the cookies
        addToCookies(email);


        const existingEmails = getCookie("userEmails");
        const emailsList = existingEmails ? JSON.parse(existingEmails) : [];
        emailsList.forEach(email => {
            updateEmailSuggestions(email);
        });


        // display the new collection item in the collection list

        function addPhotoToCollection() {
            // Get the collection content container
            const collectionContent = document.getElementById("collection-content");

            // Check if a div with the email already exists
            const existingEmailDiv = document.querySelector(`.email-card[data-email="${newCollectionItem.email}"]`);

            if (existingEmailDiv) {
                // If the div exists, add the new image to it
                const imgDiv = document.createElement("div");
                imgDiv.classList.add("img-div");
                const img = document.createElement("img");
                img.src = newCollectionItem.photos[0];
                imgDiv.appendChild(img);

                const imgOverlay = document.createElement("div");
                imgOverlay.classList.add("img-overlay");
                imgOverlay.innerHTML = `Delete from collection`;
                imgOverlay.addEventListener("click", () => {
                    // Remove the image from the collection
                    const imgDiv = imgOverlay.parentElement;
                    const emailDiv = imgDiv.parentElement;
                    if (emailDiv.children.length === 2) {
                        emailDiv.remove();
                    }   else {
                        imgDiv.remove();
                    }
                });

                imgDiv.appendChild(imgOverlay);

                existingEmailDiv.appendChild(imgDiv);


            } else {
                // If the div doesn't exist, create a new card with the email and image
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("email-card");
                cardDiv.setAttribute("data-email", newCollectionItem.email);

                const emailHeader = document.createElement("h4");
                emailHeader.innerText = newCollectionItem.email;
                cardDiv.appendChild(emailHeader);

                const imgDiv = document.createElement("div");
                imgDiv.classList.add("img-div");
                const img = document.createElement("img");
                img.src = newCollectionItem.photos[0];
                imgDiv.appendChild(img);

                const imgOverlay = document.createElement("div");
                imgOverlay.classList.add("img-overlay");
                imgOverlay.innerHTML = `Delete from collection`;
                imgOverlay.addEventListener("click", () => {
                    // Remove the image from the collection
                    const imgDiv = imgOverlay.parentElement;
                    const emailDiv = imgDiv.parentElement;
                    if (emailDiv.children.length === 2) {
                        emailDiv.remove();
                    }   else {
                        imgDiv.remove();
                    }
                });

                imgDiv.appendChild(imgOverlay);

                cardDiv.appendChild(imgDiv);

                collectionContent.appendChild(cardDiv);

                const emptyText = collectionContent.querySelector("#collection-empty");
                emptyText.style.display = "none";
            }
        }

        addPhotoToCollection();


        // hide the email form and the addPhotoOverlay
        backdrop.style.display = "none";
        emailForm.style.display = "none";
        addPhotoOverlay.style.display = "none";
        addPhotoOverlay.style.visibility = "hidden";
        addPhotoOverlay.style.opacity = "0";


        // display the success message
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "flex";
        successMessage.style.visibility = "visible";
        successMessage.style.opacity = "1";

        // reset the newCollectionItem object after the success message is displayed
        newCollectionItem = {
            email: "",
            photos: []
        };
    });

    // close the success message ///////////////////////////////////////////////////////////////////

    const closeSuccessMessage = document.getElementById("closeSuccessMessage");

    closeSuccessMessage.addEventListener("click", () => {
        const successMessage = document.getElementById("successMessage");
        successMessage.style.display = "none";
        successMessage.style.visibility = "hidden";
        successMessage.style.opacity = "0";
    });



});