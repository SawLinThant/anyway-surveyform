import { forwardRef } from "react";

const Input = forwardRef(({
    type,
    name,
    label,
    optional = false,
    placeholder,
    ...props
},ref) => {
    return(
        <div className="w-full flex flex-col gap-2">
            <div className="flex flex-row items-start gap-1 justify-start">
            <label className="text-left text-secondary" htmlFor={name}>{label}</label>
             <label className="text-sm text-secondary pt-[2px]" htmlFor={name}>{optional?"(optional)":"*"}</label>
            </div>
           
            <input 
            placeholder={placeholder}
            className="border border-third p-2 rounded-lg focus:ring-0"
            type={type}
            name={name} 
            ref={ref}
            {...props}
            />
        </div>
    )
})
export default Input;