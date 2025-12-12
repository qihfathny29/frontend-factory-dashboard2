export const isAuthenticated = (): boolean => {
  const session = localStorage.getItem("user_sessions");
  if (!session) return false;

  try {
    const { isLoggedIn, loginTime } = JSON.parse(session);
    const hoursDiff = (Date.now() - new Date(loginTime).getTime()) / (1000 * 60 * 60);
    if (isLoggedIn && hoursDiff < 24) return true;

    localStorage.removeItem("user_sessions");
    return false;
  } catch {
    localStorage.removeItem("user_sessions");
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem("user_sessions");
};