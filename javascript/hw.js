$(document).ready(function() {
  var bfastArr = ["breakfast", "coffee", "fried+eggs", "waffles", "orange+juice", "syrup", "bacon", "crepes", "cereal", "jam"];

  function renderButtons() {

    $("#bfast-buttons").empty();
    for (var i = 0; i < bfastArr.length; i++) {
      var a = $("<button>");
      a.addClass("bfast-butt");
      a.attr("data-name", bfastArr[i]);
      a.text(bfastArr[i]);
      $("#bfast-buttons").append(a);
    }
  }


  $("#add-topic").on("click", function(event) {
    event.preventDefault();
    var bfItem = $("#user-input").val().trim();
    bfastArr.push(bfItem);
    renderButtons();
  });

  $(".bfast-butt").on("click", function()
  {
    console.log("hi!");
    var bftopic = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
      bftopic + "&api_key=dc6zaTOxFJmzC&limit=5";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response);
      var results = response.data;

      for (var i = 0; i < results.length; i++)
      {
        var bftopicDiv = $("<div class='item'>");
        var rating = results[i].rating;
        var p = $("<p>").text("Rating: " + rating);
        var bfImage = $("<img>");

        bfImage.attr("src", results[i].images.fixed_height.url);
        bftopicDiv.append(p);
        bftopicDiv.append(bfImage);
        $("#bfast-views").prepend(bftopicDiv);
      }
    });
  });

  renderButtons();
});
