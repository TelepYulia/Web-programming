console.log("ОСНОВНИЙ РЕЖИМ: Перевірка за першою літерою (J/j)");

(function () {
  var names = ["Bill", "John", "Jen", "Jason", "Paul", "Frank", "Steven", "Larry", "Paula", "Laura", "Jim"];

  for (var i = 0; i < names.length; i++) {
    var firstLetter = names[i].charAt(0).toLowerCase();

    if (firstLetter === 'j') {
      byeSpeaker.speak(names[i]);
    } else {
      helloSpeaker.speak(names[i]);
    }
  }
})();

console.log("Селекція імен за парністю кількості літер.");
console.log("• Парна кількість літер  => Hello");
console.log("• Непарна кількість літер => Good Bye");

for (var i = 0; i < names.length; i++) {
    var currentName = names[i];

    if (currentName.length % 2 === 0) {
      helloSpeaker.speak(currentName);
    } else {
      byeSpeaker.speak(currentName);
    }
  }
})();
