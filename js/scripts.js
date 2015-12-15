$(document).ready(function(){
	var searchedMovie ="";
	var searchConfig="";
	var searchOption="";
	$('#movie-search-form').submit(function(){	
		searchedMovie = $('#movieInput').val();
		event.preventDefault();
		searchOption = $('#search-options').val();
		searchOption=searchOption.toLowerCase();

			switch(searchOption){
				case 'movie':
					searchConfig ='https://api.themoviedb.org/3/search/movie?query='+searchedMovie+'&api_key='+apiKey;			
					$.getJSON(searchConfig, function(data){
						console.log(data);
						var html = "";
						var x = 0;
						setTimeout(function(){
							movieArray = data.results;
							$('#now-playing').html("<h2>Search Results</h2>");
							$('#now-playing-wrapper').html("");
							for(i=0; i<movieArray.length; i++){
								x++;
								var backdrop_path = movieArray[i].backdrop_path;
								var genre_ids = movieArray[i].genre_ids;
								var movieId = movieArray[i].id;
								var title = movieArray[i].title;
								var overview = movieArray[i].overview;
								var popularity = movieArray[i].popularity;
								var posterPath = movieArray[i].poster_path;
								var profilePath =movieArray[i].profile_Path;
								var releaseDate = movieArray[i].release_date;
								var voteAverage = movieArray[i].vote_average;
								var voteCount = movieArray[i].vote_count;	

								if(i==0){
									html += '<div class="movie-row">';
								}
								if(x==5){
									html += '</div>';
									html += '<div class="movie-row">';
									x=1;
								}
							if(posterPath === "null"){
								html += '<div class="now-playing-movie">';
								html += '<div class="null-class"></div></div>';

							}else{
								html += '<div class="now-playing-movie">';
								html += '<img  data-toggle="modal" data-target="#myModal'+i+'"title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'"/>';
								html += '<div class="modal fade" id="myModal'+i+'" tabindex="-1" role="dialog">';
								html +=		  '<div class="modal-dialog">';
								html +=		    '<div class="modal-content">';
								html +=		      '<div class="modal-header">';
								html +=		        '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
								html +=		      '</div>';
								html +=		      '<div class="modal-body">';
								html +=		        '<img src='+basePath+'w300'+backdrop_path+'><h3>'+title+'</h3><p>'+overview+'</p>';
								html +=		      '</div>';
								html +=		      '<div class="modal-footer">';
								html +=		        '<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
								html +=		      '</div>';
								html +=		    '</div>';
								html +=		  '</div>';
								html +=		'</div>';
								html += '</div>';
								
								if(i == (movieArray.length-1)){
									html += '</html>';
									$(html).appendTo('#now-playing-wrapper');
								}
							}
							}
						},500);
					});
				break;

				case 'person':
					searchConfig ='https://api.themoviedb.org/3/search/person?query='+searchedMovie+'&api_key='+apiKey;
					console.log(searchConfig);
					$.getJSON(searchConfig, function(data){
						console.log(data);
						var html = "";
						var x = 0;
						movieArray = data.results;

						$('#now-playing').html("<h2>Search Results</h2>");
						$('#now-playing-wrapper').html("");
						for(i=0; i<movieArray.length; i++){
							x++;
							var name= movieArray[i].name;
							var knownFor = movieArray[i].known_for[0].original_title;
							var backdropPath = movieArray[i].known_for[0].backdrop_path;
							console.log(backdropPath);
							var genre_ids = movieArray[i].genre_ids;
							var movieId = movieArray[i].id;
							var title = movieArray[i].title;
							var overview = movieArray[i].overview;
							var popularity = movieArray[i].popularity;
							var posterPath = movieArray[i].poster_path;
							var profilePath =movieArray[i].profile_path;
							var releaseDate = movieArray[i].release_date;
							var voteAverage = movieArray[i].vote_average;
							var voteCount = movieArray[i].vote_count;	

							if(i==0){
								html += '<div class="movie-row">';
							}

							if(x==5){
								html += '</div>';
								html += '<div class="movie-row">';
								x=1;
							}
							html += '<div class="now-playing-movie">';
							html += '<img title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+profilePath+'"><p>'+name+'</p><p>Known for: '+knownFor+'</p>';
							html += '<img src='+basePath+'w300'+backdropPath+'>';
							html += '</div>';
							
							if(i == (movieArray.length-1)){
								html += '</html>';
								$(html).appendTo('#now-playing-wrapper');
							}
						}
					});
					break;

				case 'tv':
					searchConfig ='https://api.themoviedb.org/3/search/tv?query='+searchedMovie+'&api_key='+apiKey;
					console.log(searchConfig);
					$.getJSON(searchConfig, function(data){
						console.log(data);
						var html = "";
						var x = 0;
						movieArray = data.results;
						$('#now-playing').html("<h2>Search Results</h2>");
						$('#now-playing-wrapper').html("");
						for(i=0; i<movieArray.length; i++){
							x++;
							var name= movieArray[i].name;			
							var backdropPath = movieArray[i].backdrop_path;
							var title = movieArray[i].title;
							var overview = movieArray[i].overview;
							var popularity = movieArray[i].popularity;
							var posterPath = movieArray[i].poster_path;
							var profilePath =movieArray[i].profile_path;
							var voteAverage = movieArray[i].vote_average;
							var voteCount = movieArray[i].vote_count;	

							if(i==0){
								html += '<div class="movie-row">';
							}

							if(x==5){
								html += '</div>';
								html += '<div class="movie-row">';
								x=1;
							}
							html += '<div class="now-playing-movie">';
							html += '<img src="'+basePath+'w300'+backdropPath+'"><p>'+name+'</p>';
							html += '<img src='+basePath+'w300'+posterPath+'>';
							html += '</div>';
							
							if(i == (movieArray.length-1)){
								html += '</html>';
								$(html).appendTo('#now-playing-wrapper');
							}
						}
					});
					break;

					case 'all':
						console.log(searchedMovie);
						searchURL = 'https://api.themoviedb.org/3/search/multi?query='+searchedMovie+'&api_key='+apiKey;
						console.log(searchURL);
						$.getJSON(searchURL, function(data){
							console.log(data);
							var html = "";
		                    var x = 0;
							movieArray = data.results;
		                    $('#now-playing').html("<h2>Search Results</h2>");
		                    $('#now-playing-wrapper').html("");
		                    for(i=0; i<movieArray.length; i++){
		                    	var mediaType = movieArray[i].media_type;
		                    	switch(mediaType){
		                    		case 'movie':
		                    			var backdropPath = movieArray[i].backdrop_path;
		                    			var name = movieArray[i].title;
		                    			var posterPath = movieArray[i].poster_path;
		                    		break;
		                    		case 'person':
		                    			var backdropPath = movieArray[i].profile_path;
		                    			var name = movieArray[i].name;
		                    			var posterPath = movieArray[i].profile_path;
		                    		break;
		                    		case 'tv':
		                    			var backdropPath = movieArray[i].backdrop_path;
		                    			var name = movieArray[i].name;
		                    			var posterPath = movieArray[i].poster_path;
		                    		break;
		                    	}
		                    	if(i==0){
		                            html += '<div class="movie-row">';
		                        }
		                        if(x==5){
		                            html += '</div>';
		                            html += '<div class="movie-row">';
		                            x=1;
		                        }
		                        html += '<div class="now-playing-movie">';
		                        html += '<img src="'+basePath+'w300'+backdropPath+'"><p>'+name+'</p>';
		                        html += '<img src='+basePath+'w300'+posterPath+'>';
		                        html += '</div>';
		                        
		                        if(i == (movieArray.length-1)){
		                            html += '</html>';
		                            $(html).appendTo('#now-playing-wrapper');
		                        }
		                    }
						});
			break;

				}
				
	});


});

