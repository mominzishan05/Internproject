document.addEventListener("DOMContentLoaded", () => {
    const buttons = document.querySelectorAll(".add-to-cart-btn");
    const cartCount = document.getElementById("cart-count");
    const cartButton = document.getElementById("cart-button");
    const cartModal = document.getElementById("cart-modal");
    const closeModal = document.getElementById("close-cart");
    const cartItemsDiv = document.getElementById("cart-items");
    const clearCartBtn = document.getElementById("clear-cart");
    const totalPriceDiv = document.getElementById("total-price");

    let cart = [];

    function updateCartCount() {
        const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);
        cartCount.textContent = totalItems;
    }

    function calculateTotalPrice() {
        return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
    }

    function showCart() {
        cartItemsDiv.innerHTML = "";

        if (cart.length === 0) {
            cartItemsDiv.innerHTML = "<p>Your cart is empty.</p>";
            totalPriceDiv.textContent = "Total: ₹0";
            clearCartBtn.style.display = "none";
        } else {
            clearCartBtn.style.display = "inline-block";

            cart.forEach(item => {
                const div = document.createElement("div");
                div.textContent = `${item.name} - ₹${item.price} x ${item.quantity} = ₹${item.price * item.quantity}`;
                cartItemsDiv.appendChild(div);
            });

            totalPriceDiv.textContent = `Total: ₹${calculateTotalPrice()}`;
        }

        cartModal.style.display = "block";
    }

    function addToCart(name, price) {
        price = parseInt(price);

        const existingItem = cart.find(item => item.name === name);

        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            cart.push({ name, price, quantity: 1 });
        }

        updateCartCount();
        
    }

    
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            const productContainer = button.closest(".productcontainer");
            const productName = productContainer.getAttribute("data-name");
            const productPrice = productContainer.getAttribute("data-price");
            addToCart(productName, productPrice);
        });
    });

   
    cartButton.addEventListener("click", (e) => {
        e.preventDefault();
        showCart();
    });

   
    closeModal.addEventListener("click", () => {
        cartModal.style.display = "none";
    });

   
    window.addEventListener("click", (e) => {
        if (e.target === cartModal) {
            cartModal.style.display = "none";
        }
    });

   
    clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateCartCount();
        showCart();
    });

    updateCartCount();
});
