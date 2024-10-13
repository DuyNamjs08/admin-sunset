export function createFormData(data) {
  const formData = new FormData();
  for (const [key, value] of Object.entries(data)) {
    formData.append(key, value);
    if (key === "image[]") {
      for (let i = 0; i < value.length; i++) {
        formData.append("image[]", value[i]);
      }
    }
  }
  return formData;
}
