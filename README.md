# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

---

<br />
<div align="center">
  <h1 align="center">NutriTrack</h1>
  <p align="center">
    A modern, comprehensive health and wellness tracking application built with React.
    <br />
    <a href="https://github.com/Jz100505/NutriTrack-v2"><strong>Explore the docs »</strong></a>
  </p>
</div>

## 📖 About The Project

NutriTrack is an all-in-one personal health dashboard designed to make self-care intuitive and engaging. It provides users with a beautifully crafted interface to monitor daily habits including nutrition, hydration, sleep cycles, and community engagement. 

By centralizing scattered health metrics into a single, cohesive dashboard, NutriTrack empowers users to take actionable steps toward their fitness and wellness goals.

---

## 📘 User Guide: Running the Application Locally

Once you have cloned the repository, follow this step-by-step user guide to start the application:

**Step 1: Navigate to the project directory**
Locate the folder where the project was cloned and enter it:

```bash
cd NutriTrack-v2
```

**Step 2: Install NPM packages**
Download all the necessary dependencies that the project requires to function:

```bash
npm install
```

**Step 3: Start the development server**
Run the application locally using Vite's fast dev server:

```bash
npm run dev
```

**Step 4: View the Application**
Once the server is running, Vite will provide a localized link. Open your browser and navigate to the local URL (usually `http://localhost:5173`) to view and interact with the NutriTrack dashboard.

---

## 🛠️ Built With / Tools Used

- **React 19**: The core engine driving the application. Used for building modular, reusable component-based user interfaces.
- **Vite**: Next-generation, blazing fast frontend tooling. Chosen for its rapid Hot Module Replacement (HMR) and optimized build times.
- **Vanilla CSS3**: The application utilizes fully custom, responsive, and rich aesthetic styling tailored from scratch, avoiding the bloat of heavy CSS frameworks.
- **ESLint**: Configured meticulously to maintain code quality, catch syntax errors early, and ensure architectural best practices across the React ecosystem.

---

## 🌟 Core Features & Pages

NutriTrack is divided into several highly specialized modules:

- **Dynamic Onboarding (`<Onboarding />`)**: A welcoming, structured flow designed to accurately capture initial user metrics and wellness goals efficiently.
- **Personalized Dashboard (`<Dashboard />`)**: The central hub. It presents an aggregated, high-level summary of the user's daily progress using visual data cards.
- **Water Tracker (`<Water />` & `<WaterGauge />`)**: Interactive visuals and fluid animations to log liquid intake and track daily hydration milestones.
- **Sleep Monitoring (`<Sleep />`)**: Detailed insights into rest periods, analyzing sleep cycles and offering recommendations for better recovery.
- **Nutrition & Recipes (`<Recipes />`)**: A dedicated interface to log daily meals and explore curated, healthy recipes tailored specifically to the user's nutritional targets.
- **NutriBot Integration (`<NutriBot />`)**: An automated assistant/bot page ready to help answer immediate wellness inquiries.
- **Adaptive Navigation (`<Sidebar />` & `<MobNav />`)**: Features a responsive Desktop Sidebar that gracefully degrades into a compact, thumb-friendly Mobile Navigation bar on smaller screens.

---

## 🧠 Tackled Challenges & Technical Highlights

During the development of NutriTrack, several technical and design hurdles were successfully navigated:

- **Complex UI Visualizations**: Building custom, interactive components like the Circular Progress `<Ring />` and the `<WaterGauge />`. This required precise mathematical layout, SVG manipulation, and CSS animations to accurately reflect dynamic state changes over time.
- **Responsive Design Consistency**: Achieving a seamless visual transition from a complex desktop environment into a mobile-first layout. This involved strict CSS Grid/Flexbox architectural planning to ensure no compromises were made regarding accessibility or context.
- **State & Data Flow Management**: Managing complex user health data (ranging from water intake measurements to recipe lists and sleep metrics) consistently across various deeply nested pages without triggering unnecessary component re-renders.
- **Asset & Performance Optimization**: Keeping the application lightweight and incredibly fast by leveraging Vite's ecosystem. SVGs were utilized heavily over rasterized images to maintain crisp visuals on high-DPI displays without increasing payload size.

---

## 📁 Project Structure

Here is a quick overview of the repository structure to help you navigate the codebase:

```text
nutritrack/
├── public/                 # Static assets (favicons, generic SVGs, manifest)
├── src/                    # Main application source code
│   ├── assets/             # Images and local media assets used within components
│   ├── components/         # Reusable UI components (Icons, Logo, Ring, WaterGauge, etc.)
│   ├── pages/              # Primary application views/routes (Dashboard, Sleep, Water, etc.)
│   ├── App.jsx             # Main application component and internal routing hub
│   ├── main.jsx            # Application entry point and DOM mounting
│   └── styles.css          # Global styling, layout resets, and CSS variables
├── .gitignore              # Files and directories ignored by Git version control
├── eslint.config.js        # Linter rules and configuration
├── index.html              # The foundational HTML template
├── package.json            # Project dependencies and executable npm scripts
└── vite.config.js          # Vite bundler configuration
```
