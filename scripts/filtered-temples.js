const temples = [

    {
        templeName: "Aba Nigeria",
        location: "Aba, Nigeria",
        dedicated: "2005, August, 7",
        area: 11500,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },

    {
        templeName: "Manti Utah",
        location: "Manti, Utah, United States",
        dedicated: "1888, May, 21",
        area: 74792,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },

    {
        templeName: "Payson Utah",
        location: "Payson, Utah, United States",
        dedicated: "2015, June, 7",
        area: 96630,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },

    {
        templeName: "Yigo Guam",
        location: "Yigo, Guam",
        dedicated: "2020, May, 2",
        area: 6861,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },

    {
        templeName: "Washington D.C.",
        location: "Kensington, Maryland, United States",
        dedicated: "1974, November, 19",
        area: 156558,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },

    {
        templeName: "Lima Perú",
        location: "Lima, Perú",
        dedicated: "1986, January, 10",
        area: 9600,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },

    {
        templeName: "Mexico City Mexico",
        location: "Mexico City, Mexico",
        dedicated: "1983, December, 2",
        area: 116642,
        imageUrl:
            "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },

    {
        templeName: "Accra Ghana",
        location: "Accra, Ghana",
        dedicated: "2004, January, 11",
        area: 17500,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Accra%20Temple%20-%20panoramio.jpg"
    },

    {
        templeName: "St. George Utah",
        location: "St. George, Utah, United States",
        dedicated: "1877, April, 6",
        area: 108536,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/St%20George%20Utah%20Temple.jpg"
    },

    {
        templeName: "Johannesburg South Africa",
        location: "Johannesburg, South Africa",
        dedicated: "1985, August, 24",
        area: 19184,
        imageUrl:
            "https://commons.wikimedia.org/wiki/Special:FilePath/Johannesburg%20Temple%20from%20skyline.jpeg"
    }

];



/* ==========================================
   SELECT HTML ELEMENTS
========================================== */

const templeGrid = document.querySelector("#temple-grid");

const filterStatus = document.querySelector("#filter-status");

const filterLinks = document.querySelectorAll("[data-filter]");

const menuButton = document.querySelector("#menu-button");

const navigation = document.querySelector("#navigation");



/* ==========================================
   FORMAT THE DEDICATION DATE
========================================== */

function formatDate(dateString) {

    const parts = dateString.split(", ");

    return `${parts[1]} ${parts[2]}, ${parts[0]}`;

}



/* ==========================================
   CREATE ONE TEMPLE CARD
========================================== */

function createTempleCard(temple) {

    const figure = document.createElement("figure");

    figure.classList.add("temple-card");


    /* IMAGE */

    const image = document.createElement("img");

    image.src = temple.imageUrl;

    image.alt = `${temple.templeName} temple`;

    image.loading = "lazy";

    image.width = 400;

    image.height = 250;



    /* CAPTION */

    const figcaption = document.createElement("figcaption");


    /* TEMPLE NAME */

    const name = document.createElement("h3");

    name.textContent = temple.templeName;



    /* LOCATION */

    const location = document.createElement("p");

    location.innerHTML =
        `<strong>Location:</strong> ${temple.location}`;



    /* DEDICATION DATE */

    const dedicated = document.createElement("p");

    dedicated.innerHTML =
        `<strong>Dedicated:</strong> ${formatDate(temple.dedicated)}`;



    /* AREA */

    const area = document.createElement("p");

    area.innerHTML =
        `<strong>Area:</strong> ${temple.area.toLocaleString()} sq ft`;



    /* PUT INFORMATION TOGETHER */

    figcaption.append(
        name,
        location,
        dedicated,
        area
    );


    figure.append(
        image,
        figcaption
    );


    return figure;

}



/* ==========================================
   DISPLAY TEMPLES
========================================== */

function displayTemples(templeList) {

    templeGrid.innerHTML = "";


    templeList.forEach((temple) => {

        templeGrid.appendChild(
            createTempleCard(temple)
        );

    });

}



/* ==========================================
   FILTER TEMPLES
========================================== */

function filterTemples(filter) {

    switch (filter) {


        /* OLD: BEFORE 1900 */

        case "old":

            return temples.filter((temple) => {

                const year =
                    Number(temple.dedicated.split(",")[0]);

                return year < 1900;

            });



        /* NEW: AFTER 2000 */

        case "new":

            return temples.filter((temple) => {

                const year =
                    Number(temple.dedicated.split(",")[0]);

                return year > 2000;

            });



        /* LARGE: MORE THAN 90,000 SQ FT */

        case "large":

            return temples.filter((temple) => {

                return temple.area > 90000;

            });



        /* SMALL: LESS THAN 10,000 SQ FT */

        case "small":

            return temples.filter((temple) => {

                return temple.area < 10000;

            });



        /* HOME: ALL TEMPLES */

        default:

            return temples;

    }

}



/* ==========================================
   UPDATE THE PAGE AFTER FILTERING
========================================== */

function updateFilter(filter) {

    const filteredTemples =
        filterTemples(filter);


    displayTemples(filteredTemples);



    const labels = {

        home:
            "Showing all temples",

        old:
            "Showing temples dedicated before 1900",

        new:
            "Showing temples dedicated after 2000",

        large:
            "Showing temples larger than 90,000 sq ft",

        small:
            "Showing temples smaller than 10,000 sq ft"

    };


    filterStatus.textContent =
        `${labels[filter]} (${filteredTemples.length} temples)`;



    /* Highlight active menu item */

    filterLinks.forEach((link) => {

        const isActive =
            link.dataset.filter === filter;


        link.classList.toggle(
            "active",
            isActive
        );


        if (isActive) {

            link.setAttribute(
                "aria-current",
                "page"
            );

        } else {

            link.removeAttribute(
                "aria-current"
            );

        }

    });

}



/* ==========================================
   FILTER BUTTON EVENTS
========================================== */

filterLinks.forEach((link) => {

    link.addEventListener("click", (event) => {

        event.preventDefault();


        const filter =
            link.dataset.filter;


        updateFilter(filter);


        /* Close mobile menu */

        navigation.classList.remove("open");

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );


        /* Update browser URL */

        history.replaceState(
            null,
            "",
            `#${filter}`
        );

    });

});



/* ==========================================
   MOBILE MENU
========================================== */

menuButton.addEventListener("click", () => {

    const isOpen =
        navigation.classList.toggle("open");


    if (isOpen) {

        menuButton.textContent = "✖";

        menuButton.setAttribute(
            "aria-label",
            "Close navigation menu"
        );

    } else {

        menuButton.textContent = "☰";

        menuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

    }


    menuButton.setAttribute(
        "aria-expanded",
        String(isOpen)
    );

});



/* ==========================================
   FOOTER YEAR
========================================== */

document.querySelector("#currentyear").textContent =
    new Date().getFullYear();



/* ==========================================
   LAST MODIFIED
========================================== */

document.querySelector("#lastModified").textContent =
    `Last Modification: ${document.lastModified}`;



/* ==========================================
   DISPLAY HOME PAGE WHEN LOADED
========================================== */

const startingFilter =
    window.location.hash.replace("#", "");


const validFilters = [
    "home",
    "old",
    "new",
    "large",
    "small"
];


updateFilter(
    validFilters.includes(startingFilter)
        ? startingFilter
        : "home"
);