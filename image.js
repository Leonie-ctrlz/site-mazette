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
// SCROLL-BAS
// =====================
const heroBtn = document.getElementById("hero-btn");
if (heroBtn) {
    heroBtn.addEventListener("click", function(e) {
        e.preventDefault();
        document.getElementById("apropos-image").scrollIntoView({
            behavior: "smooth"
        });
    });
}


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

// =====================
// FILTRES RÉALISATIONS
// =====================
const filtres = document.querySelectorAll(".filtre");
const projets = document.querySelectorAll(".carte-projet");

if (filtres.length > 0) {
    filtres.forEach(function(btn) {
        btn.addEventListener("click", function() {
            filtres.forEach(function(f) { f.classList.remove("actif"); });
            btn.classList.add("actif");

            const filtre = btn.dataset.filtre;

            projets.forEach(function(projet) {
                if (filtre === "tous" || projet.dataset.categorie === filtre) {
                    projet.classList.remove("cachee");
                } else {
                    projet.classList.add("cachee");
                }
            });
        });
    });
}