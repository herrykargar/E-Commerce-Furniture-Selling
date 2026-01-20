import React,{useState} from 'react'
import Breadcrumb from '../../ui/Breadcrumb.jsx'
import Button from '../../ui/Button.jsx'
export default function Contact() {
  const contactRequirements = [
    {
      type: 'Address',
      value: '123 Wooden St, Furnitown, WO 45678'
    },
    {
      type: 'Phone',
      value: '+1 (234) 567-8901'
    },
    {
      type: 'Email',
      value: 'contact@woodenworld.com'
    },
    {
      type: 'Working Time',
      value: 'Mon - Fri: 9:00 AM - 6:00 PM'
    },
  ]
  const [info, setInfo] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation and submission logic here
    if (!info.name || !info.email || !info.subject || !info.message) {
      alert('Please fill in all fields.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(info.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    if (info.message.length < 10) {
      alert('Message should be at least 10 characters long.');
      return;
    }
    
    alert('Message sent!');
    setInfo({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  }
  return (
    <div>
      <Breadcrumb name='Contact' />
      <div className='text-center my-5 '>
        <h2>Get In Touch With Us</h2>
        <p className='gray-text'>For More Information About Our Product & Services. Please Feel Free To Drop Us<br></br> An Email. Our Staff Always Be There To Help You Out. Do Not Hesitate!</p>
      </div>
      <div className='contact-info d-flex justify-content-evenly align-items-center flex-wrap  mb-5'>
        <div className='d-flex flex-column gap-3 mb-4'>
          {
            contactRequirements.map((item, index) => (
              <div key={index} className={`contact-${item.type.toLowerCase().replace(' ', '-')}`}>
                <h3>{item.type}</h3>
                <p>{item.value}</p>
              </div>
            ))
          }
        </div>
        <div className='contact-form w-50 mb-4'>
          <form onSubmit={(e)=>handleSubmit(e)}>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Your Name' value={info.name} onChange={(e) => setInfo({...info, name: e.target.value})} />
            </div>
            <div className='mb-3'>
              <input type="email" className='form-control' placeholder='Your Email' value={info.email} onChange={(e) => setInfo({...info, email: e.target.value})} />
            </div>
            <div className='mb-3'>
              <input type="text" className='form-control' placeholder='Subject' value={info.subject} onChange={(e) => setInfo({...info, subject: e.target.value})} />
            </div>
            <div className='mb-3'>
              <textarea className='form-control' rows="5" placeholder='Your Message' value={info.message} onChange={(e) => setInfo({...info, message: e.target.value})}></textarea>
            </div>
            <Button type="submit">Send Message</Button>
          </form>
        </div>
      </div>
    </div>
  )
}
