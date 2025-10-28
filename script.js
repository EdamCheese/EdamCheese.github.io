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
    [['ai apocalypse', 0], ['cloudy with a chance of meatballs', 12]], 
    [['ai apocalypse', 1], ['wario and waluigi get divorced', 14]], 
    [['ai apocalypse', 3], ['settlers of catan', 13]], 
    [['ai apocalypse', 4], ['pathfinder', 0]], 
    [['ai apocalypse', 5], ['the bronx zoo', 11]], 
    [['ai apocalypse', 6], ['nickelback', 2]], 
    [['ai apocalypse', 7], ['wario and waluigi get divorced', 1]], 
    [['ai apocalypse', 8], ['nickelback', 5]], 
    [['ai apocalypse', 9], ['cloudy with a chance of meatballs', 5]], 
    [['ai apocalypse', 10], ['portal', 0]], 
    [['ai apocalypse', 11], ['osmosis jones', 12]], 
    [['ai apocalypse', 12], ['charlie and the chocolate factory', 14]],
    [['blockbuster', 0], ['flubber', 3]],
    [['blockbuster', 1], ['flubber', 1]],
    [['blockbuster', 2], ['osmosis jones', 3]],
    [['blockbuster', 3], ['nickelback', 8]],
    [['blockbuster', 4], ['nickelback', 3]],
    [['blockbuster', 5], ['the bronx zoo', 4]],
    [['blockbuster', 6], ['uhf', 0]],
    [['blockbuster', 7], ['osmosis jones', 6]],
    [['blockbuster', 8], ['portal', 3]],
    [['blockbuster', 9], ['pathfinder', 8]],
    [['blockbuster', 10], ['charlie and the chocolate factory', 3]],
    [['flubber', 0], ['back to the future', 12]],
    [['flubber', 2], ['cloudy with a chance of meatballs', 3]],
    [['flubber', 4], ['nickelback', 6]],
    [['flubber', 5], ['charlie and the chocolate factory', 24]],
    [['flubber', 6], ['alices restaurant', 7]],
    [['nickelback', 0], ['the bronx zoo', 7]],
    [['nickelback', 1], ['osmosis jones', 5]],
    [['nickelback', 4], ['alices restaurant', 4]],
    [['nickelback', 7], ['charlie and the chocolate factory', 27]],
    [['nickelback', 9], ['back to the future', 3]],
    [['the bronx zoo', 0], ['alices restaurant', 10]],
    [['the bronx zoo', 1], ['uhf', 1]],
    [['the bronx zoo', 2], ['roller coaster tycoon', 12]],
    [['the bronx zoo', 5], ['wario and waluigi get divorced', 2]],
    [['the bronx zoo', 6], ['portal', 1]],
    [['the bronx zoo', 8], ['space exploration', 7]],
    [['the bronx zoo', 10], ['ponzi scheme', 3]],
    [['the bronx zoo', 12], ['osmosis jones', 0]],
    [['osmosis jones', 1], ['settlers of catan', 0]],
    [['osmosis jones', 2], ['ponzi scheme', 10]],
    [['osmosis jones', 4], ['alices restaurant', 5]],
    [['osmosis jones', 9], ['space exploration', 15]],
    [['osmosis jones', 10], ['alices restaurant', 15]],
    [['osmosis jones', 10], ['space exploration', 16]],
    [['alices restaurant', 15], ['space exploration', 16]],
    [['osmosis jones', 11], ['charlie and the chocolate factory', 6]],
    [['pathfinder', 1], ['cloudy with a chance of meatballs', 16]],
    [['pathfinder', 2], ['space exploration', 13]],
    [['pathfinder', 3], ['heaven search', 12]],
    [['pathfinder', 4], ['back to the future', 12]],
    [['pathfinder', 5], ['ponzi scheme', 4]],
    [['pathfinder', 6], ['charlie and the chocolate factory', 9]],
    [['pathfinder', 7], ['wario and waluigi get divorced', 22]],
    [['pathfinder', 9], ['alices restaurant', 13]],
    [['pathfinder', 3], ['back to the future', 9]],
    [['back to the future', 9], ['heaven search', 12]],
    [['pathfinder', 4], ['flubber', 0]],
    [['portal', 2], ['charlie and the chocolate factory', 31]],
    [['portal', 4], ['alices restaurant', 11]],
    [['portal', 5], ['cloudy with a chance of meatballs', 26]],
    [['space exploration', 0], ['seance', 0]],
    [['space exploration', 1], ['spy vs spy', 1]],
    [['space exploration', 2], ['charlie and the chocolate factory', 2]],
    [['space exploration', 3], ['alices restaurant', 3]],
    [['space exploration', 4], ['cloudy with a chance of meatballs', 25]],
    [['space exploration', 6], ['back to the future', 10]],
    [['space exploration', 8], ['spy vs spy', 8]],
    [['space exploration', 9], ['cloudy with a chance of meatballs', 1]],
    [['space exploration', 10], ['roller coaster tycoon', 8]],
    [['space exploration', 11], ['wario and waluigi get divorced', 26]],
    [['space exploration', 12], ['wario and waluigi get divorced', 11]],
    [['space exploration', 14], ['dunkin donuts', 4]],
    [['space exploration', 1], ['ponzi scheme', 0]],
    [['spy vs spy', 1], ['ponzi scheme', 0]],
    [['alices restaurant', 0], ['cloudy with a chance of meatballs', 29]],
    [['alices restaurant', 1], ['roller coaster tycoon', 3]],
    [['alices restaurant', 2], ['wario and waluigi get divorced', 16]],
    [['alices restaurant', 8], ['seance', 1]],
    [['alices restaurant', 9], ['settlers of catan', 7]],
    [['alices restaurant', 12], ['tichu', 4]],
    [['alices restaurant', 14], ['back to the future', 1]],
    [['alices restaurant', 16], ['charlie and the chocolate factory', 29]],
    [['men in black', 8], ['roller coaster tycoon', 3]],
    [['alices restaurant', 1], ['men in black', 8]],
    [['back to the future', 13], ['tichu', 4]],
    [['alices restaurant', 12], ['back to the future', 13]],
    [['ponzi scheme', 1], ['cloudy with a chance of meatballs', 21]],
    [['ponzi scheme', 2], ['wario and waluigi get divorced', 7]],
    [['ponzi scheme', 6], ['spy vs spy', 7]],
    [['ponzi scheme', 7], ['back to the future', 2]],
    [['ponzi scheme', 8], ['charlie and the chocolate factory', 17]],
    [['ponzi scheme', 9], ['roller coaster tycoon', 4]],
    [['ponzi scheme', 11], ['settlers of catan', 1]],
    [['uhf', 2], ['settlers of catan', 10]],
    [['wario and waluigi get divorced', 0], ['cloudy with a chance of meatballs', 7]],
    [['wario and waluigi get divorced', 3], ['men in black', 4]],
    [['wario and waluigi get divorced', 4], ['charlie and the chocolate factory', 18]],
    [['wario and waluigi get divorced', 6], ['charlie and the chocolate factory', 8]],
    [['wario and waluigi get divorced', 8], ['cloudy with a chance of meatballs', 4]],
    [['wario and waluigi get divorced', 10], ['cloudy with a chance of meatballs', 7]],
    [['wario and waluigi get divorced', 12], ['charlie and the chocolate factory', 4]],
    [['wario and waluigi get divorced', 13], ['back to the future', 15]],
    [['wario and waluigi get divorced', 15], ['wario and waluigi get divorced', 18]],
    [['wario and waluigi get divorced', 19], ['settlers of catan', 5]],
    [['wario and waluigi get divorced', 20], ['cloudy with a chance of meatballs', 9]],
    [['wario and waluigi get divorced', 23], ['tichu', 1]],
    [['wario and waluigi get divorced', 24], ['spy vs spy', 4]],
    [['wario and waluigi get divorced', 25], ['roller coaster tycoon', 1]],
    [['wario and waluigi get divorced', 27], ['cloudy with a chance of meatballs', 18]],
    [['wario and waluigi get divorced', 28], ['heaven search', 1]],
    [['wario and waluigi get divorced', 29], ['dunkin donuts', 0]],
    [['wario and waluigi get divorced', 0], ['wario and waluigi get divorced', 10]],
    [['back to the future', 14], ['cloudy with a chance of meatballs', 9]],
    [['wario and waluigi get divorced', 20], ['back to the future', 14]],
    [['heaven search', 3], ['spy vs spy', 4]],
    [['wario and waluigi get divorced', 24], ['heaven search', 3]],
    [['settlers of catan', 12], ['cloudy with a chance of meatballs', 18]],
    [['wario and waluigi get divorced', 27], ['settlers of catan', 12]],
    [['back to the future', 0], ['cloudy with a chance of meatballs', 28]],
    [['back to the future', 5], ['charlie and the chocolate factory', 12]],
    [['back to the future', 6], ['roller coaster tycoon', 18]],
    [['back to the future', 8], ['settlers of catan', 3]],
    [['back to the future', 16], ['roller coaster tycoon', 13]],
    [['back to the future', 17], ['men in black', 1]],
    [['men in black', 7], ['cloudy with a chance of meatballs', 28]],
    [['back to the future', 0], ['men in black', 7]],
    [['settlers of catan', 2], ['cloudy with a chance of meatballs', 27]],
    [['settlers of catan', 4], ['charlie and the chocolate factory', 21]],
    [['settlers of catan', 6], ['roller coaster tycoon', 5]],
    [['settlers of catan', 9], ['charlie and the chocolate factory', 30]],
    [['settlers of catan', 14], ['dunkin donuts', 11]],
    [['settlers of catan', 15], ['heaven search', 9]],
    [['settlers of catan', 16], ['men in black', 2]],
    [['seance', 2], ['roller coaster tycoon', 9]],
    [['seance', 3], ['men in black', 5]],
    [['seance', 4], ['charlie and the chocolate factory', 0]],
    [['seance', 5], ['heaven search', 8]],
    [['heaven search', 0], ['charlie and the chocolate factory', 1]],
    [['heaven search', 2], ['cloudy with a chance of meatballs', 26]],
    [['heaven search', 4], ['cloudy with a chance of meatballs', 19]],
    [['heaven search', 5], ['dunkin donuts', 9]],
    [['heaven search', 7], ['roller coaster tycoon', 10]],
    [['heaven search', 10], ['roller coaster tycoon', 0]],
    [['heaven search', 11], ['men in black', 10]],
    [['men in black', 0], ['cloudy with a chance of meatballs', 24]],
    [['men in black', 11], ['dunkin donuts', 3]],
    [['cloudy with a chance of meatballs', 0], ['charlie and the chocolate factory', 16]],
    [['cloudy with a chance of meatballs', 2], ['dunkin donuts', 8]],
    [['cloudy with a chance of meatballs', 8], ['charlie and the chocolate factory', 5]],
    [['cloudy with a chance of meatballs', 10], ['tichu', 3]],
    [['cloudy with a chance of meatballs', 14], ['roller coaster tycoon', 17]],
    [['cloudy with a chance of meatballs', 15], ['charlie and the chocolate factory', 13]],
    [['cloudy with a chance of meatballs', 17], ['dunkin donuts', 5]],
    [['cloudy with a chance of meatballs', 22], ['charlie and the chocolate factory', 26]],
    [['cloudy with a chance of meatballs', 30], ['roller coaster tycoon', 2]],
    [['cloudy with a chance of meatballs', 31], ['portal', 5]],
    [['cloudy with a chance of meatballs', 32], ['spy vs spy', 0]],
    [['charlie and the chocolate factory', 10], ['dunkin donuts', 7]],
    [['charlie and the chocolate factory', 19], ['roller coaster tycoon', 7]],
    [['charlie and the chocolate factory', 20], ['roller coaster tycoon', 19]],
    [['charlie and the chocolate factory', 22], ['men in black', 9]],
    [['charlie and the chocolate factory', 23], ['roller coaster tycoon', 15]],
    [['charlie and the chocolate factory', 28], ['tichu', 2]],
    [['charlie and the chocolate factory', 32], ['spy vs spy', 2]],
    [['spy vs spy', 5], ['dunkin donuts', 12]],
    [['spy vs spy', 9], ['roller coaster tycoon', 16]],
    [['roller coaster tycoon', 11], ['tichu', 0]],
    [['roller coaster tycoon', 20], ['dunkin donuts', 2]],
    [['dunkin donuts', 1], ['dunkin donuts', 10]]

]



