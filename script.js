const passwordOutput = document.getElementById('password');
const strengthBar = document.getElementById('strength-bar');
const lengthSlider = document.getElementById('length');
const lengthValue = document.getElementById('length-value');

function calculateEntropy(password, characterPool) {
    const poolSize = characterPool.length;
    return Math.floor(password.length * Math.log2(poolSize));
}

function getCharacterPool(options) {
    const { useUppercase, useLowercase, useNumbers, useSymbols } = options;
    let pool = '';
    if (useUppercase) pool += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (useLowercase) pool += 'abcdefghijklmnopqrstuvwxyz';
    if (useNumbers) pool += '0123456789';
    if (useSymbols) pool += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    return pool;
}

function validatePassword(password, options) {
    const { useUppercase, useLowercase, useNumbers, useSymbols } = options;
    const checks = {
        uppercase: useUppercase ? /[A-Z]/.test(password) : true,
        lowercase: useLowercase ? /[a-z]/.test(password) : true,
        numbers: useNumbers ? /[0-9]/.test(password) : true,
        symbols: useSymbols ? /[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password) : true
    };
    return Object.values(checks).every(check => check);
}

async function generatePassword() {
    const options = {
        length: parseInt(lengthSlider.value, 10),
        useUppercase: document.getElementById('uppercase').checked,
        useLowercase: document.getElementById('lowercase').checked,
        useNumbers: document.getElementById('numbers').checked,
        useSymbols: document.getElementById('symbols').checked
    };

    if (!options.useUppercase && !options.useLowercase && 
        !options.useNumbers && !options.useSymbols) {
        alert('Please select at least one character type');
        return;
    }

    try {
        const response = await fetch('http://localhost:3000/generate-password', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(options),
        });

        if (!response.ok) throw new Error('Failed to generate password');
        
        const data = await response.json();
        const password = data.password;
        
        if (!validatePassword(password, options)) {
            return generatePassword();
        }

        displayPassword(password, options);
        updateStrengthIndicator(password, options);
    } catch (error) {
        console.error('Error:', error);
        alert('Error generating password. Please try again.');
    }
}

function displayPassword(password, options) {
    const passwordElement = document.getElementById('password');
    passwordElement.textContent = password;
    const groupSize = 4;
    const formattedPassword = password.match(new RegExp(`.{1,${groupSize}}`, 'g')).join(' ');
    passwordElement.setAttribute('data-formatted', formattedPassword);
}

function updateStrengthIndicator(password, options) {
    const strengthBar = document.getElementById('strength-bar');
    const strengthMessage = document.getElementById('strength-message');
    
    const pool = getCharacterPool(options);
    const entropy = calculateEntropy(password, pool);
    
    const criteria = {
        length: password.length >= 12,
        complexity: (options.useUppercase ? 1 : 0) + 
                   (options.useLowercase ? 1 : 0) + 
                   (options.useNumbers ? 1 : 0) + 
                   (options.useSymbols ? 1 : 0) >= 3,
        entropy: entropy >= 50,
        uniqueness: new Set(password).size > password.length * 0.7
    };

    const strengthScore = Object.values(criteria).filter(Boolean).length;
    const strengthPercentage = (strengthScore / Object.keys(criteria).length) * 100;

    strengthBar.style.width = `${strengthPercentage}%`;
    
    let color, message;
    if (strengthPercentage >= 75) {
        color = '#4CAF50';
        message = `Strong password with ${entropy} bits of entropy`;
    } else if (strengthPercentage >= 50) {
        color = '#FFA500';
        message = 'Moderate - Consider adding more complexity';
    } else {
        color = '#F44336';
        message = 'Weak - Add more character types and length';
    }

    strengthBar.style.backgroundColor = color;
    strengthMessage.textContent = message;
    strengthMessage.style.color = color;
}

function copyToClipboard() {
    const password = document.getElementById('password').textContent;
    if (!password) {
        alert('Please generate a password first');
        return;
    }

    navigator.clipboard.writeText(password).then(() => {
        const copyButton = document.querySelector('button[onclick="copyToClipboard()"]');
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        copyButton.style.backgroundColor = '#4CAF50';
        
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.backgroundColor = '';
        }, 2000);
    }).catch(() => {
        alert('Failed to copy password');
    });
}

function toggleTheme() {
    const body = document.body;
    const themeToggle = document.getElementById('theme-toggle');
    body.classList.toggle('dark-mode');
    const isDarkMode = body.classList.contains('dark-mode');
    themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';
    localStorage.setItem('darkMode', isDarkMode);
}

function savePreferences() {
    const preferences = {
        length: lengthSlider.value,
        uppercase: document.getElementById('uppercase').checked,
        lowercase: document.getElementById('lowercase').checked,
        numbers: document.getElementById('numbers').checked,
        symbols: document.getElementById('symbols').checked,
        darkMode: document.body.classList.contains('dark-mode')
    };
    localStorage.setItem('passwordPreferences', JSON.stringify(preferences));
}

function loadPreferences() {
    const savedPreferences = localStorage.getItem('passwordPreferences');
    if (savedPreferences) {
        const preferences = JSON.parse(savedPreferences);
        lengthSlider.value = preferences.length;
        lengthValue.textContent = preferences.length;
        document.getElementById('uppercase').checked = preferences.uppercase;
        document.getElementById('lowercase').checked = preferences.lowercase;
        document.getElementById('numbers').checked = preferences.numbers;
        document.getElementById('symbols').checked = preferences.symbols;
        if (preferences.darkMode) {
            document.body.classList.add('dark-mode');
            document.getElementById('theme-toggle').textContent = '☀️ Light Mode';
        }
    }

    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'true') {
        document.body.classList.add('dark-mode');
        document.getElementById('theme-toggle').textContent = '☀️ Light Mode';
    }
}

lengthSlider.addEventListener('input', () => {
    lengthValue.textContent = lengthSlider.value;
});

document.addEventListener('DOMContentLoaded', () => {
    loadPreferences();
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.addEventListener('change', savePreferences);
    });
});