/*=========Navbar Scroll===========*/
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("header");
    const chatBox = document.getElementById("chat-box");
    const homeSection = document.getElementById("Home");
    
    window.addEventListener("scroll", function() {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }

        // Close chat box when scrolling out of home section
        const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
        if (window.scrollY > homeSectionBottom) {
            if (chatBox.style.display === "block") {
                chatBox.style.display = "none";
            }
        }
    });
});

import { GoogleGenerativeAI, HarmBlockThreshold, HarmCategory } from '@google/generative-ai';





async function elizaResponse(message) {
  let conversationHistory = JSON.parse(sessionStorage.getItem('conversationHistory')) || [];
  let fullResponse = 'Generating response...';

  try {
    const genAI = new GoogleGenerativeAI(getAIResponse());
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
      systemInstruction: import.meta.env.VITE_SYSTEM_INSTRUCTION,
    });

    conversationHistory.push({ role: 'user', parts: [{ text: message }] });

    const chatSession = model.startChat({
      generationConfig: {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: 'text/plain',
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold: HarmBlockThreshold.BLOCK_NONE },
        { category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_NONE },
      ],
      history: conversationHistory,
    });

    const result = await chatSession.sendMessage(message);
    fullResponse = result.response.text();
    conversationHistory.push({ role: 'model', parts: [{ text: fullResponse }] });

    sessionStorage.setItem('conversationHistory', JSON.stringify(conversationHistory));
    console.log(conversationHistory);
  } catch (error) {
    console.error('Error fetching response:', error.message);
    fullResponse =
      'An error occurred while generating the response, possibly due to high traffic or safety concerns. I apologize for any inconvenience caused. Please try again later with a different query or contact me for further assistance.';
  }

  return removeMarkdown(fullResponse);
}

console.log(import.meta.env.GEMINI_API_KEY);

function getAIResponse() {
  const response = import.meta.env.GEMINI_API_KEY;
  return atob(response);
}

function removeMarkdown(text) {
  const converter = new showdown.Converter();
  const html = converter.makeHtml(text);
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  return tempDiv.textContent || tempDiv.innerText || '';
}

const chatbotInput = document.getElementById('chatbotInput');
const chatbotBody = document.getElementById('chatbotBody');
const mobileChatbotBody = document.querySelector('#chatbotModal #chatbotBody');

chatbotInput.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    sendMessage(chatbotInput.value);
    chatbotInput.value = '';
  }
});

async function sendMessage(message) {
  chatbotBody.innerHTML += `
    <div style="text-align: right; margin-bottom: 10px; color: white;">${message}</div>
  `;

  const loadingElement = document.createElement('div');
  loadingElement.style.textAlign = 'left';
  loadingElement.style.marginTop = '20px';
  loadingElement.style.marginBottom = '10px';
  loadingElement.style.color = 'white';
  chatbotBody.appendChild(loadingElement);

  let dotCount = 0;

  let loadingInterval = setInterval(() => {
    loadingElement.textContent = 'Generating response' + '.'.repeat(dotCount);
    dotCount = (dotCount + 1) % 4;
  }, 500);

  let botReply = await elizaResponse(message);

  clearInterval(loadingInterval);
  loadingElement.textContent = botReply;
  chatbotBody.scrollTop = chatbotBody.scrollHeight;
}

async function sendMessage1(message) {
  mobileChatbotBody.innerHTML += `
    <div style="text-align: right; margin-bottom: 10px; color: white;">${message}</div>
  `;

  const loadingElement = document.createElement('div');
  loadingElement.style.textAlign = 'left';
  loadingElement.style.marginTop = '20px';
  loadingElement.style.marginBottom = '10px';
  loadingElement.style.color = 'white';
  mobileChatbotBody.appendChild(loadingElement);

  let dotCount = 0;

  let loadingInterval = setInterval(() => {
    loadingElement.textContent = 'Generating response' + '.'.repeat(dotCount);
    dotCount = (dotCount + 1) % 4;
  }, 500);

  let botReply = await elizaResponse(message);

  clearInterval(loadingInterval);
  loadingElement.textContent = botReply;
  mobileChatbotBody.scrollTop = chatbotBody.scrollHeight;
}

document.getElementById('minimizeButton').addEventListener('click', function () {
  const chatbotBody = document.getElementById('chatbotBody');
  const chatbotInput = document.getElementById('chatbotInput');
  const chatbotSendButton = document.getElementById('chatbotButton');

  if (chatbotBody.style.display !== 'none') {
    chatbotBody.style.display = 'none';
    chatbotInput.style.display = 'none';
    chatbotSendButton.style.display = 'none';
  } else {
    chatbotBody.style.display = '';
    chatbotInput.style.display = '';
    chatbotSendButton.style.display = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  const chatbotSendButton = document.getElementById('chatbotButton');
  chatbotSendButton.style.display = 'none';
  chatbotSendButton.addEventListener('click', function () {
    const chatbotInput = document.getElementById('chatbotInput');
    if (chatbotInput) {
      console.log(chatbotInput.value);
      if (chatbotInput.value.trim() !== '') {
        sendMessage(chatbotInput.value);
        chatbotInput.value = '';
      }
    } else {
      console.error('Chatbot input element not found');
    }
  });
});

const chatbotContainer = document.getElementById('chatbotContainer');

window.onload = function () {
  chatbotContainer.style.display = 'none';
  chatbotBody.style.display = 'none';
  chatbotInput.style.display = 'none';
};

const backToTopButton = document.getElementById('back-to-top');

backToTopButton.addEventListener('click', function () {
  document.getElementById('home').scrollIntoView({ behavior: 'smooth' });
});

window.addEventListener('scroll', function () {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    chatbotContainer.style.display = 'block';
    backToTopButton.style.bottom = '10px';
  } else {
    chatbotContainer.style.display = 'none';
    backToTopButton.style.bottom = '-20%';
  }
});

