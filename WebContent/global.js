// general method to bind a function call to a context
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
var initMap = function() 
{
	var geocoder = new google.maps.Geocoder();
	var address = 'Le Bout-du-Monde, Geneva, Switzerland';
	var mapOptions = {
		 zoom: 15,
         disableDefaultUI: true,
         mapTypeControl: true,
         mapTypeControlOptions: {
             style: google.maps.MapTypeControlStyle.DROPDOWN_MENU,
             mapTypeIds: [
               google.maps.MapTypeId.ROADMAP,
               google.maps.MapTypeId.TERRAIN
             ]
           },
        scrollwheel: false
	};
	 var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
	 if (geocoder) {
     geocoder.geocode( { 'address': address}, function(results, status) {
       if (status == google.maps.GeocoderStatus.OK) {
         if (status != google.maps.GeocoderStatus.ZERO_RESULTS) {
         map.setCenter(results[0].geometry.location);
           var infowindow = new google.maps.InfoWindow(
               {
                 content: address,
                 map: map,
                 position: results[0].geometry.location,
               });

           var marker = new google.maps.Marker({
               position: results[0].geometry.location,
               map: map, 
               title:address
           }); 

         } else {
         	alert("No results found");
         }
       }
     });
	}
};
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
	
	$('#toUpcoming').click(function(){
		$('#toResults').parent('li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('#resultsList').hide();
		$('#fixturesList').show();
		return false;
	});
	
	$('#toResults').click(function(){
		$('#toUpcoming').parent('li').removeClass('active');
		$(this).parent('li').addClass('active');
		$('#fixturesList').hide();
		$('#resultsList').show();
		return false;
	});

	var playersContainer = $('#playersContainer');
	$('#toPlayers').click(toggleTabsFunction(playersContainer,$('#players')));
	$('#toManagement').click(toggleTabsFunction(playersContainer,$('#admin')));
	
	
	gcc.fixtures = new fixtures();
	gcc.fixtures.init();
	$('#season-2016').click();
	
	gcc.postTemplate = Handlebars.compile($('#blog-posts').html());
	var feed = new google.feeds.Feed("https://genevacricketclub.wordpress.com/feed/");
	feed.setNumEntries(3);
	feed.load(function(result){
			if (!result.error) {
				$('#blogsCol').append(gcc.postTemplate({'entry' : result.feed.entries}));
			}
		});
});
