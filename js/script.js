document.addEventListener('DOMContentLoaded', function() {
  // Counter Animation
  const counters = document.querySelectorAll('.counter');

  const animateCounter = (counter) => {
    const target = parseInt(counter.getAttribute('data-count'));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current).toLocaleString();
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target.toLocaleString();
      }
    };

    updateCounter();
  };

  // Intersection Observer for counters
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        animateCounter(counter);
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(counter => {
    counterObserver.observe(counter);
  });

  // Add stagger animation to team cards
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

  // Add hover sound effect (optional)
  const hoverCards = document.querySelectorAll('.value-card, .team-card, .award-card');
  hoverCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
    });
  });
});

function toggleTheme() {
  const html = document.documentElement;
  const themeIcon = document.getElementById('theme-icon');

  if (html.classList.contains('dark')) {
    html.classList.remove('dark');
    themeIcon.className = 'ri-sun-line';
    localStorage.setItem('theme', 'light');
  } else {
    html.classList.add('dark');
    themeIcon.className = 'ri-moon-line';
    localStorage.setItem('theme', 'dark');
  }
}

// Initialize theme on page load
document.addEventListener('DOMContentLoaded', function() {
  const savedTheme = localStorage.getItem('theme');
  const themeIcon = document.getElementById('theme-icon');

  if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    document.documentElement.classList.add('dark');
    themeIcon.className = 'ri-moon-line';
  }
});

// Scroll Animation Observer
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, observerOptions);

// Observe all scroll-fade elements
document.addEventListener('DOMContentLoaded', function() {
  const scrollElements = document.querySelectorAll('.scroll-fade');
  scrollElements.forEach(el => observer.observe(el));
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
  const scrolled = window.pageYOffset;
  const heroSection = document.querySelector('.hero-section');
  if (heroSection) {
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
  }
});

// Dynamic floating elements animation
function createFloatingElement() {
  const emojis = ['🍃', '🌿', '🍅', '🌶️', '🥕', '🥬', '🍋', '🥑'];
  const element = document.createElement('div');
  element.className = 'fixed pointer-events-none text-2xl opacity-30 z-0';
  element.textContent = emojis[Math.floor(Math.random() * emojis.length)];
  element.style.left = Math.random() * 100 + 'vw';
  element.style.top = '100vh';
  element.style.animation = `float-up 8s linear forwards`;

  document.body.appendChild(element);

  setTimeout(() => {
    element.remove();
  }, 8000);
}

// Add floating elements periodically
setInterval(createFloatingElement, 3000);

// Add CSS for float-up animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float-up {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 0.3;
    }
    50% {
      opacity: 0.6;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);


// Category Modal JavaScript - Add this to your existing script section

