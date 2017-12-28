function setGaugeMeter(id){
	 var opts = {
      lines: 12,
      angle: 0.15,
      lineWidth: 0.44,
      pointer: {
        length: 0.9,
        strokeWidth: 0.035,
        color: '#000000'
      },
      limitMax: 'false', 
      percentColors: [[0.0, "#a9d70b" ], [0.50, "#f9c802"], [1.0, "#ff0000"]], // !!!!
      strokeColor: '#E0E0E0',
    };
    var idToGet = "gauge_meter_" + id;
    var target = document.getElementById(idToGet); // your canvas element
    var gauge = new Gauge(target).setOptions(opts); // create sexy gauge!
    gauge.maxValue = 100; // set max gauge value
    gauge.setMinValue(0);  // Prefer setter over gauge.minValue = 0
    gauge.animationSpeed = 32; // set animation speed (32 is default value)
    gauge.set(this.props.rating); // set actual value
}