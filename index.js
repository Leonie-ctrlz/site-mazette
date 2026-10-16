// =====================
// HEADER — SCROLL + BURGER
// =====================
const headerPrincipal = document.getElementById("header-principal");
const headerLogo      = document.getElementById("header-logo");
const burgerBtn       = document.getElementById("burger-btn");
const menuLateral     = document.getElementById("menu-lateral");
const menuFermerBtn   = document.getElementById("menu-lateral-fermer");
const menuOverlay     = document.getElementById("menu-overlay");
const headerNav       = document.getElementById("header-nav");

let dernierScroll = 0;

// Logo réduit + nav cachée au scroll
window.addEventListener("scroll", function() {
  const scrollActuel = window.scrollY;

  // Logo réduit après 80px
  if (scrollActuel > 80) {
    headerLogo.classList.add("logo-petit");
  } else {
    headerLogo.classList.remove("logo-petit");
  }

  // Nav cachée quand on scrolle vers le bas
  const headerNav = document.getElementById("header-nav");
  if (scrollActuel > dernierScroll && scrollActuel > 100) {
    headerNav.classList.add("nav-cachee");
  } else {
    headerNav.classList.remove("nav-cachee");
  }

  dernierScroll = scrollActuel;
});

headerPrincipal.addEventListener("mouseenter", function() {
  headerNav.classList.remove("nav-cachee");
});

headerPrincipal.addEventListener("mouseleave", function() {
  if (window.scrollY > 100) {
    headerNav.classList.add("nav-cachee");
  }
});

// Ouvrir menu
burgerBtn.addEventListener("click", function() {
  menuLateral.classList.remove("menu-ferme");
  menuOverlay.classList.remove("menu-ferme");
  burgerBtn.classList.add("ouvert");
});

// Fermer menu
function fermerMenu() {
  menuLateral.classList.add("menu-ferme");
  menuOverlay.classList.add("menu-ferme");
  burgerBtn.classList.remove("ouvert");
}

menuFermerBtn.addEventListener("click", fermerMenu);
menuOverlay.addEventListener("click", fermerMenu);

document.addEventListener("keydown", function(e) {
  if (e.key === "Escape") fermerMenu();
});

// Ferme le menu au clic sur un lien
document.querySelectorAll("#menu-lateral nav a").forEach(function(lien) {
  lien.addEventListener("click", fermerMenu);
});


