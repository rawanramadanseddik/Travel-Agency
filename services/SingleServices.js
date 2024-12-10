// singleServices.js

/**
 * Utility functions for analyzing and summarizing internal services 
 * (Stay, Attraction, Car Rental, Public Transportation).
 */

const servicesSummary = {
    Stay: 0,
    Attraction: 0,
    CarRental: 0,
    PublicTransportation: 0,
};

/**
 * Updates the summary count for a specific service type.
 * @param {string} serviceType - Type of service (e.g., 'Stay', 'Attraction').
 */
function updateServiceSummary(serviceType) {
    if (!servicesSummary.hasOwnProperty(serviceType)) {
        throw new Error(`Unknown service type: ${serviceType}`);
    }
    servicesSummary[serviceType]++;
    console.log(`Service type "${serviceType}" updated. Current count: ${servicesSummary[serviceType]}`);
}

/**
 * Retrieves the current summary of all service types.
 * @returns {Object} - Summary object with counts of each service type.
 */
function getServiceSummary() {
    return servicesSummary;
}

/**
 * Resets the service summary to its initial state.
 */
function resetServiceSummary() {
    for (const key in servicesSummary) {
        if (servicesSummary.hasOwnProperty(key)) {
            servicesSummary[key] = 0;
        }
    }
    console.log("Service summary has been reset.");
}

// Export the utility functions for potential future use.
module.exports = {
    updateServiceSummary,
    getServiceSummary,
    resetServiceSummary,
};
