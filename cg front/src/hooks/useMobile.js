import { useState, useEffect } from 'react';

export default function useMobile() {
  const [isMobile, setMobile] = useState(null);

  const handleResize = () => {
    if (document.documentElement.clientWidth <= 480) setMobile(true);
    else setMobile(false);
  };

  useEffect(() => {
    if (document.documentElement.clientWidth <= 480) setMobile(true);
    else setMobile(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return isMobile;
}
