// Responzivní navigace

function hamburgerMenu() {
    const open = document.getElementById("hamburger");
    let changeIcon = true;

    open.addEventListener("click", function() {
        const overlay = document.querySelector(".overlay");
        const nav = document.querySelector("nav ul");
        const icon = document.querySelector(".menu-toggle i");

        overlay.classList.toggle("menu-open");
        nav.classList.toggle("menu-open");

        if (changeIcon) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-times");

            changeIcon = false;
        } else {
            icon.classList.remove("fa-times");
            icon.classList.add("fa-bars");
            changeIcon = true;
        }
    });
}
hamburgerMenu();

// Animace fixovaného menu Headru

window.onscroll = function() {
    scrollEffect();
};

function scrollEffect() {
    if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
        document.getElementById("header-nav").classList.add("nav--fixed");
    } else {
        document.getElementById("header-nav").classList.remove("nav--fixed");
    }
}

// Slideshow

let slideIndex = 0;
const mySlider = document.getElementById("slider--containerID");
let myInterval = setInterval(showSlides, 5000);

function plusSlides(n) {
    clearInterval(myInterval);
    showSlides((slideIndex += n));
}

function currentSlide(n) {
    showSlides((slideIndex = n));
}

if (mySlider == null) {} else {
    mySlider.addEventListener("mouseover", function() {
        clearInterval(myInterval);
    });

    mySlider.addEventListener("mouseout", function() {
        myInterval = setInterval(showSlides, 5000);
    });
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("mySlides");

    if (n == undefined) {
        n = ++slideIndex;
    }
    if (n > slides.length) {
        slideIndex = 1;
    }
    if (n < 1) {
        slideIndex = slides.length;
    }
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    if (slides[slideIndex - 1] == undefined) {} else {
        slides[slideIndex - 1].style.display = "block";
    }
}

// Aktivní položka navigace
const url = document.querySelector(
    ".nav__link a[href='" + window.location.pathname + "']"
);

if (url == null) {} else {
    url.classList.add("activeItem");
}

