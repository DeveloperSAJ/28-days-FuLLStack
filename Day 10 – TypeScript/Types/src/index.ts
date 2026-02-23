// Union Types ( | )
let id: number | string; // ( | ) => number or srting

id = 10;
id = "abc";

function printId(id: number | string): void {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}

// Intersection Types ( & ) => and

interface Person {
  name: string;
}

interface Employee {
  employeeId: number;
}

type Staff = Person & Employee;

const worker: Staff = {
  name: "Developer",
  employeeId: 101
};

// Literal Types 

let direction: "left" | "right" | "center";

direction = "left";
// direction = "up"; // Error

//type Status = "loading" | "success" | "error";

let currentStatus: Status = "loading";


// Tuples 

let user: [string, number];

user = ["DEveloper", 22]; 
// user = [22, "Developer"]; // Error

let response: [number, string];

response = [200, "OK"];

// Enums

enum Role {
  Admin,
  User,
  Guest
}

let userRole: Role = Role.Admin;

// enum Status {
//   Loading = "LOADING",
//   Success = "SUCCESS",
//   Error = "ERROR"
// }

// let current: Status = Status.Loading;

type Status = "loading" | "success" | "error";

interface ApiResponse {
  status: Status;
  data: string;
}

function handleResponse(res: ApiResponse) {
  if (res.status === "success") {
    console.log(res.data);
  }
}