const images = ['./images/backgrounds/landscape_2.png', 
                './images/backgrounds/landscape_3.png',
                './images/backgrounds/castle_1.png',
                './images/backgrounds/landscape_1.png',
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