window.addEventListener('resize', checkModalHeight);
document.addEventListener('DOMContentLoaded', checkModalHeight);

function checkModalHeight() {
  let modalContent = document.querySelector('.services__modal-content');
  if (!modalContent) return;

  let windowHeight = window.innerHeight;
  let modalContentHeight = modalContent.scrollHeight;

  if (modalContentHeight > windowHeight) {
    modalContent.style.overflowY = 'scroll';
  } else {
    modalContent.style.overflowY = 'hidden';
  }
}

document.addEventListener('scroll', function () {
  let scrollUpButton = document.getElementById('back-to-top');
  let footer = document.querySelector('footer');

  let footerPosition = footer.getBoundingClientRect().top + window.scrollY;
  let scrollPosition = window.scrollY + window.innerHeight;

  if (scrollPosition >= footerPosition) {
    scrollUpButton.style.color = 'white';
  } else {
    scrollUpButton.style.color = '';
  }
});

document.addEventListener('DOMContentLoaded', function () {
  let chatbotContainer = document.getElementById('chatbotContainer');
  let minimizeButton = document.getElementById('minimizeButton');

  minimizeButton.addEventListener('click', function () {
    if (chatbotContainer.classList.contains('minimized')) {
      chatbotContainer.classList.remove('minimized');
      minimizeButton.innerHTML = '+';
    } else {
      chatbotContainer.classList.add('minimized');
      minimizeButton.innerHTML = '-';
    }
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const elementsToAnimate = document.querySelectorAll('.scroll-animation');

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('scroll-in-view');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  elementsToAnimate.forEach(element => {
    observer.observe(element);
  });
});

document.addEventListener('DOMContentLoaded', function () {
  // Toggle chatbot modal on mobile
  document.getElementById('chatbot-toggle').addEventListener('click', function () {
    if (window.matchMedia('(max-width: 767px)').matches) {
      const chatbotModal = document.getElementById('chatbotModal');
      if (chatbotModal.classList.contains('show')) {
        // Remove the "show" class to trigger the hide animation
        chatbotModal.classList.remove('show');
        // After animation completes, set display to none
        setTimeout(() => {
          chatbotModal.style.display = 'none';
        }, 300); // match transition duration (0.3s)
      } else {
        // Immediately override any inline display property
        chatbotModal.style.display = 'block';
        // Use a tiny delay to allow the display update then add the "show" class
        setTimeout(() => {
          chatbotModal.classList.add('show');
        }, 10);
      }
    }
  });

  // Close button event listener
  document.getElementById('closeButton').addEventListener('click', function () {
    const chatbotModal = document.getElementById('chatbotModal');
    // Remove the "show" class to trigger the hide animation
    chatbotModal.classList.remove('show');
    // After the animation completes (300ms), set display to none
    setTimeout(() => {
      chatbotModal.style.display = 'none';
    }, 300);
  });

  // Send button event listener
  document.getElementById('chatbotButton').addEventListener('click', function () {
    const chatbotInput = document.querySelector('#chatbotModal #chatbotInput');
    if (chatbotInput) {
      console.log(chatbotInput.value);
      if (chatbotInput.value.trim() !== '') {
        sendMessage1(chatbotInput.value);
        chatbotInput.value = '';
      }
    } else {
      console.error('Chatbot input element not found');
    }
  });

  // NEW: Pressing Enter in the input should also send the message
  const chatbotInput = document.querySelector('#chatbotModal #chatbotInput');
  if (chatbotInput) {
    chatbotInput.addEventListener('keydown', function (event) {
      if (event.key === 'Enter') {
        if (chatbotInput.value.trim() !== '') {
          sendMessage1(chatbotInput.value);
          chatbotInput.value = '';
        }
      }
    });
  }
});

// Scroll animation effect
document.addEventListener('DOMContentLoaded', function () {
  const elements = document.querySelectorAll('.scroll-animation');

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.3 }
  );

  elements.forEach(element => observer.observe(element));
});


/*========== scroll sections active link in navbar ==========*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');
        if(top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
};

/*========== Typing animation in home page ==========*/
var typed = new Typed(".text", {
    strings: ["Data Analytics", "Programming" , "Web Development", "Ethical Hacking","UI UX Designing"],
    typeSpeed:100,
    backSpeed:100,
    backDelay:1000,
    loop:true
});

/*========== Go top icon in left bottom ==========*/
const toTop = document.querySelector(".top");
window.addEventListener("scroll",() =>{
    if (window.pageYOffset > 100){
        toTop.classList.add("active");
    }
    else{
        toTop.classList.remove("active");
    }
})

/*========== Scroll Reveal script ==========*/
document.addEventListener('DOMContentLoaded', function () {
    const cards = document.querySelectorAll('.reveal');
    function checkScroll() {
        cards.forEach(card => {
            const rect = card.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            if (rect.top < windowHeight * 0.75) {
                card.style.opacity = 1;
                card.style.transform = 'translateY(0)';
            }
        });
    }
    checkScroll();
    window.addEventListener('scroll', checkScroll);
});
