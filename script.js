// Tunnel Effect (inspired by Second Reality)
const canvas = document.getElementById('tunnelCanvas');
const ctx = canvas.getContext('2d');

let time = 0;
let animationId;

// Set canvas size
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Tunnel parameters
const tunnelDepth = 256;
const tunnelTexture = [];

// Generate tunnel texture
function generateTunnelTexture() {
    for (let i = 0; i < tunnelDepth; i++) {
        const color = `hsl(${(i * 360 / tunnelDepth)}, 70%, 50%)`;
        tunnelTexture.push(color);
    }
}

generateTunnelTexture();

// Draw tunnel
function drawTunnel() {
    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    
    ctx.fillStyle = '#0a0a0a';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw concentric circles forming a tunnel
    for (let i = 0; i < 20; i++) {
        const depth = (time + i * 10) % tunnelDepth;
        const radius = (tunnelDepth - depth) * 2;
        
        if (radius > 0 && radius < Math.max(canvas.width, canvas.height)) {
            ctx.strokeStyle = tunnelTexture[Math.floor(depth)];
            ctx.lineWidth = 3;
            ctx.globalAlpha = 0.5 - (depth / tunnelDepth) * 0.4;
            
            ctx.beginPath();
            ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
            ctx.stroke();
            
            // Add rotating lines for depth effect
            const angle = (time * 0.02) + (i * 0.3);
            const x1 = centerX + Math.cos(angle) * radius;
            const y1 = centerY + Math.sin(angle) * radius;
            const x2 = centerX + Math.cos(angle + Math.PI) * radius;
            const y2 = centerY + Math.sin(angle + Math.PI) * radius;
            
            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(centerX, centerY);
            ctx.lineTo(x2, y2);
            ctx.stroke();
        }
    }
    
    ctx.globalAlpha = 1;
}

// Animation loop
function animate() {
    time += 2;
    drawTunnel();
    animationId = requestAnimationFrame(animate);
}

animate();

// Smooth scroll for navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            targetSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Parallax effect for sections
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const sections = document.querySelectorAll('.section');
    
    sections.forEach((section, index) => {
        const speed = 0.5;
        const yPos = -(scrolled * speed * (index % 2 === 0 ? 1 : -1));
        
        const plasmaElements = section.querySelectorAll('.plasma-bg, .starfield');
        plasmaElements.forEach(element => {
            element.style.transform = `translateY(${yPos * 0.3}px)`;
        });
    });
});

// Random glitch effect on header
function triggerGlitch() {
    const glitchElement = document.querySelector('.glitch');
    glitchElement.style.animation = 'none';
    
    setTimeout(() => {
        glitchElement.style.animation = 'glitch-anim 3s infinite';
    }, 100);
}

setInterval(() => {
    if (Math.random() > 0.7) {
        triggerGlitch();
    }
}, 5000);

// Plasma animation enhancement
const plasmaBackgrounds = document.querySelectorAll('.plasma-bg');
plasmaBackgrounds.forEach(plasma => {
    let hue = Math.random() * 360;
    
    setInterval(() => {
        hue = (hue + 1) % 360;
        plasma.style.filter = `hue-rotate(${hue}deg) brightness(1.2)`;
    }, 50);
});

// Experience boxes hover effect
const expBoxes = document.querySelectorAll('.exp-box');
expBoxes.forEach(box => {
    box.addEventListener('mouseenter', function() {
        this.style.borderColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
    });
    
    box.addEventListener('mouseleave', function() {
        this.style.borderColor = 'var(--primary-color)';
    });
});

// Interaction diagram animation
const forms = document.querySelectorAll('.form');
let interactionDirection = 1;

setInterval(() => {
    forms.forEach((form, index) => {
        const scale = 1 + (Math.sin(Date.now() * 0.001 + index) * 0.05);
        form.style.transform = `scale(${scale})`;
    });
    
    const arrow = document.querySelector('.interaction-arrow');
    if (arrow) {
        interactionDirection *= -1;
        arrow.style.transform = `scale(${1 + (Math.sin(Date.now() * 0.002) * 0.2)}) rotate(${interactionDirection > 0 ? 0 : 180}deg)`;
    }
}, 50);

// Starfield animation with mouse movement
document.addEventListener('mousemove', (e) => {
    const starfields = document.querySelectorAll('.starfield');
    const mouseX = e.clientX / window.innerWidth - 0.5;
    const mouseY = e.clientY / window.innerHeight - 0.5;
    
    starfields.forEach(starfield => {
        const moveX = mouseX * 50;
        const moveY = mouseY * 50;
        starfield.style.backgroundPosition = `${50 + moveX}% ${50 + moveY}%`;
    });
});

