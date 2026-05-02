const books = [
  {
    title: "The Cursed Alpha King's Forbidden Fallen Angel",
    genre: "Werewolf Romance",
    blurb: "Hauntedby visions of wings, war, and awolf she can't escape, Lumina's ordinary lifeshatters when she meets the dangerously magnetic Kael Draven. AS hidden supernaturl rise, she discovers her blood carries a power that could rewrite the balance between heaven and earth.",
    stars: "⭐⭐⭐⭐☆",
    quote: "\"Electrifying and beautifully angelic.\"",
    cover: "images/angel.png",
    readUrl: "https://api.novelbars.com/share?share_token=gJYORlQjVHqNMy0hUu8IEVDgIzGkS+2XCbSBCKbTpl8=", 
    platforms: ["Novelbars"]
  },
  {
    title: "Reborn of the CEO's Cold-hearted Wife",
    genre: "Billioniare Romance",
    blurb: "Reborn one year before her life was torn apart, Aurora Steele is determined to save her daughter and destroy the sister who stole everything—even if it means turning her cold, calculating husband into an unwilling ally. But as buried truths surface and Xavier begins to see her in a new light, revenge becomes a dangerous game where love, betrayal, and blood are impossible to separate.",
    stars: "⭐⭐⭐⭐⭐",
    quote: "\"Tender, sharp, unforgettable.\"",
    cover: "images/wife.jpg",
    readUrl: "https://www.goodnovel.com/book/Reborn-Of-The-CEO-s-Cold-Hearted-Wife_31001134702",
    platforms: ["Goodnovel"]
  },
  {
    title: "Rebirth of the Heiress and the Tycoon's Lover",
    genre: "Billioniare Romance",
    blurb: "Reborn on the night she once sealed her tragic fate, Alina Dawn refuses to betray the only man who ever loved her—the dangerously powerful Lucian Blackwood—unaware that he, too, remembers everything. As secrets unravel and past lies collide with a shifting future, she must fight not just to change her destiny, but to survive a game far bigger than she ever imagined.",
    stars: "⭐⭐⭐⭐☆",
    quote: "\"A high-concept page-turner with heart.\"",
    cover: "images/heiress.jpg",
    readUrl: "https://fqnewapi.novellairs.com/share?share_token=4vZBPKi2RqYnd4z9Xen8FNE5C1Lijj1BsHtCt0J2fmQ=",
    platforms: ["Novellair"]
  },
{
    title: "Revenge of the Mafia's Don Babymama",
    genre: "Mafia Romance",
    blurb: "Written as letters to the moon, this luminous collection explores migration, memory, and the gravity of love.",
    stars: "⭐⭐⭐⭐⭐",
    quote: "\"Pure atmosphere and elegance.\"",
    cover: "images/don.png",
    readUrl: "",
    platforms: ["Upcoming"]
  },
  {
    title: "Rebirth of the Heiress and the Tycoon's Lover",
    genre: "Billionaire Romance",
    blurb: "When an acclaimed poet vanishes from a mountain retreat, six strangers uncover secrets etched into an unfinished manuscript.",
    stars: "⭐⭐⭐⭐☆",
    quote: "\"Suspenseful and deeply moving.\"",
    cover: "images/rebirth.jpg",
    readUrl: "",
    platforms: ["Upcoming"]
  },
  {
    title: "The Devil in his Skin [Upcoming]",
    genre: "Dark Mafia Romance",
    blurb: "Upcoming.",
    // stars: "⭐⭐⭐⭐⭐",
    //quote: "\"A triumphant finale.\"",
    cover: "images/skin.png",
    readUrl: "",
    platforms: ["Upcoming"]
  }
];

const modal = document.getElementById("book-modal");
const modalCover = document.getElementById("modal-cover");
const modalTitle = document.getElementById("modal-title");
const modalGenre = document.getElementById("modal-genre");
const modalBlurb = document.getElementById("modal-blurb");
const modalStars = document.getElementById("modal-stars");
const modalQuote = document.getElementById("modal-quote");
const modalPlatforms = document.getElementById("modal-platforms");
const modalRead = document.getElementById("modal-read");

