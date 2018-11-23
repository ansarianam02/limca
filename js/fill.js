$(function(){

      $('.btn-participate').hide();
      $('.btn-later').hide(); 
       var chance = true;

      var titleEmpty = "Awww! You have run out of your maaza stock! Buy more to fill more…";
      var tileOther = "";
      var map ={ M : '0','MA':'2','MAA':'3','MAAZ':'4','MAAZA':'5'};
      var nameMap ={ 0 : '--' , 1 : 'M' , 2 :'MA', 3 : 'MAA', 4 : 'MAAZ', 5: 'MAAZA'};
      var animationImage ;

      
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
      "url": "https://maazaprod.bigcityexperiences.com/v1/api/getgame",
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
              var levelNo = parseInt(stage) ;
              var level = nameMap[stage];
              tileOther = "Congratulations! You can now participate in lucky draw for "+ level +"! The higher the level the higher the reward. Buy more to fill more to win more…";
      
              //set depending on the level 
              $('.staticImg').css('background-image','url("img/static/'+levelNo+'-static.png")');
              //set animation Img
              

               //button text with leve 
              var txt ="Participate in lucky draw for level " + level;
              $('.btn-participate').html(txt);
              

              animationImage = new Image();
              animationImage.src = 'img/Animations/'+levelNo+'.gif';
             
              // staticImg animationImg
                //set level on yop
              $('.level-stage').html(level);  
  
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
    var elem = $(this);
     elem.html('FILLING IN YOUR MAAZA…');
     elem.addClass('btn-disabled');
     setTimeout(function(){  
      elem.html('SCAN ANOTHER QR CODE TO GET MAAZA');
      elem.addClass('btn-static');
      elem.removeClass('btn-disabled');

       //set seatus 
       if(stage==0)
          $('.status-title').html(titleEmpty);
       else
          $('.status-title').html(tileOther);
        
       //$('.status-title').css('visibility','visible');
         }, 2000);

     $('.btn-participate').show();
     $('.btn-later').show();


     //set level dynamically
     //$('.fill-container').css('background-image','url("img/Animations/'+levelNo+'.gif")'); 
     $('.fill-container').removeClass('static');
     $('.fill-container').css('background-image','url("'+animationImage.src+'")');
  });

  $(document).on('click','.btn-static',function(e){
    $('#btnQR').click();

   });
    
   $(document).on('','',function(){

   });

   $(document).on('click','.redirect-level-page',function(e){
        window.location ="winner-list.html";    
  });

   $(document).on('click','.btn-submit',function(e){
     //e.preventDefault();    
   });
  

});