import React from "react";

const h = React.createElement;

function svgIcon(nodes) {
  return function SvgIcon({ size = 24, strokeWidth = 2, ...props }) {
    return h(
      "svg",
      {
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": true,
        ...props
      },
      nodes.map(([tag, attrs], index) => h(tag, { ...attrs, key: index }))
    );
  };
}

export const ArrowRight = svgIcon([
  ["path", { d: "M5 12h14" }],
  ["path", { d: "m12 5 7 7-7 7" }]
]);
export const BookOpen = svgIcon([
  ["path", { d: "M12 7v14" }],
  ["path", { d: "M4 19.5A2.5 2.5 0 0 1 6.5 17H12V5H6.5A2.5 2.5 0 0 0 4 7.5v12Z" }],
  ["path", { d: "M20 19.5A2.5 2.5 0 0 0 17.5 17H12V5h5.5A2.5 2.5 0 0 1 20 7.5v12Z" }]
]);
export const Bus = svgIcon([
  ["path", { d: "M6 17h12" }],
  ["path", { d: "M6 17v2" }],
  ["path", { d: "M18 17v2" }],
  ["rect", { x: "4", y: "5", width: "16", height: "12", rx: "2" }],
  ["path", { d: "M4 10h16" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M16 14h.01" }]
]);
export const CalendarDays = svgIcon([
  ["rect", { x: "3", y: "4", width: "18", height: "18", rx: "2" }],
  ["path", { d: "M16 2v4" }],
  ["path", { d: "M8 2v4" }],
  ["path", { d: "M3 10h18" }],
  ["path", { d: "M8 14h.01" }],
  ["path", { d: "M12 14h.01" }],
  ["path", { d: "M16 14h.01" }],
  ["path", { d: "M8 18h.01" }],
  ["path", { d: "M12 18h.01" }]
]);
export const CheckCircle2 = svgIcon([
  ["circle", { cx: "12", cy: "12", r: "9" }],
  ["path", { d: "m8 12 2.5 2.5L16 9" }]
]);
export const ClipboardList = svgIcon([
  ["path", { d: "M9 5h6" }],
  ["path", { d: "M9 3h6v4H9z" }],
  ["rect", { x: "5", y: "5", width: "14", height: "16", rx: "2" }],
  ["path", { d: "M9 12h6" }],
  ["path", { d: "M9 16h6" }]
]);
export const Globe2 = svgIcon([
  ["circle", { cx: "12", cy: "12", r: "10" }],
  ["path", { d: "M2 12h20" }],
  ["path", { d: "M12 2a15 15 0 0 1 0 20" }],
  ["path", { d: "M12 2a15 15 0 0 0 0 20" }]
]);
export const GraduationCap = svgIcon([
  ["path", { d: "M22 10 12 5 2 10l10 5 10-5Z" }],
  ["path", { d: "M6 12v5c3 2 9 2 12 0v-5" }],
  ["path", { d: "M22 10v6" }]
]);
export const LayoutDashboard = svgIcon([
  ["rect", { x: "3", y: "3", width: "7", height: "8", rx: "1" }],
  ["rect", { x: "14", y: "3", width: "7", height: "5", rx: "1" }],
  ["rect", { x: "14", y: "12", width: "7", height: "9", rx: "1" }],
  ["rect", { x: "3", y: "15", width: "7", height: "6", rx: "1" }]
]);
export const MapPin = svgIcon([
  ["path", { d: "M20 10c0 5-8 12-8 12S4 15 4 10a8 8 0 1 1 16 0Z" }],
  ["circle", { cx: "12", cy: "10", r: "3" }]
]);
export const Menu = svgIcon([
  ["path", { d: "M4 6h16" }],
  ["path", { d: "M4 12h16" }],
  ["path", { d: "M4 18h16" }]
]);
export const MessageCircle = svgIcon([
  ["path", { d: "M21 11.5a8.5 8.5 0 0 1-12.6 7.4L3 20l1.2-5.2A8.5 8.5 0 1 1 21 11.5Z" }]
]);
export const Phone = svgIcon([
  ["path", { d: "M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.4 19.4 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.7.6 2.5a2 2 0 0 1-.5 2.1L8 9.5a16 16 0 0 0 6.5 6.5l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.6.5 2.5.6a2 2 0 0 1 1.7 2Z" }]
]);
export const School = svgIcon([
  ["path", { d: "M3 21h18" }],
  ["path", { d: "M5 21V8l7-4 7 4v13" }],
  ["path", { d: "M9 21v-6h6v6" }],
  ["path", { d: "M9 10h.01" }],
  ["path", { d: "M15 10h.01" }]
]);
export const ShieldCheck = svgIcon([
  ["path", { d: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" }],
  ["path", { d: "m9 12 2 2 4-5" }]
]);
export const Trophy = svgIcon([
  ["path", { d: "M8 21h8" }],
  ["path", { d: "M12 17v4" }],
  ["path", { d: "M7 4h10v5a5 5 0 0 1-10 0V4Z" }],
  ["path", { d: "M5 5H3v3a4 4 0 0 0 4 4" }],
  ["path", { d: "M19 5h2v3a4 4 0 0 1-4 4" }]
]);
export const UsersRound = svgIcon([
  ["path", { d: "M18 21a6 6 0 0 0-12 0" }],
  ["circle", { cx: "12", cy: "8", r: "5" }],
  ["path", { d: "M22 21a5 5 0 0 0-4-4.8" }],
  ["path", { d: "M2 21a5 5 0 0 1 4-4.8" }]
]);
export const X = svgIcon([
  ["path", { d: "M18 6 6 18" }],
  ["path", { d: "m6 6 12 12" }]
]);
