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

async function sendMessage() {
  const input = document.getElementById("chat-input").value;
  const responseDiv = document.getElementById("chat-response");

  const prompt = `
You are an AI assistant inside Harini A's portfolio.
The user is asking: "${input}"

Respond using Harini's profile:
- BTech IT, 3rd Year, MKCE
- Projects: Cardiovascular AI, HbA1c Diabetes ML, Leaf Detection
- Skills: Python, SQL, UI/UX, Data Analytics, Azure
- Goal: To become a top IT professional and contribute to a dynamic team

Answer like a friendly assistant.`;

  const res = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=YOUR_API_KEY", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }]
    })
  });

  const data = await res.json();
  const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || "Sorry, I couldn't respond 😅";

  responseDiv.innerHTML = `<p><strong>You:</strong> ${input}</p><p><strong>Gemini:</strong> ${reply}</p>`;
  document.getElementById("chat-input").value = '';
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
