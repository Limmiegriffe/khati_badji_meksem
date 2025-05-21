document.addEventListener("DOMContentLoaded", function () {
    const selectTri = document.getElementById("tri");

    // Force le déclenchement de l'événement change même si on clique sur la même option
    selectTri.addEventListener("click", function () {
        this.dispatchEvent(new Event("change"));
    });

    selectTri.addEventListener("change", trierProduits);

    function trierProduits() {
        const critere = selectTri.value;
        const produits = Array.from(document.querySelectorAll('.produit'));
        const container = document.querySelector('.conteneur-produits');

        produits.sort((a, b) => {
            const prixA = parseFloat(a.getAttribute('data-prix'));
            const prixB = parseFloat(b.getAttribute('data-prix'));
            const nomA = a.querySelector('h4').textContent.toLowerCase();
            const nomB = b.querySelector('h4').textContent.toLowerCase();

            switch (critere) {
                case 'prix-asc': return prixA - prixB; // Prix croissant
                case 'prix-desc': return prixB - prixA; // Prix décroissant
                case 'nom-asc': return nomA.localeCompare(nomB); // Ordre A → Z
                case 'nom-desc': return nomB.localeCompare(nomA); // Ordre Z → A
                default: return 0;
            }
        });

        // Réinsérer les produits triés
        produits.forEach(produit => container.appendChild(produit));
    }

    // Exécuter le tri au chargement de la page pour appliquer le tri par défaut
    trierProduits();
});
