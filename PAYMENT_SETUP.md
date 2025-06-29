# Payment System Setup Guide

This guide will help you set up the comprehensive payment system for FarmConnect donations.

## Features

- **PayPal Integration**: Secure PayPal payments
- **Apple Pay Support**: Native Apple Pay integration for iOS devices
- **Credit/Debit Card Processing**: Stripe-powered card payments
- **Bank Selection**: Canadian bank options for card payments
- **Form Validation**: Comprehensive client-side validation
- **Responsive Design**: Works on all devices
- **Confirmation Page**: Professional donation confirmation

## File Structure

```
├── donation.html              # Main donation page
├── donation-confirmation.html # Confirmation page
├── payment.js                 # Payment processing logic
├── payment.css                # Payment-specific styles
├── style.css                  # General styles
└── PAYMENT_SETUP.md          # This file
```

## Setup Instructions

### 1. PayPal Integration

1. **Create a PayPal Business Account**:
   - Go to [PayPal Developer](https://developer.paypal.com/)
   - Sign up for a PayPal Business account
   - Navigate to the Developer Dashboard

2. **Create an App**:
   - Go to "My Apps & Credentials"
   - Click "Create App"
   - Choose "Business" app type
   - Name your app (e.g., "FarmConnect Donations")

3. **Get Your Client ID**:
   - Copy the Client ID from your app
   - Replace `'test'` in `donation.html` line 11:
   ```html
   <script src="https://www.paypal.com/sdk/js?client-id=YOUR_CLIENT_ID_HERE&currency=CAD"></script>
   ```

4. **Test Mode vs Live Mode**:
   - Use Sandbox credentials for testing
   - Switch to Live credentials for production

### 2. Stripe Integration (Credit/Debit Cards)

1. **Create a Stripe Account**:
   - Go to [Stripe](https://stripe.com/)
   - Sign up for a free account
   - Complete your business verification

2. **Get Your API Keys**:
   - Go to Developers → API Keys
   - Copy your Publishable Key
   - Replace in `payment.js` line 18:
   ```javascript
   stripe = Stripe('pk_test_YOUR_STRIPE_PUBLISHABLE_KEY_HERE');
   ```

3. **Backend Integration** (Required for production):
   - Create a server endpoint to handle payment intents
   - Implement webhook handling for payment confirmations
   - Store donation records in your database

### 3. Apple Pay Setup

1. **Apple Developer Account**:
   - Requires Apple Developer Program membership ($99/year)
   - Create a Merchant ID in Apple Developer Console
   - Configure payment processing certificates

2. **Domain Verification**:
   - Add domain verification file to your website
   - Configure Apple Pay domains in Developer Console

3. **Update Code**:
   - Replace the simulated Apple Pay processing in `payment.js`
   - Implement real Apple Pay session handling

## Configuration Options

### Currency
The system is configured for Canadian Dollars (CAD). To change:
1. Update PayPal SDK URL in `donation.html`
2. Update Stripe currency in backend
3. Update display formatting in `payment.js`

### Bank Options
Canadian banks are pre-configured. To modify:
1. Edit the bank selection in `donation.html` lines 67-76
2. Update bank validation logic in `payment.js`

### Donation Amounts
Pre-set amounts can be modified in `donation.html` lines 25-31:
```html
<option value="5">$5</option>
<option value="10">$10</option>
<option value="20">$20</option>
<option value="50">$50</option>
<option value="100">$100</option>
<option value="custom">Other</option>
```

## Security Considerations

### Client-Side Security
- Never store sensitive payment data
- Use HTTPS in production
- Implement proper input validation
- Sanitize all user inputs

### Server-Side Security
- Validate all payment data server-side
- Use webhooks for payment confirmations
- Implement proper error handling
- Log all payment attempts
- Store minimal payment data (only what's necessary)

### PCI Compliance
- Don't store credit card numbers
- Use tokenized payment methods
- Follow PCI DSS guidelines
- Regular security audits

## Testing

### Test Cards (Stripe)
- **Visa**: 4242424242424242
- **Mastercard**: 5555555555554444
- **American Express**: 378282246310005
- **CVV**: Any 3 digits
- **Expiry**: Any future date

### Test PayPal
- Use PayPal Sandbox accounts
- Create test buyer and seller accounts
- Test both successful and failed payments

## Production Checklist

- [ ] Replace test API keys with live keys
- [ ] Set up HTTPS certificate
- [ ] Configure webhook endpoints
- [ ] Set up database for donation records
- [ ] Implement email confirmations
- [ ] Set up monitoring and logging
- [ ] Test all payment methods
- [ ] Configure error handling
- [ ] Set up backup payment processing
- [ ] Implement fraud detection

## Customization

### Styling
- Modify `payment.css` for visual changes
- Update color scheme in CSS variables
- Adjust responsive breakpoints

### Functionality
- Add additional payment methods
- Implement recurring donations
- Add donation tiers/rewards
- Integrate with CRM systems

### Localization
- Update currency formatting
- Translate text strings
- Adjust date/time formats
- Localize bank options

## Support

For issues or questions:
1. Check browser console for JavaScript errors
2. Verify API keys are correct
3. Test with different payment methods
4. Check network connectivity
5. Review payment provider documentation

## Legal Requirements

- Display terms of service
- Include privacy policy
- Show refund policy
- Comply with local payment regulations
- Maintain proper financial records

## Cost Considerations

- **PayPal**: 2.9% + $0.30 per transaction
- **Stripe**: 2.9% + $0.30 per transaction
- **Apple Pay**: No additional fees (uses existing payment methods)
- **Bank fees**: Vary by institution

## Performance Optimization

- Minify CSS and JavaScript files
- Optimize images and assets
- Use CDN for payment SDKs
- Implement caching strategies
- Monitor page load times

---

**Note**: This is a frontend implementation. For production use, you'll need to implement proper backend processing, database storage, and security measures. 