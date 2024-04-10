const images = ['./images/webp/backgrounds/landscape_2.webp', 
                './images/webp/backgrounds/landscape_3.webp',
                './images/webp/backgrounds/landscape_4.webp',
                './images/webp/backgrounds/castle_1.webp',
                './images/webp/backgrounds/landscape_1.webp',
];

images.forEach(image => {
    const img = new Image();
    img.src = image;
});

let speed= 5; // seconds
let index = 0;
setInterval(
    function() 
    {
        const imageUrl = 'url(' + images[index] + ')';
        document.getElementById('home-header').style.backgroundImage = imageUrl;
        index = (index + 1) % images.length;
    }, speed * 1000);