rawWords = [
    {'x': -500.0, 'y': -1600.0, 'ans': 'ai apocalypse', 'clue': '2023: This theme was about adventures in computer technology and where it would lead us, although it also shed light on human-ai relations.'}, 
    {'x': 500.0, 'y': -1600.0, 'ans': 'blockbuster', 'clue': '2022: A campus building disappeared and hunters had to travel to a library-adjacent place that contains all of the appropriate media.'}, 
    {'x': -500.0, 'y': -1400.0, 'ans': 'flubber', 'clue': '2021: A professor on campus created something brand-new, but this item is causing problems and people are bouncing around trying to fix it.'}, 
    {'x': 500.0, 'y': -1400.0, 'ans': 'nickelback', 'clue': '2020: This theme was about taking something old and revamping it so that everyone could enjoy it. The US currency reference helped.'}, 
    {'x': -500.0, 'y': -1200.0, 'ans': 'the bronx zoo', 'clue': '2019: This was the 100th anniversary of The Great Molasses Flood. The theme involved molasses flooding a place where, if the walls came down, the residents would fight each other.'}, 
    {'x': 500.0, 'y': -1200.0, 'ans': 'osmosis jones', 'clue': '2018: This theme was about an animated movie that personifies things within the body. These things help the body with a particular struggle.'}, 
    {'x': -500.0, 'y': -1000.0, 'ans': 'pathfinder', 'clue': '2017: This theme was about a fantasy role-playing game.'}, 
    {'x': 500.0, 'y': -1000.0, 'ans': 'portal', 'clue': '2016: This theme (which was blatantly stolen from a previous BAPHL) was about a piece of media where someone traveling in a constructed reality could go places previously thought impossible.'}, 
    {'x': -500.0, 'y': -800.0, 'ans': 'space exploration', 'clue': '2015: This theme had solvers building a special ship and then traveling to a place few humans have gone before.'}, 
    {'x': 500.0, 'y': -800.0, 'ans': 'alices restaurant', 'clue': '2014: This theme was based off of a piece of media where the actions of the titular character (who shares a name with Mr. Cooper) cause a string of unlikely events that become a classic story.'}, 
    {'x': -500.0, 'y': -600.0, 'ans': 'ponzi scheme', 'clue': '2013: In this theme, solvers recruited six people underneath them for a technically illegal explanation.'}, 
    {'x': 500.0, 'y': -600.0, 'ans': 'uhf', 'clue': '2012: In this theme, solvers put on bad shows to raise money.'}, 
    {'x': -500.0, 'y': -400.0, 'ans': 'wario and waluigi get divorced', 'clue': '2011: In this theme, solvers help two famous Nintendo characters go through a legally-binding process.'}, 
    {'x': -500.0, 'y': -200.0, 'ans': 'back to the future', 'clue': '2010: In this theme, an item travels through time. History is changed which causes an alternate timeline which the solvers must fix.'}, 
    {'x': -500.0, 'y': 0.0, 'ans': 'settlers of catan', 'clue': '2009: This theme transported solvers to a brand new location that didn\'t exist in the 90s. Solvers had to collect resources from where they were so they could explore further.'}, 
    {'x': 500.0, 'y': 0.0, 'ans': 'seance', 'clue': '2008: This theme had teams asking questions of a dead guy to find where he hid the final item.'}, 
    {'x': -500.0, 'y': 200.0, 'ans': 'heaven search', 'clue': '2007: This theme had solvers traveling to the afterlife.'}, 
    {'x': 500.0, 'y': 200.0, 'ans': 'men in black', 'clue': '2006: In this theme, solvers contacted well-dressed but strange characters from a second world hidden in ours.'}, 
    {'x': -500.0, 'y': 400.0, 'ans': 'cloudy with a chance of meatballs', 'clue': '2005: During this time, strange things fell from the sky, causing problems for the infrastructure.'}, 
    {'x': -500.0, 'y': 600.0, 'ans': 'charlie and the chocolate factory', 'clue': '2004: This theme involved a lot of characters that were smaller than the average human.'}, 
    {'x': -500.0, 'y': 800.0, 'ans': 'spy vs spy', 'clue': '2003: This theme involved people in trenchcoats working against each other.'}, 
    {'x': -500.0, 'y': 1000.0, 'ans': 'roller coaster tycoon', 'clue': '2002: This theme was based on a popular game where you obtain property and try to improve it in the hopes of getting more money when other people arrive.'}, 
    {'x': -500.0, 'y': 1200.0, 'ans': 'tichu', 'clue': '2001: This year, each of the things solvers needed to solve could be associated with a card in a special type of deck, which helped solvers in the final room.'}, 
    {'x': 500.0, 'y': 1200.0, 'ans': 'dunkin donuts', 'clue': '2000: This theme involved munchkins.'}, 
    ]
