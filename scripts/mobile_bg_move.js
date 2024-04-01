document.getElementById('home-header').addEventListener('mousemove', function(e) {
    const rect = e.target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.right - rect.left;
    if (x < width / 3) {
        e.target.style.backgroundPosition = 'left top';
    } else if (x > 2 * width / 3) {
        e.target.style.backgroundPosition = 'right top';
    } else {
        e.target.style.backgroundPosition = 'center top';
    }
});