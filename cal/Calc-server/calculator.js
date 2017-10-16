
function calculator(req,res) {
    //calculator computations
    var result1;
    if(req.params.val3=="1")
        { 
            result1=parseInt(req.params.val1) + parseInt(req.params.val2);
        }
    if(req.params.val3=="2")
        { 
            result1= parseInt(req.params.val1) - parseInt(req.params.val2);
        }
    if(req.params.val3=="3")
        { 
            result1= parseInt(req.params.val1) * parseInt(req.params.val2);
        }
   if(req.params.val3=="4")
        { 
            if(req.params.val2 == 0){
        result1 = "division by zero is undefined";
    }
          if(req.params.val2 != 0)  
              {
 result1= parseInt(req.params.val1) /parseInt(req.params.val2);}

    }
    var result = {
        'number1' : req.params.val1,
        'number2' : req.params.val2,
        'result' : result1
    }
    res.send(result);
}
function calculatorAutomate(req, res){
    var val1 = Math.random();
    var val2 = Math.random();
    var add = val1 + val2;
    var sub = val1 - val2;
    var mul = val1 * val2;
    var div;
    if(val2 == 0){
        div = "undefined";
    }
    else{
        div = val1 / val2;
    }
    var result = {
        'number1' : val1,
        'number2' : val2,
        'addition' : add,
        'subtraction' : sub,
        'multiplication' : mul,
        'division' : div
    }
    res.send(result);
}
exports.calculator=calculator;
exports.calculatorAutomate = calculatorAutomate;