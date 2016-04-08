
chrome.webNavigation.onCompleted.addListener(function(e)
{
	var activeTab = window.location.hostname;
	var url =e.url;
	var n1 = url.indexOf("www.");
	var n2 = url.indexOf(".com") + 4;
	var domain = url.slice(n1,n2);
	if(domain!="")
	{

		$( document ).ready(function()
		{
			var jqxhr = $.post("http://people.eecs.ku.edu/~psundara/exten/checker.php", {dataToSendToServer1: domain, dataToSendToServer2: "server"}, function(data)
			{
				$('#foo').html(data);
				if(document.getElementById("foo").innerHTML == 1)
				{
					if(get_isStarted()==true){
						//Authors: Luke Dercher, Dylan Egnoske
						var port = chrome.runtime.connect({name: "message"});


						if (confirm("Are you sure you want get on social media? (Click Cancel to redirect to Google") == true)
						{
							BadStart();
							Pause();
						}

						else
						{
							chrome.tabs.update({url: "https://www.google.com"});

						}
					}
				}
			});
		});
	}
});

var sec=0;
var myTime;
var isStarted=false;
/**
 *@author Dylan Egnoske
 * @returns null
 */
function Start(){
	if (get_isStarted() == false) {
		set_isStarted(true);
		myTime = setInterval(counter, 1000);
		set_interval(myTime);
		BadStop();
	}
}
/**
 *@author Dylan Egnoske
 * @returns null
 */
function Stop(){

	clearInterval(get_interval());
	set_isStarted(false);
	set_sec(0);
}
/**
 * @author Dylan Egnoske
 * @returns null
 */
function Pause(){
	clearInterval(get_interval());
	set_isStarted(false);
}

/**
 *@author Dylan Egnoske
 * @returns null
 */
function counter() {

	sec++;

	set_sec(sec);
}
/**
 * @author Dylan Egnoske
 * @param bool
 */
function set_isStarted(bool){
	isStarted=bool;
}
/**
 * @author Dylan Egnoske
 * @returns {boolean}
 */
function get_isStarted(){
	return isStarted;
}
/**
 * @author Dylan Egnoske
 * @param interval
 */
function set_interval(interval){
	myTime=interval;

}
/**
 * @author Dylan Egnoske
 * @param second
 */
function set_sec(second){
	sec=second;
}
/**
 * @author Dylan Egnoske
 * @returns {interval}
 */
function get_interval(){
	return myTime;
}
/**
 * @author Dylan Egnoske
 * @returns {number}
 */
function get_sec(){

	return sec;

}




var bad_sec=0;
var bad_Time;
var isBadStarted=false;
/**
 *@author Luke Dercher
 * @returns null
 */
function BadStart(){
	if (isBadStarted == false) {
		set_isBadStarted(true);
		bad_Time = setInterval(counter, 1000);
		set_interval(bad_time);
	}
}
/**
 *@author Luke Dercher
 * @returns null
 */
function BadStop(){

	clearInterval(get_interval());
	set_isSBadtarted(false);
	set_Badsec(0);
}
/**
 * @author Luke Dercher
 * @returns null
 */
function BadPause(){
	clearInterval(get_interval());
	set_isBadStarted(false);
}

/**
 *@author Luke Dercher
 * @returns null
 */
function Badcounter() {

	bad_sec++;

	set_sec(bad_sec);
}
/**
 * @author Luke Dercher
 * @param bool
 */
function set_isBadStarted(bool){
	isBadStarted=bool;
}
/**
 * @author Luke Dercher
 * @returns {boolean}
 */
function get_isBadStarted(){
	return isStarted;
}
/**
 * @author Luke Dercher
 * @param interval
 */
function set_Badinterval(interval){
	bad_Time=interval;

}
/**
 * @author Luke Dercher
 * @param second
 */
function set_Badsec(second){
	bad_sec=second;
}
/**
 * @author Luke Dercher
 * @returns {interval}
 */
function get_Badinterval(){
	return bad_Time;
}
/**
 * @author Luke Dercher
 * @returns {number}
 */
function get_Badsec(){

	return bad_sec;

}

var storageGood;
function store_good_sec(aValue)
{
	storageGood = aValue
}

function get_good_store()
{
	if(!storageGood)
	{
		storageGood = 0;
	}
	return storageGood
}

var storageBad;
function store_bad_sec(aValue)
{
	storageBad = aValue
}

function get_bad_store()
{
	if(!storageBad)
	{
		storageBad = 0;
	}
	return storageBad
}

//@author Dylan Egnoske, Luke Dercher
//This line opens up a long-lived connection to your background page.
chrome.runtime.onConnect.addListener(function(port)
{
	console.assert(port.name == "message");
	port.onMessage.addListener(function(msg)
	{
		if (msg.message == "pause")
		{
			Pause();
		}
		else if (msg.message == "startBad")
		{
			StartBad();
		}
		else if (msg.message == "start")
		{
			Start();
		}
	});
});

