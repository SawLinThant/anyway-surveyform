import FormPageOne from "../../modules/surveyform/page1"

const SurveyForm = () => {
    return(
        <div className="w-full h-full lg:w-[26vw] md:w-[75vw] flex flex-col bg-secondary gap-2">
            <div className=" text-primary flex flex-col gap-4 items-start py-8 px-6">
                <h2 className="text-3xl font-pacifico font-bold">Anyway</h2>
                <div className="flex flex-col gap-2 items-start">
                    <h2 className="text-xl font-semibold">Guest Registration Form</h2>
                    <div className="text-left text-sm">Enter the details to get the <span className="font-bold">Lucky Draw Number</span></div>
                </div>
            </div>
            <FormPageOne/>
        </div>
    )
}
export default SurveyForm