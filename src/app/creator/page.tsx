"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function CreatorPage() {
  const [showCard, setShowCard] = useState(false);

  return (
    <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg mt-16 border border-slate-200">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-blue-700">Creator</h1>
      <div className="flex flex-col items-center gap-4">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-blue-200 shadow mb-2 flex items-center justify-center bg-gray-100">
          <Image src="/arafat.jpg" alt="Your Photo" width={128} height={128} className="object-cover rounded-full" />
        </div>
        <div className="text-xl font-bold text-gray-800">Mahabub Arafat</div>
        <div className="text-gray-600">Student ID: <span className="font-semibold">1703037</span></div>
        <div className="text-gray-600">Profession: <span className="font-semibold">Software Engineer</span></div>
        <div className="flex gap-6 mt-2">
          <a href="https://github.com/MahabubArafat" target="_blank" rel="noopener noreferrer" className="text-gray-700 hover:text-black text-2xl" title="GitHub">
            <FaGithub />
          </a>
          <a href="https://www.linkedin.com/in/mahabubarafat/" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-blue-900 text-2xl" title="LinkedIn">
            <FaLinkedin />
          </a>
        </div>
      </div>
      <div className="mt-10 flex flex-col items-center">
        {!showCard ? (
          <button
            className="w-64 h-40 bg-black rounded-lg shadow flex flex-col items-center justify-center text-green-400 text-2xl font-bold border-2 border-dashed border-green-600 relative overflow-hidden group"
            onClick={() => setShowCard(true)}
            style={{ cursor: 'pointer', fontFamily: 'monospace' }}
          >
            <span className="mb-2 relative z-10 animate-matrix">Get in Touch</span>
            <span className="text-base font-normal relative z-10">Click to reveal business card</span>
            <div className="absolute inset-0 z-0 pointer-events-none">
              <MatrixAnimation />
            </div>
          </button>
        ) : (
          <Image src="/businesscard.jpeg" alt="Business Card" width={256} height={160} className="rounded-lg shadow border-2 border-dashed border-green-600 object-cover" />
        )}
      </div>
    </div>
  );
}

function MatrixAnimation() {
  const [matrix, setMatrix] = useState<string[][]>([]);
  useEffect(() => {
    const chars = '01';
    const rows = 8;
    const cols = 24;
    const generated = Array.from({ length: rows }, () =>
      Array.from({ length: cols }, () => chars[Math.floor(Math.random() * chars.length)])
    );
    setMatrix(generated);
  }, []);
  return (
    <div className="absolute inset-0 flex flex-col justify-center items-center opacity-70">
      {matrix.map((row, i) => (
        <div key={i} className="flex flex-row justify-center items-center">
          {row.map((char, j) => (
            <span
              key={j}
              className="text-green-400 text-opacity-80 text-lg animate-matrix-char"
              style={{
                animationDelay: `${(i * 24 + j) * 30}ms`,
                fontFamily: 'monospace',
                userSelect: 'none',
              }}
            >
              {char}
            </span>
          ))}
        </div>
      ))}
      <style jsx>{`
        @keyframes matrixChar {
          0% { opacity: 0.2; }
          50% { opacity: 1; }
          100% { opacity: 0.2; }
        }
        .animate-matrix-char {
          animation: matrixChar 1.8s infinite linear;
        }
      `}</style>
    </div>
  );
}
