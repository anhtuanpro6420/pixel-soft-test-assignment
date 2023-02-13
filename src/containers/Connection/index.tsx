import AutoComplete, { IOptions } from "@Components/AutoComplete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import MuiButton from "@Components/MuiButton";
import { fetchLocations } from "src/services/location.service";

const ConnectionContainer = () => {
  const [startLocations, setStartLocations] = useState([]);
  const [endLocations, setEndLocations] = useState([]);
  const [startLocation, setStartLocation] = useState<IOptions | null>(null);
  const [endLocation, setEndLocation] = useState<IOptions | null>(null);

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

  const validationSchema = Yup.object().shape(getValidationRules());
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(validationSchema),
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

  const onSubmit = async (values: { startLocation: IOptions; endLocation: IOptions }) => {
    console.log(values);
    console.log(startLocation);
    console.log(endLocation);
  };

  return (
    <>
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
    </>
  );
};

export default ConnectionContainer;
