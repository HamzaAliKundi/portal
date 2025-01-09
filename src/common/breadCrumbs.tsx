import { FC } from 'react';
import { useNavigate } from 'react-router-dom';

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
        <nav className="flex items-center text-gray-700 mb-4" aria-label="Breadcrumb">
            <ol className="flex space-x-3 md:space-x-4">
                {breadcrumbItems.map((item, index) => (
                    <li key={index} aria-current={index === breadcrumbItems.length - 1 ? "page" : undefined}>
                        <div className="flex items-center space-x-2">
                            {index !== breadcrumbItems.length - 1 ? (
                                <>
                                    <p
                                        onClick={() => navigate(item.link)}
                                        className="cursor-pointer text-sm font-medium hover:text-blue-600"
                                    >
                                        {item.name}
                                    </p>
                                    <svg className="w-2 h-3 text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4" />
                                    </svg>
                                </>
                            ) : (
                                <span className="text-sm font-medium">{item.name}</span>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </nav>
    );
};

export default BreadCrumbs;
