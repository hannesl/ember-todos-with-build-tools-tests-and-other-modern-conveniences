test("a Todo begins with completed set to false", function(){
  var todo = Todos.Todo.createRecord();
  equal(todo.get('completed'), false);
});

test("a Todo has access to the localStore store", function(){
  var todo = Todos.Todo.createRecord();
  ok(todo.store instanceof DS.Store, "todo's store is a Store");
});

test("when a Todo's title changes it automatically saves", function(){
  var todo = Todos.Todo.createRecord();
  var recordAttributeDidChange = sinon.stub(todo.store, 'recordAttributeDidChange');

  Ember.run(function(){
    todo.set('title', 'a new title');
  });

  ok(recordAttributeDidChange.calledOnce);

  recordAttributeDidChange.restore();
});

test("when a Todo's completed status changes it automatically saves", function(){
  var todo = Todos.Todo.createRecord();
  var recordAttributeDidChange = sinon.stub(todo.store, 'recordAttributeDidChange');

  Ember.run(function(){
    todo.toggleProperty('completed');
  });

  ok(recordAttributeDidChange.calledOnce);

  recordAttributeDidChange.restore();
});

test("the Todos application has access to the store", function(){
  ok(Todos.store instanceof DS.Store, "Todo store is a Store");
});

test("creating a Todo proxies to the store", function(){
  var create = sinon.stub(Todos.store, 'createRecord'),
      properties = {title: 'hi'};
  Todos.Todo.createRecord(properties);

  ok(create.calledOnce);
  create.restore();
});

test("destroying a Todo proxies to the store", function(){

  var deleteRecord = sinon.stub(Todos.store, 'deleteRecord'),
      todo = Todos.Todo.createRecord({title: 'hi'});

  todo.deleteRecord(todo);
  ok(deleteRecord.calledOnce);
  deleteRecord.restore();

});

test("asking for all todos proxies to the store", function(){
  var all = sinon.stub(Todos.store, 'all');
  Todos.Todo.all();

  ok(all.calledOnce);
  all.restore();
});