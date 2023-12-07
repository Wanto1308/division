export default function validate(values) {
  const { name } = values;

  return {
    name: !name ? 'Harus diisi' : '',
  };
}
