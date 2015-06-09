
# Tessel Door

Counting door opening via [Tessel](https://tessel.io/) module [Accelerometer](http://start.tessel.io/modules/accelerometer) and saving data to [SynergyKit](https://synergykit.com). 

What you will need:

 - [SynergyKit](https://synergykit.com) account and free application
 - [Tessel](https://tessel.io/) platform
 - [Accelerometer](http://start.tessel.io/modules/accelerometer) module
 - Door

## SynergyKit
SynergyKit is Backend as a Service for building REST & real–time APIs.

## Accelerometer
Detect orientation and movement of your Tessel by measuring gravity / acceleration.

 - 3-Axis Digital Accelerometer 
 - 12-bit resolution Selectable 
 - ±2g/±4g/±8g scales

## Step 1

Clone this repository

    git clone git@github.com:SynergyKit/Tessel-Door.git

Change directory into that folder

    cd Tessel-Door

## Step 2

Plug the accelerometer module into Tessel port **A** with the hexagon/icon side **down** and the electrical components on the top, then plug Tessel into your computer via USB.

## Step 3

Install accelerometer library by typing

    npm install accel-mma84

and SynergyKit Node.js SDK by typing

    npm install synergykit

## Step 4

Create your SynergyKit account [here](https://cloud.synergykit.com/signup). Than create new application and grab your **tenant** with application **key**. Both insert in this line of code in **door.js** file

```javascript
Synergykit.Init("YOUR_TENANT", "YOUR_KEY") // Initialization of SynergyKit
```

## Step 5

Push your code to Tessel platform by typing

    tessel push door.js

## Step 6

Unplug your tessel from computer and plug it to another source of energy, for example power bank.

## Step 7

Attach whole device on the door.

## Bonus

You can create simple client JavaScript with [JavaScript SDK](https://cloud.synergykit.com/documentation/javascript) to watch door opening real-time.

## Example of attaching to the door
![enter image description here](https://synergykit.blob.core.windows.net/synergykit-sample-app/tessel-door.jpg)