// Enhanced category data with complete information
const categoryData = {
  'main-courses': {
    title: 'Main Courses',
    subtitle: 'Hearty and satisfying main dishes',
    items: [
      {
        name: 'Grilled Salmon Supreme',
        description: 'Fresh Atlantic salmon grilled to perfection with lemon herb butter, served with roasted vegetables and quinoa pilaf',
        price: '$24.99',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Healthy', class: 'bg-green-100 text-green-700' },
          { name: 'Protein Rich', class: 'bg-blue-100 text-blue-700' }
        ]
      },
      {
        name: 'Beef Tenderloin Medallions',
        description: 'Premium beef tenderloin medallions with truffle sauce, garlic mashed potatoes, and seasonal vegetables',
        price: '$32.99',
        image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Premium', class: 'bg-yellow-100 text-yellow-700' },
          { name: 'Chef Special', class: 'bg-purple-100 text-purple-700' }
        ]
      },
      {
        name: 'Chicken Parmesan Classic',
        description: 'Crispy breaded chicken breast topped with marinara sauce and melted mozzarella, served with pasta',
        price: '$19.99',
        image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Popular', class: 'bg-red-100 text-red-700' },
          { name: 'Italian', class: 'bg-green-100 text-green-700' }
        ]
      },
      {
        name: 'Lamb Rack with Mint Jus',
        description: 'New Zealand lamb rack with rosemary crust, mint jus, and roasted root vegetables',
        price: '$28.99',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Gourmet', class: 'bg-purple-100 text-purple-700' },
          { name: 'Limited', class: 'bg-orange-100 text-orange-700' }
        ]
      },
      {
        name: 'Pan-Seared Duck Breast',
        description: 'Succulent duck breast with cherry glaze, sweet potato puree, and sautéed spinach',
        price: '$26.99',
        image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Signature', class: 'bg-red-100 text-red-700' },
          { name: 'Seasonal', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Lobster Thermidor',
        description: 'Fresh lobster tail in creamy cognac sauce, topped with cheese and herbs, served with rice pilaf',
        price: '$38.99',
        image: 'https://images.unsplash.com/photo-1559847844-d418898632c4?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Luxury', class: 'bg-yellow-100 text-yellow-700' },
          { name: 'Seafood', class: 'bg-blue-100 text-blue-700' }
        ]
      },
      {
        name: 'Vegetarian Wellington',
        description: 'Mushroom and vegetable wellington in puff pastry with red wine jus and seasonal vegetables',
        price: '$22.99',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Vegetarian', class: 'bg-green-100 text-green-700' },
          { name: 'Artisan', class: 'bg-purple-100 text-purple-700' }
        ]
      },
      {
        name: 'Seafood Paella',
        description: 'Traditional Spanish paella with fresh seafood, saffron rice, and aromatic herbs',
        price: '$29.99',
        image: 'https://images.unsplash.com/photo-1534080564583-6be75777b70a?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Spanish', class: 'bg-yellow-100 text-yellow-700' },
          { name: 'Sharing', class: 'bg-orange-100 text-orange-700' }
        ]
      }
    ]
  },
  'fresh-salads': {
    title: 'Fresh Salads',
    subtitle: 'Crisp and healthy salad options',
    items: [
      {
        name: 'Mediterranean Quinoa Bowl',
        description: 'Quinoa with mixed greens, cherry tomatoes, olives, feta cheese, and lemon herb dressing',
        price: '$16.99',
        image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Healthy', class: 'bg-green-100 text-green-700' },
          { name: 'Protein', class: 'bg-blue-100 text-blue-700' }
        ]
      },
      {
        name: 'Grilled Chicken Caesar',
        description: 'Crisp romaine lettuce with grilled chicken, parmesan, croutons, and house-made caesar dressing',
        price: '$18.99',
        image: 'https://images.unsplash.com/photo-1546793665-c74683f339c1?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Classic', class: 'bg-gray-100 text-gray-700' },
          { name: 'Popular', class: 'bg-red-100 text-red-700' }
        ]
      },
      {
        name: 'Asian Fusion Salad',
        description: 'Mixed greens with mandarin oranges, almonds, crispy wontons, and sesame ginger dressing',
        price: '$17.99',
        image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Fusion', class: 'bg-orange-100 text-orange-700' },
          { name: 'Crunchy', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Superfood Power Bowl',
        description: 'Kale, spinach, avocado, blueberries, pumpkin seeds, and superfood dressing',
        price: '$19.99',
        image: 'https://images.unsplash.com/photo-1511690743698-d9d85f2fbf38?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Superfood', class: 'bg-purple-100 text-purple-700' },
          { name: 'Antioxidant', class: 'bg-blue-100 text-blue-700' }
        ]
      },
      {
        name: 'Caprese Salad Deluxe',
        description: 'Fresh mozzarella, heirloom tomatoes, basil, balsamic glaze, and extra virgin olive oil',
        price: '$15.99',
        image: 'https://images.unsplash.com/photo-1515543237350-b3eea1ec8082?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Italian', class: 'bg-green-100 text-green-700' },
          { name: 'Fresh', class: 'bg-red-100 text-red-700' }
        ]
      },
      {
        name: 'Salmon Nicoise',
        description: 'Grilled salmon with mixed greens, eggs, olives, tomatoes, and French vinaigrette',
        price: '$22.99',
        image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'French', class: 'bg-blue-100 text-blue-700' },
          { name: 'Protein Rich', class: 'bg-green-100 text-green-700' }
        ]
      },
      {
        name: 'Harvest Autumn Salad',
        description: 'Mixed greens with roasted butternut squash, cranberries, pecans, and maple vinaigrette',
        price: '$16.99',
        image: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Seasonal', class: 'bg-orange-100 text-orange-700' },
          { name: 'Sweet', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Greek Village Salad',
        description: 'Tomatoes, cucumbers, red onions, feta cheese, olives, and traditional Greek dressing',
        price: '$14.99',
        image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Traditional', class: 'bg-blue-100 text-blue-700' },
          { name: 'Authentic', class: 'bg-white text-gray-700 border border-gray-300' }
        ]
      }
    ]
  },
  'beverages': {
    title: 'Beverages',
    subtitle: 'Refreshing drinks and cocktails',
    items: [
      {
        name: 'Tropical Sunset Mocktail',
        description: 'Pineapple, mango, and passion fruit blend with coconut water and fresh mint',
        price: '$12.99',
        image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Non-alcoholic', class: 'bg-blue-100 text-blue-700' },
          { name: 'Tropical', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Craft Espresso Martini',
        description: 'Premium vodka, fresh espresso, coffee liqueur, and vanilla simple syrup',
        price: '$16.99',
        image: 'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Cocktail', class: 'bg-red-100 text-red-700' },
          { name: 'Coffee', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Cucumber Mint Cooler',
        description: 'Fresh cucumber juice, mint leaves, lime, and sparkling water with a hint of elderflower',
        price: '$10.99',
        image: 'https://images.unsplash.com/photo-1571091718767-18b5b1457add?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Refreshing', class: 'bg-green-100 text-green-700' },
          { name: 'Low Cal', class: 'bg-blue-100 text-blue-700' }
        ]
      },
      {
        name: 'Berry Hibiscus Iced Tea',
        description: 'Hibiscus tea infused with mixed berries, honey, and fresh lemon served over ice',
        price: '$8.99',
        image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Herbal', class: 'bg-purple-100 text-purple-700' },
          { name: 'Antioxidant', class: 'bg-red-100 text-red-700' }
        ]
      },
      {
        name: 'Golden Turmeric Latte',
        description: 'Creamy blend of turmeric, ginger, cinnamon, and coconut milk with a touch of honey',
        price: '$9.99',
        image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Wellness', class: 'bg-yellow-100 text-yellow-700' },
          { name: 'Anti-inflammatory', class: 'bg-orange-100 text-orange-700' }
        ]
      },
      {
        name: 'Smoky Old Fashioned',
        description: 'Premium bourbon with maple syrup, orange bitters, and a hint of applewood smoke',
        price: '$18.99',
        image: 'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Whiskey', class: 'bg-amber-100 text-amber-700' },
          { name: 'Signature', class: 'bg-red-100 text-red-700' }
        ]
      },
      {
        name: 'Fresh Watermelon Agua Fresca',
        description: 'Blended watermelon with lime juice, mint, and a splash of sparkling water',
        price: '$7.99',
        image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Summer', class: 'bg-pink-100 text-pink-700' },
          { name: 'Hydrating', class: 'bg-blue-100 text-blue-700' }
        ]
      },
      {
        name: 'Lavender Honey Lemonade',
        description: 'House-made lemonade infused with lavender and local honey, served with fresh herbs',
        price: '$9.99',
        image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Floral', class: 'bg-purple-100 text-purple-700' },
          { name: 'Calming', class: 'bg-blue-100 text-blue-700' }
        ]
      }
    ]
  },
  'desserts': {
    title: 'Desserts',
    subtitle: 'Sweet treats to end your meal',
    items: [
      {
        name: 'Chocolate Lava Cake',
        description: 'Warm chocolate cake with molten center, served with vanilla ice cream and berry compote',
        price: '$14.99',
        image: 'https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Warm', class: 'bg-red-100 text-red-700' },
          { name: 'Popular', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Tiramisu Classico',
        description: 'Traditional Italian tiramisu with espresso-soaked ladyfingers and mascarpone cream',
        price: '$12.99',
        image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Italian', class: 'bg-green-100 text-green-700' },
          { name: 'Coffee', class: 'bg-brown-100 text-brown-700' }
        ]
      },
      {
        name: 'Crème Brûlée Trilogy',
        description: 'Three mini crème brûlées: vanilla bean, lavender honey, and dark chocolate',
        price: '$16.99',
        image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'French', class: 'bg-blue-100 text-blue-700' },
          { name: 'Elegant', class: 'bg-purple-100 text-purple-700' }
        ]
      },
      {
        name: 'New York Cheesecake',
        description: 'Classic New York style cheesecake with graham cracker crust and seasonal berry topping',
        price: '$11.99',
        image: 'https://images.unsplash.com/photo-1567206563064-6f60f40a2b57?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Classic', class: 'bg-yellow-100 text-yellow-700' },
          { name: 'Creamy', class: 'bg-white text-gray-700 border border-gray-300' }
        ]
      },
      {
        name: 'Seasonal Fruit Tart',
        description: 'Buttery pastry shell filled with vanilla custard and topped with fresh seasonal fruits',
        price: '$13.99',
        image: 'https://images.unsplash.com/photo-1519915028121-7d3463d20b13?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Seasonal', class: 'bg-orange-100 text-orange-700' },
          { name: 'Fresh', class: 'bg-green-100 text-green-700' }
        ]
      },
      {
        name: 'Chocolate Soufflé',
        description: 'Light and airy chocolate soufflé served with crème anglaise and powdered sugar',
        price: '$17.99',
        image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Made to Order', class: 'bg-red-100 text-red-700' },
          { name: 'Premium', class: 'bg-yellow-100 text-yellow-700' }
        ]
      },
      {
        name: 'Panna Cotta Duo',
        description: 'Silky vanilla and strawberry panna cotta with fresh mint and balsamic reduction',
        price: '$10.99',
        image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Light', class: 'bg-pink-100 text-pink-700' },
          { name: 'Gluten-free', class: 'bg-green-100 text-green-700' }
        ]
      },
      {
        name: 'Bananas Foster Flambé',
        description: 'Caramelized bananas with rum, cinnamon, and brown sugar, served over vanilla ice cream',
        price: '$15.99',
        image: 'https://images.unsplash.com/photo-1481391319762-47dff72954d9?w=300&h=300&fit=crop&crop=center',
        tags: [
          { name: 'Flambé', class: 'bg-orange-100 text-orange-700' },
          { name: 'Interactive', class: 'bg-yellow-100 text-yellow-700' }
        ]
      }
    ]
  }
};

