'use client';

const SearchBar = ({ searchQuery, onSearch }: { searchQuery: string, onSearch: (query: string) => void }) => {
    return (
        <div className="flex-1">
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearch(e.target.value)}
                placeholder="Search Products"
                className="border p-2 w-full"
            />
        </div>
    );
};

export default SearchBar;
