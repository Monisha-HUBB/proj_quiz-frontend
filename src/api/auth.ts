export const loginUser = async (email: string, password: string): Promise<{ token: string, role: string }> => {
  const res = await fetch('http://localhost:8085/api/users/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!res.ok) throw new Error('Login failed');

  const data = await res.json();
  localStorage.setItem('token', data.token); // Save for later requests
  return data;
};
