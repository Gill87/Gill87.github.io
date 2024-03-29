let hiddenName = "Thomas Muller";
let hiddenTeam = "FC Bayern München";
let hiddenNationality = "GER";
let hiddenPosition = "CAM";
let hiddenRating = 87;
let hiddenLeague = "Bundesliga";

if(localStorage.getItem("Bool") == "true"){
    hiddenName = "Jadon Sancho";
    hiddenLeague = "Premier League";
    hiddenPosition = "RM";
    hiddenTeam = "Manchester United";
    hiddenRating = 87;
    hiddenNationality = "ENG";

    document.getElementById("blurredPlayer").src = "images/3337539-68231048-2560-1440.jpg";
}

if(localStorage.getItem("Bool") == "false"){
    let hiddenName = "Thomas Muller";
    let hiddenTeam = "FC Bayern München";
    let hiddenNationality = "GER";
    let hiddenPosition = "CAM";
    let hiddenRating = 87;
    let hiddenLeague = "Bundesliga";
    localStorage.setItem("tracker", "2");
}

let showCount = 0;

let index = -1;
let track = 0;
let realNames = [];
let arrow = "";

let guessName;
let guessCount = 0;
let score = 0;

let messageWon1 = "You Won!";
let messageWon2 = "Correct, the player was indeed ";

let messageLost1 = "You Lost!";
let messageLost2 = "The player was ";

let count = 1;

let bool = false;

let num = 0;

let guesses = [];

let length = 0;

localStorage.setItem("Button", "All");

function choice1(){
    window.open("index.html", "_self");
    localStorage.setItem("Button", "All");
}
function choice3(){
    window.open("index2.html", "_self");
    localStorage.setItem("Button", "Prem");
}
function choice2(){
    window.open("index3.html", "_self");
    localStorage.setItem("Button", "Top");
}

function challenge(){
    document.getElementById("popup3").classList.toggle("active");
    document.getElementById("header3").innerHTML = "Mission Impossible";
    document.getElementById("para3").innerHTML = "Earn the Master Detective Badge by guessing all 3 daily players in less than or equal to a combined total of 7 guesses! Each player guessed is worth 10 points minus each guess you made. You need to score at least 23 points to earn the badge. Is this the impossible feat, maybe, let's see if you can make it possible!";
}

function filterList(){
    let touch1 = false;
    let touch2 = false;
    let touch3 = false;
    let touch4 = false;

    document.getElementById("option1").style.display = 'block';
    document.getElementById("option3").style.display = 'block';
    document.getElementById("option4").style.display = 'block';
    document.getElementById("option2").style.display = 'block';


    let value = document.getElementById('txtGuess').value;
    
    if(value.length > 0){
        document.getElementById("box").style.display = 'block';
    }
    else {
        document.getElementById("box").style.display = 'none';
    }
    
    value = value.toUpperCase();
    
      for(var i = names.length - 1; i >= 0; --i){
        let name = names[i];
        name = name.toUpperCase();

        if(name.includes(value)){
            if(count == 1){
                document.getElementById("option1").innerHTML = names[i];
                touch1 = true;
            }
            else if(count == 2){
                document.getElementById("option2").innerHTML = names[i];
                touch2 = true;
            }
            else if(count == 3){
                document.getElementById("option3").innerHTML = names[i];
                touch3 = true;
            }
            else if(count == 4){
                document.getElementById("option4").innerHTML = names[i];
                touch4 = true;
            }
            ++num;
            ++count;
        }

        if(count > 4){
            count = 1;
        }
    }

    let option1 = document.getElementById("option1").innerText;
    let option2 = document.getElementById("option2").innerText;
    let option3 = document.getElementById("option3").innerText;
    let option4 = document.getElementById("option4").innerText;

    
    if(touch1 == false){
        option1 = '';
        document.getElementById("option1").style.display = 'none';
    } 
    
    if(touch2 == false){
        option2 = '';
        document.getElementById("option2").style.display = 'none';
    } 

    if(touch3 == false){
        option3 = '';
        document.getElementById("option3").innerText = '';
        document.getElementById("option3").style.display = 'none';
    } 
    
    if(touch4 == false){
        option4 = '';
        document.getElementById("option4").style.display = 'none';
    } 

    
    if(option1 == option2 || option1 == option3 || option1 == option4){
        document.getElementById("option1").style.display = 'none';
    }
    
    if(option2 == option4 || option3 == option4){
        document.getElementById("option4").style.display = 'none';
    }

    if(option3 == option2 ){
        document.getElementById("option2").style.display = 'none';
    }


    if(bool == false){
        document.getElementById("textButton").disabled = true;
    }

    if(num == 0){
        document.getElementById("box").style.display = 'none';
    }

    num = 0;
}

