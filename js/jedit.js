var jsEditor = ace.edit("jsEditor");
jsEditor.setTheme("ace/theme/monokai");
jsEditor.getSession().setMode("ace/mode/javascript");

$("#jsEditor").keyup(function(){
	$('#result').text(jsEditor.getValue());
});
