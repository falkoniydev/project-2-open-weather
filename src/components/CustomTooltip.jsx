import React from "react";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="custom-tooltip" style={{ backgroundColor: '#333', color: '#fff', padding: '10px', borderRadius: '5px' }}>
                <p className="label">{`${label}`}</p>
                {payload.map((data, index) => (
                    <p key={index} className="intro" style={{ color: data.stroke }}>
                        {`${data.name}: ${data.value}`}
                    </p>
                ))}
            </div>
        );
    }

    return null;
};

export default CustomTooltip;
