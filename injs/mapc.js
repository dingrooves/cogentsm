var view, map,marker;
function loadmap()
    {
        document.getElementById("map").innerHTML = "";
        document.getElementById("latlong").innerHTML="";
        var layer = new ol.layer.Tile({
        source: new ol.source.OSM()
      });

      var london = ol.proj.transform([73.8567, 18.5204], 'EPSG:4326', 'EPSG:3857');

      view = new ol.View({
        center: london,
        zoom: 16
      });

      map = new ol.Map({
        target: 'map',
        layers: [layer],
        view: view
      });

      // create an Overlay using the div with id location.
      marker = new ol.Overlay({
        element: document.getElementById('location'),
        positioning: 'bottom-left',
        stopEvent: false
      });

      // add it to the map
      map.addOverlay(marker);

      // create a Geolocation object setup to track the position of the device
      var geolocation = new ol.Geolocation({
        tracking: true
      });

      // bind the projection to the view so that positions are reported in the
      // projection of the view
      geolocation.bindTo('projection', view);

      // bind the marker's position to the geolocation object, the marker will
      // move automatically when the GeoLocation API provides position updates
      marker.bindTo('position', geolocation);

      // when the GeoLocation API provides a position update, center the view
      // on the new position
      geolocation.on('change:position', function() {
        var p = geolocation.getPosition();
        //console.log(p[0] + ' : ' + p[1]);
        view.setCenter([parseFloat(p[0]), parseFloat(p[1])]);
        var pi = ol.proj.transform(p, 'EPSG:3857', 'EPSG:4326');  
        document.getElementById("latlong").innerHTML=pi[0].toFixed(6) + ' : ' + pi[1].toFixed(6);  
        if(document.getElementById("latitude")){
        document.getElementById("latitude").value=pi[1].toFixed(6);
        document.getElementById("longitude").value=pi[0].toFixed(6); }
      });
    }

function postAddress()
{
    //$$.post('inphp/post_add.php', {id:3}, function(data){ console.log(data);});
    var formData = myApp.formToData('#inform');
    var jsonstr = JSON.stringify(formData);
    $$.ajax({ 
              type:"POST",
              url: "http://admin.cogentautodrive.com/inphp/post_add.php",
              data:'json=' + jsonstr,
              dataType:'json',
              success: function(data){
                  
              }
    });
    //alert(jsonstr);
}

function checkAddress()
{
    //$$.post('inphp/post_add.php', {id:3}, function(data){ console.log(data);});
    var formData = myApp.formToData('#inform');
    var jsonstr = JSON.stringify(formData);
    $$.ajax({ 
              type:"POST",
              url: "http://admin.cogentautodrive.com/inphp/check_phone.php",
              data:'json=' + jsonstr,
              dataType:'json',
              success: function(data){
                  //console.log(data[0].nameowner + "," + data[0].namebusiness);
                  setvalue(data);
                  
              }
    });
    //alert(jsonstr);
}
function setvalue(data)
{
    document.getElementById("nameowner").value = data[0].nameowner;
    document.getElementById("namebusiness").value = data[0].namebusiness;
}
function loadcoord()
{
    document.getElementById("longitude").value="wait";
    document.getElementById("latitude").value="wait";
    //navigator.geolocation.getCurrentPosition(disp);
    GetGeolocation();
   //$('.lat-view').html(pos.coords.latitude);
   //$('.long-view').html(pos.coords.longitude);
    
}
function disp(pos) {
   document.getElementById("latitude").value=pos.coords.latitude;
   document.getElementById("longitude").value=pos.coords.longitude;
    }
document.addEventListener("deviceready", GetGeoLocation , false);

function GetGeolocation()
{
    var options = { timeout: 30000, enableHighAccuracy: true };
    navigator.geolocation.getCurrentPosition(GetPosition, PositionError, options);
}
function GetPosition(position)
{
    document.getElementById("latitude").value=position.coords.latitude;
    document.getElementById("longitude").value=position.coords.longitude;
      
}
 
function PositionError() {
      navigator.notification.alert('Could not find the current location.');
}
