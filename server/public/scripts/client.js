console.log('js ready');

$(document).ready(readyNow);

function readyNow() {
    console.log('jquery ready');
    getList();
    $('#addBtn').on('click', addTask);
    $('#list').on('click', '#deleteBtn', deleteTask);
}

function addTask() {
    // Object to send to database.
    let task = {
        task: $('#taskInput').val(),
        priority: $('#priorityInput').val()
    }
    // Resets input values.
    $('#taskInput').val('');
    $('#priorityInput').val('low');
    // 
    $.ajax({
        type: 'POST',
        url: '/todo',
        data: task
    }).then(function (response) {
        console.log('back from /todo POST', response);
        getList()
    }).catch(function (error) {
        console.log('error in /todo POST');
    })

}

function getList() {
    console.log('in getTodoList');
    $.ajax({
        type: 'GET',
        url: '/todo',
    }).then(function (response) {
        console.log('in /todo GET:', response);
        appendList(response);
    }).catch(function (error) {
        console.log('error in /todo GET:', error);
    });
}

function appendList(response) {
    console.log(response);
    let el = $('#list');
    el.empty();
    for (let i = 0; i < response.length; i++) {
        el.append(`
            <tr>
            <td class="task" id="${response[i].id}"data-color="${response[i].color}">${response[i].task}</td>
            <td><button>Complete</button></td>
            <td id="deleteBtn" data-id="${response[i].id}"><button>Delete</button></td>
            </tr>
            `);
    }
}

function deleteTask() {
    let id = $(this).data('id');
    console.log('task deleted', id);
    $.ajax({
        type: 'DELETE',
        url: `/todo/${id}`,
    }).then(function(response) {
        console.log('in /todo DELETE', response);
        getList();
    }).catch(function(error) {
        console.log('error in /todo DELETE', error);
    })
}


