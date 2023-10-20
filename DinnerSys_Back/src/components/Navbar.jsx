import './Navbar.css';
import { useAuth } from '../auth/AuthProvider';

export default function Navbar() {
    const { isAuthenticated, setIsAuthenticated, UserId } = useAuth();

    const onHandleSubmit = () => {
        setIsAuthenticated(false);
    }

    if (isAuthenticated) {
        return (
            <div>
                <nav className="navbar">
                    <ul className="ul-navbar">
                        <li> <a href={`/Mesero/${UserId}/Home`}> Perfil </a> </li>
                        <li > <a href={`/Mesero/${UserId}`}> Mesas </a> </li>
                        <li> <a href={`/Mesero/${UserId}/Pedidos`}> Pedidos </a> </li>
                        <li> <a href={`/Mesero/${UserId}/PedidosRealizados`}> Pedidos Realizados </a> </li>
                        <li className='li-button'> <a onClick={onHandleSubmit}> Cerrar Sesión </a> </li>
                    </ul>
                </nav>
                <div className="content">
                </div>
            </div>
        )
    }
}
