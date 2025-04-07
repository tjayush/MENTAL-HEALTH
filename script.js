/**
 * script.js
 * Handles general page interactions like mobile navigation and API calls.
 */
document.addEventListener('DOMContentLoaded', function() {

    // --- Mobile Navigation Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    // Check if elements exist before adding listeners
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle the 'active' class to show/hide the mobile menu
            navLinks.classList.toggle('active');
        });

        // Optional: Close the mobile menu when a link is clicked
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                // Only remove 'active' if the menu is currently active (visible)
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            });
        });
    } else {
        console.warn("Menu toggle or nav links element not found.");
    }

    // --- API Integration: Fetch Random Quote ---
    // Fetches a random quote from Quotable API (no key needed)

    function fetchQuote() {
        const apiResourceSection = document.getElementById('api-resource-section'); // Get the target div
        const loadingMessage = `<p style="text-align: center; color: #777;">Loading daily quote...</p>`;
        const errorMessage = `<p style="text-align: center; color: #e74c3c;">Could not load quote at this time.</p>`;

        // API endpoint for a random quote
        const apiUrl = 'https://api.quotable.io/random';

        // Display loading message if the section exists
        if (apiResourceSection) {
            apiResourceSection.innerHTML = loadingMessage;
        } else {
            console.warn("API resource section not found in HTML.");
            return; // Exit if the target element doesn't exist
        }

        // --- Fetch Request ---
        fetch(apiUrl)
            .then(response => {
                // Check if the request was successful (status code 200-299)
                if (!response.ok) {
                    // Throw an error to be caught by the .catch block
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                // Parse the JSON response
                return response.json();
            })
            .then(data => {
                console.log("Quote loaded:", data); // Log the data for debugging

                // Clear loading message
                if (apiResourceSection) apiResourceSection.innerHTML = '';

                // Check if quote data is valid
                if (data && data.content && data.author) {
                    // Create HTML elements to display the quote
                    const quoteContainer = document.createElement('div');
                    quoteContainer.classList.add('quote-container'); // Add a class for styling

                    const quoteText = document.createElement('blockquote');
                    quoteText.textContent = `"${data.content}"`; // Display quote content

                    const quoteAuthor = document.createElement('cite');
                    quoteAuthor.textContent = `— ${data.author}`; // Display author

                    quoteContainer.appendChild(quoteText);
                    quoteContainer.appendChild(quoteAuthor);

                    // Append the quote to the designated section
                    if (apiResourceSection) apiResourceSection.appendChild(quoteContainer);

                } else {
                    // Handle cases where data is missing or invalid
                    console.warn("Invalid quote data received:", data);
                    if (apiResourceSection) apiResourceSection.innerHTML = errorMessage;
                }
            })
            .catch(error => {
                // Handle errors during the fetch operation (network error, etc.)
                console.error("Error fetching quote:", error);
                if (apiResourceSection) {
                     apiResourceSection.innerHTML = errorMessage; // Display error message
                }
            });
         // --- End of Fetch Request ---
    }

    // --- Initializations ---

    // Call fetchQuote function when the page loads to get a quote
    fetchQuote();

    // --- Add other general page interactions here ---

}); // End DOMContentLoaded

















document.addEventListener("DOMContentLoaded", function () {
    const chatbotContainer = document.getElementById("chatbot-container");
    const closeBtn = document.getElementById("close-btn");
    const sendBtn = document.getElementById("send-btn");
    const chatBotInput = document.getElementById("chatbot-input");
    const chatbotMessages = document.getElementById("chatbot-messages");
    const chatbotIcon = document.getElementById("chatbot-icon");
  
    chatbotIcon.addEventListener("click", () => {
      chatbotContainer.classList.remove("hidden");
      chatbotIcon.style.display = "none";
    });
    closeBtn.addEventListener("click", () => {
      chatbotContainer.classList.add("hidden");
      chatbotIcon.style.display = "flex";
    });
  
    sendBtn.addEventListener("click", sendMessage);
  
    chatBotInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") sendMessage();
    });
  });
  
  function sendMessage() {
    const userMessage = document.getElementById("chatbot-input").value.trim();
    if (userMessage) {
      appendMessage("user", userMessage);
      document.getElementById("chatbot-input").value = ""; // Clear the input field
      getBotResponse(userMessage);
    }
  }
  
  function appendMessage(sender, message) {
    const messageContainer = document.getElementById("chatbot-messages");
    const messageElement = document.createElement("div");
    messageElement.classList.add("message", sender);
    messageElement.textContent = message;
    messageContainer.appendChild(messageElement);
    messageContainer.scrollTop = messageContainer.scrollHeight;
  }
  
  async function getBotResponse(userMessage) {
    // **SECURITY WARNING**: Do not expose your API key directly in client-side code.
    // This is highly insecure. The API key should be handled on a backend server.
    // Consider setting up a backend (e.g., using Node.js, Python with Flask/Django)
    // to proxy the requests to the Gemini API.
  
    // **Important**: The API key below is likely invalid and should be replaced with your actual API key.
    // Also, ensure the API endpoint is correct for the Gemini model you intend to use.
    const API_KEY = "AIzaSyCRLNgX2gFKurk4H4i5lTCo8ftGdwJI-bE";
    // **Check the official Google AI documentation for the correct API URL for the Gemini API.**
    const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`;
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: userMessage }],
            },
          ],
        }),
      });
  
      const data = await response.json();
  
      if (!data.candidates || !data.candidates.length) {
        throw new Error("No response from Gemini API");
      }
  
      const botMessage = data.candidates[0].content.parts[0].text;
      appendMessage("bot", botMessage);
    } catch (error) {
      console.error("Error:", error);
      appendMessage(
        "bot",
        "Sorry, I'm having trouble responding. Please try again."
      );
    }
  }