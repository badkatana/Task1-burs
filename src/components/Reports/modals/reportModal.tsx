import { Box, Button, MenuItem, Modal, Select } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IVariant } from "../../../interfaces/IVariant";
import { ISites, IWells } from "../../../interfaces/IWell";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IReportModalForm } from "../../../interfaces/IReportModalForm";
import { StyledModalBox } from "./reportModalStyle";
import { REPORT_TYPE } from "../../../constants/strings";

type reportModalProps = {
  open: boolean;
  project: IVariant;
  closeModal: (value: boolean) => {};
};

export const ReportModal = (props: reportModalProps) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReportModalForm>();

  const { data: sites = [], isLoading } = useQuery<ISites[], Error>({
    queryKey: ["sites", props.project.projectId],
  });

  const { data: wells, isLoading: wellLoad } = useQuery<IWells[], Error>({
    queryKey: ["wells", sites],
  });

  if (isLoading || wellLoad) {
    return <div>Загрузка</div>;
  }

  const submit: SubmitHandler<IReportModalForm> = (data) => {
    console.log(data);
  };

  return (
    <Modal
      open={props.open}
      sx={StyledModalBox}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Button onClick={() => props.closeModal(false)}>Close modal</Button>
        <form onSubmit={handleSubmit(submit)}>
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select onChange={onChange} value={value ?? REPORT_TYPE[0].type}>
                {REPORT_TYPE.map((report) => (
                  <MenuItem key={report.type} value={report.type}>
                    {report.type}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
            name={"reportType"}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select
                onChange={onChange}
                value={value ?? wells![0].wellCommonName}
              >
                {wells!.map((well) => (
                  <MenuItem key={well.wellId} value={well.wellCommonName}>
                    {well.wellCommonName}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
            name={"well"}
          />
          <Controller
            render={({ field: { onChange, value } }) => (
              <Select onChange={onChange} value={value ?? sites[0]!.siteName}>
                {sites!.map((site) => (
                  <MenuItem key={site.siteId} value={site.siteName}>
                    {site.siteName}
                  </MenuItem>
                ))}
              </Select>
            )}
            control={control}
            name={"siteName"}
          />
          <Button onClick={() => submit}>Сохранить изменения</Button>
        </form>
      </Box>
    </Modal>
  );
};
