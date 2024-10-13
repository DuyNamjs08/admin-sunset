/* eslint-disable react/prop-types */
const FormInput = ({
  label,
  type = "text",
  placeholder,
  required = false,
  id,
  register,
  error,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        {...register}
        type={type}
        id={id}
        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
        placeholder={placeholder}
        required={required}
      />
      {error?.message && (
        <p className={`text-red-300 ${label ? "ml-[95px]" : "ml-3"}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
