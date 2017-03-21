// Demo by Dan Rose.
// See: http://www.sitepoint.com/recreating-google-images-search-layout-css

// dynamically create loads of image cells

var testGifs = 
    ["https://media4.giphy.com/media/gw3MYmhxEv8T52ow/200.gif",
     "https://media1.giphy.com/media/iwqJk8sFdwcxy/200.gif",
    "https://media4.giphy.com/media/4N4JBFo45PVPa/200.gif",
    "https://media4.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif",
    "https://media2.giphy.com/media/1mht8tODXy0OA/200.gif",
    "https://media4.giphy.com/media/J0UgtZkOjXOeY/200.gif",
    "https://media1.giphy.com/media/vGD2uBftnl0Q0/200.gif",
    "https://media2.giphy.com/media/I0wazlBIZhvwY/200.gif",
    "https://media4.giphy.com/media/FVgxUIjL8neWk/200.gif",
    "https://media4.giphy.com/media/26xBwmgBDUs9G2uFG/200.gif",
    "https://media4.giphy.com/media/gw3MYmhxEv8T52ow/200.gif",
    "https://media1.giphy.com/media/iwqJk8sFdwcxy/200.gif",
    "https://media4.giphy.com/media/4N4JBFo45PVPa/200.gif",
    "https://media4.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif",
    "https://media2.giphy.com/media/1mht8tODXy0OA/200.gif",
    "https://media4.giphy.com/media/J0UgtZkOjXOeY/200.gif",
    "https://media1.giphy.com/media/vGD2uBftnl0Q0/200.gif",
    "https://media2.giphy.com/media/I0wazlBIZhvwY/200.gif",
    "https://media4.giphy.com/media/FVgxUIjL8neWk/200.gif",
    "https://media4.giphy.com/media/26xBwmgBDUs9G2uFG/200.gif"];
function cells(count) {
  if (typeof count !== 'number' || count > 99) return false;
  
  var html = '',
      imageNum;
  
  for (i = 0; i < count; i++) {
    imageNum = Math.floor(Math.random() * 9) + 1;
    html += '<article class="image__cell is-collapsed">' +
	    '<div class="image--basic">' +
		    '<a href="#expand-jump-'+i+'">' +
		        '<img id="expand-jump-'+i+'" class="basic__img" src="' + testGifs[imageNum] + '" alt="Fashion '+ imageNum +'" />' +
	      '</a>' +
	      '<div class="arrow--up"></div>' +
	    '</div>' +
	    '<div class="image--expand">' +
		    '<a href="#close-jump-'+i+'" class="expand__close"></a>' +
          '<img class="image--large" src="'+ testGifs[imageNum] +'" alt="Fashion '+ imageNum +'" />' +
	    '</div>' +
	  '</article>';
  }
  return html;
}

//apend cells to grid
$('.image-grid').empty().html(cells(50));


//bind click events
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

$cell.find('.expand__close').click(function(){
  
  var $thisCell = $(this).closest('.image__cell');
  
  $thisCell.removeClass('is-expanded').addClass('is-collapsed');
});