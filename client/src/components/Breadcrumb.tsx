import Link from "next/link";
import { ChevronRight } from "lucide-react";

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: BreadcrumbProps) {
  return (
    <nav className="flex mb-4 text-lg">
      <ol className="flex items-center space-x-1 text-gray-500">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index === items.length - 1 ? (
              <span className="font-semibold text-gray-900">{item.label}</span>
            ) : item.link ? (
              <Link href={item.link} className="hover:text-gray-700">
                {item.label}
              </Link>
            ) : (
              <span>{item.label}</span>
            )}
            {index < items.length - 1 && (
              <ChevronRight className="h-4 w-4 mx-1" />
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}