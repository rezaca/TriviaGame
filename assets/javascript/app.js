$(document).ready(function(){

// GLOBAL VARIABLES
// **********************************************

var questions = [
{
	q:"The Charlotte Hornets were originally supposed to be named?",
	c:["The Flight", "Dragons", "Air", "The Reveres"],
	a:0
},
{
	q:"What is the name of the famous uptown red bus?",
	c:["Comedy Bus", "Happy Bus", "Funny Bus", "Da Bus"],
	a:0
},
{
	q:"Which of these breweries has a famous friday event?",
	c:["Birdsong", "Heist", "Sycamore", "Wooden Robot"],
	a:2
},
{
	q:"What is the tallest building in Charlotte?",
	c:["Duke Energy", "Hearst Tower", "One Wells Fargo", "Bank of America"],
	a:3
},
{
	q:"The Charlotte Hornets have never been...",
	c:["a football team.", "a hockey team.", "a baseball team.", "a basketball team."],
	a:1
}];

var correct; 
var incorrect; 
var unanswered;
var currentQ;
var count; 
var counter; 
var answered; 
var selection;

// FUNCTIONS

function timer() {
	count = 20;
	$('#timer').html(count);
	answered = true;
	counter = setInterval (startTimer, 1000);
}

function startTimer() {
	count--;
	$('#timer').html(count);
	if (count <= 0){
		clearInterval(counter);
		answered = false;
		newA();
	}
}

function newQ() {
	$("#message").empty();
	answered = true;
	$('.questions').html('<h2>' + questions[currentQ].q + '</h2>');
	for(var i = 0; i < 4; i++){
		var currentChoices = $('<div>');
			currentChoices.html('<h4>' + questions[currentQ].c[i] + '</h4>');
			currentChoices.attr({'data-index': i });
			currentChoices.addClass('thisChoice');
			$('.choices').append(currentChoices);
	}
	timer();
	$('.thisChoice').on('click',function(){
        selection = $(this).data('index');
        clearInterval(counter);
		newA();
	});
}

function newA(){
    $('.thisChoice').empty();
    $('.questions').empty();

    var currentAnswer = questions[currentQ].a;
    if((selection == currentAnswer) && (answered == true)){
        correct++;
        $('#message').html('<h1>You are right. DAB!</h1>');
    } else if((selection != currentAnswer) && (answered == true)){
        incorrect++;
        $('#message').html('<h1>You are wrong. SAD!</h1>');
    } else{
        unanswered++;
        answered = true;
    }
    
    if(currentQ == (questions.length-1)){
    	setTimeout(score, 1000)} 
    else{
    	currentQ++;
    	setTimeout(newQ, 1000);
    }   
}

function score() {
	$("#message").empty();
	$('#correct').html("Correct Answers: " + correct);
    $('#incorrect').html("Incorrect Answers: " + incorrect);
    $('#unanswered').html("Unanswered: " + unanswered);
}

function restart() {

}

function game() {
	$('#correct').empty();
    $('#incorrect').empty();
    $('#unanswered').empty();
	correct = 0;
	incorrect = 0;
	unanswered = 0;
	currentQ = 0;
	newQ();
}

// START GAME
$('#play-button').on('click', function(){
    $(this).hide();
	game();
});

});