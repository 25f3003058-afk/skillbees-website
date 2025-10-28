// form.js — simple POST to Apps Script Web App
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('feedbackForm');
  const msg = document.getElementById('formMessage');

  // replace the URL below with your Apps Script web app URL
  const ENDPOINT = 'https://script.google.com/macros/s/AKfycbyu0ix2kz4QDwslrYyCk715sHY6KWDQkZWoxjFaYdd0LllZJ8uoXGKF0EqZHUkJeAsn/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    msg.textContent = 'Sending...';

    const data = {
      name: form.name.value.trim(),
      email: form.email.value.trim(),
      contact: form.contact.value.trim(),
      feedback: form.feedback.value.trim()
    };

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
      });
      if (res.ok) {
        msg.textContent = 'Thanks — your feedback has been received!';
        form.reset();
      } else {
        const txt = await res.text();
        msg.textContent = 'Error sending feedback. ' + (txt || '');
      }
    } catch (err) {
      console.error(err);
      msg.textContent = 'Network error — try again later.';
    }
  });
});
