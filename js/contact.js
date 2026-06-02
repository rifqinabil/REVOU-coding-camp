/**
 * contact.js — Contact form validation and submission handler.
 */

/**
 * Validates an email string.
 * Returns true if the string contains '@' and a valid domain part
 * (at least one character after '@' followed by '.' and a TLD).
 * @param {string} email
 * @returns {boolean}
 */
function isValidEmail(email) {
    if (typeof email !== 'string') return false;
    const atIndex = email.indexOf('@');
    if (atIndex < 1) return false;          // must have chars before @
    const domain = email.slice(atIndex + 1);
    const dotIndex = domain.lastIndexOf('.');
    if (dotIndex < 1) return false;          // must have chars before dot in domain
    if (dotIndex >= domain.length - 1) return false; // must have TLD after dot
    return true;
}

/**
 * Displays an error message below a field.
 * Removes the 'hidden' class and sets the text content.
 * @param {string} fieldId  - The ID of the form field
 * @param {string} message  - Error message string to display
 */
function showError(fieldId, message) {
    const errorEl = document.getElementById('error-' + fieldId);
    if (!errorEl) return;
    errorEl.textContent = message;
    errorEl.classList.remove('hidden');
}

/**
 * Clears the error message for a field.
 * Adds the 'hidden' class and empties the text content.
 * @param {string} fieldId - The ID of the form field
 */
function clearError(fieldId) {
    const errorEl = document.getElementById('error-' + fieldId);
    if (!errorEl) return;
    errorEl.textContent = '';
    errorEl.classList.add('hidden');
}

/**
 * Validates all form fields.
 * @param {{ nama: string, email: string, subjek: string, pesan: string }} formData
 * @returns {{ isValid: boolean, errors: Object.<string, string> }}
 */
function validateForm(formData) {
    const errors = {};

    if (!formData.nama || formData.nama.trim() === '') {
        errors.nama = 'Nama tidak boleh kosong';
    }
    if (!formData.email || formData.email.trim() === '' || !isValidEmail(formData.email.trim())) {
        errors.email = 'Email tidak valid';
    }
    if (!formData.subjek || formData.subjek.trim() === '') {
        errors.subjek = 'Subjek tidak boleh kosong';
    }
    if (!formData.pesan || formData.pesan.trim() === '') {
        errors.pesan = 'Pesan tidak boleh kosong';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

/**
 * Initializes contact form event bindings.
 * Binds submit handler and per-field input events to clear errors.
 */
function initContactForm() {
    const form = document.getElementById('contact-form');
    if (!form) return;

    const submitBtn = document.getElementById('submit-btn');
    const fieldIds = ['nama', 'email', 'subjek', 'pesan'];

    // Clear error on input for each field
    fieldIds.forEach(function (fieldId) {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('input', function () {
                clearError(fieldId);
            });
        }
    });

    // Submit handler
    form.addEventListener('submit', function (e) {
        e.preventDefault();

        // Disable button during validation
        if (submitBtn) submitBtn.disabled = true;

        const formData = {
            nama:   (document.getElementById('nama')   || {}).value || '',
            email:  (document.getElementById('email')  || {}).value || '',
            subjek: (document.getElementById('subjek') || {}).value || '',
            pesan:  (document.getElementById('pesan')  || {}).value || ''
        };

        // Clear all previous errors
        fieldIds.forEach(clearError);

        const result = validateForm(formData);

        if (!result.isValid) {
            // Show errors for each invalid field
            Object.keys(result.errors).forEach(function (fieldId) {
                showError(fieldId, result.errors[fieldId]);
            });
        } else {
            // Show success and reset form
            const successMsg = document.getElementById('form-success');
            if (successMsg) successMsg.classList.remove('hidden');
            form.reset();
            // Hide success message after 5 seconds
            setTimeout(function () {
                if (successMsg) successMsg.classList.add('hidden');
            }, 5000);
        }

        // Re-enable button after validation
        if (submitBtn) submitBtn.disabled = false;
    });
}
