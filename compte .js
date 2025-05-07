document.getElementById('profile-form').addEventListener('submit', function(e) {
    
    // 1. Désactiver le bouton
    const btn = document.getElementById('save-btn');
    btn.disabled = true;
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enregistrement...';
    
    // 2. Simuler un envoi (remplacez par votre appel fetch réel)
    setTimeout(() => {
        
        // 4. Réinitialiser après 3 secondes
        setTimeout(() => {
            notification.className = 'notification-hidden';
            btn.disabled = false;
            btn.innerHTML = 'Enregistrer';
            document.getElementById('profile-form').reset();
        }, 3000);
        
    }, 1500); // Simule un temps de traitement
});
document.addEventListener("DOMContentLoaded", function () {
    const tabs = document.querySelectorAll(".account-nav li");
    const contents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", function () {
            // Supprimer la classe active de tous les onglets
            tabs.forEach(t => t.classList.remove("active"));

            // Cacher tous les contenus
            contents.forEach(c => c.classList.remove("active"));

            // Activer l'onglet cliqué
            this.classList.add("active");
            const tabId = this.getAttribute("data-tab");

            // Afficher le contenu correspondant
            const activeSection = document.getElementById(tabId);
            if (activeSection) {
                activeSection.classList.add("active");
            }
        });
    });
});

document.getElementById('profile-form').addEventListener('submit', function(e) {


    const notification = document.querySelector('.notification');
    const notificationMessage = document.querySelector('.notification-message');

    // Génère un ID aléatoire (ex: "ABC-1234")
    const randomLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const letterPart = 
        randomLetters.charAt(Math.floor(Math.random() * randomLetters.length)) + 
        randomLetters.charAt(Math.floor(Math.random() * randomLetters.length)) + 
        randomLetters.charAt(Math.floor(Math.random() * randomLetters.length));
    const numberPart = Math.floor(1000 + Math.random() * 9000);
    const randomId = `${letterPart}-${numberPart}`;

    // Affiche le message de succès + l'ID
    notification.className = 'notification notification-visible';
    notificationMessage.innerHTML = `
        <i class="fas fa-check-circle"></i>
        <div>
            <strong>✅ Enregistrement réussi !</strong><br>
            Votre ID de confirmation : <strong>${randomId}</strong>
        </div>
    `;

    // Masque la notification après 5 secondes
    setTimeout(() => {
        notification.className = 'notification notification-hidden';
        
        // Soumet le formulaire après l'animation (optionnel)
        setTimeout(() => {
            this.submit(); // Envoie le formulaire
            // OU this.reset(); // Réinitialise sans envoyer
        }, 500);
    }, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    // Gestion des boutons de méthode de paiement
    const cardBtn = document.getElementById('add-card-btn');
    const paypalBtn = document.getElementById('add-paypal-btn');
    const cardForm = document.getElementById('card-form-container');
    
    // Bouton Carte Bancaire
    cardBtn.addEventListener('click', function(e) {
        e.preventDefault();
        cardForm.classList.toggle('hidden');
    });
    
    // Bouton PayPal
    paypalBtn.addEventListener('click', function(e) {
        e.preventDefault();
        // Redirection vers PayPal
        window.location.href = 'https://www.paypal.com/signin';
        // Ou pour un vrai paiement:
        // window.location.href = 'https://www.paypal.com/checkoutnow?token=VOTRE_TOKEN';
    });
    
    // Formatage du numéro de carte
    const cardNumberInput = document.querySelector('#card-form input[placeholder="1234 5678 9012 3456"]');
    if (cardNumberInput) {
        cardNumberInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\s+/g, '');
            if (value.length > 0) {
                value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
            }
            e.target.value = value;
        });
    }
    
    // Soumission du formulaire de carte
    // Remplacez la partie "Soumission du formulaire de carte" par ceci :
