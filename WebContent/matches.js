var fixtures = (function(){
	function fixtures(container) {
		this.renderFormattedData = __bind(this.renderFormattedData, this);
		this.getFixtureData = __bind(this.getFixtureData, this);
		this.getResult = __bind(this.getResult, this);
		this.init = __bind(this.init, this);
	}
	
	fixtures.prototype.init = function(container) {
		this.getFixtureData();
	};
	
	fixtures.prototype.renderFormattedData = function(formatedData, containerId) {
		var context = this;
		var fixtureContainer = $('#fixturesList');
		fixtureContainer.html('');
		var template = Handlebars.compile($("#upcoming-matches").html());
		var upcoming = $.grep(formatedData,function(v){ return v.result ? false : true});
		fixtureContainer.append(template({'match' : upcoming}));
		
		var resultContainer = $('#resultsList');
		resultContainer.html('');
		template = Handlebars.compile($("#result-matches").html());
		var results = $.grep(formatedData,function(v){ return v.result ? true : false});
		if (results.length > 0)
			resultContainer.append(template({'match' : results}));
		else 
			resultContainer.append($("<div class='noresults col-sm-12'><p><b>No Results yet</b></p></div>"));
	};
	
	fixtures.prototype.getFixtureData = function() {
		var context = this;
		$.ajax({
			url : 'https://spreadsheets.google.com/feeds/list/1rs8faeR-UcxqzHZWIKBmbRQv3Kqm4yn_Rqolle_yyKs/1/public/basic?alt=json', 
			success : function(data) {
				var formatedData = [];
				for(var i = 0 ; i < data.feed.entry.length; i++) {
				   var rowCols = data.feed.entry[i].content.$t.split(',');
				   var _data = {};
				   for(var j = 0; j < rowCols.length; j++) {
					   var cols = rowCols[j].split(":");
					   _data[cols[0].trim()] = cols[1].trim();
				   }
				   formatedData.push(_data);
				}
				console.log(formatedData);
				context.renderFormattedData.call(context,formatedData);
			}
		});
	};
	return fixtures;
})();