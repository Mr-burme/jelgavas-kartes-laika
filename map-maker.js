

var map_index = 0;


var map = L.map('map').setView([56.6503, 23.7229], 4);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var map_data;
var curren_map_url;

var xhr = new XMLHttpRequest();



function getMapData() {
    let response;
    // open a connection
    xhr.open("GET", "https://raw.githubusercontent.com/Mr-burme/jelgavas-kartes-laika/main/sample.json", true);

    // send the request
    xhr.send();

    let test

    xhr.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            test = this.responseText;   
        }
        console.log(test)
    }

    
}
getMapData()


async function getCurrenMapURL() {
    curren_map_url = map_data[map_index].Datne
    console.log(curren_map_url)
    return curren_map_url
}

function mapImage(imageUrl) {
    function imgRatio() {
        let img = document.createElement('img');
        img.id = 'imgId';
        img.src = imageUrl
        document.getElementById("hack").appendChild(img);
        let myImg = document.querySelector("#imgId");
        let realWidth = myImg.naturalWidth;
        let realHeight = myImg.naturalHeight;
        return realWidth / realHeight * 0.2;
    }
    var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
    var latLngBounds = L.latLngBounds([[56.6503, 23.7229], [56.6503 + 0.1, 23.7229 + imgRatio()]]);

    var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
        opacity: 0.8,
        errorOverlayUrl: errorOverlayUrl,
        alt: altText,
        interactive: true
    }).addTo(map);
}

mapImage(getCurrenMapURL())