
 document.getElementById("age").value = "0"; 
var map_data;

$.getJSON("https://raw.githubusercontent.com/Mr-burme/jelgavas-kartes-laika/main/sample.json", function (data) {
    function arraymove(arr, fromIndex, toIndex) {
        var el = arr[fromIndex];
        arr.splice(fromIndex, 1);
        arr.splice(toIndex, 0, el);
    }

    map_data = data
    document.getElementById("age").max = map_data.length

    var index_element = true
    do {
        for (element in map_data) {
            element = Number(element)
            index_element = element
            //console.log(element, map_data.length)
            if (map_data[(element + 1)] == undefined){
                break
            }

            if (element != map_data.length) {
                currentIndexAgeValue = Number(map_data[element]["Radīšanas datums"])
                nextIndexAgeValue = Number(map_data[element + 1]["Radīšanas datums"])
                if (currentIndexAgeValue > nextIndexAgeValue) {
                    //console.log(currentIndexAgeValue, nextIndexAgeValue)
                    arraymove(map_data, element, element + 1)
                }
                
            }

            


        }
        

    }
    while (map_data[(index_element + 1)] != undefined)

    imageOverlay.setUrl(map_data[0]["Datne"]);

    current_map = map_data[0]
    north = current_map.bounds._northEast.lat
    east = current_map.bounds._northEast.lng
    south = current_map.bounds._southWest.lat
    west = current_map.bounds._southWest.lng

    let current_map_LatLngBounds = L.latLngBounds([[south, east], [north, west]]);
    imageOverlay.setBounds(current_map_LatLngBounds)
    // imageOverlay.setBounds(map_data[0].bounds)
    
})



var map = L.map('map').setView([56.6503, 23.7229], 4);

var osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    minZoom: 10,//10
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

imageUrl = ""
errorOverlayUrl = "https://upload.wikimedia.org/wikipedia/commons/5/59/Empty.png"
latLngBounds = L.latLngBounds([[0, 0], [0, 0]]);

var imageOverlay = L.imageOverlay(imageUrl, latLngBounds, {
    opacity: 0.6,
    errorOverlayUrl: errorOverlayUrl,
    alt: "",
    interactive: false
}).addTo(map);


function setImage(obj) {

    var value = obj.value;
    var current_map = map_data[value]
    console.log(current_map)

    imageOverlay.setUrl(current_map["Datne"]);
    console.log(current_map.bounds)
    console.log(current_map.bounds._northEast.lat)

    north = current_map.bounds._northEast.lat
    east = current_map.bounds._northEast.lng
    south = current_map.bounds._southWest.lat
    west = current_map.bounds._southWest.lng

    let current_map_LatLngBounds = L.latLngBounds([[south, east], [north, west]]);
    imageOverlay.setBounds(current_map_LatLngBounds)

}