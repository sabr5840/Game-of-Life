
const rows = 20; // Change the size of the grid here
const cols = 20;
let grid = createEmptyGrid();

function createEmptyGrid() {
    return Array.from({ length: rows }, () => Array(cols).fill(false));
}

function countNeighbors(row, col) {
    let count = 0;

    // Define the relative positions of neighbors
    const neighbors = [
        [-1, -1], [-1, 0], [-1, 1],
        [0, -1],           [0, 1],
        [1, -1], [1, 0], [1, 1]
    ];

    // Check each neighbor
    neighbors.forEach(([i, j]) => {
        const newRow = row + i;
        const newCol = col + j;

        // Check boundaries and count living neighbors
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
            count += grid[newRow][newCol] ? 1 : 0;
        }
    });

    return count;
}


function decideCellFate(row, col) {
    const neighbors = countNeighbors(row, col);
    const isAlive = grid[row][col];

    if (isAlive) {
        // Rules for living cells
        if (neighbors < 2 || neighbors > 3) {
            // Cell dies due to underpopulation or overpopulation
            return false;
        } else {
            // Cell survives to the next generation
            return true;
        }
    } else {
        // Rules for dead cells
        if (neighbors === 3) {
            // A new cell is born or an existing cell becomes alive
            return true;
        } else {
            // Cell remains dead
            return false;
        }
    }
}

/*
function decideCellFate(row, col) {
    const neighbors = countNeighbors(row, col);
    const isAlive = grid[row][col];

    return (isAlive && (neighbors === 2 || neighbors === 3)) || (!isAlive && neighbors === 3);
}
*/


function renderGrid() {
    const gridContainer = document.getElementById('grid-container');
    gridContainer.innerHTML = '';

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const cell = document.createElement('div');
            cell.className = `cell ${grid[row][col] ? 'alive' : 'dead'}`;
            cell.onclick = () => toggleCell(row, col);
            gridContainer.appendChild(cell);
        }
    }
}

function toggleCell(row, col) {
    grid[row][col] = !grid[row][col];
    renderGrid();
}

function clearGrid() {
    grid = createEmptyGrid();
    renderGrid();
}

function addRandomCells() {
    const percentageAlive = 30; // Adjust the percentage of cells that should be alive

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            // Generate a random number between 0 and 100
            const randomPercent = Math.random() * 100;

            // Check if the random number is less than the desired percentage
            if (randomPercent < percentageAlive) {
                grid[row][col] = true; // Set the cell to be alive
            }
        }
    }

    renderGrid();
}


function update() {
    const newGrid = createEmptyGrid();

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const shouldLive = decideCellFate(row, col);
            newGrid[row][col] = shouldLive;
        }
    }

    grid = newGrid;
    renderGrid();
}


setInterval(update, 500); // Change the frequency of updates here
renderGrid();
