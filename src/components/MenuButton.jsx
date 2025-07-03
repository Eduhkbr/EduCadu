const MenuButton = ({ bgColor, icon, title, onClick }) => (
    <div onClick={onClick} className={`main-button aspect-square ${bgColor} rounded-2xl shadow-lg flex flex-col items-center justify-center cursor-pointer text-white p-4 transition-transform transform hover:scale-105`}>
        <div className="text-6xl md:text-8xl font-black">{icon}</div>
        <div className="text-xl md:text-2xl font-bold">{title}</div>
    </div>
);

export default MenuButton;