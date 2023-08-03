// 변수들
const container = document.querySelector('.containerr');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
let bottom = document.querySelector('.bottomm');
let isDrag = false;
let i = 0;

// 유닛들
const obj = {
  육 : {
    보병 : 'Infantry',
    전차 : 'tank',
    공수 : 'Paratroop',
  },
  해 : {
    전함 : 'Superheavy_Battleship',
    순양 : 'Battlecruiser',
  },
  공 : {
    전투기 : 'Heavy_fighter',
    폭격기 : 'Strategic_bomber',
  }
}

// canvas 초기 설정
canvas.width=1450;
canvas.height=800;
ctx.beginPath();
ctx.stroke();

// 여기서부터 함수들
function addBottom(e) {
  bottom.textContent = '';
  bottom.classList.remove('none');
  const close = document.createElement('button');
  close.className = 'close';
  close.textContent = 'x';
  bottom.append(close)
  Object.values(e).forEach(el => {
    const createDiv = document.createElement('div');
    const createImg = document.createElement('img');
    createImg.classList.add('img');
    createImg.classList.add('cantRemove');
    createImg.setAttribute('id', `${el}`);
    createImg.setAttribute('src', `./images/${el}.png`)
    createImg.setAttribute('draggable', 'true');
    createImg.setAttribute('ondragstart', 'drag(event)');
    createDiv.classList.add('box');
    createDiv.setAttribute("ondragover", "dragEnter(event)");
    createDiv.append(createImg);
    bottom.append(createDiv);
    bottom.style.background = 'rgba(0, 0, 0, 0.7)';
  });
  document.querySelector('.close').addEventListener('click', () => {
    bottom.classList.add('none');
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
  img.style.position = 'absolute';
  img.style.top = (ev.clientY - 50) + 'px';
  img.style.left = (ev.clientX - 50) + 'px';
  img.classList.remove('cantRemove');
  ev.target.parentElement.appendChild(img);
}

function removeObject(ee) {
  if(!ee.target.classList.contains('cantRemove')) {
    ee.target.remove();
    i-=1;
    if(i <= 0) i = 0;
  }
}

function draw(e) {
  isDrag = true;
  ctx.moveTo(e.offsetX,e.offsetY);
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

// 여기서부터 이벤트리스너들
document.querySelector('.ground').addEventListener('click', () => addBottom(obj.육) );
document.querySelector('.sea').addEventListener('click', () => addBottom(obj.해) );
document.querySelector('.sky').addEventListener('click', () => addBottom(obj.공) );

// 유닛 단일 제거
document.querySelector('.remove').addEventListener('click', e => { 
  let img = document.querySelectorAll('.img');
  img.forEach(el => {
    el.addEventListener('click', (ee) => removeObject(ee))
  });
});

// 유닛 전체 제거
document.querySelector('.removeAll').addEventListener('click', () => {
  Array.from(container.children).forEach(el => {
    if(el.classList.contains('img')) {
      el.remove();
      i = 0;
    }
  });
});

// 캔버스 그림판코드
document.querySelector(".draw").addEventListener("click", () => {
  canvas.classList.toggle("draww");
  if(canvas.classList.contains("draww")) {
    canvas.addEventListener('mouseover', (e) => {
      e.target.style.cursor = "crosshair";
    });
    canvas.addEventListener('mousedown', draw);
    canvas.addEventListener('mousemove', e => {
      if(!isDrag) return;
      ctx.lineTo(e.offsetX,e.offsetY);
      ctx.stroke();
    });
    canvas.addEventListener('mouseup', () => {
      isDrag = false;
    });
    canvas.addEventListener('mouseenter', () => {
      ctx.beginPath();
    });
  }
  else {
    canvas.removeEventListener('mousedown', draw);
    canvas.addEventListener('mouseover', (e) => {
      e.target.style.cursor = "default";
    });
  }
});

// 캔버스 지우기 이벤트 리스너
document.querySelector('.canvasClear').addEventListener('click', clearCanvas);