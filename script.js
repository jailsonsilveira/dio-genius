let order = [];
let clickedOrder = [];
let score = 0;

const colors = [
    {
        index: 0,
        color: "green",
        element: document.querySelector(".green")
    },
    {
        index: 1,
        color: "red",
        element: document.querySelector(".red"),
    },
    {
        index: 2,
        color: "yellow",
        element: document.querySelector(".yellow")
    },
    {
        index: 3,
        color: "blue",
        element: document.querySelector(".blue")
    }
]

colors.forEach(color => {
    color.element.onclick = () => click(color.index)
})

let shuffleOrder = () => {
    let colorOrder = Math.floor(Math.random() * 4);
    order[order.length] = colorOrder;
    clickedOrder = [];

    for (let i in order) {
        let elementColor = colors[getColorElement(order[i])].element
        lightColor(elementColor, Number(i) + 1)
    }
}

let lightColor = (element, number) => {
    number = number * 500;
    setTimeout(() => {
        element.classList.add("selected");
    }, number - 250)

    setTimeout(() => {
        element.classList.remove("selected");
    }, number)
}


let checkOrder = () => {
    for (let i in clickedOrder) {
        if (clickedOrder[i] != order[i]) {
            gameOver();
            break;
        }
    }
    if (clickedOrder.length == order.length) {
        nextLevel();
    }
}

let click = (color) => {
    clickedOrder[clickedOrder.length] = color
    colors[getColorElement(color)].element.classList.add("selected")

    setTimeout(() => {
        colors[getColorElement(color)].element.classList.remove("selected")
        checkOrder();
    }, 250)    
}


let getColorElement = (index) => {
    return colors.findIndex(color => color.index == index)
}

let nextLevel = () => {
    score++;
    shuffleOrder()
}

let gameOver = () => {
    if(confirm(`Pontuação: ${score}\nVocê perdeu o jogo!\mClique em ok para iniciar um novo jovo`)){
        order = [];
        clickedOrder = [];
        setTimeout(playGame(), 1000);    
    }
}

let playGame = () => {
    score = 0;
    nextLevel();
}


playGame();
