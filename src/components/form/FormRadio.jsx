/* eslint-disable react/prop-types */
const FormRadio = ({ register, data = [], label }) => {
  return (
    <>
      <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
        {label}
      </div>
      <div className="mb-4 flex items-center gap-4">
        {data.map((item) => (
          <div key={item.value} className="flex items-center mb-4">
            <input
              value={item.value}
              id={item.value}
              type="radio"
              name="default-radio"
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 "
              {...register}
            />
            <label
              htmlFor={item.value}
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {item.label}
            </label>
          </div>
        ))}
      </div>
    </>
  );
};

export default FormRadio;
