/* eslint-disable react/prop-types */
const FormTextarea = ({
  rows = 4,
  label,
  placeholder,
  required = false,
  id,
  register,
  error,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={id}
        rows={rows}
        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300  "
        placeholder={placeholder}
        defaultValue={""}
        required={required}
        {...register}
      />
      {error?.message && (
        <p className={`text-red-300 ${label ? "ml-[95px]" : "ml-3"}`}>
          {error.message}
        </p>
      )}
    </div>
  );
};

export default FormTextarea;