function openBookModal(index) {
  const book = books[index];
  if (!book || !modal) return;

  modalCover.src = book.cover;
  modalCover.alt = `Cover of ${book.title}`;
  modalTitle.textContent = book.title;
  modalGenre.textContent = book.genre;
  modalBlurb.textContent = book.blurb;
  modalStars.textContent = book.stars;
  modalQuote.textContent = book.quote;
  modalRead.href = book.readUrl;

  modalPlatforms.innerHTML = "";
  book.platforms.forEach((platform) => {
    const link = document.createElement("a");
    link.href = book.readUrl;
    link.target = "_blank";
    link.rel = "noreferrer";
    link.textContent = platform;
    modalPlatforms.appendChild(link);

  });

  modal.showModal();
}

document.querySelectorAll(".book-card").forEach((card) => {
  card.querySelector(".view-more")?.addEventListener("click", (event) => {
    event.preventDefault();
    openBookModal(card.dataset.book);
  });
});

document.querySelector(".close-modal")?.addEventListener("click", () => modal?.close());
modal?.addEventListener("click", (event) => {
  const dialogDimensions = modal.getBoundingClientRect();
  const isInDialog =
    dialogDimensions.top <= event.clientY &&
    event.clientY <= dialogDimensions.top + dialogDimensions.height &&
    dialogDimensions.left <= event.clientX &&
    event.clientX <= dialogDimensions.left + dialogDimensions.width;
  if (!isInDialog) modal.close();
});

const reveals = document.querySelectorAll(".reveal");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("visible");
    });
  },
  { threshold: 0.18 }
);
reveals.forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll("main section");
const navLinks = document.querySelectorAll(".nav-links a");
const header = document.querySelector(".site-header");
const bgGlow = document.querySelector(".bg-glow");

let ticking = false;
function onScrollEffects() {
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? Math.min((scrollTop / maxScroll) * 100, 100) : 0;
  document.documentElement.style.setProperty("--scroll-progress", `${progress}%`);

  if (header) header.classList.toggle("scrolled", scrollTop > 18);

  if (bgGlow) {
    const parallaxY = Math.min(scrollTop * 0.12, 80);
    bgGlow.style.transform = `translate3d(0, ${parallaxY}px, 0)`;
  }

  let current = "home";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 140;
    if (scrollTop >= sectionTop) current = section.id;
  });

  navLinks.forEach((link) => {
    const isCurrent = link.getAttribute("href") === `#${current}`;
    link.classList.toggle("active", isCurrent);
  });

  ticking = false;
}

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(onScrollEffects);
    ticking = true;
  }
});
window.addEventListener("load", onScrollEffects);

const menuBtn = document.querySelector(".menu-toggle");
const navList = document.querySelector(".nav-links");
menuBtn?.addEventListener("click", () => navList?.classList.toggle("open"));
navLinks.forEach((link) => {
  link.addEventListener("click", () => navList?.classList.remove("open"));
});

const heroImage = document.querySelector(".hero-image");
const heroWrap = document.querySelector(".hero-image-wrap");

heroWrap?.addEventListener("mousemove", (event) => {
  if (!heroImage) return;
  const rect = heroWrap.getBoundingClientRect();
  const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
  const y = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
  heroImage.style.transform = `rotateY(${x}deg) rotateX(${y}deg) translateY(-4px)`;
});

heroWrap?.addEventListener("mouseleave", () => {
  if (!heroImage) return;
  heroImage.style.transform = "rotateY(0deg) rotateX(0deg) translateY(0)";
});

// Handle contact form submission
const contactForm = document.querySelector('.contact-form');
contactForm?.addEventListener('submit', function(e) {
  e.preventDefault();
  
  const inputs = contactForm.querySelectorAll('input, select, textarea');
  const name = inputs[0].value;
  const email = inputs[1].value;
  const reason = inputs[2].value;
  const message = inputs[3].value;
  
  const subject = `Contact from ${name}: ${reason}`;
  const body = `From: ${name}\nEmail: ${email}\nReason: ${reason}\n\nMessage:\n${message}`;
  
  const mailto = `mailto:thesage196@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  
  window.location.href = mailto;
});