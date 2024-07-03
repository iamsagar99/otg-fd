import '../../assets/user-css/footer.css'; // Import the custom CSS file

export const AdminFooterComponent = () => {
    let date = new Date();
    let year = date.getFullYear();
    return (
        <>
            <footer className="admin-footer">
                <div className="admin-footer-container">
                    <div className="admin-footer-content">
                        <div className="admin-footer-text">Copyright &copy; Your Website {year}</div>
                    </div>
                </div>
            </footer>
        </>
    );
};