var apiKey = "5ba8e4dcbc18c1e05cb4f2471465f44a";
var basePath = '';
var sizeOptions = '';
var logo_sizes = '';	
var poster_sizes = '';
var profile_sizes = '';

var siteConfig = 'https://api.themoviedb.org/3/configuration?api_key='+apiKey;

$.getJSON(siteConfig, function(data){
	// console.log(data);
	basePath = data.images.base_url;
	sizeOptions = data.images.poster_sizes;
	//0: "w300" 1: "w780" 2: "w1280" 3: "original"
	posterSize = 'w300';
	logo_sizes = logo_sizes['original'];
	profileSizes = profile_sizes['original'];
});

var nowPlaying = 'http://api.themoviedb.org/3/movie/now_playing?api_key='+apiKey;

$.getJSON(nowPlaying, function(data){
	// console.log(data);
	var html = "";
	var x = 0;
	movieArray = data.results;
	// movieArray = objectArray;
	// for(i=0; i<data.results.length; i++){
	for(i=0; i<movieArray.length; i++){
		x++;
		var isAdult = movieArray[i].adult;
		var backdrop_path = movieArray[i].backdrop_path;
		var genre_ids = movieArray[i].genre_ids;
		var movieId = movieArray[i].id;
		var title = movieArray[i].title;
		var overview = movieArray[i].overview;
		var popularity = movieArray[i].popularity;
		var posterPath = movieArray[i].poster_path;
		var releaseDate = movieArray[i].release_date;
		var voteAverage = movieArray[i].vote_average;
		var voteCount = movieArray[i].vote_count;	

		if(i==0){
			html += '<div class="movie-row">';
		}

		if(x==5){
			html += '</div>';
			html += '<div class="movie-row">';
			x=1;
		}
		html += '<div class="now-playing-movie">';
		html += '<img title="'+overview+'" alt="'+title+'" src="'+basePath+'w300'+posterPath+'">';
		html += '</div>';
		
		if(i == (movieArray.length-1)){
			html += '</html>';
			$(html).appendTo('#now-playing-wrapper');
		}
	}
}); // End get json - popular movies






