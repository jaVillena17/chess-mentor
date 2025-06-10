export const Question = ({pregunta, respuesta}) => {
    return (
        <div className="border border-[#8b7925] w-[80%] h-[150px] m-5 overflow-hidden text-center rounded-xl lg:w-[20%]">
            <div className="w-[100%] h-[100%] transform transition-transform duration-300 hover:translate-y-[-100%] ">
                <span className="h-[100%] flex justify-center flex-col p-2">
                    <p className="font-extrabold text-xl">{pregunta}</p>
                    <svg className="w-10 text-center mx-auto my-2 fill-[#8b7925]" xmlns="http://www.w3.org/2000/svg" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd" viewBox="0 0 512.02 319.26"><path d="M5.9 48.96 48.97 5.89c7.86-7.86 20.73-7.84 28.56 0l178.48 178.48L434.5 5.89c7.86-7.86 20.74-7.82 28.56 0l43.07 43.07c7.83 7.84 7.83 20.72 0 28.56l-192.41 192.4-.36.37-43.07 43.07c-7.83 7.82-20.7 7.86-28.56 0l-43.07-43.07-.36-.37L5.9 77.52c-7.87-7.86-7.87-20.7 0-28.56z"/></svg>
                </span>
                <span className="h-[100%] bg-linear-to-b from-[#8b7925] to-gray flex justify-center flex-col p-2">
                    <p className="font-bold">{respuesta}</p>
                </span>
            </div>
            
            
        </div>
    )
}