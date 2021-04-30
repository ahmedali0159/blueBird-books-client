import React from 'react';
import Managebook from '../Managebook/Managebook';
import Sidenav from '../Sidenav/Sidenav';

const Admin = () => {
    return (
        <div>
            <Sidenav></Sidenav>
            <Managebook></Managebook>
        </div>
    );
};

export default Admin;