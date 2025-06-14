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

        let errorRegister = document.getElementById("error-register")

        let passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

        if (!username){
            errorRegister.innerHTML = "El campo username no puede quedar vacío"
        }else if(!email){
            errorRegister.innerHTML = "El campo email no puede quedar vacío"
        }else if(!pass){
            errorRegister.innerHTML = "El campo contraseña no puede quedar vacío"
        }else if(!passRegex.test(pass)){
            errorRegister.innerHTML = "La contraseñe debe contener 1 mayúscula, 1 minúscula, 1 número y debe tener un tamaño de 8 caractéres"
        }else if(!emailRegex.test(email)){
            errorRegister.innerHTML = "Formato de email no válido"
        }else{
            //Hacemos el post
            fetch('http://127.0.0.1:8000/new-user', {
                method : "POST",
                body: JSON.stringify({username : username, email: email, contraseña: pass}),
                headers: { "Content-Type": "application/json" }
            })
            .then(response => {
                if (response.status == 200){
                    errorRegister.innerHTML = "El usuario se ha creado con éxito"
                    return null
                }else{
                    
                    return response.json()
                }
            })
            .then(data => {
                if (data != null) errorRegister.innerHTML = data.detail
                })
        }

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
        .then(response => {
            if (response.status == 200){
                return response.json()
            }else{
                return false
            }
        })
        .then(json => {
            if (json){
                localStorage.setItem("currentUser", JSON.stringify(json))
                setUser(JSON.stringify(json))
                    
                // Reload como un castillo de gordo porque no m está funcionando zustland como yo quiero
                location.reload()
            }else{
                let errorHtml = document.getElementById("error-login")
                errorHtml.innerHTML = "La contraseña o el usuario son incorrectos"
            }  
        })
        .catch((error) => {
            let errorHtml = document.getElementById("error-login")
            errorHtml.innerHTML = "Ooops, something whent wrong: " + error
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
                <input type="text" name="user" id="user" required />
                <label htmlFor="user">Contraseña</label>
                <input type="password" name="pass" id="pass" required />
                <button id="login-but" className='text-black bg-[#8b7925]' >Iniciar Sesión</button>
                <p id="error-login" className='text-xs mt-2 text-red-400'></p>
                <hr />
                <p>¿Todavía no tienes usuario?<br/>Haz click <span className='click-span text-[#8b7925]'>aquí</span></p>
            </div>

            <div className="login-form display-none">
                <p id='login-title'>Crear Nuevo Usuario</p>
                <label htmlFor="userRegister">Nombre de Usuario</label>
                <input type="text" name="user" id="userRegister" required/>

                <label htmlFor="emailRegister">Correo Electrónico</label>
                <input type="email" name="email" id="emailRegister" required/>

                <label htmlFor="passRegister">Contraseña</label>
                <input type="password" name="pass" id="passRegister" required/>
                <button id='register-but' className='text-black bg-[#8b7925]' >Registrar Usuario</button>
                <p id="error-register" className='text-xs mt-2 text-red-400'></p>
                <hr />
                <p>¿Ya tienes un usuario?<br/>Haz click <span className='click-span text-[#8b7925]'>aquí</span></p>
            </div>
        </main>
    )
}