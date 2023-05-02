import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  Input,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import { useState } from "react";
import { AiFillDelete } from "react-icons/ai";
import { BiCheck } from "react-icons/bi";
import { ITodoItem } from "../../types";

export default function TodoListItems({
  item,
  onDeleteTodo,
  onUpdateTodo,
}: {
  item: ITodoItem;
  onUpdateTodo: (todoId: string, value: ITodoItem) => Promise<void>;
  onDeleteTodo: (todoId: string) => Promise<void>;
}) {
  const [isEdit, setIsEdit] = useState(false);
  const [newValue, setNewValue] = useState(item?.content);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    if (item.id) await onDeleteTodo(item.id);
    setIsDeleting(false);
  };

  return (
    <ListItem disablePadding role={undefined} dense>
      {/* {team && team.members && team.members.length > 1 && (
        <AssignDialog
          user={user}
          todoId={todo.id}
          open={openAssignDialog}
          onAssign={handleAssignTask}
          members={team.members}
          onClose={() => setOpenAssignDialog(false)}
        />
      )} */}
      <ListItemIcon>
        <Checkbox
          onClick={() =>
            item.id && onUpdateTodo(item?.id, { completed: !item?.completed })
          }
          edge="end"
          checked={item.completed}
          tabIndex={-1}
        />
      </ListItemIcon>
      <Box width="100%" mr={1}>
        {!isEdit ? (
          <ListItemButton sx={{ padding: 0 }} onClick={() => setIsEdit(true)}>
            {item?.content}
          </ListItemButton>
        ) : (
          <Input
            fullWidth
            autoFocus
            value={newValue}
            onFocus={() => setIsEdit(true)}
            onBlur={() => setIsEdit(false)}
            onChange={(evt) => {
              setNewValue(evt.target.value);
            }}
            placeholder="Edit todo item.."
            inputProps={{ "aria-label": "description" }}
          />
        )}
      </Box>
      <ListItemSecondaryAction>
        {isEdit && (
          <Tooltip title="Save">
            <IconButton
              edge="end"
              color="success"
              onClick={() => console.log("save")}
              aria-label="Save"
            >
              <BiCheck />
            </IconButton>
          </Tooltip>
        )}
        {!isEdit && (
          <Tooltip title="Delete">
            <IconButton
              edge="end"
              onClick={handleDelete}
              disabled={isDeleting}
              aria-label="delete"
            >
              {isDeleting ? (
                <CircularProgress size={22} />
              ) : (
                <AiFillDelete size={22} />
              )}
            </IconButton>
          </Tooltip>
        )}
        {/* {team && team.members && team.members.length > 1 && (
          <Tooltip title="Assign To">
            <IconButton
              edge="end"
              onClick={() => setOpenAssignDialog(true)}
              aria-label="assign tasks"
            >
              <AssignmentInd color="primary" />
            </IconButton>
          </Tooltip>
        )} */}
      </ListItemSecondaryAction>
    </ListItem>
  );
}
