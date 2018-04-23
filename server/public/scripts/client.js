console.log('js');

let currentType = '';
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
      el = $('#answerOut');
      el.empty();
      el.append('Answer: ' + response.answer);

      historyNow();
    })
}

let doMathNow = () => {
  if ($( '#xIn' ).val() == '' || $( '#yIn' ).val() == '' || currentType == '') {
    alert('no empties yo!');
  } else {
    console.log('in doMathNow');
    let objectToSend = {
      x: $('#xIn').val(),
      y: $('#yIn').val(),
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
        answerMeThis();
      })
  }

}

let clearAll = () => {
  console.log('in clearAll');
  $('#xIn').val('');
  $('#yIn').val('');
}

function setOperator() {
  console.log('in setOperator:', $(this).text());
  currentType = $(this).text();
}

let readyNow = () => {
  console.log('JQ');
  $('#doMathButton').on('click', doMathNow);
  $('.operatorTypeButtonThing').on('click', setOperator);
  $('#goAwayButton').on('click', clearAll);
  historyNow();
}

$(document).ready(readyNow);