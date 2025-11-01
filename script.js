canvas = document.getElementById ('gameCanvas' );
button = document.getElementById ('ret' );
div = document.getElementById ('main' );

ctx = canvas.getContext ('2d' );

distance = (a, b, c, d) => {return Math.sqrt((a-c)*(a-c) + (b-d)*(b-d))};

function maindraw(checkfinal){
    ctx.strokeStyle = "#111111";
    ctx.fillStyle = "#eeeeee";
    ctx.fillRect(0,0,4000,4000)
}

mapcamerazoom = 0.8;
mapcamera = [-68,-445]
mapmousedown = false;
firstvisit = true;
current = "";

draw = maindraw;




function resize(){
    canvas.height = window.innerHeight * 0.9;
    canvas.width = window.innerWidth * 0.9;
    draw();
}

setInterval(() => {draw()}, 100)
resize()
window.addEventListener('resize', resize);

rad = 10;

rawLinks = [
    [['demilitarize', 1], ['seed', 1]],
    [['demilitarize', 11], ['seed', 2]],


]



rawWords = [
    {'x': 0.0, 'y': 150.0, 'ans': 'demilitarize', 'clue': 'Remove forces from Zaire, limited badly.'}, 
    {'x': 0.0, 'y': 0.0, 'ans': 'seed', 'clue': 'View world\'s conclusion and origin'},
    {'x':0.0, 'y': 300.0, 'ans': 'carbon', 'clue': 'Rock'}, 
    ]
let refs = {};

let words = [];

for (let i of rawWords) {
  refs[i.ans] = {};
  let word = [];
  word.clue = i.clue;
  word.n = rawWords.indexOf(i)+1;
  for (let j = 0; j < i.ans.length; j++) {
    if (i.ans[j] === ' ') {
      continue;
    }
    let o = {};
    refs[i.ans][j] = o;
    o.w = word;
    o.a = i.ans[j];
    o.x = i.x + j * (rad+1) * 2;
    o.y = i.y;
    o.ps = [];
    (j == 0) ? o.f = 1 : o.f = 0;
    o.n = rawWords.indexOf(i)
    word.push(o);
  }
  words.push(word);
}

for (let i of words) {
  for (let j = 0; j < i.length; j++) {
    i[j].prev = (j === 0) ? i[j] : i[j - 1];
    i[j].next = (j === i.length - 1) ? i[j] : i[j + 1];
  }
}

for (let link of rawLinks) {
    console.log(link);
  refs[link[0][0]][link[0][1]].ps.push(refs[link[1][0]][link[1][1]]);
  refs[link[1][0]][link[1][1]].ps.push(refs[link[0][0]][link[0][1]]);
}



distance = (a, b, c, d) => {return Math.sqrt((a-c)*(a-c) + (b-d)*(b-d))};

draw = maindraw;
resize();

selected = {};


draw = () => {
    camzoom = Math.min(canvas.height/1200, canvas.width / 1200);

    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0,0,canvas.width,canvas.height)


    words.forEach(word => { word.forEach(letter => {
        ctx.strokeStyle = "#ffffff";
        if (letter == selected || letter.ps.includes(selected)) {
            ctx.strokeStyle = "#bbbbff"
        } else if (letter.w == selected.w || letter.ps.map(i => i.w).includes(selected.w)) {
            ctx.strokeStyle = "#f4f4ff"
        }
        else return;
     
        for (let i of letter.ps) {
          ctx.beginPath();
          ctx.moveTo(camzoom * camerazoom * (letter.x+camera[0]), camzoom *camerazoom * (letter.y+camera[1])); 
          ctx.lineTo(camzoom *camerazoom * (i.x+camera[0]), camzoom *camerazoom * (i.y+camera[1])); 
          ctx.stroke();
        }
    })})

    words.forEach(word => { word.forEach(letter => {
       
      
        ctx.strokeStyle = "#00ff00"
        ctx.fillStyle = "#dde8eb"
        if(word == selected.w){
            ctx.strokeStyle = "#008800"
            ctx.fillStyle = "#b3bbbd"
        }
        if(selected.ps && selected.ps.includes(letter)){
            ctx.strokeStyle = "#ff8888"
        }
        if(letter == selected){
            ctx.strokeStyle = "#ff0000"
        }
    
        ctx.beginPath();
        ctx.font = "bold " + camzoom *camerazoom * 15 + "px monospace"
        if (letter.f == 1){
            ctx.fillRect(camzoom *camerazoom * (letter.x+camera[0]-(rad + 1)), camzoom *camerazoom * (letter.y+camera[1]-(rad + 1)),camzoom *camerazoom * 2*(rad+1),camzoom *camerazoom * 2*(rad+1))
            ctx.rect(camzoom *camerazoom * (letter.x+camera[0]-(rad + 1)), camzoom *camerazoom * (letter.y+camera[1]-(rad + 1)),camzoom *camerazoom * 2*(rad+1),camzoom *camerazoom * 2*(rad+1))
            // ctx.fillText("1", camzoom *camerazoom *(letter.x-rad/4+camera[0]-1.5), camzoom *camerazoom * (letter.y+rad/4+camera[1]+1))
        } else {
            ctx.arc(camzoom *camerazoom * (letter.x+camera[0]), camzoom *camerazoom * (letter.y+camera[1]), camzoom *camerazoom * (rad + 1), 0, 2 * Math.PI);
        }
        ctx.lineWidth = camzoom *camerazoom * 2;
         
        ctx.stroke();

        if(letter.l){
            ctx.font = "bold " + camzoom *camerazoom * 15 + "px monospace";
            ctx.fillStyle = "#333333"
            ctx.fillText(letter.l, camzoom *camerazoom *(letter.x-rad/4+camera[0]-1.5), camzoom *camerazoom * (letter.y+rad/4+camera[1]+1))
        }
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0,0, canvas.width, 50)
        ctx.fillStyle = "#115511";
        ctx.fillRect(0, 47, canvas.width , 3)
        ctx.fillStyle = "#115511";
        ctx.font = "bold 20px monospace";
        if(selected.w) {
            ctx.fillText(selected.w.clue, 10, 30)
        }
        if(letter.f == 1){
          ctx.font = "bold " + camzoom *camerazoom * 10 + "px monospace"
          ctx.fillStyle = "#333333"
          // ctx.fillText(word.n, camzoom *camerazoom *(letter.x-rad/4+camera[0]-6), camzoom *camerazoom * (letter.y+rad/4+camera[1]-6))
          ctx.fillText(word.n*10, camzoom *camerazoom *(letter.x-rad/4+camera[0]-6), camzoom *camerazoom * (letter.y+rad/4+camera[1]-6))

        }


       
    })});

