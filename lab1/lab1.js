console.log(`ІНСТУРКЦІЯ З ВИКОРИСТАННЯ
Функція triangle(val1, type1, val2, type2) розв'язує прямокутний трикутник.
Аргументи передаються парами: (значення1, "тип1", значення2, "тип2").

Допустимі типи ("type"):
  - "leg" — катет
  - "hypotenuse" — гіпотенуза
  - "adjacent angle" — прилеглий до катета кут
  - "opposite angle" — протилежний до катета кут
  - "angle" — гострий кут (якщо задано гіпотенузу)

Сумісні пари типів (порядок не має значення):
  1. "leg" + "leg"
  2. "leg" + "hypotenuse"
  3. "leg" + "adjacent angle"
  4. "leg" + "opposite angle"
  5. "hypotenuse" + "angle"`);
function triangle(val1, type1, val2, type2){
    function toRad(deg){
        return (deg*Math.PI)/180;
    }
    function toDeg(rad){
        return (rad*180)/Math.PI;
    }
    function isValidType(type){
        return type === "leg" || type === "hypotenuse" || type === "adjacent angle" || type === "opposite angle" || type === "angle";
    }

    if(
        typeof val1 !== "number" ||
        typeof val2 !== "number" ||
        !isValidType(type1) || 
        !isValidType(type2)
    ){
        console.log("Помилка: Перевірте правильність написання типів або тип даних аргументів. Будь ласка, ще раз ознайомтеся з інструкцією.");
        return "failed";
    }

    if(val1<=0 || val2 <= 0) {
        return "Нуль або від'ємне значення";
    }

    const types = [type1, type2];
    const vals = [val1, val2];

    function getVal(t){
        let index = types.indexOf(t);
        return vals[index];
    }

    let a,b,c,alpha, beta;

    if(types[0] === "leg" && types[1] === "leg"){
        a = val1;
        b = val2;
        c = Math.sqrt(a * a + b * b);
        alpha = toDeg(Math.atan(a / b));
        beta = 90 - alpha;
    } else if (types.includes("leg") && types.includes("hypotenuse")) {
        a = getVal("leg");
        c = getVal("hypotenuse");

        if (a >= c) {
            return "Катет не може бути більшим за гіпотенузу";
        }
       
        b = Math.sqrt(c * c - a * a);
        alpha = toDeg(Math.asin(a / c));
        beta = 90 - alpha;
    } else if (types.includes("leg") && types.includes("adjacent angle")) {
        a=getVal("leg");
        beta = getVal("adjacent angle");

        if(beta >= 90){
            return "Кут повинен бути гострим";
        }

        c=a/Math.cos(toRad(beta));
        b=Math.sqrt(c*c-a*a);
        alpha=90-beta;
    } else if (types.includes("leg") && types.includes("opposite angle")) {
        a = getVal("leg");
        alpha = getVal("opposite angle");

        if(alpha >= 90) {
            return "Кут повинен бути гострим";
        }

        beta = 90 - alpha;
        c = a/Math.sin(toRad(alpha));
        b=Math.sqrt(c*c-a*a);
    } else if(types.includes("hypotenuse") && types.includes("angle")) {
        c = getVal("hypotenuse");
        alpha = getVal("angle");
        
        if(alpha >= 90) {
            return "Кут повинен бути гострим";
        }

        beta = 90 - alpha;
        a = c*Math.sin(toRad(alpha));
        b = Math.sqrt(c*c-a*a);
    } else {
        console.log("Несумісна пара типів");
        return "failed";
    }
    console.log(`a = ${a}`);
    console.log(`b = ${b}`);
    console.log(`c = ${c}`);
    console.log(`alpha = ${alpha}`);
    console.log(`beta = ${beta}`);
    
    return "success";


}
