import clsx from "clsx";
import { useState } from "react";

const Dropdown = ({label,options,setOption}) => {
    const [dropdownOpen,setDropdownOpen] = useState(false);
    const [filterOption,setFilterOptions] = useState();
    const TransformData = (options) => {
        return options.map((option) => ({
            label:option.name,
            value:option.id
        }))
    }
    const dropdownOptions = TransformData(options?options:[]);
    return(
        <div className="w-full flex flex-col justify-start gap-2 items-start">
            <div>
                <label className="text-secondary" htmlFor="">{label}</label>
            </div>
            <div className="w-full flex flex-col items-center justify-center h-12  rounded-md">
                <div
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="w-full h-full hover:cursor-pointer text-left border border-gray-300 rounded-md px-2 pt-2"><label htmlFor="">{filterOption?filterOption:"Select an option"}</label></div>
                <div className="relative z-10 w-full mt-1">
                    <div className={clsx("absolute w-full top-0 max-h-[11rem]  flex flex-col gap-1 bg-white rounded-md",{
                        "h-0 overflow-hidden border-none":!dropdownOpen,
                        "h-[9rem] overflow-auto p-1 border border-black":dropdownOpen
                    })}>
                        {dropdownOptions.map((option,index) => (
                            <div
                            key={index}
                            onClick={() => {
                                setFilterOptions(option.label);
                                setOption(option.label)
                                setDropdownOpen(!dropdownOpen)
                            }}
                            className="w-full p-2 rounded bg-white border hover:bg-secondary hover:text-white hover:cursor-pointer">{option.label}</div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dropdown;