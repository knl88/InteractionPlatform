import { Box, Button, Select, Input } from "@open-pioneer/chakra-integration";
import { FacetBase } from "../../../views/Search/Facets/FacetBase/FacetBase";

interface QueryableSelectorProps {
    queryablesArray: { title: string; type: string }[];
    onApply: (queryable: string, value: string) => void;
    selectedQueryable: string | null;
    setSelectedQueryable: (queryable: string | null) => void;
    queryableValue: string;
    setQueryableValue: (value: string) => void;
}

const QueryableSelector = ({
    queryablesArray,
    onApply,
    selectedQueryable,
    setSelectedQueryable,
    queryableValue,
    setQueryableValue,
}: QueryableSelectorProps) => {
    const handleQueryableChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedQueryable(e.target.value);
    };

    const handleQueryableValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryableValue(e.target.value);
    };

    const handleApply = () => {
        if (selectedQueryable && queryableValue) {
            onApply(selectedQueryable, queryableValue);
        }
    };

    return (
        <FacetBase title="Queryables" expanded={false}>
            <Box mt={4}>
                <Select
                    placeholder="Select Queryable"
                    value={selectedQueryable || ""}
                    onChange={handleQueryableChange}
                >
                    {queryablesArray.map((queryable, index) => (
                        <option key={index} value={queryable.title}>
                            {queryable.title} ({queryable.type})
                        </option>
                    ))}
                </Select>
                <Input
                    mt={2}
                    placeholder="Enter value for queryable"
                    value={queryableValue}
                    onChange={handleQueryableValueChange}
                />
                <Button
                    mt={2}
                    onClick={handleApply}
                    isDisabled={!selectedQueryable || !queryableValue}
                    marginBottom={2}
                >
                    Apply Queryable
                </Button>
            </Box>
        </FacetBase>
    );
};

export default QueryableSelector;
