const DashedLineAnimation: React.FC = () => {
  return (
    <>
      <svg className="connect-svg overflow-visible" viewBox="108 20 584 60">
        <title>Connecting Google to App</title>

        {/* <!-- Path between the two nodes (curved) --> */}
        {/* <!-- Use a gentle cubic Bezier. Adjust control points to change curve --> */}
        <path id="connectPath" className="dash-path" d="M108 80 C 220 20, 560 20, 692 80" />

        {/* <!-- Overlay a colored dash animation (same path) to give moving highlight --> */}
        <path d="M108 80 C 220 20, 560 20, 692 80" className="dash-flow" />

        {/* <!-- Optional moving dot along path (nice touch) --> */}
        <circle r="14" fill="#06b6d4" opacity="0.95">
          <animateMotion dur="1.2s" repeatCount="indefinite" rotate="auto">
            <mpath xlinkHref="#connectPath" />
          </animateMotion>
        </circle>
      </svg>

      <style>
        {`
         .connect-svg { display: block; max-width: 780px; }
         
         .dash-path {
          stroke: #6b7280;            /* grey line color */
          stroke-width: 5;
          stroke-linecap: round;
          stroke-dasharray: 20 20;     /* dash pattern */
          animation: dash-move 1s linear infinite;
          fill: none;
         }
         
         /* subtle pulse on endpoints */
         .node-circle {
          transition: transform .18s ease;
          transform-origin: center;
         }
         
         .node-circle:hover { transform: scale(1.06); }
         
         /* moving "flow" highlight along the dashed path */
         .dash-flow {
          stroke: #06b6d4;            /* cyan highlight color moving through dashes */
          stroke-width: 5;
          stroke-linecap: round;
          stroke-dasharray: 40 40;
          stroke-dashoffset: 0;
          fill: none;
          animation: dash-flow 1s linear infinite;
          opacity: 0.95;
          mix-blend-mode: screen;
         }
         
         @keyframes dash-move {
          from { stroke-dashoffset: 0; }
          to { stroke-dashoffset: -100; }
         }
         
         @keyframes dash-flow {
          0%   { stroke-dashoffset: 0; opacity: 0.6; }
          50%  { opacity: 1; }
          100% { stroke-dashoffset: 100; opacity: 0.6; }
         }
         
         /* label styles (if using HTML overlay); kept minimal for inline SVG use */
         .logo-label { 
          font-family: Inter, system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial; 
          font-size: 12px; fill: #CDA75C; 
         }
       `}
      </style>
    </>
  );
};

export default DashedLineAnimation;
