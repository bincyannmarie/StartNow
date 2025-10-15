# 🚀 PitchScore - Web3 Decentralized Startup Launchpad

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![Aptos](https://img.shields.io/badge/Aptos-Testnet-orange.svg)](https://aptos.dev/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://www.mongodb.com/atlas)

**StartNow** is a revolutionary Web3-based decentralized startup pitch and funding platform built on the Aptos blockchain. It enables entrepreneurs to submit startup ideas, connect with investors, and receive milestone-based funding through smart contracts with automated escrow functionality.

## 🌟 Features

### 🔗 **Blockchain Integration**

- **Aptos Smart Contracts**: Milestone-based escrow system for secure fund management
- **Wallet Integration**: Seamless Petra wallet connectivity
- **Automated Fund Release**: Smart contract-controlled fund distribution based on milestone completion
- **Transparent Transactions**: All investments and milestone completions recorded on-chain

### 💼 **Startup Management**

- **Pitch Submission**: Comprehensive startup pitch creation with business model, financials, and milestones
- **Real-time Analytics**: Track funding progress, investor engagement, and milestone completion
- **Dynamic Filtering**: Search and filter startups by industry, stage, and funding goals
- **Founder Profiles**: Detailed founder information with social links and experience

### 💰 **Investment Features**

- **Secure Escrow**: Funds locked in smart contracts until milestones are achieved
- **Milestone Tracking**: Visual progress indicators for startup development stages
- **Investor Dashboard**: Portfolio management and investment tracking
- **Automated Refunds**: Smart contract-based refund mechanism for failed milestones

### 🎨 **Modern UI/UX**

- **Futuristic Design**: Aurora-themed interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Dark Theme**: Professional dark mode interface
- **Interactive Components**: Engaging user interactions with real-time feedback

## 🏗️ Architecture

### **Frontend (React + TypeScript)**

- **Framework**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom components
- **State Management**: Context API for global state
- **Routing**: React Router for navigation
- **Wallet Integration**: Aptos Wallet Adapter

### **Backend (Node.js + Express)**

- **Runtime**: Node.js with Express.js framework
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT-based auth with Google OAuth
- **API**: RESTful API with comprehensive endpoints
- **Security**: CORS, rate limiting, and input validation

### **Blockchain (Aptos)**

- **Smart Contracts**: Move language contracts for escrow management
- **Network**: Aptos Testnet for development
- **Functions**: `create_pitch`, `invest`, `complete_milestone`, `release_funds`, `refund`

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
2. **Submit Pitch**: Create comprehensive startup pitch with milestones
3. **Track Progress**: Monitor funding progress and investor engagement
4. **Complete Milestones**: Update milestone completion to unlock funds

### For Investors

1. **Explore Startups**: Browse and filter available investment opportunities
2. **Invest with APT**: Secure investments through smart contract escrow
3. **Monitor Investments**: Track startup progress and milestone completion
4. **Automated Returns**: Receive automated fund management through smart contracts

## 🔗 Smart Contract Information

### **Contract Address**

```
Testnet: 0x1 (Placeholder - To be updated after deployment)
```

### **Key Functions**

- `create_pitch(title, description, milestones)`: Create new startup pitch
- `invest(pitch_id, amount)`: Invest APT tokens in a startup
- `complete_milestone(pitch_id, milestone_index)`: Mark milestone as completed
- `release_funds(pitch_id)`: Release escrowed funds to founder
- `refund_investor(pitch_id)`: Process investor refund

### **Transaction Hash Examples**

```
Sample Investment: 0x1234567890abcdef... (To be updated with real transactions)
Sample Milestone: 0xabcdef1234567890... (To be updated with real transactions)
```

## 👥 Team

### **Core Development Team**

- **Rakesh Das** - Full Stack Developer & Project Lead
  - GitHub: [@rakesh-das](https://github.com/rakesh-das)
  - Role: Backend architecture, smart contract integration, database design
- **Agnib Poddar** - UI/UX Developer
  - GitHub: [@agnib-poddar](https://github.com/Agnib01)
  - Role: React components, responsive design, user experience optimization
- **Blockchain Developer** - Smart Contract Engineer
  - GitHub: [@diya-dasgupta](https://github.com/itsmediya1995)
  - Role: Aptos Move contracts, wallet integration, transaction handling

### **Project Contributors**

- **Product Manager**: Feature planning and user story development
- **QA Engineer**: Testing automation and quality assurance
- **DevOps Engineer**: Deployment pipeline and infrastructure management

## 🛠️ Technology Stack

### **Frontend**

- React 18 + TypeScript
- Tailwind CSS + Framer Motion
- Aptos Wallet Adapter
- React Router + Context API
- Lucide React Icons

### **Backend**

- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Google OAuth 2.0
- CORS + Security Middleware

### **Blockchain**

- Aptos Blockchain (Testnet)
- Move Smart Contracts
- Petra Wallet Integration
- @aptos-labs/ts-sdk

### **DevOps & Deployment**

- Vercel (Frontend)
- Render (Backend)
- MongoDB Atlas (Database)
- GitHub Actions (CI/CD)

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

### **Investments**

- `POST /api/investments/blockchain-pitch` - Create blockchain pitch
- `POST /api/investments/aptos-invest` - Process Aptos investment
- `POST /api/investments/complete-milestone` - Complete milestone
- `POST /api/investments/release-funds` - Release escrowed funds

## 🔒 Security Features

- **Smart Contract Security**: Milestone-based fund release with automated escrow
- **JWT Authentication**: Secure user session management
- **Input Validation**: Comprehensive request validation and sanitization
- **CORS Protection**: Cross-origin request security
- **Rate Limiting**: API endpoint protection against abuse
- **Wallet Security**: Non-custodial wallet integration with user-controlled private keys

## 🚀 Deployment

### **Production URLs**

- **Frontend**: https://start-now-xi.vercel.app
- **Backend API**: https://startnow-9c9x.onrender.com
- **Database**: MongoDB Atlas (Cloud)

### **Environment Configuration**

- Production environment variables configured for scalability
- Automated deployment pipeline with GitHub integration
- SSL certificates and security headers enabled

## 📈 Roadmap

### **Phase 1: MVP (Completed)**

- ✅ Basic startup pitch submission
- ✅ User authentication system
- ✅ Responsive web interface
- ✅ Database integration

### **Phase 2: Blockchain Integration (Completed)**

- ✅ Aptos wallet connectivity
- ✅ Smart contract development
- ✅ Milestone-based escrow system
- ✅ Investment transaction processing

### **Phase 3: Advanced Features (In Progress)**

- 🔄 Advanced analytics dashboard
- 🔄 Multi-signature wallet support
- 🔄 DAO governance features
- 🔄 Mobile application

### **Phase 4: Scaling (Planned)**

- 📋 Multi-chain support (Ethereum, Solana)
- 📋 Institutional investor features
- 📋 Advanced smart contract templates
- 📋 Global marketplace expansion

## 🤝 Contributing

We welcome contributions from the community! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting pull requests.

### **Development Setup**

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new features
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Aptos Foundation** for blockchain infrastructure
- **MongoDB** for database services
- **Vercel & Render** for hosting platforms
- **Open Source Community** for amazing tools and libraries

## 📞 Contact & Support

- **Project Repository**: https://github.com/rcd-env/
- **Documentation**: https://docs.startnow.com (Coming Soon)
- **Support Email**: support@startnow.com
- **Discord Community**: https://discord.gg/startnow (Coming Soon)

---

**Built with ❤️ by the StartNow Team**

_Empowering the next generation of Web3 startups through decentralized funding and milestone-based escrow systems._