function input(elem){
    document.getElementById("txtGuess").value = elem.innerHTML;
    document.querySelector("#box").style.display = 'none';
    bool = true;
    document.getElementById("textButton").disabled = false;
}

function clicked(){
    localStorage.setItem("result", "");

    guessName = document.getElementById("txtGuess").value;

    if(guessName == ""){
        return;
    }
    document.getElementById("option1").value = guessName;

    if(guessCount == 0 || guessCount == null){
        guessCount += 2;
    }
    else {
        ++guessCount;
    }

    localStorage.setItem("GuessCount", guessCount);


    console.log("Count: " + guessCount);

    guesses.push(guessName);
    
    if(guessCount <= 9){
        document.getElementById("txtGuess").setAttribute("placeholder", "Guess " + (guessCount) + " of 8");
        validatingGuess();
        displayingGuess();
    }

    if(guessCount == 9 && localStorage.getItem("result") != "won"){
        togglePopup(messageLost1, messageLost2);
        document.getElementById("txtGuess").setAttribute("placeholder", "Game Over!");
        localStorage.setItem("result", "lost");
        displayCorrect();
    }

    ++length;
    localStorage.setItem("length", length);
    saveData();
}

function validatingGuess(){
    for(var j = 0; j < names.length; ++j){
        realNames.push(names[j]);
        realNames[j] = realNames[j].toUpperCase();
        guessName = guessName.toUpperCase();
        if(guessName == realNames[j]){
            index = j;
        }
    }
    makeArrow();
}

function displayingGuess(num){
    if(index == -1){
        if(num != 100){
            --guessCount;
        }
        if(localStorage.getItem("result") == "won"){
            document.getElementById("txtGuess").setAttribute("placeholder", "Solved it in " + (guessCount) + "!");
        }
        else if(localStorage.getItem("result") == "lost"){
            document.getElementById("txtGuess").setAttribute("placeholder", "Game Over!");
        }
        else if(guessCount == null){
            guessCount = null;
        }
        else {
            document.getElementById("txtGuess").setAttribute("placeholder", "Guess " + (guessCount) + " of 8");
        }
        clear();
        return;
    }
    var table = document.getElementById("mainTable");
    var row = table.insertRow();
    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();
    
    cell1.innerHTML = names[index];
    cell2.innerHTML = nationality[index];
    cell3.innerHTML = league[index];
    cell4.innerHTML = teams[index];
    cell5.innerHTML = position[index];
    cell6.innerHTML = rating[index] + arrow;
    
    if(hiddenName == names[index]){
        cell1.style.backgroundColor = "green";
        ++track;
    }
    if(hiddenNationality == nationality[index]){
        cell2.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenLeague == league[index]){
        cell3.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenTeam == teams[index]){
        cell4.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenPosition == position[index]){
        cell5.style.backgroundColor = "green";
        ++track;
    }
    
    if(hiddenRating == rating[index]){
        cell6.style.backgroundColor = "green";
        ++track;
    }
    else if((hiddenRating - rating[index] == 2) || (hiddenRating - rating[index] == -2) || (hiddenRating - rating[index] == -1) || (hiddenRating - rating[index] == 1)){
        cell6.style.backgroundColor = "yellow";
    }
    
    if(track == 6){
        --guessCount;
        if(localStorage.getItem("result") != "won"){
            score = localStorage.getItem("Score");
            score = parseInt(localStorage.Score);    
            score = score + 10 - (guessCount - 1);
            localStorage.setItem("Score", score);
            document.getElementById("Score").innerHTML = "Score: " + score;
            document.getElementById("Score2").innerHTML = "Score: " + score;
        }
        localStorage.setItem("result", "won");
        togglePopup(messageWon1, messageWon2);
        if(score >= 23){
            badge();
        }
    }
    else {
        clear();
    }
    
    track = 0;

    index = -1;
}

