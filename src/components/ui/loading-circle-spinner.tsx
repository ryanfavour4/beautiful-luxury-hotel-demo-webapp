import React from "react";

const LoadingCircleSpinner: React.FC = () => {
  return (
    <>
      <div className="spinner">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className={`child-${i + 1}`} />
        ))}
      </div>

      <style>{`
        .spinner {
          position: absolute;
          width: 9px;
          height: 9px;
        }

        .spinner div {
          position: absolute;
          width: 50%;
          height: 150%;
          background:#CDA75C;
          transform: rotate(calc(var(--rotation) * 1deg))
            translate(0, calc(var(--translation) * 1%));
          animation: spinner-fzua35 1s calc(var(--delay) * 1s) infinite ease;
        }

        .child-1 {
          --delay: 0.1;
          --rotation: 36;
          --translation: 150;
        }

        .child-2 {
          --delay: 0.2;
          --rotation: 72;
          --translation: 150;
        }

        .child-3 {
          --delay: 0.3;
          --rotation: 108;
          --translation: 150;
        }

        .child-4 {
          --delay: 0.4;
          --rotation: 144;
          --translation: 150;
        }

        .child-5 {
          --delay: 0.5;
          --rotation: 180;
          --translation: 150;
        }

        .child-6 {
          --delay: 0.6;
          --rotation: 216;
          --translation: 150;
        }

        .child-7 {
          --delay: 0.7;
          --rotation: 252;
          --translation: 150;
        }

        .child-8 {
          --delay: 0.8;
          --rotation: 288;
          --translation: 150;
        }

        .child-9 {
          --delay: 0.9;
          --rotation: 324;
          --translation: 150;
        }

        .child-10 {
          --delay: 1;
          --rotation: 360;
          --translation: 150;
        }

        @keyframes spinner-fzua35 {
          0%,
          10%,
          20%,
          30%,
          50%,
          60%,
          70%,
          80%,
          90%,
          100% {
            transform: rotate(calc(var(--rotation) * 1deg))
              translate(0, calc(var(--translation) * 1%));
          }

          50% {
            transform: rotate(calc(var(--rotation) * 1deg))
              translate(0, calc(var(--translation) * 1.5%));
          }
        }
      `}</style>
    </>
  );
};

export default LoadingCircleSpinner;
