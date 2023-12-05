function RunCycle () {
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    basic.pause(10)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(1000)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(500)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(1000)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(1000)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(1000)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.AllMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(480)
    maqueenPlusV2.controlMotorStop(maqueenPlusV2.MyEnumMotor.AllMotor)
    maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, 255)
    basic.pause(1000)
}
let RightSpeed = 0
let LeftSpeed = 0
let delayTime = 0
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
let frontDistance = 0
let SlowSpeed1 = 75
let SlowSpeed2 = 85
basic.forever(function () {
    delayTime = 10
    SensorL1 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL1)
    SensorM = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorM)
    SensorL2 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorL2)
    SensorR1 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR1)
    SensorR2 = 1 - maqueenPlusV2.readLineSensorState(maqueenPlusV2.MyEnumLineSensor.SensorR2)
    frontDistance = maqueenPlusV2.readUltrasonic(DigitalPin.P13, DigitalPin.P14)
    if (frontDistance < 1) {
        frontDistance = 0
    }
    if (SensorL2 == 1) {
        IfChangeSpeed = 1
        LeftSpeed = 200
        RightSpeed = NormalSpeed - SlowSpeed1
    } else if (SensorR1 == 1) {
        IfChangeSpeed = 1
        RightSpeed = 255
        LeftSpeed = NormalSpeed - SlowSpeed2
        delayTime = 15
    } else if (SensorR2 == 1) {
        IfChangeSpeed = 1
        RightSpeed = 200
        LeftSpeed = NormalSpeed - SlowSpeed1
    } else if (SensorL1 == 1) {
        IfChangeSpeed = 1
        LeftSpeed = 255
        RightSpeed = NormalSpeed - SlowSpeed2
        delayTime = 15
    } else if (LeftSpeed != NormalSpeed || RightSpeed != NormalSpeed) {
        IfChangeSpeed = 1
        RightSpeed = NormalSpeed
        LeftSpeed = NormalSpeed
    } else {
        IfChangeSpeed = 1
    }
    if (frontDistance > 0 && frontDistance < 10) {
        RunCycle()
        IfChangeSpeed = 1
        RightSpeed = NormalSpeed
        LeftSpeed = NormalSpeed
    } else {
        if (IfChangeSpeed == 1) {
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.LeftMotor, maqueenPlusV2.MyEnumDir.Forward, LeftSpeed)
            maqueenPlusV2.controlMotor(maqueenPlusV2.MyEnumMotor.RightMotor, maqueenPlusV2.MyEnumDir.Forward, RightSpeed)
            IfChangeSpeed = 0
        }
    }
    basic.pause(delayTime)
})
