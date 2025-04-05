const form = document.getElementById('voting-form');
const results = document.getElementById('results');

// Obtener votos desde el servidor
async function fetchVotes() {
    const response = await fetch('/.netlify/functions/vote');
    const votes = await response.json();
    updateResults(votes);
}

// Enviar voto al servidor
async function sendVote(option) {
    const response = await fetch('/.netlify/functions/vote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ option })
    });
    const data = await response.json();
    if (data.success) {
        updateResults(data.votes);
    } else {
        alert(data.message);
    }
}

// Manejar el envío del formulario
form.addEventListener('submit', (event) => {
    event.preventDefault();

    const selectedOption = form.oasis.value;
    if (selectedOption) {
        sendVote(selectedOption);
    }
});

// Actualizar los resultados en la página
function updateResults(votes) {
    results.innerHTML = '';
    for (const [name, count] of Object.entries(votes)) {
        const li = document.createElement('li');
        li.textContent = `${name}: ${count} votos`;
        results.appendChild(li);
    }
}

// Cargar votos al inicio
fetchVotes();
