import AutoComplete, { IOptions } from "@Components/AutoComplete";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useState } from "react";
import MuiButton from "@Components/MuiButton";

const ConnectionContainer = () => {
  const [startLocation, setStartLocation] = useState<any>(null);
  const [endLocation, setEndLocation] = useState<any>(null);

  const getValidationRules = () => {
    return {
      startLocation: Yup.string().required("Please input start location"),
      endLocation: Yup.string().required("Please input end location"),
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

  const locations: any = [];

  const onChangeTextField = async (event: React.ChangeEvent<HTMLInputElement>) => {
    // const { filterCategories } = querySearch;
    // if (event?.target?.value && event?.target?.value.trim() && filterCategories.length < 4) {
    //   dispatch(
    //     kolSliceActions.setQuerySearch({
    //       filterCategories,
    //       textSearch: event?.target?.value.trim(),
    //     })
    //   );
    // }
    // call api
  };

  const onSubmit = async (values: any) => {
    // call api
  };

  return (
    <>
      <AutoComplete
        name="startLocation"
        control={control}
        label="Start location"
        size="small"
        placeholder="Start location"
        options={locations.map((e: any) => {
          return {
            label: e.name,
            value: e._id,
          };
        })}
        onChangeTextField={onChangeTextField}
        onSelectOptions={(value: IOptions) => {
          setStartLocation(value.value);
        }}
      />
      <AutoComplete
        name="endLocation"
        control={control}
        label="End location"
        size="small"
        placeholder="End location"
        options={locations.map((e: any) => {
          return {
            label: e.name,
            value: e._id,
          };
        })}
        onChangeTextField={onChangeTextField}
        onSelectOptions={(value: IOptions) => {
          setEndLocation(value.value);
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
