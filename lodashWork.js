// var greeting = function(greeting, title, name) {
//   let greets = greeting + " " + title + " " + name;
//   return greets;
// };

// greeting("Namaste", "Mrs", "Rani");

const people = [
  {
    firstName: "Komal",
    lastName: "Bhatt",
    age: 19,
    skills: ["run", "jump", "dance"],
    gender: "female",
    married: false
  },
  {
    firstName: "Nirmal",
    lastName: "Pandit",
    age: 45,
    skills: ["run", "jump"],
    gender: "male",
    married: true,
    children: {
      Rani: {
        firstName: "Rani",
        lastName: "Pandit",
        age: 17,
        skills: ["run", "swim", "dance"],
        gender: "female",
        married: false
      },
      Subodh: {
        firstName: "Subodh",
        lastName: "Pandit",
        age: 14,
        skills: ["run", "jump"],
        gender: "male",
        married: false
      }
    }
  },
  {
    firstName: "Khushboo",
    lastName: "Pandit",
    age: 16,
    skills: ["dance"],
    gender: "female",
    married: false
  },
  {
    firstName: "Priyanka",
    lastName: "Kumari",
    age: 24,
    skills: ["dance"],
    gender: "female",
    married: true
  },
  {
    firstName: "Komal",
    lastName: "Ahire",
    age: 18,
    skills: ["run", "jump", "swim", "dance"],
    gender: "female",
    married: false
  },
  {
    firstName: "Lalita",
    lastName: "Shrivastav",
    age: 17,
    skills: ["run", "jump", "swim"],
    gender: "female",
    married: false
  },
  {
    firstName: "Pooja",
    lastName: "Manohar",
    age: 18,
    skills: ["run", "jump", "swim", "dance"],
    gender: "female",
    married: false
  },
  {
    firstName: "Shubhangi",
    lastName: "Pawar",
    age: 18,
    skills: ["swim", "dance"],
    gender: "female",
    married: false
  },
  {
    firstName: "Jeeta",
    lastName: "Devi",
    age: 38,
    skills: ["run"],
    gender: "female",
    married: true
  },
  {
    firstName: "Abhishek",
    lastName: "Gupjta",
    age: 26,
    skills: ["run", "jump", "swim", "dance"],
    gender: "male",
    married: true,
    children: {
      pooja: {
        firstName: "Pooja",
        lastName: "Saini",
        age: 20,
        skills: ["run", "dance"],
        gender: "female",
        married: true
      },
      rupa: {
        firstName: "Rupa",
        lastName: "Sharma",
        age: 18,
        skills: ["run", "dance"],
        gender: "female",
        married: false
      },
      venu: {
        firstName: "Venu",
        lastName: "Zibhakate",
        age: 19,
        skills: ["jump", "swim", "dance"],
        gender: "female",
        married: true
      }
    }
  }
];

// question1 :-- filter by age under 30 and has the skills 'run' and 'swim'.
// console.log(
//   people.filter(
//     person =>
//       person.age < 30 &&
//       person.skills.indexOf("run") != -1 &&
//       person.skills.indexOf("swim") != -1
//   )
// );
// console.log(
//   "******************************************************************************"
// );
// question2 :-- filter by children who can swim or dance, and sort by gender and age.
// console.log(people.filter(person => person.children!=undefined))
// var childrenData = []
// for (var i = 0; i < people.length; i++) {
//   if (people[i].children != undefined) {
//     var childrenName = Object.keys(people[i].children);
//     for (var j = 0; j < childrenName.length; j++) {
//       var child = people[i].children[childrenName[j]];
//       if (
//         child.skills.indexOf("swim") != -1 ||
//         child.skills.indexOf("dance") != -1
//       ) {
//         childrenData.push(child)
//       }
//     }
//   }
// }
// childrenData.sort(function (a, b){
//   return a.age - b.age
// })
// console.log(childrenData)

// console.log(
//   "******************************************************************************"
// );

// question3 :-- get an array of population, which contains all the people (adults and children) in the array.

var peopleArray = [];
for (var i = 0; i < people.length; i++) {
  if (people[i].children != undefined) {
    var childrenName = Object.keys(people[i].children);
    for (var j = 0; j < childrenName.length; j++) {
      var child = people[i].children[childrenName[j]];
      peopleArray.push(child);
    }
    delete people[i]["children"];
    peopleArray.push(people[i]);
  }else{
    peopleArray.push(people[i]);
  }
}
console.log(peopleArray)

// question4 :-- filter by people who have daughters and are not married.
// for (var i = 0; i < people.length; i++) {
//   if (people[i].children != undefined) {
//     var childrenName = Object.keys(people[i].children);
//     for (var j = 0; j < childrenName.length; j++) {
//       var child = people[i].children[childrenName[j]];
//       if (
//         child.gender === "female" &&
//         child.married === false
//       ) {
//         console.log(child)
//       }
//     }
//   }
// }

// console.log(
//   "******************************************************************************"
// );

// question5 :-- filter by married people who can jump.

// console.log(
//   people.filter(
//     person => person.married === true && person.skills.indexOf("jump") != -1
//   )
// );
// console.log(
//   "******************************************************************************"
// );

// question6 :-- filter by people who have last name that starts with 'j' or later in the alphabet, and have married children.

// for (var i = 0; i < people.length; i++) {
//   if (people[i].lastName.indexOf("j") != -1) {
//     if (people[i].children != undefined) {
//       var childrenName = Object.keys(people[i].children);
//       for (var j = 0; j < childrenName.length; j++) {
//         var child = people[i].children[childrenName[j]];
//         if (child.married === true) {
//           console.log(child);
//         }
//       }
//     }
//   }
// }

// console.log(
//   "******************************************************************************"
// );

// question7 :-- change the collection so that the name of each person is:
//name: {first: 'string', last: 'string'} instead of firstName and lastName

// for (var i = 0; i < people.length; i++ ) {
//   peopleNewObject = {}

//   peopleNewObject["first"] = people[i]["firstName"]
//   peopleNewObject["last"] = people[i]["lastName"]
//   people[i]["name"]=peopleNewObject
//   delete people[i]["firstName"]
//   delete people[i]["lastName"]

//   if (people[i].children != undefined){

//     var childrenName = Object.keys(people[i].children);

//         for (var j = 0; j < childrenName.length; j++) {
//           var child = people[i].children[childrenName[j]];
//           childNameObject = {}
//           childNameObject["first"] = child["firstName"]
//           childNameObject["last"] = child["lastName"]
//           child["name"] = childNameObject
//           delete child["firstName"]
//           delete child["lastName"]

//         }
//         console.log(people[i].children)

// }
// }

// console.log(people)

// question9 :-- get an array of all children

// for (var i = 0; i < people.length; i++ ) {
//     var childrenArray = []
//     if (people[i].children != undefined){

//       var childrenName = Object.keys(people[i].children);

//           for (var j = 0; j < childrenName.length; j++) {
//             var child = people[i].children[childrenName[j]];
//             childrenArray.push(child)

//           }
//           console.log(childrenArray)

//   }
//   }