const cardFormElement = document.getElementById('card-form');
if (cardFormElement) {
    cardFormElement.addEventListener('submit', function(e) {
        
        // Simuler un traitement (remplacez par votre vrai code d'envoi)
        const submitBtn = this.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Traitement...';
        
        // Simuler un délai d'envoi (2 secondes)
        setTimeout(() => {
            // Afficher la belle notification
            const notification = document.getElementById('payment-notification');
            const notificationText = notification.querySelector('.payment-notification-text');
            
            notificationText.textContent = 'Carte enregistrée avec succès !';
            notification.classList.add('show', 'success');
            
            // Cacher le formulaire
            cardForm.classList.add('hidden');
            
            // Réinitialiser le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
            
            // Cacher la notification après 3 secondes
            setTimeout(() => {
                notification.classList.remove('show');
                
                // Optionnel: Reset du formulaire
                setTimeout(() => {
                    this.reset();
                    notification.classList.remove('success');
                }, 400);
            }, 3000);
            
        }, 2000);
    });
}
});

document.addEventListener('DOMContentLoaded', function() {
    const deleteBtn = document.getElementById('delete-account-btn');
    const confirmModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    // Ouvrir la modal
    deleteBtn.addEventListener('click', function() {
        confirmModal.classList.add('active');
    });

    // Annuler la suppression
    cancelDeleteBtn.addEventListener('click', function() {
        confirmModal.classList.remove('active');
    });

    // Confirmer la suppression
    confirmDeleteBtn.addEventListener('click', function() {
        // Ajouter un état de chargement
        confirmDeleteBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Suppression...';
        confirmDeleteBtn.disabled = true;

        // Simuler une requête AJAX (remplacez par votre vrai code)
        setTimeout(() => {
            // Fermer la modal
            confirmModal.classList.remove('active');
            
            // Afficher une notification de succès
            showNotification('La dernière entrée a été supprimée avec succès', 'success');
            
            // Ici vous devriez faire un appel AJAX vers tableau.php
            // pour supprimer la dernière entrée
            fetch('tableau.php?action=delete_last', {
                method: 'POST'
            })
            .then(response => response.json())
            .then(data => {
                if(data.success) {
                    showNotification('La dernière entrée a été supprimée avec succès', 'success');
                } else {
                    showNotification('Erreur lors de la suppression', 'error');
                }
            })
            .catch(error => {
                showNotification('Erreur de connexion', 'error');
            })
            .finally(() => {
                confirmDeleteBtn.innerHTML = 'Oui, supprimer';
                confirmDeleteBtn.disabled = false;
            });

        }, 1500);
    });

    // Fonction pour afficher les notifications (à adapter à votre système existant)
    function showNotification(message, type) {
        // Utilisez votre système de notification existant ici
        console.log(`${type}: ${message}`);
    }
});

// Gestion du formulaire de carte
document.getElementById('card-form').addEventListener('submit', function(e) {
   
    
    const form = this;
    const submitBtn = form.querySelector('.submit-btn');
    const originalBtnText = submitBtn.innerHTML;
    
    // Afficher l'état de chargement
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Traitement...';
    submitBtn.disabled = true;
    
    // Envoyer les données via AJAX
    fetch(form.action, {
        method: 'POST',
        body: new FormData(form)
    })
    .then(response => response.json())
    .then(data => {
        // Afficher la notification
        const notification = document.getElementById('payment-notification');
        const notificationText = notification.querySelector('.payment-notification-text');
        
        notificationText.textContent = data.message || 'Votre paiement a été traité avec succès';
        notification.classList.remove('hidden');
        notification.classList.add('show');
        
        // Cacher le formulaire
        document.getElementById('card-form-container').classList.add('hidden');
        
        // Réinitialiser le formulaire après 3 secondes
        setTimeout(() => {
            form.reset();
            notification.classList.remove('show');
            setTimeout(() => notification.classList.add('hidden'), 400);
        }, 3000);
    })
    .catch(error => {
        console.error('Erreur:', error);
    })
    .finally(() => {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
    });
});

// Formatage du numéro de carte
document.getElementById('card-number').addEventListener('input', function(e) {
    let value = e.target.value.replace(/\s+/g, '');
    if (value.length > 0) {
        value = value.match(new RegExp('.{1,4}', 'g')).join(' ');
    }
    e.target.value = value;
});



document.getElementById('btnCodeRedirect').addEventListener('click', function() {
    // Redirection vers une autre page HTML
    window.location.href = 'code.html';
    
    // Alternative pour nouvel onglet :
    // window.open('code_page.html', '_blank');
});


d
