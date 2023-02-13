import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import AutoComplete, { IOptions } from "@Components/AutoComplete";
import MuiButton from "@Components/MuiButton";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { getDistance } from "geolib";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { fetchConnections } from "src/services/connection.service";
import { fetchLocations } from "src/services/location.service";
import styles from "./Connection.module.scss";

const ConnectionContainer = () => {
  const [startLocations, setStartLocations] = useState([]);
  const [endLocations, setEndLocations] = useState([]);
  const [startLocation, setStartLocation] = useState<IOptions | null>(null);
  const [endLocation, setEndLocation] = useState<IOptions | null>(null);
  const [connections, setConnections] = useState([]);

  const getValidationRules = () => {
    return {
      startLocation: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
      endLocation: Yup.object().shape({
        label: Yup.string().required(),
        value: Yup.string().required(),
      }),
    };
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(Yup.object().shape(getValidationRules())),
  });

  const onStartLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      data: { stations },
    } = await fetchLocations(event.target.value);
    setStartLocations(stations);
  };

  const onEndLocationChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const {
      data: { stations },
    } = await fetchLocations(event.target.value);
    setEndLocations(stations);
  };

  const onSubmit = async (values: any & { startLocation: IOptions; endLocation: IOptions }) => {
    const {
      data: { connections = [] },
    } = await fetchConnections({ from: startLocation?.label!, to: endLocation?.label! });
    setConnections(connections);
  };

  const calculateDistance = ({ from, to }: { from: any; to: any }) => {
    const distance = getDistance(
      { latitude: from.location.coordinate.x, longitude: from.location.coordinate.y },
      { latitude: to.location.coordinate.x, longitude: to.location.coordinate.y }
    );
    return distance;
  };

  const formatDate = (date: string) => {
    if (date) {
      return new Date(date).toLocaleString();
    }
  };

  const renderConnections = () => {
    return connections.map((connection: any) => {
      return (
        <Accordion key={uuidv4()}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <div className={styles["connection-item-container"]}>
              <div className={styles["connection-item"]}>
                <div>
                  <div>{connection.from.location.name}</div>
                  <div>{formatDate(connection.from.departure)}</div>
                </div>
                <div className={styles["arrow"]}>--------------&gt;</div>
                <div>
                  <div>{connection.to.location.name}</div>
                  <div>{formatDate(connection.to.arrival)}</div>
                </div>
              </div>
              <div className={styles["connection-item"]}>
                Journey length: {calculateDistance({ from: connection.from, to: connection.to })}{" "}
                meters
              </div>
              <div className={styles["connection-item"]}>
                Number of stopovers: {connection.sections.length}
              </div>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            {connection.sections.map((section: any) => {
              return (
                <div className={styles["section-container"]} key={uuidv4()}>
                  <Typography>
                    <div>{section.departure.location.name}</div>
                    <div>{formatDate(section.departure.departure)}</div>
                  </Typography>
                  <span>--------------&gt;</span>
                  <Typography key={uuidv4()}>
                    <div>{section.arrival.location.name}</div>
                    <div>{formatDate(section.arrival.arrival)}</div>
                  </Typography>
                </div>
              );
            })}
          </AccordionDetails>
        </Accordion>
      );
    });
  };

  return (
    <div className={styles["wrapper"]}>
      <AutoComplete
        name="startLocation"
        control={control}
        label="Start location"
        size="small"
        placeholder="Start location"
        options={startLocations.map((e: any) => {
          return {
            label: e.name,
            value: e.id,
          };
        })}
        onChangeTextField={onStartLocationChange}
        onSelectOptions={(option: IOptions) => {
          setStartLocation(option);
        }}
      />
      <AutoComplete
        name="endLocation"
        control={control}
        label="End location"
        size="small"
        placeholder="End location"
        options={endLocations.map((e: any) => {
          return {
            label: e.name,
            value: e.id,
          };
        })}
        onChangeTextField={onEndLocationChange}
        onSelectOptions={(option: IOptions) => {
          setEndLocation(option);
        }}
      />
      <MuiButton
        typebutton="primary"
        variant="contained"
        className="my-5"
        fullWidth
        size="large"
        onClick={errors && Object.keys(errors).length ? null : (handleSubmit(onSubmit) as any)}
      >
        Find
      </MuiButton>
      {renderConnections()}
    </div>
  );
};

export default ConnectionContainer;
