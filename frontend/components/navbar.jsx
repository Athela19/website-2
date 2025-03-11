export default function Navbar() {
    return (
        <nav className="bg-gray-800 py-4 px-7">
            <div className="container mx-auto px-4 flex justify-between items-center ">
                <h1 className="text-white text-2xl font-semibold cursor-pointer ">LOGO.</h1>
                <ul className="flex gap-5 cursor-pointer">
                    <li className="hover:text-blue-500">list-1</li>
                    <li className="hover:text-blue-500">list-2</li>
                    <li className="hover:text-blue-500">list-3</li>
                </ul>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 te" href="/login">Login</button>
            </div>
        </nav>
    );    
}