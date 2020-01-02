export interface GeoIpLookUp {
    ip: string;
    isp: string;
    org: string;
    hostname: string;
    longitude: string;
    latitude: string;
    postal_code: string;
    city: string;
    country_code: string;
    country_name: string;
    continent_code: string;
    region: string;
    district: string;
    timezone_name: string;
    connection_type: string;
    asn: string;
    currency_code: string;
    currency_name: string;
    success: boolean;
    cached: boolean;
}