export const useParseGoogleMapLocation = (addressComponents) => {
    const address: any = {}
    if (!Array.isArray(addressComponents)) {
        console.debug("Address Components is not an array");
    }
    if (!addressComponents.length) {
        console.debug("Address Components is empty");
    }
    // console.debug(address_components, "address_components");
    for (let i = 0; i < addressComponents.length; i++) {
        const component = addressComponents[i];
        if (isStreetNumber(component)) {
            address.street_number = component.long_name;
        }
        if (isStreetName(component)) {
            address.street_name = component.long_name;
        }
        if (isArea(component)) {
            address.area = component.long_name;
        }
        if (isSubLocality(component)) {
            address.sub_locality = component.long_name;
        }
        if (isCity(component)) {
            address.city = component.long_name;
        }
        if (isState(component)) {
            address.state = component.long_name;
        }
        if (isCountry(component)) {
            address.country = component.long_name;
        }
        if (isPostalCode(component)) {
            address.postal_code = component.long_name;
        }
    }
    return address;
}
const isStreetNumber = (addressComponent) => {
    return addressComponent.types.includes("street_number");
}
const isSubLocality = (addressComponent) => {
    return addressComponent.types.includes("sublocality");
}
const isArea = (addressComponent) => {
    return addressComponent.types.includes("sublocality_level_1");
}
const isStreetName = (addressComponent) => {
    return addressComponent.types.includes("route");
}
const isCity = (addressComponent) => {
    return addressComponent.types.includes("locality");
}
const isState = (addressComponent) => {
    return addressComponent.types.includes("administrative_area_level_1");
}
const isCountry = (addressComponent) => {
    return addressComponent.types.includes("country");
}
const isPostalCode = (addressComponent) => {
    return addressComponent.types.includes("postal_code");
}
export const gmapOptions = (isDark: boolean) => {
    return {
        zoomControl: false,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUI: true,
        styles: isDark && [
            {
                elementType: "geometry",
                stylers: [{color: "#242f3e"}],
            },
            {
                elementType: "labels.text.stroke",
                stylers: [{color: "#242f3e"}],
            },
            {
                elementType: "labels.text.fill",
                stylers: [{color: "#746855"}],
            },
            {
                featureType: "administrative.locality",
                elementType: "labels.text.fill",
                stylers: [{color: "#d59563"}],
            },
            {
                featureType: "poi",
                elementType: "labels.text.fill",
                stylers: [{color: "#d59563"}],
            },
            {
                featureType: "poi.park",
                elementType: "geometry",
                stylers: [{color: "#263c3f"}],
            },
            {
                featureType: "poi.park",
                elementType: "labels.text.fill",
                stylers: [{color: "#6b9a76"}],
            },
            {
                featureType: "road",
                elementType: "geometry",
                stylers: [{color: "#38414e"}],
            },
            {
                featureType: "road",
                elementType: "geometry.stroke",
                stylers: [{color: "#212a37"}],
            },
            {
                featureType: "road",
                elementType: "labels.text.fill",
                stylers: [{color: "#9ca5b3"}],
            },
            {
                featureType: "road.highway",
                elementType: "geometry",
                stylers: [{color: "#746855"}],
            },
            {
                featureType: "road.highway",
                elementType: "geometry.stroke",
                stylers: [{color: "#1f2835"}],
            },
            {
                featureType: "road.highway",
                elementType: "labels.text.fill",
                stylers: [{color: "#f3d19c"}],
            },
            {
                featureType: "transit",
                elementType: "geometry",
                stylers: [{color: "#2f3948"}],
            },
            {
                featureType: "transit.station",
                elementType: "labels.text.fill",
                stylers: [{color: "#d59563"}],
            },
            {
                featureType: "water",
                elementType: "geometry",
                stylers: [{color: "#17263c"}],
            },
            {
                featureType: "water",
                elementType: "labels.text.fill",
                stylers: [{color: "#515c6d"}],
            },
            {
                featureType: "water",
                elementType: "labels.text.stroke",
                stylers: [{color: "#17263c"}],
            },
        ],
    };
}