function badge(){
    document.getElementById("popup4").classList.toggle("active");
    document.getElementById("header4").innerHTML = "Congratulations!";
    document.getElementById("para4").innerHTML = "You have earned the Master Detective badge by accomplishing the impossible by scoring more than 22 points, well done!";
}

function togglePopup(message1, message2){
    if(localStorage.getItem("Bool") == "true"){
        document.getElementById("player").src = "images/3337539-68231048-2560-1440.jpg";
    }
    
    document.getElementById("txtGuess").value = "";
    
    if(localStorage.getItem("result") == "won"){
        document.getElementById("txtGuess").setAttribute("placeholder", "Solved it in " + (guessCount) + "!");
    }

    document.getElementById("popup1").classList.toggle("active");
    
    document.getElementById("header1").innerHTML = message1;
    document.getElementById("para").innerHTML = message2 + hiddenName + "!";
    
    document.getElementById("txtGuess").setAttribute("readOnly", "readOnly");
    document.getElementById("textButton").setAttribute("disabled", "disabled");

    document.getElementById("box").style.display = 'none';
    document.getElementById("player").style.display = "block";

    let x  = setInterval(function() {

        let countdownDate = new Date();
        countdownDate.setHours(23, 59, 59);

        if(localStorage.getItem("Bool") == "true"){
            countdownDate = new Date();
            countdownDate.setHours(23, 59, 59);
            localStorage.setItem("tracker", "1");
        }

        let now = new Date();

        let distance = countdownDate - now;

        let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((distance % (1000 * 60)) / 1000);

        if(hours < 10){
            hours = "0" + hours;
        }
        
        if(minutes < 10){
            minutes = "0" + minutes;
        }

        if(seconds < 10){
            seconds = "0" + seconds;
        }

        document.getElementById("time").innerHTML = hours + " : " + minutes + " : " + seconds;

        if(distance <= 0){
            localStorage.clear();
            localStorage.setItem("Bool", "true");
            window.location.reload();
            document.getElementById("player").src = "images/3337539-68231048-2560-1440.jpg";
            console.log("Midnight");
         }

    }, 1000);
}

function change(){
    localStorage.clear();
    localStorage.setItem("Bool", "true");
    localStorage.setItem("Bool2", "true");
    localStorage.setItem("Bool3", "true");

    localStorage.setItem("Score", 0);
    score = 0;

    document.getElementById("player").src = "images/3337539-68231048-2560-1440.jpg";
    console.log("Midnight");
}

function rulesPopup(){
    document.getElementById("popup2").classList.toggle("active");
    
    document.getElementById("header2").innerHTML = "How to Play";
}

function clear(){
    let text = document.getElementById("txtGuess");
    text.value = "";
}

function displayCorrect(){
    var table = document.getElementById("mainTable");
    var row = table.insertRow();

    var cell1 = row.insertCell();
    var cell2 = row.insertCell();
    var cell3 = row.insertCell();
    var cell4 = row.insertCell();
    var cell5 = row.insertCell();
    var cell6 = row.insertCell();

    cell1.innerHTML = hiddenName;
    cell2.innerHTML = hiddenNationality;
    cell3.innerHTML = hiddenLeague;
    cell4.innerHTML = hiddenTeam;
    cell5.innerHTML = hiddenPosition;
    cell6.innerHTML = hiddenRating;

    cell1.style.backgroundColor = "red";
    cell2.style.backgroundColor = "red";
    cell3.style.backgroundColor = "red";
    cell4.style.backgroundColor = "red";
    cell5.style.backgroundColor = "red";
    cell6.style.backgroundColor = "red";
}

