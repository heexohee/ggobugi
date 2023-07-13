import React, { useState } from 'react';
import {
  Button,
  InputContainer,
  PageWrapper,
  TodoCard,
  TodoContainer,
  TodoHeader,
  TodoListContainer,
} from './components/styles';
import nextId from 'react-id-generator';
import { useDispatch, useSelector } from 'react-redux';
import { __addToDo, __deleteTodo } from './redux/modules/todosSlice';

function App() {
  const id = nextId();
  const dispatch = useDispatch();
  const todos = useSelector((state) => state.todos.list);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');

  const onAddTodo = () => {
    /**
     * 시험 문제 1.
     * 이곳에서 추가하기 기능을 구현해주세요.
     */
    // 추가하기 기능
    // createAsyncThunk를 사용하여 __addToDo 액션을 dispatch합니다.
    dispatch(__addToDo({ id, title, body }));
    resetInputs(); // 입력 값을 초기화합니다.
    
  };

  const onDeleteTodo = (id) => {
    /**
     * 시험 문제 2.
     * 이곳에서 삭제하기 기능을 구현해주세요.
     */
      dispatch(__deleteTodo(id));
  };
  
  const resetInputs = () => {
    /**
     * 입력 값을 초기화하고 싶다면 사용하세요.
     */
    setTitle('');
    setBody('');
  };
  const onChangeTitle = (e) => setTitle(e.target.value);
  const onChangeBody = (e) => setBody(e.target.value);
  
  
  return (
    <PageWrapper>
      <TodoContainer>
        <TodoHeader>🐢 꼬부기 TODO LIST 🐢</TodoHeader>
        <InputContainer>
          <span>꼬북: </span>
          <input
            value={title}
            placeholder="할 일 제목"
            onChange={onChangeTitle}
          />
          <span>꼬북: </span>
          <input
            value={body}
            placeholder="할 일 내용"
            onChange={onChangeBody}
          />

          <Button onClick={onAddTodo}>+ 추가하기</Button>
        
        </InputContainer>

{/* // 투두 리스트 부분  */}
        <TodoListContainer>
          {todos.map((todo) => (
            <TodoCard key={todo.id}>
              <span>제목: {todo.title}</span>
              <span>할 일: {todo.body}</span>
              <Button onClick={() => onDeleteTodo(todo.id)}>삭제하기</Button>
            </TodoCard>
          ))}
        </TodoListContainer>
      </TodoContainer>
    </PageWrapper>
  );
}

export default App;
