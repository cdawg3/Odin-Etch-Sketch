const container = document.getElementById("grid-container");
const resetButton = document.getElementById("reset-button");

// Create the grid
function createGrid(gridSize) {
  // Clear any existing grid
  container.innerHTML = "";

  // Calculate the size of each square
  const squareSize = 960 / gridSize;

  // Create grid squares
  for (let i = 0; i < gridSize * gridSize; i++) {
    const square = document.createElement("div");
    square.classList.add("grid-square");
    square.style.width = `${squareSize}px`;
    square.style.height = `${squareSize}px`;

    // Add hover effect
    square.addEventListener("mouseenter", () => {
      let currentColor = square.style.backgroundColor;
      if (!currentColor) {
        // Generate a random RGB color
        const randomColor = `rgb(${randomInt(255)}, ${randomInt(
          255
        )}, ${randomInt(255)})`;
        square.style.backgroundColor = randomColor;
        square.setAttribute("data-opacity", "0.1");
      } else {
        // Gradually darken the square
        let opacity = parseFloat(square.getAttribute("data-opacity"));
        if (opacity < 1) {
          opacity += 0.1;
          square.setAttribute("data-opacity", opacity.toFixed(1));
          square.style.backgroundColor = adjustColorOpacity(
            currentColor,
            opacity
          );
        }
      }
    });

    container.appendChild(square);
  }
}

// Generate a random integer from 0 to max
function randomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

// Adjust the opacity of an RGB color
function adjustColorOpacity(color, opacity) {
  const match = color.match(/\d+/g);
  if (match) {
    const [r, g, b] = match.map(Number);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  }
  return color;
}

// Set up the reset button
resetButton.addEventListener("click", () => {
  let gridSize = parseInt(prompt("Enter grid size (max 100):"), 10);
  if (!gridSize || gridSize < 1 || gridSize > 100) {
    alert("Invalid grid size. Please enter a number between 1 and 100.");
    return;
  }
  createGrid(gridSize);
});

// Create the default grid
createGrid(16);