function saveData(){
    for(var i = 0; i < localStorage.getItem("length"); ++i){
        if(i == 0){
            localStorage.setItem("name1", guesses[i]);
        }
        if(i == 1){
            localStorage.setItem("name2", guesses[i]);
        }

        if(i == 2){
            localStorage.setItem("name3", guesses[i]);
        }

        if(i == 3){
            localStorage.setItem("name4", guesses[i]);
        }

        if(i == 4){
            localStorage.setItem("name5", guesses[i]);
        }

        if(i == 5){
            localStorage.setItem("name6", guesses[i]);
        }

        if(i == 6){
            localStorage.setItem("name7", guesses[i]);
        }

        if(i == 7){
            localStorage.setItem("name8", guesses[i]);
        }
    }
}

function loadData(){
    document.getElementById("All").style.backgroundColor = "beige";
    
    if(localStorage.getItem("Score") == null){
        localStorage.setItem("Score", 0);
    }
    
    document.getElementById("Score").innerHTML = "Score: " + localStorage.getItem("Score");
    document.getElementById("Score2").innerHTML = "Score: " + localStorage.getItem("Score");

    if(localStorage.getItem("Score") == 0 && showCount < 1){
        rulesPopup();
        ++showCount;
    }
    

    // let now = new Date();
    // let tomorrow = new Date("August 2, 2022 00:00:00");

    // if(now.getDate() == tomorrow.getDate() && localStorage.getItem("Bool") != "true"){
    //     change();
    // }

    if(localStorage.getItem("Bool") == "true"){
        hiddenName = "Jadon Sancho";
        hiddenLeague = "Premier League";
        hiddenPosition = "RM";
        hiddenTeam = "Manchester United";
        hiddenRating = 87;
        hiddenNationality = "ENG";
    }

    length = localStorage.getItem("length");

    guessCount = localStorage.getItem("GuessCount");

    i = guessCount - 1;

    console.log("Count(): " + guessCount);

    if(i == 1){
        guesses.push(localStorage.getItem("name1"));
    }
    else if(i == 2){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
    }
    else if(i == 3){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
        guesses.push(localStorage.getItem("name3"));
    }
    else if(i == 4){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
        guesses.push(localStorage.getItem("name3"));
        guesses.push(localStorage.getItem("name4"));
    }
    else if(i == 5){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
        guesses.push(localStorage.getItem("name3"));
        guesses.push(localStorage.getItem("name4"));
        guesses.push(localStorage.getItem("name5"));
    }
    else if(i == 6){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
        guesses.push(localStorage.getItem("name3"));
        guesses.push(localStorage.getItem("name4"));
        guesses.push(localStorage.getItem("name5"));
        guesses.push(localStorage.getItem("name6"));
    }
    else if(i == 7){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
        guesses.push(localStorage.getItem("name3"));
        guesses.push(localStorage.getItem("name4"));
        guesses.push(localStorage.getItem("name5"));
        guesses.push(localStorage.getItem("name6"));
        guesses.push(localStorage.getItem("name7"));
    }
    else if(i == 8){
        guesses.push(localStorage.getItem("name1"));
        guesses.push(localStorage.getItem("name2"));
        guesses.push(localStorage.getItem("name3"));
        guesses.push(localStorage.getItem("name4"));
        guesses.push(localStorage.getItem("name5"));
        guesses.push(localStorage.getItem("name6"));
        guesses.push(localStorage.getItem("name7"));
        guesses.push(localStorage.getItem("name8"));
    }
    
    check(localStorage.getItem("name1"));
    check(localStorage.getItem("name2"));
    check(localStorage.getItem("name3"));
    check(localStorage.getItem("name4"));
    check(localStorage.getItem("name5"));
    check(localStorage.getItem("name6"));
    check(localStorage.getItem("name7"));
    check(localStorage.getItem("name8"));

    if(localStorage.getItem("result") == "lost"){
        displayCorrect();
        togglePopup(messageLost1, messageLost2);
        document.getElementById("txtGuess").setAttribute("placeholder", "Game Over!");
    }
}

function check(name){
    for(var i = 0; i < names.length; ++i){
        if(names[i] == name){
            index = i;
            makeArrow();
            break;
        }
    }
    displayingGuess(100);
}

function makeArrow(){
    if(rating[index] < hiddenRating){
        arrow = "  ↑";
    }
    else if(rating[index] == hiddenRating){
        arrow = "";
    }
    else {
        arrow = "  ↓";
    }
}

function showImage(){
    document.getElementById("popup5").classList.toggle("active");

}

localStorage.clear();
