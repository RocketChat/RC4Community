const nextDeployUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

//NextJS local API route call begins
export const signCook = async (mail) => {
  const res = await fetch(`${nextDeployUrl}/api/encrypt/signCook`, {
    method: "POST",
    body: JSON.stringify(mail)
  });
  return res.json();
};

export const unsignCook = async (hash) => {
  const res = await fetch(`${nextDeployUrl}/api/encrypt/unsignCook`, {
    method: "POST",
    body: JSON.stringify(hash)
  });
  return res.json();
};

export const signRole = async (payload) => {
  const res = await fetch(`${nextDeployUrl}/api/encrypt/signRole`, {
    method: "POST",
    body: JSON.stringify(payload)
  });
  return res.json();
};

//NextJS local API route call ends


