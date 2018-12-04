var prizeMap = {
                            1:{
                              text:'Smart Backpack',
                              imgUrl :'img/SmartBackpack.png'
                            },
                            2:{
                              text:'Headphone',
                              imgUrl :'img/Headphone.png',
                            },
                            3:{
                              text:'Instant Camera',
                              imgUrl :'img/InstantCamera.png'
                            },
                            4:{
                              text:'DSLR Camera',
                              imgUrl :'img/DSLRCamera.png'
                            },
                            5:{
                              text:'Smartphone',
                              imgUrl :'img/Smartphone.png'
                            }
                          };



$(function(){
  $('#partiImg').css('background-image','url("img/SmartBackpack.png")');
  var level = localStorage.getItem('level')|| '--';
  $('.level-stage').html(level);
});
$('#level').on('change', function (e) {   
    var valueSelected = this.value
    var imgPath = prizeMap[valueSelected].imgUrl;
    var prodName = prizeMap[valueSelected].text;
    var prevLevel = $('#levelCorner').attr('data-level');
    //set next level in data
    $('#levelCorner').attr('data-level',valueSelected);
    $('#levelCorner').removeClass('level'+prevLevel).addClass('level'+valueSelected);

    $('.partiText').html(prodName)
    $('#partiImg').css('background-image','url('+ imgPath +')');
    //.attr('src',imgPath);
    
});