// Emoji animation system
const emojis = ['🍃', '🌿', '🍅', '🌶️', '🥕', '🥬', '🍋', '🥑'];
let emojiInterval;

// Function to create floating emojis
function createFloatingEmoji() {
  const modal = document.getElementById('categoryModal');
  if (!modal || !modal.classList.contains('active')) return;

  const emoji = document.createElement('div');
  emoji.className = 'modal-floating-emoji';
  emoji.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  // Random positioning
  emoji.style.left = Math.random() * 100 + '%';
  emoji.style.animationDuration = (Math.random() * 10 + 15) + 's';
  emoji.style.animationDelay = Math.random() * 2 + 's';

  modal.appendChild(emoji);

  // Remove emoji after animation
  setTimeout(() => {
    if (emoji.parentNode) {
      emoji.parentNode.removeChild(emoji);
    }
  }, 20000);
}

// Start emoji animation
function startEmojiAnimation() {
  stopEmojiAnimation(); // Clear any existing interval
  emojiInterval = setInterval(createFloatingEmoji, 2000);
}

// Stop emoji animation
function stopEmojiAnimation() {
  if (emojiInterval) {
    clearInterval(emojiInterval);
    emojiInterval = null;
  }
}

// Function to open category modal
function openCategoryModal(categoryId) {
  const modal = document.getElementById('categoryModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');

  const category = categoryData[categoryId];
  if (!category) return;

  // Set modal content
  modalTitle.textContent = category.title;
  modalSubtitle.textContent = category.subtitle;

  // Clear existing content
  modalBody.innerHTML = '';

  // Add items to modal
  category.items.forEach((item, index) => {
    const itemElement = document.createElement('div');
    itemElement.className = 'category-item';
    itemElement.style.animationDelay = `${index * 0.1}s`;

    const tagsHtml = item.tags.map(tag =>
      `<span class="item-tag ${tag.class}">${tag.name}</span>`
    ).join('');

    itemElement.innerHTML = `
      <div class="item-image">
        <img src="${item.image}" alt="${item.name}" onerror="this.src='https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=300&h=300&fit=crop&crop=center'">
      </div>
      <div class="item-content">
        <h3 class="item-title">${item.name}</h3>
        <p class="item-description">${item.description}</p>
        <div class="item-tags">${tagsHtml}</div>
        <div class="item-price">${item.price}</div>
        <button class="add-to-cart-btn" onclick="addToCart('${item.name}', '${item.price}')">
          Add to Cart
        </button>
      </div>
    `;

    modalBody.appendChild(itemElement);
  });

  // Show modal with animation
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Start emoji animation
  startEmojiAnimation();

  // Add click outside to close
  setTimeout(() => {
    modal.addEventListener('click', handleModalOutsideClick);
  }, 100);
}

