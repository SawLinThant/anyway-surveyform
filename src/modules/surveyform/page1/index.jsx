import Input from "../../common/components/custom-input";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SURVEY_DATA, SEND_SMS } from "../../../graphql/mutation/survey";
import { VscLoading } from "react-icons/vsc";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CREATE_LUCKYDRAW_NUMBER } from "../../../graphql/mutation/luckydraw";
import Dropdown from "../../common/components/dropdown";
import { GET_EVENT_THEME } from "../../../graphql/query/theme";
import toast, { Toaster } from "react-hot-toast";

const FormPageOne = () => {
  const navigate = useNavigate();

  const [createLuckyDrawNumber, { loading: createNumberLoading }] = useMutation(CREATE_LUCKYDRAW_NUMBER);
  const [sendSMS, { loading: sendSMSLoading }] = useMutation(SEND_SMS);
  const [createData, { loading: createLoading }] = useMutation(CREATE_SURVEY_DATA);

  const [themeOptions, setThemeOptions] = useState([]);
  const [theme, setTheme] = useState();
  const [userData, setUserData] = useState({ name: '', phone: '' });

  const { data: themeData } = useQuery(GET_EVENT_THEME);

  useEffect(() => {
    if (themeData?.event_themes) {
      setThemeOptions(themeData.event_themes);
    }
  }, [themeData]);

  const { register, handleSubmit, formState: { errors } } = useForm();
  const myanmarPhoneNumberPattern = /^09\d{7,9}$/;

  const handleCreate = handleSubmit(async (credentials) => {
    try {
      setUserData({
        name: credentials.name,
        phone: credentials.phone,
      });

      await createData({
        variables: {
          name: credentials.name,
          phone: credentials.phone,
          theme,
          aboutus: credentials.aboutus,
        },
      });

      const smsResponse = await sendSMS({
        variables: {
          name: credentials.name,
          phone: credentials.phone,
        },
      });

      const luckyDrawNumber = smsResponse?.data?.sendSMS?.luckyDrawNumber;
      if (!luckyDrawNumber) {
        toast.error("cant get lucky draw number")
        throw new Error('Lucky Draw Number is missing in the SMS response.');
      }

      await createLuckyDrawNumber({
        variables: {
          phone: credentials.phone,
          number: luckyDrawNumber.toString(),
        },
      });

      navigate('/thankyou');
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error(error.message || 'An error occurred during registration.');
    }
  });
  return (
    <div className="w-full h-full bg-primary rounded-t-[2.25rem] px-6 pt-4 pb-8">
      <Toaster/>
      <form
      onSubmit={handleCreate}
        action=""
        className="w-full h-full flex flex-col items-center gap-6 pt-9 overflow-y-auto"
      >
        <Input
          type="text"
          label="Name"
          name="name"
          placeholder={errors.name?"Invalid":"Please enter your name"}
          {...register("name", { required: "Name is required" })}
        />
        <Input
          type="tel"
          label="Phone Number"
          name="phone"
          placeholder={errors.phone?"Invalid Phone Number":"Please enter your phone number"}
          {...register("phone", { 
            required: "Phone number is required",
            pattern:{
              value: myanmarPhoneNumberPattern,
              message:"Invalid phone number"
            }
           })}
        />
        <Dropdown label="Theme" options={themeOptions} setOption={setTheme}/>
        <Input
          type="text"
          label="How did you hear about us?"
          name="aboutus"
          placeholder="Please enter your answer"
          optional={true}
          {...register("aboutus", { required: "Name is required" })}
        />
        <button
        disabled={(createLoading || createNumberLoading || sendSMSLoading)}
        className={clsx("rounded-md px-2 py-3 h-[3rem]  w-3/5 mt-3 font-bold text-primary",{
          "bg-gray-200":(createLoading || createNumberLoading || sendSMSLoading),
          "bg-secondary":!(createLoading || createNumberLoading || sendSMSLoading),
        })}>
         {(createLoading || createNumberLoading || sendSMSLoading)?(<div className="w-full h-full border-none flex items-center justify-center"><VscLoading color="black" className="animate-spin"/></div>):"Register"} 
        </button>
      </form>
    </div>
  );
};
export default FormPageOne;
