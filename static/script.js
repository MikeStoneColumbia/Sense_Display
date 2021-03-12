color_table = {
    'R': '255,0,0',
    'G': '0,255,0',
    'B': '0,0,255',
    'E': '0,0,0',
    'W': '255,255,255',
    'C': '0,255,255',
    'Y': '255,255,0',
    'O': '255,128,0',
    'P': '255,128,128',
    'PU': '128,0,128',
    'DP': '255,0,128',
    'LG': '128,255,128',
}


function initalConfig() {

    color_boxes = document.getElementsByClassName('colorChoices')

    for (var i = 0; i < color_boxes.length; i++) {
        box = color_boxes[i]
        box.style.background = 'rgb(' + color_table[box.innerHTML] + ')'
    }

    display = document.getElementsByClassName('display')
    for (var i = 0; i < display.length; i++) {
        display[i].children[0].value = 'E'
    }

    updateView('home')

}



function send() {
    display = document.getElementsByClassName('display')
    vals = ""
    for (var i = 0; i < display.length; i++) {
        color = color_table[display[i].children[0].value]
        if (color == undefined) {
            color = '0,0,0'
        }
        vals += color + '%'
    }

    vals = vals.slice(0, -1)
    data = JSON.stringify(vals)
    const Http = new XMLHttpRequest();
    const url = "https://d155d96c7744.ngrok.io/newDesign"
    Http.open('POST', url)
    Http.setRequestHeader("Content-Type", "application/json")
    Http.responseType = 'text'
    console.log(data)
    Http.send(data)

    Http.onload = function() {
        if (Http.readyState == Http.DONE) {
            if (Http.status == 200) {
                res = JSON.parse(Http.response)
                if (res['response'] == 'success') {
                    alert('Image loaded on Pi!')
                }
            }
        }
    }

}

function updateView(event) {

    if (event != 'home')
        if (!(event.keyCode === 13))
            return

    display = document.getElementsByClassName('display')
    vals = []
    for (var i = 0; i < display.length; i++) {
        color = color_table[display[i].children[0].value]
        console.log(color)
        if (color == undefined) {
            color = '0,0,0'
        }
        display[i].style.background = 'rgb(' + color + ')'
    }
}