let refs = {};

let words = [];

for (let i of rawWords) {
  refs[i.ans] = {};
  let word = [];
  word.clue = i.clue;
  for (let j = 0; j < i.ans.length; j++) {
    if (i.ans[j] === ' ') {
      continue;
    }
    let o = {};
    refs[i.ans][j] = o;
    o.w = word;
    o.a = i.ans[j];
    o.x = i.x + j * rad * 3;
    o.y = i.y;
    o.ps = [];
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
        if(word == selected.w){
            ctx.strokeStyle = "#008800"
        }
        if(selected.ps && selected.ps.includes(letter)){
            ctx.strokeStyle = "#ff8888"
        }
        if(letter == selected){
            ctx.strokeStyle = "#ff0000"
        }
    
        ctx.beginPath();
        ctx.arc(camzoom *camerazoom * (letter.x+camera[0]), camzoom *camerazoom * (letter.y+camera[1]), camzoom *camerazoom * (rad + 1), 0, 2 * Math.PI);
        ctx.lineWidth = camzoom *camerazoom * 2;
         
        ctx.stroke();

        if(letter.l){
            ctx.font = "bold " + camzoom *camerazoom * 15 + "px monospace";

            ctx.fillStyle = "#333333"
            ctx.fillText(letter.l, camzoom *camerazoom *(letter.x-rad/4+camera[0]), camzoom *camerazoom * (letter.y+rad/4+camera[1]))
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



       
    })});


    checkwin();

}

alerted = false;

function checkwin(){
    won = true;
    words.forEach(word => {
        word.forEach(letter => {
            if(!letter.l || letter.l != letter.a) won = false;
        })
    })
    if(won && !alerted) {
      alert('complete!')
      alerted = true;
    }
}



canvas.onclick = e=>{
    clickx = (e.offsetX / camerazoom/camzoom) - camera[0];
    clicky = (e.offsetY / camerazoom/camzoom) - camera[1];

    closest = {x:-1, y:-1}
  words.forEach(word => { word.forEach(letter => {
    if(closest.x == -1 || distance(clickx, clicky, letter.x, letter.y) < distance(clickx, clicky, closest.x, closest.y)){
        closest = letter
    }
  })})
  selected = closest;
  draw();
}

// typing stuff from here until drawing stuff

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

function untype(){
  if (!selected.w) {
    return;
  }
    if(selected.l){
        selected.l = undefined;
        for (let i of selected.ps) {
          i.l = undefined;
        }
        selected = selected.prev;
    }
    else{
        selected = selected.prev;
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
        selected = selected.prev;
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
