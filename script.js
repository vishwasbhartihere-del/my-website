// Simple script to change background color when button is clicked
document.getElementById('colorButton').addEventListener('click', function() {
  const colors = ['#FFD700', '#FF6347', '#90EE90', '#ADD8E6', '#FFB6C1', '#DDA0DD'];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  document.body.style.backgroundColor = randomColor;
});
