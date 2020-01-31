/* global moment */

// When user clicks add-btn
$("#category-submit").on("click", function (event) {
    event.preventDefault();

    // Make a newChirp object
    var newCategory = {
        category: $("#category").val().trim(),
        amount: $("#amount").val().trim()
    };

    console.log(newCategory);

    // Send an AJAX POST-request with jQuery
    $.post("/api/newcat", newCategory)
        // On success, run the following code
        .then(function () {

            var row = $("<div>");
            row.addClass("category");

            row.append("<p>" + newCategory.category + " for amount: </p>");
            row.append("<p>" + newCategory.amount + "</p>");

            $("#categories-area").prepend(row);

        });

    // Empty each input box by replacing the value with an empty string
    $("#category").val("");
    $("#amount").val("");
});

// When the page loads, grab all of our chirps
$.get("/api/budget", function (data) {
console.log(data);
    if (data.length !== 0) {

        for (var i = 0; i < data.length; i++) {

            var row = $("<div>");
            row.addClass("category");

            row.append("<p>" + data[i].category + " for amount.. </p>");
            row.append("<p>" + data[i].amount + "</p>");

            $("#categories-area").prepend(row);

        }

    }

});
