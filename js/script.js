const galleryModal = document.querySelector("#galleryModal");
const galleryButtons = document.querySelectorAll(".service-card__button");
const closeGalleryButton = document.querySelector("#closeGallery");
const galleryImage = document.querySelector("#galleryImage");
const galleryThumbnails = document.querySelector("#galleryThumbnails");
const nextImageButton = document.querySelector("#nextImage");

const galleries = {
  sobrancelhas: [
    "imagens/sobrancelhas/sobrancelha1.jpeg",
    "imagens/sobrancelhas/sobrancelha2.jpeg",
    "imagens/sobrancelhas/sobrancelha3.jpeg",
  ],

  cilios: [
    "imagens/cilios/cilios1.jpeg",
    "imagens/cilios/cilios2.jpeg",
    "imagens/cilios/cilios3.jpeg",
  ],

  unhas: [
    "imagens/unhas/unha1.jpeg",
    "imagens/unhas/unha 2.jpeg",
    "imagens/unhas/unha3.jpeg",
    "imagens/unhas/unha4.jpeg",
    "imagens/unhas/unha5.jpeg",
    "imagens/unhas/unha6.jpeg",
    "imagens/unhas/unha7.jpeg",
    "imagens/unhas/unha8.jpeg",
    "imagens/unhas/unha9.jpeg",
  ],
};
let currentGallery = [];
let currentImageIndex = 0;

galleryButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const galleryName = button.dataset.galeria;
    const selectedGallery = galleries[galleryName];

    currentGallery = selectedGallery;
    currentImageIndex = 0;

    galleryImage.src = selectedGallery[0];
    galleryImage.alt = `Trabalho de ${galleryName}`;

    galleryThumbnails.innerHTML = "";

    selectedGallery.forEach((imagePath, index) => {
      const thumbnailButton = document.createElement("button");
      const thumbnailImage = document.createElement("img");

      thumbnailButton.type = "button";
      thumbnailButton.classList.add("gallery-modal__thumbnail");

      thumbnailImage.src = imagePath;
      thumbnailImage.alt = `Miniatura ${index + 1} de ${galleryName}`;

      thumbnailButton.appendChild(thumbnailImage);
      
      thumbnailButton.addEventListener("click", () => {
        galleryImage.src = imagePath;
        galleryImage.alt = `Trabalho ${index + 1} de ${galleryName}`;
      });

      galleryThumbnails.appendChild(thumbnailButton);
    });

    galleryModal.classList.add("is-open");
    galleryModal.setAttribute("aria-hidden", "false");
  });
});

closeGalleryButton.addEventListener("click", () => {
  galleryModal.classList.remove("is-open");
  galleryModal.setAttribute("aria-hidden", "true");
});


nextImageButton.addEventListener("click", () => {
  currentImageIndex++;

  if (currentImageIndex >= currentGallery.length) {
    currentImageIndex = 0;
  }

  galleryImage.src = currentGallery[currentImageIndex];
});


const revealElements = document.querySelectorAll(
  ".reveal-left, .reveal-right, .reveal-up, .reveal-fade"
);

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");

        // Faz a animação acontecer apenas uma vez
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.2,
  }
);

revealElements.forEach((element) => {
  observer.observe(element);
});