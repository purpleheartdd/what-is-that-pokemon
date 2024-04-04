// Waits for the DOM to fully load before running the script
document.addEventListener('DOMContentLoaded', function () {
    // Fetches a list of Pokémon from the API
    fetch('https://pokeapi.co/api/v2/pokemon?limit=9')
        .then(response => response.json())
        .then(data => {
            // Gets the container where Pokémon cards will be displayed
            const pokemonDisplay = document.getElementById('pokemonDisplay');

            // Iterates over each Pokémon in the fetched list
            data.results.forEach(pokemon => {
                // Fetches detailed information for each Pokémon
                fetch(pokemon.url)
                    .then(response => response.json())
                    .then(pokemonDetails => {
                        // Creates the card structure for each Pokémon
                        const pokemonCard = document.createElement('div');
                        pokemonCard.classList.add('pokemon-card');

                        const pokemonFlipper = document.createElement('div');
                        pokemonFlipper.classList.add('pokemon-flipper');

                        // Sets up the front side of the card (Shadow)
                        const pokemonFront = document.createElement('div');
                        pokemonFront.classList.add('pokemon-front');
                        const pokemonShadow = document.createElement('img');
                        pokemonShadow.src = pokemonDetails.sprites.front_default;
                        pokemonShadow.classList.add('pokemon-shadow');
                        // Applies a CSS filter for the shadow effect
                        pokemonShadow.style.filter = 'brightness(0) invert(1)';
                        pokemonFront.appendChild(pokemonShadow);

                        // Sets up the back side of the card (Original image and name)
                        const pokemonBack = document.createElement('div');
                        pokemonBack.classList.add('pokemon-back');
                        const pokemonImage = document.createElement('img');
                        pokemonImage.src = pokemonDetails.sprites.front_default;
                        pokemonImage.classList.add('pokemon-image');
                        const pokemonName = document.createElement('div');
                        pokemonName.textContent = pokemonDetails.name;
                        pokemonName.classList.add('pokemon-name');
                        pokemonBack.appendChild(pokemonImage);
                        pokemonBack.appendChild(pokemonName);

                        // Assembles the card and adds it to the display
                        pokemonFlipper.appendChild(pokemonFront);
                        pokemonFlipper.appendChild(pokemonBack);
                        pokemonCard.appendChild(pokemonFlipper);
                        pokemonDisplay.appendChild(pokemonCard);

                        // Adds a click event listener to each card to handle flipping
                        pokemonCard.addEventListener('click', function () {
                            pokemonCard.classList.toggle('flipped');
                        });
                    });
            });
        });
});
