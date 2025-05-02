import '../static/css/login.css'

export const Login = () => {
    return (
        <div className="login-form">
            <p>Inicio de Sesión</p>
            <label htmlFor="user">Nombre de Usuario</label>
            <input type="text" name="user" id="user" />
            <label htmlFor="user">Contraseña</label>
            <input type="password" name="pass" id="pass" />
        </div>
    )
}