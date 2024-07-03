/*
@title: Kahoot
@author: Yeah Jack
@tags: [quiz, kahoot, education]
@addedOn: 2024-07-03
*/

const player = "p"
const choice1 = "1"
const choice2 = "2"
const choice3 = "3"
const choice4 = "4"

setLegend(
  [player, bitmap`
................
......0000......
.....000000.....
....00000000....
....00000000....
....00000000....
....00000000....
.....000000.....
......0000......
......0000......
......0000......
.....000000.....
....00000000....
...0000000000...
..000000000000..
.00000000000000.`],
  [choice1, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777`],
  [choice2, bitmap`
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000
0000000000000000`],
  [choice3, bitmap`
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666
6666666666666666`],
  [choice4, bitmap`
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999
9999999999999999`]
)

const bgMusic = tune`
500: E4-500 + G4-500,
500: D4-500 + F4-500,
500: C4-500 + E4-500,
500: D4-500 + F4-500,
14000`
const playback = playTune(bgMusic, Infinity)

const questions = [{
    question: "Capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2
  },
  {
    question: "Red Planet?",
    answers: ["Mars", "Venus", "Jupiter", "Saturn"],
    correct: 0
  },
  {
    question: "7 x 8?",
    answers: ["54", "56", "62", "64"],
    correct: 1
  }
]

let currentQuestion = 0
let gameState = "question"

const level = map`
.........
....p....
.........
.1.2.3.4.
.........`

setMap(level)

onInput("w", () => {
  getFirst(player).y -= 1
})

onInput("s", () => {
  getFirst(player).y += 1
})

onInput("a", () => {
  getFirst(player).x -= 1
})

onInput("d", () => {
  getFirst(player).x += 1
})

function checkAnswer(choiceIndex) {
  if (gameState === "question") {
    gameState = "answer"
    if (choiceIndex === questions[currentQuestion].correct) {
      addText("Correct!", { y: 7, color: color`4` })
    } else {
      addText("Wrong!", { y: 7, color: color`3` })
    }
    setTimeout(() => {
      nextQuestion()
    }, 2000)
  }
}

afterInput(() => {
  const playerTile = getTile(getFirst(player).x, getFirst(player).y)
  if (playerTile.some(sprite => sprite.type === choice1)) checkAnswer(0)
  else if (playerTile.some(sprite => sprite.type === choice2)) checkAnswer(1)
  else if (playerTile.some(sprite => sprite.type === choice3)) checkAnswer(2)
  else if (playerTile.some(sprite => sprite.type === choice4)) checkAnswer(3)
})

function displayQuestion() {
  clearText()
  addText(questions[currentQuestion].question, { y: 1, color: color`6` })
  for (let i = 0; i < 4; i++) {
    addText(questions[currentQuestion].answers[i], { x: i * 4, y: 12, color: color`0` })
  }
}

function nextQuestion() {
  currentQuestion++
  if (currentQuestion < questions.length) {
    gameState = "question"
    displayQuestion()
  } else {
    endGame()
  }
}

function endGame() {
  gameState = "end"
  clearText()
  addText(`Game Over!`, { y: 7, color: color`3` })
}

displayQuestion()
setInterval(1000)