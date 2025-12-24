# Contributing to ERPX

Welcome to the ERPX project! We're excited to have you contribute. This document provides guidelines and instructions for contributing to this project.

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn package manager
- Git

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/hmusamaofficial/ERPX.git
   cd ERPX
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Running Tests**
   ```bash
   npm test
   ```

4. **Running the Application**
   ```bash
   npm start
   ```

## Project Structure

```
ERPX/
├── add-exchange-rate.js          # Exchange rate management module
├── app.js                        # Main application file
├── erpx_single_file_react_app_preview.jsx  # React preview component
├── test-*.js                     # Test files for various modules
├── test-*.spec.js                # Playwright test specifications
├── style.css                     # Application styles
├── index.html                    # Main HTML template
├── README_TESTS.md               # Testing documentation
└── START_HERE.md                 # Quick start guide
```

## Making Changes

### Code Style
- Use consistent naming conventions (camelCase for variables/functions)
- Add meaningful comments for complex logic
- Keep functions small and focused on single responsibility
- Use ESLint for code quality checks

### Testing
- Write tests for new features
- Ensure all existing tests pass before submitting changes
- Follow the existing test patterns in the project
- Include both unit and integration tests when applicable

### Git Workflow

1. Create a new branch for your feature/fix:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit with clear messages:
   ```bash
   git commit -m "feat: Add new feature" 
   # or
   git commit -m "fix: Resolve issue with exchange rates"
   ```

3. Push to your fork and submit a pull request

### Commit Message Guidelines

Use conventional commits format:
- `feat:` for new features
- `fix:` for bug fixes
- `docs:` for documentation updates
- `test:` for test additions/modifications
- `refactor:` for code refactoring
- `chore:` for maintenance tasks

Example:
```
feat: Add currency conversion validation

- Implement validation for exchange rate inputs
- Add error handling for invalid currency codes
- Update tests to cover new validation logic

Closes #123
```

## Testing

### Running Tests
```bash
# Run all tests
npm test

# Run specific test file
npm test test-add-exchange-rate.js

# Run Playwright tests
npm run test:playwright
```

### Test Report
After running tests, check:
- `TEST_EXECUTION_SUMMARY.md` - Overall test results
- `LOGIN_TEST_REPORT.md` - Authentication tests
- `AUTOMATION_TEST_REPORT.md` - Automation suite results

## Reporting Issues

When reporting bugs, please include:
- Clear description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Node.js version and OS
- Screenshots if applicable

## Documentation

- Update README files when adding features
- Keep inline comments current with code changes
- Document API changes in relevant test files
- Update this CONTRIBUTING.md as needed

## Code of Conduct

- Be respectful to all contributors
- Provide constructive feedback
- Help others learn and grow
- Report misconduct appropriately

## Questions?

Feel free to:
- Open an issue for questions
- Check existing documentation first
- Review test files for usage examples
- Check START_HERE.md for quick reference

## License

By contributing, you agree that your contributions will be licensed under the same license as the project.

---

Thank you for contributing to ERPX! 🎉
