
var buttonColors = ["red","blue","green","yellow"]
var gamePattern = []
var userClickedPattern = []
var started = false
var level = 0

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level)
        nextSequence()
        started = true
        
    } 
    
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id")
    userClickedPattern.push(userChosenColor)
    console.log(userClickedPattern)
    playSound(userChosenColor)
    animatePress(userChosenColor)
    checkAnswer(userClickedPattern.length-1)

})



 function nextSequence() {
    level++
    $("#level-title").text("Level " + level)

var randomNum = Math.floor(Math.random() * 3) + 1
var randomChosenColor = buttonColors[randomNum]
gamePattern.push(randomChosenColor)   
$("#" + randomChosenColor).fadein(100).fadeout(100).fadein(100)
var audio = new Audio("./sound"+randomChosenColor+".mp3")
audio.play()


}

function playSound(randomChosenColor){
    var audio = new Audio("./sound"+randomChosenColor+".mp3")
audio.play()

}
function animatePress(currentColor){
    $("#" + currentColor).addClass("pressed")
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed")
    }, 100)
    
}

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("Sucess")
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence()
              }, 1000)
            
        } 
        
    } else {
        console.log("wrong")
        playSound("wrong")

        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
            
        },200)
        $("#level-title").text("Game Over Press Any Key To Restart");

        startOver()
    }  
}

function startOver() {
    level = 0
    gamePattern = []
    started = false
    
}