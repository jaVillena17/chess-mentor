import { Question } from "./question"

const preguntas = [
    ["¿Cuál es el objetivo de Chess-Mentor?", "El objetivo principal es ofrecer una forma de aprendizaje práctica y guiada mediante un tutor que puede enseñarte las 24 horas del día"],
    ["¿Qué modelo de IA usamos?", "Actualmente usamos el modelo Llama3.2-3B, un modelo ligero capaz de ser ejecutado en edge devices"],
    ["¿De verdad estoy jugando contra una IA?", "¡SI!, todos los movimientos son calculados y decididos por el LLM en función de la situación actual del tablero y los movimientos hasta el momento"],
    ["¿Cómo puedo preguntar dudas a la IA?", "En cualquier momento de la partida puedes introducir tu duda o pregunta en el chat, la cual será respondida de forma personalizada por la IA de forma rápida y sencilla"],
    ["¿La IA se equivoca?", "Si, actualmente se encuentra en una fase inicial y es propensa a cometer errores. Debido a ello todas las respuestas o afirmaciones proporcionadas por la IA son susceptibles de ser erroneas"],
    ["¿Qué nivel de dificultad presenta?", "Actualmente nuestro modelo presenta un ELO estimado de 1000, suponiendo un desafío ligero para nuevos jugadores"],
    ["¿Puedo ver repeticiones de mis partidas?", "Puedes acceder a las repeticiones desde tu perfil y retomar la partida desde cualquier punto de la repetición, facilitando la práctica y mejora continua"],
    ["¿Quiénes Somos?", "Me llamo Javier Villena, soy un estudiante de DAW en el instituto IES JORGE GUILLÉN y Chess-Mentor surje como una idea de proyecto para el TFG"],
    ["¿Chess-Mentor es un producto final?", "No, Chess-Mentor debe ser tomado como una demo técnica y una demostración de una idea de negocio aún pendiente de desarrollar"],
    ["¿De verdad esto jugando contra Magnus Carlsen?", "No, chico, no"]
]
export const Faq = () => {
    return (
         <main className="text-white bg-[url(./assets/login-background.png)] bg-contain bg-no-repeat bg-bottom w-[85vw] h-[98vh] absolute right-0 flex flex-col items-center justify-center ">
            <h1>FaQ</h1>
            <h3>¿Tienes alguna duda? Nosotros te la resolvemos</h3>

            <div className="flex flex-row items-center justify-center flex-wrap">
                {preguntas.map((pregunta, index) => {
                    return (
                        <Question
                            key={index}
                            pregunta = {pregunta[0]}
                            respuesta = {pregunta[1]} 
                        />
                    )
                })}
            </div>
        </main>
    )
} 