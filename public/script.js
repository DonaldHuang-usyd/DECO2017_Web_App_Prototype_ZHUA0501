// Setting up variables for our HTML elements using DOM selection
const form = document.getElementById("taskform");
const button = document.querySelector("#taskform > button"); // Complex CSS query
const tasklist = document.getElementById("tasklist");
const showFormButton = document.getElementById("showFormButton");
const backButton = document.getElementById("backButton");
const ingredientsSection = document.getElementById("ingredientsSection");
const ingredientOptions = document.getElementById("ingredientOptions");
const pastaInput = document.getElementById("pastaInput");
const recipeSection = document.getElementById("recipeSection");
const cookingNote = document.getElementById("cookingNote");

// Event listener for Button click
button.addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission

    let task = form.elements.task.value; // Get the task input value
    let pastaType = form.elements.pastatype.value; // Get the pasta type input value
    let weight = form.elements.weight.value; // Get the weight input value
    let date = (new Date()).toLocaleDateString('en-US'); // Convert to short date format

    // Call the addTask() function using the form values
    addTask(task, pastaType, weight, date, false);

    // Clear the dynamically added ingredient options
    clearIngredientOptions();
    pastaInput.selectedIndex = 0;
    displayRecipe(pastaInput.value);

    // Log out the newly populated taskList every time the button has been pressed
    console.log(taskList);
    
});

// Create an empty array to store our tasks
var taskList = [];

function addTask(taskDescription, pastaType, weight, createdDate, completionStatus) {
    let task = {
        taskDescription,
        pastaType,
        weight,
        createdDate,
        completionStatus
    };

    // Add the task to our array of tasks
    taskList.push(task);

    // Separate the DOM manipulation from the object creation logic
    updateHistory(task);
}

// Function to display the item on the page
function updateHistory(task) {
    let item = document.createElement("li");
    item.innerHTML = `<p>${task.taskDescription}</p>
                      <p>Pasta Type: ${task.pastaType}</p>
                      <p>Weight: ${task.weight}</p>`;

    tasklist.insertBefore(item, tasklist.firstChild);

    // Setup delete button DOM elements
    let delButton = document.createElement("button");
    let delButtonText = document.createTextNode("Delete");
    delButton.appendChild(delButtonText);
    item.appendChild(delButton); // Adds a delete button to every task

    // Listen for when the delete button is clicked
    delButton.addEventListener("click", function(event) {
        item.remove(); // Remove the task item from the page when button clicked
        // Remove the task from the taskList array
        taskList = taskList.filter(t => t !== task);
    });

    // Clear the value of the input once the task has been added to the page
    form.reset();
    
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', function() {
    const tabs = document.querySelectorAll('.tab');
    const contents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.getAttribute('data-tab');

            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));

            // Add active class to clicked tab
            tab.classList.add('active');

            // Hide all tab contents
            contents.forEach(content => content.classList.remove('active'));

            // Show the target tab content
            document.getElementById(target).classList.add('active');
        });
    });

    // Show the form tab when the "Let's cook some pasta!" button is clicked
    showFormButton.addEventListener('click', () => {
        document.getElementById('home').classList.remove('active');
        document.getElementById('taskFormTab').classList.add('active');
    });

    // Go back to the home tab when the "Back" button is clicked
    backButton.addEventListener('click', () => {
        document.getElementById('taskFormTab').classList.remove('active');
        document.getElementById('home').classList.add('active');
        clearIngredientOptions();
        pastaInput.selectedIndex = 0;
        displayRecipe(pastaInput.value);
        
    
    });

    // Ingredient buttons event listeners
    document.getElementById('proteinButton').addEventListener('click', () => addIngredientOption('Protein'));
    document.getElementById('veggieButton').addEventListener('click', () => addIngredientOption('Veggie'));
    document.getElementById('sauceButton').addEventListener('click', () => addIngredientOption('Sauce'));
    document.getElementById('othersButton').addEventListener('click', () => addIngredientOption('Others'));

    // Pasta type change event listener
    pastaInput.addEventListener('change', function() {
        displayRecipe(pastaInput.value);
    });
});

function addIngredientOption(type) {
    const optionBox = document.createElement('div');
    let options = '';

    switch(type.toLowerCase()) {
        case 'protein':
            options = `
                <option value="chicken">Chicken breast</option>
                <option value="beef">Beef</option>
                <option value="pork">Pork</option>
                <option value="tofu">Tofu</option>
            `;
            break;
        case 'veggie':
            options = `
                <option value="carrot">Carrot</option>
                <option value="broccoli">Broccoli</option>
                <option value="spinach">Spinach</option>
                <option value="pepper">Pepper</option>
            `;
            break;
        case 'sauce':
            options = `
                <option value="tomatoSauce">Tomato Sauce</option>
                <option value="alfredo">Alfredo Sauce</option>
                <option value="pesto">Pesto</option>
                <option value="marinara">Marinara Sauce</option>
            `;
            break;
        case 'others':
            options = `
                <option value="garlic">Garlic</option>
                <option value="onion">Onion</option>
                <option value="mushroom">Mushroom</option>
                <option value="cheese">Cheese</option>
            `;
            break;
    }

    optionBox.innerHTML = `
        <label for="${type.toLowerCase()}">${type}: </label>
        <select name="${type.toLowerCase()}">
        <option value="">Select one</option>
        ${options}</select>
        
        <label for="${type.toLowerCase()}Weight">Weight (in grams): </label>
        <input type="number" name="${type.toLowerCase()}Weight">
        <br>
    `;
    

    // Insert the new ingredient option box before the ingredientsSection
    ingredientsSection.insertAdjacentElement('beforebegin', optionBox);
    
    
}

