export function formatToUsd(number) {
    // Check if the input is a valid number
    if (typeof number !== "number" || isNaN(number)) {
        throw new Error("Input must be a valid number");
    }

    // Use Intl.NumberFormat to format the number as USD currency
    const formatter = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    });

    return formatter.format(number);
}