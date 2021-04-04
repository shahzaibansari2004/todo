//a todo list object a place to store to todos and it's methods

var todoList = {

    todos: [],
  
    addTodo: function ( todoText ) {
      // push a todo object into the todos array ^^^ this models what a todo item looks like
      this.todos.push( {
        todoText: todoText,
        completed: false
      } );
  
    },
  
    changeTodo: function ( pos, todoText ) {
      // takes a position in that array and changes the text
      this.todos[ pos ].todoText = todoText;
  
    },
  
    deleteTodo: function ( pos ) {
      // takes a position in the array and spices it from the array from the position is is given
      this.todos.splice( pos, 1 );
  
    },
  
    toggleCompleted: function ( pos ) {
      // toggles the completed property form true <--> false
      var todo = this.todos[ pos ];
      todo.completed = !todo.completed;
  
    },
  
    toggleAll: function () {
      // toggles all items in the todo array
      var totalTodos = this.todos.length;
      var completedTodos = 0;
  
      //get completedTodos
      this.todos.forEach( function ( todo ) {
        if ( todo.completed === true ) {
          completedTodos++;
        }
      } );
  
      //toggling completed on/off
      this.todos.forEach( function ( todo ) {
        completedTodos === totalTodos ? todo.completed = false : todo.completed = true;
      } );
  
    }
  };
  
  //handler object
  
  var handlers = {
    toggleAll: function () {
      todoList.toggleAll();
      view.displayTodos();
    },
    addTodo: function () {
      var addTodo = document.getElementById( 'addTodo' );
      todoList.addTodo( addTodo.value );
      addTodo.value = '';
      view.displayTodos();
    },
    changeTodo: function () {
      var changeTodoPos = document.getElementById( 'changeTodoPos' );
      var changeTodoText = document.getElementById( 'changeTodoText' );
      todoList.changeTodo( changeTodoPos.valueAsNumber, changeTodoText.value );
      changeTodoPos.value = '';
      changeTodoText.value = '';
      view.displayTodos();
    },
    deleteTodo: function ( position ) {
      todoList.deleteTodo( position );
      view.displayTodos();
    },
    toggleCompleted: function () {
      var toggleCompletedPos = document.getElementById( 'toggleCompletedPos' );
      todoList.toggleCompleted( toggleCompletedPos.valueAsNumber );
      toggleCompletedPos.value = ''; // clears value in form field
      view.displayTodos();
    }
  };
  
  var view = {
    displayTodos: function () {
      var todoUl = document.querySelector( 'ul' );
      todoUl.innerHTML = ''; //clears the ul
      todoList.todos.forEach( function ( todo, pos ) {
        var todoLi = document.createElement( 'li' ); //forEach
  
        var todoTextWithCompletion = '';
  
        // add completed data
        if ( todo.completed === true ) {
          todoTextWithCompletion = '(x) ' + todo.todoText
        } else {
          todoTextWithCompletion = '( ) ' + todo.todoText
        }
  
        todoLi.id = pos; //from the iteration ^^
        todoLi.textContent = todoTextWithCompletion;
        todoLi.appendChild( this.createDeleteButton() );
        todoUl.appendChild( todoLi );
      }, this ); // passing in this aswell as callback to refer to the view object
    },
    createDeleteButton: function () {
      //create button
      var deleteButton = document.createElement( 'button' );
      //insert text
      deleteButton.textContent = 'Delete';
      //add class name
      deleteButton.className = 'deleteButton';
      return deleteButton;
    },
    setUpEventListeners: function () {
      var todosUl = document.querySelector( 'ul' );
      todosUl.addEventListener( 'click', function ( event ) {
        //Get elememt that was clicked on
        var elementClicked = event.target
  
        //check if elememt clicked is a delete button
  
        if ( elementClicked.className === 'deleteButton' ) {
          //Run handlers.deleteTodo
          var position = parseInt( elementClicked.parentNode.id );
          handlers.deleteTodo( position );
        }
      } );
    }
  };
  
  view.setUpEventListeners();
  //utility higher order function
  function runWithDebugger( ourFunction ) {
    debugger;
    ourFunction();
  }
  