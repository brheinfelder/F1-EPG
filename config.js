import "dotenv/config";

export const port = process.env.PORT || 3000;
export const days = process.env.EPG_DAYS || 14;
export const gameThumbs = process.env.GAME_THUMBS_URL || null;
export const aspect = process.env.ASPECT || null;
