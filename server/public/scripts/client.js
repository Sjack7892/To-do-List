console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    getList();
}

function getList() {
    console.log('in getTodoList');
    $.ajax({
        type: 'GET',
        url: '/todo',
    }).then(function(response) {
        console.log('in /todo GET:', response);
        appendList(response);
    }).catch(function(error) {
        console.log('error in /todo GET:', error);
    });
}

function appendList(response) {
    console.log(response);
    let el = $('#list');
    el.empty();
    for (let i = 0; i < response.length; i++) {
        el.append(`
        <li>${response[i].task}</li>
        `);
    }
}