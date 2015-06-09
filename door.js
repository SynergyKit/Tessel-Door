var Synergykit = require("synergykit"),
    tessel = require("tessel"),
    greenLed = tessel.led[0].output(0),
    blueLed = tessel.led[1].output(0),
    accel = require('accel-mma84').use(tessel.port['A'])

Synergykit.Init("YOUR_TENANT", "YOUR_KEY") // Initialization of SynergyKit. Insert your own credentials

var old = [] // xyz data last call
var limit = 0.1 // How large change has to be between movement calls
var seconds = 3 // How long has to be door still to send data
var startTime = 0 // Time when was door opened
var endTime = 0 // Time when was door closed
var still = false // Are door closed?
var movement = false // Are door moving?

// Initialize the accelerometer.
accel.on('ready', function() {

    console.log("Accelerometer ready")
    greenLed.toggle() // Switch green led on

    // Stream accelerometer data
    accel.on('data', function(xyz) {

        console.log("x: ", xyz[0].toFixed(3), "y: ", xyz[1].toFixed(3), "z: ", xyz[2].toFixed(3))

        // Opening door
        if (isDifferent(xyz) && !movement) {
            movement = true
            startTime = new Date().getTime()
        }

        // Closing of doro was interrupted
        if (isDifferent(xyz) && movement) {
            still = false
        }

        // Closing door
        if (!isDifferent(xyz) && movement && !still) {
            endTime = new Date().getTime()
            still = true
        }

        // Counting how long are door closed
        if (still) {

            // Door are closed more than 3 seconds
            if (new Date().getTime() - endTime >= seconds * 1000) {
                movement = false
                still = false
                sendData()
            }
        }
        old = xyz // Setting actual value of axis to temporary variable
    })
})

accel.on('error', function(err) {
    console.log('Error:', err)
})


// Check for door movement
var isDifferent = function(xyz) {
    if (old) {

        // Movement on axis X is larger than limit
        if (Math.abs(old[0] - xyz[0]) > limit) {
            return true
        }

        // Movement on axis Y is larger than limit
        if (Math.abs(old[1] - xyz[1]) > limit) {
            return true
        }

        // Movement on axis Z is larger than limit
        if (Math.abs(old[2] - xyz[2]) > limit) {
            return true
        }
    }

    return false
}


// Send data to SynergyKit
var sendData = function() {

    var time = new Date().getTime() - startTime // How long was door opened
    var doorData = Synergykit.Data("door") // Initialization of SynergyKit collection door
    doorData.set("time", time)
    blueLed.toggle() // Switch blue led on

    doorData.save({

        // Data was successfully saved
        success: function(door) {
            blueLed.toggle() // Switch blue led off
            console.log(door.get())
        },
        error: function(err) {
            console.log(err)
        }
    })
}