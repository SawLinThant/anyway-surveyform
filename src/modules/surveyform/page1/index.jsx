import Input from "../../common/components/custom-input";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_SURVEY_DATA } from "../../../graphql/mutation/survey";
import { VscLoading } from "react-icons/vsc";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { CREATE_LUCKYDRAW_NUMBER } from "../../../graphql/mutation/luckydraw";
import Dropdown from "../../common/components/dropdown";
import { GET_EVENT_THEME } from "../../../graphql/query/theme";

const FormPageOne = () => {
  const navigate = useNavigate();
  const [createLuckyDrawNumber,{loading:createNUmberLoading}] = useMutation(CREATE_LUCKYDRAW_NUMBER)
  const [luckyDrawNUmber,setLuckyDrawNumber] = useState(''); 
  const [themeOptions,setThemeOptions] = useState();
  const [theme,setTheme] = useState();
  const [userData,setUserData] = useState({
    name:'',
    phone:''
  })
  const [createData,{loading:createLoading}] = useMutation(CREATE_SURVEY_DATA,{
    onCompleted: async() => {
      navigate('/thankyou');
      // const requestBody = {
      //   name: userData.name,
      //   phone: userData.phone
      // }
      // const response = await axios.post(`${baseUrl}/api/luckydraw/sms`,requestBody)
      // if(response.data.message === 'SMS sent successfully'){
      //   setLuckyDrawNumber(response.data.luckyDrawNumber);
      //   createLuckyDrawNumber({
      //     variables:{
      //       phone: userData.phone,
      //       number: response.data.luckyDrawNumber.toString()
      //     }
      //   })
      // }
    }
  });
  const {data:themeData,loading:fetcTheme} = useQuery(GET_EVENT_THEME);
  useEffect(() => {
    if(themeData && themeData.event_themes){
      setThemeOptions(themeData.event_themes)
    }
  },[themeData])
  const { register, handleSubmit,formState:{errors} } = useForm();
  const myanmarPhoneNumberPattern = /^09\d{7,9}$/;
  const baseUrl = import.meta.env.VITE_APP_SMS_BASE_URL;
  const handleCreate = handleSubmit(async(credentials) => {
    try{
      setUserData({
        name: credentials.name,
        phone: credentials.phone
      });
     await createData({
        variables:{
          name:credentials.name,
          phone:credentials.phone,
          theme: theme,
          aboutus: credentials.aboutus
        }
      })
    }catch(e){
      console.log("error creating data")
    }
  })
  console.log(themeOptions)
  return (
    <div className="w-full h-full bg-primary rounded-t-[2.25rem] px-6 pt-4 pb-8">
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
        <Dropdown label="test label" options={themeOptions} setOption={setTheme}/>
        <Input
          type="text"
          label="How did you hear about us?"
          name="aboutus"
          placeholder="Please enter your answer"
          optional={true}
          register={register}
        />
        <button
        disabled={createLoading}
        className={clsx("rounded-md px-2 py-3 h-[3rem]  w-3/5 mt-3 font-bold text-primary",{
          "bg-transparent":createLoading,
          "bg-secondary":!createLoading,
        })}>
         {createLoading?(<div className="w-full h-full border-none flex items-center justify-center"><VscLoading color="black" className="animate-spin"/></div>):"Register"} 
        </button>
      </form>
    </div>
  );
};
export default FormPageOne;
