
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];
var level = 0;
let timerLeft = 10
let timerInterval;
let isFirstKeypress = true;

$(document).keypress(() => {
    if (isFirstKeypress) {
        $("#level-title").text(`Level ${level}`);
        nextSequence();
        isFirstKeypress = false;
    }
});

$(".btn").click(function () {
    var userChosenColour = $(this).attr("id")
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length-1);
});

function nextSequence() {

    startTimer();
    timerLeft = 10;
    userClickedPattern = [];
    level++;

    $("#level-title").text(`Level  ${level}`);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    
    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {

    var audio = new Audio(`sounds/${name}.mp3`);
    audio.play();
}

function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");

    setTimeout(function() {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length){

            setTimeout(function () {
              nextSequence();
            }, 1000);
    
        }
    }

    else {
        clearInterval(timerInterval);
        $('body').addClass('game-over');
        $('#level-title').text('Game Over, Press Any Key to Restart');
        playSound('wrong');

        playSound("wrong");

        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    isFirstKeypress = true;
}

function startTimer() {
    clearInterval(timerInterval);
    $("#time-remaining").text(`00:${timerLeft}`);

    timerInterval = setInterval(() => {
        timerLeft--;
        const seconds = timerLeft < 10 ? "0" + timerLeft : timerLeft;
        $("#time-remaining").text(`00:${seconds}`);
        if (timerLeft === 0) {
            clearInterval(timerInterval);
            handleTimeOut();
        }
    },1000)
}

function handleTimeOut() {
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");

    setTimeout(function() {
        $("body").removeClass("game-over");
    }, 200);

    startOver();
}