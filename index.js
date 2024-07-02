
var userClickedPattern = [];
var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];

var started = false;
var level = 0;

$(document).keydown(function(){
    if (!started) {
        $("h1").text("Level 0");
        nextSequence();
        started = true;
    }
});


$(".btn").on("click", function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);

    animatePress(userChosenColour);
    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentIndex){
    if(userClickedPattern[currentIndex]===gamePattern[currentIndex]){
        if(userClickedPattern.length===gamePattern.length){
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("h1").text("Game over, press any key to restart");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();

    }

}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level "+level);

    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);
    
}



function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
      $("#" + currentColor).removeClass("pressed");
    }, 100);
}


function startOver(){
    started = false;
    level = 0;
    gamePattern = [];
}