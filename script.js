function generateColor(square) {
    const red = Math.floor(Math.random() * 256);
    const green = Math.floor(Math.random() * 256);
    const blue = Math.floor(Math.random() * 256);
    const alpha = 0.1;
    square.style.backgroundColor = `rgb(${red}, ${green}, ${blue}, ${alpha})`;
}


function darkenColor(square) {
    const oldRGBA = square.style.backgroundColor;
    const oldAlpha = oldRGBA.slice(-4,-1);
    const newAlpha = +oldAlpha + 0.1;
    const oldRGB = oldRGBA.slice(0, -6);

    if (newAlpha > 1) {
        return;
    } else {
        square.style.backgroundColor = `${oldRGB}, ${newAlpha}`;
    }
}

function generateGrid (size) {
    const grid = document.querySelector('.grid');
    const fragment = document.createDocumentFragment();

    if (size < 0 || size > 100) {
        alert("please enter a number between 0 and 100.");
        return;
    }

    while (grid.firstChild) {
        grid.removeChild(grid.firstChild);
    }

    for (let i = 0; i < (size*size); i++) {
        const square = document.createElement('div');
        const squareSize = (1/size) * 100;
        square.style.height = `${squareSize}%`;
        square.style.width = `${squareSize}%`;

        square.classList.add('block');

        square.addEventListener('mouseover', () => {
            if (square.style.backgroundColor) {
                darkenColor(square);
            } else {
                generateColor(square);
            }
        });
        fragment.appendChild(square);
    }
    grid.appendChild(fragment);
    
}

const input = document.querySelector('input');
const btn = document.querySelector('button');

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') generateGrid(input.value);
}); 
btn.addEventListener('click', () => {
    generateGrid(input.value);
})