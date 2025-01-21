import { FC } from "react";
import { useNavigate } from "react-router-dom";
import { HiChevronRight, HiHome } from "react-icons/hi";

interface BreadcrumbItem {
  name: string;
  link: string;
}

interface BreadCrumbsProps {
  breadcrumbItems: BreadcrumbItem[];
}

const BreadCrumbs: FC<BreadCrumbsProps> = ({ breadcrumbItems }) => {
  const navigate = useNavigate();

  return (
    <nav className="bg-gray-50 rounded-lg py-3s mb-4" aria-label="Breadcrumb">
      <ol className="flex items-center space-x-2">
        <li>
          <div className="flex items-center">
            <button
              onClick={() => navigate("/")}
              className="text-gray-600 hover:text-blue-600 transition-colors"
            >
              <HiHome className="w-5 h-5" />
            </button>
          </div>
        </li>

        {breadcrumbItems.map((item, index) => (
          <li key={index} className="flex items-center">
            <HiChevronRight className="w-5 h-5 text-gray-400" />
            {index === breadcrumbItems.length - 1 ? (
              <span className="text-gray-500 font-medium">{item.name}</span>
            ) : (
              <button
                onClick={() => navigate(item.link)}
                className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
              >
                {item.name}
              </button>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default BreadCrumbs;