## 1. What is the difference between var, let, and const?

- var --> can be redeclared and changed, function scoped , hoisted with "undefined"
- let --> can be change but not redeclared, block scoped , hoisted but not initializer (temporal dead zone)
- const --> cannot be changed or redeclared, block scoped , hoisted but not initializer (temporal dead zone)

## 2. What is the difference between map(), forEach(), and filter()?

- map() --> returns the new array with modified values and does not change the original array.
- forEach() --> just loops through , does not returns new array.
- filter() --> returns a new array with the element the pass the provided condition

```js
const number = [1,2,3,4,]
number.map(n => n*)                 // [2, 4, 6, 8]
number.forEach(n => consol.log(n))  // 1 2 3 4
number.filter(n => n%2===0)          // [2, 4]

```

## 3. What are arrow functions in ES6?

- short way to write function
- arrow functions do some more control over "this"

```js
const add = (a, b) => a + b;
```
## 4. How does destructuring assignment work in ES6?

- extracts values from arrays or objects into variable

```js
const [a,b] = [1,2]
const {name, age} = {name:"Aiman", age:20}
```

## 5. Explain template literals in ES6. How are they different from string concatenation?

- template literals was introduced in ES6, which provides a more flexible and readable way to work with string
- use backtick (`) to defined template literal
- add variables inside string using ${ }
- support multi-line strings without \n
- more readable and cleaner syntax 

```js
const name = "Aiman"
const age = 22

//string concatenation
console.log("My name is " + name + " and I am " + age + "years old");

//template literals
consol.log(`My name ${name} and I am ${age} years old`)
```
