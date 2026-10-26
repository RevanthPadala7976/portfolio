import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import './ContactSection.css';

const RECIPIENT_EMAIL = 'padala.r@northeastern.edu';

export default function ContactSection() {
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
    botcheck: '',
  });
  const [status, setStatus] = useState('idle'); // 'idle' | 'sending' | 'sent' | 'error'

  const handleCopy = () => {
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(RECIPIENT_EMAIL);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = RECIPIENT_EMAIL;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      try {
        document.execCommand('copy');
      } catch (err) {
        console.error('Failed to copy text: ', err);
      }
      textArea.remove();
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (status === 'error') {
      setStatus('idle');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Honeypot check: abort silently if a bot populated the hidden field
    if (formData.botcheck) {
      setStatus('sent');
      return;
    }

    const name = formData.name.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    if (!name || !email || !message) {
      return;
    }

    setStatus('sending');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name,
          email,
          message,
          subject: `Portfolio contact from ${name}`,
          from_name: 'Portfolio site',
          replyTo: email,
          botcheck: formData.botcheck,
        }),
      });

      const data = await response.json();

      if (data.success === true) {
        setStatus('sent');
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="contact-container">
        {/* 1. Section Heading */}
        <h2 className="contact-heading">
          Contact
        </h2>

        <div className="contact-content">
          {/* 2. The Roles Line (18px, --ink, ~65ch max) */}
          <p className="contact-roles-line">
            I&rsquo;m looking for software and backend engineering roles, particularly ones where the work touches AI infrastructure. Based in Boston, open to relocating for the right team.
          </p>

          {/* 3. Email, Large (22px, --accent, mailto + copy button) */}
          <div className="contact-email-row">
            <a
              href={`mailto:${RECIPIENT_EMAIL}`}
              className="contact-email-link"
            >
              {RECIPIENT_EMAIL}
            </a>
            <button
              type="button"
              onClick={handleCopy}
              aria-label="Copy email address"
              title="Copy to clipboard"
              className="contact-copy-btn"
            >
              {copied ? (
                <Check className="w-4 h-4 text-green-600 dark:text-green-500" />
              ) : (
                <Copy className="w-4 h-4" />
              )}
            </button>
          </div>

          {/* 4. Two Secondary Links (14px, --ink-muted, middot-separated, underlined on hover) */}
          <div className="contact-secondary-links">
            <a
              href="https://github.com/RevanthPadala7976"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary-link"
            >
              GitHub
            </a>
            <span className="contact-middot" aria-hidden="true">&middot;</span>
            <a
              href="https://www.linkedin.com/in/revanth-padala/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-secondary-link"
            >
              LinkedIn
            </a>
          </div>

          {/* 5. Hairline Divider */}
          <hr className="contact-section-rule" />

          {/* 6. The Form, Quiet */}
          <div className="contact-form-section" aria-live="polite">
            <p className="contact-form-prompt">Prefer a form?</p>

            {status === 'sent' ? (
              <p className="contact-confirmation-line">
                Thanks. I&rsquo;ll get back to you.
              </p>
            ) : (
              <form onSubmit={handleSubmit} className="contact-quiet-form">
                {/* Hidden Honeypot Input */}
                <input
                  type="text"
                  name="botcheck"
                  value={formData.botcheck}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                  style={{ display: 'none' }}
                />

                <div className="contact-field-row">
                  <div className="contact-field">
                    <label htmlFor="contact-name" className="contact-label">
                      Name
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      required
                      disabled={status === 'sending'}
                      value={formData.name}
                      onChange={handleChange}
                      className="contact-input"
                    />
                  </div>

                  <div className="contact-field">
                    <label htmlFor="contact-email" className="contact-label">
                      Email
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      required
                      disabled={status === 'sending'}
                      value={formData.email}
                      onChange={handleChange}
                      className="contact-input"
                    />
                  </div>
                </div>

                <div className="contact-field">
                  <label htmlFor="contact-message" className="contact-label">
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    disabled={status === 'sending'}
                    value={formData.message}
                    onChange={handleChange}
                    className="contact-textarea"
                  />
                </div>

                <div className="contact-submit-row">
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="contact-submit-btn"
                  >
                    {status === 'sending' ? 'Sending\u2026' : 'Send message'}
                  </button>
                </div>

                {status === 'error' && (
                  <p className="contact-error-line" role="alert">
                    Something went wrong. Please use the email address above.
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* 7. Full-Width Rule + One-Line Footer */}
        <hr className="contact-footer-rule" />

        <footer className="contact-footer">
          &copy; 2026 Revanth Padala &middot; Last updated October 2026
        </footer>
      </div>
    </section>
  );
}
