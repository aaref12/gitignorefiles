// app.js

const searchbar = document.getElementById('searchbar');
const suggestionsList = document.getElementById('suggestions-list');
const fileContentDiv = document.getElementById('file-content');

// Function to fetch file suggestions based on search input
const fetchFileSuggestions = async (query) => {
  const response = await fetch(`/files?q=${query}`);
  const data = await response.json();
  return data;
};

// Function to fetch the content of a file
const fetchFileContent = async (fileName) => {
  const response = await fetch(`/file-content?name=${fileName}`);
  const content = await response.text();
  fileContentDiv.textContent = content;
  fileContentDiv.style.display = 'block';
};

// Event listener for the search input field
searchbar.addEventListener('input', async (e) => {
  const query = e.target.value.trim();

  if (query.length === 0) {
    suggestionsList.innerHTML = '';
    return;
  }

  const files = await fetchFileSuggestions(query);

  suggestionsList.innerHTML = files.map(file =>
    `<li>${file}</li>`
  ).join('');

  // Add click listener to suggestions
  const listItems = suggestionsList.getElementsByTagName('li');
  Array.from(listItems).forEach(item => {
    item.addEventListener('click', () => {
      searchbar.value = item.textContent;
      suggestionsList.innerHTML = '';
      fetchFileContent(item.textContent);
    });
  });
});

// Hide the suggestion list if input is cleared or loses focus
searchbar.addEventListener('blur', () => {
  setTimeout(() => {
    suggestionsList.innerHTML = '';
  }, 200);
});
