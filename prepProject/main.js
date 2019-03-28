//////////////////////////helper function
function each(coll, func) {
  if(Array.isArray(coll)){
      for(var i=0; i<coll.length; i++){
          func(coll[i], i);
      }
  }else{
      for(var k in coll){
          func(coll[k], k);
      }
  }
}

function reduce(array, f, acc){
  if(acc === undefined){
      acc = array[0];
      array = array.slice(1);
  }
  each(array, function (element, i) {
      acc = f(acc , element, i);
  });
  return acc;
}
///////////////////////////////////////////////////////makeUser function

function makeUser(userName,creditcard,email,created_at,wallet) {
  var user = {};
  user.userName = userName;
  user.creditcard = creditcard;
  user.email = email;
  user.created_at = created_at;
  user.wallet = wallet;
  
  
  return user;
}


var customers = [];/////array of customer 

//////////////////////////////////////////////////// submit button 
$("#btnSubmit").click(function () {
  $( "#userInf" ).empty();
  $( "#itemName" ).empty();
  $( "#quantity" ).empty();
  $( "#price" ).empty();
  var user=makeUser();
  var userName = document.getElementById('txt1');
  var val;
  val = userName.value;
  var creditcard = $('#criditNum').val();
  var email = $('#email').val();
  var created_at =  new Date();
  var wallet =  Math.floor(Math.random() * (1500 - 100 + 1))+ 100;
  if (val === '' || email === "" ) {
    return alert("Worning You should fillout the empty filed. ");
  }else if(creditcard < 999 || creditcard > 9999){
      return alert('credit PIN should be 4 digit only')
  }else{
  user.userName=val;
  user.creditcard=creditcard
  user.email=email
  user.created_at=created_at
  user.wallet = wallet;
  customers.splice(0, 1, user);
  each(customers[0],function(value,key) {
    $('#userInf').append(key +": ", value, '<br>')
  })
  $('#sginInPage').hide();
  }
});

////////array of images

var imageElements = document.getElementsByTagName('img') 

///////////////////////////////////////sizing all images in the page 
 function img(array){

  for (var i = 0; i <array.length; i++) {
    array[i].style.height = '150px';
    array[i].style.width = 'auto' ;
  }
  return array

}

img(imageElements);

///////////////////////////////////////makeItem func. 
function makeItems(name, quality, specificaton, price, number) {
  return{
    Name: name,
    Quality: quality,
    Specificaton: specificaton,
    Price: price,
    number: number
  };
}

/////////////////arrayes of items
var item1 = makeItems('Dell', 'good quality', 'high', 300, 3)
var item2 = makeItems('lenovo', 'low quality', 'low',200, 2)
var item3 = makeItems('iphone 5', 'mediam quality', 'mediam', 400, 4)

/////////////////adding description of item
each(item1, function(item , k){
  $('.item1Space').append( $('<br> '), k + " :   " + item1[k] );
  $('.item2Space').append( $('<br> '), k + " :   " + item2[k] );
  $('.item3Space').append( $('<br> '), k + " :   " + item3[k] );
})

