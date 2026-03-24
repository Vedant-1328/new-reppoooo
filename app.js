/* ============================================
   AttendQR – Attendance Management System
   app.js
   ============================================ */

// Pre-fill today's date and current time on page load
(function initDateTime() {
  const now = new Date();
  document.getElementById('date').value = now.toISOString().slice(0, 10);
  document.getElementById('time').value = now.toTimeString().slice(0, 5);
})();

/**
 * generateQR
 * Reads form values, builds a payload, and renders the QR code.
 */
function generateQR() {
  const subject = document.getElementById('subject').value.trim() || 'Session';
  const faculty  = document.getElementById('faculty').value.trim()  || 'Faculty';
  const room     = document.getElementById('room').value.trim()     || 'Room';
  const date     = document.getElementById('date').value            || new Date().toISOString().slice(0, 10);
  const time     = document.getElementById('time').value            || '00:00';
  const dept     = document.getElementById('dept').value;
  const batch    = document.getElementById('batch').value.trim()    || 'Batch';
  const custom   = document.getElementById('custom').value.trim();

  // Unique session identifier
  const sessionID = 'ATT-' + Math.random().toString(36).substr(2, 6).toUpperCase();

  // Use custom URL if provided; otherwise encode session JSON
  const payload = custom || JSON.stringify({
    system:    'Attendance Management System',
    subject,
    faculty,
    room,
    date,
    time,
    dept,
    batch,
    sessionID,
    timestamp: new Date().toISOString()
  });

  // Clear previous QR
  const qrDiv = document.getElementById('qrcode');
  qrDiv.innerHTML = '';

  // Render new QR code
  new QRCode(qrDiv, {
    text:           payload,
    width:          200,
    height:         200,
    colorDark:      '#0f172a',
    colorLight:     '#ffffff',
    correctLevel:   QRCode.CorrectLevel.H
  });

  // Populate session info panel
  const formatDate = new Date(date).toLocaleDateString('en-IN', {
    day: '2-digit', month: 'short', year: 'numeric'
  });

  document.getElementById('sessionInfo').innerHTML = `
    <div class="info-row">
      <span class="info-key">Subject</span>
      <span class="info-val">${subject}</span>
    </div>
    <div class="info-row">
      <span class="info-key">Faculty</span>
      <span class="info-val">${faculty}</span>
    </div>
    <div class="info-row">
      <span class="info-key">Dept / Batch</span>
      <span class="info-val">${dept} · ${batch}</span>
    </div>
    <div class="info-row">
      <span class="info-key">Room</span>
      <span class="info-val">${room}</span>
    </div>
    <div class="info-row">
      <span class="info-key">Date &amp; Time</span>
      <span class="info-val">${formatDate}, ${time}</span>
    </div>
    <div class="info-row">
      <span class="info-key">Session ID</span>
      <span class="info-val accent">${sessionID}</span>
    </div>
  `;

  // Show QR section, hide placeholder
  document.getElementById('qrSection').classList.add('visible');
  document.getElementById('placeholder').style.display = 'none';
}

/**
 * downloadQR
 * Exports the QR canvas as a labelled PNG file.
 */
function downloadQR() {
  const canvas = document.querySelector('#qrcode canvas');
  if (!canvas) {
    alert('Please generate a QR code first!');
    return;
  }

  const subject = document.getElementById('subject').value.trim() || 'session';
  const date    = document.getElementById('date').value            || 'date';

  // Create an output canvas with padding and a text label
  const out = document.createElement('canvas');
  const pad = 24;
  const labelH = 40;
  out.width  = canvas.width  + pad * 2;
  out.height = canvas.height + pad * 2 + labelH;

  const ctx = out.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, out.width, out.height);

  // Draw QR
  ctx.drawImage(canvas, pad, pad);

  // Draw label
  ctx.fillStyle = '#0f172a';
  ctx.font = 'bold 13px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(`${subject} | ${date}`, out.width / 2, out.height - 12);

  // Trigger download
  const link = document.createElement('a');
  link.download = `attendance-qr-${subject.replace(/\s+/g, '-')}-${date}.png`;
  link.href = out.toDataURL('image/png');
  link.click();
}

/**
 * resetForm
 * Hides the QR output and clears the rendered code.
 */
function resetForm() {
  document.getElementById('qrSection').classList.remove('visible');
  document.getElementById('placeholder').style.display = '';
  document.getElementById('qrcode').innerHTML = '';
}
