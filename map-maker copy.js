var map = L.map('map').setView([0, 0], 4);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 4,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var imagegUrl = 'https://image.shutterstock.com/image-photo/long-golden-vintage-frame-isolated-260nw-392720254.jpg';

function getMeta(url) {   
        
        
    var img = new Image();
    img.onload = function() {
        alert(this.width/this.height)
        return this.width/this.height;
    };
    img.src = url;
}

function mapImage(imageUrl){
    var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';


    
    function imgRatio() {
        let img = document.createElement('img');
        img.id = 'imgId';
        img.src = imageUrl
        document.getElementById("hack").appendChild(img);
        let myImg = document.querySelector("#imgId");
        let realWidth = myImg.naturalWidth;
        let realHeight = myImg.naturalHeight;
        return realWidth/realHeight*0.1;
    }
    //alert(imgSize())

    var latLngBounds = L.latLngBounds([[0, 0], [0.1, 0.1*imgRatio()]]);
    
    var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.8,
        errorOverlayUrl: errorOverlayUrl,
        alt: "",
        interactive: true
    }).addTo(map);
}

mapImage(imagegUrl)