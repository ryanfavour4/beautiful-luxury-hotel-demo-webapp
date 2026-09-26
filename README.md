# Easy Crypto Wallet

A modern, responsive cryptocurrency wallet and trading platform built with React, TypeScript, and Vite.

![Easy Crypto Wallet](public/logo-icon.png)

## 🚀 Features

- **User Authentication**: Secure login, registration, and password recovery
- **Wallet Management**: View and manage multiple cryptocurrency assets
- **Trading**: Buy and sell cryptocurrencies with real-time market data
- **Deposits & Withdrawals**: Fund your account and withdraw your assets
- **Transaction History**: Track all your transactions in one place
- **Market Data**: Real-time cryptocurrency price tracking with TradingView integration
- **KYC Verification**: Complete identity verification process
- **Referral System**: Invite friends and earn rewards
- **Support System**: Get help when you need it
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Dark/Light Mode**: Choose your preferred theme
- **PWA Support**: Install as a Progressive Web App

## 📋 Tech Stack

- **Frontend**: React 19, TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS
- **State Management**: Zustand
- **API Handling**: Axios, TanStack Query
- **Routing**: React Router v7
- **Charts**: ApexCharts, TradingView Widgets
- **Form Handling**: Custom form components
- **Authentication**: JWT with secure storage
- **PWA**: Vite PWA Plugin

## 🛠️ Project Structure

```
easy-crypto-wallet/
├── public/             # Static assets and PWA manifest
├── src/
│   ├── api/            # API integration
│   │   ├── hooks/      # React Query hooks
│   │   └── services/   # API service functions
│   ├── assets/         # Images and other assets
│   ├── components/     # Reusable UI components
│   ├── config/         # Configuration files
│   ├── constants/      # Application constants
│   ├── context/        # React context providers
│   ├── hooks/          # Custom React hooks
│   ├── json/           # Static JSON data
│   ├── layout/         # Layout components
│   ├── pages/          # Application pages
│   ├── routes/         # Routing configuration
│   ├── store/          # Zustand state stores
│   ├── styles/         # Global styles
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   └── widget/         # External widget integrations
└── ...config files     # Various configuration files
```

## 🚦 Getting Started

### Prerequisites

- Node.js (v18+)
- Yarn or npm

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/easy-crypto-wallet.git
   cd easy-crypto-wallet
   ```

2. Install dependencies
   ```bash
   yarn install
   # or
   npm install
   ```

3. Create a `.env` file in the root directory with your environment variables
   ```
   VITE_API_URL=your_api_url
   ```

4. Start the development server
   ```bash
   yarn dev
   # or
   npm run dev
   ```

5. Open your browser and navigate to `http://localhost:5000`

## 🔧 Available Scripts

- `yarn dev` - Start the development server
- `yarn build` - Build the production-ready app
- `yarn lint` - Run ESLint to check code quality
- `yarn preview` - Preview the production build locally

## 📱 PWA Support

This application supports Progressive Web App features, allowing users to install it on their devices for an app-like experience.

## 🔒 Security Features

- Encrypted local storage
- Protected routes
- Secure API communication
- Input validation and sanitization

## 🎨 UI/UX Features

- Responsive design for all device sizes
- Dark and light theme support
- Smooth animations and transitions
- Intuitive navigation
- Real-time data updates

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [TailwindCSS](https://tailwindcss.com/)
- [TradingView](https://www.tradingview.com/)
- [ApexCharts](https://apexcharts.com/)
- [TanStack Query](https://tanstack.com/query)