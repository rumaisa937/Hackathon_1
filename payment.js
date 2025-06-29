// Payment System JavaScript

// Global variables
let stripe;
let currentAmount = 0;
let selectedPaymentMethod = null;
let paymentInterfaceVisible = false;

// Initialize payment system
document.addEventListener('DOMContentLoaded', function() {
    initializePaymentSystem();
    setupFormValidation();
    setupInputFormatting();
});

// Initialize payment providers
function initializePaymentSystem() {
    // Initialize Stripe (you'll need to replace with your actual publishable key)
    stripe = Stripe('pk_test_your_stripe_publishable_key_here');
}

// Setup form validation
function setupFormValidation() {
    const form = document.getElementById('donationForm');
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }
        
        const paymentMethod = document.querySelector('input[name="paymentMethod"]:checked');
        if (!paymentMethod) {
            showMessage('Please select a payment method.', 'error');
            return;
        }
        
        selectedPaymentMethod = paymentMethod.value;
        showPaymentInterface(selectedPaymentMethod);
    });
}

// Setup input formatting
function setupInputFormatting() {
    // Card number formatting
    const cardNumber = document.getElementById('cardNumber');
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    // Expiry date formatting
    const expiryDate = document.getElementById('expiryDate');
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    // CVV formatting
    const cvv = document.getElementById('cvv');
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Toggle custom amount field
function toggleCustomAmount(select) {
    const customAmount = document.getElementById("customAmountContainer");
    if (select.value === "custom") {
        customAmount.classList.remove("hidden");
        document.getElementById("customAmount").required = true;
    } else {
        customAmount.classList.add("hidden");
        document.getElementById("customAmount").value = "";
        document.getElementById("customAmount").required = false;
    }
}

// Select payment method (just for UI, no processing)
function selectPaymentMethod(method) {
    // Hide all payment-specific forms
    document.getElementById('cardForm').classList.add('hidden');
    document.getElementById('applePayButtonContainer').classList.add('hidden');
    
    // Show relevant form based on selection (for card details only)
    if (method === 'card') {
        document.getElementById('cardForm').classList.remove('hidden');
    }
}

// Show payment interface after form submission
function showPaymentInterface(method) {
    paymentInterfaceVisible = true;
    // Hide the main form
    document.getElementById('donationForm').style.display = 'none';
    
    // Show payment section
    const paymentSection = document.createElement('div');
    paymentSection.id = 'paymentSection';
    paymentSection.innerHTML = `
        <div class="form-section">
            <h3>Complete Your Payment</h3>
            <p>Amount: $${currentAmount.toFixed(2)} CAD</p>
            <p>Payment Method: ${method.charAt(0).toUpperCase() + method.slice(1)}</p>
            <button type="button" onclick="goBackToForm()" style="background-color: #666; margin-bottom: 20px;">
                ← Back to Form
            </button>
        </div>
    `;
    
    document.querySelector('.form-container').appendChild(paymentSection);
    
    // Show appropriate payment interface
    switch(method) {
        case 'applepay':
            showApplePayInterface();
            break;
        case 'card':
            showCardPaymentInterface();
            break;
    }
}

// Go back to form
function goBackToForm() {
    paymentInterfaceVisible = false;
    // Remove payment section
    const paymentSection = document.getElementById('paymentSection');
    if (paymentSection) {
        paymentSection.remove();
    }
    
    // Show the form again
    document.getElementById('donationForm').style.display = 'block';
}

// Show Apple Pay interface
function showApplePayInterface() {
    const paymentSection = document.getElementById('paymentSection');
    const applePayDiv = document.createElement('div');
    applePayDiv.innerHTML = `
        <div class="form-section">
            <h3>Apple Pay Payment</h3>
            <p>Click the Apple Pay button below to complete your donation of $${currentAmount.toFixed(2)} CAD:</p>
            <button type="button" id="applePayButton" class="apple-pay-button" onclick="processApplePay()">
                <span class="apple-pay-text">Pay with Apple Pay</span>
            </button>
        </div>
    `;
    paymentSection.appendChild(applePayDiv);
}

// Show card payment interface
function showCardPaymentInterface() {
    const paymentSection = document.getElementById('paymentSection');
    const cardDiv = document.createElement('div');
    cardDiv.innerHTML = `
        <div class="form-section">
            <h3>Card Details</h3>
            <p>Please enter your card information to complete the donation:</p>
            
            <label for="finalCardNumber">Card Number</label>
            <input type="text" id="finalCardNumber" placeholder="1234 5678 9012 3456" maxlength="19" />
            
            <div class="card-row">
                <div class="card-col">
                    <label for="finalExpiryDate">Expiry Date</label>
                    <input type="text" id="finalExpiryDate" placeholder="MM/YY" maxlength="5" />
                </div>
                <div class="card-col">
                    <label for="finalCvv">CVV</label>
                    <input type="text" id="finalCvv" placeholder="123" maxlength="4" />
                </div>
            </div>
            
            <label for="finalCardholderName">Cardholder Name</label>
            <input type="text" id="finalCardholderName" placeholder="Name on card" />
            
            <button type="button" onclick="processCardPayment()" style="margin-top: 20px;">
                Complete Payment
            </button>
        </div>
    `;
    paymentSection.appendChild(cardDiv);
    
    // Setup formatting for new card inputs
    setupCardInputFormatting();
}

// Setup card input formatting for final payment
function setupCardInputFormatting() {
    const cardNumber = document.getElementById('finalCardNumber');
    const expiryDate = document.getElementById('finalExpiryDate');
    const cvv = document.getElementById('finalCvv');
    
    cardNumber.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        let formattedValue = value.match(/.{1,4}/g)?.join(' ') || value;
        e.target.value = formattedValue;
    });
    
    expiryDate.addEventListener('input', function(e) {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length >= 2) {
            value = value.substring(0, 2) + '/' + value.substring(2, 4);
        }
        e.target.value = value;
    });
    
    cvv.addEventListener('input', function(e) {
        e.target.value = e.target.value.replace(/\D/g, '');
    });
}

