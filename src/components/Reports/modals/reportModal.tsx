import { Box, Button, MenuItem, Modal, Select, TextField } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IVariant } from "../../../interfaces/IVariant";
import { IEvent, ISites, IWells } from "../../../interfaces/IWell";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IReportModalForm } from "../../../interfaces/IReportModalForm";
import { StyledModalBox } from "./reportModalStyle";
import { EVENT_TYPE, REPORT_TYPE } from "../../../constants/strings";
import { IReport } from "../../../interfaces/IReport";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import { report } from "process";

type reportModalProps = {
  open: boolean;
  project: IVariant;
  closeModal: (value: boolean) => void;
  saveToReports: (value: IReport) => void;
};

// eventCode (Бур и тд), dateReport, description,
// использовать тот же IReport???
export const ReportModal = (props: reportModalProps) => {
  const {
    data: sites = [],
    isLoading,
    isError: sitesError,
  } = useQuery<ISites[], Error>({
    queryKey: ["sites", props.project.projectId],
  });

  const {
    data: wells,
    isLoading: wellLoad,
    isError: wellsError,
  } = useQuery<IWells[], Error>({
    queryKey: ["wells", sites],
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IReportModalForm>({});

  if (isLoading || wellLoad) {
    return <div>Загрузка</div>;
  }

  if (sitesError || wellsError) {
    return <div>Произошла ошибка</div>;
  }

  const submit: SubmitHandler<IReportModalForm> = (data) => {
    const newReport: IReport = {
      reportJournalId: Math.random().toString(36).slice(2, 7),
      wellId: wells!.find((well) => well.wellCommonName === data.well)!.wellId,
      wellboreId: sites[0].projectId,
      eventId: "",
      dateReport: data.dateReport.toISOString(),
      reportNo: data.reportNumber.toString(),
      description: data.description,
      entityType: "",
      eventCode: data.eventCode,
      reportAlias: REPORT_TYPE.find((report) => report.type == data.reportType)!
        .alias,
    };
    props.saveToReports(newReport);
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
            control={control}
            defaultValue={REPORT_TYPE[0].type}
            name={"reportType"}
            render={({ field: { onChange, value } }) => (
              <Select onChange={onChange} value={value ?? REPORT_TYPE[0].type}>
                {REPORT_TYPE.map((report) => (
                  <MenuItem key={report.type} value={report.type}>
                    {report.type}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name={"well"}
            defaultValue={wells![0].wellCommonName}
            render={({ field: { onChange, value } }) => (
              <Select onChange={onChange} value={value}>
                {wells!.map((well) => (
                  <MenuItem key={well.wellId} value={well.wellCommonName}>
                    {well.wellCommonName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name={"siteName"}
            defaultValue={sites[0].siteName}
            render={({ field: { onChange, value } }) => (
              <Select onChange={onChange} value={value}>
                {sites!.map((site) => (
                  <MenuItem key={site.siteId} value={site.siteName}>
                    {site.siteName}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name={"eventCode"}
            defaultValue={EVENT_TYPE[0].eventCode}
            render={({ field: { onChange, value } }) => (
              <Select onChange={onChange} value={value}>
                {EVENT_TYPE!.map((event) => (
                  <MenuItem key={event.eventCode} value={event.eventCode}>
                    {event.eventCode}
                  </MenuItem>
                ))}
              </Select>
            )}
          />
          <Controller
            control={control}
            name={"reportNumber"}
            defaultValue={123}
            render={({ field: { value, onChange } }) => (
              <TextField
                id="filled-basic"
                type="number"
                label="№"
                onChange={onChange}
                value={value}
                variant="filled"
              />
            )}
          />
          <Controller
            control={control}
            name={"description"}
            render={({ field: { value, onChange } }) => (
              <TextField
                id="outlined-multiline-flexible"
                label="Описание"
                multiline
                maxRows={3}
                onChange={onChange}
                value={value}
                variant="filled"
              />
            )}
          />
          <Controller
            control={control}
            name={"dateReport"}
            defaultValue={dayjs()}
            render={({
              field: { onChange, value, ref },
              fieldState: { error },
            }) => (
              <LocalizationProvider
                dateAdapter={AdapterDayjs}
                adapterLocale="ru"
              >
                <DatePicker
                  label="Data"
                  format="DD/MM/YYYY"
                  inputRef={ref}
                  onChange={onChange}
                  value={value}
                />
              </LocalizationProvider>
            )}
          />
          <Button type="submit">Сохранить изменения</Button>
        </form>
      </Box>
    </Modal>
  );
};
