import React from "react";

const LoadingComponent = () => {

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            position: "absolute",
            justifyContent: "center",
            alignItems: "center",
        }}>
            <div className="loader-wrapper" style={{width: '100vw', height: '100vh', placeContent: 'center'}}>
                <span className="loader"></span>
                <span className="loading-text"> Yükleniyor...</span>
            </div>
        </div>
    );
};

export default LoadingComponent;
