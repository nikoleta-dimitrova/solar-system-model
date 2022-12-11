/*
 Each planet is a new object of type Planet class which makes 
 using the planet's properties easier in the code
 */
export class Planet {

    // class constructor
    constructor(id, name, size, speed, info, image) {
        this.id = id;
        this.name = name;
        this.size = size;
        this.speed = speed
        this.info = info;
        this.image = image
    }

    // These functions are used to get and set the properties of the class
    setName(name) {
        this.name = name
    }
    getName() {
        return this.name;
    }

    setSize(size) {
        this.size = size
    }
    getSize() {
        return this.size;
    }

    setSpeed(speed) {
        this.speed = speed
    }
    getSpeed() {
        return this.speed;
    }

    setInfo(info) {
        this.info = info
    }
    getInfo() {
        return this.info;
    }

    setImage(image) {
        this.image = image
    }
    getImage() {
        return this.image;
    }
}