// =====================
// 1. LES PISTES DE L'EP
// =====================
const pistes = [
  { numero: "01", titre: "Story",                 fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628334/1_-_Story_-_Mazette.wav" },
  { numero: "02", titre: "All Sens",              fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628335/2_-_All_Sens_-_Mazette.wav" },
  { numero: "03", titre: "L'or du commun",        fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628339/3_-_L_or_du_commun_-_Mazette.wav" },
  { numero: "04", titre: "Shan",                  fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628338/4_-_Shan_-_Mazette.wav" },
  { numero: "05", titre: "A New Era",             fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628335/5_-_A_new_era_-_Mazette.wav" },
  { numero: "06", titre: "Silent",                fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628336/6_-_Silent_-_Mazette.wav" },
  { numero: "07", titre: "La symphonie de l'eau", fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628332/7_-_La_symphonie_de_l_eau_-_Mazette.wav" },
  { numero: "08", titre: "Contre ton épaule",     fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628338/8_-_Contre_ton_épaule_-_Mazette.wav" },
];

// =====================
// LECTEUR HERO — ACTU
// =====================
const actu = {
  audio    : document.getElementById("audio"),
  play     : document.getElementById("actu-play"),
  suivant  : document.getElementById("actu-suivant"),
  precedent: document.getElementById("actu-precedent"),
  nom      : document.getElementById("actu-nom"),
  numero   : document.getElementById("actu-numero"),
  barre    : document.getElementById("actu-barre"),
  actuel   : document.getElementById("actu-temps-actuel"),
  total    : document.getElementById("actu-temps-total"),
  tracklist: document.getElementById("actu-tracklist"),
};

let pisteEnCours = 0;

pistes.forEach(function(piste, index) {
  const li = document.createElement("li");
  li.innerHTML = "<span>" + piste.numero + "</span> " + piste.titre;
  li.addEventListener("click", function() {
    pisteEnCours = index;
    chargerPiste();
    actu.audio.play();
    actu.play.textContent = "⏸";
  });
  actu.tracklist.appendChild(li);
});

function chargerPiste() {
  const piste = pistes[pisteEnCours];
  actu.nom.textContent    = piste.titre;
  actu.numero.textContent = piste.numero;
  actu.audio.src          = piste.fichier;

  document.querySelectorAll("#actu-tracklist li").forEach(function(li) {
    li.classList.remove("active");
  });
  document.querySelectorAll("#actu-tracklist li")[pisteEnCours].classList.add("active");
}

actu.play.addEventListener("click", function() {
  if (actu.audio.paused) {
    if (!actu.audio.src) chargerPiste();
    actu.audio.play();
    actu.play.textContent = "⏸";
  } else {
    actu.audio.pause();
    actu.play.textContent = "▶";
  }
});

actu.suivant.addEventListener("click", function() {
  pisteEnCours = (pisteEnCours + 1) % pistes.length;
  chargerPiste();
  actu.audio.play();
  actu.play.textContent = "⏸";
});

actu.precedent.addEventListener("click", function() {
  pisteEnCours = (pisteEnCours - 1 + pistes.length) % pistes.length;
  chargerPiste();
  actu.audio.play();
  actu.play.textContent = "⏸";
});

actu.audio.addEventListener("timeupdate", function() {
  const pct = (actu.audio.currentTime / actu.audio.duration) * 100;
  actu.barre.style.width = pct + "%";
  const min = Math.floor(actu.audio.currentTime / 60);
  const sec = Math.floor(actu.audio.currentTime % 60);
  actu.actuel.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

actu.audio.addEventListener("loadedmetadata", function() {
  const min = Math.floor(actu.audio.duration / 60);
  const sec = Math.floor(actu.audio.duration % 60);
  actu.total.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

actu.audio.addEventListener("ended", function() {
  actu.suivant.click();
});

document.getElementById("actu-barre-container").addEventListener("click", function(e) {
  actu.audio.currentTime = (e.offsetX / this.offsetWidth) * actu.audio.duration;
});

chargerPiste();


// =====================
// LIGHTBOX GALERIE
// =====================
const photosGalerie  = Array.from(document.querySelectorAll(".grille-photos img"));
const lightbox       = document.getElementById("lightbox");
const lightboxImg    = document.getElementById("lightbox-img");
const btnFermer      = document.getElementById("lightbox-fermer");
const btnLbPrecedent = document.getElementById("lightbox-precedent");
const btnLbSuivant   = document.getElementById("lightbox-suivant");

let photoEnCours = 0;

function desactiverPhotos() {
  photosGalerie.forEach(function(photo) {
    photo.style.pointerEvents = "none";
  });
}

function reactiverPhotos() {
  photosGalerie.forEach(function(photo) {
    photo.style.pointerEvents = "auto";
  });
}

function ouvrirLightbox(index) {
  photoEnCours = index;
  lightboxImg.src = photosGalerie[photoEnCours].src;
  lightbox.classList.remove("lightbox-cachee");
  desactiverPhotos();
}

function fermerLightbox() {
  lightbox.classList.add("lightbox-cachee");
  setTimeout(reactiverPhotos, 400);
}

photosGalerie.forEach(function(photo, index) {
  photo.addEventListener("click", function() {
    ouvrirLightbox(index);
  });
});

btnFermer.addEventListener("click", fermerLightbox);

btnLbSuivant.addEventListener("click", function(e) {
  e.stopPropagation();
  photoEnCours = (photoEnCours + 1) % photosGalerie.length;
  lightboxImg.src = photosGalerie[photoEnCours].src;
});

btnLbPrecedent.addEventListener("click", function(e) {
  e.stopPropagation();
  photoEnCours = (photoEnCours - 1 + photosGalerie.length) % photosGalerie.length;
  lightboxImg.src = photosGalerie[photoEnCours].src;
});

lightbox.addEventListener("click", function(e) {
  if (e.target === lightbox) fermerLightbox();
});

document.addEventListener("keydown", function(e) {
  if (lightbox.classList.contains("lightbox-cachee")) return;
  if (e.key === "ArrowRight") btnLbSuivant.click();
  if (e.key === "ArrowLeft")  btnLbPrecedent.click();
  if (e.key === "Escape")     fermerLightbox();
});


// =====================
// FORMULAIRE CONTACT
// =====================
const form    = document.getElementById("form-contact");
const message = document.getElementById("message-formulaire");

message.style.display = "none";

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const data = new FormData(form);

  const response = await fetch(form.action, {
    method: "POST",
    body: data,
    headers: { "Accept": "application/json" }
  });

  if (response.ok) {
    message.style.display = "block";
    message.textContent   = "✅ Merci ! Votre message a bien été envoyé.";
    message.className     = "success";
    form.reset();
  } else {
    message.style.display = "block";
    message.textContent   = "❌ Une erreur est survenue. Réessayez plus tard.";
    message.className     = "error";
  }
});


// =====================
// RESIZER TEXTAREA
// =====================
const textarea = document.getElementById("message");

textarea.addEventListener("input", function() {
  // Vérifie si le contenu dépasse la hauteur visible
  if (textarea.scrollHeight > textarea.clientHeight) {
    textarea.classList.add("resizable");
  } else {
    textarea.classList.remove("resizable");
  }
});

// =====================
// ANIMATIONS AU SCROLL
// =====================
document.querySelectorAll(
  "#bio, #musique, #galerie, #live, #contact, " +
  ".carte-album, .carte-video, .evenement"
).forEach(function(el) {
  el.classList.add("apparait");
});

const observateur = new IntersectionObserver(
  function(entrees) {
    entrees.forEach(function(entree) {
      if (entree.isIntersecting) {
        entree.target.classList.add("visible");
        observateur.unobserve(entree.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll(".apparait").forEach(function(el) {
  observateur.observe(el);
});


window.addEventListener("beforeunload", function() {
  localStorage.setItem("mazette-piste", pisteEnCours);
  localStorage.setItem("mazette-temps", actu.audio.currentTime);
  localStorage.setItem("mazette-playing", actu.audio.paused);
});