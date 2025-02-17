import { onAuthStateChanged } from "firebase/auth";
import { ReactNode, useEffect, useState } from "react";
import { auth } from "../services/firebaseConnection";
import { Navigate } from "react-router-dom";

type PrivateProps = {
  children: ReactNode;
};

export function Private({ children }: PrivateProps): any {
  const [isLoading, setLoading] = useState(true);
  const [isSignedIn, setSignedIn] = useState(false);

  useEffect(() => {
    const monitor = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setLoading(false);
        setSignedIn(false);
        return;
      }

      const userData = {
        uid: user.uid,
        email: user.email,
      };

      localStorage.setItem("@reactlinks", JSON.stringify(userData));
      setLoading(false);
      setSignedIn(true);
    });

    return () => {
      // cancela o listener após o uso
      monitor();
    };
  }, []);

  if (isLoading) {
    return <div></div>;
  }

  if (!isSignedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}
