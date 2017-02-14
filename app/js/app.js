/**
 * Events Identifier - Constant
 */

var EVENT = {
  TODO_ADD: 'todo:add',
  TODO_UPDATE: 'todo:update',
  TODO_REMOVE: 'todo:remove',
  PANEL_ON_EDIT: 'panel:edit',
  PANEL_REFRESH: 'panel:refresh'
};

/**
 * Component
 */
var panelBody = $('.panel');
var todoNameInput = $('#todoNameInput');
var formTodo = $('#formTodo');

var todos = [];


/**
 * Handle Event
 */

formTodo.submit(addTodo);

panelBody.on(EVENT.TODO_ADD, todoAdd);

panelBody.on(EVENT.PANEL_ON_EDIT, panelOnEdit);
panelBody.on(EVENT.PANEL_REFRESH, panelRefresh);


/**
 * Functions
 */

function panelRefresh() {
  var panel = $(this);
  //reset panel
  panel.empty();

  // todos = _.reverse(todos);

  //append content to panel
  _.each(todos, function (todo) {
    panel.append(todoRow(todo));
  });
}

function todoAdd() {
  var panel = $(this);
  //reset panel
  panel.empty();

  todos = _.reverse(todos);

  //append content to panel
  _.each(todos, function (todo) {
    panel.append(todoRow(todo));
  });
}


function addTodo(e) {
  e.preventDefault();
  todos.push({
    id: todos.length + 1,
    name: todoNameInput.val(),
    isEdit: false,
    createdAt: moment().format(),
    isDone: false
  });
  // reset todoNameInput
  todoNameInput.val(null);
  panelBody.trigger(EVENT.TODO_ADD);

  return;
}



function onClickTodoEdit(id) {
  panelOnEdit(id);
  var todo = getTodo(id);
  $('#name_edit' + id).val(todo.name);
}

function onClickTodoSaveEdit(id) {
  panelOnSaveEdit(id);
  var name = $('#name_edit' + id).val();
  var todos = updateTodo(id, name);
  panelBody.trigger(EVENT.PANEL_REFRESH);
}

function onClickTodoRemove(id) {
  var index = _.findIndex(todos, { id: id });
  todos.splice(index, 1);
  panelBody.trigger(EVENT.PANEL_REFRESH);
}

function onChangeIsDone(id) {
  var isDone = $('#is_done' + id).is(':checked');
  if (isDone) {
    panelIsDone(id);
  } else {
    panelNotDone(id);
  }
}

function panelNotDone(id) {
  $("#btn_edit" + id).show();
  $('#btn_remove' + id).show();
}

function panelIsDone(id) {
  $("#btn_edit" + id).hide();
  $('#btn_remove' + id).hide();
}

function panelOnEdit(id) {
  $('#name' + id).hide();
  $("#btn_edit" + id).hide();
  $('#btn_remove' + id).hide();
  $('#btn_save_edit' + id).removeClass('hide');
  $('#edit' + id).removeClass('hide');
}

function panelOnSaveEdit(id) {
  $('#name' + id).show();
  $("#btn_edit" + id).show();
  $('#btn_remove' + id).show();
  $('#btn_save_edit' + id).addClass('hide');
  $('#edit' + id).addClass('hide');
}

function getTodo(id) {
  var index = _.findIndex(todos, { id: id });
  var todo = todos[index];
  return todo;
}

function updateTodo(id, name) {
  var index = _.findIndex(todos, { id: id });
  todos[index].name = name;
  return todos;
}

function todoRow(todo) {

  var row = '<div class="panel-body"><div class="row">' +
    '<div class="col-md-8">' +
    '<div class="checkbox" ng-hide="todo.isEdit">' +
    '<label id="name' + todo.id + '">' +
    '<input type="checkbox" ng-model="todo.isDone" id="is_done' + todo.id + '" onchange="onChangeIsDone(' + todo.id + ')" /> <span > ' + todo.name + '</span>' +
    '</label>' +
    '</div>' +
    '<div class="form-group hide" id="edit' + todo.id + '" ng-show="todo.isEdit">' +
    '<input type="text" class="form-control" id="name_edit' + todo.id + '" ng-model="todo.editedName" ng-value="todo.name" />' +
    '</div>' +
    '</div>' +
    '<div class="col-md-4 text-right">' +
    '<div class="button-group" ng-show="!todo.isDone">' +
    '<button class="btn btn-default hide" id="btn_save_edit' + todo.id + '" onclick="onClickTodoSaveEdit(' + todo.id + ')" ng-show="todo.isEdit">' +
    '<i class="fa fa-save"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-success" id="btn_edit' + todo.id + '" onclick="onClickTodoEdit(' + todo.id + ')" ng-hide="todo.isEdit">' +
    '<i class="fa fa-pencil"></i>' +
    '</button>' +
    '<button type="button" class="btn btn-danger" id="btn_remove' + todo.id + '" onclick="onClickTodoRemove(' + todo.id + ')" ng-hide="todo.isEdit">' +
    '<i class="fa fa-trash"></i>' +
    '</button>' +
    '</div>' +
    '</div>' +
    '</div></div>';
  return row;
}



