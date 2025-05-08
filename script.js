document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('login-form');
    const usernameInput = document.getElementById('username');
    const passwordInput = document.getElementById('password');
    const passwordToggle = document.getElementById('password-toggle');
    const loginMessage = document.getElementById('login-message');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navbar = document.getElementById('navbar');
    const registerLinkText = document.getElementById('register-link-text');
    const registerLink = document.getElementById('register-link');
    const homeLink = document.getElementById('home-link');
    const navLinks = document.querySelectorAll('nav a');

    mobileToggle.addEventListener('click', function() {
        navbar.classList.toggle('active');
        
        const icon = this.querySelector('i');
        if (navbar.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navbar.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
            
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    passwordToggle.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type');
        passwordInput.setAttribute('type', type === 'password' ? 'text' : 'password');
        
        const icon = this.querySelector('i');
        if (type === 'password') {
            icon.classList.remove('fa-eye');
            icon.classList.add('fa-eye-slash');
        } else {
            icon.classList.remove('fa-eye-slash');
            icon.classList.add('fa-eye');
        }
    });

    registerLinkText.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Redirecting to registration page...');
        
        navLinks.forEach(link => link.classList.remove('active'));
        registerLink.classList.add('active');
    });

    homeLink.addEventListener('click', function(e) {
        e.preventDefault();
        alert('Redirecting to home page...');
    });

    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value;
        const rememberMe = document.getElementById('remember').checked;
        
        if (!username || !password) {
            setLoginMessage('Please enter both username and password', 'error');
            return;
        }
        
        simulateLogin(username, password, rememberMe);
    });

    usernameInput.addEventListener('blur', function() {
        validateInput(this);
    });
    
    passwordInput.addEventListener('blur', function() {
        validateInput(this);
    });

    const socialButtons = document.querySelectorAll('.social-btn');
    socialButtons.forEach(button => {
        button.addEventListener('click', function() {
            const platform = this.classList[1]; 
            
            alert(`Initiating ${platform} login...`);
        });
    });

    document.querySelector('.forgot-password').addEventListener('click', function(e) {
        e.preventDefault();
        
        alert('Password reset functionality would open here...');
    });

    
    function simulateLogin(username, password, rememberMe) {
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Signing in...';
        submitBtn.disabled = true;
        
        setTimeout(() => {
            if (username === 'demo' && password === 'password') {
                
                setLoginMessage('Login successful! Redirecting...', 'success');
                
                if (rememberMe) {
                    localStorage.setItem('remember_user', username);
                } else {
                    localStorage.removeItem('remember_user');
                }
                
                localStorage.setItem('auth_token', 'mock_jwt_token_for_demo');
                
                setTimeout(() => {
                    alert('Redirecting to dashboard...');
                }, 1500);
            } else {
                setLoginMessage('Invalid username or password', 'error');
                submitBtn.innerHTML = originalBtnText;
                submitBtn.disabled = false;
            }
        }, 1500);
    }

    function setLoginMessage(message, type) {
        loginMessage.textContent = message;
        loginMessage.className = 'message';
        loginMessage.classList.add(type);
        loginMessage.style.opacity = '0';
        
        void loginMessage.offsetWidth;
        
        loginMessage.classList.add('visible');
        
        if (type === 'success') {
            loginMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
        } else if (type === 'error') {
            loginMessage.innerHTML = `<i class="fas fa-exclamation-circle"></i> ${message}`;
        }
    }

    function validateInput(input) {
        input.style.borderColor = '';
        
        if (input.value.trim() === '') {
            input.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (input.id === 'username' && input.value.length < 3) {
            input.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        if (input.id === 'password' && input.value.length < 6) {
            input.style.borderColor = 'var(--error-color)';
            return false;
        }
        
        input.style.borderColor = 'var(--success-color)';
        return true;
    }

    function checkRememberedUser() {
        const rememberedUser = localStorage.getItem('remember_user');
        if (rememberedUser) {
            usernameInput.value = rememberedUser;
            document.getElementById('remember').checked = true;
        }
    }

    function checkAuthStatus() {
        const token = localStorage.getItem('auth_token');
        if (token) {
            console.log('User is already logged in');
        }
    }

    checkRememberedUser();
    checkAuthStatus();

    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbar.classList.remove('active');
            const icon = mobileToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
});