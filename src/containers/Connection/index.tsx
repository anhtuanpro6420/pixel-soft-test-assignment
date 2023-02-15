/* eslint-disable @typescript-eslint/no-misused-promises */
import AutoComplete, { IOptions } from "@Components/AutoComplete";
import MuiButton from "@Components/MuiButton";
import { yupResolver } from "@hookform/resolvers/yup";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import { getDistance } from "geolib";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import connectionService from "src/services/connection.service";
import locationService from "src/services/location.service";
import { IConnection, ISection } from "src/shared/types/connection.type";
import { v4 as uuidv4 } from "uuid";
import * as Yup from "yup";
import styles from "./Connection.module.scss";

const calculateDistance = ({
  from,
  to,
}: {
  from: { location: { coordinate: { x: number; y: number } } };
  to: { location: { coordinate: { x: number; y: number } } };
}) => {
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
  return "";
};

function ConnectionContainer() {
  const [startLocations, setStartLocations] = useState<Array<{ name: string; id: string }>>([]);
  const [endLocations, setEndLocations] = useState<Array<{ name: string; id: string }>>([]);
  const [startLocation, setStartLocation] = useState<IOptions>({
    label: "",
    value: "",
  });
  const [endLocation, setEndLocation] = useState<IOptions>({
    label: "",
    value: "",
  });
  const [connections, setConnections] = useState<Array<IConnection>>([]);

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

  const onStartLocationChange = async (event: React.SyntheticEvent) => {
    const {
      data: { stations },
    }: { data: { stations: Array<{ name: string; id: string }> } } =
      await locationService.fetchLocations(
        (event as React.ChangeEvent<HTMLInputElement>).target.value
      );
    setStartLocations(stations);
  };

  const onEndLocationChange = async (event: React.SyntheticEvent) => {
    const {
      data: { stations },
    }: { data: { stations: Array<{ name: string; id: string }> } } =
      await locationService.fetchLocations(
        (event as React.ChangeEvent<HTMLInputElement>).target.value
      );
    setEndLocations(stations);
  };

  const onSubmit = async (values: any & { startLocation: IOptions; endLocation: IOptions }) => {
    const {
      data: { connections: connectionsFetched = [] },
    }: { data: { connections: Array<IConnection> } } = await connectionService.fetchConnections({
      from: (values as { startLocation: IOptions; endLocation: IOptions }).startLocation.label,
      to: (values as { startLocation: IOptions; endLocation: IOptions }).endLocation.label,
    });
    setConnections(connectionsFetched);
  };

  const renderConnections = () => {
    return connections.map((connection: IConnection) => {
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
                <div className={styles.arrow}>--------------&gt;</div>
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
            {connection.sections.map((section: ISection) => {
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
    <div className={styles.wrapper}>
      <AutoComplete
        name="startLocation"
        control={control}
        label="Start location"
        size="small"
        placeholder="Start location"
        options={startLocations.map((strtLocation: { name: string; id: string }) => {
          return {
            label: strtLocation.name,
            value: strtLocation.id,
          };
        })}
        onChangeTextField={onStartLocationChange}
        onSelectOptions={(option: IOptions | IOptions[]) => {
          setStartLocation(option as IOptions);
        }}
      />
      <AutoComplete
        name="endLocation"
        control={control}
        label="End location"
        size="small"
        placeholder="End location"
        options={endLocations.map((enLocation: { name: string; id: string }) => {
          return {
            label: enLocation.name,
            value: enLocation.id,
          };
        })}
        onChangeTextField={onEndLocationChange}
        onSelectOptions={(option: IOptions | IOptions[]) => {
          setEndLocation(option as IOptions);
        }}
      />
      <MuiButton
        typebutton="primary"
        variant="contained"
        className="my-5"
        fullWidth
        size="large"
        onClick={
          errors && Object.keys(errors).length > 0
            ? undefined
            : (handleSubmit(onSubmit) as React.MouseEventHandler<HTMLButtonElement> | undefined)
        }
      >
        Find
      </MuiButton>
      {renderConnections()}
    </div>
  );
}

export default ConnectionContainer;
