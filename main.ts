let RightSpeed = 0
let LeftSpeed = 0
maqueenPlusV2.I2CInit()
basic.showLeds(`
    . . . . .
    # . . . #
    . # . # .
    . . . . .
    . . . . .
    `)
let SensorL1 = 0
let SensorL2 = 0
let SensorM = 0
let SensorR1 = 0
let SensorR2 = 0
let IfChangeSpeed = 1
let NormalSpeed = 100
basic.forever(function () {
    SensorL1 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1)
    SensorM = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
    SensorL2 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2)
    SensorR1 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1)
    SensorR2 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2)
    if (SensorL2 == 1) {
        IfChangeSpeed = 1
        LeftSpeed = 255
        RightSpeed = NormalSpeed - 60
    } else if (SensorR1 == 1) {
        IfChangeSpeed = 1
        RightSpeed = 255
        LeftSpeed = NormalSpeed - 80
    } else if (SensorR2 == 1) {
        IfChangeSpeed = 1
        RightSpeed = 255
        LeftSpeed = NormalSpeed - 60
    } else if (SensorL1 == 1) {
        IfChangeSpeed = 1
        LeftSpeed = 255
        RightSpeed = NormalSpeed - 80
    } else if (LeftSpeed != NormalSpeed || RightSpeed != NormalSpeed) {
        IfChangeSpeed = 1
        RightSpeed = NormalSpeed
        LeftSpeed = NormalSpeed
    } else {
    	
    }
    if (IfChangeSpeed == 1) {
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, LeftSpeed)
        maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, RightSpeed)
        IfChangeSpeed = 0
    }
    basic.pause(10)
})
