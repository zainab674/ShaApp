import React from 'react';

export function LoadingSpinner() {
    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-pink-500"></div>
            <p className="mt-4 text-gray-600">Loading...</p>
        </div>
    );
}