document.addEventListener("DOMContentLoaded", () => {


    // --- HAMBURGER MENU ---
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");

if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("open");
        navLinks.classList.toggle("open");
        // Bloquer le scroll quand le menu est ouvert
        document.body.style.overflow = 
            navLinks.classList.contains("open") ? "hidden" : "auto";
    });

    // Fermer le menu en cliquant sur un lien
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            hamburger.classList.remove("open");
            navLinks.classList.remove("open");
            document.body.style.overflow = "auto";
        });
    });
}
    
    // --- GESTION DU CARROUSEL (Changement toutes les 6s) ---
    const slides = document.querySelectorAll(".slide");
    let currentSlide = 0;
    const slideInterval = 6000; // 6 secondes

    function nextSlide() {
        // Enlever la classe active de la slide courante
        slides[currentSlide].classList.remove("active");
        
        // Calculer l'index de la prochaine slide
        currentSlide = (currentSlide + 1) % slides.length;
        
        // Ajouter la classe active à la nouvelle slide
        slides[currentSlide].classList.add("active");
    }

    // Lancer le défilement automatique si des slides existent
    if(slides.length > 0) {
        setInterval(nextSlide, slideInterval);
    }


    // --- GESTION DE LA NAVBAR (Disparition au Scroll) ---
    let lastScrollY = window.scrollY;
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
            // Si on scroll vers le bas, on cache la navbar
            navbar.classList.add("navbar-hidden");
        } else {
            // Si on scroll vers le haut, on réaffiche la navbar
            navbar.classList.remove("navbar-hidden");
        }
        lastScrollY = window.scrollY;
    });


    // --- GESTION DES ANIMATIONS D'APPARITION (Intersection Observer) ---
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(".fade-up");
    animatedElements.forEach(el => observer.observe(el));
    const modal = document.getElementById("product-modal");
    const btnsDetails = document.querySelectorAll(".btn-details");
    const closeModal = document.querySelector(".close-modal");

    // Éléments cibles à l'intérieur du pop-up
    const modalTitle = document.getElementById("modal-title");
    const modalMainImg = document.getElementById("modal-main-img");
    const modalThumb1 = document.getElementById("modal-thumb-1");
    const modalThumb2 = document.getElementById("modal-thumb-2");
    const modalSpecsList = document.getElementById("modal-specs-list");

    if (modal && btnsDetails.length > 0) {
        
        // 1. Écouter le clic sur les boutons "Voir Détails"
        btnsDetails.forEach(btn => {
            btn.addEventListener("click", function() {
                // Récupération des données du bouton cliqué
                const title = this.getAttribute("data-title");
                const img1 = this.getAttribute("data-img1");
                const img2 = this.getAttribute("data-img2");
                const img3 = this.getAttribute("data-img3");
                const specs = this.getAttribute("data-specs");

                // Injection des textes et images
                modalTitle.textContent = title;
                modalMainImg.src = img1;
                modalThumb1.src = img2;
                modalThumb2.src = img3;

                // Construction de la liste des caractéristiques
                modalSpecsList.innerHTML = ""; // On vide l'ancien contenu
                if (specs) {
                    const specsArray = specs.split("|"); // Sépare chaque ligne par le "|"
                    specsArray.forEach(spec => {
                        const parts = spec.split(":");
                        if (parts.length >= 2) {
                            const key = parts[0].trim();
                            const value = parts.slice(1).join(":").trim();
                            
                            const li = document.createElement("li");
                            li.innerHTML = `<strong>${key} :</strong> ${value}`;
                            modalSpecsList.appendChild(li);
                        }
                    });
                }

                // Affichage du Pop-up avec la classe CSS
                modal.classList.add("show");
                document.body.style.overflow = "hidden"; // Empêche le scroll du site en arrière-plan
            });
        });

        // 2. Fonction de fermeture du pop-up
        const hideModal = () => {
            modal.classList.remove("show");
            document.body.style.overflow = "auto"; // Réactive le scroll du site
        };

        // Fermer en cliquant sur la croix
        if (closeModal) {
            closeModal.addEventListener("click", hideModal);
        }

        // Fermer en cliquant n'importe où en dehors du pop-up
        window.addEventListener("click", (e) => {
            if (e.target === modal) {
                hideModal();
            }
        });

        // 3. Gestion des miniatures (cliquer sur une petite photo l'interchange avec la grande)
        const thumbs = [modalThumb1, modalThumb2];
        thumbs.forEach(thumb => {
            if (thumb) {
                thumb.addEventListener("click", function() {
                    const currentMainSrc = modalMainImg.src;
                    modalMainImg.src = this.src;
                    this.src = currentMainSrc;
                });
            }
        });
    }

    

    document.querySelectorAll(".fade-up").forEach(el => observer.observe(el))
});