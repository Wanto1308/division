export default function validate(values) {
  const { username, password } = values;

  return {
    username: !username ? 'Harus diisi' : '',
    password: !password ? 'Harus diisi' : '',
  };
}
