// ===== SIGNUP MODAL FUNCTIONALITY =====

// Get DOM elements
const openSignupBtn = document.getElementById('openSignupBtn');
const closeSignupBtn = document.getElementById('closeSignupBtn');
const signupModal = document.getElementById('signupModal');
const signupForm = document.getElementById('signupForm');

// Form inputs
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('password');
const confirmPasswordInput = document.getElementById('confirmPassword');
const monthInput = document.getElementById('month');
const dayInput = document.getElementById('day');
const yearInput = document.getElementById('year');
const genderInputs = document.querySelectorAll('input[name="gender"]');

// Error message elements
const usernameError = document.getElementById('usernameError');
const passwordError = document.getElementById('passwordError');
const confirmPasswordError = document.getElementById('confirmPasswordError');
const birthdayError = document.getElementById('birthdayError');
const genderError = document.getElementById('genderError');

// Sample database of taken usernames (in real app, this would be from a server)
const takenUsernames = ['admin', 'user123', 'robloxfan', 'player1', 'testuser'];

// ===== MODAL OPEN/CLOSE =====
openSignupBtn.addEventListener('click', function() {
    signupModal.classList.add('show');
    document.body.style.overflow = 'hidden'; // Prevent scrolling
});

closeSignupBtn.addEventListener('click', function() {
    closeModal();
});

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    if (event.target === signupModal) {
        closeModal();
    }
});

function closeModal() {
    signupModal.classList.remove('show');
    document.body.style.overflow = 'auto'; // Re-enable scrolling
    resetForm();
}

// ===== USERNAME VALIDATION =====
usernameInput.addEventListener('blur', validateUsername);
usernameInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        validateUsername();
    } else {
        clearError(usernameInput, usernameError);
    }
});

function validateUsername() {
    const username = usernameInput.value.trim();
    
    if (!username) {
        showError(usernameInput, usernameError, 'Username is required');
        return false;
    }
    
    if (username.length < 3) {
        showError(usernameInput, usernameError, 'Username must be at least 3 characters');
        return false;
    }
    
    if (username.length > 20) {
        showError(usernameInput, usernameError, 'Username must be 20 characters or less');
        return false;
    }
    
    if (takenUsernames.includes(username.toLowerCase())) {
        showError(usernameInput, usernameError, 'Username is already taken');
        return false;
    }
    
    clearError(usernameInput, usernameError);
    return true;
}

// ===== PASSWORD VALIDATION =====
passwordInput.addEventListener('blur', validatePassword);
passwordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        validatePassword();
        // Also check confirm password if it has a value
        if (confirmPasswordInput.value.length > 0) {
            validateConfirmPassword();
        }
    } else {
        clearError(passwordInput, passwordError);
    }
});

function validatePassword() {
    const password = passwordInput.value;
    
    if (!password) {
        showError(passwordInput, passwordError, 'Password is required');
        return false;
    }
    
    if (password.length < 6) {
        showError(passwordInput, passwordError, 'Password must be at least 6 characters');
        return false;
    }
    
    clearError(passwordInput, passwordError);
    return true;
}

// ===== CONFIRM PASSWORD VALIDATION =====
confirmPasswordInput.addEventListener('blur', validateConfirmPassword);
confirmPasswordInput.addEventListener('input', function() {
    if (this.value.length > 0) {
        validateConfirmPassword();
    } else {
        clearError(confirmPasswordInput, confirmPasswordError);
    }
});

function validateConfirmPassword() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    
    if (!confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Please confirm your password');
        return false;
    }
    
    if (password !== confirmPassword) {
        showError(confirmPasswordInput, confirmPasswordError, 'Passwords do not match');
        return false;
    }
    
    clearError(confirmPasswordInput, confirmPasswordError);
    return true;
}

// ===== BIRTHDAY VALIDATION =====
[monthInput, dayInput, yearInput].forEach(input => {
    input.addEventListener('blur', validateBirthday);
    input.addEventListener('input', function() {
        if (this.value.length > 0) {
            validateBirthday();
        }
    });
});

function validateBirthday() {
    const month = monthInput.value;
    const day = dayInput.value;
    const year = yearInput.value;
    
    // Check if all fields are filled
    if (!month || !day || !year) {
        showError(monthInput, birthdayError, 'Please enter a complete date');
        return false;
    }
    
    const monthNum = parseInt(month);
    const dayNum = parseInt(day);
    const yearNum = parseInt(year);
    
    // Validate month
    if (monthNum < 1 || monthNum > 12) {
        showError(monthInput, birthdayError, 'Month must be between 1 and 12');
        return false;
    }
    
    // Validate day
    if (dayNum < 1 || dayNum > 31) {
        showError(dayInput, birthdayError, 'Day must be between 1 and 31');
        return false;
    }
    
    // Validate year
    if (yearNum < 1900 || yearNum > 2024) {
        showError(yearInput, birthdayError, 'Year must be between 1900 and 2024');
        return false;
    }
    
    // Check if age is at least 13 (Roblox requirement)
    const birthDate = new Date(yearNum, monthNum - 1, dayNum);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        age--;
    }
    
    if (age < 13) {
        showError(monthInput, birthdayError, 'You must be at least 13 years old');
        return false;
    }
    
    clearError(monthInput, birthdayError);
    return true;
}

// ===== GENDER VALIDATION =====
genderInputs.forEach(input => {
    input.addEventListener('change', validateGender);
});

function validateGender() {
    const selectedGender = document.querySelector('input[name="gender"]:checked');
    
    if (!selectedGender) {
        showError(genderInputs[0], genderError, 'Please select a gender');
        return false;
    }
    
    clearError(genderInputs[0], genderError);
    return true;
}

// ===== FORM SUBMISSION =====
signupForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validate all fields
    const isUsernameValid = validateUsername();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    const isBirthdayValid = validateBirthday();
    const isGenderValid = validateGender();
    
    // If all validations pass
    if (isUsernameValid && isPasswordValid && isConfirmPasswordValid && isBirthdayValid && isGenderValid) {
        // Show success message
        const username = usernameInput.value;
        alert(`Welcome ${username}! Your account has been created successfully!`);
        
        // Close modal and reset form
        closeModal();
        
        // Here you would typically send the data to a server
        console.log('Form Data:', {
            username: usernameInput.value,
            password: passwordInput.value,
            birthday: `${monthInput.value}/${dayInput.value}/${yearInput.value}`,
            gender: document.querySelector('input[name="gender"]:checked').value
        });
    } else {
        alert('Please fix the errors before submitting');
    }
});

// ===== HELPER FUNCTIONS =====
function showError(inputElement, errorElement, message) {
    inputElement.classList.add('error');
    errorElement.textContent = message;
}

function clearError(inputElement, errorElement) {
    inputElement.classList.remove('error');
    errorElement.textContent = '';
}

function resetForm() {
    signupForm.reset();
    
    // Clear all error messages and styles
    [usernameInput, passwordInput, confirmPasswordInput, monthInput, dayInput, yearInput].forEach(input => {
        clearError(input, input.id === 'username' ? usernameError : 
                         input.id === 'password' ? passwordError :
                         input.id === 'confirmPassword' ? confirmPasswordError :
                         birthdayError);
    });
    
    clearError(genderInputs[0], genderError);
}

console.log('Signup form loaded successfully!');