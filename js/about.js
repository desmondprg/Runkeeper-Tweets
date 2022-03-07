function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}

	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});
	
	//This line modifies the DOM, searching for the tag with the numberTweets ID and updating the text.
	//It works correctly, your task is to update the text of the other tags in the HTML file!
	document.getElementById('numberTweets').innerText = tweet_array.length;	

	// Dates
	document.getElementById('firstDate').innerText = tweet_array[tweet_array.length - 1].time.toLocaleDateString("en-US", 
		{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
	document.getElementById('lastDate').innerText = tweet_array[0].time.toLocaleDateString("en-US", 
		{ weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

	// Events
	var completed = 0;
	var completeWithText = 0;
	var live = 0;
	var achieve = 0;
	var misc = 0;

	// for loop to count total number of tweets per activity
	for (var iter = 0; iter < (tweet_array.length); iter++) {
		var tweet = tweet_array[iter].source;
		if (tweet == 'completed_event') {
			if (tweet_array[iter].written){
				completeWithText++;
			}
			completed++;
		}
		else if (tweet == 'live_event') {
			live++;
		}
		else if (tweet == 'achievement') {
			achieve++;
		}
		else {
			misc++;
		}
	}


	//numbers and percents of categories
	var completedEventsGroup = document.querySelectorAll('.completedEvents');

	(completedEventsGroup[0]).innerText = completed;
	document.querySelector('.completedEventsPct').innerText = (completed/tweet_array.length*100).toFixed(2) + "%";
		
	document.querySelector('.liveEvents').innerText = live;	
	document.querySelector('.liveEventsPct').innerText = (live/tweet_array.length*100).toFixed(2) + "%";	

	document.querySelector('.achievements').innerText = achieve;
	document.querySelector('.achievementsPct').innerText = (achieve/tweet_array.length*100).toFixed(2) + "%";

	document.querySelector('.miscellaneous').innerText = misc;
	document.querySelector('.miscellaneousPct').innerText = (misc/tweet_array.length*100).toFixed(2) + "%";

	// Written Text

	(completedEventsGroup[1]).innerText = completed;
	document.querySelector('.written').innerText = completeWithText;
	document.querySelector('.writtenPct').innerText = (completeWithText/completed*100).toFixed(2) + "%";

}


//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});