// general method to bind a function call to a context
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var playerData = {"entry" : [
   {
	   name : "Anser Mehmood", image: "anser.png", description: "Slow right arm bowler and batsman"	   
   },
   {
	   name : "Aamir Qayoom", image: "aamir.png", description: "Right arm bowler and batsman"	   
   },
   {
	   name : "Ankit Sharma", image: "ankit.png", description: "Left arm fast bowler and batsman"	   
   },
   {
	   name : "Saqib Aurangzeb", image: "saaquib.png", description: "Wicketkeeper batsman"	   
   },
   {
	   name : "Raja Seed", image: "syed.png", description: "Right arm batsman and bowler"	   
   },
   {
	   name : "Saad Khan", image: "saad.png", description: "Wicketkeeper batsman"	   
   },
   {
	   name : "Ahmed", image: "ahmed.png", description: "Right arm medium bowler"	   
   },
   {
	   name : "Afif Khan", image: "afif.png", description: "Right arm fast medium bowler"	   
   },
   {
	   name : "Raunak Kumar", image: "parit.png", description: "Right hand batsman and bowler"	   
   },
   {
	   name : "Khurrum Alvi", image: "parit.png", description: "Right hand batsman and bowler"	   
   },
   {
	   name : "Idrees Haque", image: "parit.png", description: "Right hand batsman"	   
   },
   {
	   name : "Kashif Raja", image: "parit.png", description: "Left hand batsman and bowler"	   
   },
   {
	   name : "Parit Bansal", image: "parit.png", description: "Right hand batsman"	   
   },
   {
	   name : "Darius Rao", image: "parit.png", description: "Right hand batsman"	   
   }
  ]} ;

var admin = {"entry" : [
  { name : "Hascal Gallop", description : "President"},
  { name : "Syed Nayyar", description: "Vice President"},
  { name : "Faizal Ul Haq", description: "Secretary"},
  { name : "Anser Mehmood", description: "Manager and Fixture Secretary"},
  { name : "Saqib Aurangzeb", description: "Financial Secretary"},
  { name : "Parit Bansal", description: "Media Coordinator"},
  { name : "Darius Rao", description: "Scorer"},
  { name : "Afif Khan", description : "Net Incharge"}
  ]};


var gcc = {};
var toggleTabsFunction = function(container, showUp) {
	return function(event) {
		var el = $(this);
		var parentLi = el.parent('li'); 
		if (parentLi.hasClass('active'))
			return false;
		parentLi.siblings().removeClass('active');
		parentLi.addClass('active');
		container.children().hide();
		showUp.show();
		return false;
	};
};

$(document).ready(function(){
	
	gcc.template = Handlebars.compile($("#entry-template").html());
	var team = function(url, container) {
		return $.ajax({
			url : url, 
			success : function(data) {
				var players = [];
				for(var i = 0 ; i < data.feed.entry.length; i++) {
				   var rowCols = data.feed.entry[i].content.$t.split(',');
				   players.push({'name' : rowCols[0].split(":")[1], 'image': rowCols[1].split(":")[1], 'description' : rowCols[2].split(":")[1]});
				}
				container.append(gcc.template({"entry" : players}));
			}
		}); 
	};
	
	team('https://spreadsheets.google.com/feeds/list/1dPbsHsdSgQo4rUnxg-rzfYmy0w17vTJttHZ4PRMs3Uc/1/public/basic?alt=json',$('#players'));
	team('https://spreadsheets.google.com/feeds/list/1J3qnqDHtNXsQBYCjhkW9mRyIxwdiIjypAkZKr8Sxsos/1/public/basic?alt=json',$('#admin'));
	
	var resultsContainer = $('#resultsContainer');
	$('#toUpcoming').click(toggleTabsFunction(resultsContainer,$('#forUpcoming')));
	$('#toResults').click(toggleTabsFunction(resultsContainer,$('#forResults')));

	var playersContainer = $('#playersContainer');
	$('#toPlayers').click(toggleTabsFunction(playersContainer,$('#players')));
	$('#toManagement').click(toggleTabsFunction(playersContainer,$('#admin')));
	
	
	gcc.fixtures = new fixtures();
	gcc.fixtures.init();
	
	
	var feed = new google.feeds.Feed("https://genevacricketclub.wordpress.com/feed/");
	feed.load(function(result){
			if (!result.error) {
				for(var i = 0; i < result.feed.entries.length; i++) {
					var entry = result.feed.entries[i];
					console.log(entry.title);
				}
			}
		});
});
