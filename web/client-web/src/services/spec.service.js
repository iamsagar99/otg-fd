export const  getDeviceAndOSInfo = ()=> {
    let os = "Other";
    let device = "Other";
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    // Detect OS
    if (/Windows/i.test(userAgent)) {
        os = "Windows";
    } else if (/Mac/i.test(userAgent)) {
        os = "MacOS";
    } else if (/Linux/i.test(userAgent)) {
        os = "Linux";
    } else if (/iPhone|iPad|iPod/i.test(userAgent)) {
        os = "iOS";
    } else if (/Android/i.test(userAgent)) {
        os = "androidOS";
    }

    // Detect Device
    if (/Mobi|Android/i.test(userAgent)) {
        device = "SmartPhone";
    } else if (/Windows|Mac|Linux/i.test(userAgent)) {
        device = "Pc";
    }

    return {
        OS: os,
        Device_Used: device
    };
}

export const getUserLocation = (callback) => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                callback(null, { latitude, longitude });
            },
            (error) => {
                callback(error, null);
            }
        );
    } else {
        callback(new Error("Geolocation is not supported by this browser."), null);
    }
};

