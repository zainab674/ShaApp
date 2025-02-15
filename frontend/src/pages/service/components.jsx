import React, { useState } from "react";
import { CreateService } from "../../connection/apis";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Make sure to import this CSS for styling


const ModalForm = ({ isOpen, onClose, token, fetchUserProfile }) => {
    const ServiceCategory = {
        Venue: "Venue",
        Catering: "Catering",
        Photographer: "Photographer",
        CarRental: "CarRental",
        BridalMakeup: "BridalMakeup",
        Decor: "Decor",
        HennaArtist: "HennaArtist",
        BridalWear: "BridalWear",
        Invitations: "Invitations",
        Singers: "Singers",
        Choreographers: "Choreographers",
    };

    const [formData, setFormData] = useState({
        title: "",
        email: "",
        description: "",
        category: ServiceCategory.Venue,
        price: "",
        country: "",
        city: "",
        zipcode: "",
        address: "",
        image: [],
        venueDetails: {
            capacity: "",
            type: "",
            eventTypes: [],
        },
        cateringDetails: {
            cuisineTypes: [],
            foodTastingAvailable: false,
            serviceStyle: "",
        },
        photographerDetails: {

            coverage: "",
            deliveryTime: "",
            equipmentDetails: [],
        },
        carRentalDetails: {
            vehicleOptions: [],
            rentalDuration: "",
            driverAvailability: false,
        },
        bridalMakeupDetails: {
            makeupStyles: [],
            brandsUsed: [],
            trialSessionsAvailable: false,
            additionalServices: [],
        },
        decorDetails: {
            themeOptions: [],
            setupTime: "",
            customizationAvailable: false,
        },
        hennaArtistDetails: {
            designTypes: [],
            materialsUsed: "",
            teamAvailability: false,
        },
        bridalWearDetails: {
            collectionDetails: [],
            fittingsAvailable: false,
            deliveryTime: "",
        },
        invitationsDetails: {
            designOptions: [],
            customizationAvailable: false,
            deliveryOptions: [],
        },
        singerDetails: {
            performanceStyle: "",
            repertoire: [],
            duration: "",
        },
        choreographerDetails: {
            danceStyles: [],
            groupSize: "",
            sessionsOffered: "",
        },
    });

    const [photoPreviews, setPhotoPreviews] = useState([]);
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;




        // Split the name to identify nested fields (e.g., "venueDetails.capacity")
        const nameParts = name.split('.'); // Split the name to get keys like ['venueDetails', 'capacity']



        setFormData((prev) => {
            // If there are nested keys, we need to update the nested object properly
            const updatedData = { ...prev };

            // Check if we have nested keys
            if (nameParts.length > 1) {
                const [parentKey, childKey] = nameParts;
                updatedData[parentKey] = {
                    ...updatedData[parentKey], // Copy the previous object
                    [childKey]: value, // Update the specific field
                };
            } else {
                // If it's a non-nested field, just update the value directly
                updatedData[name] = value;
            }

            console.log("Updated Form Data: ", updatedData);
            return updatedData;
        });
    };




    const handlePhotoChange = (e) => {
        const files = Array.from(e.target.files);

        if (formData.image.length + files.length > 5) {
            alert("You can only upload up to 5 images.");
            return;
        }

        // Add the selected files to the `image` array in the state
        setFormData((prev) => ({
            ...prev,
            image: [...prev.image, ...files],
        }));

        // Generate and set photo previews
        const newPreviews = files.map((file) => URL.createObjectURL(file));
        setPhotoPreviews((prev) => [...prev, ...newPreviews]);
    };


    const handleRemovePhoto = (index) => {
        const updatedimage = formData.image.filter((_, i) => i !== index);
        const updatedPreviews = photoPreviews.filter((_, i) => i !== index);

        setFormData((prev) => ({
            ...prev,
            image: updatedimage,
        }));
        setPhotoPreviews(updatedPreviews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const data = new FormData();
            data.append("title", formData.title);
            data.append("email", formData.email);
            data.append("description", formData.description);
            data.append("category", formData.category);
            data.append("price", formData.price);
            data.append("country", formData.country);
            data.append("city", formData.city);
            data.append("zipcode", formData.zipcode);
            data.append("address", formData.address);

            // Append images
            formData.image.forEach((file) => {
                data.append("image", file);
            });

            // Serialize nested objects as JSON strings
            if (formData.venueDetails) {
                data.append("venueDetails", JSON.stringify(formData.venueDetails));
            }
            if (formData.cateringDetails) {
                data.append("cateringDetails", JSON.stringify(formData.cateringDetails));
            }
            if (formData.photographerDetails) {
                data.append("photographerDetails", JSON.stringify(formData.photographerDetails));
            }
            if (formData.carRentalDetails) {
                data.append("carRentalDetails", JSON.stringify(formData.carRentalDetails));
            }
            if (formData.bridalMakeupDetails) {
                data.append("bridalMakeupDetails", JSON.stringify(formData.bridalMakeupDetails));
            }
            if (formData.decorDetails) {
                data.append("decorDetails", JSON.stringify(formData.decorDetails));
            }
            if (formData.hennaArtistDetails) {
                data.append("hennaArtistDetails", JSON.stringify(formData.hennaArtistDetails));
            }
            if (formData.bridalWearDetails) {
                data.append("bridalWearDetails", JSON.stringify(formData.bridalWearDetails));
            }
            if (formData.invitationsDetails) {
                data.append("invitationsDetails", JSON.stringify(formData.invitationsDetails));
            }
            if (formData.singerDetails) {
                data.append("singerDetails", JSON.stringify(formData.singerDetails));
            }
            if (formData.choreographerDetails) {
                data.append("choreographerDetails", JSON.stringify(formData.choreographerDetails));
            }

            console.log("Form Data as JSON:", JSON.stringify(formData, null, 2));

            const response = await CreateService(data, token);

            if (response) {
                fetchUserProfile();

                console.log("Service created successfully:", response);
                // alert("Service created successfully!");
                toast.success("Service created successfully!");
                // Reset form
                setFormData({
                    title: "",
                    email: "",
                    description: "",
                    category: ServiceCategory.Venue,
                    price: "",
                    country: "",
                    city: "",
                    zipcode: "",
                    address: "",
                    image: [],
                    venueDetails: { capacity: "", type: "", eventTypes: [] },
                    cateringDetails: { cuisineTypes: [], foodTastingAvailable: false, serviceStyle: "" },
                    photographerDetails: { coverage: "", deliveryTime: "", equipmentDetails: [] },
                    carRentalDetails: { vehicleOptions: [], rentalDuration: "", driverAvailability: false },
                    bridalMakeupDetails: { makeupStyles: [], brandsUsed: [], trialSessionsAvailable: false, additionalServices: [] },
                    decorDetails: { themeOptions: [], setupTime: "", customizationAvailable: false },
                    hennaArtistDetails: { designTypes: [], materialsUsed: "", teamAvailability: false },
                    bridalWearDetails: { collectionDetails: [], fittingsAvailable: false, deliveryTime: "" },
                    invitationsDetails: { designOptions: [], customizationAvailable: false, deliveryOptions: [] },
                    singerDetails: { performanceStyle: "", repertoire: [], duration: "" },
                    choreographerDetails: { danceStyles: [], groupSize: "", sessionsOffered: "" },
                });
                onClose()
            }

        } catch (error) {
            console.error("Error creating service:", error);
            alert("Failed to create service. Please try again.");
        } finally {
            setLoading(false);
        }
    };



    const renderCategoryFields = () => {
        switch (formData.category) {
            case ServiceCategory.Venue:
                return (
                    <>
                        <div>
                            <label htmlFor="venueDetails.capacity" className="block mb-1">Capacity</label>
                            <input
                                type="number"
                                min={0}
                                name="venueDetails.capacity"
                                placeholder="Capacity"
                                value={formData.venueDetails.capacity || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="venueDetails.type" className="block mb-1">Venue Type</label>
                            <select
                                name="venueDetails.type"
                                value={formData.venueDetails.type}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            >
                                <option value="Banquet">Banquet</option>
                                <option value="Outdoor">Outdoor</option>
                                <option value="Garden">Garden</option>
                                <option value="Indoor">Indoor</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="venueDetails.eventTypes" className="block mb-1">Event Types</label>
                            <select
                                name="venueDetails.eventTypes"
                                value={formData.venueDetails.eventTypes || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        venueDetails: {
                                            ...prev.venueDetails,
                                            eventTypes: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Weddings">Weddings</option>
                                <option value="Parties">Parties</option>
                                <option value="Conferences">Conferences</option>
                                <option value="eventTypeOther">Others</option>
                            </select>
                        </div>

                    </>
                );

            case ServiceCategory.Catering:
                return (
                    <>

                        <div>
                            <label htmlFor="cateringDetails.cuisineTypes" className="block mb-1">Cuisine Types</label>
                            <select
                                name="cateringDetails.cuisineTypes"
                                value={formData.cateringDetails.cuisineTypes || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        cateringDetails: {
                                            ...prev.cateringDetails,
                                            cuisineTypes: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Italian">Italian</option>
                                <option value="Chinese">Chinese</option>
                                <option value="Indian">Indian</option>
                                <option value="Mexican">Mexican</option>
                                <option value="American">American</option>
                            </select>
                        </div>
                        <div>
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="cateringDetails.foodTastingAvailable"
                                    checked={formData.cateringDetails.foodTastingAvailable || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            cateringDetails: {
                                                ...formData.cateringDetails,
                                                foodTastingAvailable: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="foodTastingAvailable">Food Tasting Available</label>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="cateringDetails.serviceStyle" className="block mb-1">Service Style</label>
                            <input
                                type="text"
                                name="cateringDetails.serviceStyle"
                                placeholder="Service Style (e.g., Family Style, Plated)"
                                value={formData.cateringDetails.serviceStyle || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                    </>
                );

            case ServiceCategory.Photographer:
                return (
                    <>

                        <div>
                            <label htmlFor="photographerDetails.hours" className="block mb-1">Hours of Service</label>
                            <input
                                type="number"
                                name="photographerDetails.hours"
                                placeholder="Hours of Service"
                                value={formData.photographerDetails.hours || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="photographerDetails.style" className="block mb-1">Photography Style</label>
                            <input
                                type="text"
                                name="photographerDetails.style"
                                placeholder="Photography Style (e.g., Portrait, Candid)"
                                value={formData.photographerDetails.style || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="photographerDetails.coverage" className="block mb-1">Coverage</label>
                            <input
                                type="text"
                                name="photographerDetails.coverage"
                                placeholder="Coverage (e.g., Full Day, Half Day)"
                                value={formData.photographerDetails.coverage || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="photographerDetails.deliveryTime" className="block mb-1">Delivery Time</label>
                            <input
                                type="text"
                                name="photographerDetails.deliveryTime"
                                placeholder="Delivery Time (e.g., 2 weeks)"
                                value={formData.photographerDetails.deliveryTime || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            <label htmlFor="photographerDetails.equipmentDetails" className="block mb-1">Equipment Details</label>
                            <select
                                name="photographerDetails.equipmentDetails"
                                value={formData.photographerDetails.equipmentDetails || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        photographerDetails: {
                                            ...prev.photographerDetails,
                                            equipmentDetails: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="DSLR">DSLR</option>
                                <option value="Mirrorless">Mirrorless</option>
                                <option value="Drone">Drone</option>
                                <option value="Lighting Kit">Lighting Kit</option>
                                <option value="Tripod">Tripod</option>
                            </select>
                        </div>

                    </>
                );

            case ServiceCategory.CarRental:
                return (
                    <>

                        <div>
                            {/* Vehicle Options Multi-Select Dropdown */}
                            <label htmlFor="vehicleOptions" className="block mb-1">Vehicle Options</label>
                            <select
                                name="carRentalDetails.vehicleOptions"
                                value={formData.carRentalDetails.vehicleOptions || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        carRentalDetails: {
                                            ...prev.carRentalDetails,
                                            vehicleOptions: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Convertible">Convertible</option>
                                <option value="Truck">Truck</option>
                                <option value="Van">Van</option>
                            </select>
                        </div>
                        <div>
                            {/* Rental Duration Number Input */}
                            <label htmlFor="rentalDuration" className="block mb-1">Rental Duration (in hours)</label>
                            <input
                                type="number"
                                name="carRentalDetails.rentalDuration"
                                placeholder="Rental Duration (in hours)"
                                min={0}
                                value={formData.carRentalDetails.rentalDuration || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            {/* Driver Availability Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="carRentalDetails.driverAvailability"
                                    checked={formData.carRentalDetails.driverAvailability || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            carRentalDetails: {
                                                ...formData.carRentalDetails,
                                                driverAvailability: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="driverAvailability">Driver Available</label>
                            </div>
                        </div>

                    </>
                );

            case ServiceCategory.BridalMakeup:
                return (
                    <>

                        <div>
                            {/* Makeup Styles Multi-Select Dropdown */}
                            <label htmlFor="makeupStyles" className="block mb-1">Makeup Styles</label>
                            <select
                                name="bridalMakeupDetails.makeupStyles"
                                value={formData.bridalMakeupDetails.makeupStyles || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        bridalMakeupDetails: {
                                            ...prev.bridalMakeupDetails,
                                            makeupStyles: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Natural">Natural</option>
                                <option value="Glam">Glam</option>
                                <option value="Bold">Bold</option>
                                <option value="Classic">Classic</option>
                                <option value="Contemporary">Contemporary</option>
                            </select>
                        </div>
                        <div>
                            {/* Brands Used Multi-Select Dropdown */}
                            <label htmlFor="brandsUsed" className="block mb-1">Brands Used</label>
                            <select
                                name="bridalMakeupDetails.brandsUsed"
                                value={formData.bridalMakeupDetails.brandsUsed || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        bridalMakeupDetails: {
                                            ...prev.bridalMakeupDetails,
                                            brandsUsed: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="MAC">MAC</option>
                                <option value="Huda Beauty">Huda Beauty</option>
                                <option value="NARS">NARS</option>
                                <option value="Anastasia Beverly Hills">Anastasia Beverly Hills</option>
                                <option value="Fenty Beauty">Fenty Beauty</option>
                            </select>
                        </div>
                        <div>
                            {/* Trial Sessions Available Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="bridalMakeupDetails.trialSessionsAvailable"
                                    checked={formData.bridalMakeupDetails.trialSessionsAvailable || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            bridalMakeupDetails: {
                                                ...formData.bridalMakeupDetails,
                                                trialSessionsAvailable: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="trialSessionsAvailable">Trial Sessions Available</label>
                            </div>
                        </div>
                        <div>
                            {/* Additional Services Multi-Select Dropdown */}
                            <label htmlFor="additionalServices" className="block mb-1">Additional Services</label>
                            <select
                                name="bridalMakeupDetails.additionalServices"
                                value={formData.bridalMakeupDetails.additionalServices || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        bridalMakeupDetails: {
                                            ...prev.bridalMakeupDetails,
                                            additionalServices: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Lash Extensions">Lash Extensions</option>
                                <option value="Airbrush Makeup">Airbrush Makeup</option>
                                <option value="Bridal Hair Styling">Bridal Hair Styling</option>
                                <option value="Henna">Henna</option>
                                <option value="Makeup for Bridesmaids">Makeup for Bridesmaids</option>
                            </select>
                        </div>

                    </>
                );

            case ServiceCategory.Decor:
                return (
                    <>

                        <div>
                            {/* Theme Options Multi-Select Dropdown */}
                            <label htmlFor="themeOptions" className="block mb-1">Theme Options</label>
                            <select
                                name="decorDetails.themeOptions"
                                value={formData.decorDetails.themeOptions || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        decorDetails: {
                                            ...prev.decorDetails,
                                            themeOptions: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Rustic">Rustic</option>
                                <option value="Elegant">Elegant</option>
                                <option value="Vintage">Vintage</option>
                                <option value="Modern">Modern</option>
                                <option value="Bohemian">Bohemian</option>
                            </select>
                        </div>
                        <div>
                            {/* Setup Time Input */}
                            <label htmlFor="setupTime" className="block mb-1">Setup Time (e.g., 2 hours)</label>
                            <input
                                type="text"
                                name="decorDetails.setupTime"
                                placeholder="Setup Time (e.g., 2 hours)"
                                value={formData.decorDetails.setupTime || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            {/* Customization Available Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="decorDetails.customizationAvailable"
                                    checked={formData.decorDetails.customizationAvailable || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            decorDetails: {
                                                ...formData.decorDetails,
                                                customizationAvailable: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="customizationAvailable">Customization Available</label>
                            </div>
                        </div>

                    </>
                );

            case ServiceCategory.HennaArtist:
                return (
                    <>

                        <div>
                            {/* Design Types Multi-Select Dropdown */}
                            <label htmlFor="designTypes" className="block mb-1">Design Types</label>
                            <select
                                name="hennaArtistDetails.designTypes"
                                value={formData.hennaArtistDetails.designTypes || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        hennaArtistDetails: {
                                            ...prev.hennaArtistDetails,
                                            designTypes: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Floral">Floral</option>
                                <option value="Arabic">Arabic</option>
                                <option value="Geometric">Geometric</option>
                                <option value="Traditional">Traditional</option>
                                <option value="Bridal">Bridal</option>
                            </select>
                        </div>
                        <div>
                            {/* Materials Used Input */}
                            <label htmlFor="materialsUsed" className="block mb-1">Materials Used</label>
                            <input
                                type="text"
                                name="hennaArtistDetails.materialsUsed"
                                placeholder="Materials Used (e.g., Natural Henna, Essential Oils)"
                                value={formData.hennaArtistDetails.materialsUsed || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            {/* Team Availability Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="hennaArtistDetails.teamAvailability"
                                    checked={formData.hennaArtistDetails.teamAvailability || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            hennaArtistDetails: {
                                                ...formData.hennaArtistDetails,
                                                teamAvailability: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="teamAvailability">Team Availability</label>
                            </div>
                        </div>

                    </>
                );

            case ServiceCategory.BridalWear:
                return (
                    <>

                        <div>
                            {/* Collection Details Multi-Select Dropdown */}
                            <label htmlFor="collectionDetails" className="block mb-2">Collection Details</label>
                            <select
                                name="bridalWearDetails.collectionDetails"
                                value={formData.bridalWearDetails.collectionDetails || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        bridalWearDetails: {
                                            ...prev.bridalWearDetails,
                                            collectionDetails: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Luxury">Luxury</option>
                                <option value="Custom">Custom</option>
                                <option value="Traditional">Traditional</option>
                                <option value="Modern">Modern</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            {/* Fittings Available Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="bridalWearDetails.fittingsAvailable"
                                    checked={formData.bridalWearDetails.fittingsAvailable || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            bridalWearDetails: {
                                                ...formData.bridalWearDetails,
                                                fittingsAvailable: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="fittingsAvailable">Fittings Available</label>
                            </div>
                        </div>
                        <div>
                            {/* Delivery Time Input */}
                            <label htmlFor="deliveryTime" className="block mb-2">Delivery Time</label>
                            <input
                                type="text"
                                name="bridalWearDetails.deliveryTime"
                                placeholder="Delivery Time (e.g., 2 weeks before event)"
                                value={formData.bridalWearDetails.deliveryTime || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                    </>
                );

            case ServiceCategory.Invitations:
                return (
                    <>
                        {/* Design Options Multi-Select Dropdown */}

                        <div>
                            <label htmlFor="designOptions" className="block mb-2">Design Options</label>
                            <select
                                name="invitationsDetails.designOptions"
                                value={formData.invitationsDetails.designOptions || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        invitationsDetails: {
                                            ...prev.invitationsDetails,
                                            designOptions: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Floral">Floral</option>
                                <option value="Vintage">Vintage</option>
                                <option value="Minimalist">Minimalist</option>
                                <option value="Modern">Modern</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            {/* Customization Available Checkbox */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    name="invitationsDetails.customizationAvailable"
                                    checked={formData.invitationsDetails.customizationAvailable || false}
                                    onChange={(e) => {
                                        setFormData({
                                            ...formData,
                                            invitationsDetails: {
                                                ...formData.invitationsDetails,
                                                customizationAvailable: e.target.checked,
                                            },
                                        });
                                    }}
                                    className="mr-2"
                                />
                                <label htmlFor="customizationAvailable">Customization Available</label>
                            </div>
                        </div>
                        <div>
                            {/* Delivery Options Multi-Select Dropdown */}
                            <label htmlFor="deliveryOptions" className="block mb-2">Delivery Options</label>
                            <select
                                name="invitationsDetails.deliveryOptions"
                                value={formData.invitationsDetails.deliveryOptions || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        invitationsDetails: {
                                            ...prev.invitationsDetails,
                                            deliveryOptions: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Postal">Postal</option>
                                <option value="Email">Email</option>
                                <option value="HandDelivered">Hand Delivered</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>

                    </>
                );

            case ServiceCategory.Singers:
                return (
                    <>

                        <div>
                            {/* Performance Style Input */}
                            <label htmlFor="performanceStyle" className="block mb-2">Performance Style</label>
                            <input
                                type="text"
                                name="singerDetails.performanceStyle"
                                placeholder="Performance Style (e.g., Solo, Group)"
                                value={formData.singerDetails.performanceStyle || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>
                        <div>
                            {/* Repertoire Multi-Select Dropdown */}
                            <label htmlFor="repertoire" className="block mb-2">Repertoire</label>
                            <select
                                name="singerDetails.repertoire"
                                value={formData.singerDetails.repertoire || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        singerDetails: {
                                            ...prev.singerDetails,
                                            repertoire: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Pop">Pop</option>
                                <option value="Classical">Classical</option>
                                <option value="Jazz">Jazz</option>
                                <option value="Rock">Rock</option>
                                <option value="Blues">Blues</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            {/* Performance Duration Input */}
                            <label htmlFor="duration" className="block mb-2">Performance Duration</label>
                            <input
                                type="text"
                                name="singerDetails.duration"
                                placeholder="Performance Duration (e.g., 2 hours)"
                                value={formData.singerDetails.duration || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                    </>
                );

            case ServiceCategory.Choreographers:
                return (
                    <>

                        <div>
                            {/* Dance Styles Multi-Select Dropdown */}
                            <label htmlFor="danceStyles" className="block mb-2">Dance Styles</label>
                            <select
                                name="choreographerDetails.danceStyles"
                                value={formData.choreographerDetails.danceStyles || []}
                                onChange={(e) => {
                                    const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
                                    setFormData((prev) => ({
                                        ...prev,
                                        choreographerDetails: {
                                            ...prev.choreographerDetails,
                                            danceStyles: selectedOptions,
                                        },
                                    }));
                                }}
                                className="border p-2 rounded w-full"
                                multiple
                            >
                                <option value="Hip-Hop">Hip-Hop</option>
                                <option value="Ballet">Ballet</option>
                                <option value="Contemporary">Contemporary</option>
                                <option value="Jazz">Jazz</option>
                                <option value="Tap">Tap</option>
                                {/* Add more options as needed */}
                            </select>
                        </div>
                        <div>
                            {/* Group Size Input */}
                            <label htmlFor="groupSize" className="block mb-2">Group Size</label>
                            <input
                                type="text"
                                name="choreographerDetails.groupSize"
                                placeholder="Group Size (e.g., 3 dancers, 10 dancers)"
                                value={formData.choreographerDetails.groupSize || ""}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            />

                            {/* Sessions Offered Input */}
                        </div>
                        <div>
                            <label htmlFor="sessionsOffered" className="block mb-2">Sessions Offered</label>
                            <input
                                type="number"
                                name="choreographerDetails.sessionsOffered"
                                placeholder="Number of Sessions Offered"
                                value={formData.choreographerDetails.sessionsOffered || ""}
                                onChange={handleChange}
                                min={0}
                                className="border p-2 rounded w-full"
                            />
                        </div>

                    </>
                );

            default:
                return null;
        }
    };



    if (!isOpen) return null;

    return (
        <div className=" fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white rounded-lg shadow-lg overflow-auto w-11/12 max-w-2xl p-6 max-h-screen">

                <h2 className="text-xl font-bold mb-4">Add New Item</h2>
                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col">
                            <label htmlFor="title" className="block mb-2">Title</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                placeholder="Title"
                                value={formData.title}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="email" className="block mb-2">Email</label>
                            <input
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                value={formData.email}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="description" className="block mb-2">Description</label>
                            <input
                                type="text"
                                id="description"
                                name="description"
                                placeholder="Description"
                                value={formData.description}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="category" className="block mb-2">Category</label>
                            <select
                                name="category"
                                id="category"
                                value={formData.category}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                            >
                                {Object.entries(ServiceCategory).map(([key, value]) => (
                                    <option key={key} value={value}>
                                        {value}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="price" className="block mb-2">Price</label>
                            <input
                                type="number"
                                id="price"
                                name="price"
                                placeholder="Price"
                                value={formData.price}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="country" className="block mb-2">Country</label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                placeholder="Country"
                                value={formData.country}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city" className="block mb-2">City</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="City"
                                value={formData.city}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="zipcode" className="block mb-2">Zip Code</label>
                            <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                placeholder="Zip Code"
                                value={formData.zipcode}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="address" className="block mb-2">Address</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                placeholder="Address"
                                value={formData.address}
                                onChange={handleChange}
                                className="border p-2 rounded w-full"
                                required
                            />
                        </div>

                        {renderCategoryFields()}

                        <div className="flex flex-col">
                            <label htmlFor="image" className="block mb-2">Upload Image</label>
                            <input
                                type="file"
                                id="image"
                                name="image"
                                accept="image/*"
                                multiple
                                onChange={handlePhotoChange}
                                className="border p-2 rounded w-full"
                                disabled={formData.image.length >= 3}
                                required
                            />
                        </div>
                    </div>
                    <div className="mt-4">
                        <h3 className="font-semibold">Selected image:</h3>
                        <div className="flex mt-2">
                            {photoPreviews.map((src, index) => (
                                <div key={index} className="relative group">
                                    <img
                                        src={src}
                                        alt={`Preview ${index + 1}`}
                                        className="h-24 w-24 object-cover rounded border"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => handleRemovePhoto(index)}
                                        className="absolute top-1 right-1 bg-red-500 text-white text-sm rounded-full w-5 h-5 flex items-center justify-center opacity-100"
                                    >
                                        &times;
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex justify-end mt-6 gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 bg-gray-300 text-black rounded"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-blue-500 text-white rounded"
                            disabled={loading}
                        >
                            {loading ? "Submitting..." : "Submit"}
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
};

export default ModalForm;
