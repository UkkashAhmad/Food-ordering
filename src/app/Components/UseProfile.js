// its like a state managment for checking user is admin or not 

import { useEffect, useState } from "react";
export function useProfile() {
  const [data, setData] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch("/api/profile").then((response) => {
      response.json().then(data => {
        setData(data);
        setLoading(false);
      });
    });
  }, []);
  return {loading, data}
}


