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
    canvas.width = window.innerWidth * 0.5;
    draw();
}

setInterval(() => {draw()}, 100)
resize()
window.addEventListener('resize', resize);

rad = 10;

// rawLinks = [
//     [['demilitarize', 1], ['seed', 1]],
//     [['demilitarize', 11], ['seed', 2]],
// ]
rawLinks = [
// a
    [['xmgrand', 4], ['xaceousfuel', 1]], 
    [['xlackjack', 2], ['xalogen', 1]], 
    [['xlackjack',6], ['xrganized', 3]], 
    [['xutral', 4], ['xisherman', 7]], 
    [['xanji', 1], ['xquare', 3]], 
    [['xampire', 1], ['xuseway', 5]], 
    [['xghtshade', 6], ['xstival', 5]], 
// b
    [['xoble', 2], ['xumbers', 3]], 
// c
    [['xlackjack', 3], ['xmerick', 5]], 
    [['xlackjack', 7], ['xaceousfuel', 2]], 
    [['xstercity', 5], ['xchemist', 1]], 
    [['xchivist', 1], ['xeriodic', 7]], 
    [['xucifix', 2], ['xientific', 8]], 
    [['xemonic', 6], ['xcket', 1]], 
// d
    [['xmgrand', 6], ['xrganized', 8]], 
    [['xghtshade', 7], ['xeriodic', 5]], 
// e
    [['xghtshade', 8], ['xumbers', 4]], 
    [['xsiness', 4], ['xemonic', 1]], 
    [['xuseway', 3], ['xampire', 6]], 
    [['xcket', 3], ['xientific', 2]], 
    [['xstercity', 3], ['xique', 4]], 
    [['xchemist', 3], ['xquare', 5]], 
    [['xisherman', 4], ['xeriodic', 1]], 
    [['xoble', 4], ['xaceousfuel', 3]], 
    [['xnzene', 5], ['xaceousfuel', 9]], 
    [['xalogen', 5], ['xnzene', 3]], 
    [['xrganized', 7], ['xmerick', 2]], 
// f
    [['xaceousfuel', 7], ['xientific', 6]], 
    [['xientific', 6], ['xucifix', 4]], 
    [['xaceousfuel', 7], ['xucifix', 4]], 
// g
    [['xrganized', 2], ['xalogen', 4]], 
    [['xghtshade', 1], ['xmgrand', 2]], 
// h
    [['xchemist', 2], ['xghtshade', 2]],
    [['xghtshade', 2], ['xghtshade', 5]],
    [['xghtshade', 5], ['xchemist', 2]], 
    [['xchivist', 2], ['xisherman', 3]], 
// i
    [['xmerick', 4], ['xlix', 2]], 
    [['xisherman', 1], ['xrganized', 5]], 
    [['xchivist', 3], ['xeriodic', 3]], 
    [['xeriodic', 6], ['xchemist', 5]], 
    [['xique', 1], ['xstercity', 6]], 
    [['xientific', 1], ['xchivist', 5]], 
    [['xanji', 4], ['xientific', 5]], 
    [['xucifix', 3], ['xientific', 7]],
    [['xucifix', 5], ['xsiness', 2]],  
    [['xstival', 3], ['xampire', 4]], 
    [['xlprit', 4], ['xemonic', 5]], 
// j
    [['xlackjack', 5], ['xanji', 3]], 
// k
    [['xlackjack', 4], ['xmerick', 6]], 
    [['xcket', 2], ['xlackjack', 8]], 
// l
    [['xstival', 6], ['xlprit', 1]], 
    [['xoble', 3], ['xlix', 1]], 
    [['xalogen', 2], ['xaceousfuel', 10]], 
    [['xutral', 5], ['xlackjack', 1]], 
// m
    [['xumbers', 2], ['xmerick', 1]], 
    [['xemonic', 2], ['xampire', 2]], 
    [['xmgrand', 1], ['xisherman', 6]], 
    [['xmgrand', 1], ['xchemist', 4]], 
    [['xisherman', 6], ['xchemist', 4]], 
// n
    [['xnzene', 1], ['xalogen', 6]], 
    [['xrganized', 4], ['xnzene', 4]], 
    [['xmgrand', 5], ['xisherman', 8]], 
    [['xientific', 3], ['xanji', 2]], 
    [['xsiness', 3], ['xemonic', 4]], 
// o
    [['xeriodic', 4], ['xemonic', 3]], 
    [['xrrow', 3], ['xaceousfuel', 4]], 
    [['xoble', 1], ['xalogen', 3]], 
// p 
    [['xampire', 3], ['xlprit', 2]], 
// q
    [['xquare', 1], ['xique', 2]], 
// r
    [['xstercity', 4], ['xrrow', 1]], 
    [['xrrow', 1], ['xrrow', 2]], 
    [['xstercity', 4], ['xrrow', 2]], 
    [['xisherman', 5], ['xmerick', 3]], 
    [['xutral', 3], ['xrganized', 1]], 
    [['xeriodic', 2], ['xmgrand', 3]], 
    [['xampire', 5], ['xquare', 4]], 
    [['xumbers', 5], ['xlprit', 3]], 

// s
    [['xisherman', 2], ['xaceousfuel', 6]], 
    [['xstercity', 1], ['xchemist', 6]], 
    [['xuseway', 2], ['xchivist', 6]], 
    [['xsiness', 1], ['xstival', 1]], 
    [['xsiness', 5], ['xghtshade', 4]], 
    [['xsiness', 6], ['xumbers', 6]], 
// t
    [['xlprit', 5], ['xstival', 2]], 
    [['xcket', 4], ['xghtshade', 3]], 
    [['xutral', 2], ['xientific', 4]], 
    [['xstercity', 2], ['xchemist', 7]], 
    [['xstercity', 7], ['xchivist', 7]], 
// u
    [['xutral', 1], ['xaceousfuel', 5]],  
    [['xucifix', 1], ['xumbers', 1]], 
    [['xquare', 2], ['xaceousfuel', 8]], 
    [['xuseway', 1], ['xique', 3]], 
// v
    [['xchivist', 4], ['xstival', 4]], 
// w
    [['xrrow', 4], ['xuseway', 4]], 
// x
    [['xlix', 3], ['xucifix', 6]], 
// y
    [['xstercity', 8], ['xuseway', 6]],
// z
    [['xnzene', 2], ['xrganized', 6]],
]




