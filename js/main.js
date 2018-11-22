 //first Page
 var validMobileNumber = "Please Enter Valid Mobile Number .";
 var emptyMobileNumber = "Please Enter Mobile Number to continue";
 var termsError ="Please Agree to terms and condition";
 var emptyOtp = "Please Enter OTP ";
 var registMandatory = "Please fill All Mandatory fields";
 var ValidEmailError = "Please Enter Valid Email ID";

  $(document).on('click','.btn-mobile-submit',function(e){
  	hideError();
    e.preventDefault();
    var phoneVal = $('#phonenumber').val();
    var terms = $('#terms').is(":checked");

    if(phoneVal.length <=0 ){
    	showError(emptyMobileNumber);
    	return true;
    }

    var valid = phonenumber(phoneVal); 
    if(!valid){

      //show Error that mobile Number is not valid
      showError(validMobileNumber);
      return true;
    }else if(!terms){      
      //show terms Error
      showError(termsError);
      return false;
	}else{
	   registeruser(phoneVal);    	
	}	
    
  });

  $(document).on('click','.validate-otp',function(e){
     e.preventDefault();
     hideError();
    
     var isDisabled =  $('.validate-otp').hasClass('btn-disabled');
     if(isDisabled){
     	return true;
     }
     
    //otp empty
    var otpVal = $('#otpvalue').val();
    if(otpVal.length <=0 ){
    	showError(emptyOtp);
    	return true;
    }else{
		validateotp(otpVal);    
    }
    
  });


  $(document).on('click','.btn-detail-submit',function(e){
    e.preventDefault();
    hideError();
    
    var firstVal = $('#firstname').val();
    var emailVal = $('#email').val();
    var cityVal = $('#city').val();
    var stateVal = $('#state').val()
    var isEmailValid = isEmail(emailVal);
    var isTerms = $('#otp-terms').is(":checked");

    if(firstVal.length <=0 || emailVal.length <=0  || isEmpty(cityVal) || isEmpty(stateVal) ) {
    	showError(registMandatory);
    	return true;
    }else if(!isEmailValid){
    	showError(ValidEmailError);
    	return true;
    }else if(!isTerms){
    	 //show terms Error
     	 showError(termsError);
      	 return false;
    }else{
    	//redirect to next Page
    	updateuser()
    //window.location='fill.html';	
    }
    
  });
  function isEmpty(value){
  return (value == undefined || typeof value == undefined || value.length === 0);
}
   function showError(errMsg) {
	  	$('.err-container').show();
	    $('.err-msg').html(errMsg);
   }

   function hideError(){
		$('.err-container').hide();
   }
   function isEmail(email) {
	  var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	  return regex.test(email);
	}

var baseUrl =  'https://maazaapi.bigcityredemption.com/api/';
var tokenVal = '123123123';
/*
* authenticate($user, $pass) $result = [
'type' => 'ERROR', 'msg' => 'Authentication failed', 'status' => 10, ]; $result = [
'type' => 'ERROR', 'msg' => 'Session invalid', 'status' => 15, ]; $result = [
'type' => 'SUCCESS', 'msg' => 'Authentication successful', 'data' => [ $token => 'asd!@#!#ASDASED' ], 'status' => 1, ];
*
*/ 
var authenticate =function(){

var userVal = '';
var passVal = '';

/*$.ajax({
  type: "GET",
  url: baseUrl + "authenticate",
  data: {
	  	user: userVal ,
	  	pass :passVal
  	},
  cache: false,
  success: function(data){
     $("#resultarea").text(data);
  }
});*/



}


/*
* checkuser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'Valid User', 'status' => 1, ];
*
*****/
var checkuser =function(mobilenum){

var form = new FormData();
form.append("token", tokenVal);
form.append("mobilenum",mobilenum);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://maazaprod.bigcityexperiences.com/v1/api/checkuser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0307db79-5eec-1590-dade-133827dbc697"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
	var res =JSON.parse(response)
    if(res.status==1){
       //show otp and hide Error
	   $('.regSection').hide();
	   $('.banner-container').remove();
	   $('.otpSection').show();
	   $('.err-container').hide();

    }else{

    }
    
});



}


/*
registeruser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'User registered', 'status' => 1, ];

*/
var registeruser =function(mobilenum){

var form = new FormData();
form.append("token", tokenVal);
form.append("mobilenum",mobilenum);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://maazaprod.bigcityexperiences.com/v1/api/registeruser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "0307db79-5eec-1590-dade-133827dbc697"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
	var res =JSON.parse(response)
    if(res.status==1){
       //show otp and hide Error
	   $('.regSection').hide();
	   $('.banner-container').remove();
	   $('.otpSection').show();
	   $('.err-container').hide();

    }else{

    }
    
});

}


