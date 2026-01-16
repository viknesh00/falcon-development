# Falcon Frontend

A high-fidelity, modular, and secure frontend architecture for the Falcon financial platform. This repository is built with scalability, maintainability, and developer experience in top priority.

## 🚀 Project Overview

Falcon is a modern financial dashboard and authentication platform designed with a focus on:
- **Security**: Robust authentication flows including multi-step signup, OTP verification, and KYC integration.
- **Performance**: Optimized asset loading, code splitting, and containerized deployment.
- **Architecture**: Domain-driven feature modules and component-based UI design.
- **Compliance**: Adherence to FCA & PRA standards with Shariah-compliant workflows.

## 🛠 Tech Stack

### Core
- **React 19**: Leveraging the latest concurrent features and server components compatibility.
- **React Router v6**: Declarative routing with nested layouts.
- **Formik & Yup**: Enterprise-grade form state management and schema validation.
- **Axios**: Interceptor-based HTTP client for secure API communication.

### Styling & UI
- **Modular CSS**: Scoped CSS modules for component isolation (`*.module.css`) combined with global utility variables.
- **React Icons**: Optimized icon sets for uniform UI iconography.
- **Responsive Design**: Mobile-first approach targeting all viewports.

### Quality & DevOps
- **Husky & Lint-staged**: Pre-commit hooks to enforce code quality (`ESLint`, `Prettier`).
- **Jest & Testing Library**: Unit and integration testing suites.
- **Docker**: Multi-stage builds for development and production environments.
- **CI/CD Ready**: Configured for automated pipelines with rigorous checks.

---

## 🏗 Getting Started

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x
- Docker (optional, for containerized run)

### Local Development

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd FalconFrontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env` file in the root directory:
   ```env
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_ENV=development
   ```

4. **Start the Development Server**
   ```bash
   npm start
   ```
   Runs on `http://localhost:3000`.

### 🐳 Docker Support

Run the application in a consistent containerized environment.

**Development Mode:**
```bash
docker-compose up --build
```

**Production Build:**
```bash
docker build -t falcon-frontend .
docker run -p 80:80 falcon-frontend
```

---

## 📂 Project Architecture

The codebase follows a clear separation of concerns, grouping files by feature and resource type.

```
src/
├── api/             # API integration & interceptors
├── assets/          # Static assets (Images, Icons, Fonts)
├── components/      # Shared UI components
│   ├── common/      # Generic atoms (Buttons, Inputs, Loaders)
│   └── layout/      # Layout composites (Header, Footer)
├── features/        # Business logic & complex state slices
├── hooks/           # Custom React hooks
├── pages/           # Route views
│   ├── auth/        # Authentication screens (Login, Signup, OTP)
│   ├── dashboard/   # Protected application views
│   └── landingPage/ # Public marketing pages
├── styles/          # Global styles, variables, and typography
├── tests/           # Integration & E2E tests
├── types/           # TypeScript definitions (if migrating to TS)
└── utils/           # Helper functions & formatters
```

---

## 🛡 Code Quality & Workflows

We strictly enforce code quality standards to prevent technical debt.

### Pre-commit Hooks (Husky)
Before every commit, `lint-staged` runs to ensure:
- **Linting**: No ESLint errors.
- **Formatting**: Code is auto-formatted with Prettier.
- **Testing**: Related tests pass.

### Available Scripts
- `npm run lint`: Manually run ESLint.
- `npm run format`: Manually run Prettier.
- `npm test`: Run the test suite.
- `npm run build`: Compile the production bundle.

### Git Flow
- **Feature Branches**: `feature/feature-name`
- **Bug Fixes**: `fix/bug-description`
- **Main/Master**: Production-ready code.

---

## 🧪 Testing

We use **Jest** and **React Testing Library**.

**Run all tests:**
```bash
npm test
```

**Run in CI mode:**
```bash
CI=true npm test
```

### Key Testing Areas
- **Unit Tests**: Utility functions and simple components.
- **Integration Tests**: authentication flows, complex forms, and page interactions.

---

## 🤝 Contribution Guidelines

1. Ensure your code passes all linting and test checks.
2. Follow the established folder structure.
3. Update documentation for major changes.
4. Open a Pull Request with a clear description of changes.

---

**© 2026 Falcon Platform. All rights reserved.**
