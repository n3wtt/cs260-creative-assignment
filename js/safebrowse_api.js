

function safeWebsiteSubmit() {
  var theURL = document.getElementById("safeForm").theURL.value;

  getInfo(theURL);
}





function getInfo(testURL) {
  myAPIKey = "45be88ae6f296f56abeda4fd5b9027700a851ef4";
  myURL = "http://api.mywot.com/0.4/public_link_json?hosts=" + testURL + "/&key=" + myAPIKey;
  $.ajax({
    url: myURL,
    dataType: "json",
    success: function(json) {
      displaySafeResults(json, testURL);
    },
    error: function(json, testURL) {
      failureMSG(json);
    }
  });
}

function failureMSG(json) {
  displaySafeResults(json.responseJSON);
}

function displaySafeResults(json, testURL) {
  if (json['cod'] === '404') {
    var results = "<h2>ERROR: " + json['message'] + "</h2>";
  }
  else {
    var results = '<h2 style="test-align: left;">Test results:</h2>';
    for (var k in json) {
      results += '<div style="text-align:left;">';
      results += "<h3>URL: " + json[k].target + ":</h3>";
      results += '<div class="dataContainer">'
      var totalCount = 0;
      var totalLike = 0;
      for (var j in json[k]) {
        if (j === 'target') {
          continue;
        }
        if (j === 'categories') {
          continue;
        }
        if (j === 'blacklists') {
          continue;
        }
        totalCount++;
        totalLike += parseInt(json[k][j])
      }
      var avgLike = totalLike/totalCount;
      results += 'Site\'s Credibleness: ' + avgLike + '%';
      results += "</div>";
    }

  }


  $("#safeResults").html(results);

}
