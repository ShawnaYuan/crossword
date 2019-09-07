$(document).ready(function() {
	
	function blankPuzzle(dimension) {
		var table = $('<table>').addClass('puzzle');
		for (x=1; x<dimension+1; x++) {
		    var row = $('<tr>').addClass('row-'+x);
		    
		    for (y=1; y<dimension+1; y++) {
		    	var cell = $('<td>').addClass('col-'+y);
		    	row.append(cell);
		    }
		    table.append(row);
		}

		$('#panel').append(table);
	}
	blankPuzzle(19);
	var matrix = $('#clues').data('matrix');
	const lines = matrix.split(/\r|\n/);
	console.log(lines);
	var puzzleMatix = [];
	function buildPuzzle(lines) {
		for (i = 0 ; i < lines.length ; i++) {
			if (lines[i].length > 0) {
				var this_line = lines[i];
				var hint_content = this_line.match(/\]([^)]+)\[/g);
				hint_content = hint_content[0].substring(1, hint_content[0].length - 1);
				var label = hint_content.split(".")[0];
				var brackets = this_line.match(/\[.*?\]/g);
				var position = brackets[0].toString();
				var across = true;
				if (position.indexOf('d') > -1) {
					across = false;
				}
				var x = parseInt(position.split(",")[1]);
				var y = position.split(",")[2];
				y = parseInt(y.substring(1, y[0].length - 1));
				var word_length = brackets[1].match(/\[(.*?)\]/g);
				word_length = parseInt(word_length[0].substring(1, word_length[0].length - 1));
		    	
		    	if (across) { 
		    		$('#hint #across').append('<span id="across-' + x + '-' + y + '"></span>');
		    		var dest = x-1+word_length;
		    		for (m = x-1; m < dest; m++) { 
		    			puzzleMatix[m] = []
		    			puzzleMatix[m][y-1] = [];
		    			puzzleMatix[m][y-1].push({"ahint":hint_content});
		    			var temp = m+1;
		    			$('#panel .row-' + y + ' .col-' + temp).css("background", "blue");
		    			$('#panel .row-' + y + ' .col-' + temp).addClass('across-' + x + '-' + y);
		    		}
		    	} else {
		    		$('#hint #across').append('<span id="down-' + x + '-' + y + '"></span>');
		    		var dest = y-1+word_length;
		    		puzzleMatix[x-1] = [];
		    		for (n = y-1; n < dest; n++) {
		    			puzzleMatix[x-1][n] = [];
		    			puzzleMatix[x-1][n].push({"dhint":hint_content});
		    			var temp = n+1;
		    			$('#panel .row-' + temp + ' .col-' + x).css("background", "green");
		    			$('#panel .row-' + temp + ' .col-' + x).addClass('down-' + x + '-' + y);
		    		}
		    	}
		    	puzzleMatix[x-1][y-1].push({"label":label});
		    	$('#panel .row-' + y + ' .col-' + x).css("background", "pink");
		    	if ($('#panel .row-' + y + ' .col-' + x + ' .label').length === 0) {
		    		$('#panel .row-' + y + ' .col-' + x).append('<span class="label">' + label + '</span>');
		    	}
			}
		}
	}
	buildPuzzle(lines);
	
});