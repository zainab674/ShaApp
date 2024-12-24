export declare class UpdateServiceDto {
    title: string;
    description: string;
    category: string;
    price: string;
    image: string[];
    location: {
        coordinates: [number, number];
        required: true;
    };
}
