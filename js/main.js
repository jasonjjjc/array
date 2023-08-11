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





    // Display and hide the addPhoto modal ///////////////////////////////////////////////////////////////////

    const addPhotoBtn = document.getElementById("addPhotoBtn");
    const addPhotoOverlay = document.getElementById("addPhoto");
    const closeAddPhotoOverlay = document.getElementById("closeAddPhotoOverlay");

    addPhotoBtn.addEventListener("click", () => {
        addPhotoOverlay.style.visibility = "visible";
        addPhotoOverlay.style.opacity = "1";
    });

    closeAddPhotoOverlay.addEventListener("click", () => {
        addPhotoOverlay.style.visibility = "hidden";
        addPhotoOverlay.style.opacity = "0";
    });


    // Change the image in the preview ///////////////////////////////////////////////////////////////////

    const changeBtn = document.getElementById("changeBtn");
    const photoPreview = document.getElementById("photoPreview");

    changeBtn.addEventListener("click", () => {
        photoPreview.style.backgroundImage = 'url("https://picsum.photos/800?' + new Date().getTime() + '")';
        console.log(photoPreview.style.backgroundImage);
    });




    // Store an image and display the email address input ///////////////////////////////////////////////////////////////////

    const chooseBtn = document.getElementById("chooseBtn");
    const emailForm = document.getElementById("emailForm");

    // Object to store the new collection item
    let newCollectionItem = {
        email: "",
        photos: []
    };


    // Function to store the chosen image URL
    function storePhoto() {
        const currentBackgroundImage = photoPreview.style.backgroundImage.slice(5, -2);
        if (newCollectionItem.photos.length === 0) {
            newCollectionItem.photos.push(currentBackgroundImage);
        } else if (!newCollectionItem.photos.includes(currentBackgroundImage)) {
            newCollectionItem.photos.push(currentBackgroundImage);
        }
    }


    function displayEmailForm() {
        emailForm.style.display = "flex";
    }


    chooseBtn.addEventListener("click", () => {
        storePhoto();
        displayEmailForm();
        console.log(newCollectionItem);
    });



    // store the email address, add the photo and email address to to collection and display the success message ///////////////////////////////////////////////////////////////////

    const submitBtn = document.getElementById("addToCollectionBtn");

    submitBtn.addEventListener("click", (event) => {

        // prevent the default form submission
        event.preventDefault();

        // store the email in the newCollectionItem object
        const emailInput = document.getElementById("email");
        const email = emailInput.value;
        newCollectionItem.email = email;
        console.log(newCollectionItem);

        // display the new collection item in the collection list

        function addPhotoToCollection() {
            // Get the collection content container
            const collectionContent = document.getElementById("collection-content");

            // Check if a div with the email already exists
            const existingEmailDiv = document.querySelector(`.email-card[data-email="${newCollectionItem.email}"]`);

            if (existingEmailDiv) {
                // If the div exists, add the new image to it
                const img = document.createElement("img");
                img.src = newCollectionItem.photos[0];
                existingEmailDiv.appendChild(img);
            } else {
                // If the div doesn't exist, create a new card with the email and image
                const cardDiv = document.createElement("div");
                cardDiv.classList.add("email-card");
                cardDiv.setAttribute("data-email", newCollectionItem.email);

                const emailHeader = document.createElement("h4");
                emailHeader.innerText = newCollectionItem.email;
                cardDiv.appendChild(emailHeader);

                const img = document.createElement("img");
                img.src = newCollectionItem.photos[0];
                cardDiv.appendChild(img);

                // Add the new card to the collection content
                collectionContent.appendChild(cardDiv);

                // Optionally, remove the placeholder text from the collection content
                const placeholderTexts = collectionContent.querySelectorAll("p");
                placeholderTexts.forEach(p => p.style.display = "none");
            }
        }

        addPhotoToCollection();


        // hide the email form and the addPhotoOverlay
        emailForm.style.display = "none";
        addPhotoOverlay.style.visibility = "hidden";
        addPhotoOverlay.style.opacity = "0";


        // display the success message
        const successMessage = document.getElementById("successMessage");
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
        successMessage.style.visibility = "hidden";
        successMessage.style.opacity = "0";
    });



});