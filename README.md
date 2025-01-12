# Secure Password Generator

A modern, secure password generator built with HTML, CSS, and JavaScript. This web application helps users create strong, customizable passwords with a clean and intuitive interface.

## Features

- **Customizable Password Generation**
  - Adjustable password length (8-64 characters)
  - Toggle uppercase letters
  - Toggle lowercase letters
  - Toggle numbers
  - Toggle special characters

- **Security Features**
  - Entropy-based strength calculation
  - Visual strength indicator
  - Character type validation
  - Secure random generation

- **User Experience**
  - Dark/Light theme toggle
  - Responsive design
  - Copy to clipboard functionality
  - Password grouping for better readability
  - Saved user preferences

- **Modern UI**
  - Clean, minimalist design
  - Smooth animations
  - Intuitive controls
  - Accessibility features

## Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/password-generator.git
cd password-generator
```

2. Install dependencies:
```bash
npm install
```

3. Start the server:
```bash
node app.js
```

4. Open `index.html` in your browser or serve it using a local development server.

## Usage

1. Adjust the password length using the slider
2. Select desired character types (uppercase, lowercase, numbers, symbols)
3. Click "Generate Password" to create a new password
4. Click "Copy" to copy the password to your clipboard
5. Check the strength meter to ensure your password meets your security requirements

## Technical Details

The application uses:
- Pure JavaScript for frontend logic
- Express.js for the backend server
- CSS custom properties for theming
- Local Storage for saving user preferences
- Entropy calculation for password strength assessment

## Security Considerations

- Passwords are generated server-side for improved security
- No passwords are stored or logged
- CORS enabled for local development
- Input validation on both client and server side
- Secure random number generation

## Development

To modify the application:

1. Frontend files:
   - `index.html` - Main structure
   - `style.css` - Styling
   - `script.js` - Client-side logic

2. Backend files:
   - `app.js` - Express server and password generation logic

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Design inspired by modern UI/UX principles
- Password strength calculations based on entropy
- Font families: Inter and Roboto Mono

## Contact

Your Name - [your@email.com](mailto:your@email.com)

Project Link: [https://github.com/yourusername/password-generator](https://github.com/yourusername/password-generator)
