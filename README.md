# Personal Portfolio Website

A modern, responsive personal portfolio website built with React, Vite, and Node.js. The website features a clean design, dark/light theme support, and smooth animations.

## Features

- 🎨 Modern and responsive design
- 🌓 Dark/Light theme support
- ⚡ Fast performance with Vite
- 🎭 Smooth animations with Framer Motion
- 📱 Mobile-friendly navigation
- 🎯 SEO optimized
- 🚀 Deployed on GitHub Pages

## Tech Stack

### Frontend
- React 18
- TypeScript
- Vite
- Tailwind CSS
- Framer Motion
- Wouter (for routing)

### Backend
- Node.js
- Express
- MongoDB

## Project Structure

```
personal-portfolio-website/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── hooks/        # Custom React hooks
│   │   ├── pages/        # Page components
│   │   └── types.d.ts    # TypeScript declarations
│   └── package.json
├── server/                # Backend Node.js application
│   ├── src/
│   │   ├── controllers/  # Route controllers
│   │   ├── models/       # Database models
│   │   └── routes/       # API routes
│   └── package.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (for backend)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/nasal-thanseer/personal-portfolio-website.git
   cd personal-portfolio-website
   ```

2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```

3. Install backend dependencies:
   ```bash
   cd ../server
   npm install
   ```

4. Create a `.env` file in the server directory:
   ```
   PORT=5000
   MONGODB_URI=your_mongodb_uri
   ```

### Development

1. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

2. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

The frontend will be available at `http://localhost:5173` and the backend at `http://localhost:5000`.

### Building for Production

1. Build the frontend:
   ```bash
   cd client
   npm run build
   ```

2. Start the production server:
   ```bash
   cd server
   npm start
   ```

## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions. The deployment workflow:

1. Builds the frontend application
2. Deploys the built files to the `gh-pages` branch
3. Updates the base URL for GitHub Pages

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

Nasal Thanseer M Noufal - [@nasal_thanseer](https://twitter.com/nasal_thanseer)

Project Link: [https://github.com/nasal-thanseer/personal-portfolio-website](https://github.com/nasal-thanseer/personal-portfolio-website) 