# DashboardQuick

A pixel-perfect desktop dashboard UI built with **React**, **Next.js**, and **Tailwind CSS**, inspired by BlinkIt’s internal category management and scraping tools.

## 🚀 Features

- 📊 Category and subcategory display
- 📦 Integration-ready scraping endpoints for product listings
- 📍 Location-based data filtering using lat/lng
- 🎯 Pixel-perfect UI based on Figma designs
- 🖥️ Optimized for desktop (not responsive)
- ⚛️ Built using React + Next.js with modular components

## 📁 Folder Structure

```
.
├── app/                  # Next.js app directory
│   └── layout.tsx        # Root layout
├── components/           # UI components
├── lib/                  # API logic / helpers
├── public/               # Static assets
├── styles/               # Tailwind / global CSS
├── pages/                # Route-based pages (if used)
├── .env.local            # Environment variables
└── README.md             # You're here!
```

## 🛠️ Getting Started

```bash
# Clone the repo
git clone https://github.com/chiragSahani/DashboardQuick.git

# Go into the project directory
cd DashboardQuick

# Install dependencies (use --legacy-peer-deps if ERESOLVE error occurs)
npm install --legacy-peer-deps

# Run the development server
npm run dev
```

## 🔧 Troubleshooting

> 💡 **Note:** If you face a date-fns conflict with `react-day-picker`, install compatible versions:
```bash
npm install date-fns@^2.28.0
```

## 📦 Dependencies

This project leverages the following key technologies:
- React
- Next.js
- Tailwind CSS
- date-fns
- react-day-picker

## 🧪 To-Do / Upcoming

- [ ] Add responsiveness for mobile/tablet
- [ ] Authentication for private dashboards
- [ ] Dashboard analytics and charts
- [ ] Integrate scraping API for live data feed

## ⭐ Support

If you find this project helpful, please consider starring the repository to show your support!

## 📄 License

This project is licensed under the MIT License.


Made with ❤️ by [Chirag Sahani](https://github.com/chiragSahani)
