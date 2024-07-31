import { Box, Button, Modal, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IVariant } from "../../../interfaces/IVariant";
import { useEffect } from "react";
import { ISites } from "../../../interfaces/IWell";

type reportModalProps = {
  open: boolean;
  project: IVariant;
  closeModal?: (value: boolean) => {};
};

/// я всё это перенесу, пока здесь всё в процессе подготовки
const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export const ReportModal = (props: reportModalProps) => {
  const { data: projects } = useQuery<ISites[], Error>({
    queryKey: ["sites", props.project.projectId],
  });

  useEffect(() => {
    console.log(typeof projects);
    console.log(projects![0]);
  }, [projects]);

  return (
    <Modal
      open={props.open}
      sx={style}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {projects![0].projectId}
        </Typography>
      </Box>
    </Modal>
  );
};
