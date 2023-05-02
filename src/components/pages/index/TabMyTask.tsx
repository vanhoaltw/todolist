import { CircularProgress, List, Stack, Typography } from "@mui/material";
import InputTodo from "../../HomeSections/InputTodo";
import TodoListItems from "../../HomeSections/TodoListItem";
import { useEffect, useState } from "react";
import firebase from "../../../lib/firebase";
import { useAuthState } from "../../contexts/UserContext";
import { ITodoItem } from "../../../types";

export default function TabMyTask() {
  const [todoState, setTodoState] = useState<{
    loading: boolean;
    data: ITodoItem[];
    total: number;
  }>({
    loading: true,
    data: [],
    total: 0,
  });

  const { state } = useAuthState();

  const onAddTodo = (value: ITodoItem) => {
    setTodoState((pre) => {
      const newTodo = [value, ...pre.data];
      return { loading: false, data: newTodo, total: pre.total + 1 };
    });
  };

  const onUpdateTodo = async (id: string, value: ITodoItem) => {
    await firebase
      .saveData({ collection: "todos", data: value, id })
      .then(() => {
        setTodoState((pre) => {
          const todoIndex = pre.data.findIndex((i) => i.id === id);
          pre.data[todoIndex] = { ...pre.data[todoIndex], ...value };
          return { ...pre };
        });
      });
  };

  const onDeleteTodo = async (todoId: string) => {
    await firebase.removeCollectionData({ collection: "todos", id: todoId });
    setTodoState((pre) => ({
      ...pre,
      data: pre.data.filter((i) => i.id !== todoId),
    }));
  };

  useEffect(() => {
    async function fetchTodosData() {
      setTodoState((pre) => ({ ...pre, loading: true }));
      const todos = await firebase.getCollectionData({
        collection: "todos",
        where: [{ field: "authorId", op: "==", value: state.user?.uid }],
      });
      setTodoState({
        loading: false,
        data: todos.data || [],
        total: todos.total,
      });
    }
    if (state.user?.uid) fetchTodosData();
  }, [state.user?.uid]);

  return (
    <div style={{ height: "100%" }}>
      {todoState.loading && (
        <Stack alignItems="center" justifyContent="center" height="100%" pb={6}>
          <CircularProgress sx={{ margin: "auto" }} />
        </Stack>
      )}
      {!todoState.loading && !todoState.data.length && (
        <Stack alignItems="center" justifyContent="center" height="100%" pb={6}>
          <img
            src="https://static.vecteezy.com/system/resources/previews/002/076/417/original/data-search-not-found-illustration-concept-vector.jpg"
            width={250}
            height="auto"
          />
          <Typography align="center" variant="h5">
            You don't have task
          </Typography>
        </Stack>
      )}
      {!todoState.loading && (
        <List>
          {todoState.data?.map?.((i: ITodoItem) => (
            <TodoListItems
              key={i?.id}
              item={i}
              onDeleteTodo={onDeleteTodo}
              onUpdateTodo={onUpdateTodo}
            />
          ))}
        </List>
      )}
      <InputTodo userId={state.user?.uid} onAddTodo={onAddTodo} />
    </div>
  );
}
