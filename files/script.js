/*=========Navbar Scroll===========*/
document.addEventListener("DOMContentLoaded", function() {
    const navbar = document.getElementById("header");
    window.addEventListener("scroll", function() {
      if (window.scrollY > 50) { // Adjust the value to your preference
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
    });
});

function toggleChat() {
    const chatBox = document.getElementById("chat-box");
    chatBox.style.display = chatBox.style.display === "none" ? "block" : "none";
}

function handleKeyPress(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
}

function sendMessage() {
    const input = document.getElementById("chat-input");
    const message = input.value.trim();
    if (!message) return;

    const responseDiv = document.getElementById("chat-response");
    responseDiv.innerHTML += `<p><strong>You:</strong> ${message}</p>`;
    input.value = '';

    // Simple response logic based on keywords
    let response = "I'm sorry, I don't understand that. Can you please try asking something else?";

    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi")) {
        response = "Hello! How can I help you today? 😊 Ask about projects,skills and experience 😶‍🌫️ ";
    } else if (lowerMessage.includes("skills")) {
        response = "Harini is skilled in Python, ML, SQL, Data Analytics, UI/UX, Azure, and Data Science! 💻";
    } else if (lowerMessage.includes("projects")) {
        response = "Harini has worked on several projects including Cardiovascular AI, HbA1c Diabetes Detection, Portfolio Website, and more! 🚀";
    } else if (lowerMessage.includes("contact")) {
        response = "You can contact Harini through email at harinii2415@gmail.com or connect on LinkedIn! 📧";
    } else if (lowerMessage.includes("education") || lowerMessage.includes("study")) {
        response = "Harini is a 3rd year B.Tech IT student at MKCE with a CGPA of 7.2! 🎓";
    } else if (lowerMessage.includes("experience")) {
        response = "Check out Harini's certifications and experience in the timeline section! 💼";
    } else if (lowerMessage.includes("harini")) {
        response = "Hi! Let me tell you about Harini! 👋 She's a passionate IT engineer and third-year B.Tech student who loves programming and technology. She's skilled in Python, Web Development, and Data Analytics. She's created several impressive projects like the Cardiovascular AI system and SkyMate weather app. Want to know more about her skills or projects? Just ask! 😊";
    }

    responseDiv.innerHTML += `<p><strong>Nick AI:</strong> ${response}</p>`;
    responseDiv.scrollTop = responseDiv.scrollHeight;
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
            // Close chat when changing sections
            if (id !== 'Home') {
                const chatBox = document.getElementById("chat-box");
                if (chatBox.style.display === "block") {
                    chatBox.style.display = "none";
                }
            }
            
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
