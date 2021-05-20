export interface Category {
    pk: number;
    name: string;
    description: string;
    parent: number;
    question_count: number;
    average_success: number;
    next_category_ids: number[];
    full_name: string;
}
export interface NestedCategories{
    category: Category;
    children: NestedCategories[];
}
