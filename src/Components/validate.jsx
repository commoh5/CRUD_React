export default function validateInfo(values){
  let errors = {};

  let regexAge = /\d[0-9]/i;
  let regexPhone = /(84|0[3|5|7|8|9])+([0-9]{8})/;
  let regexName = /\D|\s/;

//Valid name
if(!values.name){
  errors.name = "Name required";
}else if(!regexName.test(values.name)){
  errors.name = "Name wrong format";
}

//Valid address
if(!values.address){
  errors.address = "Address required";
}else if(!regexName.test(values.address)){
  errors.address = "Address wrong format";
}

//Valid age
if(!values.age){
  errors.age = "Age required";
}else if(!regexAge.test(values.age)){
  errors.age = "Age only be an integer";
}

//Valid phone
if(!values.phone){
  errors.phone = "Age required";
}else if(!regexAge.test(values.phone)){
  errors.phone = "Address wrong format";
}
return errors;
}