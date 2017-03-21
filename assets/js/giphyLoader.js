'use strict'
var animalsArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
	"bird", "ferret", "sugar glider", "chinchilla", "hedgehog", "hermit crab", 
	"gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval", 
	"salamander", "frog"];

var giphyFixedSizedArray = [];
var giphyOriginalArray = [];

var maxResults = 50;
var resultsPerSearch = 10;


var loadInitialButtons = function() {
	for (var i=0; i<animalsArray.length; i++) {
		var animal = animalsArray[i];
		var button = $('<button>')
			.addClass('btn').addClass('btn-info')
			.text(animal)
			.click(function() {
				console.log($(this).text())
				doGiphySearch(animal);
			})
		$("#animalButtons").append(button);
	}
}

var submitBtnClick = function(event) {
	event.preventDefault();
	var animal = $("#animal-input").val();
	if (animal) {
		console.log('new animal: ' + animal);
		var button = $('<button>')
			.addClass('btn').addClass('btn-info')
				.text(animal)
				.click(function() {
					console.log($(this).text())
				})
			$('#animalButtons').append(button);
	}
	
}

var doGiphySearch = function (animal, offset) {
	//exmpale giphy search: https://api.giphy.com/v1/gifs/search?q=bison&api_key=dc6zaTOxFJmzC&limit=10
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +animal+ "&api_key=dc6zaTOxFJmzC&limit=10&offset="+offset;
	$.ajax({
		url:queryURL,
		method:"Get"
	})
	.done(function(response) {
		var results = response.data
		for (var i=0; i<results.length; i++) {
			giphyFixedSizedArray.push(results[i].images.fixed_height.url);
			giphyOriginalArray.push(results[i].images.original.url);
		}
		displayGiphyResults();
	})
}
var displayGiphyResults = function () {
	
	for (var i=0; i<giphyResultArray.length; i++) {
		var div = $('<div/>')
			.append(
				$('<img/>')
				.attr('src', giphyResultArray[i]
				)
			);
		$('#animals').append(div);
	}
}

var clearExistingAnimalsGifs = function() {

}
var animalButtonClicked = function() {

}

$(document).ready(function() {
	loadInitialButtons();
	$("#addAnimal").on("click", submitBtnClick);
});