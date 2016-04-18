


var goodTimer = new Timer('goodTimer');

var badTimer = new Timer('badTimer');

var TimerArr = [];

//@Author Luke Weber
//@pre The url of site
function addSiteTimer(aURL)
{
	TimerArr.push(new Timer('aURL'));
}

function getGoodTimer()
{
	return goodTimer;
}

function getBadTimer()
{
	return badTimer;
}

function getAllSiteTimers()
{
	return TimerArr;
}
chrome.webNavigation.onCompleted.addListener
(
	//@author Sri
	//@pre event of page loading completely
	//@post checks site for blacklist
	//@return none
	function(e)
	{
		var url =e.url;
		checkSite(url);
	}
);

//@Author Sri
//@pre the URL of alleged blocked site
//@post checks if blocks site and alerts user
//@return none
function checkSite(aURL)
{
  var n1 = aURL.indexOf("www.");
  var n2 = aURL.indexOf(".com") + 4;
  var domain = aURL.slice(n1,n2);

  //ensure that it's not empty
  if(domain!="")
  {

    $( document ).ready
	(
		function()
		{
			//post arguments php page, data to send[] , function to run on callback
		  var jqxhr = $.post
		  (
		  "http://people.eecs.ku.edu/~psundara/exten/checker.php", {dataToSendToServer1: domain, dataToSendToServer2: "server"}, 
			  function(data)
			  {
				//store boolean on HTML then retrieve that boolean
				$('#foo').html(data);
				if(document.getElementById("foo").innerHTML == 1 && goodTimer.get_isStarted())
				{

					var badPage = confirm("Are you sure you want get on social media? (Click Cancel to redirect to Google");
					confirmationAlert(badPage);

				}
			  }
		  )
		}
		
	)
	
  }
}

//@Author Luke Dercher, Dylan Egnoske
//@pre aBoolean from the confirmationAler
//@post starts appropriate timers and redirects pages
//@return none
function confirmationAlert(aBoolean)
{
	//user stays on blocked page
	if (aBoolean)
	{
		badTimer.Start();
		goodTimer.Pause();
	}

	//user gets redirected to google
	else
	{

		goodTimer.Start();
		chrome.tabs.update({url: "https://www.google.com"});
		badTimer.Pause();

	}
}
