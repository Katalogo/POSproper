import React from "react";

interface FormattedNumberProps {
  value: number;
}

const FormattedNumber: React.FC<FormattedNumberProps> = ({ value }) => {
  // Specify the locale and options for formatting
  const formattedValue = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    // Additional options can be specified here
  }).format(value);

  return <span>{formattedValue}</span>;
};
// FormattedNumber.displayName = "FormattedNumber";

export { FormattedNumber };
