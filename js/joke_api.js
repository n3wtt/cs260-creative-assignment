function init() {
  getJoke();
}

function getJoke() {
  var myURL = "https://08ad1pao69.execute-api.us-east-1.amazonaws.com/dev/random_joke"
  $.ajax({
    url: myURL,
    dataType: "json",
    success: function(json) {
      displayJokeResults(json);
    },
    error: function(json) {
      failureMSG(json);
    }
  });
}

function displayJokeResults(json) {
  console.log(json)
  var results = "";
  results += "<div>";
  results += json['setup'];
  results += "<br>";
  results += json['punchline'];
  results += "</div>"
  console.log(results)
  $("#joke-placeholder").html(results);


}
