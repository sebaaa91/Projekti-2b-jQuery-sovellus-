// HTML elementtien referointi
const textInput = $("#textInput");
const addButton = $("#addButton");
const textList = $("#textList");

// Lataa valitut Local storagesta
$(document).ready(function () {
    const savedItems = localStorage.getItem("todoItems");
    if (savedItems) {
        textList.html(savedItems);

        // Attach event listeners "Remove" and "Check" nappuloille
        attachRemoveAndCheckEvents();

        // Lisää fadeIn effektt vain uusiin lisättyihin itemeihin
        fadeInItems();

        // Lisää hover effekt kaikkiin listan itemeihin
        applyHoverEffect();
    }
});

// "Remove" and "Check" event listener nappulat
function attachRemoveAndCheckEvents() {
    const buttons = textList.find("li button");
    buttons.each(function () {
        $(this).on("click", function () {
            const listItem = $(this).parent();
            if ($(this).text() === "Remove") {
                listItem.remove();
            } else if ($(this).text() === "Check") {
                listItem.css("background-color", "#03ca03");
            }
            saveListToLocalStorage();
        });
    });
}

// Event listener lisää nappulalle
addButton.on("click", function () {
    const text = textInput.val();

    if (text.trim().length < 3) {
        alert("Please write at least three (3) letter words.");
    } else {
        const listItem = $("<li>").text(text).addClass("fadedIn"); 
        textList.append(listItem);

        // Luo "Remove" napuula tälle itemille
        const removeButton = $("<button>").text("Remove");

        // Luo "Check" napuula tälle itemille
        const checkButton = $("<button>").text("Check");

        // Append "Remove" ja "Check" nappulat itemeille
        listItem.append(removeButton);
        listItem.append(checkButton);

        // Attach event listeners "Remove" and "Check" nappuloille
        attachRemoveAndCheckEvents();

        // LIsää hover effect listan kaikkiin itemeihin
        applyHoverEffect();

        // Lisää fadeIn effekti uusii itemeihin
        listItem.hide().fadeIn("slow");

        // Tyhjennä syöttökenttä
        textInput.val("");

        // Tallenna Local storageen
        saveListToLocalStorage();
    }
});

// Funktion lisää hover effect
function applyHoverEffect() {
    // Mouse over lisää 'red border' li listan reunoille
    $("#textList li").hover(
        function () {
            $(this).addClass('border');
        },
        function () {
            $(this).removeClass('border');
        }
    );
}

// Funktion lisäämään fadeIn effect kaikkiin listan itemeihin
function fadeInItems() {
    textList.children("li:not(.fadedIn)").hide().fadeIn("fast");
}

// Function tallenna lista local storageen
function saveListToLocalStorage() {
    localStorage.setItem("todoItems", textList.html());
}
