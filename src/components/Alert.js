import React from 'react'

export default function Alert(props) {
    const capitalize = (word) => {
        if (word === 'danger') {
            word = 'Error'
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }
    return (
        <div style={{ height: '50px', position: 'relative', 'zIndex': '10' }}>
            {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible  show`} role="alert">
                <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
            </div>}
        </div>
    )
}

