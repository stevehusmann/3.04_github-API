var faces = [];

$('.search').on('click', function () {
  var query = $('#search-query').val();

  fetch(query);
});

var fetch = function (query) {
  $.ajax({
    method: "GET",
    url: "https://api.github.com/repos/facebook/react/commits/" + query,
    dataType: "json",
    success: function(data) {
      findFace(data);
    },
    error: function(jqXHR, textStatus, errorThrown) {
      alert("We could not find a commit with the SHA Hash " + query);
      console.log(textStatus);
    }
  });
};

var findFace = function (data) {

  var face = {
    login: data.author.login,
    imageURL: data.author.avatar_url,
    SHA: data.sha
  }

  faces.push(face);
  renderFaces();
};

var renderFaces = function () {
  $('.faces').empty();

  for (var i = 0; i < faces.length; i++) {
    var source = $('#face-template').html();
    var template = Handlebars.compile(source);
    var newHTML = template(faces[i]);
    
    $('.faces').append(newHTML);
  }
}