//autocomplete
function AutoComplete() {
    // The autoComplete.js Engine instance creator
    const autoCompleteJS = new autoComplete({
        data: {
            src: async() => {
                try {
                    // Loading placeholder text
                    document
                        .getElementById("autoComplete")
                        .setAttribute("placeholder", "Loading...");
                    // Fetch External Data Source
                    const source = await fetch(
                        "https://tarekraafat.github.io/autoComplete.js/demo/db/generic.json"
                    );
                    const data = await source.json();
                    // Post Loading placeholder text
                    document
                        .getElementById("autoComplete")
                        .setAttribute("placeholder", autoCompleteJS.placeHolder);
                    // Returns Fetched data
                    return data;
                } catch (error) {
                    return error;
                }
            },
            keys: ["food", "cities", "animals"],
            cache: true,
            filter: (list) => {
                // Filter duplicates
                // incase of multiple data keys usage
                const filteredResults = Array.from(
                    new Set(list.map((value) => value.match))
                ).map((food) => {
                    return list.find((value) => value.match === food);
                });

                return filteredResults;
            },
        },
        placeHolder: "Hledat na blogu...",
        resultsList: {
            element: (list, data) => {
                const info = document.createElement("p");
                if (data.results.length > 0) {
                    info.innerHTML = `Displaying <strong>${data.results.length}</strong> out of <strong>${data.matches.length}</strong> results`;
                } else {
                    info.innerHTML = `Found <strong>${data.matches.length}</strong> matching results for <strong>"${data.query}"</strong>`;
                }
                list.prepend(info);
            },
            noResults: true,
            maxResults: 15,
            tabSelect: true,
        },
        resultItem: {
            element: (item, data) => {
                // Modify Results Item Style
                item.style = "display: flex; justify-content: space-between;";
                // Modify Results Item Content
                item.innerHTML = `
      <span style="text-overflow: ellipsis; white-space: nowrap; overflow: hidden;">
        ${data.match}
      </span>
      <span style="display: flex; align-items: center; font-size: 13px; font-weight: 100; text-transform: uppercase; color: rgba(0,0,0,.2);">
        ${data.key}
     
      </span>`;
            },
            highlight: true,
        },
        events: {
            input: {
                focus: () => {
                    if (autoCompleteJS.input.value.length) autoCompleteJS.start();
                },
            },
        },
    });

    // autoCompleteJS.input.addEventListener("init", function (event) {
    //   console.log(event);
    // });

    // autoCompleteJS.input.addEventListener("response", function (event) {
    //   console.log(event.detail);
    // });

    // autoCompleteJS.input.addEventListener("results", function (event) {
    //   console.log(event.detail);
    // });

    // autoCompleteJS.input.addEventListener("open", function (event) {
    //   console.log(event.detail);
    // });

    autoCompleteJS.input.addEventListener("selection", function(event) {
        const feedback = event.detail;
        autoCompleteJS.input.blur();
        // Prepare User's Selected Value
        const selection = feedback.selection.value[feedback.selection.key];
        // Render selected choice to selection div
        // document.querySelector(".selection").innerHTML = selection;
        // Replace Input value with the selected value
        autoCompleteJS.input.value = selection;
        // Console log autoComplete data feedback
        console.log(feedback);
    });

    // autoCompleteJS.input.addEventListener("close", function (event) {
    //   console.log(event.detail);
    // });

    // Toggle Search Engine Type/Mode
    document.querySelector(".toggler").addEventListener("click", () => {
        // Holds the toggle button selection/alignment
        const toggle = document.querySelector(".toggle").style.justifyContent;

        if (toggle === "flex-start" || toggle === "") {
            // Set Search Engine mode to Loose
            document.querySelector(".toggle").style.justifyContent = "flex-end";
            document.querySelector(".toggler").innerHTML = "Loose";
            autoCompleteJS.searchEngine = "loose";
        } else {
            // Set Search Engine mode to Strict
            document.querySelector(".toggle").style.justifyContent = "flex-start";
            document.querySelector(".toggler").innerHTML = "Strict";
            autoCompleteJS.searchEngine = "strict";
        }
    });

    // Blur/unBlur page elements
    const action = (action) => {
        /*    const title = document.querySelector("h1");
                    const mode = document.querySelector(".mode");*/
        const selection = document.querySelector(".selection");
        const footer = document.querySelector(".footer");

        if (action === "dim") {
            //   title.style.opacity = 1;
            //   mode.style.opacity = 1;
            selection.style.opacity = 1;
        } else {
            //    title.style.opacity = 0.3;
            //    mode.style.opacity = 0.2;
            selection.style.opacity = 0.1;
        }
    };

    // Blur/unBlur page elements on input focus
    ["focus", "blur"].forEach((eventType) => {
        autoCompleteJS.input.addEventListener(eventType, () => {
            // Blur page elements
            if (eventType === "blur") {
                action("dim");
            } else if (eventType === "focus") {
                // unBlur page elements
                action("light");
            }
        });
    });
}

function formValidation() {
    const form = document.getElementById("form");
    const username = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const password2 = document.getElementById("password2");
    const labelForm = document.getElementById("small-kontakt");

    //Show input error messages
    function showError(input, message) {
        const formControl = input.parentElement.parentElement;
        formControl.className = "form-control error";

        const small = formControl.querySelector("small");
        small.innerText = message;
        labelForm.classList.add("error");
    }

    //show success colour
    function showSucces(input) {
        const formControl = input.parentElement.parentElement;
        formControl.className = "form-control success";
        labelForm.classList.add("success");
    }

    //check email is valid
    function checkEmail(input) {
        const re =
            /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (re.test(input.value.trim())) {
            showSucces(input);
        } else {
            showError(input, "Email není ve správném formátu");
        }
    }

    //checkRequired fields
    function checkRequired(inputArr) {
        inputArr.forEach(function(input) {
            if (input.value.trim() === "") {
                showError(input, `${getFieldName(input)} is required`);
            } else {
                showSucces(input);
            }
        });
    }

    //check input Length
    function checkLength(input, min, max) {
        if (input.value.length < min) {
            showError(input, `${getFieldName(input)} musí být více než ${min} znaků`);
        } else if (input.value.length > max) {
            showError(input, `${getFieldName(input)} musí být méně než ${max} znaků`);
        } else {
            showSucces(input);
        }
    }

    //get FieldName
    function getFieldName(input) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    }

    // check passwords match
    function checkPasswordMatch(input1, input2) {
        if (input1.value !== input2.value) {
            showError(input2, "Passwords do not match");
        }
    }

    //Event Listeners
    form.addEventListener("submit", function(e) {
        e.preventDefault();

        checkRequired([username, email]);
        checkLength(username, 3, 15);
        //   checkLength(password, 6, 25);
        checkEmail(email);
        /*   checkPasswordMatch(password, password2);*/
    });
}