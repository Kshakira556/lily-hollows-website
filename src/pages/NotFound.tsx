import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { client } from "@/sanity/client";
import { notFoundPageQuery } from "@/sanity/queries";

const NotFound = () => {
  const location = useLocation();
  const [notFoundPage, setNotFoundPage] = useState<any | null>(null);

  useEffect(() => {
    client.fetch(notFoundPageQuery).then(setNotFoundPage).catch(console.error);
  }, []);

  const message = notFoundPage?.message ?? "Oops! Page not found";
  const ctaLabel = notFoundPage?.ctaLabel ?? "Return to Home";
  const ctaHref = notFoundPage?.ctaHref ?? "/";

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">{message}</p>
        <a href={ctaHref} className="text-primary underline hover:text-primary/90">
          {ctaLabel}
        </a>
      </div>
    </div>
  );
};

export default NotFound;
