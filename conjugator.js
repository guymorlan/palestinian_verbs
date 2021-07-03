
//var data = jQuery.getJSON("https://raw.githubusercontent.com/guymorlan/levantine_verbs/main/data.json");
var data = $.ajax({
	 // url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/f7f40850b714356e8fac6694192b9f6cdfd15797/data.json",
	// url: "https://rawcdn.githack.com/guymorlan/levantine_verbs/c2cf6e63276c7873156d4205482d06553879c1ca/data_1906.json",
	 //url: "https://raw.githack.com/guymorlan/palestinian_verbs/main/data_new.json",
	 url: "https://raw.githack.com/guymorlan/palestinian_verbs/main/data_0307c.json",
  async: false,
  dataType: 'json'
});


function updateInfo(id){
	var info = document.getElementsByName("verb-info");
	info[0].innerHTML = "<b>Verb: </b>" + data["responseJSON"][id]["verb"] + "<br>" +
	//"<b> Root: </b>" + data["responseJSON"][id]["root"] + "<br>" +
	"<b> Form: </b>" + data["responseJSON"][id]["form"] + " (" + data["responseJSON"][id]["form_type"] + ")" + "<br>" +
	"<b> Meaning: </b>" + data["responseJSON"][id]["english"] + "<br>" +
	"<b> Comments: </b>" + data["responseJSON"][id]["explanation"]
}

var gridEnMain = new gridjs.Grid({
	columns: ["Person", "Present Future", "Past"], 
	data: data["responseJSON"][0]["enMain"],
	width: "50%",
	style: {table: {
      'font-size': '25px'
	  }}}).render(document.getElementById("en-main-table"));
	
	
var gridEnOther = new gridjs.Grid({
	columns: ["Type", "Value"], 
	data: data["responseJSON"][0]["enOther"],
	width: "50%",
	style: {table: {
      'font-size': '25px'
	  }}}).render(document.getElementById("en-other-table"));
	  
var gridHeMain = new gridjs.Grid({
	columns: ["Person", "Present Future", "Past"],
	data: data["responseJSON"][0]["heMain"],
	width: "50%",
	style: {table: {
      'font-size': '25px'
	  }}}).render(document.getElementById("he-main-table"));

var gridHeOther = new gridjs.Grid({
	columns: ["Type", "Value"], 
	data: data["responseJSON"][0]["heOther"],
	width: "50%",
	style: {table: {
      'font-size': '25px'
	  }}}).render(document.getElementById("he-other-table"));

$('.js-example-basic-single').on('select2:select', function (e) {
	
	
	//$("#user-table").html("");

	//console.log(data[e.params.data.id])
	gridEnMain.updateConfig({columns: ["Person", "Present Future", "Past"], data: data["responseJSON"][e.params.data.id]["enMain"]}).forceRender();
	gridHeMain.updateConfig({columns: ["Person", "Present Future", "Past"], data: data["responseJSON"][e.params.data.id]["heMain"]}).forceRender();
	gridEnOther.updateConfig({columns: ["Type", "Value"], data: data["responseJSON"][e.params.data.id]["enOther"]}).forceRender();
	gridHeOther.updateConfig({columns: ["Type", "Value"], data: data["responseJSON"][e.params.data.id]["heOther"]}).forceRender();


	updateInfo(e.params.data.id);
	//.render(document.getElementById("user-table"));
	
	
});



	function formatVerb (verb) {

  var $verb= $(verb.text);
  return $verb;
};

$(document).ready(function() {
	
	


	$(".js-example-basic-single").select2({
		  escapeMarkup: function(markup) {
    return markup;
  },
  templateResult: function(data) {
    return data.text;
  },
  templateSelection: function(data) {
    return data.text;
  },
//		templateResult: formatVerb,
  //templateSelection: formatVerb,
      dir: "rtl"

});
	
	for (var i = 0; i < data["responseJSON"].length; i++) {
	//for (var i = 0; i < 11; i++) {

		var newOption = new Option(data["responseJSON"][i]["text"], data["responseJSON"][i]["id"], false, false);
		$('.js-example-basic-single').append(newOption).trigger('change');
	};

	updateInfo(0);
	//$("select[name=verb]").change(function(){
    //alert($("select[name=verb]"));
	//};
});



