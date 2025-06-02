export const Index = () => {
    return (
        <main className="text-white bg-[url(./assets/login-background.png)] bg-contain bg-no-repeat bg-bottom w-[85vw] h-[98vh] absolute right-0 flex flex-col items-center justify-center ">
            <section className="text-center py-4 bg-gradient-to-b">
                <h2 className="text-4xl md:text-5xl text-white font-extrabold mb-4">Tu nuevo mentor de ajedrez</h2>
                <p className="text-lg text-white max-w-xl mx-auto mb-6">
                Aprende y mejora con la ayuda de una inteligencia artificial que analiza tus partidas y te guía jugada a jugada
                </p><br /> <br /> <br />
                <a href="/game" className="text-black bg-[#8b7925] rounded-xl px-10 py-4 mt-20 text-2xl font-extrabold border">Jugar YA</a>
            </section>

            <section id="caracteristicas" className="p-4 max-w-6xl mx-auto py-16 px-4 grid md:grid-cols-3 gap-8">
                <div className="border border-[#8b7925] p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-2">Análisis Inteligente</h3>
                <p>Evalúa tus partidas con una IA que detecta errores y sugiere mejores movimientos</p>
                </div>
                <div className="border border-[#8b7925] p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-2">Chatbox Integrado</h3>
                <p>Consulta jugadas y moviemientos a nuestro modelo de IA en tiempo real</p>
                </div>
                <div className="border border-[#8b7925] p-6 rounded-lg shadow-md text-center">
                <h3 className="text-xl font-bold mb-2">Modo Repetición</h3>
                <p>Vuelve a revivir tus partidas de forma fácil y sencilla. Porque la mejor forma de ser mejor es aprender de los errores</p>
                </div>
            </section>

          

        </main>
    )
}