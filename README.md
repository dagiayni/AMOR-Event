# AMOR - Luxury Valentine's Event Registration

A premium, full-stack web application designed for high-end event registration.

## ✨ Features
- **Luxury UI**: Dark-themed aesthetic with gold/champagne accents and premium typography.
- **Animations**: Fluid scroll reveal, hover glows, and staggered entrances using Framer Motion.
- **Responsive**: Mobile-first architecture, stunning on all devices.
- **Full-Stack**: Next.js 15+ (App Router) frontend with a secure PHP backend.
- **Automated Emails**: Integrated PHPMailer for client verification and admin notification.
- **Secure Uploads**: File validation and storage for identification/attachments.

## 📁 Project Structure
- `frontend/`: Next.js application.
- `backend/`: PHP API and email templates.

## 🚀 Getting Started

### Backend Setup
1. **Requirements**: PHP 7.4+ and Composer.
2. Navigate to `/backend`:
   ```bash
   composer install
   ```
3. Configure SMTP in `/backend/config/mail.php`.
4. Ensure the `/backend/uploads` folder is writable.
5. Host the `backend` folder on a web server (e.g., Apache/Nginx).

### Frontend Setup
1. **Requirements**: Node.js 18+.
2. Navigate to `/frontend`:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. **API Configuration**: Update the fetch URL in `/frontend/components/RegistrationForm.tsx` to match your production backend URL.

## 🔐 Security
- Inputs are sanitized in PHP.
- File uploads are limited to 5MB (JPG, PNG, PDF).
- SMTP credentials are kept in a separate config file.
- `uploads` folder should be protected via `.htaccess` or stored outside public root.

---
Built with ❤️ for AMOR.
