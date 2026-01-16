import './ui.css';

export default function Logo({children}) {
    return (
        <div className="logo d-flex align-items-baseline">
            {/* <img src="/images/logow.svg" alt="" className='logo-img' /> */}
            <span className="mb-0">{children}</span>
        </div>
    )
}
