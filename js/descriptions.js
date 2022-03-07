var tweet_array;
var filtered_tweets;

function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	// Initializes fields to empty, rather than '???'
	$("#tweetTable").empty();
	document.getElementById("searchCount").innerText = 0;

}


function addEventHandlerForSearch() {
	//TODO: Search the written tweets as text is entered into the search box, and add them to the table

	document.getElementById("searchText").innerText = "";

	//runs code if user input in search bar 
	document.getElementById("textFilter").addEventListener("keyup", event => {
		document.getElementById("searchText").innerText = event.target.value;

		// if there is user input
		if(event.target.value != "") {
			$("#tweetTable").empty();
			document.getElementById("searchCount").innerText = 0;
	
			//filters tweet_array into new array with tweets whose text matches user input
			filtered_tweets = tweet_array.filter(function(input) {
				var searchTerm = document.getElementById("searchText").innerText;
				return (input.written && ((input.fullTweet).toLowerCase()).includes(searchTerm.toLowerCase()));
			});
			
			// updates searchCount
			document.getElementById("searchCount").innerText = filtered_tweets.length;

			// appends filtered_tweets to the table
			var table = document.getElementById("tweetTable");
			for(var iter = 0; iter < filtered_tweets.length; iter++) {
				$("#tweetTable").append(filtered_tweets[iter].getHTMLTableRow(iter + 1));
			}
		}
		else { // if no user input in search bar
			$("#tweetTable").empty();
			document.getElementById("searchCount").innerText = 0;
		}
	});
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	addEventHandlerForSearch();
	loadSavedRunkeeperTweets().then(parseTweets);
});