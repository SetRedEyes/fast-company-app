export function geterateAuthError(message) {
    switch (message) {
        case "INVALID_PASSWORD":
        case "INVALID_DATA":
            return "Email или пароль введены некорректно"

        case "EMAIL_NOT_FOUND":
            return "Пользователь с таким Email не найден"

        case "EMAIL_EXISTS":
            return "Пользователь с таким Email уже существует"

        default:
            return "Слишком много попыток входа. Попробуйте позже"
    }
}
