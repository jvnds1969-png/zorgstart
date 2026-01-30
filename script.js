// ==========================================
// ZORGSTART - JavaScript Interactiviteit
// ==========================================

// === Toast Notification System ===
function showToast(message, type = 'info') {
  const toast = document.getElementById('toast');
  const toastIcon = document.getElementById('toastIcon');
  const toastMessage = document.getElementById('toastMessage');
  
  // Set icon based on type
  const icons = {
    success: '✅',
    error: '❌',
    info: 'ℹ️'
  };
  
  toastIcon.textContent = icons[type] || icons.info;
  toastMessage.textContent = message;
  
  // Remove existing classes and add new ones
  toast.className = 'toast ' + type;
  
  // Show toast
  setTimeout(() => toast.classList.add('show'), 10);
  
  // Hide after 3 seconds
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3000);
}

// === File Upload Functionality ===
const uploadArea = document.getElementById('uploadArea');
const fileInput = document.getElementById('fileInput');
const fileInfo = document.getElementById('fileInfo');
const fileName = document.getElementById('fileName');
const fileSize = document.getElementById('fileSize');
const removeFile = document.getElementById('removeFile');

// Click to upload
uploadArea.addEventListener('click', () => fileInput.click());

// Drag and drop events
uploadArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  uploadArea.classList.add('drag-over');
});

uploadArea.addEventListener('dragleave', () => {
  uploadArea.classList.remove('drag-over');
});

uploadArea.addEventListener('drop', (e) => {
  e.preventDefault();
  uploadArea.classList.remove('drag-over');
  
  const files = e.dataTransfer.files;
  if (files.length > 0) {
    handleFile(files[0]);
  }
});

// File input change
fileInput.addEventListener('change', (e) => {
  if (e.target.files.length > 0) {
    handleFile(e.target.files[0]);
  }
});

// Handle uploaded file
function handleFile(file) {
  // Check if it's a PDF
  if (file.type !== 'application/pdf') {
    showToast('Alleen PDF-bestanden zijn toegestaan', 'error');
    return;
  }
  
  // Check file size (max 10MB)
  if (file.size > 10 * 1024 * 1024) {
    showToast('Bestand is te groot (max 10MB)', 'error');
    return;
  }
  
  // Display file info
  fileName.textContent = '📄 ' + file.name;
  fileSize.textContent = formatFileSize(file.size);
  
  uploadArea.classList.add('uploaded');
  fileInfo.style.display = 'flex';
  
  showToast('Ontslagbrief succesvol geüpload!', 'success');
}

// Format file size
function formatFileSize(bytes) {
  if (bytes < 1024) return bytes + ' B';
  if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
  return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
}

// Remove file
removeFile.addEventListener('click', () => {
  fileInput.value = '';
  fileInfo.style.display = 'none';
  uploadArea.classList.remove('uploaded');
  showToast('Bestand verwijderd', 'info');
});

// === Search Form Validation ===
const searchForm = document.getElementById('searchForm');
const searchQuery = document.getElementById('searchQuery');
const searchLocation = document.getElementById('searchLocation');

searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const query = searchQuery.value.trim();
  const location = searchLocation.value.trim();
  
  if (!query || !location) {
    showToast('Vul beide velden in om te zoeken', 'error');
    return;
  }
  
  // Validate postcode (Belgian format: 4 digits)
  const postcodeRegex = /^\d{4}$/;
  const isPostcode = postcodeRegex.test(location);
  
  showToast(`Zoeken naar "${query}" in ${location}...`, 'info');
  
  // Simulate search (in real app, this would call an API)
  setTimeout(() => {
    showToast(`3 resultaten gevonden voor "${query}"`, 'success');
  }, 1500);
});

// === Button Actions ===

// Start questionnaire button
document.getElementById('startQuestionnaire').addEventListener('click', () => {
  showToast('Vragenlijst wordt geladen...', 'info');
  // In real app: navigate to questionnaire page
    window.open('https://chat.bingli.eu/#/consent', '_blank');
});

// Start chat button
document.getElementById('startChat').addEventListener('click', () => {
  showToast('Chat wordt geopend...', 'info');
  // In real app: open chat widget
});

// Start prevention button
document.getElementById('startPrevention').addEventListener('click', () => {
  showToast('Preventiemodule wordt gestart...', 'info');
  // In real app: navigate to prevention section
});

// === Smooth Scroll for Navigation ===
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const targetId = this.getAttribute('href');
    if (targetId === '#') return;
    
    const targetElement = document.querySelector(targetId);
    if (targetElement) {
      e.preventDefault();
      targetElement.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  });
});

// === Initialize ===
console.log('🏥 Zorgstart loaded successfully!');
