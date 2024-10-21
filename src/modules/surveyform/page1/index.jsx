import Input from "../../common/components/custom-input";
import { useMutation } from "@apollo/client";
import { CREATE_SURVEY_DATA } from "../../../graphql/mutation/survey";
import { VscLoading } from "react-icons/vsc";
import clsx from "clsx";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const FormPageOne = () => {
  const navigate = useNavigate();
  const [createData,{loading:createLoading}] = useMutation(CREATE_SURVEY_DATA,{
    onCompleted:() => {
      navigate('/thankyou')
    }
  });
  const { register, handleSubmit,formState:{errors} } = useForm();
  const myanmarPhoneNumberPattern = /^09\d{7,9}$/;
  const handleCreate = handleSubmit(async(credentials) => {
    try{
      console.log("click")
     await createData({
        variables:{
          name:credentials.name,
          phone:credentials.phone,
          theme: credentials.theme,
          aboutus: credentials.aboutus
        }
      })
    }catch(e){
      console.log("error creating data")
    }
  })
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
        <Input
          type="text"
          label="What is your favourite event theme?"
          name="theme"
          placeholder="Please enter your answer"
          optional={true}
          register={register}
        />
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
