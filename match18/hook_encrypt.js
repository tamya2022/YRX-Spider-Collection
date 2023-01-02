encrypt = _[1][0]['CryptoJS']['AES']['encrypt']
_[1][0]['CryptoJS']['AES']['encrypt']=function(a,b,c,d,e){
    var result = encrypt(a,b,c,d,e);
    console.log(result.toString())
    debugger;
    return a;
}