async function fetchAndDisplayPokemon(offset, limit) {
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data = await response.json();
        const pokemonArray = data.results;

        for (const pokemon of pokemonArray) {
            const pokemonResponse = await fetch(pokemon.url);
            const pokemonData = await pokemonResponse.json();

            const pokemonCard = document.createElement('div');
            pokemonCard.classList.add('pokemon-card');

            const nameElement = document.createElement('h2');
            nameElement.textContent = `Name : ${pokemonData.name}`;

            const image = document.createElement('img');
            image.src = pokemonData.sprites.front_default;

            pokemonCard.addEventListener('click', () => {
                openModal(pokemonData);
            });

            pokemonCard.appendChild(nameElement);
            pokemonCard.appendChild(image);

            pokemonList.appendChild(pokemonCard);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des données Pokémon :', error);
    }
}

function openModal(pokemonData) {
    const modalContainer = document.getElementById('modal-container');
    const modalContent = document.getElementById('modal-content');
    
    // Clear previous content
    modalContent.innerHTML = '';

    const nameElement = document.createElement('h2');
    nameElement.textContent = `Nom: ${pokemonData.name}`;

    const image = document.createElement('img');
    image.src = pokemonData.sprites.front_default;

    const typesElement = document.createElement('p');
    typesElement.textContent = `Types: ${pokemonData.types.map(type => type.type.name).join(', ')}`;

    const abilitiesElement = document.createElement('p');
    abilitiesElement.textContent = `Abilities: ${pokemonData.abilities.map(ability => ability.ability.name).join(', ')}`;

    const heightElement = document.createElement('p');
    heightElement.textContent = `Height: ${pokemonData.height / 10} m`; // Convert to meters

    const weightElement = document.createElement('p');
    weightElement.textContent = `Weight: ${pokemonData.weight / 10} kg`; // Convert to kilograms

    modalContent.appendChild(nameElement);
    modalContent.appendChild(image);
    modalContent.appendChild(typesElement);
    modalContent.appendChild(abilitiesElement);
    modalContent.appendChild(heightElement);
    modalContent.appendChild(weightElement);

    // Show the modal
    modalContainer.style.display = 'flex';
}

function closeModal() {
    const modalContainer = document.getElementById('modal-container');
    
    // Hide the modal
    modalContainer.style.display = 'none';
}

// Close the modal when clicking outside the modal content
const modalContainer = document.getElementById('modal-container');
modalContainer.addEventListener('click', closeModal);

// Prevent the modal from closing when clicking inside the modal content
const modalContent = document.getElementById('modal-content');
modalContent.addEventListener('click', (event) => {
    event.stopPropagation();
});

// Close the modal when pressing the Escape key
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeModal();
    }
});

const searchButton = document.getElementById('searchButton');
const pokemonNameInput = document.getElementById('pokemonName');
const pokemonList = document.getElementById('pokemon-list');

function searchPokemon() {
    const searchTerm = pokemonNameInput.value.toLowerCase();
    const pokemonCards = document.querySelectorAll('.pokemon-card');

    pokemonCards.forEach(card => {
        const nameElement = card.querySelector('h2');
        const pokemonName = nameElement.textContent.toLowerCase();

        if (pokemonName.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
}

// Appuyer sur la touche "Entrée" pour rechercher
pokemonNameInput.addEventListener('keyup', event => {
    if (event.key === 'Enter') {
        searchPokemon();
    }
});

searchButton.addEventListener('click', searchPokemon);

// Afficher les 50 Pokémon initiaux
const limit = 50;
fetchAndDisplayPokemon(0, limit);
