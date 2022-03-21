function Decoder(bytes, port) {

  function to_string(bytes) {
    return String.fromCharCode.apply(null, bytes);
  }

  function to_int(buffer, offset) {
    return buffer[offset + 3] | buffer[offset + 2] << 8 | buffer[offset + 1] << 16 | buffer[offset] << 24
  }

  var temperature = to_int(bytes, 0) / 100; // Temperature in celcius
  var pressure = to_int(bytes, 4) / 100; // Atmospheric pressure in bar
  var light = to_int(bytes, 8) / 100; // Light in lux
  var humidity = to_int(bytes, 12) / 100; // Humidity in percentages
  var roll = to_int(bytes, 16) / 100; // Roll in degrees in the range -180 to 180
  var pitch = to_int(bytes, 20) / 100; // Pitch in degrees in the range -90 to 90
  var voltage = to_int(bytes, 24) / 100; // Battery voltage

  if (temperature > 1000) {
    return {
      message: to_string(bytes)
    };
  } else {
    return {
      temperature: temperature,
      pressure: pressure,
      light: light,
      humidity: humidity,
      roll: roll,
      pitch: pitch,
      voltage: voltage
    };
  }
}
