const headerButtons = document.querySelectorAll(".header__button")
const activeBackground = document.getElementById("activeBackground")
const timeText = document.getElementById("timeText")
const timeButton = document.getElementById("timeButton")
const pomodoroBtn = document.getElementById("pomodoroBtn")
const shortBreakBtn = document.getElementById("shortBreakBtn")
const longBreakBtn = document.getElementById("longBreakBtn")
const settingsSetColors = document.querySelectorAll(".settingsSetColor")
const settingsSetFonts = document.querySelectorAll(".settingsSetFont")
const settingsWindow = document.getElementById("settingsWindow")
const saveButton = document.getElementById("saveButton")
let pomodoroSetTime = document.getElementById("pomodoroSetTime")
let shortbreakSetTime = document.getElementById("shortbreakSetTime")
let longBreakSetTime = document.getElementById("longBreakSetTime")
const body = document.querySelector("body")
let mainElipse = document.querySelector(".main__elipse")
let pomodoroTime = 20.00
let shortBreak = 5.00
let longBreak = 15.00
let rotateAnimation = 0
let timeUsed = pomodoroTime
let lastTime = pomodoroTime
let interval
const colors = ["#FA7070", "#6FF3F8", "#D981F9"]
const fonts = [`'Poppins', sans-serif`, `'PT Serif', serif`, `'Roboto Slab', serif`]

window.addEventListener("load", () => {
    activeBackground.style.left = pomodoroBtn.offsetLeft + "px"
    activeBackground.style.width = pomodoroBtn.offsetWidth + "px"
})

window.addEventListener("resize", () => {
    activeBackground.style.left = pomodoroBtn.offsetLeft + "px"
    activeBackground.style.width = pomodoroBtn.offsetWidth + "px"
})

document.getElementById("settingsButton").onclick = () => {
    pomodoroSetTime.value = pomodoroTime
    shortbreakSetTime.value = shortBreak
    longBreakSetTime.value = longBreak
    settingsWindow.classList.add("active")
}

document.getElementById("closeSettings").onclick = () => {
    settingsWindow.classList.remove("active")
}

settingsSetFonts.forEach((element, index) => {
    element.onclick = () => {
        settingsSetFonts.forEach(btn => {
            btn.classList.remove("active")
        })
        element.classList.add("active")
        document.documentElement.style.setProperty('--main-font', `${fonts[index]}`);
    }
});

settingsSetColors.forEach((element, index) => {
    element.onclick = () => {
        settingsSetColors.forEach(btn => {
            btn.classList.remove("active")
            btn.innerHTML = ``
        })
        element.classList.add("active")
        element.innerHTML = `<ion-icon name="checkmark-outline"></ion-icon>`
        document.documentElement.style.setProperty('--primary-color', `${colors[index]}`);
    }
});

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
    lastTime = shortBreak
    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
})

longBreakBtn.addEventListener("click", () => {
    timeUsed = longBreak
    lastTime = longBreak
    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
})

pomodoroBtn.addEventListener("click", () => {
    timeUsed = pomodoroTime
    lastTime = pomodoroTime
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
                mainElipse.style.transform = `rotate(${rotateAnimation}deg)`
            } else {
                clearInterval(interval)
                timeButton.classList.remove("active")
                timeButton.textContent = "PLAY"
                alert("Time's up!")
                timeUsed = lastTime
                timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
            }
        }, 1000)
    }
}

saveButton.onclick = () => {
    pomodoroTime = Number(pomodoroSetTime.value)
    shortBreak = Number(shortbreakSetTime.value)
    longBreak = Number(longBreakSetTime.value)
    timeUsed = pomodoroTime
    timeText.textContent = `${timeUsed.toFixed(2).replace('.', ':')}`
    settingsWindow.classList.remove("active")
    timeText.style.transform = "scale(1.1)"
    setTimeout(() => {
        timeText.style.transform = "scale(1)"
    }, 100);
}