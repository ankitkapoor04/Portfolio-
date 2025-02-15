let gamesq = []; // Sequence of game colors
let usersq = []; // Sequence of user clicks

let started = false; // Whether the game has started
let level = 0; // The current level of the game

let color = ["lightblue", "blue", "yellow", "orange"]; // Array of colors
let h3 = document.querySelector("h3"); // Reference to the <h3> element for displaying the level

// Event listener to start the game when a key is pressed
document.addEventListener("keypress", () => {
    if (!started) {  // Ensure the game starts only once  
        started = true;
        console.log("Game started");
        level = 0;
        gamesq = [];
        levelUp();

    }
});

// Function to handle the game flashing color
function btnflash(change) {
    change.classList.add("flash");

    // Remove the 'flash' class after 250ms
    setTimeout(() => {
        change.classList.remove("flash");
    }, 450);
}

// Function to handle the user flashing color
function userflash(change) {
    change.classList.add("userflash");

    // Remove the 'userflash' class after 250ms
    setTimeout(() => {
        change.classList.remove("userflash");
    }, 250);
}

// Function to handle the level-up logic and game flashing
function levelUp() {
    console.log(h3);
    level++;
    h3.innerText = `Level ${level}`; // Update the level in the h3 element

    // Pick a random color to flash
    let randno = Math.floor(Math.random() * color.length);
    let randcolor = color[randno]; // Random color based on the random index
    let change = document.querySelector(`.${randcolor}`); // Select the element by color class
    gamesq.push(randcolor); // Add the color to the game's sequence
    console.log(`${randno}, ${randcolor}, ${change}`);
    
    // Flash the game color for the user to see
    btnflash(change);

    // Reset the user's input for the new round
    usersq = [];
}

// Function to check the user's answer
function checkans() {
    let idx = usersq.length - 1; // Compare the last button clicked by the user

    // Check if the last user input matches the last game input
    if (gamesq[idx] === usersq[idx]) {
        console.log("Correct choice!");

        // If the user has completed the sequence for this level, go to the next level
        if (usersq.length === gamesq.length) {
            setTimeout(() => {
                levelUp(); // Start the next level
            }, 1000);
        }
    } else {
        // Game over logic if the user presses the wrong button
        console.log("Game over");
        h3.innerText = "Game over! Press any key to start!";
        started = false; // Stop the game
    }
}

// Function to handle the button click by the user
function btnpress() {
    let btn = this; // "this" refers to the clicked button element
    userflash(btn);

    let col = btn.classList[1]; // Get the color class (like "blue", "yellow", etc.)
    console.log(col);
    usersq.push(col); // Add the color to the user's sequence
    
    // Call checkans after the user click to see if it's correct
    checkans();
}

// Select all elements with the class "box" (your buttons)
let buttons = document.querySelectorAll(".box");

// Loop over each button and add the event listener
for (let btn1 of buttons) {
    btn1.addEventListener("click", btnpress);  // Attach the event listener to each button
}
