import { MenuItem, Modal, Select, TextField, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { IVariant } from "../../../interfaces/IVariant";
import { ISites, IWells } from "../../../interfaces/IWell";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { IReportModalForm } from "../../../interfaces/IReportModalForm";
import {
  StyledModalBox,
  StyledModalButton,
  StyledModalDiv,
  StyledModalEndDiv,
} from "./reportModalStyle";
import { EVENT_TYPE, REPORT_TYPE } from "../../../constants/strings";
import { IReport } from "../../../interfaces/IReport";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import "dayjs/locale/ru";
import dayjs from "dayjs";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

type reportModalProps = {
  open: boolean;
  project: IVariant;
  closeModal: (value: boolean) => void;
  saveToReports: (value: IReport) => void;
};

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

  const { control, handleSubmit } = useForm<IReportModalForm>({});

  if (isLoading || wellLoad) {
    props.closeModal(false);
    return <div>Загрузка</div>;
  }

  if (sitesError || wellsError) {
    props.closeModal(false);
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
      reportAlias: REPORT_TYPE.find(
        (report) => report.type === data.reportType
      )!.alias,
    };
    props.saveToReports(newReport);
  };

  return (
    <Modal open={props.open}>
      <StyledModalBox>
        <StyledModalDiv>
          <StyledModalButton onClick={() => props.closeModal(false)}>
            <CloseRoundedIcon />
          </StyledModalButton>
        </StyledModalDiv>
        <form onSubmit={handleSubmit(submit)}>
          <StyledModalDiv>
            <Typography>Тип</Typography>
            <Controller
              control={control}
              defaultValue={REPORT_TYPE[0].type}
              name={"reportType"}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value ?? REPORT_TYPE[0].type}
                  sx={{ minWidth: 190 }}
                >
                  {REPORT_TYPE.map((report) => (
                    <MenuItem key={report.type} value={report.type}>
                      {report.type}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </StyledModalDiv>
          <StyledModalDiv>
            <Typography>Скважина</Typography>
            <Controller
              control={control}
              name={"well"}
              defaultValue={wells![0].wellCommonName}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  autoWidth={true}
                  sx={{ minWidth: 190 }}
                >
                  {wells!.map((well) => (
                    <MenuItem key={well.wellId} value={well.wellCommonName}>
                      {well.wellCommonName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </StyledModalDiv>
          <StyledModalDiv>
            <Typography>Куст</Typography>
            <Controller
              control={control}
              name={"siteName"}
              defaultValue={sites[0].siteName}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  sx={{ minWidth: 190 }}
                >
                  {sites!.map((site) => (
                    <MenuItem key={site.siteId} value={site.siteName}>
                      {site.siteName}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </StyledModalDiv>
          <StyledModalDiv>
            <Typography>Мероприятие</Typography>
            <Controller
              control={control}
              name={"eventCode"}
              defaultValue={EVENT_TYPE[0].eventCode}
              render={({ field: { onChange, value } }) => (
                <Select
                  onChange={onChange}
                  value={value}
                  sx={{ minWidth: 190 }}
                >
                  {EVENT_TYPE!.map((event) => (
                    <MenuItem key={event.eventCode} value={event.eventCode}>
                      {event.eventCode}
                    </MenuItem>
                  ))}
                </Select>
              )}
            />
          </StyledModalDiv>
          <StyledModalDiv>
            <Typography>Номер отчёта</Typography>
            <Controller
              control={control}
              name={"reportNumber"}
              defaultValue={123}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id="filled-basic"
                  type="number"
                  style={{ width: "50%" }}
                  label="№"
                  onChange={onChange}
                  value={value}
                  variant="filled"
                />
              )}
            />
          </StyledModalDiv>
          <StyledModalDiv>
            <Typography>Описание</Typography>
            <Controller
              control={control}
              name={"description"}
              render={({ field: { value, onChange } }) => (
                <TextField
                  id="outlined-multiline-flexible"
                  multiline
                  maxRows={3}
                  style={{ width: "50%" }}
                  onChange={onChange}
                  value={value}
                  variant="filled"
                />
              )}
            />
          </StyledModalDiv>
          <StyledModalDiv>
            <Typography>Дата</Typography>
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
                    format="YYYY-MM-DD"
                    inputRef={ref}
                    onChange={onChange}
                    value={value}
                  />
                </LocalizationProvider>
              )}
            />
          </StyledModalDiv>
          <StyledModalEndDiv>
            <StyledModalButton variant="contained" type="submit">
              Сохранить изменения
            </StyledModalButton>
          </StyledModalEndDiv>
        </form>
      </StyledModalBox>
    </Modal>
  );
};
