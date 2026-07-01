// Device Detection - Adds device classes to body for responsive styling
function detectDevice() {
  const userAgent = navigator.userAgent || '';
  const isMobile = /Android|iPhone|iPad|iPod/i.test(userAgent);
  const isTablet = /iPad|Android(?!.*Mobi)/i.test(userAgent);
  const isLaptop = !isMobile && !isTablet;
  const screenWidth = window.innerWidth;

  // Remove previous device classes
  document.body.classList.remove('device-mobile', 'device-tablet', 'device-laptop');
  document.body.classList.remove('screen-mobile', 'screen-tablet', 'screen-desktop');

  // Add device type classes based on user agent
  if (isMobile) {
    document.body.classList.add('device-mobile');
  } else if (isTablet) {
    document.body.classList.add('device-tablet');
  } else {
    document.body.classList.add('device-laptop');
  }

  // Add screen size classes
  if (screenWidth <= 640) {
    document.body.classList.add('screen-mobile');
  } else if (screenWidth <= 1024) {
    document.body.classList.add('screen-tablet');
  } else {
    document.body.classList.add('screen-desktop');
  }
}

const heading = document.getElementById('playerHeading');
const drivePlayer = document.getElementById('drivePlayer');
const playerError = document.getElementById('playerError');
const playerInfo = document.getElementById('playerInfo');
const tryHighQuality = document.getElementById('tryHighQuality');
const openInPreview = document.getElementById('openInPreview');
const downloadVideo = document.getElementById('downloadVideo');

function extractDriveFileId(input) {
  if (!input || typeof input !== 'string') return null;
  const trimmed = input.trim();

  if (/^[a-zA-Z0-9_-]{10,}$/.test(trimmed)) return trimmed;

  const patterns = [
    /\/file\/d\/([a-zA-Z0-9_-]+)/,
    /[?&]id=([a-zA-Z0-9_-]+)/,
    /\/uc\?export=[^&]+&id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of patterns) {
    const match = trimmed.match(pattern);
    if (match && match[1]) return match[1];
  }

  return null;
}

function toDrivePreviewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

function toDriveViewUrl(fileId) {
  return `https://drive.google.com/file/d/${fileId}/view?usp=sharing`;
}

function toDriveDownloadUrl(fileId) {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}

const params = new URLSearchParams(window.location.search);
const title = params.get('title') || 'Now Playing';
const fileInput = params.get('fileId') || '';
const source = params.get('source') || 'movies';

// Set back link based on source
const backLink = document.getElementById('backLink');
if (backLink) {
  if (source === 'series') {
    backLink.textContent = 'Back to Web Series';
    backLink.href = './index.html?tab=series';
  } else {
    backLink.textContent = 'Back to Movies';
    backLink.href = './index.html?tab=movies';
  }
}

heading.textContent = title;

const parsedFileId = extractDriveFileId(fileInput);
if (!parsedFileId) {
  drivePlayer.classList.add('hidden');
  tryHighQuality.classList.add('hidden');
  openInPreview.classList.add('hidden');
  downloadVideo.classList.add('hidden');
  playerError.classList.remove('hidden');
} else {
  const previewUrl = toDrivePreviewUrl(parsedFileId);
  const viewUrl = toDriveViewUrl(parsedFileId);
  const downloadUrl = toDriveDownloadUrl(parsedFileId);

  tryHighQuality.href = viewUrl;
  openInPreview.href = previewUrl;
  downloadVideo.href = downloadUrl;

  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  const isAndroid = /Android/i.test(navigator.userAgent || '');
  const isIOS = /iPhone|iPad|iPod/i.test(navigator.userAgent || '');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (isMobile) {
    // Mobile: hide iframe, show tap-to-play overlay (iframes are blocked on iOS Safari
    // and unreliable on Android Chrome; opening in a new tab is more reliable)
    drivePlayer.classList.add('hidden');
    mobileOverlay.classList.remove('hidden');
    playerInfo.classList.remove('hidden');

    function handleTapToPlay() {
      // Open preview in new tab
      window.open(previewUrl, '_blank', 'noopener,noreferrer');
    }

    mobileOverlay.addEventListener('click', handleTapToPlay);
    mobileOverlay.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') handleTapToPlay();
    });
  } else {
    // Desktop: use iframe as normal
    drivePlayer.src = previewUrl;
  }
}

// Initialize device detection and setup resize listener
function initPlayer() {
  detectDevice();
  window.addEventListener('resize', detectDevice);
  
  // Add browser compatibility check
  if (!drivePlayer) {
    console.error('Player element not found');
    if (playerError) playerError.classList.remove('hidden');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initPlayer);
} else {
  initPlayer();
}
