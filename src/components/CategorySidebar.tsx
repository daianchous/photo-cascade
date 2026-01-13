import { categoryTags } from "@/data/photoData";

interface CategorySidebarProps {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategorySidebar = ({ activeCategory, onCategoryChange }: CategorySidebarProps) => {
  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 text-right z-30">
      <ul className="space-y-1">
        {categoryTags.map((tag) => (
          <li key={tag.name}>
            <button
              onClick={() => onCategoryChange(tag.name)}
              className={`
                text-sm tracking-wide transition-colors duration-200
                ${activeCategory === tag.name 
                  ? 'text-foreground font-medium' 
                  : 'text-tag-text hover:text-tag-hover'
                }
              `}
            >
              {tag.name}
              <sup className="ml-0.5 text-[10px] opacity-60">{tag.count}</sup>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategorySidebar;
