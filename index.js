// =====================
// 1. LES PISTES DE L'EP
// =====================
// C'est un tableau d'objets : chaque objet = une piste
const pistes = [
  { numero: "01", titre: "Story",         fichier:"audio/TITRE A NEW ERA/1 - Story - Mazette.wav" },
  { numero: "02", titre: "All Sens",     fichier: "audio/TITRE A NEW ERA/2 - All Sens - Mazette.wav" },
  { numero: "03", titre: "L'or du commun",       fichier: "audio/TITRE A NEW ERA/3 - L'or du commun - Mazette.wav" },
  { numero: "04", titre: "Shan",         fichier:"audio/TITRE A NEW ERA/4 - Shan - Mazette.wav" },
  { numero: "05", titre: "A New Era",         fichier:"audio/TITRE A NEW ERA/5 - A new era - Mazette.wav" },
  { numero: "06", titre: "Silent",         fichier:"audio/TITRE A NEW ERA/6 - Silent - Mazette.wav" },
  { numero: "07", titre: "La symphonie de l'eau",         fichier:"audio/TITRE A NEW ERA/7 - La symphonie de l'eau - Mazette.wav" },
  { numero: "08", titre: "Contre ton épaule",         fichier:"audio/TITRE A NEW ERA/8 - Contre ton épaule - Mazette.wav" },
];

// =====================
// 2. RÉCUPÉRATION DES ÉLÉMENTS HTML
// =====================
const audio        = document.getElementById("audio");        
const btnPlay      = document.getElementById("btn-play");
const btnSuivant   = document.getElementById("btn-suivant");
const btnPrecedent = document.getElementById("btn-precedent");
const nomPiste     = document.getElementById("nom-piste");
const numeroPiste  = document.getElementById("numero-piste");
const barreProgression = document.getElementById("barre-progression");
const tempsActuel  = document.getElementById("temps-actuel");
const tempsTotal   = document.getElementById("temps-total");
const tracklist    = document.getElementById("tracklist");

// =====================
// 3. ÉTAT DU LECTEUR
// =====================
let pisteEnCours = 0;  // index de la piste jouée (0 = première piste)

// =====================
// 4. GÉNÉRER LA TRACKLIST
// =====================
// On crée un <li> pour chaque piste dans le tableau
pistes.forEach(function(piste, index) {
  const li = document.createElement("li");
  li.innerHTML = "<span>" + piste.numero + "</span>" + piste.titre;

  // Au clic sur une piste de la liste → on la joue
  li.addEventListener("click", function() {
    pisteEnCours = index   // 
    chargerPiste();
    audio.play();
    btnPlay.textContent = "⏸";
  });

  tracklist.appendChild(li);  // ajoute le <li> dans le <ul>
});

// =====================
// 5. CHARGER UNE PISTE
// =====================
function chargerPiste() {
  const piste = pistes[pisteEnCours];

  // Mettre à jour l'affichage
  nomPiste.textContent    = piste.titre;    
  numeroPiste.textContent = piste.numero;
  audio.src               = piste.fichier;

  // Mettre à jour la classe "active" dans la tracklist
  document.querySelectorAll("#tracklist li").forEach(function(li) {
    li.classList.remove("active");
  });
  document.querySelectorAll("#tracklist li")[pisteEnCours]
    .classList.add("active");            
}

// =====================
// 6. BOUTON PLAY / PAUSE
// =====================
btnPlay.addEventListener("click", function() {
  if (audio.paused) {
    // Si aucune piste chargée, charger la première
    if (!audio.src) chargerPiste();
    audio.play();                    // ← méthode pour jouer l'audio
    btnPlay.textContent = "⏸";
  } else {
    audio.pause();                    // ← méthode pour mettre en pause
    btnPlay.textContent = "▶";
  }    
});

// =====================
// 7. BOUTONS SUIVANT / PRÉCÉDENT
// =====================
btnSuivant.addEventListener("click", function() {
  pisteEnCours = (pisteEnCours + 1) % pistes.length;
  // % pistes.length : revient à 0 après la dernière piste
  chargerPiste();
  audio.play();
  btnPlay.textContent = "⏸";
});

