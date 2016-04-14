var fixtures = (function(){
	function fixtures(container) {
		this.renderFormattedData = __bind(this.renderFormattedData, this);
		this.getFixtureData = __bind(this.getFixtureData, this);
		this.getResult = __bind(this.getResult, this);
		this.init = __bind(this.init, this);
	}
	
	fixtures.prototype.init = function(container) {
		this.getFixtureData(container);
	};
	
	fixtures.prototype.renderFormattedData = function(formatedData, container) {
		var context = this;
		formatedData.sort(function(a,b){
			return new Date(b.date) - new Date(a.date);
		}); 
		$.each(formatedData,function(index,element){
			var tr = $('<tr></tr>');
			tr.append(context.getDescription(element)).append(context.getResult(element));
			container.append(tr);
		});
	};
	
	fixtures.prototype.getResult = function(obj) {
		if ("Cancelled due to rain" === obj.result || "Rained off" === obj.result || "Cancelled" === obj.result) {
			return $("<td><div><span class='result_cancelled'>" + obj.result + "</span></div></td>");
		} 
		return $("<td><div><span> GCC: <span class='gccScore'>" + obj['score-for'] + 
		"</span> - " + obj.against + ": <span class='otherScore'>" + obj['score-against']
		+ "</span></span></div><div><span class='result'>" + obj.result + "</span></div></td>");
	};
	
	fixtures.prototype.getDescription = function(obj) {
		var description = 
			"<td><div><span class='tournament'><strong>" +  obj.tournament + "</strong></span> : " 
			+ "<span class='teams text-primary'> GCC vs " + obj.against + "</span>"
			+ " at " + "<span class='venue'>" + obj.venue + "</span> - <span class='data'> " 
			+ obj.date + "</div>"
			+ "<div><span class='matchType'>" + obj.type + " match.</span></div></td>";
		return $(description);
	};
	
	fixtures.prototype.getFixtureData = function(container) {
		var context = this;
		$.ajax({
			url : 'https://spreadsheets.google.com/feeds/list/1Le0TL0SajUKWyqnzSQuRyu4c-ACdoQR9FV_YXPLtOsw/1/public/basic?alt=json', 
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
				context.renderFormattedData.call(context,formatedData,container);
			}
		});
	};
	return fixtures;
})();