// Add scan line effect to sections on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'section-scan 1s ease-out';
            
            setTimeout(() => {
                entry.target.style.animation = '';
            }, 1000);
        }
    });
}, { threshold: 0.3 });

document.querySelectorAll('.section').forEach(section => {
    observer.observe(section);
});

// Add CSS for section scan animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes section-scan {
        0% {
            box-shadow: inset 0 0 0 0 rgba(0, 255, 0, 0);
        }
        50% {
            box-shadow: inset 0 0 100px 20px rgba(0, 255, 0, 0.3);
        }
        100% {
            box-shadow: inset 0 0 0 0 rgba(0, 255, 0, 0);
        }
    }
`;
document.head.appendChild(style);

// Text typing effect for quotes (on first view)
const quotes = document.querySelectorAll('.quote');
const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('typed')) {
            entry.target.classList.add('typed');
            const originalText = entry.target.textContent;
            entry.target.textContent = '';
            
            let charIndex = 0;
            const typingInterval = setInterval(() => {
                if (charIndex < originalText.length) {
                    entry.target.textContent += originalText[charIndex];
                    charIndex++;
                } else {
                    clearInterval(typingInterval);
                }
            }, 30);
            
            quoteObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

quotes.forEach(quote => {
    quoteObserver.observe(quote);
});

// Add matrix-style falling characters effect to background (subtle)
function createMatrixRain() {
    const matrixCanvas = document.createElement('canvas');
    matrixCanvas.style.position = 'fixed';
    matrixCanvas.style.top = '0';
    matrixCanvas.style.left = '0';
    matrixCanvas.style.width = '100%';
    matrixCanvas.style.height = '100%';
    matrixCanvas.style.zIndex = '0';
    matrixCanvas.style.opacity = '0.03';
    matrixCanvas.style.pointerEvents = 'none';
    
    document.body.insertBefore(matrixCanvas, document.body.firstChild);
    
    const ctx = matrixCanvas.getContext('2d');
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;
    
    const chars = 'ENVIRONMENT×PEREZHIVANIE×INTERACTION×VYGOTSKY×DEMOSCENE×IDEAL×RUDIMENTARY';
    const fontSize = 14;
    const columns = matrixCanvas.width / fontSize;
    const drops = Array(Math.floor(columns)).fill(1);
    
    function drawMatrix() {
        ctx.fillStyle = 'rgba(10, 10, 10, 0.05)';
        ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);
        
        ctx.fillStyle = '#00ff00';
        ctx.font = `${fontSize}px monospace`;
        
        for (let i = 0; i < drops.length; i++) {
            const char = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(char, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > matrixCanvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }
    
    setInterval(drawMatrix, 50);
    
    window.addEventListener('resize', () => {
        matrixCanvas.width = window.innerWidth;
        matrixCanvas.height = window.innerHeight;
    });
}

// Uncomment to enable matrix effect (can be performance intensive)
// createMatrixRain();

// Performance optimization: pause animations when tab is not visible
document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        if (animationId) {
            cancelAnimationFrame(animationId);
        }
    } else {
        animate();
    }
});

// Add easter egg: Konami code
let konamiCode = [];
const konamiSequence = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];

document.addEventListener('keydown', (e) => {
    konamiCode.push(e.key);
    konamiCode = konamiCode.slice(-10);
    
    if (konamiCode.join('') === konamiSequence.join('')) {
        document.body.style.animation = 'rainbow 2s linear infinite';
        
        const style = document.createElement('style');
        style.textContent = `
            @keyframes rainbow {
                0% { filter: hue-rotate(0deg); }
                100% { filter: hue-rotate(360deg); }
            }
        `;
        document.head.appendChild(style);
        
        setTimeout(() => {
            document.body.style.animation = '';
        }, 10000);
    }
});

console.log('%c🌈 PEREZHIVANIE × DEMOSCENE 🌈', 'font-size: 20px; color: #00ff00; text-shadow: 0 0 10px #00ff00;');
console.log('%cThe environment is not a mere background, but the active source of development.', 'font-size: 12px; color: #00ffff;');
console.log('%c- L.S. Vygotsky, 1934', 'font-size: 10px; color: #666;');

// ===== CHATBOT INTEGRATION =====

// Chatbot toggle functionality
const chatToggle = document.getElementById('chat-toggle');
const chatWindow = document.getElementById('chat-window');
const chatClose = document.getElementById('chat-close');
const chatInput = document.getElementById('chat-input');
const chatSend = document.getElementById('chat-send');
const chatMessages = document.getElementById('chat-messages');

// Toggle chat window
chatToggle.addEventListener('click', () => {
    chatWindow.classList.add('active');
    chatInput.focus();
});

chatClose.addEventListener('click', () => {
    chatWindow.classList.remove('active');
});

// Demo responses - Replace with your Next.js chatbot API integration
const demoResponses = {
    'environment': 'The environment in Vygotskian theory is not merely a setting, but the <em>source</em> of development. It contains ideal forms—culturally and historically evolved ways of thinking, speaking, and acting—that guide the transformation of rudimentary abilities into sophisticated human capabilities.',
    
    'perezhivanie': 'Perezhivanie (переживание) is a uniquely Russian concept that captures how a person experiences a situation. It\'s not just "emotion" or "cognition," but their unity—the lived experience that refracts environment through personality. The same situation creates different perezhivanie for different people.',
    
    'interaction': 'Development happens through interaction between ideal and rudimentary forms. The child doesn\'t copy adult speech—they interact with it, transform it, make it their own. This is why social interaction is the mechanism, not just the context, of development.',
    
    'zone': 'The Zone of Proximal Development (ZPD) reveals what a child can do with assistance today, they can do independently tomorrow. It\'s not measuring what is, but what is <em>becoming</em>. The ZPD shows development as process, not product.',
    
    'demoscene': 'Fascinating connection! The demoscene demonstrates Vygotskian principles: ideal forms (legendary demos like Second Reality) guide newcomers, communities provide scaffolding, and constraints (64kb, specific hardware) become the very source of creative development. Cultural tools shape what becomes possible.',
    
    'default': 'That\'s an intriguing question. In Vygotskian terms, we might think about how social interaction and cultural tools mediate development. What specific aspect interests you most—environment, perezhivanie, or interaction?'
};

// Function to add message to chat
function addMessage(content, isUser = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${isUser ? 'user-message' : 'bot-message'}`;
    
    const contentDiv = document.createElement('div');
    contentDiv.className = 'message-content';
    
    if (isUser) {
        contentDiv.innerHTML = `<strong>You:</strong> ${content}`;
    } else {
        contentDiv.innerHTML = `<strong>Perezhivanie AI:</strong> ${content}`;
    }
    
    messageDiv.appendChild(contentDiv);
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to show typing indicator
function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot-message typing-indicator-wrapper';
    typingDiv.id = 'typing-indicator';
    
    const indicator = document.createElement('div');
    indicator.className = 'typing-indicator';
    indicator.innerHTML = '<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>';
    
    typingDiv.appendChild(indicator);
    chatMessages.appendChild(typingDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Function to remove typing indicator
function removeTypingIndicator() {
    const indicator = document.getElementById('typing-indicator');
    if (indicator) {
        indicator.remove();
    }
}

// Function to get bot response
function getBotResponse(userMessage) {
    const lowerMessage = userMessage.toLowerCase();
    
    // Check for keywords
    for (const [keyword, response] of Object.entries(demoResponses)) {
        if (lowerMessage.includes(keyword)) {
            return response;
        }
    }
    
    return demoResponses.default;
}

// TODO: Replace with your Next.js chatbot API integration
// Example API integration:
/*
async function getBotResponseFromAPI(userMessage) {
    try {
        const response = await fetch('YOUR_NEXTJS_CHATBOT_API_URL', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage })
        });
        
        const data = await response.json();
        return data.response;
    } catch (error) {
        console.error('Error fetching from chatbot API:', error);
        return 'I\'m having trouble connecting right now. Please try again later.';
    }
}
*/

// Handle sending messages
async function sendMessage() {
    const message = chatInput.value.trim();
    
    if (message === '') return;
    
    // Add user message
    addMessage(message, true);
    chatInput.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Simulate delay for demo (remove when using real API)
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Get bot response
    const botResponse = getBotResponse(message);
    // For real integration, use: const botResponse = await getBotResponseFromAPI(message);
    
    // Remove typing indicator and add bot response
    removeTypingIndicator();
    addMessage(botResponse, false);
}

// Send message on button click
chatSend.addEventListener('click', sendMessage);

// Send message on Enter key
chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Add some demo conversation starters
setTimeout(() => {
    const starters = [
        'Try asking about "environment", "perezhivanie", or "interaction"',
        'You can also ask about the "zone" (ZPD) or the "demoscene" connection'
    ];
    
    starters.forEach((starter, index) => {
        setTimeout(() => {
            addMessage(starter, false);
        }, index * 2000);
    });
}, 1000);

