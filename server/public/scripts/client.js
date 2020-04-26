console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    getList();
    assignTaskColor();
    $('#addBtn').on('click', addTask);
}

function addTask() {
    // Object to send to database.
    let task = {
        task: $('#taskInput').val(),
        priority: $('#priorityInput').val(),
        color: $('#colorInput').val()
    }
    // Resets input values.
    $('#taskInput').val('');
    $('#priorityInput').val('low');
    $('#colorInput').val('');
    
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: task
    }).then(function(response) {
        console.log('back from /todo POST', response);
        getList()
    }).catch(function(error) {
        console.log('error in /todo POST');
    })
    
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
        if(response[i].color == 'blue') {
            el.append(`
            <li class="task blue"  id="${response[i].id}"data-color="${response[i].color}">${response[i].task}</li>
            `);
        } else {
            el.append(`
            <li class="task" id="${response[i].id}"data-color="${response[i].color}">${response[i].task}</li>
            `);
        }
       
    }
}

function assignTaskColor() {
    console.log($('.task').data('color'));
   
}