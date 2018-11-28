$(function(){

      $('.btn-participate').hide();
      $('.btn-later').hide(); 
       var chance = true;
        var prizeMap = {
                            1:{
                              text:'Philips Bass+ SHL3070 Headphones',
                              imgUrl :'img/gift.png'
                            },
                            2:{
                              text:'Anti-Theft Smart Bagpack',
                              imgUrl :'img/ANTI_THEFT_BAG.png',
                            },
                            3:{
                              text:'Fujifilm Instax Square SQ6 Instant Camera',
                              imgUrl :'img/Fujifilm_Instax_Square.jpg'
                            },
                            4:{
                              text:'Cannon EOS 3000D 18MP DSLR Camera',
                              imgUrl :'img/canon.png'
                            },
                            5:{
                              text:'Smart phone - iPhone X (256 GB)',
                              imgUrl :'img/Smartphone.png'
                            }
                          };


      var titleEmpty = "Awww! You have run out of your maaza stock! Buy more to fill more…";
      var tileOther = "";
      var map ={ M : '0','MA':'2','MAA':'3','MAAZ':'4','MAAZA':'5'};
      var nameMap ={ 0 : '--' , 1 : 'M' , 2 :'MA', 3 : 'MAA', 4 : 'MAAZ', 5: 'MAAZA'};
      var animationImage ;
      var apiurl = "https://maazaprod.bigcityexperiences.com/v1/api/"

/*    var level = 'MAAZ';
      //pass Api letter Number here
      var levelNo = parseInt(map[level]) ;

      //set depending on the level 
      $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
      //set animation Img
      

      var animationImage = new Image();
      animationImage.src = 'img/Animations/'+levelNo+'.gif';
     
      // staticImg animationImg
        //set level on yop
      $('.level-stage').html(level);  
  

*/
   /*
    *  getgame($token) $result = [
    'type' => 'SUCCESS', 'msg' => 'OK', 'data' => [ $letterno => 1 ], 'status' => 1, ];
    $result = [
    'type' => 'ERROR', 'msg' => 'Game not eligible’, 'data' => [], 'status' => 0, ];
    */
var stage ;
var getgame =function(){

    var form = new FormData();
    form.append("token", "123123123");

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": apiurl+"getgame",
      "method": "POST",
      "headers": {
        "cache-control": "no-cache",
        "postman-token": "5dec963e-f441-9f3a-49a8-cca354f10bea"
      },
      "processData": false,
      "contentType": false,
      "mimeType": "multipart/form-data",
      "data": form
    }

    $.ajax(settings).done(function (response) {
       var res =JSON.parse(response)
      if(res.status==1){
              stage = res.data.letterno;
              //pass Api letter Number here 
              var levelNo = parseInt(stage);
              var level = nameMap[stage];
              newLevel = nameMap[stage+1];
              if (levelNo < 5) {
              tileOther = "Congratulations! You can now participate in lucky draw for '"+ newLevel +"'! The higher the level the higher the reward. Buy more to fill more to win more…";
      
              //set depending on the level 
              $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
              //set animation Img
              

               //button text with leve 
              var txt ="Participate in lucky draw for level '" + newLevel + "'";
              $('.btn-participate').html(txt);
              
              //set participate modal image 
              $('#partiImg').css('background-image','url('+ prizeMap[stage].imgUrl +')');
              $('#partiImg2').css('background-image','url('+ prizeMap[stage].imgUrl +')');

              animationImage = new Image();
              var gifNo = levelNo+1;
              animationImage.src = 'img/Animations/'+gifNo+'.gif';
             
              // staticImg animationImg
                //set level on yop
              $('.level-stage').html(level); 

              } else {
                //for the maaza mega draw 
              $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
                var txt ="Participate in the MAAZA MEGA DRAW"
                $('.confmodaltext').html("Please confirm your participation in the MAAZA MEGA DRAW.")
                $('#partiImg').css('background-image','url('+ prizeMap[stage].imgUrl +')');
                $('#partiImg2').css('background-image','url('+ prizeMap[stage].imgUrl +')');
              $('.btn-participate').html(txt);
                $('.btn-fill').hide();
                $('.btn-participate').show();
                $('.level-stage').html(level);
                var megaTitle = "Congratulations! You have reached the MAAZA level, you can now participate in the MAAZA MEGA DRAW";
                $('.status-title').html(megaTitle);
              } 
      }
    });

    }

  //call game
  getgame();
 
  $(document).on('click','.btn-fill',function(e){
    if(!chance) 
      return true;  
    //e.preventDefault();
    chance = false;
    if(parseInt(newLevel.length) < 5) {
    var elem = $(this);
     elem.html('FILLING IN YOUR MAAZA…');
     elem.addClass('btn-disabled');
     $('.status-title').html("Please wait while we fill the letter with yummy maaza...");
     setTimeout(function(){  
      // elem.html('SCAN ANOTHER QR CODE');
      elem.hide();
      elem.addClass('btn-static');
      elem.removeClass('btn-disabled');
       //set seatus 
       if(stage==0)
          $('.status-title').html(titleEmpty);
       else
          $('.status-title').html(tileOther);
        
       //$('.status-title').css('visibility','visible');
          //show reminder modal 
         
         }, 4700);

     $('.btn-participate').delay(4700).show(0);
     $('.btn-later').delay(4700).show(0);

     //show reminder popup
     setTimeout(function(){
       $('#reminderModal').modal('show'); 
    }, 5300);


      
     setTimeout(function(){
      $('.level-stage').html(newLevel);
    }, 4700);


     //set level dynamically
     //$('.fill-container').css('background-image','url("img/Animations/'+levelNo+'.gif")'); 
     $('.fill-container').removeClass('static');
     $('.fill-container').css('background-image','url("'+animationImage.src+'")');

     } else {
      var elem = $(this);
     elem.html('FILLING IN YOUR MAAZA…');
     elem.addClass('btn-disabled');
     $('.fill-container').removeClass('static');
     $('.fill-container').css('background-image','url("'+animationImage.src+'")');
                var txt ="Participate in the MAAZA MEGA DRAW"
              $('.btn-participate').html(txt);
                $('.btn-fill').delay(4700).hide(0);
                $('.btn-participate').delay(4700).show(0);
                
                $('.status-title').html("Please wait while we fill the letter with yummy maaza...");
                setTimeout(function(){
                var megaTitle = "Congratulations! You have reached the MAAZA level, you can now participate in the MAAZA MEGA DRAW";
                $('.level-stage').html(newLevel);
                $('.status-title').html(megaTitle);

                }, 4700);
     }


  });

  // $(document).on('click','.btn-static',function(e){
  //   $('#btnQR').click();

  //  });

$(document).on('click','.btn-confirm-participate',function(e){
    $('#partconfirmModal').modal('show');
    $('#reminderModal').modal('hide');  

   });

  var participateOnce = false;
   $(document).on('click','.btn-participate',function(){
      if(participateOnce)
        return true;

      participateOnce = true;
      $(this).addClass('btn-disabled').removeAttr('data-toggle').removeAttr('data-target');;
      $(this).html('Participate in MAAZA MEGA DRAW');
   });

   $(document).on('click','.redirect-level-page',function(e){
        window.location ="winner-list.html";    
  });

   $(document).on('click','.btn-submit',function(e){
     //e.preventDefault();    
   });
  

});
