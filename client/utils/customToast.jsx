import { toast } from 'react-toastify';

export const showConfirmationToast = (message, onConfirm, onCancel) => {
    const confirmDeleteToast = toast(
        <div className="text-center">
            <p className="text-sm leading-5" style={{ color: '#333', marginBottom: '1rem' }}>
                {message}
            </p>
            <div>
                <button
                    onClick={() => {
                        onConfirm(); // Call the confirmation action
                        toast.dismiss(confirmDeleteToast); // Dismiss the toast
                    }}
                    style={buttonStyle('#007BFF', 'white')} // Blue button with white text
                >
                    Yes
                </button>
                <button
                    onClick={() => {
                        onCancel(); // Call the cancel action
                        toast.dismiss(confirmDeleteToast); // Dismiss the toast
                    }}
                    style={buttonStyle('#6c757d', 'white')} // Gray button with white text
                >
                    No
                </button>
            </div>
        </div>,
        {
            position: 'top-center',
            autoClose: 5000, // 5 seconds auto-close
            hideProgressBar: false, // Show progress bar
            closeOnClick: false, // Prevent closing on click
            draggable: false, // Disable dragging
            style: toastStyle,
        }
    );
};

// Button Styling Function
const buttonStyle = (backgroundColor, textColor) => ({
    margin: '10px 7px 0 7px',
    padding: '10px 18px',
    backgroundColor,
    color: textColor,
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: 'bold',
    fontSize: '0.8rem',
    transition: 'background-color 0.3s ease',
    textTransform: 'uppercase',
});

// Toast Styling
const toastStyle = {
    fontSize: '1rem',
    padding: '20px',
    backgroundColor: 'white',
    color: '#333',
    borderRadius: '12px',
    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.15)',
    width: '24rem', 
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center', 
};



