const normalizeOrigin = (value) =>
  String(value || "")
    .trim()
    .replace(/\/$/, "");

const configuredOrigins = [
  process.env.FRONTEND_URL,
  ...(process.env.FRONTEND_URLS || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean),
  "http://localhost:3000",
  "https://attendx-ai.vercel.app/",
]
  .map(normalizeOrigin)
  .filter(Boolean);

const allowedOrigins = [...new Set(configuredOrigins)];

const corsOption = {
  origin: (origin, callback) => {
    const normalizedOrigin = normalizeOrigin(origin);

    if (!normalizedOrigin || allowedOrigins.includes(normalizedOrigin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  optionsSuccessStatus: 200,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "HEAD"],
  credentials: true,
};

export default corsOption;
