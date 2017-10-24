var self = this;
var mCompass = null;
var mWatchId = null;;

/**
 * We only want a single instance of AWCompass
 * All access to the AWCompass instance should come through this function
 */
function getCompassInstance() {
  if(self.mCompass == null) {
    self.mCompass = new Appworks.AWCompass(
      function(heading) {
        var string = "Heading: " + heading.magneticHeading;
        out(string);
      }, function(error) {
        var string = "CompassError: " + error.code;
        out(error);
    });
  }

  return self.mCompass;
}

/**
 * Get the current compass heading
 */
function getHeading() {
  var compass = getCompassInstance();
  compass.getCurrentHeading();
}

/**
 * Continually retrieve the compass heading
 * Pass in a frequency (milliseconds) for the interval in which position should return
 * Keep track of the watch ID, so we can turn it off.
 */
function watchHeading() {
  var compass = getCompassInstance();
  self.mWatchId = compass.watchHeading({ frequency: 1000 }); // update every 1 second
}

/**
 * Use the watch ID obtained when setting an compass watch to clear it.
 */
function clearHeading() {
  var compass = getCompassInstance();
  compass.clearWatch(self.mWatchId);
}

function out(message) {
  console.log(message);
  if(typeof(message) == "object") {
    getObject("result").innerHTML = JSON.stringify(message);
  } else {
    getObject("result").innerHTML = message;
  }
}

function getObject(name) {
  return document.getElementById(name);
}
