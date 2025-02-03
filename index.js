const nameDiv = document.getElementById("author");
const tagsDiv = document.getElementById("tags");
const quoteDiv = document.getElementById("words");
const randomBtn = document.getElementById("randomBtn");
const shareBtn = document.getElementById("shareBtn");

fetch("https://raw.githubusercontent.com/devchallenges-io/curriculum/refs/heads/main/3-javascript/challenges/group_1/data/random-quotes.json")
    .then((response) => response.json())
    .then((data) => {
        const quotes = data;

        function displayRandomQuote() {
            const randomIndex = Math.floor(Math.random() * quotes.length);
            const randomQuote = quotes[randomIndex];

            nameDiv.textContent = randomQuote.author;
            quoteDiv.textContent = `"${randomQuote.quote}"`;

            tagsDiv.innerHTML = ''; // Clear existing tags
            randomQuote.tags.forEach(tagText => {
                const tag = document.createElement('div');
                let properTag = tagText.charAt(0).toUpperCase() + tagText.slice(1);
                tag.className = 'tag';
                tag.textContent = properTag;
                tagsDiv.appendChild(tag);
            });
        }

        displayRandomQuote();

        randomBtn.addEventListener("click", displayRandomQuote);

        shareBtn.addEventListener("click", () => {
            const quoteText = `${quoteDiv.textContent} - ${nameDiv.textContent}`;
            navigator.clipboard.writeText(quoteText).then(() => {
                alert("Quote copied to clipboard!");
            }).catch(err => {
            console.error("Error copying quote: ", err);
            });
        });
    })
    .catch((error) => {
        console.error("Error fetching quotes:", error);
    });