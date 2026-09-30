// =====================
// MENU HAMBURGER
// =====================
const menuBtn     = document.getElementById("menu-btn");
const menuLateral = document.getElementById("menu-lateral");
const menuFermer  = document.getElementById("menu-fermer");
const menuOverlay = document.getElementById("menu-overlay");

// Ouvrir
menuBtn.addEventListener("click", function() {
    menuLateral.classList.remove("menu-ferme");
    menuOverlay.classList.remove("menu-ferme");
});

// Fermer via ✕
menuFermer.addEventListener("click", function() {
    menuLateral.classList.add("menu-ferme");
    menuOverlay.classList.add("menu-ferme");
});

// Fermer en cliquant sur le fond
menuOverlay.addEventListener("click", function() {
    menuLateral.classList.add("menu-ferme");
    menuOverlay.classList.add("menu-ferme");
});

// Fermer avec Échap
document.addEventListener("keydown", function(e) {
    if (e.key === "Escape") {
        menuLateral.classList.add("menu-ferme");
        menuOverlay.classList.add("menu-ferme");
    }
});


// =====================
// MINI LECTEUR — A NEW ERA
// =====================
const pistesSaved = [
    { numero: "01", titre: "Story",                 fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628334/1_-_Story_-_Mazette.wav" },
    { numero: "02", titre: "All Sens",              fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628335/2_-_All_Sens_-_Mazette.wav" },
    { numero: "03", titre: "L'or du commun",        fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628339/3_-_L_or_du_commun_-_Mazette.wav" },
    { numero: "04", titre: "Shan",                  fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628338/4_-_Shan_-_Mazette.wav" },
    { numero: "05", titre: "A New Era",             fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628335/5_-_A_new_era_-_Mazette.wav" },
    { numero: "06", titre: "Silent",                fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628336/6_-_Silent_-_Mazette.wav" },
    { numero: "07", titre: "La symphonie de l'eau", fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628332/7_-_La_symphonie_de_l_eau_-_Mazette.wav" },
    { numero: "08", titre: "Contre ton épaule",     fichier: "https://res.cloudinary.com/jyllfp1b/video/upload/v1786628338/8_-_Contre_ton_%C3%A9paule_-_Mazette.wav" },
];

const miniLecteur  = document.getElementById("mini-lecteur");
const miniAudio    = document.getElementById("mini-audio");
const miniPlay     = document.getElementById("mini-play");
const miniSuivant  = document.getElementById("mini-suivant");
const miniPrecedent = document.getElementById("mini-precedent");
const miniTitre    = document.getElementById("mini-titre");
const miniNumero   = document.getElementById("mini-numero");
const miniBarre    = document.getElementById("mini-barre");

let miniPisteEnCours = 0;

// Reprend depuis localStorage si une piste était en cours
const savedPiste   = localStorage.getItem("mazette-piste");
const savedTemps   = localStorage.getItem("mazette-temps");
const savedPlaying = localStorage.getItem("mazette-playing");

if (savedPiste) {
    miniPisteEnCours = parseInt(savedPiste);
}

function miniChargerPiste() {
    const piste = pistesSaved[miniPisteEnCours];
    miniAudio.src              = piste.fichier;
    miniTitre.textContent      = piste.titre;
    miniNumero.textContent     = piste.numero;
    miniLecteur.classList.remove("mini-cache"); // ← toujours visible
}

// Initialisation — charge toujours la piste
miniChargerPiste();

// Reprend au bon endroit seulement si musique était en cours
if (savedTemps) miniAudio.currentTime = parseFloat(savedTemps);
if (savedPlaying === "true") {
    miniAudio.play();
    miniPlay.textContent = "⏸";
}

// Play / Pause
miniPlay.addEventListener("click", function() {
    if (miniAudio.paused) {
        miniAudio.play();
        miniPlay.textContent = "⏸";
    } else {
        miniAudio.pause();
        miniPlay.textContent = "▶";
    }
});

// Suivant
miniSuivant.addEventListener("click", function() {
    miniPisteEnCours = (miniPisteEnCours + 1) % pistesSaved.length;
    miniChargerPiste();
    miniAudio.play();
    miniPlay.textContent = "⏸";
});

// Précédent
miniPrecedent.addEventListener("click", function() {
    miniPisteEnCours = (miniPisteEnCours - 1 + pistesSaved.length) % pistesSaved.length;
    miniChargerPiste();
    miniAudio.play();
    miniPlay.textContent = "⏸";
});

// Barre de progression
miniAudio.addEventListener("timeupdate", function() {
    const pct = (miniAudio.currentTime / miniAudio.duration) * 100;
    miniBarre.style.width = pct + "%";
});

document.getElementById("mini-barre-container").addEventListener("click", function(e) {
    miniAudio.currentTime = (e.offsetX / this.offsetWidth) * miniAudio.duration;
});

// Piste suivante auto
miniAudio.addEventListener("ended", function() {
    miniSuivant.click();
});


// =====================
// LECTEUR EXTRAITS CINÉMA
// =====================

// ← Tu rempliras les fichiers audio quand Mazette te les enverra
const extraits = [
    { numero: "01", titre: "Extrait 1", ambiance: "Mélancolie · Tension", fichier: "" },
    { numero: "02", titre: "Extrait 2", ambiance: "Atmosphère · Minimaliste", fichier: "" },
    { numero: "03", titre: "Extrait 3", ambiance: "Épique · Électronique", fichier: "" },
    { numero: "04", titre: "Extrait 4", ambiance: "Cinématique · Sombre", fichier: "" },
    { numero: "05", titre: "Extrait 5", ambiance: "Hybride · Expérimental", fichier: "" },
];

const extraitsAudio    = document.getElementById("extraits-audio");
const extraitsPlay     = document.getElementById("extraits-play");
const extraitsSuivant  = document.getElementById("extraits-suivant");
const extraitsPrecedent = document.getElementById("extraits-precedent");
const extraitsTitre    = document.getElementById("extraits-titre");
const extraitsNumero   = document.getElementById("extraits-numero");
const extraitsAmbiance = document.getElementById("extraits-ambiance");
const extraitsBarre    = document.getElementById("extraits-barre");
const extraitsActuel   = document.getElementById("extraits-temps-actuel");
const extraitsTotal    = document.getElementById("extraits-temps-total");
const extraitsListe    = document.getElementById("extraits-liste");

let extraitEnCours = 0;

// Génère la liste
extraits.forEach(function(extrait, index) {
    const li = document.createElement("li");
    li.innerHTML = "<span>" + extrait.numero + "</span>" + extrait.titre;
    li.addEventListener("click", function() {
        extraitEnCours = index;
        chargerExtrait();
        extraitsAudio.play();
        extraitsPlay.textContent = "⏸";
    });
    extraitsListe.appendChild(li);
});

function chargerExtrait() {
    const e = extraits[extraitEnCours];
    extraitsTitre.textContent    = e.titre;
    extraitsNumero.textContent   = e.numero;
    extraitsAmbiance.textContent = e.ambiance;
    if (e.fichier) extraitsAudio.src = e.fichier;

    document.querySelectorAll("#extraits-liste li").forEach(function(li) {
        li.classList.remove("active");
    });
    document.querySelectorAll("#extraits-liste li")[extraitEnCours]
        .classList.add("active");
}

// Play / Pause
extraitsPlay.addEventListener("click", function() {
    if (!extraits[extraitEnCours].fichier) return; // pas encore de fichier
    if (extraitsAudio.paused) {
        extraitsAudio.play();
        extraitsPlay.textContent = "⏸";
    } else {
        extraitsAudio.pause();
        extraitsPlay.textContent = "▶";
    }
});

// Suivant / Précédent
extraitsSuivant.addEventListener("click", function() {
    extraitEnCours = (extraitEnCours + 1) % extraits.length;
    chargerExtrait();
    if (extraits[extraitEnCours].fichier) { extraitsAudio.play(); extraitsPlay.textContent = "⏸"; }
});

extraitsPrecedent.addEventListener("click", function() {
    extraitEnCours = (extraitEnCours - 1 + extraits.length) % extraits.length;
    chargerExtrait();
    if (extraits[extraitEnCours].fichier) { extraitsAudio.play(); extraitsPlay.textContent = "⏸"; }
});

// Progression
extraitsAudio.addEventListener("timeupdate", function() {
    const pct = (extraitsAudio.currentTime / extraitsAudio.duration) * 100;
    extraitsBarre.style.width = pct + "%";
    const min = Math.floor(extraitsAudio.currentTime / 60);
    const sec = Math.floor(extraitsAudio.currentTime % 60);
    extraitsActuel.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

extraitsAudio.addEventListener("loadedmetadata", function() {
    const min = Math.floor(extraitsAudio.duration / 60);
    const sec = Math.floor(extraitsAudio.duration % 60);
    extraitsTotal.textContent = min + ":" + (sec < 10 ? "0" : "") + sec;
});

extraitsAudio.addEventListener("ended", function() {
    extraitsSuivant.click();
});

document.getElementById("extraits-barre-container").addEventListener("click", function(e) {
    if (!extraitsAudio.duration) return;
    extraitsAudio.currentTime = (e.offsetX / this.offsetWidth) * extraitsAudio.duration;
});

// Initialisation
chargerExtrait();