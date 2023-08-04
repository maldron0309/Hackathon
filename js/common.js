// 변수들
const containerr = document.querySelector(".containerr");
const cont2 = document.querySelector(".cont-2");
const fixBtn = document.querySelector(".fix");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
let bottom = document.querySelector(".bottomm");
let isDrag = false;
let fix = false;
let i = 0;
let teamPower = 0;
let enemyPower = 0;

// 아군 유닛
const obj = {
  육: {
    육군: "soldier1",
    탱크: "tank1",
  },
  해: {
    1: "Battlecruiser1",
    2: "Superheavy_Battleship1"
  },
  공: {
    제트기: "",
  },
};

// 적군 유닛
const obj2 = {
  육: {
    육군: "soldier2",
    탱크: "tank2",
  },
  해: {
    1: "Battlecruiser2",
    2: "Superheavy_Battleship2"
  },
  공: {
    제트기: "",
  },
};

// canvas 초기 설정
canvas.width = 1450;
canvas.height = 800;
ctx.beginPath();
ctx.stroke();

// 여기서부터 함수들
function makeRandom(min, max, n, img){
  let rand = Math.floor(Math.random()*(max-min+1)) + min;
  if(n == 1)
    teamPower+=rand;
  else if(n == 2)
    enemyPower+=rand;
  img.className = rand;
}

function addBottom(team, enemy) {
  bottom.textContent = "";
  // bottom.classList.remove("none");
  const close = document.createElement("button");
  close.className = "close";
  close.textContent = "x";
  bottom.append(close);
  Object.values(team).forEach((el) => {
    const createDiv = document.createElement("div");
    const createImg = document.createElement("img");
    createImg.classList.add("img");
    createImg.classList.add("cantRemove");
    createImg.setAttribute("id", `${el}`);
    createImg.setAttribute("src", `./images/${el}.png`);
    createImg.setAttribute("draggable", "true");
    createImg.setAttribute("ondragstart", "drag(event)");
    createDiv.classList.add("box");
    createDiv.setAttribute("ondragover", "dragEnter(event)");
    createDiv.append(createImg);
    bottom.append(createDiv);
    bottom.style.background = "rgba(0, 0, 0, 0.8)";
    bottom.style.width = '1500px';
  });
  Object.values(enemy).forEach((el) => {
    const createDiv = document.createElement("div");
    const createImg = document.createElement("img");
    createImg.classList.add("img");
    createImg.classList.add("cantRemove");
    createImg.setAttribute("id", `${el}`);
    createImg.setAttribute("src", `./images/${el}.png`);
    createImg.setAttribute("draggable", "true");
    createImg.setAttribute("ondragstart", "drag(event)");
    createDiv.classList.add("box");
    createDiv.setAttribute("ondragover", "dragEnter(event)");
    createDiv.append(createImg);
    bottom.append(createDiv);
  });
  document.querySelector(".close").addEventListener("click", () => {
    // bottom.classList.add("none");
    bottom.style.width = '0';
  });
}

function dragEnter(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
  ev.preventDefault();
  const data = ev.dataTransfer.getData("text");
  const img = document.getElementById(data).cloneNode(true);
  img.style.position = "absolute";
  img.style.top = ev.clientY - 150 + "px";
  img.style.left = ev.clientX - 500 + "px";
  img.classList.remove("cantRemove");
  ev.target.parentElement.appendChild(img);
  if(img.getAttribute("id") == "soldier1") 
    makeRandom(1, 3, 1, img);
  else if(img.getAttribute("id") == "soldier2")
    makeRandom(1, 3, 2, img);
  else if(img.getAttribute("id") == "tank1")
    makeRandom(4, 7, 1, img);
  else if(img.getAttribute("id") == "tank2")
    makeRandom(4, 7, 2, img);
  else if(img.getAttribute("id") == "Battlecruiser1")
    makeRandom(8, 9, 1, img);
  else if(img.getAttribute("id") == "Battlecruiser2")
    makeRandom(8, 9, 2, img);
  else if(img.getAttribute("id") == "Superheavy_Battleship1")
    makeRandom(8, 9, 1, img);
  else if(img.getAttribute("id") == "Superheavy_Battleship1")
    makeRandom(8, 9, 2, img);
  console.log(teamPower, enemyPower);
}