// Function to close category modal
function closeCategoryModal() {
  const modal = document.getElementById('categoryModal');
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';

  // Stop emoji animation
  stopEmojiAnimation();

  // Remove existing floating emojis
  const existingEmojis = modal.querySelectorAll('.modal-floating-emoji');
  existingEmojis.forEach(emoji => {
    if (emoji.parentNode) {
      emoji.parentNode.removeChild(emoji);
    }
  });

  // Remove event listener
  modal.removeEventListener('click', handleModalOutsideClick);
}

// Handle clicking outside modal
function handleModalOutsideClick(e) {
  if (e.target === e.currentTarget) {
    closeCategoryModal();
  }
}

// Add to cart function (you can customize this)
function addToCart(itemName, itemPrice) {
  // Add your cart logic here
  console.log(`Added to cart: ${itemName} - ${itemPrice}`);

  // Show success message (optional)
  const button = event.target;
  const originalText = button.textContent;
  button.textContent = 'Added!';
  button.style.background = 'linear-gradient(135deg, #10b981, #059669)';

  setTimeout(() => {
    button.textContent = originalText;
    button.style.background = 'linear-gradient(135deg, #ff6b00, #ff8533)';
  }, 1500);

  // You can also trigger a cart update notification here
  showCartNotification(itemName);
}

