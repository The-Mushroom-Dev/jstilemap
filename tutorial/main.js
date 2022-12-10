const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
canvas.width = innerWidth - 1
canvas.height = innerHeight - 1

class Tile{
    constructor(x,y){
        this.size = 64
        this.position = {
            x:x * this.size,
            y:y * this.size
        }
    }
    draw(){
        ctx.fillStyle = 'red'
        ctx.fillRect(this.position.x,this.position.y,this.size,this.size)
    }
}

var tiles = []

LevelReader()
function update(){
    requestAnimationFrame(update)
    ctx.clearRect(0,0,canvas.width,canvas.height)
    ctx.fillStyle = 'lightgreen'
    ctx.fillRect(0,0,canvas.width,canvas.height)

    tiles.forEach(tile =>{
        tile.draw()
    })

}
update()

function LevelReader(){
    var rawFile = new XMLHttpRequest()
    var x = 0
    var y = 0
    var map

    rawFile.open("GET","sample.ctx",false)
    rawFile.onreadystatechange = function(){
        if(rawFile.readyState === 4)
            if(rawFile.status === 200 || rawFile.status == 0)
                map = rawFile.responseText
    }
    rawFile.send(null)

    for(var i = 0; i <= map.length; i++){
        if(map[i] == '\n'){
             y += 1
             x = 0
        }
        if(map[i] == ',') x += 1
        if(map[i] == '0') tiles.push(new Tile(x,y))
    }

}
