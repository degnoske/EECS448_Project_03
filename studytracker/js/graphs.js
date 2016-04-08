google.charts.load("current", {packages:["corechart"]});
google.charts.setOnLoadCallback(makeGraphs);

      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     9],
          ['Facebook',  2],
          ['YouTube',  2],
          ['Searching', 2],
          ['ku.edu',    7],
		  ['Other', 4]
        ]);

        var options = {
          title: 'My Daily Productivity',
          pieHole: 0.1,
		  'width': 300,
		  'height':200
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
      }
	  
	  //"Javascript "class" for a daily productivity graph
//@author Luke Weber
//@pre aTitle = title for graph, aArrayOfSites = array of sites that will be added to graph, aArrayOfTime = array of times corresponding to time on sites, aWidth = width of graph
//@return a Pie chart graph object.
function DailyGraph(aTitle, aArrayOfSites, aArrayOfTime, aWidth, aHeight, aHtmlId)
{
	this.lTitle = aTitle;
	
	//create table of data
	  var lData = new google.visualization.DataTable();
	lData.addColumn('string', 'Site');
	lData.addColumn('number', 'Time');
	
	if(aArrayOfSites.length == aArrayOfTime.length)
	{
		for(i=0; i<aArrayOfSites.length; i++)
		{
			lData.addRows([[aArrayOfSites[i], aArrayOfTime[i]]]);
		}
	}
	else
	{
		alert("ERROR: DailyGraph must have the same number of sites as time on sites. ");
	}
	
	this.width = aWidth;
	this.height = aHeight;
	this.options = ""
	
	this.setOptions = function(aTitle, aWidth, aHeight) {this.options = {'title':aTitle, 'width': aWidth, 'height': aHeight};};
	
	this.setOptions(this.lTitle,this.width, this.height);
	
	this.setHeight = function(aHeight){this.height=aHeight;};
	this.setWidth = function(aWidth){this.width = aWidth}
	
	this.Chart = new google.visualization.PieChart(document.getElementById(aHtmlId));
	
	this.draw = function(){this.Chart.draw(lData, this.options)}
}

//@author Luke Weber
//@pre aTitle = title for graph, a'Day' =  how much time productive on 'Day', aWidth = width of graph
//@return a Pie chart graph object.
function WeeklyGraph(aTitle, aMonday, aTuesday, aWednesday, aThursday, aFriday, aWidth, aHeight, aHtmlId)
{
	this.lTitle = aTitle;
	
	//create table of data
	  var lData = new google.visualization.DataTable();
	lData.addColumn('string', 'Day Of The Week');
	lData.addColumn('number', 'Time');
	
	var lArrayOfDays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];
	var lArrayOfTime = [aMonday, aTuesday, aWednesday, aThursday, aFriday]
	
	for(i=0; i<lArrayOfDays.length; i++)
	{
		lData.addRows([[lArrayOfDays[i], lArrayOfTime[i]]]);
	}
	
	
	this.width = aWidth;
	this.height = aHeight;
	this.options = ""
	
	this.setOptions = function(aTitle, aWidth, aHeight) {this.options = {'title':aTitle, 'width': aWidth, 'height': aHeight};};
	
	this.setOptions(this.lTitle,this.width, this.height);
	
	this.setHeight = function(aHeight){this.height=aHeight;};
	this.setWidth = function(aWidth){this.width = aWidth}
	
	this.Chart = new google.visualization.BarChart(document.getElementById(aHtmlId));
	
	this.draw = function(){this.Chart.draw(lData, this.options)}
}
//@author Luke Weber
//@pre none
//@return none
function makeGraphs()
{
	var lKey = "GoodTimer"
	var bg = chrome.extension.getBackgroundPage();
	var goodStorage = new StorageObj(lKey);
	goodStorage.setValue(bg.get_good_store()+ bg.get_sec())
	//goodStorage.get doesn't work do to asyncronization of js
	chrome.storage.local.get(lKey, function(obj)
      {
		  var bg = chrome.extension.getBackgroundPage();
		 
		  bg.store_good_sec(obj[lKey]);
	  })
	  
	  var badKey = "BadTimer"
	  var badStorage = new StorageObj("BadTimer");
	  
	  
	
	badStorage.setValue(bg.get_bad_store()+ bg.get_Badsec())
	//badStorage.get doesn't work do to asyncronization of js
	chrome.storage.local.get(badKey, function(obj)
      {
		  var bg = chrome.extension.getBackgroundPage();
		  
		  bg.store_bad_sec(obj[badKey]);
	  })
	  
	  
	var goodTime = bg.get_good_store();
	var badTime = bg.get_bad_store();
	if(goodTime == 0 && badTime == 0)
	{
		
		document.getElementById('graphchart').innerHTML = "No Data For Today";
	}
	else
	{	
		var Pie = new DailyGraph("Study Time", ['Study', 'Not Studing'], [bg.get_good_store(), bg.get_bad_store()], 300, 200, 'graphchart')
		Pie.draw();
	}
	drawChart();
	
}