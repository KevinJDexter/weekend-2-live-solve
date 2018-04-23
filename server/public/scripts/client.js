console.log('js');

let currentType = '';
let currentX = '';
let currentY = '';

let updateTextOut = () => {
  let el = $( '#textOut' );
  el.empty();
  el.val(`${currentX} ${currentType} ${currentY}`);
}

let historyNow = () => {
  console.log('in historyNow');

  $.ajax({
    method: 'GET',
    url: '/history'
  })
    .then(function (response) {
      console.log('back from server with:', response);

      let el = $('#historyOut');
      el.empty();
      for (let i = 0; i < response.history.length; i++) {
        el.append(`<li>${response.history[i].x} ${response.history[i].type} ${response.history[i].y} = </li>`)
      }
    })
}

let answerMeThis = () => {
  console.log('in answerMeThis');

  $.ajax({
    method: 'GET',
    url: '/answer'
  })
    .then(function (response) {
      console.log('back from server with', response);
      historyNow();
      let el = $( '#textOut' );
      el.empty();
      el.val( response.answer );

    })
}

let doMathNow = () => {
  if (currentX == '' || currentY == '' || currentType == '') {
    alert('I don\'t understand!');
  } else {
    console.log('in doMathNow');
    let objectToSend = {
      x: currentX,
      y: currentY,
      type: currentType
    }
    console.log('sending to server:', objectToSend);

    $.ajax({
      method: 'POST',
      url: '/doMath',
      data: objectToSend
    })
      .then(function (response) {
        console.log('back from server with:', response);
        clearAll();
        answerMeThis();
      })
  }

}

let clearAll = () => {
  console.log('in clearAll');
  currentX = '';
  currentY = '';
  currentType = '';
  updateTextOut()
}

function setNumber() {
  if ( currentType == '') {
    currentX += $( this ).text();
  } else {
    currentY += $( this ).text();
  }
  updateTextOut();
}

function setOperator() {
  console.log('in setOperator:', $(this).text());
  currentType = $(this).text();
  updateTextOut();
}

let readyNow = () => {
  console.log('JQ');
  $('#doMathButton').on('click', doMathNow);
  $('.operatorTypeButtonThing').on('click', setOperator);
  $('#goAwayButton').on('click', clearAll);
  $('.numberButton').on('click', setNumber );
  historyNow();
}

$(document).ready(readyNow);