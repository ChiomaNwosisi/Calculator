    let perviousText = document.querySelector('.prev-screen')
    let currentText = document.querySelector('.curr-screen')
    const Numbuttons = Array.from(document.querySelectorAll('.number'))
    const OperationsButton = Array.from(document.querySelectorAll('.operator'))
    const deleteButton = document.querySelector('.delete')
    const clearButton = document.querySelector('.clear')
    const equalBtn = document.querySelector('.equal')
    let currentOperand = ''
    let previousOperand = ''
   let operator = undefined

   function add(num1, num2){
    return num1 + num2
   }
   function subtract(num1, num2){
    return num1-num2
   }
   function multiply(num1, num2){
    return num1 * num2
   }
   function divide(num1, num2){
    if(num2 === 0 || num1 === 0){
     return "You Can't divide by Zero";
    }
    return Math.round((num1 / num2)*100000)/100000
   }
   
   function operate(op, num1, num2){
    let result;
    const op1=parseFloat(num1);
    const op2=parseFloat(num2);
    
    if(op === undefined){
       return;
    }
    switch(op){
        case "+": 
         result=add(op1,op2)
         break;
        case "-": 
         result=subtract(op1,op2)
         break;
        case "x": 
         result=multiply(op1,op2)
         break;
        case "/": 
         result=divide(op1,op2)
         break;
        
    }
    currentOperand=result;
    previousOperand=''
    operator = undefined
   }
   function usersInput(num){
    if(
        (num === "." && currentOperand === ('.')) || 
        (num === "0" && currentOperand===('0'))
    )
    return;
    currentOperand = currentOperand.toString() + num.toString()
   }

   function operatorInput(op){
    if(operator !== undefined){
        operator = op
    }

    if(currentOperand === '' )return
    if(previousOperand !== ''){
        operate(op,currentOperand,previousOperand)
    }
    
    operator= op
    previousOperand= currentOperand
    currentOperand= ''
   }

   function clear(){
    operator =undefined
    currentOperand=''
    previousOperand=''
   }

   function del(){
    currentOperand = currentOperand.toString().slice(0, -1)
   }
   function updateScreen(){
    currentText.innerText = currentOperand
    if(operator !== undefined){
      currentText.innerText = `${previousOperand} ${operator} ${currentOperand}`

    }
    if( previousOperand && currentOperand && operator !== equalBtn){
        operate(operator,previousOperand,currentOperand)
    }
   }

//    event liesiners
Numbuttons.forEach((btn) => {
    btn.addEventListener("click", function(){
        usersInput(btn.innerText)
        updateScreen()
    })
})

OperationsButton.forEach((button) =>{
    button.addEventListener("click", function(){
        operatorInput(button.innerText)
        updateScreen()
    })
})

clearButton.addEventListener("click", function(){
    clear()
    updateScreen()
})

deleteButton.addEventListener("click", function(){
    del()
    updateScreen()
})
equalBtn.addEventListener("click", function(){
    operate(operator,previousOperand,currentOperand)
    updateScreen()
    currentOperand=""
})