// Cart notification function (optional enhancement)
function showCartNotification(itemName) {
  // Create notification element
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, #10b981, #059669);
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    box-shadow: 0 10px 25px rgba(0,0,0,0.2);
    z-index: 10000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    max-width: 300px;
  `;
  notification.innerHTML = `
    <div style="display: flex; align-items: center; gap: 0.5rem;">
      <span style="font-size: 1.2rem;">✅</span>
      <span><strong>${itemName}</strong> added to cart!</span>
    </div>
  `;

  document.body.appendChild(notification);

  // Animate in
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // Animate out and remove
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    const modal = document.getElementById('categoryModal');
    if (modal && modal.classList.contains('active')) {
      closeCategoryModal();
    }
  }
});

// Initialize modal when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Ensure modal exists
  const modal = document.getElementById('categoryModal');
  if (!modal) {
    console.error('Category modal not found. Make sure the modal HTML is added to your page.');
  }
});
// document.addEventListener('DOMContentLoaded', function() {
//   // Counter Animation
//   const counters = document.querySelectorAll('.counter');
//
//   const animateCounter = (counter) => {
//     const target = parseInt(counter.getAttribute('data-count'));
//     const increment = target / 100;
//     let current = 0;
//
//     const updateCounter = () => {
//       if (current < target) {
//         current += increment;
//         counter.textContent = Math.ceil(current).toLocaleString();
//         requestAnimationFrame(updateCounter);
//       } else {
//         counter.textContent = target.toLocaleString();
//       }
//     };
//
//     updateCounter();
//   };
//
//   // Intersection Observer for counters
//   const counterObserver = new IntersectionObserver((entries) => {
//     entries.forEach(entry => {
//       if (entry.isIntersecting) {
//         const counter = entry.target;
//         animateCounter(counter);
//         counterObserver.unobserve(counter);
//       }
//     });
//   }, { threshold: 0.5 });
//
//   counters.forEach(counter => {
//     counterObserver.observe(counter);
//   });
//
//   // Parallax effect for cards
//   window.addEventListener('scroll', () => {
//     const scrolled = window.pageYOffset;
//     const cards = document.querySelectorAll('.value-card, .team-card');
//
//     cards.forEach((card, index) => {
//       const speed = 0.5 + (index * 0.1);
//       const yPos = -(scrolled * speed);
//       card.style.transform = `translateY(${yPos}px)`;
//     });
//   });
//
//   // Add stagger animation to team cards
//   const teamCards = document.querySelectorAll('.team-card');
//   teamCards.forEach((card, index) => {
//     card.style.animationDelay = `${index * 0.2}s`;
//   });
//
//   // Add hover sound effect (optional)
//   const hoverCards = document.querySelectorAll('.value-card, .team-card, .award-card');
//   hoverCards.forEach(card => {
//     card.addEventListener('mouseenter', () => {
//       card.style.transition = 'all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
//     });
//   });
// });

// Theme Toggle Functionality


