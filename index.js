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
// 2. RÉCUPÉRATION DES ÉLÉMENTS HTML
// =====================
const audio            = document.getElementById("audio");
const btnPlay          = document.getElementById("btn-play");
const btnSuivant       = document.getElementById("btn-suivant");
const btnPrecedent     = document.getElementById("btn-precedent");
const nomPiste         = document.getElementById("nom-piste");
const numeroPiste      = document.getElementById("numero-piste");
const barreProgression = document.getElementById("barre-progression");
const tempsActuel      = document.getElementById("temps-actuel");
const tempsTotal       = document.getElementById("temps-total");
const tracklist        = document.getElementById("tracklist");

// =====================
// 3. ÉTAT DU LECTEUR
// =====================
let pisteEnCours = 0;

// =====================
// 4. GÉNÉRER LA TRACKLIST
// =====================
pistes.forEach(function(piste, index) {
  const li = document.createElement("li");
  li.innerHTML = "<span>" + piste.numero + "</span> " + piste.titre;

  li.addEventListener("click", function() {
    pisteEnCours = index;
    chargerPiste();
    audio.play();
    btnPlay.textContent = "⏸";
  });

  tracklist.appendChild(li);
});

// =====================
// 5. CHARGER UNE PISTE
// =====================
function chargerPiste() {
  const piste = pistes[pisteEnCours];

  nomPiste.textContent    = piste.titre;
  numeroPiste.textContent = piste.numero;
  audio.src               = piste.fichier;

  document.querySelectorAll("#tracklist li").forEach(function(li) {
    li.classList.remove("active");
  });
  document.querySelectorAll("#tracklist li")[pisteEnCours].classList.add("active");
}

// =====================
// 6. BOUTON PLAY / PAUSE
// =====================
btnPlay.addEventListener("click", function() {
  if (audio.paused) {
    if (!audio.src) chargerPiste();
    audio.play();
    btnPlay.textContent = "⏸";
  } else {
    audio.pause();
    btnPlay.textContent = "▶";
  }
});

// =====================
// 7. BOUTONS SUIVANT / PRÉCÉDENT
// =====================
btnSuivant.addEventListener("click", function() {
  pisteEnCours = (pisteEnCours + 1) % pistes.length;
  chargerPiste();
  audio.play();
  btnPlay.textContent = "⏸";
});

btnPrecedent.addEventListener("click", function() {
  pisteEnCours = (pisteEnCours - 1 + pistes.length) % pistes.length;
  chargerPiste();
  audio.play();
  btnPlay.textContent = "⏸";
});

// =====================
// 8. BARRE DE PROGRESSION + TEMPS
// =====================
audio.addEventListener("timeupdate", function() {
  const pourcentage = (audio.currentTime / audio.duration) * 100;
  barreProgression.style.width = pourcentage + "%";

  const min = Math.floor(audio.currentTime / 60);
  const sec = Math.floor(audio.currentTime % 60);
  tempsActuel.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

audio.addEventListener("loadedmetadata", function() {
  const min = Math.floor(audio.duration / 60);
  const sec = Math.floor(audio.duration % 60);
  tempsTotal.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

// =====================
// 9. PISTE SUIVANTE AUTOMATIQUE
// =====================
audio.addEventListener("ended", function() {
  btnSuivant.click();
});

// =====================
// 10. CLIQUER SUR LA BARRE POUR AVANCER
// =====================
document.getElementById("barre-container").addEventListener("click", function(e) {
  const largeurBarre = this.offsetWidth;
  const clicPosition = e.offsetX;
  audio.currentTime = (clicPosition / largeurBarre) * audio.duration;
});

// Initialisation
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