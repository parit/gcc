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
		var template = Handlebars.compile($("#upcoming-matches").html());
		$('#fixturesList').append(template({'match' : formatedData}));
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
				context.renderFormattedData.call(context,formatedData);
			}
		});
	};
	return fixtures;
})();