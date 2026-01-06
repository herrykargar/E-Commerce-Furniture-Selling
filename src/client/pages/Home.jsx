import React from 'react'
import '../../assets/css/Home.css'
import Axios from 'axios';

const apiBase = import.meta.env.VITE_API_BASE;

export default function Home() {

    const reducer = (state, action) => {
        switch (action.type) {
            // Define your state management logic here
            default:
                return state;
        }
    };
    // State to hold message from server

    const [state, dispatch] = React.useReducer(reducer, {});
    const [message, setMessage] = React.useState(null);

    React.useEffect(() => {
        if (!apiBase) {
            setMessage('Backend not running');
            return;
        }

        Axios.get(`${apiBase}/api/message`)
            .then(response => { setMessage(response.data); })
            .catch(error => {
                setMessage('Backend unreachable');
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <div className="home">
            Home Page
            <h2>Message from server: {message}</h2>
        </div>
    )
}