// rawWords = [
//     {'x': 0.0, 'y': 150.0, 'ans': 'demilitarize', 'clue': 'Remove forces from Zaire, limited badly.'}, 
//     {'x': 0.0, 'y': 0.0, 'ans': 'seed', 'clue': 'View world\'s conclusion and origin'},
//     {'x':0.0, 'y': 300.0, 'ans': 'carbon', 'clue': 'Rock'}, 
//     ]

rawWords = [
{'x': -210.0, 'y': -750.0, 'ans': 'xalogen', 'clue': '1'},
{'x': 0.0, 'y': -700.0, 'ans': 'xlix', 'clue': '2'},
{'x': 210.0, 'y': -650.0, 'ans': 'xmerick', 'clue': '3'},
{'x': -210.0, 'y': -600.0, 'ans': 'xnzene', 'clue': '4'},
{'x': 0.0, 'y': -550.0, 'ans': 'xlackjack', 'clue': '5'},
{'x': 210.0, 'y': -500.0, 'ans': 'xaceousfuel', 'clue': '6'},
{'x': -210.0, 'y': -450.0, 'ans': 'xoble', 'clue': '7'},
{'x': 0.0, 'y': -400.0, 'ans': 'xrganized', 'clue': '8'},
{'x': 210.0, 'y': -350.0, 'ans': 'xisherman', 'clue': '9'},
{'x': -210.0, 'y': -300.0, 'ans': 'xutral', 'clue': '10'},
{'x': 0.0, 'y': -250.0, 'ans': 'xrrow', 'clue': '11'},
{'x': 210.0, 'y': -200.0, 'ans': 'xmgrand', 'clue': '12'},
{'x': -210.0, 'y': -150.0, 'ans': 'xchemist', 'clue': '13'},
{'x': 0.0, 'y': -100.0, 'ans': 'xstercity', 'clue': '14'},
{'x': 210.0, 'y': -50.0, 'ans': 'xeriodic', 'clue': '15'},
{'x': -210.0, 'y': 0.0, 'ans': 'xquare', 'clue': '16'},
{'x': 0.0, 'y': 50.0, 'ans': 'xique', 'clue': '17'},
{'x': 210.0, 'y': 100.0, 'ans': 'xchivist', 'clue': '18'},
{'x': -210.0, 'y': 150.0, 'ans': 'xanji', 'clue': '19'},
{'x': 0.0, 'y': 200.0, 'ans': 'xuseway', 'clue': '20'},
{'x': 210.0, 'y': 250.0, 'ans': 'xientific', 'clue': '21'},
{'x': -210.0, 'y': 300.0, 'ans': 'xcket', 'clue': '22'},
{'x': 0.0, 'y': 350.0, 'ans': 'xampire', 'clue': '23'},
{'x': 210.0, 'y': 400.0, 'ans': 'xucifix', 'clue': '24'},
{'x': -210.0, 'y': 450.0, 'ans': 'xemonic', 'clue': '25'},
{'x': 0.0, 'y': 500.0, 'ans': 'xstival', 'clue': '26'},
{'x': 210.0, 'y': 550.0, 'ans': 'xsiness', 'clue': '27'},
{'x': -210.0, 'y': 600.0, 'ans': 'xghtshade', 'clue': '28'},
{'x': 0.0, 'y': 650.0, 'ans': 'xlprit', 'clue': '29'},
{'x': 210.0, 'y': 700.0, 'ans': 'xumbers', 'clue': '30'},
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
          ctx.fillText(word.n, camzoom *camerazoom *(letter.x-rad/4+camera[0]-6), camzoom *camerazoom * (letter.y+rad/4+camera[1]-6))

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
      alert('(11 4)')
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

camerazoom = 0.7;
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
