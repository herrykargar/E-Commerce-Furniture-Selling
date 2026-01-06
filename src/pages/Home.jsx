import React from 'react'
import '../assets/css/home.css'
import Axios from 'axios';

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
        Axios.get('/api/message')
            .then(response => {setMessage(response.data)})
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return (
        <div className="home">
            Home Page
            <h2>Message from server: {message}</h2>
        </div>
    )
}