btnPrecedent.addEventListener("click", function() {
  pisteEnCours = (pisteEnCours - 1 + pistes.length) % pistes.length;
  // + pistes.length : évite d'aller en négatif
  chargerPiste();
  audio.play();
  btnPlay.textContent = "⏸";
});

// =====================
// 8. BARRE DE PROGRESSION + TEMPS
// =====================
audio.addEventListener("timeupdate", function() {
  // Calcul du pourcentage écoulé
  const pourcentage = (audio.currentTime / audio.duration) * 100;
  barreProgression.style.width = pourcentage + "%";

  // Formatage du temps actuel (ex: 1:05)
  const min = Math.floor(audio.currentTime / 60);
  const sec = Math.floor(audio.currentTime % 60);
  tempsActuel.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

// Afficher la durée totale quand l'audio est chargé
audio.addEventListener("loadedmetadata", function() {
  const min = Math.floor(audio.duration / 60);
  const sec = Math.floor(audio.duration % 60);
  tempsTotal.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

// =====================
// 9. PISTE SUIVANTE AUTOMATIQUE
// =====================
audio.addEventListener("ended", function() {
  btnSuivant.click();   // simule un clic sur "suivant" quand la piste se termine
});

// =====================
// 10. CLIQUER SUR LA BARRE POUR AVANCER
// =====================
document.getElementById("barre-container").addEventListener("click", function(e) {
  const largeurBarre = this.offsetWidth;
  const clicPosition = e.offsetX;                    // position du clic en px
  audio.currentTime  = (clicPosition / largeurBarre) * audio.duration;
});

// Initialisation : charger la première piste sans la jouer
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

// Désactive les clics sur toutes les photos
function desactiverPhotos() {
  photosGalerie.forEach(function(photo) {
    photo.style.pointerEvents = "none";
  });
}

// Réactive les clics sur toutes les photos
function reactiverPhotos() {
  photosGalerie.forEach(function(photo) {
    photo.style.pointerEvents = "auto";
  });
}

function ouvrirLightbox(index) {
  photoEnCours = index;
  lightboxImg.src = photosGalerie[photoEnCours].src;
  lightbox.classList.remove("lightbox-cachee");
  desactiverPhotos(); // ← les photos ne répondent plus aux clics
}

function fermerLightbox() {
  lightbox.classList.add("lightbox-cachee");
  setTimeout(reactiverPhotos, 400); // ← réactive après 400ms
}

// Clics sur les photos
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


//BTN ENVOYER - FORMULAIRE
const form = document.getElementById("form-contact");
const message = document.getElementById("message-formulaire");

form.addEventListener("submit", async function (e) {

    e.preventDefault();

    const data = new FormData(form);

    const response = await fetch(form.action, {
        method: "POST",
        body: data,
        headers: {
            "Accept": "application/json"
        }
    });

    if (response.ok) {
        message.style.display = "block";
        message.textContent = "✅ Merci ! Votre message a bien été envoyé.";
        message.className = "success";

        form.reset();

    } else {
        message.style.display = "block";
        message.textContent = "❌ Une erreur est survenue. Réessayez plus tard.";
        message.className = "error";

    }

});


// =====================
// ANIMATIONS AU SCROLL
// =====================

// 1. Ajoute la classe "apparait" sur les éléments à animer
document.querySelectorAll(
  "#bio, #musique, #galerie, #live, #contact, " +
  ".carte-album, .carte-video, .evenement"
).forEach(function(el) {
  el.classList.add("apparait");
});

// 2. Crée l'observateur
const observateur = new IntersectionObserver(
  function(entrees) {
    entrees.forEach(function(entree) {
      if (entree.isIntersecting) {
        // L'élément est visible → on déclenche l'animation
        entree.target.classList.add("visible");
        // On arrête d'observer cet élément (animation une seule fois)
        observateur.unobserve(entree.target);
      }
    });
  },
  {
    threshold: 0.15  // Se déclenche quand 15% de l'élément est visible
  }
);

// 3. Observe chaque élément
document.querySelectorAll(".apparait").forEach(function(el) {
  observateur.observe(el);
});