// Win condition
    checkwin();

}

alerted = false;

function checkwin(){
    won = true;
    words.forEach(word => {
        word.forEach(letter => {
            if((!letter.l || letter.l != letter.a)&& letter.f == 0) won = false;
        })
    })
    if(won && !alerted) {
      alert('complete!')
      alerted = true;
    }
}


// On click, find the closest thing to the cursor, and select that
canvas.onclick = e=>{
    clickx = (e.offsetX / camerazoom/camzoom) - camera[0];
    clicky = (e.offsetY / camerazoom/camzoom) - camera[1];

    closest = {x:-1, y:-1}
  words.forEach(word => { word.forEach(letter => {
    if((closest.x == -1 || distance(clickx, clicky, letter.x, letter.y) < distance(clickx, clicky, closest.x, closest.y)) && letter.f == 0){
        closest = letter
    }
  })})
  selected = closest;

  draw();
}

// typing stuff from here until drawing stuff

// When key is pressed, put that letter in the selected circle, and all those connected
function type(key){
    if (!selected.w) {
      return;
    }
    selected.l = key;
    for (let i of selected.ps) {
      i.l = key;
    }
    selected = selected.next;
    draw();
}
// same for deleting letters
oldSelected = []

function untype(){
  if (!selected.w) {
    return;
  }
    if(selected.l){
        selected.l = undefined;
        for (let i of selected.ps) {
          i.l = undefined;
        }
        oldSelected = selected;
        selected = selected.prev;
        if(selected.f == 1){
            selected = oldSelected
        }
    }
    else{
        oldSelected = selected;
        selected = selected.prev;
        if(selected.f == 1){
            selected = oldSelected
        }
        selected.l = undefined;
        for (let i of selected.ps) {
          i.l = undefined;
        }
    }
    draw();
    
}

window.onkeydown = e => {
    if(e.key.length == 1 && e.key >= 'a' && e.key <= 'z') {
        type(e.key)
    }
    if(e.key.length == 1 &&e.key >= 'A' && e.key <= 'Z') {
        type(e.key.toLowerCase())
    }
    if(e.key == "Backspace"){
        untype();
    }
    if(e.key == "ArrowLeft"){
        oldSelected = selected;
        selected = selected.prev;
        if(selected.f == 1){
            selected = oldSelected
        }
        draw();

    }
    if(e.key == "ArrowRight"){
        selected = selected.next;
        draw();

    }
}

// Drawing stuff from here down

camerazoom = 0.3;
camzoom = Math.min(canvas.height / 1200, canvas.width / 1200);
camera = [canvas.width / 2 / camerazoom/camzoom, (canvas.height / 2 + 25) / camerazoom/camzoom];

mousedown = false;

canvas.onwheel = e => {
        e.preventDefault();
        console.log(e);
        zoomx = (e.offsetX / camerazoom/camzoom) - camera[0];
        zoomy = (e.offsetY / camerazoom/camzoom) - camera[1];
        oldzoom = camerazoom;
    if(e.deltaY > 0){
        camerazoom -= .1;
    }else{
        camerazoom += .1;
    }
    if(camerazoom < .2){
        camerazoom = .2;
    }
    if(camerazoom > 5){
        camerazoom = 5;
    }
    camera[0] += (e.offsetX / camerazoom/camzoom) - (e.offsetX / oldzoom/camzoom);
    camera[1] += (e.offsetY / camerazoom/camzoom) - (e.offsetY / oldzoom/camzoom);
    console.log(zoomx, zoomy, oldzoom, (e.offsetX / camerazoom/camzoom) - camera[0], (e.offsetY / camerazoom/camzoom) - camera[1]);
        draw();

}

canvas.onmousemove = e => {

    if(mousedown){
        camera[0] += (e.offsetX/camzoom - mousedown[0])/camerazoom;
        camera[1] += (e.offsetY/camzoom - mousedown[1])/camerazoom;
        mousedown = [e.offsetX/camzoom, e.offsetY/camzoom]


    }
    draw();
}

canvas.onmousedown = e => {
    mousedown = [e.offsetX/camzoom , e.offsetY/camzoom ];}

window.onmouseup = e => {
    mousedown = false;
}
