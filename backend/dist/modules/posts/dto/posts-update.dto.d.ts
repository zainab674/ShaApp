export declare class UpdatePostDto {
    title: string;
    description: string;
    image: string[];
    city: string;
    streetAddress: string;
    state: string;
    zipCode: string;
    location: {
        type: String;
        coordinates: [number, number];
    };
    urgent: boolean;
    helpfree: boolean;
    obo: boolean;
    price: string;
}
