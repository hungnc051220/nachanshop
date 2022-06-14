import React from "react";
import { ExclamationCircleIcon } from "@heroicons/react/solid";

const CustomInput = React.forwardRef(
  ({ id, label, errors, ...inputProps }, ref) => (
    <>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          ref={ref}
          {...inputProps}
          type="text"
          id={id}
          className={`${
            errors
              ? "border-red-300 placeholder-red-300 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 focus:border-indigo-500 focus:ring-indigo-500"
          } mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:outline-none sm:text-sm`}
        />
        {errors && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>
      {errors && <p className="mt-2 text-sm text-red-600">{errors.message}</p>}
    </>
  )
);

export default CustomInput;
