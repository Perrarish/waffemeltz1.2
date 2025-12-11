// Menu Data with Images
const menuData = {
    'wafflelicious': [
        { name: 'Belgian chocolate Milk', price: 99, image: 'belgiumchocolate.png' },
        { name: 'Belgian chocolate White', price: 99, image: 'belgianchocolatewhite.png' },
        { name: 'Belgian Chocolate Dark', price: 109, image: 'belgianchocolatedark.png' },
        { name: 'Red velvet - white chocolate', price: 119, image: 'redwelvetwhitechocolate.png' },
        { name: 'Twilight Fantasy', price: 129, image: 'twlightfantancy.png' },
        { name: 'Creamy Cookie Crush', price: 129, image: 'creamcookie.png' },
        { name: 'Belgian Chocolate Stick Waffles', price: 129, image: 'stick waffle.png' },
        { name: 'Butterscotch Crunch', price: 129, image: 'butterscoch.png' },
        { name: 'Strawberry Cloud', price: 129, image: 'strawberrycloud.png' },
        { name: 'Cotton candy', price: 139, image: 'cottoncandy.png' },
    ],
    'mini-pancake': [
        { name: 'Maple Mini Bites', price: 99, image: 'mappleminipancake.png' },
        { name: 'Double chocolate Mini Pancake', price: 119, image: 'doublechocolateminipancake.png' },
        { name: 'Chocolate Chip Mini Pancake', price: 119, image: 'chocolatechipminipancake.png' },
        { name: 'Mini Pancake with Nutella', price: 129, image: 'minipancakewithnutell.png' },
        { name: 'Red velvet - white chocolate', price: 129, image: 'redvelvetminipancake.png' },
        { name: 'Triple Chocolate Mini Pancake', price: 139, image: 'triplechocolateminipancake.png' },
        { name: 'Death by Chocolate Mini Pancake', price: 139, image: 'deathbychocolatepancake.png' }
    ],
    'waffle-sundae': [
        { name: 'Classic Vanilla Sundae', price: 129, image: 'classic_vennila_sundae.png' },
        { name: 'Red Velvet Waffle Sundae', price: 139, image: 'redvelvetwaffle.png' },
        { name: 'Vanilla Swirl Brownie', price: 139, image: 'whirlbrownie.png' },
        { name: 'Double Trouble (Brownie With Choc Ice)', price: 139, image: 'doublebrownie.png' },
        { name: 'Dark Temptation', price: 149, image: 'chocolefudge.png' }
    ],
    'beverages': [
        { name: 'Virgin Mojito', price: 69, image: 'virginmojito.png' },
        { name: 'Blue Curacao Mojito', price: 79, image: 'blue_coraco_mojito.png' },
        { name: 'Passion Fruit Mojito', price: 89, image: 'passionfruitmojito.png' },
        { name: 'Vanilla Milk Shake', price: 99, image: 'vannilamilkshake.png' },
        { name: 'Hot Chocolate', price: 110, image: 'hotchocolate.png' },
        { name: 'Chocolate Milk Shake', price: 119, image: 'chocolate_milkshake.png' },
        { name: 'Brownie Milk Shake', price: 129, image: 'browniemilkshake.png' },
        { name: 'Cold Coffee', price: 139, image: 'coldcoffee.png' }
    ],
    'hot-fresh': [
        { name: 'Brownie', price: 59, image: '/brownie.png' },
        { name: 'Brownie with dark chocolate', price: 69, image: 'browniewithdarkchocolate.png' },
        { name: 'Garlic Bread', price: 89, image: 'garlicbread.png' },
        { name: 'Korean Cream Cheese Garlic Bun', price: 99, image: 'creamcheesgarlicbun.png' }
    ],
    'special-cake': [
        { name: 'Death by Chocolate', price: 529, image: 'deathbychocolate.png' },
        { name: 'Red Velvet Dark Choco Chip Waffle Cake', price: 529, image: 'redvelwetdarkchocolate.png' },
        { name: 'Strawberry with Belgian Chocolate Cake', price: 529, image: 'straberrybelgian.png' }
    ]
};

// DOM Elements
const contactForm = document.getElementById('contactForm');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const categoryButtons = document.querySelectorAll('.category-btn');
const menuItemsGrid = document.getElementById('menuItemsGrid');

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Load initial category (Wafflelicious)
    loadMenuItems('wafflelicious');

    // Initialize mobile menu if button exists
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            const navLinks = document.querySelector('.nav-links');
            navLinks.classList.toggle('active');
        });
    }

    // Category button click handlers
    categoryButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Load items for selected category
            const category = btn.dataset.category;
            loadMenuItems(category);
        });
    });
});

// Load menu items for selected category
function loadMenuItems(category) {
    const items = menuData[category] || [];
    
    // Clear existing items
    menuItemsGrid.innerHTML = '';
    
    // Add items to grid
    items.forEach(item => {
        const itemCard = document.createElement('div');
        itemCard.className = 'menu-item-card';
        itemCard.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="menu-item-image">
            <div class="menu-item-info">
                <h3 class="menu-item-name">${item.name}</h3>
            </div>
        `;
        menuItemsGrid.appendChild(itemCard);
    });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            const navLinks = document.querySelector('.nav-links');
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
            }
        }
    });
});

// Contact form submission with Formspree
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        
        // Disable button and show loading state
        submitButton.disabled = true;
        submitButton.textContent = 'Sending...';
        
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });
            
            if (response.ok) {
                showNotification('Thank you! Your message has been sent successfully.');
                contactForm.reset();
            } else {
                const data = await response.json();
                if (data.errors) {
                    showNotification('Oops! There was an error: ' + data.errors.map(error => error.message).join(', '));
                } else {
                    showNotification('Oops! There was an error sending your message. Please try again.');
                }
            }
        } catch (error) {
            showNotification('Oops! There was an error sending your message. Please try again.');
            console.error('Form submission error:', error);
        } finally {
            // Re-enable button
            submitButton.disabled = false;
            submitButton.textContent = originalText;
        }
    });
}

// Notification system
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #8B6914, #5C4A1A);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 5px 20px rgba(139, 105, 20, 0.4);
        z-index: 3000;
        animation: slideIn 0.3s ease;
        border-left: 4px solid #FFB800;
        font-weight: 500;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            if (document.body.contains(notification)) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// Add animation styles
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Scroll effect for navbar
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
        
        lastScroll = currentScroll;
    }

});