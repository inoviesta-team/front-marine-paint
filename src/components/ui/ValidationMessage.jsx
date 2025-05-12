import React from "react";

export default function ValidationMessage({ error, defaultMessage = "Terjadi kesalahan! Silahkan coba kembali" }) {

    const validationErrors = error?.response?.data?.data?.validationErrors;
    const errorMessage = error?.response?.data?.message;;

    return (
      <>
        {errorMessage && !validationErrors && (
          <ul className="text-red-500 font-medium list-disc list-inside text-sm">
            <li>{errorMessage || defaultMessage}</li>
          </ul>
        )}
        {validationErrors && (
          <ul className="text-red-500 font-medium list-disc list-inside">
            {validationErrors.map((err, index) => (
              <li key={`error-${index}`}>{err.message}</li>
            ))}
          </ul>
        )}
      </>
    );
}
