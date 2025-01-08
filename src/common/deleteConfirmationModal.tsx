import Button from './button';

interface ConfirmationModalProps {
    showModal: boolean;
    onClose: () => void;
    onConfirm: (id: string) => void;
    itemId: string | null;
    isLoading?: boolean;
}

const DeleteConfirmationModal: React.FC<ConfirmationModalProps> = ({ showModal, onClose, onConfirm, itemId, isLoading }) => {
    if (!showModal) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-30">
            <div className="bg-white p-6 rounded shadow-lg">
                <h3 className="text-xl mb-4">Are you sure you want to delete this item?</h3>
                <div className="flex justify-end">
                    <button
                        className="mr-2 text-gray-600"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <Button
                        type="button"
                        isLoading={isLoading}
                        onClick={() => itemId && onConfirm(itemId)}
                    >
                        Confirm
                    </Button>
                </div>
            </div>
        </div>

    );
};

export default DeleteConfirmationModal;
