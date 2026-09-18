document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contactForm');
  const messageBox = document.getElementById('contactMessage');

  if (!form || !messageBox) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('name')?.value.trim() || '';
    const email = document.getElementById('email')?.value.trim() || '';
    const subject = document.getElementById('subject')?.value.trim() || '';
    const message = document.getElementById('message')?.value.trim() || '';
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    let errors = [];

    if (!name) errors.push('Please enter your name.');
    if (!email) errors.push('Please enter your email.');
    else if (!emailPattern.test(email)) errors.push('Please enter a valid email address.');
    if (!subject) errors.push('Please enter a subject.');
    if (!message) errors.push('Please enter your message.');

    if (errors.length > 0) {
      messageBox.textContent = errors.join(' ');
      messageBox.className = 'form-message error';
      return;
    }

    messageBox.textContent = 'Thank you! Your message has been sent successfully.';
    messageBox.className = 'form-message success';
    form.reset();
  });
});