// Validate form
function validateForm() {
    const donorName = document.getElementById('donorName').value.trim();
    const email = document.getElementById('email').value.trim();
    const preset = document.getElementById("presetAmount").value;
    const custom = document.getElementById("customAmount").value;
    const amount = preset === "custom" ? custom : preset;
    
    if (!donorName) {
        showMessage('Please enter your name.', 'error');
        return false;
    }
    
    if (!email || !isValidEmail(email)) {
        showMessage('Please enter a valid email address.', 'error');
        return false;
    }
    
    if (!amount || isNaN(amount) || parseFloat(amount) <= 0) {
        showMessage('Please enter a valid donation amount.', 'error');
        return false;
    }
    
    currentAmount = parseFloat(amount);
    
    return true;
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Process Apple Pay
function processApplePay() {
    showMessage('Payment processing is currently disabled. No payments will be processed.', 'error');
    return;
}

// Process card payment
function processCardPayment() {
    showMessage('Payment processing is currently disabled. No payments will be processed.', 'error');
    return;
}

// Validate expiry date
function isValidExpiryDate(expiryDate) {
    const [month, year] = expiryDate.split('/');
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear() % 100;
    const currentMonth = currentDate.getMonth() + 1;
    
    const expMonth = parseInt(month);
    const expYear = parseInt(year);
    
    if (expMonth < 1 || expMonth > 12) return false;
    if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) return false;
    
    return true;
}

// Handle successful payment
function processPaymentSuccess(method, details) {
    const donorName = document.getElementById('donorName').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    const bank = document.getElementById('bank').value;
    
    // Create donation record
    const donation = {
        id: details.id,
        donorName: donorName,
        email: email,
        amount: currentAmount,
        method: method,
        message: message,
        bank: bank,
        timestamp: new Date().toISOString(),
        status: 'completed'
    };
    
    // In a real application, you would send this to your server
    console.log('Donation processed:', donation);
    
    // Show success message and redirect
    showMessage(`Thank you for your donation of $${currentAmount.toFixed(2)}!`, 'success');
    
    setTimeout(() => {
        // Redirect to confirmation page or reset form
        window.location.href = 'donation-confirmation.html?amount=' + currentAmount + '&method=' + method;
    }, 2000);
}

// Show loading overlay
function showLoading() {
    document.getElementById('loadingOverlay').classList.remove('hidden');
}

// Hide loading overlay
function hideLoading() {
    document.getElementById('loadingOverlay').classList.add('hidden');
}

// Show message
function showMessage(message, type) {
    // Remove existing messages
    const existingMessages = document.querySelectorAll('.message');
    existingMessages.forEach(msg => msg.remove());
    
    // Create new message
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${type}`;
    messageDiv.textContent = message;
    
    // Insert at the top of the container
    const container = document.querySelector('.form-container');
    container.insertBefore(messageDiv, container.firstChild);
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
        if (messageDiv.parentNode) {
            messageDiv.remove();
        }
    }, 5000);
}

// Utility function to format currency
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-CA', {
        style: 'currency',
        currency: 'CAD'
    }).format(amount);
} 