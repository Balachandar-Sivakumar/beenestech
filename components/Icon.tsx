const paths = {
  cube: "M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Zm-8 4.5 8 4.5 8-4.5M12 12v9",
  code: "m8 8-4 4 4 4m8-8 4 4-4 4M14 5l-4 14",
  rocket: "M14 4c3-1 6-1 6-1s0 3-1 6c-1 3-5 7-8 8l-4-4c1-3 5-7 7-9Zm1 5h.01M7 13l-3 1 3-5h4M11 17l-1 3 5-3v-4",
  layers: "M12 3 3 8l9 5 9-5-9-5ZM3 12.5l9 5 9-5M3 17l9 5 9-5",
  store: "M4 9h16l-1.5-5h-13L4 9Zm0 0v11h16V9M9.5 20v-6h5v6",
  workflow: "M4 4h7v5H4zM13 15h7v5h-7zM7.5 9v4a2 2 0 0 0 2 2H13",
  chart: "M3 21h18M6 17v-6m5 6V7m5 10v-4m4 4V4",
  phone: "M8 2h8a2 2 0 0 1 2 2v16a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2Zm3 16h2",
  users: "M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7Zm10 9v-1.5a3.5 3.5 0 0 0-2.5-3.35M15.5 4.15a3.5 3.5 0 0 1 0 6.7",
  cart: "M3 4h2l2.4 11h10.2L20 8H6.2M9 20h.01M17 20h.01",
  sparkles: "M12 3l1.8 4.7L18.5 9.5l-4.7 1.8L12 16l-1.8-4.7L5.5 9.5l4.7-1.8L12 3Zm6 11 .9 2.1L21 17l-2.1.9L18 20l-.9-2.1L15 17l2.1-.9L18 14Z",
  plug: "M9 2v5m6-5v5M6 7h12v4a6 6 0 0 1-12 0V7Zm6 10v5",
};

export type IconName = keyof typeof paths;

export function Icon({ name, className = "h-6 w-6" }: { name: IconName; className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  );
}
