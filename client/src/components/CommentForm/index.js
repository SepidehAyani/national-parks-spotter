import { useState } from "react";
import { ADD_COMMENT } from "../../utils/mutations";
import { useMutation } from "@apollo/client";

import { TextField, Button } from "@mui/material";

const CommentForm = ({ id, comments, setComments }) => {
  const [formState, setFormState] = useState({ text: "" });
  const [addComment] = useMutation(ADD_COMMENT);

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      const mutationResponse = await addComment({
        variables: { commentText: formState.text, parkCode: id },
      });
      console.log(mutationResponse);
      console.log(mutationResponse.data.addComment);
      setComments([...comments, mutationResponse.data.addComment]);
      setFormState({ text: "" });
    } catch (err) {
      console.log(err);
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <TextField
        variant="outlined"
        label="Share your thoughts on this park!"
        value={formState.text}
        type="text"
        name="text"
        id="text"
        onChange={handleChange}
        multiline={true}
        rows={5}
      />
      <Button type="submit" variant="outlined">
        Submit
      </Button>
    </form>
  );
};

export default CommentForm;
