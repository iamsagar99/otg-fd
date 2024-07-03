import { NavLink } from "react-router-dom";
import { FaPen, FaTrash } from "react-icons/fa"; // Import icons from react-icons
import Swal from "sweetalert2";
import './ActionButtons.css'; // Import custom CSS for styling

const ActionButtons = ({ id, onDeleteClick, updatePath }) => {
    const handleDelete = (e) => {
        e.preventDefault();
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                onDeleteClick(id);
            }
        });
    };

    return (
        <>
            {updatePath && (
                <NavLink to={updatePath} className="action-button edit-button me-2">
                    <FaPen />
                </NavLink>
            )}
            {onDeleteClick && (
                <NavLink to="/delete" onClick={handleDelete} className="action-button delete-button">
                    <FaTrash />
                </NavLink>
            )}
        </>
    );
};

export default ActionButtons;
