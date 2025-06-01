function Header() {
    
    return (
        <nav>
            <ul>
                <li><strong>HEADER</strong></li>
            </ul>
            <ul>
                <li>
                    <a href="#" className="secondary">Services</a>
                </li>
                <li>
                    <details className="dropdown">
                        <summary>Account</summary>
                        <ul dir="rtl">
                            <li><a href="#">Profile</a></li>
                            <li><a href="#">Settings</a></li>
                            <li><a href="#">Loggout</a></li>
                        </ul>
                    </details>
                </li>
            </ul>
        </nav>
    )
}

export default Header;