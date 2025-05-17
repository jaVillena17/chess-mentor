import { useEffect } from 'react'
import '../static/css/login.css'



export const Login = () => {

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
    //Cuando se cargue el componente, añadimos los eventos onClick
    useEffect(() => {
        let spans = document.querySelectorAll("div.login-form span.click-span")
        spans.forEach(span => {
            span.addEventListener('click', changeForm)
        })

        //Esto se supone que se hace para evitar leaks de memoria
        return(() => {
            spans.forEach(span => {
                span.removeEventListener('click', changeForm)
            })
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
                <button>Iniciar Sesión</button>
                <hr />
                <p>¿Todavía no tienes usuario?<br/>Haz click <span className='click-span'>aquí</span></p>
            </div>

            <div className="login-form display-none">
                <p id='login-title'>Crear Nuevo Usuario</p>
                <label htmlFor="userRegister">Nombre de Usuario</label>
                <input type="text" name="user" id="userRegister" />
                <label htmlFor="passRegister">Contraseña</label>
                <input type="password" name="pass" id="passRegister" />
                <button>Iniciar Sesión</button>
                <hr />
                <p>¿Ya tienes un usuario?<br/>Haz click <span className='click-span'>aquí</span></p>
            </div>
        </main>
    )
}