//////////////////////////////////body of the home bage 
$( document ).ready(function() {
    
  var cartCounter = 0;
  var $totalPrice = $('<p id="totalPrice">total price : </p>');
  var $totalQuantity = $('<p>total quantity :</p>')
  var prices = [ ];
  var quantities = [ ];

  //////////////////////////////////getTotalPrice
  function getTotalPrice(){
    return reduce(prices, function (total, value) {
      return total + value;
    },0)
  }

  //////////////////////////////////getTotalQuantity
  function getTotalQuantity(){
    return reduce(quantities, function (total, value) {
      return total + value;
    },0)
  }


  //////////////////////////////////////////first item
  $('#addCart1').click( function () {
    
    if (customers[0]) {
      if(item1['number'] > 0){
        item1['number'] += -1;
        cartCounter++;
        $('#cartt').val(cartCounter)
        $('#itemName').append(item1['Name'], '<br>')
        $('#quantity').append(1, '<br>')
        $('#price').append(item1['Price'], '<br>')
        prices.push(item1['Price']);
        quantities.push(1);
        $totalQuantity.text( getTotalQuantity())
        $('#quantity').append($totalQuantity)
        $totalPrice.text( getTotalPrice());
        $('#price').append($totalPrice)
     }else {
        alert(' No more item')
      }
    }else{
        alert('make sure you sgined in')
    }
  })
 
  //////////////////////////////////////////second item
  $('#addCart2').click( function () {
     //cartCounter = 0;
    if (customers[0]) {
      if(item2['number'] > 0){
        item2['number'] += -1;
        cartCounter++;  
        $('#cartt').val(cartCounter)
        $('#itemName').append(item2['Name'], '<br>')
        $('#quantity').append(1, '<br>')
        $('#price').append(item2['Price'], '<br>')
        prices.push(item2['Price']);
        quantities.push(1);
        $totalQuantity.text( getTotalQuantity())
        $('#quantity').append($totalQuantity)
        $totalPrice.text( getTotalPrice());
        $('#price').append($totalPrice)
      }else {
        alert(' No more item')
      }
    }else{
       alert('make sure you sgined in')
    }
  })
 
 //////////////////////////////////////////third item
  $('#addCart3').click( function () {
    if (customers[0]) {
      if(item3['number'] > 0){
        item3['number'] += -1;
        cartCounter++;
        $('#cartt').val(cartCounter)
        $('#itemName').append(item3['Name'], '<br>')
        $('#quantity').append(1, '<br>')
        $('#price').append(item3['Price'], '<br>')
        prices.push(item3['Price']);
        quantities.push(1);
        $totalQuantity.text( getTotalQuantity())
        $('#quantity').append($totalQuantity)
        $totalPrice.text( getTotalPrice());
        $('#price').append($totalPrice)
      }else {
       alert(' No more item')
      }
    }else{
       alert('make sure you sgined in')
    }
  })

/////////////////////////////////purchase func.
  $('#purchase').click(function () {
    var  newAmount = 0;
    var creditcardID = prompt("Enter your creditcard PIN");
    each(customers,function(element,i) {
      
      if (element['creditcard']  === creditcardID && element['wallet'] >= getTotalPrice()) {
       $('#walletDiv').hide();
       element['wallet'] = element['wallet'] - getTotalPrice();
       newAmount = element['wallet'];
       alert('your product is purchase \n Your wallet =  ' + newAmount )
         location.reload();
      }else{
          alert('check your wallet')
      }
    })

    
   })



});

 
///////////////////////////// Hide show toggle////////////////////
/////////////////////////////////////////////togle func.
  function togle(submitButton,destination,pageAsString) {
    destination.toggle();
    if(submitButton.text() === ('Show ' + pageAsString)){
        submitButton.text('Hide '+ pageAsString);
      } else {
        submitButton.text('Show ' + pageAsString);
      }
  }
/////////////////////////////////hide cart
  $('#cartPage').hide();

  $('.add1').click(function(){
    togle($('.add1'),$('#cartPage'),'cart');
  });

  $('.add2').click(function () {
    togle($('.add2'),$('#cartPage'),'cart');
  })

  $('.add3').click(function () {
    togle($('.add3'),$('#cartPage'),'cart');
  })

  $('#btnCart').click(function () {
    $('#cartPage').toggle();
  })

/////////////////////////////////hide sgin in
$('#sginInPage').hide();

$('#btnSginIn').click(function(){
    $('#sginInPage').fadeToggle();
  });
/////////////////////////////////hide wallet
$('#walletDiv').hide();

$('#btnWallet').click(function(){
    $('#walletDiv').fadeToggle();
  });





// var item1 = makeItems('Dell', 'good quality', 'high', 300, 3)
// var item2 = makeItems('lenovo', 'low quality', 'low',200, 2)
// var item3 = makeItems('iphone 5', 'mediam quality', 'mediam', 400, 4)
// $('#itemName').append(item2['Name'], '<br>')
//     $('#quantity').append(1, '<br>')
//     $('#price').append(item2['Price'], '<br>')
    
    
























