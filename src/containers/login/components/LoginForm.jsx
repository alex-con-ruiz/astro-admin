import Cookies from 'universal-cookie';

const handleLoginFrom = () => {
    const cookies = new Cookies(null, { path: '/admin' });
    cookies.set('auth', 'true', { maxAge: 60});
    window.location.href = './admin/dashboard';
}

const LoginForm = () => {
    return (
        <div>
            <input type="text" />
            <input type="password" />
            <button onClick={() => handleLoginFrom()}>Clicks</button>
        </div>
    );
};

export default LoginForm;