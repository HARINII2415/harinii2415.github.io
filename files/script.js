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

function toggleChat() {
    const chatBox = document.getElementById("chat-box");
    const homeSection = document.getElementById("Home");
    const homeSectionBottom = homeSection.offsetTop + homeSection.offsetHeight;
    
    // Only toggle chat if we're in the home section
    if (window.scrollY <= homeSectionBottom) {
        chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
    }
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

async function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;

    const responseDiv = document.getElementById("chat-response");
    responseDiv.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = '';
    responseDiv.scrollTop = responseDiv.scrollHeight;

    try {
        const apiKey = process.env.GEMINI_API_KEY;
        const prompt = `
You are Nick AI, a friendly assistant in Harini A's portfolio.
Context about Harini:
- 3rd year B.Tech IT student at MKCE
- Skills: Python, ML, SQL, Data Analytics, UI/UX, Azure, Data Science
- Projects: Cardiovascular AI, HbA1c Diabetes Detection, Portfolio Website, Menstrual Cycle recommendation, skin cancer detection, online plant management
User asked: "${message}"
Respond in a friendly, helpful way using emojis where appropriate.`;

        const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + apiKey, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                contents: [{ parts: [{ text: prompt }] }]
            })
        });

        if (!res.ok) {
            throw new Error('API request failed');
        }

        const data = await res.json();
        const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I couldn't process that request 😅";
        
        responseDiv.innerHTML += `<p><strong>Nick AI:</strong> ${reply}</p>`;
        responseDiv.scrollTop = responseDiv.scrollHeight;
    } catch (error) {
        console.error('Chat error:', error);
        responseDiv.innerHTML += `<p><strong>Nick AI:</strong> I'm having trouble connecting right now. Please try again later! 😅</p>`;
        responseDiv.scrollTop = responseDiv.scrollHeight;
    }
}

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