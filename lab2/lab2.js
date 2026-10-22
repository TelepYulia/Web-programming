var car1 = new Object();
car1.color = "red";
car1.maxSpeed = 220;
car1.tuning = true;
car1["number of accidents"] = 0;

car1.driver = new Object();
car1.driver.name = "Telep Yulia";
car1.driver.category = "C";
car1.driver["personal limitations"] = "No driving at night";

var car2 = {
    color: "blue",
    maxSpeed: 200,
    tuning: false,
    "number of accident": 2,
    driver:{
        name: "Telep Yulia",
        category: "B",
        "personal limitations": null
    }
};

car1.drive = function(){
    console.log("I am not driving at night");
};
car1.drive();

car2.drive = function(){
    console.log("I can drive anytime");
};
car2.drive();

function Truck(color, weight, avgSpeed, brand, model){
    this.color = color;
    this.weight = weight;
    this.avgSpeed = avgSpeed;
    this.brand = brand;
    this.model = model;

    this.trip = function(){
        if(!this.driver) {
            console.log("No driver assigned");
        } else {
            var nightText = this.driver.nightDriving ? "drives at night" : "does not drive at night";
            console.log("Driver " + this.driver.name + " " + nightText + " and has " + this.driver.experience + " years of experience");
        }
    };
}

Truck.prototype.AssignDriver = function(name, nightDriving, experience) {
    this.driver = {
        name: name,
        nightDriving: nightDriving,
        experience: experience
    };
};

var truck1 = new Truck("red", 6000, 75.0, "Volvo", "FH16");
var truck2 = new Truck("white", 8000, 65.5, "MAN", "TGX");
truck1.AssignDriver("Шевченко Тарас", true, 6);
truck2.AssignDriver("Франко Іван", false, 3);
console.log("Вантажівка 1:");
truck1.trip();
console.log("Вантажівка 2:");
truck2.trip();

class Square {
    constructor(a) {
        this.a = a;
    }

    static help() {
        console.log("Квадрат - це правильний чотирикутник, у якого всі сторони рівні, а всі кути прямі(90 градусів).");
    }

    lenght(){
        var perimeter = 4 * this.a;
        console.log("Периметр: " + perimeter);
        return perimeter;
    }

    square(){
        var area = this.a * this.a;
        console.log("Площа: " + area);
        return area;
    }

    info(){
        console.log("Характеристика фігури: Квадрат");
        console.log("Довжини всіх 4 сторін: a = " + this.a + ", b = " + this.a + ", c = " + this.a + ", d = " + this.a);
        console.log("Величини всіх 4 кутів: 90°, 90°, 90°, 90°");
        var perimeter = 4 * this.a;
        var area = this.a * this.a;
        console.log("Сума довжин сторін: " + perimeter);
        console.log("Площа: " + area);
    }
}

class Rectangle extends Square {
    constructor(a,b) {
        super(a);
        this.b = b;
    }

    static help() {
        console.log("Прямокутник — це чотирикутник, у якого протилежні сторони рівні, а всі кути прямі (90 градусів).");
    }

    length() {
        var perimeter = 2 * (this.a + this.b);
        console.log("Периметр: " + perimeter);
        return perimeter;
    }

    square() {
        var area = this.a * this.b;
        console.log("Площа: " + area);
        return area;
    }

    info() {
        console.log("Характеристика фігури: Прямокутник");
        console.log("Довжини всіх 4 сторін: a = " + this.a + ", b = " + this.b + ", c = " + this.a + ", d = " + this.b);
        console.log("Величини всіх 4 кутів: 90°, 90°, 90°, 90°");
        var perimeter = 2 * (this.a + this.b);
        var area = this.a * this.b;
        console.log("Сума довжин сторін: " + perimeter);
        console.log("Площа: " + area);
    }
}

class Rhombus extends Square {
    constructor(a, alpha, beta) {
        super(a);
        this.alpha = alpha; //Тупий кут
        this.beta = beta; //Гострий кут
    }

    static help() {
        console.log("Ромб — це паралелограм, у якого всі сторони рівні, а протилежні кути попарно рівні.");
    }

    length() {
        var perimeter = 4 * this.a;
        console.log("Периметр: " + perimeter);
        return perimeter;
    }

    square() {
        var radians = this.alpha * Math.PI / 180;
        var area = this.a * this.a * Math.sin(radians);
        console.log("Площа: " + area);
        return area;
    }

