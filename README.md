# Alku Personal Website

A personal website that merges L.S. Vygotsky's cultural-historical psychology with demoscene aesthetics inspired by Future Crew's Second Reality (1993).

## 🌟 Concept

This site explores the intersection of:
- **Vygotskian Theory**: Environment as source, perezhivanie (lived experience), and the interaction of ideal and rudimentary forms
- **Demoscene Culture**: Retro graphics, tunnel effects, plasma backgrounds, and CRT aesthetics

The website itself embodies Vygotsky's concept of how ideal forms (cultural achievements) interact with rudimentary forms (individual potential) to create development—much like how legendary demos like Second Reality guided generations of creative coders.

## ✨ Features

### Visual Effects
- **Tunnel Effect**: Animated concentric circles with rotating depth (classic demoscene technique)
- **Plasma Backgrounds**: Dynamic gradient effects with color shifting
- **CRT Screen Effect**: Scanlines and subtle flicker for authentic retro feel
- **Glitch Text**: RGB split glitch animation on header
- **Starfield**: Parallax star movement responding to mouse position
- **Retro Color Palette**: Neon greens, cyans, and magentas

### Interactive Elements
- **AI Chatbot**: "Perezhivanie AI" widget for discussing Vygotskian concepts
- Smooth scrolling navigation
- Parallax effects
- Hover animations
- Typing effects on quotes
- Easter egg: Konami code (↑↑↓↓←→←→BA) for rainbow effect

### Content Sections
1. **The Environment as Source**: How environment shapes development
2. **Perezhivanie**: The unity of person and situation in lived experience
3. **Ideal Forms × Rudimentary Forms**: The mechanism of cultural transmission
4. **About/Contact**: Professional information and links

## 🛠️ Technologies

- Pure HTML5, CSS3, and vanilla JavaScript
- Canvas API for tunnel effect
- CSS animations for visual effects
- Responsive design for mobile and desktop
- Google Fonts: VT323 and Share Tech Mono

## 🚀 Running Locally

```bash
# Clone the repository
git clone https://github.com/alkusiren/personal-website.git

# Navigate to the directory
cd personal-website

# Start a local server (Python 3)
python3 -m http.server 8000

# Or use Node.js
npx http-server -p 8000

# Open in browser
open http://localhost:8000
```

## 🤖 Chatbot Integration

The chatbot currently runs with demo responses about Vygotskian concepts. To integrate with a real AI backend:

1. Deploy your Next.js AI chatbot API
2. Update the API URL in `script.js` (line 433)
3. Uncomment the `getBotResponseFromAPI()` function
4. Replace the call in `sendMessage()` function

```javascript
// Replace this line:
const botResponse = getBotResponse(message);

// With this:
const botResponse = await getBotResponseFromAPI(message);
```

## 📝 Customization

### Update Contact Information
Edit `index.html` around line 175:
- Email: `mailto:your-email@example.com`
- LinkedIn: `https://linkedin.com/in/yourprofile`
- Other social links

### Modify Color Scheme
Edit CSS variables in `styles2.css` (lines 1-10):
```css
:root {
    --primary-color: #00ff00;
    --secondary-color: #00ffff;
    --tertiary-color: #ff00ff;
    --bg-dark: #0a0a0a;
    /* ... */
}
```

### Adjust Animation Speed
Tunnel effect: `script.js` line 78 (`time += 2;`)
Plasma rotation: `styles2.css` line 232 (animation duration)

## 🎨 Design Philosophy

The site demonstrates Vygotsky's key insight: **the environment is not a mere background, but the active source of development.** Just as Second Reality emerged from technical constraints and shaped a generation of creators, cultural tools and ideal forms shape individual development.

**Perezhivanie** (переживание) is the concept that captures how different people experience the same situation differently—the same demo, the same code, the same environment refracts through different prisms of experience.

## 📚 References

- Vygotsky, L.S. (1934). ["The Problem of the Environment"](https://www.marxists.org/archive/vygotsky/works/1934/environment.htm)
- Future Crew (1993). [Second Reality Demo](https://github.com/mtuomi/SecondReality)

## 👤 About

**Alku**  
Senior Advisor  
Miltton & Nordic West Office

Working at the intersection of strategic communication, cultural development, and the social construction of meaning.

## 📄 License

This project is open source and available under the MIT License.

---

*"Without social interaction, we can never develop any of the attributes and characteristics which have developed as a result of the historical evolution of all humankind."* — L.S. Vygotsky, 1934

