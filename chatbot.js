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
  
    // Create a prompt that asks for structured output and a short answer
    const promptWithConstraints = `${userMessage}. Provide a structured and concise answer in no more than 15 words if applicable. If a structured format is not suitable, provide a direct answer within the word limit.`;
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: promptWithConstraints }], // Use the modified prompt
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