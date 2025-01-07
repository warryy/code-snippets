/**
 * compilerOptions.strict 为 true 时，
 * 会严格检查类型, 此时将 undefined 赋值给除 undefined 外的类型会报错
 *
 * compilerOptions.strict 为 false 时，
 * 不会严格检查类型, 此时可以将 undefined 赋值给任意类型都不会报错
 */

interface CardProps {
  classNames?: {
    extra?: string;
    title?: string;
  };
}

type T1 = Exclude<CardProps["classNames"], undefined>;

type T2 = string;

const t1: T1 = undefined;
const t2: T2 = undefined;

export {};
