import {
  Box,
  CircularProgress,
  IconButton,
  InputAdornment,
  InputBase,
} from "@mui/material";
import { useState } from "react";
import { BiPlusCircle } from "react-icons/bi";
import firebase from "../../lib/firebase";
import { ITodoItem } from "../../types";

export default function InputTodo({
  userId,
  onAddTodo,
}: {
  userId?: string;
  onAddTodo?: (value: ITodoItem) => void;
}) {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");

  const handleAddTodo = async () => {
    if (!userId) return;
    setLoading(true);
    const data = {
      content: input,
      authorId: userId,
      completed: false,
    };
    return firebase
      .saveData({
        collection: "todos",
        data,
      })
      .then((id) => {
        onAddTodo?.({ id: `${id}`, ...data });
        setLoading(false);
        setInput("");
      });
  };

  return (
    <Box
      sx={{
        position: "absolute",
        bottom: 0,
        borderTop: 1,
        borderColor: "divider",
        width: "100%",
        left: "0",
        padding: 2,
      }}
    >
      <InputBase
        onKeyPress={(event) => event.key === "Enter" && handleAddTodo()}
        placeholder="Type here to add new task item.."
        fullWidth
        value={input}
        disabled={loading}
        onChange={(e) => setInput(e.target.value)}
        inputProps={{ "aria-label": "description" }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              disabled={loading}
              aria-label="Send Todo"
              onClick={handleAddTodo}
            >
              {loading ? (
                <CircularProgress size={26} />
              ) : (
                <BiPlusCircle size={26} />
              )}
            </IconButton>
          </InputAdornment>
        }
      />
    </Box>
  );
}
