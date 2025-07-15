import React, { RefObject } from "react";

interface RecipientInputProps {
  recipientInput: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
  onCsvUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  csvInputRef: RefObject<HTMLInputElement>;
}

const RecipientInput: React.FC<RecipientInputProps> = ({
  recipientInput,
  onInputChange,
  onKeyDown,
  onPaste,
  onCsvUpload,
  csvInputRef,
}) => (
  <div className="border border-top-0 border-200">
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "center",
      }}
    >
      <input
        className="form-control border-0 rounded-0 outline-none px-x1"
        id="email-to"
        placeholder="To"
        value={recipientInput}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onPaste={onPaste}
        autoComplete="off"
        style={{ flex: 1 }}
      />
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm ms-2"
        title="Upload CSV"
        onClick={() => csvInputRef.current?.click()}
        style={{
          position: "absolute",
          right: 8,
          top: "50%",
          transform: "translateY(-50%)",
        }}
      >
        <i className="bi bi-upload" />
      </button>
      <input
        type="file"
        accept=".csv"
        ref={csvInputRef}
        style={{ display: "none" }}
        onChange={onCsvUpload}
      />
    </div>
  </div>
);

export default RecipientInput;
