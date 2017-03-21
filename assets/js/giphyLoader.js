'use strict'
var animalsArray = ["dog", "cat", "rabbit", "hamster", "skunk", "goldfish",
	"bird", "ferret", "sugar glider", "chinchilla", "hedgehog", "hermit crab",
	"gerbil", "pygmy goat", "chicken", "capybara", "teacup pig", "serval",
	"salamander", "frog"
];

var giphyFixedSizedArray = [];
var giphyOriginalArray = [];

//The selected Animal for the search
var selectedAnimal = "";
var animalSearchOffset = 0;


var submitBtnClick = function(event) {
	event.preventDefault();
	var animal = $("#animal-input").val();
	if (animal) {
		console.log('new animal: ' + animal);
		selectedAnimal = animal;
		('.image-grid').empty()
		var button = $('<button>')
			.addClass('btn').addClass('btn-info')
			.text(animal)
			.click(function() {
				console.log($(this).text())
			})
		$('#animalButtons').append(button);
	}

}

var displayGiphyResults = function(animal) {
	var html = '',
		imageNum;

	for (var i = 0; i < giphyFixedSizedArray.length; i++) {
		imageNum = animalSearchOffset + i;
		html += '<article class="image__cell is-collapsed">' +
			'<div class="image--basic">' +
			'<a href="#expand-jump-' + i + '">' +
			'<img id="expand-jump-' + i + '" class="basic__img" src="' + giphyFixedSizedArray[i] + '" alt="Fashion ' + imageNum + '" />' +
			'</a>' +
			'<div class="arrow--up"></div>' +
			'</div>' +
			'<div class="image--expand">' +
			'<a href="#close-jump-' + i + '" class="expand__close"></a>' +
			'<img class="image--large" src="' + giphyOriginalArray[i] + '" alt="Animal ' + imageNum + '" />' +
			'</div>' +
			'</article>';
	}
	$('.image-grid').append(html);

	var $cell = $('.image__cell');

	$cell.find('.image--basic').click(function() {
		var $thisCell = $(this).closest('.image__cell');

		if ($thisCell.hasClass('is-collapsed')) {
			$cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
			$thisCell.removeClass('is-collapsed').addClass('is-expanded');
		} else {
			$thisCell.removeClass('is-expanded').addClass('is-collapsed');
		}
	});

	$cell.find('.expand__close').click(function() {

		var $thisCell = $(this).closest('.image__cell');

		$thisCell.removeClass('is-expanded').addClass('is-collapsed');
	});
}

var doGiphySearch = function(animal) {
	//exmpale giphy search: https://api.giphy.com/v1/gifs/search?q=bison&api_key=dc6zaTOxFJmzC&limit=10
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=dc6zaTOxFJmzC&limit=10&offset=" + animalSearchOffset.toString();
	$.ajax({
			url: queryURL,
			method: "Get"
		})
		.done(function(response) {
			var results = response.data
			for (var i = 0; i < results.length; i++) {
				giphyFixedSizedArray.push(results[i].images.fixed_height.url);
				giphyOriginalArray.push(results[i].images.original.url);
			}
			animalSearchOffset = animalSearchOffset + results.length;
			displayGiphyResults();
		})
}



var animalButtonClicked = function() {
	$('.image-grid').empty();
	animalSearchOffset = 0;
	$('#progressloader').hide();
	selectedAnimal = $(this).text();
	doGiphySearch(selectedAnimal);
}

var loadInitialButtons = function() {
	for (var i = 0; i < animalsArray.length; i++) {
		var animal = animalsArray[i];
		var button = $('<button>')
			.addClass('btn').addClass('btn-info')
			.text(animal)
			.click(animalButtonClicked)
		$("#animalButtons").append(button);
	}
}

$(document).ready(function() {
	loadInitialButtons();
	$("#addAnimal").on("click", submitBtnClick);
});


$(window).scroll(function() {
	if ($(window).scrollTop() + $(window).height() == $(document).height()) {
		console.log("bottom!");
	}
});