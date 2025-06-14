import '../static/css/footer.css'

export const Footer = () => {
    return (
        <footer className='text-center text-xs p-2 flex flex-row justify-between'>
            <span className='w-[300px]'>ChessMentor - Todos los derechos reservados 2025</span>
            <div>
                <a href="https://github.com/jaVillena17/chess-mentor" className='flex flex-row items-center' target='blank'>
                    <img src="./assets/github.png" className='h-[20px]' alt="" /> 
                    Github
                </a>
            
            </div>
            
        </footer>
    )
}