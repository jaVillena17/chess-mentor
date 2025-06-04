import { useEffect } from 'react'
import '../static/css/login.css'
import { UserSession } from '../logic/userGlobalState'



export const Login = () => {

    let setUser = UserSession((state) => state.setUser)

    function changeForm(){
        //Obtenemos los formularios
        let forms = document.querySelectorAll("div.login-form")

        //Invertimos los display none
        forms.forEach(form => {
            //Sacamos las clases que tienen
            let classes = form.classList
            if (classes.contains("display-none")){
                classes.remove("display-none")
            }else{
                classes.add("display-none")
            }

        })
    }

    const createUsuario = () => {
        //Obtenemos los datos del formulario
        let username = document.querySelector("#userRegister").value
        let email = document.querySelector("#emailRegister").value
        let pass = document.querySelector("#passRegister").value

        //Hacemos el post
        fetch('http://127.0.0.1:8000/new-user', {
            method : "POST",
            body: JSON.stringify({username : username, email: email, contraseña: pass}),
            headers: { "Content-Type": "application/json" }
        })
        .then(response => response.json())
        .then(data => {console.log(data)})
    }

    const loginUsuario = () => {
        //Obtenemos los datos del fomrulario, hay que pasarlo como bearer y form data
        let username = document.querySelector("#user").value
        let pass = document.querySelector("#pass").value

        let data = new URLSearchParams()
        data.append("username", username)
        data.append("password", pass)

        console.log(data)

        fetch('http://127.0.0.1:8000/login', {
            method : "POST",
            body: data,
            headers: { "Content-Type": "application/x-www-form-urlencoded" }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            localStorage.setItem("currentUser", data)
            setUser(data)
            //Reload como un castillo de gordo porque no m está funcionando zustland como yo quiero
            location.reload()
        })
    }

    //Cuando se cargue el componente, añadimos los eventos onClick
    useEffect(() => {
        let spans = document.querySelectorAll("div.login-form span.click-span")
        spans.forEach(span => {
            span.addEventListener('click', changeForm)
        })

        let registerButton = document.querySelector("#register-but")
        registerButton.addEventListener('click', createUsuario)


        let loginButton = document.querySelector("#login-but")
        loginButton.addEventListener('click', loginUsuario)


        //Esto se supone que se hace para evitar leaks de memoria
        return(() => {
            spans.forEach(span => {
                span.removeEventListener('click', changeForm)
            })

            registerButton.removeEventListener('click', createUsuario)

            loginButton.removeEventListener('click', loginUsuario)
        })
    }, [])


    return (
        <main className="login-page">
            <div className="login-form">
                <p id='login-title'>Inicio de Sesión</p>
                <label htmlFor="user">Nombre de Usuario</label>
                <input type="text" name="user" id="user" />
                <label htmlFor="user">Contraseña</label>
                <input type="password" name="pass" id="pass" />
                <button id="login-but" className='text-black'>Iniciar Sesión</button>
                <hr />
                <p>¿Todavía no tienes usuario?<br/>Haz click <span className='click-span'>aquí</span></p>
            </div>

            <div className="login-form display-none">
                <p id='login-title'>Crear Nuevo Usuario</p>
                <label htmlFor="userRegister">Nombre de Usuario</label>
                <input type="text" name="user" id="userRegister" />

                <label htmlFor="emailRegister">Correo Electrónico</label>
                <input type="email" name="email" id="emailRegister" />

                <label htmlFor="passRegister">Contraseña</label>
                <input type="password" name="pass" id="passRegister" />
                <button id='register-but' className='text-black'>Registrar Usuario</button>
                <hr />
                <p>¿Ya tienes un usuario?<br/>Haz click <span className='click-span'>aquí</span></p>
            </div>
        </main>
    )
}