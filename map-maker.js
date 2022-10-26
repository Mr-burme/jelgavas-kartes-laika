

var map_index = 0;


var map = L.map('map').setView([56.6503, 23.7229], 4);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 10,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

var map_data;
var curren_map_url;


let test


// $.getJSON("https://raw.githubusercontent.com/Mr-burme/jelgavas-kartes-laika/main/sample.json", function (data) {
//         map_data = data
//         console.log(map_data)
//     })



$.getJSON("https://raw.githubusercontent.com/Mr-burme/jelgavas-kartes-laika/main/sample.json", function (data) {

    map_data = data
})







async function getCurrenMapURL() {

    curren_map_url = map_data[map_index].Datne
}

function mapImage(imageUrl) {

    var img_ratio = NaN

    function imgRatio() {
        let img = document.createElement('img');
        img.id = 'imgId';
        img.src = imageUrl
        document.getElementById("hack").appendChild(img);
        let myImg = document.querySelector("#imgId");
        setTimeout(() => {
            let realWidth = myImg.naturalWidth;
            let realHeight = myImg.naturalHeight;
            img_ratio = realWidth / realHeight * 0.2;
        }, "100")


    }
    imgRatio()
    var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
    var altText = 'Image of Newark, N.J. in 1922. Source: The University of Texas at Austin, UT Libraries Map Collection.';
    var latLngBounds;
    setTimeout(() => {
        latLngBounds = L.latLngBounds([[56.6503, 23.7229], [56.6503 + 0.1, 23.7229 + img_ratio]]);
    }, "500")

    setTimeout(() => {
        var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
            opacity: 0.8,
            errorOverlayUrl: errorOverlayUrl,
            alt: altText,
            interactive: true
        }).addTo(map);



        imageOverlay.on('mousedown', onMapClick);
        function onMapClick(e) {
            map.dragging.disable();
            map_HTML_element = imageOverlay.getElement()
            imageOverlay.getElement().draggable = false;
            var direction = "",
                oldx = 0,
                oldy = 0,

                mousemovemethod = function (e) {
                    

                    let newLatLngBounds;

                    let moveCoefficient = 0.001
                    if (map.getZoom() > 12){
                        moveCoefficient = 0.0001
                    }
                    //console.log(map.getZoom())
                    //console.log(map.getZoom() / 19)
                    

                    let east = imageOverlay.getBounds().getEast()
                    let west = imageOverlay.getBounds().getWest()
                    let south = imageOverlay.getBounds().getSouth()
                    let north = imageOverlay.getBounds().getNorth()

                    if (e.pageX > oldx /* && e.pageY == oldy */) {
                        moveCoefficient *= e.pageX - oldx
                        if (moveCoefficient > 0.01) {
                            moveCoefficient = 0.001
                        }
                        console.log(moveCoefficient)
                        
                        direction = "right";
                        //east west
                        newLatLngBounds = L.latLngBounds([[south, east + moveCoefficient], [north, west + moveCoefficient]]);
                        imageOverlay.setBounds(newLatLngBounds)
                    }
                    else if (/* e.pageX == oldx && */ e.pageY > oldy) {
                        moveCoefficient *= e.pageY - oldy
                        direction = "down";
                        //north south
                        newLatLngBounds = L.latLngBounds([[south - moveCoefficient, east], [north - moveCoefficient, west]]);
                        imageOverlay.setBounds(newLatLngBounds)
                    }
                    else if (/* e.pageX == oldx && */ e.pageY < oldy) {
                        moveCoefficient *= oldy - e.pageY
                        direction = "up";
                        //north south
                        newLatLngBounds = L.latLngBounds([[south + moveCoefficient, east], [north + moveCoefficient, west]]);
                        imageOverlay.setBounds(newLatLngBounds)
                    }
                    else if (e.pageX < oldx/*  && e.pageY == oldy */) {
                        moveCoefficient *= (oldx - e.pageX)
                        direction = "left";
                        //east west
                        newLatLngBounds = L.latLngBounds([[south, east - moveCoefficient], [north, west - moveCoefficient]]);
                        imageOverlay.setBounds(newLatLngBounds)
                    }

                    oldx = e.pageX;
                    oldy = e.pageY;
                    //console.log(imageOverlay.getBounds())
                    moveCoefficient = 0.001




                }


            document.addEventListener('mousemove', mousemovemethod);
            document.body.onmouseup = function () { document.removeEventListener('mousemove', mousemovemethod); map.dragging.enable(); };
        }
    }, "1000")

}





//
setTimeout(() => {
    getCurrenMapURL()
    mapImage(curren_map_url);
}, "1000")

