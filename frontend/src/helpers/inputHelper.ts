export const inputHelper = (fieldType: string, fieldValue: any) => {
    switch (fieldType) {
        case "text":
            return fieldValue.target.value;
        case "select":
            return fieldValue ? fieldValue.value : "";
        case "multi-select":
            return fieldValue && fieldValue.map((el: any) => ({ id: el.value }));
        case "date":
            return fieldValue;
        default:
            return null;
    }
};