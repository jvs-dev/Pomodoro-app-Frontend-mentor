const headerButtons = document.querySelectorAll(".header__button")
const activeBackground = document.getElementById("activeBackground")
const timeText = document.getElementById("timeText")
const timeButton = document.getElementById("timeButton")
const pomodoroBtn = document.getElementById("pomodoroBtn")
const shortBreakBtn = document.getElementById("shortBreakBtn")
const longBreakBtn = document.getElementById("longBreakBtn")
let mainElipse = document.querySelector(".main__elipse")
let pomodoroTime = 20.00
let shortBreak = 5.00
let longBreak = 15.00
let rotateAnimation = 0
let timeUsed = pomodoroTime
let interval

headerButtons.forEach(element => {
    element.onclick = () => {
        timeButton.classList.remove("active")
        timeButton.textContent = "PLAY"
        clearInterval(interval)
        headerButtons.forEach(btn => btn.classList.remove("active"))
        element.classList.add("active")
        headerButtons.forEach(btn => {
            if (btn.classList.contains("active")) {
                activeBackground.style.left = btn.offsetLeft + "px"
                activeBackground.style.width = btn.offsetWidth + "px"
            }
        })
    }
});

shortBreakBtn.addEventListener("click", () => {
    timeUsed = shortBreak
    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
})

longBreakBtn.addEventListener("click", () => {
    timeUsed = longBreak
    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
})

pomodoroBtn.addEventListener("click", () => {
    timeUsed = pomodoroTime
    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
})

timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`

timeButton.onclick = () => {
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
    if (timeButton.classList.contains("active")) {
        timeButton.classList.remove("active")
        timeButton.textContent = "PLAY"
        clearInterval(interval)
    } else {
        timeButton.classList.add("active")
        timeButton.textContent = "PAUSE"
        interval = setInterval(() => {
            if (timeUsed > 0) {
                timeUsed -= 0.01
                timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
                if (`${timeUsed.toFixed(2)}`.includes('.99') == true) {
                    timeUsed = timeUsed - 0.40
                    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
                }
                rotateAnimation += 360
                mainElipse.style.rotate = `${rotateAnimation}deg`
            } else {
                clearInterval(interval)
                timeButton.classList.remove("active")
                timeButton.textContent = "PLAY"
                alert("Time's up!")
                timeUsed = 20.00
                timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
            }
        }, 1000)
    }
}