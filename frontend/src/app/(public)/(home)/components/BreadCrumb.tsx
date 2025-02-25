"use client"

import { ChevronDown, ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const path = usePathname();
  const pathArray = path.split("/").filter((segment) => segment);

  function formatBreadcrumb(segment: string) {
    return segment
      .replace(/-/g, " ") // Reemplaza "-" por espacio
      .split(" ")
      .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitaliza cada palabra
      .join(" ");
  }

  return (
    <div className="w-11/12 max-w-screen-xl mx-auto py-6 flex items-center">
      {/* Home */}
      <Link href="/" className="text-deepblue font-bold flex items-center text-sm mobileL:text-sm tablet:text-lg laptop:text-xl laptopL:text-2xl">
    <p className="text-sm mobileL:text-sm tablet:text-lg laptop:text-xl laptopL:text-2xl/6 flex items-center text-deepblue font-bold">
      <ChevronDown className="mx-2" /> Home
    </p>
      </Link>

      {/* Breadcrumbs dinámicos */}
      {pathArray.map((segment, index) => {
        const href = `/${pathArray.slice(0, index + 1).join("/")}`;
        const isLast = index === pathArray.length - 1;

        return (
          <div key={href} className="flex items-center">
              <p className="capitalize text-sm mobileL:text-sm tablet:text-lg laptop:text-xl laptopL:text-2xl/6 flex items-center text-deepblue font-bold">
            <ChevronRight className="mx-2"/>
            {isLast ? (
              <span className="font-semibold">{formatBreadcrumb(segment)}</span>
            ) : (
              <Link href={href} className="text-darkgreen hover:underline">
                {formatBreadcrumb(segment)}
              </Link>
            )}
    </p>
          </div>
        );
      })}

      {/* Botones adicionales */}
      <div className="ml-auto flex space-x-4">
        <Link href="/empresas">
          <button className="btn-primary">Soy una empresa</button>
        </Link>
        <Link href="/emprendedores">
          <button className="btn-primary">Soy un emprendedor</button>
        </Link>
      </div>
    </div>
  );
}
