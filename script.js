window.onload = () => {
    const menu = document.getElementsByClassName("menu")[0]
    const game = document.getElementById("game");
    const paramButton = document.getElementById("param");
    const paramWindow = document.getElementById("param-window")
    const plageWindow = document.getElementById("plage")
    const saveButton = document.getElementById("save")
    const plageGame = document.getElementsByClassName("plageNb")[0]
    const param = {
        min:1,
        max:100,
        nbTry: 0,
        nbTryMax: null
    }


    //Afficher la plage sur html et input au load
    const inputMin = document.getElementById("min")
    const inputMax =  document.getElementById("max")
    loadParam()
        //load les paramètres
    function loadParam() {
        plageWindow.innerHTML = param.min + " et " + param.max;
        plageGame.innerHTML = param.min + " et " + param.max;
        inputMin.value = param.min
        inputMax.value = param.max
    }

    //Enregistrer les params
    saveButton.onclick = () => {
        param.min = parseInt(inputMin.value)
        param.max = parseInt(inputMax.value)
        loadParam()
        closeParam()
    }


    // Paramètres
    function closeParam () {
        paramWindow.classList.remove("param-active")
        paramButton.classList.remove("button-active")
    }
    function showParam () {
        paramButton.classList.add("button-active")
        paramWindow.classList.add("param-active")
    }
    paramButton.onclick = function (){
        if(paramButton.classList.contains("button-active")){
            closeParam()
        }
        else {
            showParam()
        }
    }

    //Play game

    const buttonPlay = document.getElementById("play")
    let randomNb = 0
    buttonPlay.onclick = () => {
        menu.classList.add("fadeOut")
        setTimeout(function(){
            menu.hidden = true;
            game.hidden = false
        }, 1000);
        //déclare un nombre aléatoire
       randomNb = Math.floor(Math.random() * (param.max - param.min) + param.min);
       console.log(param)
    }

    const tryForm = document.getElementById("try")
    const message = document.getElementById("message")
    const nbTry = document.getElementById("nbTry")
    const loadTry= () => {
        param.nbTry += 1;
        const tryMaxMessage = (nb) => {
            if (nb == null) {
                return " (Aucune restriction)"
            } else {
                return " (Reste " + (nb - param.nbTry) + " essais)"
            }
        }
        nbTry.innerHTML = param.nbTry + tryMaxMessage(param.nbTryMax)
        tryForm[0].value = null
    }
    loadTry()
    tryForm.onsubmit =(e) => {
        e.preventDefault();
        console.log(randomNb);
        const nb = tryForm[0].value
        if(nb == randomNb) {
            win()
        }
        else if( nb > randomNb) {
            message.innerHTML = "<img src='images/false.svg' alt='false'><p>Trop grand</p> "
        } else if (nb < randomNb) {
            message.innerHTML = "<img src='images/false.svg' alt='false'><p>Trop petit</p> "
        }
        loadTry()
    }
    const winpanel = document.getElementById("winpanel")
    const win = () => {
        message.innerHTML = ""
        game.classList.add("fadeOut")
        game.hidden = true;
        winpanel.hidden = false
        param.nbTry = 0
    }

    const backButtonWin = document.getElementsByClassName("back")[0]
    backButtonWin.onclick = () => {
        backMenu(winpanel)
    }

    retryButton = document.getElementsByClassName("retry")[0]
    retryButton.onclick = () => {
        retry()
    }
    function backMenu(state) {
        state.classList.add("fadeOut")
        state.hidden = true
        menu.classList.add('fadeIn')
        menu.hidden = false
    }

    function retry() {
        winpanel.classList.add('fadeOut')
        winpanel.hidden = true
        randomNb = Math.floor(Math.random() * (param.max - param.min) + param.min);

        game.classList.add("fadeIn")
        game.hidden = false
    }
}


