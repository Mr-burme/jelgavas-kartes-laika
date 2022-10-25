var map = L.map('map').setView([56.6503, 23.7229], 4);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);
console.log(document.getElementById("data").textContent)
console.log(JSON.parse(document.getElementById("data").textContent))

var imagegUrl = 'https://maps.lib.utexas.edu/maps/historical/newark_nj_1922.jpg';

function mapImage(imageUrl){
    function imgRatio() {
        let img = document.createElement('img');
        img.id = 'imgId';
        img.src = imageUrl
        document.getElementById("hack").appendChild(img);
        let myImg = document.querySelector("#imgId");
        let realWidth = myImg.naturalWidth;
        let realHeight = myImg.naturalHeight;
        return realWidth/realHeight*0.2;
    }
    var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
    var latLngBounds = L.latLngBounds([[56.6503, 23.7229], [56.6503+0.1, 23.7229+imgRatio()]]);
    
    var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.8,
        errorOverlayUrl: errorOverlayUrl,
        alt: altText,
        interactive: true
    }).addTo(map);
}

mapImage(imagegUrl)