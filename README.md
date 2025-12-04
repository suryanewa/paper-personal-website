# Surya Newa - Paper Personal Website

A beautifully crafted, interactive resume website featuring a hand-drawn aesthetic with paper textures, ink animations, and custom cursor effects. Built with React, TypeScript, Tailwind CSS, and GSAP.

## ✨ Features

- **Custom Ink Blob Cursor** - Unique cursor effect that follows mouse movement with smooth animations
- **Paper Texture Design** - Handcrafted aesthetic with textured paper backgrounds and lifted card effects
- **Animated Section Icons** - SVG icons that draw in on scroll with path animations
- **Interactive Elements** - Hover effects on cards, chips, and links with ink blob cursor integration
- **Responsive Design** - Mobile-first approach with hamburger navigation and optimized layouts
- **Scroll Animations** - GSAP-powered scroll-triggered animations throughout
- **Squiggly Progress Bar** - Visual scroll progress indicator in the navigation
- **Print/Download Support** - Direct PDF download and print functionality

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or higher recommended)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/simple-resume.git
cd simple-resume
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## 📦 Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory, ready to be deployed to any static hosting service.

## 🛠️ Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **GSAP (GreenSock)** - Animation library
- **Lucide React** - Icon library
- **Animate UI** - Animated icon library

## 📁 Project Structure

```
simple-resume/
├── components/          # React components
│   ├── Hero.tsx        # Hero section with portrait and signature
│   ├── Navigation.tsx  # Top navigation and progress bar
│   ├── Experience.tsx  # Professional experience section
│   ├── Education.tsx   # Education section
│   ├── Projects.tsx    # Selected projects showcase
│   ├── Publications.tsx # Publications section
│   ├── Skills.tsx      # Skills & interests section
│   ├── Competitions.tsx # Competitions & awards
│   ├── Footer.tsx      # Footer with download buttons
│   └── CustomCursor.tsx # Custom ink blob cursor
├── public/
│   └── assets/         # Static assets (images, PDFs, logos)
├── constants.ts         # Resume data
├── types.ts            # TypeScript type definitions
└── index.html          # HTML entry point
```

## 🎨 Customization

To customize the resume content, edit `constants.ts` which contains all the resume data:

- Personal information
- Experience entries
- Education history
- Projects
- Skills and interests
- Publications
- Competitions & awards

Note that you will need to update the signature animation logic if you choose to use your own signature.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Surya Newa**
- Website: [suryanewa.com](https://suryanewa.com)
- LinkedIn: [linkedin.com/in/suryanewa](https://linkedin.com/in/suryanewa)
- GitHub: [github.com/suryanewa](https://github.com/suryanewa)

---

Built with ❤️ using React, TypeScript, Tailwind CSS, and GSAP
