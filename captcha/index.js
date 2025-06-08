const squaresPerRow_hard = 3;
const squaresPerColumn_hard = 3;

const squaresPerRow_easy = 4;
const squaresPerColumn_easy = 1;

document.addEventListener("DOMContentLoaded", async (event) => {
  // Determine difficulty level
  const promptForDifficulty = () => {
    const overlay = document.createElement("div");
    overlay.id = "difficulty-overlay";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    const message = document.createElement("div");
    message.style.color = "white";
    message.style.fontSize = "24px";
    message.style.textAlign = "center";
    message.innerHTML = `
        <p>Are you smart?</p>
        <button id="hard-button">Yes</button>
        <button id="easy-button">No</button>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);

    return new Promise((resolve) => {
      document.getElementById("hard-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve("hard");
      });

      document.getElementById("easy-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve("easy");
      });
    });
  };

  const promptForTooHard = () => {
    const overlay = document.createElement("div");
    overlay.id = "too-hard-overlay";
    overlay.style.position = "absolute";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "rgba(0, 0, 0, 0.8)";
    overlay.style.display = "flex";
    overlay.style.justifyContent = "center";
    overlay.style.alignItems = "center";
    overlay.style.zIndex = "1000";

    const message = document.createElement("div");
    message.style.color = "white";
    message.style.fontSize = "24px";
    message.style.textAlign = "center";
    message.innerHTML = `
        <p>Is this too difficult for you?</p>
        <button id="hard-button">Yes</button>
        <button id="easy-button">No</button>
    `;

    overlay.appendChild(message);
    document.body.appendChild(overlay);

    return new Promise((resolve) => {
      document.getElementById("hard-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve(true);
      });

      document.getElementById("easy-button").addEventListener("click", () => {
        document.body.removeChild(overlay);
        resolve(false);
      });
    });
  };

  // Get the difficulty level from the user
  let difficulty = await promptForDifficulty();
  let squaresPerRow = 0;
  let squaresPerColumn = 0;
  if (difficulty === "hard") {
    squaresPerRow = squaresPerRow_hard;
    squaresPerColumn = squaresPerColumn_hard;
  } else {
    squaresPerRow = squaresPerRow_easy;
    squaresPerColumn = squaresPerColumn_easy;
  }

  let squareSize = 70;
  let totalSquares = squaresPerRow * squaresPerColumn;
  let numGuesses = 0;

  // Initialize the game grid
  const gameContainer = document.getElementById("game-container");
  const winMessage = document.getElementById("win-message");
  const colors = ["red", "blue", "green"];
  const secondInstructions = document.getElementById("instructions-two");

  // Function to initialize the game grid
  const initGameGrid = () => {
    // Set the CSS Grid layout columns dynamically
    gameContainer.style.gridTemplateColumns = `repeat(${squaresPerRow}, ${squareSize}px)`;

    // Create squares and append to the game container
    for (let i = 0; i < totalSquares; i++) {
      let square = document.createElement("div");
      square.classList.add("square");
      square.style.width = `${squareSize}px`;
      square.style.height = `${squareSize}px`;
      let randomColor =
        colors[Math.floor(Math.random() * (colors.length - 1) + 1)]; // Ensure at least one square is not red
      square.style.backgroundColor = randomColor;

      // Set the innerHTML to the appropriate SVG based on the color
      if (randomColor === "red") {
        square.innerHTML = RED_SVG;
      } else if (randomColor === "blue") {
        square.innerHTML = BLUE_SVG;
      } else if (randomColor === "green") {
        square.innerHTML = GREEN_SVG;
      }

      // Append the square with the icon to the game container
      gameContainer.appendChild(square);
    }
  };

  // Set the innerHTML to the appropriate SVG based on the color
  const RED_SVG = `
        <svg class="red-filter" width="${Math.floor(
          squareSize / (48 / 20)
        )}px" height="${Math.floor(
    squareSize / (48 / 20)
  )}px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="y" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <path d="M11.6223011,0 C11.6223011,1.70940171 12.1128933,3.07692308 13.0940778,4.1025641 C16.3646926,6.4957265 18,9.23076923 18,12.3076923 C18,15.7264957 16.0376311,18.2905983 12.1128933,20 C15,17 14.5658545,15.7692308 11.6223011,12 C8.5,13.5 9,14.5 9.5,16.5 C8.45242566,16.5 7.5,16.5 7,16 C7,16.6837607 8.19671588,18.5 8.95242566,20 C5.02768789,18.974359 0.829272269,12.8205128 2.30104893,12.3076923 C3.28223337,11.965812 4.42694856,12.1367521 5.73519448,12.8205128 C4.09988708,6.66666667 6.06225596,2.39316239 11.6223011,0 Z" id="Path-3" fill="#000000"></path>
            </g>
        </svg>`;
  const BLUE_SVG = `
        <svg class="blue-filter" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        width="${Math.floor(squareSize / (48 / 20))}px" height="${Math.floor(
    squareSize / (48 / 20)
  )}px" viewBox="0 0 20 20" enable-background="new 0 0 20 20" xml:space="preserve">
        <g id="tint">
            <g>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M9.86,2c0,0-5.88,7.18-5.88,10.17c0.01,3.23,2.8,5.83,5.98,5.83
                    c3.18-0.01,6.04-2.63,6.03-5.86C15.99,9.05,9.86,2,9.86,2z"/>
            </g>
        </g>
        </svg>`;
  const GREEN_SVG = `
        <svg class="green-filter" width="${Math.floor(
          squareSize / (48 / 20)
        )}px" height="${Math.floor(
    squareSize / (48 / 20)
  )}px" viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
            <g id="" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
                <g id="Tree" transform="translate(2.000000, 0.000000)" fill="#000000" fill-rule="nonzero">
                    <path d="M9,15.5416666 L9,20 L7,20 L7,15.5416666 L0,17 L4.5,11.375 L2,12 L5.65517241,6.51724138 L4,7 L8,0 L12,7 L10.3448276,6.51724138 L14,12 L11.5,11.375 L16,17 L9,15.5416666 Z"></path>
                </g>
            </g>
        </svg>`;

  // Function to change color of a square
  const changeColor = async (square) => {
    let currentColorIndex = colors.indexOf(square.style.backgroundColor);
    let nextColorIndex = (currentColorIndex + 1) % colors.length;
    square.style.backgroundColor = colors[nextColorIndex];

    // Change the icon inside the square based on the new color
    switch (colors[nextColorIndex]) {
      case "red":
        square.innerHTML = RED_SVG;
        break;
      case "blue":
        square.innerHTML = BLUE_SVG;
        break;
      case "green":
        square.innerHTML = GREEN_SVG;
        break;
      default:
        square.innerHTML = ""; // No icon or clear the existing icon if default or unknown color
        break;
    }

    // Prompt for easy mode if too many guesses
    numGuesses++;
    if (numGuesses % 100 === 0 && difficulty === "hard") {
      const tooHard = await promptForTooHard();
      if (tooHard) {
        const newDifficulty = await promptForDifficulty();
        if (newDifficulty === "easy") {
          difficulty = "easy";
          squaresPerRow = squaresPerRow_easy;
          squaresPerColumn = squaresPerColumn_easy;
          totalSquares = squaresPerRow * squaresPerColumn;

          // Clear the current game grid
          gameContainer.innerHTML = "";

          // Reinitialize the game grid
          initGameGrid();

          // Reset instructions
          secondInstructions.innerHTML = "";
        }
      }
    }
  };

  // Function to check if all squares are red
  const checkWin = () => {
    let allSquares = gameContainer.querySelectorAll(".square");
    return Array.from(allSquares).every(
      (square) => square.style.backgroundColor === "red"
    );
  };

  let lockGame = false;
  // Set up click event for each square
  gameContainer.addEventListener("click", async (event) => {
    if (lockGame) return; // Prevent further clicks if game is locked
    // Use .closest() to find the nearest ancestor with the 'square' class
    let clickedSquare = event.target.closest(".square");
    if (!clickedSquare) return;

    let index = Array.from(clickedSquare.parentNode.children).indexOf(
      clickedSquare
    );
    let row = Math.floor(index / squaresPerRow);
    let col = index % squaresPerRow;

    // Change color of clicked square and adjacent squares
    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        if (i === 0 && j === 0) {
          // Clicked square
          await changeColor(clickedSquare);
        } else {
          // Adjacent squares
          let adjacentRow = row + i;
          let adjacentCol = col + j;
          if (
            adjacentRow >= 0 &&
            adjacentRow < squaresPerColumn &&
            adjacentCol >= 0 &&
            adjacentCol < squaresPerRow
          ) {
            let adjacentIndex = adjacentRow * squaresPerRow + adjacentCol;
            let adjacentSquare = gameContainer.children[adjacentIndex];
            await changeColor(adjacentSquare);
          }
        }
      }
    }

    // Check for win after each click
    if (checkWin()) {
      lockGame = true;

      // Simple confetti-like animation using vanilla JS
      const confettiContainer = document.createElement("div");
      confettiContainer.id = "confetti-container";
      confettiContainer.style.position = "absolute";
      confettiContainer.style.top = "0";
      confettiContainer.style.left = "0";
      confettiContainer.style.width = "100%";
      confettiContainer.style.height = "100%";
      confettiContainer.style.pointerEvents = "none";
      confettiContainer.style.zIndex = "1001";
      document.body.appendChild(confettiContainer);

      for (let i = 0; i < 100; i++) {
        const confetti = document.createElement("div");
        confetti.style.position = "absolute";
        confetti.style.width = "10px";
        confetti.style.height = "10px";
        confetti.style.backgroundColor = [
          "red",
          "blue",
          "green",
          "yellow",
          "purple",
        ][Math.floor(Math.random() * 5)];
        confetti.style.borderRadius = "50%";
        confetti.style.top = `${Math.random() * window.innerHeight}px`;
        confetti.style.left = `${Math.random() * window.innerWidth}px`;
        confetti.style.animation = `fall ${
          Math.random() * 2 + 2
        }s linear forwards`;

        confettiContainer.appendChild(confetti);
      }

      // Add keyframes for falling animation
      const style = document.createElement("style");
      style.innerHTML = `
            @keyframes fall {
                0% { transform: translateY(0); opacity: 1; }
                100% { transform: translateY(100vh); opacity: 0; }
            }
        `;
      document.head.appendChild(style);

      // Remove confetti container after a few seconds
      setTimeout(() => {
        document.body.removeChild(confettiContainer);
        document.head.removeChild(style);
        window.top.postMessage("success", "*");
      }, 2000);
    }
  });

  initGameGrid();
});
