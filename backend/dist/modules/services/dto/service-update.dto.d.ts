export declare class UpdateServiceDto {
    title: string;
    email: string;
    description: string;
    category: string;
    price: string;
    country: string;
    city: string;
    zipcode: string;
    address: string;
    venueDetails?: {
        capacity?: string;
        type?: string;
        eventTypes?: string[];
    };
    cateringDetails?: {
        cuisineTypes?: string[];
        foodTastingAvailable?: boolean;
        serviceStyle?: string;
    };
    photographerDetails?: {
        coverage?: string;
        deliveryTime?: string;
        equipmentDetails?: string[];
    };
    carRentalDetails?: {
        vehicleOptions?: string[];
        rentalDuration?: string;
        driverAvailability?: boolean;
    };
    bridalMakeupDetails?: {
        makeupStyles?: string[];
        brandsUsed?: string[];
        trialSessionsAvailable?: boolean;
        additionalServices?: string[];
    };
    decorDetails?: {
        themeOptions?: string[];
        setupTime?: string;
        customizationAvailable?: boolean;
    };
    hennaArtistDetails?: {
        designTypes?: string[];
        materialsUsed?: string;
        teamAvailability?: boolean;
    };
    bridalWearDetails?: {
        collectionDetails?: string[];
        fittingsAvailable?: boolean;
        deliveryTime?: string;
    };
    invitationsDetails?: {
        designOptions?: string[];
        customizationAvailable?: boolean;
        deliveryOptions?: string[];
    };
    singerDetails?: {
        performanceStyle?: string;
        repertoire?: string[];
        duration?: string;
    };
    choreographerDetails?: {
        danceStyles?: string[];
        groupSize?: string;
        sessionsOffered?: string;
    };
    image?: string[];
    location?: {
        type: string;
        coordinates: [number, number];
    };
}
