import {
    Modal,
    Box,
    Typography,
    IconButton,
    Paper,
  } from "@mui/material";
  import CloseIcon from "@mui/icons-material/Close";
  import ContributionForm from "./ContributionForm";
  
  const modalStyle = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    p: 3,
    borderRadius: 2,
    boxShadow: 24,
    backgroundColor: "white",
  };
  
  export default function ContributionModal({ open, handleClose, goalId, goalCreatedAt, onSubmit, isLoading }) {
    return (
      <Modal open={open} onClose={handleClose}>
        <Box sx={modalStyle}>
          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h6">Registrar aporte</Typography>
            <IconButton onClick={handleClose}>
              <CloseIcon />
            </IconButton>
          </Box>
          <ContributionForm
            goalId={goalId}
            goalCreatedAt={goalCreatedAt}
            onSubmit={(data) => {
              onSubmit(data);
              handleClose();
            }}
            isLoading={isLoading}
          />
        </Box>
      </Modal>
    );
  }
  