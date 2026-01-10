import React from 'react'
import '../../assets/css/Home.css'
import Axios from 'axios';
import Hero from '../components/Hero.jsx';

export default function Home() {

    const reducer = (state, action) => {
        switch (action.type) {
            // Define your state management logic here
            default:
                return state;
        }
    };

    const [state, dispatch] = React.useReducer(reducer, {});
    const [message, setMessage] = React.useState(null);

    React.useEffect(() => {
        Axios.get(`/api`)
            .then(response => {
                // console.log("🚀 ~ Home ~ response:", response);
                setMessage(response.data);
            })
            .catch(error => {
                setMessage('Backend unreachable');
                console.error('Error fetching data:', error);
            });
    }, []);

    return (
        <>
            <Hero />
            <div className="home">
                <h2>Message from server: {message}</h2>
            </div>
        </>
    )
}
