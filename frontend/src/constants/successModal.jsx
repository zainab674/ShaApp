const SuccessModal = ({ message, onClose }) => {
    return (

        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50 ">
            <div className=" p-8 rounded shadow-lg text-center bg-zinc-700 w-1/4">
                <h2 className=" mb-4 font-semibold text-white">{message}</h2>
                <button
                    className="bg-cyan-800 text-sm text-white px-3 py-1 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
}

export default SuccessModal;