/*
*validateotp($token, $otp) $result = [
'type' => 'SUCCESS', 'msg' => 'OTP OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'OTP not valid’, 'status' => 0, ];
*/
var validateotp =function(otpNumber){

var form = new FormData();
form.append("token", tokenVal);
form.append("otp", otpNumber);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://maazaprod.bigcityexperiences.com/v1/api/validateotp",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "33f15ab9-bef1-1aeb-da10-9a973d8fd501"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
  //disable btn for 30 sec
  $('.validate-otp').addClass('btn-disabled');
  //enable after 30 sec
  setTimeout(function(){ $('.validate-otp').removeClass('btn-disabled'); }, 30000);
  
  var res =JSON.parse(response)
  if(res.status==1){
    // show More detail section
    $('.otpSection').hide();
    $('.moreDetailSection').show();
  }
 });

}


/*
* resendotp($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Do check first’, 'status' => 0, ];
*/
var resendotp =function(){

var tokenVal = '';
var mobilenumVal = '';

$.ajax({
  type: "GET",
  url: baseUrl + "resendotp",
  data: {
	  	token: tokenVal ,
	  	mobilenum :tokenVal
  	},
  cache: false,
  success: function(data){
     $("#resultarea").text(data);
  }
});

}



/*
*  updateuser($token, $name, $email, $city, $state) $result = [
'type' => 'SUCCESS', 'msg' => 'Updated OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Invalid ...’, 'status' => 0, ];
*/
var updateuser =function(name,email,city,state){

var tokenVal = '';
var mobilenumVal = '';

var form = new FormData();
form.append("token", tokenVal);
form.append("name", name);
form.append("email", email);
form.append("city", city);
form.append("state", state);

var settings = {
  "async": true,
  "crossDomain": true,
  "url": "https://maazaprod.bigcityexperiences.com/v1/api/updateuser",
  "method": "POST",
  "headers": {
    "cache-control": "no-cache",
    "postman-token": "29bb3f58-fcb2-c17d-5114-48b4c5035200"
  },
  "processData": false,
  "contentType": false,
  "mimeType": "multipart/form-data",
  "data": form
}

$.ajax(settings).done(function (response) {
   var res =JSON.parse(response)
  if(res.status==1){
  	window.location='fill.html';
  }

});
}


/*
*  getgame($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
*/
var getgame =function(){

var tokenVal = '';
var mobilenumVal = '';

$.ajax({
  type: "GET",
  url: baseUrl + "getgame",
  data: {
	  	token: tokenVal ,
	  	mobilenum :tokenVal
  	},
  cache: false,
  success: function(data){
     $("#resultarea").text(data);
  }
});

}


/*
*  closegame($token, $iscomplete, $userchoice) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
Iscomplete – true or false to indicate if game was successfully done

*
*/
var closegame =function(){

var tokenVal = '';
var mobilenumVal = '';

$.ajax({
  type: "GET",
  url: baseUrl + "closegame",
  data: {
	  	token: tokenVal ,
	  	mobilenum :tokenVal
  	},
  cache: false,
  success: function(data){
     $("#resultarea").text(data);
  }
});

}



var phonenumber = function (inputtxt){
  var phoneno = /^\d{10}$/;
  if(inputtxt.match(phoneno)){
      		return true;
    }else{
        return false;
   }
}


/*

API details 

authenticate($user, $pass) $result = [
'type' => 'ERROR', 'msg' => 'Authentication failed', 'status' => 10, ]; $result = [
'type' => 'ERROR', 'msg' => 'Session invalid', 'status' => 15, ]; $result = [
'type' => 'SUCCESS', 'msg' => 'Authentication successful', 'data' => [ $token => 'asd!@#!#ASDASED' ], 'status' => 1, ];
checkuser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'Valid User', 'status' => 1, ];
registeruser($token, $mobilenum) $result = [
'type' => 'SUCCESS', 'msg' => 'User registered', 'status' => 1, ];
validateotp($token, $otp) $result = [
'type' => 'SUCCESS', 'msg' => 'OTP OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'OTP not valid’, 'status' => 0, ];
resendotp($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Do check first’, 'status' => 0, ];
updateuser($token, $name, $email, $city, $state) $result = [
'type' => 'SUCCESS', 'msg' => 'Updated OK', 'status' => 1, ]; $result = [
'type' => 'ERROR', 'msg' => 'Invalid ...’, 'status' => 0, ];
getgame($token) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
closegame($token, $iscomplete, $userchoice) $result = [
'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
$result = [
'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
Iscomplete – true or false to indicate if game was successfully done


*/