    info() {
        console.log(" Характеристика фігури: Ромб");
        console.log("Довжини всіх 4 сторін: a = " + this.a + ", b = " + this.a + ", c = " + this.a + ", d = " + this.a);
        console.log("Величина кутів: тупі кути — " + this.alpha + "°, " + this.alpha + "°; гострі кути — " + this.beta + "°, " + this.beta + "°");
        var perimeter = 4 * this.a;
        console.log("Периметр: " + perimeter);
        var radians = this.alpha * Math.PI / 180;
        var area = this.a * this.a * Math.sin(radians);
        console.log("Площа: " + area);
    }
}

class Parallelogram extends Rectangle {
    constructor(a, b, alpha, beta) {
        super(a, b); 
        this.alpha = alpha; // тупий кут
        this.beta = beta;   // гострий кут
    }

    get a() {
        return this._a;
    }
    set a(value) {
        this._a = value;
    }

    get alpha() {
        return this._alpha;
    }
    set alpha(value) {
        this._alpha = value;
    }

    get beta() {
        return this._beta;
    }
    set beta(value) {
        this._beta = value;
    }

    static help() {
        console.log("Паралелограм — це чотирикутник, у якого протилежні сторони попарно паралельні та рівні.");
    }

    length() {
        var perimeter = 2 * (this.a + this.b);
        console.log("Периметр: " + perimeter);
        return perimeter;
    }

    square() {
        var radians = this.alpha * Math.PI / 180;
        var area = this.a * this.b * Math.sin(radians);
        console.log("Площа: " + area);
        return area;
    }

    info() {
        console.log("--- Характеристика фігури: Паралелограм ---");
        console.log("Довжини всіх 4 сторін: a = " + this.a + ", b = " + this.b + ", c = " + this.a + ", d = " + this.b);
        console.log("Величина кутів: тупі кути — " + this.alpha + "°, " + this.alpha + "°; гострі кути — " + this.beta + "°, " + this.beta + "°");
        var perimeter = 2 * (this.a + this.b);
        console.log("Периметр: " + perimeter);
        var radians = this.alpha * Math.PI / 180;
        var area = this.a * this.b * Math.sin(radians);
        console.log("Площа: " + area);

    }
}

Square.help();
Rectangle.help();
Rhombus.help();
Parallelogram.help();

var mySquare = new Square(5);
console.log("КВАДРАТ");
mySquare.info();

var myRectangle = new Rectangle(4, 8);
console.log("\nПРЯМОКУТНИК");
myRectangle.info();

var myRhombus = new Rhombus(6, 120, 60);
console.log("\nРОМБ");
myRhombus.info();

var myParallelogram = new Parallelogram(7, 4, 130, 50);
console.log("\nПАРАЛЕЛОГРАМ");
myParallelogram.info();

function Triangular(a = 3, b = 4, c = 5) {
    return { a, b, c };
}

var tri1 = Triangular(6, 8, 10);
console.log("Об'єкт 1:", tri1);

var tri2 = Triangular(5, 12, 13);
console.log("Об'єкт 2:", tri2);

var tri3 = Triangular();
console.log("Об'єкт 3:", tri3);

function PiMultiplier(multiplier) {
    return function() {
        return Math.PI * multiplier;
    };
}

var multiplyPiBy2 = PiMultiplier(2);
var multiplyPiBy3Over2 = PiMultiplier(3 / 2);
var dividePiBy2 = PiMultiplier(1 / 2);

console.log("Результат множення пі на 2:", multiplyPiBy2());
console.log("Результат множення пі на 3/2:", multiplyPiBy3Over2());
console.log("Результат ділення пі на 2:", dividePiBy2());

function Painter(color) {
    return function(obj) {
        if (obj && obj.type !== undefined) {
            console.log("Color: " + color + ", type: " + obj.type);
        } else {
            console.log("No ‘type’ property occurred!");
        }
    };
}

var PaintBlue = Painter("blue");
var PaintRed = Painter("red");
var PaintYellow = Painter("yellow");

var obj1 = {
    maxSpeed: 280,
    type: "Sportcar",
    color: "magenta"
};

var obj2 = {
    type: "Truck",
    "avg speed": 90,
    "load capacity": 2400
};

var obj3 = {
    maxSpeed: 180,
    color: "purple",
    isCar: true
};

console.log("Тестування PaintBlue");
PaintBlue(obj1);
PaintBlue(obj2);
PaintBlue(obj3);

console.log("\nТестування PaintRed");
PaintRed(obj1);
PaintRed(obj2);
PaintRed(obj3);

console.log("\nТестування PaintYellow");
PaintYellow(obj1);
PaintYellow(obj2);
PaintYellow(obj3);
