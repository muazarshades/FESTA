import { useState } from 'react';
import axios from 'axios';

function CreateEvent() {

    const [title, setTitle] = useState('');
    const [location, setLocation] = useState('');
    const [budget, setBudget] = useState('');
    const [message, setMessage] = useState('');

    const createEvent = async (e) => {

        e.preventDefault();

        try {

            const response = await axios.post(
                'http://localhost:5000/api/events/create',
                {
                    title,
                    location,
                    budget
                }
            );

            setMessage(response.data.message);
        }

        catch (error) {

            setMessage(error.response.data.message);
        }
    };

    return (

        <div className='container'>

            <form className='form' onSubmit={createEvent}>

                <h2>Create Event</h2>

                <input
                    type='text'
                    placeholder='Event Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />

                <input
                    type='text'
                    placeholder='Location'
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                />

                <input
                    type='number'
                    placeholder='Budget'
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    required
                />

                <button type='submit'>
                    Create Event
                </button>

                <p>{message}</p>

            </form>

        </div>
    );
}

export default CreateEvent;