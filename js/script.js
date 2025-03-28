document.addEventListener('DOMContentLoaded', () => {
    // Gestion de la navbar active
    const navLinks = document.querySelectorAll('.nav-item .nav-link');
    const sections = document.querySelectorAll('section');
    var toggler = document.querySelector(".navbar-toggler");
    var icon = toggler.querySelector(".custom-toggler-icon");
    var dropdown = document.querySelector(".dropdown-menu");
    var dropdownItem = document.querySelectorAll(".dropdown-item");
    function updateActiveLink() {
        const scrollPosition = window.scrollY;
        sections.forEach(section => {
            //distance entre hauteur page et haut section
            const sectionTop = section.offsetTop;
            //hauteur visible de la section
            const sectionHeight = section.clientHeight;
            //on check si la section est visible, le 150 est là parce qu'on a mis une marge de 150px, sans ça, le changement se fait trop tard
            // on check aussi si on est pas en bas de la page pour éviter que le dernier élément de la navbar reste actif
            // si on est en bas de la page, on active le dernier élément de la navbar
            if (scrollPosition >= sectionTop - 150 && scrollPosition < sectionTop + sectionHeight - 150) {
                const id = section.getAttribute('id');
                const activeLink = document.querySelector(`.nav-link[href="#${id}"]`);
                
                navLinks.forEach(link => link.classList.remove('active'));
                
                if (activeLink) {
                    activeLink.classList.add('active');
                } else {
                    console.warn(`Aucun lien correspondant pour la section avec id: ${id}`);
                }
            }
        });
    }
    // Gestion de l'opacité du header
    const header = document.getElementById('header');
    const maxScroll = 500; // Scroll en pixels pour atteindre l'opacité maximale
    function handleHeaderOpacity() {
        const scrollY = window.scrollY;
        let opacity = scrollY / maxScroll;
        if (opacity > 1) opacity = 1;
        header.style.backgroundColor = `rgba(128,128,128, ${opacity})`;
		dropdown.style.backgroundColor = `rgba(128,128,128, ${opacity})`;
		if (opacity > 0.5) {
            navLinks.forEach(link => link.style.color = 'black'); // Blanc quand le header est opaque
            // dropdownItem.forEach(link => link.style.color = 'white');

        } else {
            // navLinks.forEach(link => link.style.color = 'white'); // Noir au départ
            dropdownItem.forEach(link => link.style.color = 'black'); 
            

        }
        
    }
    //afin d'afficher une croix au lieu des barres lors du click sur le bouton du menu hamburger
    toggler.addEventListener("click", function () {
        if (toggler.classList.contains("collapsed")) {
            icon.innerHTML = "☰"; // Icône hamburger
        } else {
            icon.innerHTML = "&times;"; // Icône croix
        }
    });
    window.addEventListener('scroll', () => {
        updateActiveLink();
        handleHeaderOpacity();
    });
    
    // Appels initiaux
    updateActiveLink();
    handleHeaderOpacity();


          // Fonction pour lire un cookie par son nom
          function getCookie(name) {
            const cookies = document.cookie.split(';').map(cookie => cookie.trim());
            for (let cookie of cookies) {
              if (cookie.indexOf(name + '=') === 0) {
                return cookie.substring(name.length + 1);
              }
            }
            return null;
          }
    
          // Créer une instance du modal via Bootstrap
          const cookieModalElement = document.getElementById('cookieModal');
          const cookieModal = new bootstrap.Modal(cookieModalElement, {
            backdrop: 'static',
            keyboard: false
          });
    
          // Afficher le modal si le cookie de consentement n'existe pas
          if (!getCookie("cookieConsent")) {
            cookieModal.show();
          }
    
          // Lorsque l'utilisateur clique sur "Accepter"
          document.getElementById("acceptCookies").addEventListener("click", function () {
            // Créer un cookie de consentement valable 365 jours
            document.cookie = "cookieConsent=true; max-age=" + (365 * 24 * 60 * 60) + "; path=/";
            cookieModal.hide();
          });




});
function showImage(element) {
    let imgSrc = element.src; // Récupère l'URL de l'image cliquée
    document.getElementById('modalImage').src = imgSrc; // Remplace l'image dans le modal
}

//pour fermer la navbar au click sur mobile
  
document.querySelectorAll('.navbar-collapse .nav-link').forEach(function(link) {
    link.addEventListener('click', function () {
      // Si le lien est un dropdown, on ne ferme pas la navbar
      if (link.getAttribute('data-bs-toggle') === 'dropdown') return;
      
      const navbarCollapse = document.querySelector('.navbar-collapse');
      const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse) || new bootstrap.Collapse(navbarCollapse, {toggle: false});
      bsCollapse.hide();
    });
  });
  