const wordInput = document.getElementById('wordInput');
const addWordBtn = document.getElementById('addWordBtn');
const meaningDisplay = document.getElementById('meaningDisplay');
const flashcardsContainer = document.getElementById('flashcards');
const randomBtn = document.getElementById('randomBtn');
const randomFlashcardDiv = document.getElementById('randomFlashcard');

// Load saved flashcards from localStorage
let flashcards = JSON.parse(localStorage.getItem('flashcards')) || [];

// Display any saved flashcards on load
renderFlashcards();

// Fetch meaning and add word
addWordBtn.addEventListener('click', async () => {
  const word = wordInput.value.trim();
  if (!word) return alert('Please enter a word.');

  try {
    const res = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`);
    if (!res.ok) throw new Error('Word not found');
    const data = await res.json();
    const meaning = data[0].meanings[0].definitions[0].definition;

    meaningDisplay.innerHTML = `<strong>${word}:</strong> ${meaning}`;

    // Save flashcard
    const card = { word, meaning };
    flashcards.push(card);
    localStorage.setItem('flashcards', JSON.stringify(flashcards));
    renderFlashcards();

  } catch (err) {
    meaningDisplay.innerHTML = `❌ Could not find meaning for "${word}".`;
  }

  wordInput.value = '';
});

// Render flashcards
function renderFlashcards() {
  flashcardsContainer.innerHTML = '';
  flashcards.forEach(card => {
    const div = document.createElement('div');
    div.className = 'flashcard';
    div.innerHTML = `<strong>${card.word}</strong><br>${card.meaning}`;
    flashcardsContainer.appendChild(div);
  });
}

// Show random flashcard
randomBtn.addEventListener('click', () => {
  if (flashcards.length === 0) {
    randomFlashcardDiv.textContent = 'No flashcards saved yet.';
    return;
  }
  const randomCard = flashcards[Math.floor(Math.random() * flashcards.length)];
  randomFlashcardDiv.innerHTML = `<strong>${randomCard.word}</strong><br>${randomCard.meaning}`;
});
