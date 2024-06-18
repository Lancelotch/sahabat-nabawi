import React, { useEffect, useState } from "react";
import "./style.css";
import { ImageUploaderProps } from "@/app/_interface/general.interface";
import Image from "next/image";

const ImageUploader: React.FC<ImageUploaderProps> = ({
  errorMessage,
  onChangeImage,
  image,
  label,
  loading,
  name,
}) => {
  const [error, setError] = useState<string | null>(errorMessage || "");

  useEffect(() => {
    if (errorMessage) setError(errorMessage);
  }, [errorMessage]);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];

    if (file) {
      if (file.type.startsWith("image/")) {
        if (file.size <= 8 * 1024 * 1024) {
          onChangeImage(name, file);
          setError(null);
        } else {
          setError("File size melebihi 8 MB");
        }
      } else {
        setError("Format gambar tidak valid");
      }
    }
  };

  const handleImageClick = (e: any) => {
    e.preventDefault();
    const fileInput = document.getElementById(`${name}-input-image`);
    if (fileInput) {
      fileInput.click();
    }
  };
  return (
    <>
      <div>
        {label && (
          <label className="text-sm" htmlFor={name}>
            {label}
          </label>
        )}
      </div>
      <div className="image-uploader">
        <input
          type="file"
          accept="image/*"
          id={`${name}-input-image`}
          onChange={handleFileChange}
          className="hidden"
        />
        {image ? (
          <div>
            <img
              className="image-uploader__image"
              src={image}
              alt="Uploaded"
              onClick={handleImageClick}
            />
          </div>
        ) : (
          <label
            className={`image-uploader__button ${
              loading && loading < 100 ? "d-none" : ""
            }`}
            htmlFor={`${name}-input-image`}
          >
            <svg
              width="48"
              height="49"
              viewBox="0 0 48 49"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="24" cy="24.5" r="24" fill="#2951A3" />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M26.0016 26.5028L38.1438 26.5028C39.2497 26.5028 40.1435 25.609 40.1435 24.5031C40.1435 23.3973 39.2497 22.5035 38.1438 22.5035L26.0016 22.5035L26.0016 10.3613C26.0016 9.25541 25.1078 8.36165 24.002 8.36165C22.8961 8.36165 22.0023 9.25541 22.0023 10.3613L22.0023 22.5035L9.86011 22.5035C8.75422 22.5035 7.86046 23.3973 7.86046 24.5031C7.86046 25.0547 8.0839 25.5553 8.44593 25.9173C8.80796 26.2794 9.30858 26.5028 9.86011 26.5028L22.0023 26.5028L22.0023 38.645C22.0023 39.1965 22.2257 39.6971 22.5878 40.0592C22.9498 40.4212 23.4504 40.6446 24.002 40.6446C25.1078 40.6446 26.0016 39.7509 26.0016 38.645V26.5028Z"
                fill="white"
              />
            </svg>
          </label>
        )}
        <div className="overlay" onClick={handleImageClick}>
          <button>
            <svg
              width="46"
              height="46"
              viewBox="0 0 46 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M25.0016 25.0028L37.1438 25.0028C38.2497 25.0028 39.1435 24.109 39.1435 23.0031C39.1435 21.8973 38.2497 21.0035 37.1438 21.0035L25.0016 21.0035L25.0016 8.8613C25.0016 7.75541 24.1078 6.86165 23.002 6.86165C21.8961 6.86165 21.0023 7.75541 21.0023 8.8613L21.0023 21.0035L8.86011 21.0035C7.75422 21.0035 6.86046 21.8973 6.86046 23.0031C6.86046 23.5547 7.0839 24.0553 7.44593 24.4173C7.80796 24.7794 8.30858 25.0028 8.86011 25.0028L21.0023 25.0028L21.0023 37.145C21.0023 37.6965 21.2257 38.1971 21.5878 38.5592C21.9498 38.9212 22.4504 39.1446 23.002 39.1446C24.1078 39.1446 25.0016 38.2509 25.0016 37.145V25.0028Z"
                fill="white"
              />
            </svg>
          </button>
        </div>
      </div>
      {error && (
        <span className="text-xs text-danger -translate-y-2">{error}</span>
      )}
    </>
  );
};

export default ImageUploader;
