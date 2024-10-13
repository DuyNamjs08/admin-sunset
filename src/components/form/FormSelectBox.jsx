// eslint-disable-next-line react/prop-types
const FormSelectBox = ({ label, id, register, data = [] }) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        {...register}
        id={id}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        {data.map((item, index) => (
          <option key={index} value={item.value}>
            {item.label}{" "}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormSelectBox;
