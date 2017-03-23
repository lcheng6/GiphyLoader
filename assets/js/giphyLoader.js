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
var giphySearchReady = true;

var animalButtonClicked; 

var submitBtnClick = function(event) {
	event.preventDefault();
	var animal = $("#animal-input").val();
	if (animal) {
		console.log('new animal: ' + animal);
		selectedAnimal = animal;
		var button = $('<button>')
			.addClass('btn').addClass('btn-info')
			.text(animal)
			.click(animalButtonClicked);
		$('#animalButtons').append(button);
	}

}

var displayGiphyResults = function(animal) {
	var html = '',
		imageNum;

	//TODO refactor this code.  
	for (var i = 0; i < giphyFixedSizedArray.length; i++) {
		imageNum = animalSearchOffset + i;
		html += '<article class="image__cell is-collapsed">' +
			'<div class="image--basic">' +
			'<a href="#expand-jump-' + imageNum + '">' +
			'<img id="expand-jump-' + imageNum + '" class="basic__img" src="' + giphyFixedSizedArray[i] + '" alt="Animal ' + imageNum + '" />' +
			'</a>' +
			'<div class="arrow--up"></div>' +
			'</div>' +
			'<div class="image--expand">' +
			'<a href="#close-jump-' + imageNum + '" class="expand__close"></a>' +
			'<img class="image--large" src="' + giphyOriginalArray[i] + '" alt="Animal ' + imageNum + '" />' +
			'</div>' +
			'</article>';
	}
	$('.image-grid').append(html);

	var $cell = $('.image__cell');

	//reset all click handlers
	$cell.find('.image--basic').off('click');

	//add the click handler back in
	$cell.find('.image--basic').click(function() {
		var $thisCell = $(this).closest('.image__cell');
		console.log('image--basic click handler')

		if ($thisCell.hasClass('is-collapsed')) {
			$cell.not($thisCell).removeClass('is-expanded').addClass('is-collapsed');
			$thisCell.removeClass('is-collapsed').addClass('is-expanded');
		} else {
			$thisCell.removeClass('is-expanded').addClass('is-collapsed');
		}
	});

	//reset .expand__close handler
	$cell.find('.expand__close').off('click');

	//add all .expand__close handler
	$cell.find('.expand__close').click(function() {

		var $thisCell = $(this).closest('.image__cell');

		$thisCell.removeClass('is-expanded').addClass('is-collapsed');
	});
}

var doGiphySearch = function(callback, animal) {
	//exmpale giphy search: https://api.giphy.com/v1/gifs/search?q=bison&api_key=dc6zaTOxFJmzC&limit=10
	if(giphySearchReady === false) {
		return;
	}
	//entering into one search loop, finish it then try to do another search. 
	giphySearchReady = false;
	giphyFixedSizedArray = [];
	giphyOriginalArray = [];
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
			//ready for search again
			giphySearchReady = true;
			if (callback !== null) {
				callback();
			}
		})
}



animalButtonClicked = function() {
	$('.image-grid').empty();
	animalSearchOffset = 0;
	$('#progressloader').hide();
	selectedAnimal = $(this).text();
	//async.series([selectedAnimal])
	doGiphySearch(null, selectedAnimal);
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
	if ($(window).scrollTop() + $(window).height() <= $(document).height()) {
		doGiphySearch(null, selectedAnimal);
		console.log('bottom!')
	}
});