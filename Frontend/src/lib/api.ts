export const API_BASE = "http://localhost:5000";

export const getRecommendation = async (payload: any) => {
  const res = await fetch(`${API_BASE}/recommend`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return await res.json();
};

export const getChatResponse = async (message: string) => {
  const res = await fetch("http://localhost:5001/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
  });
  return await res.json();
};

export const getHistory = async () => {
  const res = await fetch(`${API_BASE}/history`);
  return await res.json();
};
