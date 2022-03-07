function parseTweets(runkeeper_tweets) {
	//Do not proceed if no tweets loaded
	if(runkeeper_tweets === undefined) {
		window.alert('No tweets returned');
		return;
	}
	
	tweet_array = runkeeper_tweets.map(function(tweet) {
		return new Tweet(tweet.text, tweet.created_at);
	});

	//TODO: create a new array or manipulate tweet_array to create a graph of the number of tweets containing each type of activity.

	activity_vis_spec = {
	  "$schema": "https://vega.github.io/schema/vega-lite/v4.json",
	  "description": "A graph of the number of Tweets containing each type of activity.",
	  "data": {
	    "values": tweet_array
	  }
	  //TODO: Add mark and encoding
	};
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});

	//TODO: create the visualizations which group the three most-tweeted activities by the day of the week.
	//Use those visualizations to answer the questions about which activities tended to be longest and when.

	document.getElementById('numberActivities').innerText = 9;


	// Initializing number of activities and distances into objects
	var activityKey = new Object();
	activityKey["running"] = { count: 0, total_distance: 0 };
	activityKey["skiiing"] = { count: 0, total_distance: 0 };
	activityKey["walking"] = { count: 0, total_distance: 0 };
	activityKey["biking"] = { count: 0, total_distance: 0 };
	activityKey["mountain biking"] = { count: 0, total_distance: 0 };
	activityKey["swimming"] = { count: 0, total_distance: 0 };
	activityKey["hiking"] = { count: 0, total_distance: 0 };
	activityKey["yoga"] = {count: 0, total_distance: 0 };
	activityKey["workout"] = { count: 0, total_distance: 0 };


	// populating values in dictionary
	for (var iter = 0; iter < (tweet_array.length); iter++) {
		let tweetActivity = tweet_array[iter].activityType;
		if (tweetActivity==="running"){ 
			activityKey['running'].count++;
			activityKey['running'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "skiiing"){
			activityKey['skiiing'].count++;
			activityKey['skiiing'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "walking"){
			activityKey['walking'].count++;
			activityKey['walking'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "biking"){
			activityKey['biking'].count++;
			activityKey['biking'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "mountain biking"){
			activityKey['mountain biking'].count++;
			activityKey['mountain biking'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "swimming"){
			activityKey['swimming'].count++;
			activityKey['swimming'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "hiking"){
			activityKey['hiking'].count++;
			activityKey['hiking'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "yoga"){
			activityKey['yoga'].count++;
			activityKey['yoga'].total_distance += tweet_array[iter].distance;
		}
		else if (tweetActivity == "workout"){
			activityKey['workout'].count++;
			activityKey['workout'].total_distance += tweet_array[iter].distance;
		}
	}
	
	// pushing object into an array to sort
	var activity_array = [];

	for (var elem in activityKey) {
		activity_array.push({
			activity: elem, 
			count: activityKey[elem].count, 
			total_distance: activityKey[elem].total_distance});
	}

	var sorted_activity_array = activity_array.sort(function(a, b){
		return (a.count > b.count) ? 1: ((b.count > a.count) ? -1 : 0);
	});

	var firstActivity = sorted_activity_array[sorted_activity_array.length - 1].activity;
	var secondActivity = sorted_activity_array[sorted_activity_array.length -2].activity;
	var thirdActivity = sorted_activity_array[sorted_activity_array.length - 3].activity;

	document.getElementById('firstMost').innerText = firstActivity;
	document.getElementById('secondMost').innerText = secondActivity;
	document.getElementById('thirdMost').innerText = thirdActivity;

	document.getElementById('longestActivityType').innerText = sorted_activity_array[sorted_activity_array.length - 1].activity;
	document.getElementById('shortestActivityType').innerText = sorted_activity_array[0].activity;


	// getting total weekday and weekend count 
	var longest_activity = sorted_activity_array[sorted_activity_array.length - 1].activity;

	var weekend = 0;
	var weekday = 0;

	for (var iter = 0; iter < (tweet_array.length); iter++) {
		let tweet = tweet_array[iter];
		if (tweet.activityType == longest_activity){
			if (tweet.time.toString().includes("Sat") || (tweet.time.toString().includes("Sun"))){
				weekday++;
			}
			else{
				weekday++;
			}
		}
	}

	if (weekday > weekend) {
		document.getElementById('weekdayOrWeekendLonger').innerText = "weekdays";	
	}
	else{
		document.getElementById('weekdayOrWeekendLonger').innerText = "weekends";
	}


	//first graph for activtys x count
	activity_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of tweets for each activity",
		"width": 400,
		"height": 400,
		"data": { "values":  activity_array },
		"mark": "bar", 
		"encoding": {
			"x": {
				"title": "Activity",
				"field": "activity",
				"type": "nominal"
			},
			"y": {
				"title": "Count",
				"field": "count",
				"type": "quantitative"
			}
		}
	}
	vegaEmbed('#activityVis', activity_vis_spec, {actions:false});


	//creating an array to get the dats of the week for each activity
	var dayArray = [];

	for (var iter = 0; iter < (tweet_array.length); iter++) {
		var tweetActivity = tweet_array[iter].activityType;
		if ((tweetActivity === firstActivity) || (tweetActivity === secondActivity) ||
		(tweetActivity === thirdActivity)) {
			dayArray.push({
				activity: tweet_array[iter].activityType,
				day: tweet_array[iter].dayOfWeek,
				distance: tweet_array[iter].distance
			});
		}
	}

	//graph for top 3 activities
	distance_vis_spec = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets for the top three activities.",
		"width": 400,
		"height": 400,
		"data": { "values":  dayArray },
		"mark": "point", 
		"encoding": {
			"x": {
				"title": "Time: Day",
				"field": "day",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"type": "nominal"
			},
			"y": {
				"title": "Distance",
				"field": "distance",
				"type": "quantitative"
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#FFA500", "#00FF00", "#800080"]
				},
				"legend": {"title": "Activity"}
			}

		}
	}
	vegaEmbed('#distanceVis', distance_vis_spec, {actions:false});

	//graph for the avg of the top 3 activities
	distance_vis_aggregated = {
		"$schema": "https://vega.github.io/schema/vega-lite/v4.json",
		"description": "A graph of the number of Tweets and the mean of their distances",
		"width": 400,
		"height": 400, 
		"data": { "values": dayArray },
		"mark": "point",
		"encoding": {
			"x": {
				"field": "day",
				"type": "nominal",
				"sort": ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
				"axis": "Time: Day"
			},
			"y": {
				"field": "distance",
				"aggregate": "average",
				"type": "quantitative"
			},
			"color": {
				"field": "activity",
				"type": "nominal",
				"scale": {
					"domain": ["running","walking","biking"],
					"range": ["#FFA500", "#00FF00", "#800080"]
				},
				"legend": {"title": "Activity"}
			}
		}
	};
	vegaEmbed('#distanceVisAggregated', distance_vis_aggregated, {actions:false});


	//button configuration
	document.getElementById("distanceVisAggregated").style.display = "none";
	var element = document.getElementById("aggregate");
	element.onclick = function(event){
		if (element.innerText == "Show means"){
			element.innerText = "Show all activities";
			document.getElementById("distanceVisAggregated").style.display = "block";
			document.getElementById("distanceVis").style.display = "none";
		}
		else if (element.innerText == "Show all activities") {
			element.innerText = "Show means";
			document.getElementById("distanceVisAggregated").style.display = "none";
			document.getElementById("distanceVis").style.display = "block";
		}
	};
}

//Wait for the DOM to load
document.addEventListener('DOMContentLoaded', function (event) {
	loadSavedRunkeeperTweets().then(parseTweets);
});