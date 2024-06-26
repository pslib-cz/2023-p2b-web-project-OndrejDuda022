function updateDimensions() {
    const menuElement = document.querySelector('.page-nav--mobile menu');
    const imgElement = document.querySelector('.header-cap img:last-of-type');
    
    const menuHeight = menuElement.offsetHeight;
    const menuWidth = menuElement.offsetWidth;
    const imgWidth = imgElement.offsetWidth;
    
    document.documentElement.style.setProperty('--menu-height', `${menuHeight}px`);
    document.documentElement.style.setProperty('--menu-width', `${menuWidth}px`);
    document.documentElement.style.setProperty('--crown-width', `${imgWidth}px`);
}

window.addEventListener('DOMContentLoaded', updateDimensions);
window.addEventListener('resize', updateDimensions);