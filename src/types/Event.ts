export type SkillLevel = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export interface EventProp {
    id: string;
    img: string;
    skill: string;
    level: SkillLevel;
    date: string;
    duration: string;
    price: number;
}