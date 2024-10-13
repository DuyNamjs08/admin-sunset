/* eslint-disable react/prop-types */
const FormCheckbox = ({ label, register }) => {
  return (
    <div className="flex items-center mb-4">
      <input
        {...register}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded "
      />
      <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
        {label}
      </label>
    </div>
  );
};

export default FormCheckbox;
