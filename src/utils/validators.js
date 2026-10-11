const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Retorna um objeto { email, password } com as mensagens de erro (vazio se tudo ok).
export function validateLogin(email, password) {
  const errors = {};

  if (!email.trim()) {
    errors.email = 'Informe o e-mail.';
  } else if (!EMAIL_REGEX.test(email.trim())) {
    errors.email = 'Informe um e-mail válido.';
  }

  if (!password) {
    errors.password = 'Informe a senha.';
  } else if (password.length < 6) {
    errors.password = 'A senha deve ter pelo menos 6 caracteres.';
  }

  return errors;
}
