
$(document).ready(function() {
// starter list of gifs
var topics = ["polar bear", "kittens", "frog", "turtle", "party", "WOW", "food", "snow", "summer", "puppies"];
// button display
function displayGifButtons(){
    $("#gifButtonsView").empty(); // erasing anything in this div id so that it doesnt duplicate the results
    for (var i = 0; i < topics.length; i++){
        var gifButton = $("<button>");
        gifButton.addClass("action");
        gifButton.addClass("btn btn-primary")
        gifButton.attr("data-name", topics[i]);
        gifButton.text(topics[i]);
        $("#gifButtonsView").append(gifButton);
    }
}
// add new button
function addNewButton(){
    $("#addGif").on("click", function(){
    var topic = $("#topic-input").val().trim();
    if (topic == ""){
      return false; 
    }
    topics.push(topic);

    displayGifButtons();
    return false;
    });
}
// remove a button
function removeLastButton(){
    $("removeGif").on("click", function(){
    topics.pop(topic);
    displayGifButtons();
    return false;
    });
}
// gif display and api link
function displayGifs(){
    var topic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&api_key=xIpyNhn2OdYDKIBGXOFVDmMSVIlyqoe5&limit=8"; // limit 8 for styling reasons
    console.log(queryURL);
    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .done(function(response) {
        console.log(response); 
        $("#gifsView").empty(); // clearing out gif images
        var results = response.data; //shows results of gifs
        if (results == ""){
          alert("no gif found. search for something else!");
        }
        for (var i=0; i<results.length; i++){

            var gifDiv = $("<div>"); 
            gifDiv.addClass("gifDiv");
            // gif ratings
            var gifRating = $("<p>").text("rating: " + results[i].rating);
            gifDiv.append(gifRating);
            // pulling gif
            var gifImage = $("<img>");
            gifImage.attr("src", results[i].images.fixed_height_small_still.url); 
            gifImage.attr("data-still",results[i].images.fixed_height_small_still.url);
            gifImage.attr("data-animate",results[i].images.fixed_height_small.url); 
            gifImage.attr("data-state", "still"); // 
            gifImage.addClass("image");
            gifDiv.append(gifImage);

            $("#gifsView").prepend(gifDiv);
        }
    });
}

displayGifButtons(); 
addNewButton();
removeLastButton();
// gif actions - gifs are still until clicked - on / off
$(document).on("click", ".action", displayGifs);
$(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});
