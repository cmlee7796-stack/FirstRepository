

/** 일급객체의 특징  **/

// 1. 자바스크립트 함수는 함수의 실제 매개변수가 될 수 있다.
function foo(arg){
    arg();
}
function bar(){
    console.log("bar");
}
foo(bar); // bar 함수 자체가 foo 함수의 매개변수로 전달된다.
// 'bar'가 출력

// 2. 자바스크립트 함수는 함수의 반환값이 될 수 있다.
function foo(arg){
    return arg;
}
function bar(){
    console.log("bar");
}
foo(bar)(); // 'bar'가 출력

// 3. 자바스크립트 함수는 할당명령문의 대상이 될 수 있다.
// 4. 자바스크립트 함수는 동일비교의 대상이 될 수 있다.
const foo = function(arg){
    return arg;
}
foo(1); // 1



/** 매개변수  **/

//1. 기본값 매개변수 default function parameter
function foo(arg){
    console.log(arg);
}
foo(); // undefined

function foo(arg=1){
    console.log(arg);
}
foo(); // 1

//2. 나머지 매개변수 Rest parameter
function foo(arg, ...rest){
    console.log(rest);
}
foo(); // []

function foo(arg, ...rest){
    console.log(rest);
}
foo(1); // []

function foo(arg, ...rest){
    console.log(rest);
}
foo(1, 2, 3); // [2, 3]

//3. arguments 객체 
function foo(arg){
    console.log(arguments);
}
foo(1,2,3,4); // [1, 2, 3, 4]


/** 함수의 생성 **/

//1. 함수 선언문 function declaration
function foo(){
    console.log("foo");
}

//2. 함수 표현식 function expression
const foo = function(){
    console.log("foo2");
}
//3. Function 생성자 함수 Function constructor function
const foo = new Function("console.log('foo3');");
//4. 화살표 함수 Arrow function

const foo = () => {
    console.log("foo4");
};


/*함수 사용 패턴*/

// 1.IIFE(Immediately Invoked Function Expression)

(function foo(){
    console.log("foo");
})();

//2. 재귀함수 Recursive function
function foo(arg){
    if(arg === 3 ) return ;  // 탈출 조건
    console.log(arg);
    foo(arg + 1);
}
foo(1);

//3. 중첩함수 Nested function

function foo(arg){
    function bar(){
        console.log(arg);
    }
    bar();
}

foo(1);

//4. 콜백함수 Callback function
function foo(arg){
    arg();
}

foo(() => {
    console.log(1);
});
