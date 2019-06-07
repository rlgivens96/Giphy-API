$(document).ready(function () {
    var animalNames = ["cat", "dog", "snake", "horse", "lion", "bear", "tiger"];
    $(document).on("click", ".animals", displayGif);

    function displayGif() {
        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
            animal + "&api_key=NLYzlOZoeGVnvP3XqhkjPRaNtoxhu4hc&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                //Storing the data from the AJAX to a variable
                var results = response.data;

                // Looping through ever result
                for (var i = 0; i, results.length; i++) {

                    //Only allowing if has the appropriate rating 
                    if (results[i].rating !== "r" && results[i].rating !== "pg-13") {

                        //Create a diff for the gif
                        var giffDiv = $("<div>");

                        //Storing the results rating
                        var rating = results[i].rating;

                        //Creating a paragraph tag for the rating
                        var p = $("<p>").text("Rating: " + results[i].rating);

                        // Creating an image tag
                        var animalImage = $("<img>");

                        //Giving the "src" an attribute of a property 
                        animalImage.attr("src", results[i].images.fixed_height.url);

                        //Append the p and animalImage to the giffDiv tag we created 
                        giffDiv.append(p);
                        giffDiv.append(animalImage);

                        var staticSrc = results[i].images.fixed_height_still.url;
                        var animateSrc = results[i].images.fixed_height.url;

                        animalImage.attr("src", staticSrc);
                        animalImage.attr("data-state", "still");
                        animalImage.attr("data-still", staticSrc);
                        animalImage.attr("data-animate", animateSrc);

                        //We prepend the giffDiv to the id giffy-goes-here to each new will go at the top
                        $("#giffy-goes-here").prepend(giffDiv);
                    }
                }
            });
    };

$(document).on("click", "img", function() {
    if ($(this).attr("data-state") === "still")
    {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    }
    else if($(this).attr("data-state") === "animate") {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
    }
});

function renderButton() {
    $("#buttons-go-here").empty();
    for (var i = 0; i < animalNames.length; i++) {
        var a = $("<button>");
        a.addClass("animals");
        a.attr("data-name", animalNames[i]);
        a.text(animalNames[i]);
        $("#buttons-go-here").append(a);
    }
}

$("#add-animal").on("click", function (event) {
    event.preventDefault();
    var animals = $("#animal-input").val().trim();
    animalNames.push(animals);
    renderButton();
});

renderButton();
});