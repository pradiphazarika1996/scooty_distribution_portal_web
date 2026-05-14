"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import { SelectOption } from "@/components/applications/Application.types";
import styles from "./CustomSelect.module.scss";

interface CustomSelectProps {
  options: SelectOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const ChevronDownIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M3.5 5.25L7 8.75L10.5 5.25"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CheckIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 14 14"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2.5 7L5.5 10L11.5 4"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CustomSelect: React.FC<CustomSelectProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === value);
  const displayLabel = selectedOption
    ? selectedOption.label
    : (placeholder ?? options[0]?.label);

  const handleClickOutside = useCallback((e: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(e.target as Node)
    ) {
      setIsOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen, handleClickOutside]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div
      ref={containerRef}
      className={`${styles.container} ${isOpen ? styles.open : ""} ${className ?? ""}`}
    >
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={styles.triggerLabel}>{displayLabel}</span>
        <span className={`${styles.chevron} ${isOpen ? styles.chevronUp : ""}`}>
          <ChevronDownIcon />
        </span>
      </button>

      {isOpen && (
        <ul className={styles.dropdown} role="listbox">
          {options.map((option) => (
            <li
              key={option.value}
              role="option"
              aria-selected={option.value === value}
              className={`${styles.option} ${option.value === value ? styles.selected : ""}`}
              onClick={() => handleSelect(option.value)}
            >
              <span>{option.label}</span>
              {option.value === value && (
                <span className={styles.checkIcon}>
                  <CheckIcon />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CustomSelect;
