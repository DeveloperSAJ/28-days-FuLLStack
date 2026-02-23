// Objects

let user1: {
  name: string;
  age: number;
} = {
  name: "Developer",
  age: 22,
};

let user2: {
  name: string;
  age?: number; // ? for optional
} = {
  name: "Devloper"
};

let user3: {
  readonly id: number;
  name: string;
} = {
  id: 1,
  name: "Devloper"
};
//user3.id = 6; //Error

//Using interface 

interface User {
  id: number;
  name: string;
  age: number;
}

let user4: User = {
  id: 1,
  name: "Devloper",
  age: 22
};

//Nested 

interface User5 {
  id: number;
  name: string;
  address: {
    city: string;
    country: string;
  };
}

let user5: User5 = {
  id: 1,
  name: "Devloper",
  address: {
    city: "New York",
    country: "USA"
  }
};

interface Scores {
  [key: string]: number;
}

let studentScores: Scores = {
  math: 90,
  english: 85,
  physics: 95
};