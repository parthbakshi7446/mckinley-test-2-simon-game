var buttons = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
    if (!started) {
        $("#level").text("Level " + level);
        generateNextSequence();
        started = true;
    }
});

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    animateButtonPress(userChosenColour);

    checkInput(userClickedPattern.length-1);
});

function checkInput(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                generateNextSequence();
            }, 1000);
        }
    } else {
        $("body").addClass("game-over");
        $("#level").text("Game Over, Press Any Key to Restart");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);

        startAgain();
    }
}


function generateNextSequence() {
    userClickedPattern = [];
    level++;
    $("#level").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttons[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
}

function animateButtonPress(currentColor) {
    $("#" + currentColor).addClass("buttonPress");
    setTimeout(function () {
        $("#" + currentColor).removeClass("buttonPress");
    }, 50);
}

function startAgain() {
    level = 0;
    gamePattern = [];
    started = false;
}
