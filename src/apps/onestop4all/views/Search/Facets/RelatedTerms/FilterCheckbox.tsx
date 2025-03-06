import { Checkbox, Box } from "@chakra-ui/react";

interface FilterCheckboxProps {
    label: string;
    background: string;
    filterType: string;
    updateFilter: (checked: boolean, filterType: string) => void;
}

export const FilterCheckbox = (props:FilterCheckboxProps) => {
    const {label, background, filterType, updateFilter} = props;
    return (
        <Checkbox
            defaultChecked
            onChange={(e) => {
                updateFilter(e.target.checked, filterType);
            }}
        >
            <Box className="relatedTermsCategory" background={background}>
                {label}
            </Box>
        </Checkbox>
    );
};
