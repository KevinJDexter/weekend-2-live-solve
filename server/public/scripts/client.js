console.log( 'js' );

let currentType = '';
let answerMeThis = () => {
  console.log( 'in answerMeThis' );

  $.ajax({
    method: 'GET',
    url: '/answer'
  })
    .then( function( response ) {
      console.log( 'back from server with', response );
    })
}

let doMathNow = () => {
  console.log('in doMathNow');
  let objectToSend = {
    x: $( '#xIn' ).val(),
    y: $( '#yIn' ).val(),
    type: currentType
  }
  console.log( 'sending to server:', objectToSend );

  $.ajax({
    method: 'POST',
    url: '/doMath',
    data: objectToSend
  }) 
    .then( function( response ) {
      console.log( 'back from server with:', response);
      answerMeThis();
    })
}

function setOperator () {
  console.log( 'in setOperator:' , $( this ).text());
  currentType = $( this ).text();
}

let readyNow = () => {
  console.log( 'JQ' );
  $( '#doMathButton' ).on('click', doMathNow );
  $( '.operatorTypeButtonThing' ).on( 'click', setOperator );
}

$( document ).ready( readyNow );