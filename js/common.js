const container = document.querySelector('.containerr');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const bottom = document.querySelector('.bottomm');
let isDrag = false;
let i = 0;

canvas.width = 1450;
canvas.height = 800;
ctx.beginPath();
ctx.stroke();

function addBottom(units) {
  bottom.innerHTML = `
    <button class="close">x</button>
    ${Object.values(units)
      .map(
        (unit) =>
          `<div class="box" ondragover="dragEnter(event)">
            <img src="./images/${unit}.png" id="${unit}" class="img cantRemove" draggable="true" ondragstart="drag(event)">
          </div>`
      )
      .join('')}
  `;
  bottom.classList.remove('none');
  bottom.style.background = 'rgba(0, 0, 0, 0.7)';

  document.querySelector('.close').addEventListener('click', () => {
    bottom.classList.add('none');
  });
}

function removeObject(e) {
  if (!e.target.classList.contains('cantRemove')) {
    e.target.remove();
    i -= 1;
    if (i <= 0) i = 0;
  }
}

function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
}

document
  .querySelector('.ground')
  .addEventListener('click', () => addBottom({ 보병: 'Infantry', 전차: 'tank', 공수: 'Paratroop' }));
document
  .querySelector('.sea')
  .addEventListener('click', () => addBottom({ 전함: 'Superheavy_Battleship', 순양: 'Battlecruiser' }));
document
  .querySelector('.sky')
  .addEventListener('click', () => addBottom({ 전투기: 'Heavy_fighter', 폭격기: 'Strategic_bomber' })); document.querySelector('.remove').addEventListener('click', () =>
    document.querySelectorAll('.img').forEach((el) =>
      el.addEventListener('click', (ev) => removeObject(ev))
    )
  ); document.querySelector('.removeAll').addEventListener('click', () => {
    Array.from(container.children).forEach((el) => {
      if (el.classList.contains('img')) {
        el.remove();
        i = 0;
      }
    });
  }); document.querySelector('.draw').addEventListener('click', () => {
    canvas.classList.toggle('draww');
    if (canvas.classList.contains('draww')) {
      canvas.style.cursor = 'crosshair';
      canvas.addEventListener('mousedown', draw);
      canvas.addEventListener('mousemove', (e) => {
        if (!isDrag) return;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
      });
      canvas.addEventListener('mouseup', () => {
        isDrag = false;
      });
      canvas.addEventListener('mouseenter', () => {
        ctx.beginPath();
      });
    } else {
      canvas.style.cursor = 'default';
      canvas.removeEventListener('mousedown', draw);
    }
  }); document.querySelector('.canvasClear').addEventListener('click', clearCanvas); function dragEnter(ev) {
    ev.preventDefault();
  } function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  } function drop(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    const img = document.getElementById(data).cloneNode(true); img.style.position = 'absolute';
    img.style.top = ev.clientY - 50 + 'px';
    img.style.left = ev.clientX - 50 + 'px';
    img.classList.remove('cantRemove');
    ev.target.parentElement.appendChild(img);
  } function draw(e) {
    isDrag = true;
    ctx.moveTo(e.offsetX, e.offsetY);
  }