function removeObject(ee) {
  if (!ee.target.classList.contains("cantRemove")) {
    console.log(ee.target);
    if(ee.target.getAttribute("id").substr(-1) == "1") 
      teamPower-=ee.target.classList[0];
    if(ee.target.getAttribute("id").substr(-1) == "2") 
      enemyPower-=ee.target.classList[0];
    ee.target.remove();
    console.log(teamPower, enemyPower);
    i -= 1;
    if (i <= 0) i = 0;
  }
}

function draw(e) {
  isDrag = true;
  ctx.moveTo(e.offsetX, e.offsetY);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}


// 여기서부터 이벤트리스너들
document
  .querySelector(".ground")
  .addEventListener("click", () => addBottom(obj.육, obj2.육));
document
  .querySelector(".sea")
  .addEventListener("click", () => addBottom(obj.해, obj2.해));
document
  .querySelector(".sky")
  .addEventListener("click", () => addBottom(obj.공, obj2.공));

// 유닛 단일 제거
document.querySelector(".remove").addEventListener("click", (e) => {
  let img = document.querySelectorAll(".map > img");
  img.forEach((el) => {
    el.addEventListener("click", (ee) => removeObject(ee));
  });
});

// 유닛 전체 제거
document.querySelector(".removeAll").addEventListener("click", () => {
  Array.from(containerr.children).forEach((el) => {
    Array.from(el.children).forEach(e => {
      let w = e.getAttribute('id').substr(-1)
      if (w == 1 || w == 2) {
        e.remove();
        i = 0;
        teamPower = 0;
        enemyPower = 0;
      }
    });

    // if (el.classList.contains("img")) {
    //   el.remove();
    //   i = 0;
    // }
  });
});

// 캔버스 그림판코드
document.querySelector(".draw").addEventListener("click", () => {
  canvas.classList.toggle("draww");
  if (canvas.classList.contains("draww")) {
    fix = true;
    fixBtn.textContent = "지도 고정 해제";
    canvas.style.zIndex = "10";
    canvas.addEventListener("mouseover", (e) => {
      e.target.style.cursor = "crosshair";
    });
    canvas.addEventListener("mousedown", draw);
    canvas.addEventListener("mousemove", (e) => {
      if (!isDrag) return;
      ctx.lineTo(e.offsetX, e.offsetY);
      ctx.stroke();
    });
    canvas.addEventListener("mouseup", () => {
      isDrag = false;
    });
    canvas.addEventListener("mouseenter", () => {
      ctx.beginPath();
    });
  } else {
    // fix = false;
    // fixBtn.textContent = "지도 고정";
    // canvas.style.zIndex = "-100";
    canvas.removeEventListener("mousedown", draw);
    canvas.addEventListener("mouseover", (e) => {
      e.target.style.cursor = "default";
    });
  }
});

// 캔버스 지우기 이벤트 리스너
document.querySelector(".canvasClear").addEventListener("click", clearCanvas);

// 지도 고정 / 해제
fixBtn.addEventListener("click", () => {
  if (fix == false) {
    // const div = document.createElement("div");
    // div.classList.add("ddd");
    // cont2.parentElement.prepend(div);
    fixBtn.textContent = "지도 고정 해제";
    canvas.style.zIndex = "10";
    fix = true;
  } else if (fix == true) {
    // cont2.parentElement.removeChild(document.querySelector(".ddd"));
    fixBtn.textContent = "지도 고정";
    canvas.style.zIndex = "-100";
    fix = false;
  }
});

// document.querySelector(".mapMove").addEventListener("click", () => {
//   canvas.style.zIndex = "-1";
// });

document.querySelector('.simulation').addEventListener('click', () => {
  const body = document.querySelector('body');
  const ring = document.querySelector('.lds-ring');
  body.style.opacity = '0.7';
  ring.style.display = 'inline-block';
  let timeout = Math.floor(Math.random()*(8-2+1)) + 2;
  console.log(timeout)
  if(teamPower > enemyPower) {
    setTimeout(() => {
      body.style.opacity = '1';
      ring.style.display = 'none';
      alert('아군이 승리했습니다!');
    }, timeout*1000);
  }
  else if(teamPower < enemyPower) {
    setTimeout(() => {
      body.style.opacity = '1';
      ring.style.display = 'none';
      alert('적군이 승리했습니다..');
    }, timeout*1000);
  }
  else {
    setTimeout(() => {
      body.style.opacity = '1';
      ring.style.display = 'none';
      alert('승자가 없습니다.');
    }, timeout*1000);
  }
});