/**
 * External JavaScript file for form validation.
 */

function validateForm() {
    let isValid = true; // Flag to track overall form validity

    // Get input field values and trim whitespace
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const phone = document.getElementById('phone').value.trim();
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    // Helper function to show errors
    const setError = (id, message) => {
        document.getElementById(id + 'Error').textContent = message;
        isValid = false;
    };

    // Helper function to clear errors
    const clearError = (id) => {
        document.getElementById(id + 'Error').textContent = '';
    };

    // Clear all previous errors
    clearError('username');
    clearError('email');
    clearError('phone');
    clearError('password');
    clearError('confirmPassword');

    // --- 1. Fields should not be empty (including whitespace-only) ---
    if (username === '') {
        setError('username', 'Username cannot be empty.');
    }
    if (email === '') {
        setError('email', 'Email cannot be empty.');
    }
    if (phone === '') {
        setError('phone', 'Phone number cannot be empty.');
    }
    // Note: Password fields are checked for content below, but a quick check ensures they aren't empty
    if (password === '') {
        setError('password', 'Password cannot be empty.');
    }
    if (confirmPassword === '') {
        setError('confirmPassword', 'Confirm Password cannot be empty.');
    }

    // --- 2. Phone number validation (numeric and 10 digits) ---
    const phoneRegex = /^\d{10}$/; // Exactly 10 digits
    if (phone !== '' && !phoneRegex.test(phone)) {
        setError('phone', 'Phone number must be exactly 10 numeric digits.');
    }

    // --- 3. Password complexity validation ---
    /*
     * Requirements:
     * - Minimum length 7: (?=.{7,})
     * - At least one capital letter: (?=.*[A-Z])
     * - At least one digit: (?=.*\d)
     * - At least one special character (&, $, #, @): (?=.*[& $ # @])
     */
    const passwordRegex = /^(?=.{7,})(?=.*[A-Z])(?=.*\d)(?=.*[& $ # @]).*$/;
    
    if (password !== '' && !passwordRegex.test(password)) {
        setError('password', 'Password must be at least 7 chars long and contain: 1 Cap Letter, 1 Digit, 1 Special Char (&, $, #, or @).');
    }

    // --- 4. Password and Confirm Password must match ---
    if (password !== '' && confirmPassword !== '' && password !== confirmPassword) {
        setError('confirmPassword', 'Passwords do not match.');
    }

    // --- 5. Email address validation ---
    /*
     * Requirements:
     * - Few letters before the @ sign: (\w+)
     * - Must contain @ sign: @
     * - Three letters between @ and .: ([A-Za-z]{3})
     * - Must contain a .: \.
     * - Followed by at least 2 characters (e.g., com): (\w{2,})
     */
    // Note: The specific requirement "three letters between @ and ." is very restrictive.
    // The regex below implements this specific rule: /^(\w+)@([A-Za-z]{3})\.(\w{2,})$/
    const emailRegex = /^(\w+)@([A-Za-z]{3})\.(\w{2,})$/;
    
    if (email !== '' && !emailRegex.test(email)) {
        setError('email', 'Email must be in format: letters@3letters.domain (e.g., user@abc.com)');
    }

    // Prevent form submission if isValid is false
    return isValid;
}
