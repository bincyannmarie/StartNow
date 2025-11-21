# 🚀 PitchScore - Startup Evaluation & Funding Platform

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Aptos](https://img.shields.io/badge/Aptos-Testnet-orange.svg)](https://aptos.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

**PitchScore** is a modern startup pitch and funding platform that connects entrepreneurs and investors. Startups can submit detailed business ideas, while investors can explore opportunities and track milestones — all in a clean, intuitive interface.

## 🌟 Features

### 💼 **Startup Management**

- Pitch submission with structured forms (business model & milestones)

- Startup details and founder information

- Filter and search startups easily

- Dashboard for progress tracking

### 💰 **Investor Tools**

- Browsing and exploring startup opportunities

- Portfolio visibility and investment progress

- Investor authentication & role-based access

### 🎨 **Modern UI/UX**

- Responsive for all devices

- Tailwind CSS + smooth transitions

- User-friendly dashboards

## 🏗️ Architecture

### **Frontend (React + TypeScript)**

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Context API 
- **Routing**: React Router for navigation
- **API Communication**: RESTful API with Axios or Fetch

### **Backend (Node.js + Express)**

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with Google OAuth
- **API**: RESTful API with comprehensive endpoints
- **Security**: CORS, rate limiting, and input validation

### **Database**

- MongoDB Atlas (Cloud-hosted)

- Schemas for startups, users, investors, milestones
## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- MongoDB Atlas account
- Aptos Petra Wallet
- Git

### Installation

1. **Clone the repository**

```bash
git clone https://github.com/your-username/AptosOnChain.git
cd AptosOnChain
```

2. **Install dependencies**

```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install

# Install contract dependencies
cd ../contract
npm install
```

3. **Environment Setup**

**Server (.env)**

```env
MONGODB_URI=mongodb+srv://admin:admin123@cluster0.f7bzzax.mongodb.net/pitchscore
JWT_SECRET=your-jwt-secret-key
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
FRONTEND_URL=http://localhost:5173
PORT=8080
```

**Client (.env)**

```env
VITE_API_URL=http://localhost:8080
VITE_GOOGLE_CLIENT_ID=your-google-client-id
```

4. **Start the application**

```bash
# Start server (from server directory)
npm start

# Start client (from client directory)
npm run dev
```

5. **Access the application**

- Frontend: http://localhost:5173
- Backend API: http://localhost:8080

## 📱 Usage

### For Entrepreneurs

1. **Connect Wallet**: Link your Petra wallet to the platform
2. **Submit Pitch**: Submit detailed startup pitches with milestones and goals
3. **Track Progress**: Update pitch details and track investor engagement
4. **Complete Milestones**: Update milestone completion to unlock funds

### For Investors

1. **Explore Startups**: Browse and filter available investment opportunities
2. **Invest with APT**: Secure investments through smart contract escrow
3. **Monitor Investments**: Track startup progress and milestone completion
4. **Automated Returns**: Receive automated fund management through smart contracts

### **Key Functions**

- `create_pitch(title, description, milestones)`: Create new startup pitch
- `invest(pitch_id, amount)`: Invest APT tokens in a startup
- `complete_milestone(pitch_id, milestone_index)`: Mark milestone as completed
- `release_funds(pitch_id)`: Release escrowed funds to founder
- `refund_investor(pitch_id)`: Process investor refund

## 👥 Team

### **Core Development Team**

- **Bincy Ann Marie Joseph** 
  - GitHub: [@bincyannmarie](https://github.com/bincyannmarie)
- **Nitika Achu Vinod** 
  - GitHub: [@nitikaachuvinod2005-cmd](https://github.com/nitikaachuvinod2005-cmd)
- **Pavithra Vijayakumar** 
  - GitHub: [@Pavivk21](https://github.com/Pavivk21)
- **Yazeen Meshal Sanuj**
  - GitHub: [@yazeenmeshal](https://github.com/yazeenmeshal)

## 🛠️ Technology Stack

### **Frontend**

- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- REST API integration
- React Router + Context API
- Lucide React Icons

### **Backend**

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Google OAuth 2.0
- CORS + Security Middleware

## 📊 API Endpoints

### **Authentication**

- `POST /auth/register` - User registration
- `POST /auth/login` - User login
- `GET /auth/google` - Google OAuth login
- `GET /auth/me` - Get current user

### **Startups**

- `GET /api/startups` - Get all startups
- `POST /api/startups` - Create new startup
- `GET /api/startups/:id` - Get startup by ID
- `PUT /api/startups/:id` - Update startup

## 🔒 Security Features

- **JWT Authentication**: Secure user session management
- **Input Validation**: Comprehensive request validation and sanitization
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API endpoint protection against abuse
