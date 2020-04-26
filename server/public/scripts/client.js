console.log('js ready');

$(document).ready(readyNow);

// Fires when document loads.
function readyNow() {
    console.log('jquery ready');
    getList();
    $('#addBtn').on('click', addTask);
    $('#list').on('click', '#deleteBtn', deleteTask);
    $('#list').on('click', '#completeBtn', completeTask);
}
// Sends new task input to database.
function addTask() {
    // Object to send to database.
    let task = {
        task: $('#taskInput').val(),
        priority: $('#priorityInput').val()
    }
    // Resets input values.
    $('#taskInput').val('');
    $('#priorityInput').val('low');
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
// Collects info from database to append to DOM.
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
// Appends info from GET request to the DOM.
function appendList(response) {
    console.log(response);
    // Empties element for new append data.
    let el = $('#list');
    el.empty();
    // Loops through array to append for each separate task.
    for (let i = 0; i < response.length; i++) {
            el.append(`
            <tr>
            <td class="task ${response[i].status} ${response[i].priority}" id="${response[i].id}">${response[i].task}</td>
            <td id="completeBtn" data-id="${response[i].id}" data-status="${response[i].status}"><input class="checkMark" type="image" src="../images/check-mark.jpg"></td>
            <td id="deleteBtn" data-id="${response[i].id}"><input class="trashCan" type="image" src="../images/trash-can.jpg"></td>
            </tr>
            `);
    }
}
// Updates task status in database.
function completeTask() {
    let id = $(this).data('id');
    let status = $(this).data('status');
    console.log('task completed', id, status);
    $.ajax({
        type: 'PUT',
        url: `/todo/${id}`,
        data: {
            status: status
        }
    }).then(function(response) {
        getList();
    }).catch(function(error) {
        console.log(error);
    })
}
// Deletes task from database.
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


