class Tweet {
	private text:string;
	time:Date;

	constructor(tweet_text:string, tweet_time:string) {
        this.text = tweet_text;
		this.time = new Date(tweet_time);//, "ddd MMM D HH:mm:ss Z YYYY"
	}

	//returns either 'live_event', 'achievement', 'completed_event', or 'miscellaneous'
    get source():string {
        //TODO: identify whether the source is a live event, an achievement, a completed event, or miscellaneous.
        if ((this.text.startsWith('Just completed')) || (this.text.startsWith('Just posted'))) {
            return 'completed_event';
        }
        else if (this.text.startsWith('Achieved')) {
            return 'achievement';
        }
        else if (this.text.startsWith('Watch')) {
            return 'live_event';
        }
        else {
            return 'miscellaneous';
        }
    }

    //returns a boolean, whether the text includes any content written by the person tweeting.
    get written():boolean {
        //TODO: identify whether the tweet is written
        if (this.text.includes("-")){
            return true;
        }
        return false;
    }

    get writtenText():string {
        if(!this.written) {
            return "";
        }
        //TODO: parse the written text from the tweet
        var tempSplit = this.text.split(" ");
        for (var iter = 0; iter < tempSplit.length; iter++){
            if (tempSplit[iter].startsWith("#") || tempSplit[iter].startsWith("http") || tempSplit[iter].startsWith("TomTom") || 
                tempSplit[iter].startsWith("MySports")){
                tempSplit.splice(iter, 1);
            }
        }
        return tempSplit;
    }

    get activityType():string {
        if (this.source != 'completed_event') {
            return "unknown";
        }
        //TODO: parse the activity type from the text of the tweet
        if (this.text.includes("run")){
            if (this.text.includes("ski run")){
                return "skiiing";
            }
            else{
                return "running";
            }
        }
        else if (this.text.includes("walk")) {
            return "walking";
        }
        else if (this.text.includes("bike")) {
            if (this.text.includes("mtn")){
                return "mountain biking";
            }
            else{
                return "biking";    
            }
        }
        else if (this.text.includes("swim")) {
            return "swimming";
        }
        else if (this.text.includes("hike")) {
            return "hiking";
        }
        // else if (this.text.includes("ski run")) {
        //     return "skiing";
        // }
        else if (this.text.includes("yoga")) {
            return "yoga";
        }
        else if (this.text.includes("workout")) {
            return "workout";
        }
        // else if (this.text.includes("mtn")) {
        //     return "mountain biking";
        // }
        else {
            return "";
        }

    }

    get distance():number { // kmToM = 1.60
        if(this.source != 'completed_event') {
            return 0;
        }
        //TODO: prase the distance from the text of the tweet
        var textArray = this.text.split(" ");
        var dist = parseFloat(textArray[3]);

        if (this.text.includes(' km ')){
            dist /= 1.609;
        }
        return dist;
    }


    get dayOfWeek():string {
        var timeToString = this.time.toString();
        if (timeToString.includes('Sun ')) {
            return "Sun";
        }
        else if (timeToString.includes('Mon ')) {
            return "Mon";
        } 
        else if (timeToString.includes('Tue ')) {
            return "Tue";
        } 
        else if (timeToString.includes('Wed ')) {
            return "Wed";
        } 
        else if (timeToString.includes('Thu ')) {
            return "Thu";
        } 
        else if (timeToString.includes('Fri ')) {
            return "Fri";
        }  
        else if (timeToString.includes('Sat ')) {
            return "Sat";
        } 
        return "";
    }


    getHTMLTableRow(rowNumber:number):string {
        //TODO: return a table row which summarizes the tweet with a clickable link to the RunKeeper activity
        var tweets = this.text;
        var tweetSplit = this.text.split(" ")
        for (var iter = 0; iter < tweetSplit.length; iter++) {
            if(tweetSplit[iter].includes("https")) {
                tweetSplit[iter] = "<a href = " + tweetSplit[iter] + ">" + tweetSplit[iter] + "</a>";
            }
        }
        tweets = tweetSplit.join(" ");
        return "<tr><td>" + rowNumber +"</td><td>" + this.activityType + "</td><td>" + tweets + "</td></tr>";
    }

    get fullTweet():string {
        return this.text;
    }
}