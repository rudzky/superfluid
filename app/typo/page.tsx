import React from "react";

export default function Typo() {
  return (
    <div>
      <div className="p-4 shadow-xs">
        <h1 className="font-title text-title-h1">
          The quick brown fox jumps over the lazy dog.
        </h1>
        <h2 className="font-title text-title-h2">
          The quick brown fox jumps over the lazy dog.
        </h2>
        <h3 className="font-title text-title-h3">
          The quick brown fox jumps over the lazy dog.
        </h3>
        <h4 className="font-title text-title-h4">
          The quick brown fox jumps over the lazy dog.
        </h4>
        <h5 className="font-title text-title-h5">
          The quick brown fox jumps over the lazy dog.
        </h5>
        <h6 className="font-title text-title-h6">
          The quick brown fox jumps over the lazy dog.
        </h6>
      </div>
      <div className="p-4 grid shadow-s">
        <span className="text-label-xl">
          The quick brown fox jumps over the lazy dog.
        </span>
        <span className="text-label-l">
          The quick brown fox jumps over the lazy dog.
        </span>
        <span className="text-label-m">
          The quick brown fox jumps over the lazy dog.
        </span>
        <span className="text-label-s">
          The quick brown fox jumps over the lazy dog.
        </span>
        <span className="text-label-xs">
          The quick brown fox jumps over the lazy dog.
        </span>
      </div>
      <div className="p-4 grid shadow-m">
        <p className="text-paragraph-xl">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-paragraph-l">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-paragraph-m">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-paragraph-s">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-paragraph-xs">
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
      <div className="p-4 grid shadow-l">
        <p className="text-subheading-m">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-subheading-s">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-subheading-xs">
          The quick brown fox jumps over the lazy dog.
        </p>
        <p className="text-subheading-2xs">
          The quick brown fox jumps over the lazy dog.
        </p>
      </div>
    </div>
  );
}
