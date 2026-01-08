# 🏢 ERPX - Enterprise Resource Planning System

[![GitHub](https://img.shields.io/badge/GitHub-hmusamaofficial-blue?style=flat-square&logo=github)](https://github.com/hmusamaofficial)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-14+-339933?style=flat-square&logo=node.js)](https://nodejs.org/)
[![Playwright](https://img.shields.io/badge/Playwright-Testing-45ba4b?style=flat-square&logo=playwright)](https://playwright.dev/)

> **A comprehensive Enterprise Resource Planning system with automated testing capabilities for TexInnova**

## 🌟 Overview

ERPX is a modern, scalable ERP solution designed for enterprise-level resource management. Built with React and featuring robust automated testing with Playwright, it provides a seamless experience for managing financial operations, exchange rates, and more.

## ✨ Features

- 🔐 **Secure Authentication** - Enterprise-grade login system
- 💱 **Exchange Rate Management** - Multi-currency support with real-time rates
- 📊 **Financial Module** - Complete financials management
- 🧪 **Automated Testing** - Full Playwright test suite
- 🎨 **Modern UI** - React-based responsive interface
- 📱 **Mobile Friendly** - Works on all devices

## 🚀 Quick Start

### Prerequisites

- Node.js v14 or higher
- npm or yarn
- Modern web browser

### Installation

```bash
# Clone the repository
git clone https://github.com/hmusamaofficial/ERPX.git

# Navigate to project directory
cd ERPX

# Install dependencies
npm install

# Install Playwright browsers
npx playwright install
```

### Running the Application

```bash
# Start the application
npm start

# Or open index.html directly in browser
```

### Running Tests

```bash
# Run all tests
npx playwright test

# Run specific test
npx playwright test add-exchange-rate.js --headed

# Run with UI mode
npx playwright test --ui
```

## 📁 Project Structure

```
ERPX/
├── 📄 app.js                    # Main application logic
├── 📄 index.html                # Entry point
├── 📄 style.css                 # Application styles
├── ⚛️ erpx_single_file_react_app_preview.jsx  # React preview
│
├── 🧪 Testing Suite
│   ├── add-exchange-rate.js     # Exchange rate automation
│   ├── test-login.js            # Login tests
│   ├── test-login-advanced.js   # Advanced auth tests
│   ├── test-add-exchange-rate.js
│   └── *.spec.js                # Playwright specs
│
├── 📚 Documentation
│   ├── README.md                # This file
│   ├── CONTRIBUTING.md          # Contribution guidelines
│   ├── START_HERE.md            # Getting started guide
│   ├── README_TESTS.md          # Testing documentation
│   └── MANUAL_BROWSER_GUIDE.md  # Browser testing guide
│
└── 📊 Reports
    ├── TEST_EXECUTION_SUMMARY.md
    ├── LOGIN_TEST_REPORT.md
    └── AUTOMATION_TEST_REPORT.md
```

## 🧪 Test Configuration

The exchange rate test uses the following configuration:

```javascript
const CONFIG = {
  baseUrl: 'https://staging.texinnova.com',
  exchange: {
    from: 'PKR',  // Pakistani Rupee
    to: 'INR',    // Indian Rupee
    rate: 3       // 1 PKR = 3 INR
  },
  viewport: { width: 1280, height: 720 }
};
```

## 🔧 Configuration

| Variable | Description | Default |
|----------|-------------|---------|
| `baseUrl` | Application URL | `https://staging.texinnova.com` |
| `timeout` | Global timeout | `30000ms` |
| `viewport.width` | Browser width | `1280px` |
| `viewport.height` | Browser height | `720px` |

## 📈 Roadmap

- [x] Core ERP functionality
- [x] Exchange rate management
- [x] Automated testing suite
- [x] Login authentication
- [ ] Multi-tenant support
- [ ] Advanced reporting
- [ ] API integrations
- [ ] Mobile application

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guidelines](CONTRIBUTING.md) before submitting a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Author

**Muhammad Usama**
- 🌐 GitHub: [@hmusamaofficial](https://github.com/hmusamaofficial)
- 💼 Fiverr: [i_am_muhammad](https://www.fiverr.com/i_am_muhammad)
- 🏢 Company: [Texinnova](https://texinnova.com)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## ⭐ Support

If you find this project useful, please consider giving it a star ⭐ on GitHub!

---

<p align="center">
  Made with ❤️ by <a href="https://github.com/hmusamaofficial">Muhammad Usama</a>
</p>