function clearIngredientOptions() {
    // Remove all dynamically added ingredient options
    const dynamicOptions = form.querySelectorAll('div');
    dynamicOptions.forEach(option => {
        if (option !== ingredientsSection && option !== ingredientOptions) {
            option.remove();
        }
    });
}



function displayRecipe(pastaType) {
    let recipe = '';
    switch(pastaType) {
        case 'Spaghetti':
            recipe = `
                <h2>Spaghetti Recipe</h2>
                <p>Ingredients:</p>
                <ul>
                    <li>200g Spaghetti</li>
                    <li>2 cloves of garlic</li>
                    <li>Olive oil</li>
                    <li>Salt and pepper</li>
                </ul>
                <p>Instructions:</p>
                <p>Cook the spaghetti according to the package instructions. In a pan, sauté garlic in olive oil until golden brown. Add cooked spaghetti to the pan and toss. Season with salt and pepper to taste.</p>
            `;
            break;
        case 'Fettuccine':
            recipe = `
                <h2>Fettuccine Alfredo Recipe</h2>
                <p>Ingredients:</p>
                <ul>
                    <li>200g Fettuccine</li>
                    <li>1 cup heavy cream</li>
                    <li>1/2 cup grated Parmesan cheese</li>
                    <li>Butter</li>
                    <li>Salt and pepper</li>
                </ul>
                <p>Instructions:</p>
                <p>Cook the fettuccine according to the package instructions. In a pan, melt butter and add heavy cream. Stir in Parmesan cheese until melted and smooth. Add cooked fettuccine to the sauce and toss. Season with salt and pepper to taste.</p>
            `;
            break;
        case 'Penne':
            recipe = `
                <h2>Penne Arrabbiata Recipe</h2>
                <p>Ingredients:</p>
                <ul>
                    <li>200g Penne</li>
                    <li>2 cloves of garlic</li>
                    <li>1 can of crushed tomatoes</li>
                    <li>Red pepper flakes</li>
                    <li>Olive oil</li>
                    <li>Salt and pepper</li>
                </ul>
                <p>Instructions:</p>
                <p>Cook the penne according to the package instructions. In a pan, sauté garlic in olive oil until golden brown. Add crushed tomatoes and red pepper flakes. Simmer for 10 minutes. Add cooked penne to the sauce and toss. Season with salt and pepper to taste.</p>
            `;
            break;
        case 'Linguine':
            recipe = `
                <h2>Linguine with Clam Sauce Recipe</h2>
                <p>Ingredients:</p>
                <ul>
                    <li>200g Linguine</li>
                    <li>2 cloves of garlic</li>
                    <li>1 can of clams</li>
                    <li>Olive oil</li>
                    <li>Parsley</li>
                    <li>Salt and pepper</li>
                </ul>
                <p>Instructions:</p>
                <p>Cook the linguine according to the package instructions. In a pan, sauté garlic in olive oil until golden brown. Add clams and their juice. Simmer for 5 minutes. Add cooked linguine to the sauce and toss. Garnish with parsley and season with salt and pepper to taste.</p>
            `;
            break;
        case 'Lasagna':
            recipe = `
                <h2>Classic Lasagna Recipe</h2>
                <p>Ingredients:</p>
                <ul>
                    <li>200g Lasagna noodles</li>
                    <li>1 lb ground beef</li>
                    <li>1 jar of marinara sauce</li>
                    <li>Ricotta cheese</li>
                    <li>Mozzarella cheese</li>
                    <li>Parmesan cheese</li>
                    <li>Salt and pepper</li>
                </ul>
                <p>Instructions:</p>
                <p>Cook the lasagna noodles according to the package instructions. In a pan, cook ground beef until browned. Add marinara sauce and simmer. In a baking dish, layer noodles, beef sauce, ricotta cheese, and mozzarella cheese. Repeat layers and top with Parmesan cheese. Bake at 375°F for 30 minutes.</p>
            `;
            break;
        default:
            recipe = '<p>Please select a pasta type to see the recipe.</p>';
    }

    // Display the recipe in the recipe section
    recipeSection.innerHTML = recipe;
}



// Home page image scroll
let currentIndex = 0;
function moveSlide(direction) {
    const container = document.querySelector('.carousel-container');
    const images = document.querySelectorAll('.carousel-container img');
    const totalImages = images.length;
    currentIndex += direction;
    if (currentIndex < 0) {
        currentIndex = totalImages - 1;
    } else if (currentIndex >= totalImages) {
        currentIndex = 0;
    }
    const offset = -currentIndex * 100;
    container.style.transform = `translateX(${offset}%)`;
}
