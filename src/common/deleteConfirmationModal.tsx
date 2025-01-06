
interface ConfirmationModalProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: (id: string) => void;
    itemId: string | null;
}

const DeleteConfirmationModal: React.FC<ConfirmationModalProps> = ({ showModal, onClose, onConfirm, itemId }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl mb-4">Are you sure you want to delete this item?</h3>
                <div className="flex justify-end">
                    <button
                        className="mr-2 text-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-600 text-white px-4 py-2 rounded"
                        onClick={() => itemId && onConfirm(itemId)}
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteConfirmationModal;
