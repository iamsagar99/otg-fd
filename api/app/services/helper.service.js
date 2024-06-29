const axios = require('axios')
const useragent = require('express-useragent');

class Helper {
  generateRandomString = () => {
    let length = 16;
    const characters =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    const randomBytes = crypto.randomBytes(length);
    let randomString = "";
    for (let i = 0; i < length; i++) {
      const index = randomBytes[i] % characters.length;
      randomString += characters.charAt(index);
    }

    return randomString;
  };

  getGeoStats = async (req)=>{
    try {
        let ip = req.ip === '::1' ? '127.0.0.1' : req.ip; // Handle localhost for testing
        // ip = '110.44.114.34'
        const url = `http://ip-api.com/json/${ip}`;
        const response = await axios.get(url);
        const geolocation = response.data;
        let geostat =  {
            url: req.url,
            method: req.method,
            headers: req.headers,
            body: req.body,
            ip: ip,
            geolocation: {
                latitude: geolocation.lat,
                longitude: geolocation.lon,
                city: geolocation.city,
                state: geolocation.state ?? 'N/A',
                region: geolocation.regionName,
                country: geolocation.country
            }
        }
        return geostat
    } catch (error) {
       throw error
    }
  }


  getDeviceInfo = async(req) =>{
    try {
        const userAgent = req.headers['user-agent'];
    
        const osRegex = /(Windows NT \d+\.\d+|Android \d+\.\d+|iOS \d+\_\d+_\d+|Mac OS X \d+\_\d+(\_\d+)?|Linux)/i;
        const deviceRegex = /(Mobile|Tablet|iPad|iPhone|Android|Windows|Linux)/i;
    
        const osMatch = userAgent.match(osRegex);
        const os = osMatch ? osMatch[0] : 'Unknown OS';
    
        const deviceMatch = userAgent.match(deviceRegex);
        const device = deviceMatch ? deviceMatch[0] : 'Unknown Device';
    
        let info = {
          device,os
        }
        return info;

      } catch (error) {
        throw error;
      }
  }

  haversineDistance(lat1, lon1, lat2, lon2) {
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    lat1 = toRadians(lat1);
    lon1 = toRadians(lon1);
    lat2 = toRadians(lat2);
    lon2 = toRadians(lon2);

    const dlon = lon2 - lon1;
    const dlat = lat2 - lat1;

    const a = Math.sin(dlat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;
    const c = 2 * Math.asin(Math.sqrt(a));

    const km = 6371 * c; // Radius of Earth in kilometers
    return km;
}
}

module.exports = Helper;