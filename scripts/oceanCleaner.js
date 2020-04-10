var difficulty = 1;
var lives = 3;
var points = 0;
var particlesInGame = 0;
var answerBoxNo;
var questioncounter = 0;
var questioncounter2 = 0;
var particleQueue = [];
var rightAnswer = false;
var questions = [
    ["\nWas gehört nicht ins Altpapier?", "Backpapier", "Karton", "Briefpapier", "Zeitung"],
    ["Aus welchem Land kommt Greta Thunberg?", "Schweden", "Norwegen", "Dänemark", "Niederlanden"],
    ["Womit sollte man seine Einkäufe transportieren?", "Eigene Tasche", "Plastiktüte", "Papiertüte", "ohne Tasche"],
    ["Wieviel Prozent Plasitk wird in Deutschland recycelt?", "16%", "57%", "42%", "89%"],
    ["Was sollte nicht am Strand liegen?", "Plastiktüte", "Muscheln", "Steine", "Korallen"],
    ["Was kann man nur schwer recyceln?", "Tetra Pak", "Glasfalsche", "Plastikflasche", "Dosen"],
    ["Womit kann man Strom am CO2 neutralsten erzeugen? ", "Uran", "Steinkohle", "Erdgas", "Erdöl"],
    ["Wann soll das letzte Kernkraftwerk in Deutschland abgeschaltet werden?", "2022", "2030", "2025", "2050"],
    ["Was kommt nicht in den Kompost?", "Fleisch", "Gemüsereste", "Verfaultes Obst", "Kaffeefilter"],
    ["Was kann CO2 speichern?", "Bäume", "Lithiumionenakku", "Steine", "Stoff"],
    ["Welches Lebensmittel ist der größte Klimakiller?", "Butter", "Gemüse", "Rindfleisch", "Soya"],
    ["Wie kann man nicht CO2 Austoß im Alltag reduzieren?", "Heizen", "Secondhand", "Minimalismus", "Lüften"],
    ];

function selectDifficulty(x) {
    difficulty = x
    for (i = 1; i < 4; i++) {
        if (i == x) {
            document.getElementById("diff" + i).style.backgroundImage = "linear-gradient(orange, #ff630b)"
        } else {
            document.getElementById("diff" + i).style.backgroundImage = "linear-gradient(white, white)"
        }
    }
}

function start() {
    lives = 3;
    points = 0;
    particlesInGame = 0;
    answerBoxNo;
    questioncounter = 0;
    questioncounter2 = 0;
    particleQueue = [];
    rightAnswer = false;

    document.getElementById("game-menu-container").style.visibility = "hidden";
    $(".hidden-at-start").css("visibility", "visible")
    updatePoints(0)

    move(document.getElementsByClassName("particles")[0].children[0]);

    if (difficulty >= 2) {
        setTimeout(function () {
            move(document.getElementsByClassName("particles")[0].children[1]);
        }, 4000);
        if (difficulty >= 3) {
            setTimeout(function () {
                move(document.getElementsByClassName("particles")[0].children[2]);
            }, 8000);
        }
    }

    fillAnswers()

}

function showID(elem) {
    // alert("kasjd")
}

function end() {
    particleQueue.pop()
    if (particleQueue.length < 1) {
        var descrString = ""
        if (lives <= 0) {
            descrString += "Du musst schneller sein!\n Du hast " + points + " von " + questions.length + " Punkten erreicht."
        } else if (points == questions.length) {
            descrString = "Perfekt!\n Du hast alle Punkte erreicht! (" + points + "/" + points + ")"
        } else if (points <= 0) {
            descrString += "Nächstes Mal wird's besser!\n Du hast " + points + " von " + questions.length + " Punkten erreicht."
        } else {
            descrString += "Weiter so!\n Du hast " + points + " von " + questions.length + " Punkten erreicht."
        }
        document.getElementById("descr").innerText = descrString
        document.getElementById("start-button").innerText = "Nochmal!"

        $("#game-menu-container").css("visibility", "visible")
    }
}

function fillQuestion(elem) {
    if (questioncounter2 < questions.length) {
        elem.children[0].innerText = questions[questioncounter2++][0]
        // elem.children[0].innerText = elem.id + " " + questions[questioncounter2++][0]
    }
}


function fillAnswers() {
    if (questioncounter < questions.length) {
        var rand = Math.floor(Math.random() * (Math.floor(5) - Math.ceil(1))) + Math.ceil(1);
        answerBoxNo = (((1 + rand) % 4) + 1)
        particleQueue.push(particleQueue.shift())
        for (i = 1; i < 5; i++) {
            var x = (((i + rand) % 4) + 1)
            document.getElementById("ans" + x).children[0].innerText = questions[questioncounter][i]
            // document.getElementById("ans" + x).children[0].innerText = particleQueue[0].id + " " + questions[questioncounter][i]
            document.getElementById("ans" + x).style.backgroundColor = "white";
        }
        questioncounter++;
    }
}

function checkAnswer(x) {
    if (x == document.getElementById("ans" + answerBoxNo)) {
        updatePoints(1)
        for (i = 1; i < 5; i++) {
            document.getElementById("ans" + i).style.pointerEvents = "none";
        }
        x.style.backgroundColor = "green"
        setTimeout(function () {
            rightAnswer = true;
            for (i = 1; i < 5; i++) {
                document.getElementById("ans" + i).style.pointerEvents = "all";
            }
        }, 500);
    } else {
        updatePoints(-1)
        x.style.backgroundColor = "red"
        x.style.pointerEvents = "none"
    }
}

function updatePoints(x) {
    if (x > 0) {
        points = Math.max(points, 0) + 1;
    } else if (x == -1) {
        points = points + x;
    } else if (x == -3) {
        lives = lives - 1;
    }
    var stringLives = "Leben: "
    for (i = 0; i < lives; i++)
        stringLives = stringLives + "❤️"
    var stringPoints = "Punkte: "
    if (points < 1) {
        stringPoints += points
    }
    for (i = 0; i < points; i++)
        stringPoints = stringPoints + "🐟"
    document.getElementById("lives").innerText = stringLives;
    document.getElementById("punkte").innerText = stringPoints;
}

function move(elem) {
    var pos;
    var id = setInterval(frame, Math.max(19 - (3 * difficulty), 8));
    particleQueue.push(elem);
    resetParticle()

    function frame() {
        if (pos == $(window).height() && elem.id == particleQueue[0].id) {
            resetParticleAndAnswer()
            updatePoints(-3)
        } else if (rightAnswer && elem.id == particleQueue[0].id) {
            rightAnswer = false
            resetParticleAndAnswer()
        } else {
            pos = elem.getBoundingClientRect().top
            pos++;
            elem.style.top = pos + "px";
        }

        if (lives <= 0) {
            clearInterval(id);
            resetParticle()
            end()
        }

    }

    function resetParticleAndAnswer() {
        fillAnswers()
        resetParticle()
    }

    function resetParticle() {
        elem.style.top = -300 + "px";
        pos = elem.getBoundingClientRect().top
        // elem.style.left = (Math.floor(Math.random() * 6) + 2) + "0%"
        if (questioncounter2 >= questions.length) {
            clearInterval(id);
            end()
        }
        fillQuestion(elem)
    }

}
