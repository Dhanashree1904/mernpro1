import React, { useEffect } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import TextField from "@mui/material/TextField";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { makeStyles } from "@mui/material/styles";
import Submit from "./DocumentsListLogic";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";

import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";

import "./DocumentsList.css";

const useStyles = makeStyles((theme) => ({
  submit: {
    display: "block",
    margin: theme.spacing(4, "auto", 2, "auto"),
    fontSize: "16px",
    width: "220px",
    padding: "10px 0",
  },
  deleteButton: {
    margin: theme.spacing(-1.2, 0, 0, 0),
    float: "right",
    zIndex: "999",
  },
  root: {
    width: 250,
    margin: theme.spacing(2, 0, 0, 0),
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

function DocumentsList() {
  const classes = useStyles();
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [openAddDoc, setOpenAddDoc] = React.useState(false);
  const [openRemoveDoc, setOpenRemoveDoc] = React.useState(false);
  const [selectDeleteDocument, setSelectDeleteDocument] = React.useState("");

  const {
    documents,
    handleNameChange,
    handleContentChange,
    submitNewDocument,
    getDocuments,
    deleteDocument,
    documentSelected,
  } = Submit();

  useEffect(() => {
    // Some initialization logic here
    getDocuments();
  }, []);

  const handleAddDocClick = () => {
    setOpenAddDoc(true);
  };

  const handleAddDocClose = () => {
    setOpenAddDoc(false);
  };

  const handleRemoveDocClick = (name) => {
    setSelectDeleteDocument(name);
    setOpenRemoveDoc(true);
  };

  const handleRemoveDocClose = () => {
    setOpenRemoveDoc(false);
  };

  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
        onClick={handleAddDocClick}
      >
        Add Document
      </Button>

      {documents.length !== 0 && (
        <Container class="max-width">
          <h2 class="text-center">Documents</h2>
          <hr></hr>
          <Container class="custom-row">
            {documents.map((object, i) => (
              <div key={i}>
                <Card className={classes.root}>
                  <CardContent
                    onClick={() => {
                      documentSelected(object);
                    }}
                  >
                    <Typography
                      className={classes.title}
                      color="textSecondary"
                      gutterBottom
                    >
                      Document #{i + 1}
                    </Typography>
                    <Typography class="card-name" variant="h5" component="h2">
                      {object.name}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => {
                        handleRemoveDocClick(object.name);
                      }}
                    >
                      Delete
                    </Button>
                  </CardActions>
                </Card>
              </div>
            ))}
          </Container>
        </Container>
      )}

      {documents.length === 0 && (
        <Container>
          <div class="complete-center">
            <h3 class="text-center">
              No documents have been created. Click on the above button to
              create one!
            </h3>
          </div>
        </Container>
      )}

      <Dialog
        fullScreen={fullScreen}
        open={openAddDoc}
        onClose={handleAddDocClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Add Document"}</DialogTitle>
        <DialogContent>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Document Name"
            name="name"
            autoFocus
            onChange={handleNameChange}
          />

          <TextField
            variant="outlined"
            margin="normal"
            multiline
            rows={8}
            rowsMax={8}
            required
            fullWidth
            id="content"
            label="Document Content"
            name="content"
            onChange={handleContentChange}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleAddDocClose} color="primary">
            Close
          </Button>
          <Button onClick={submitNewDocument} color="primary" autoFocus>
            Submit
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullScreen={fullScreen}
        open={openRemoveDoc}
        onClose={handleRemoveDocClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Remove Document"}
        </DialogTitle>
        <DialogContent>{selectDeleteDocument}</DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleRemoveDocClose} color="primary">
            Close
          </Button>
          <Button
            onClick={() => {
              handleRemoveDocClose();
              deleteDocument(selectDeleteDocument);
            }}
            color="primary"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default DocumentsList;
